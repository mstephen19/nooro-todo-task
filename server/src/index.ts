import express from 'express';
import prisma from './config/prisma';
import * as tasks from './tasks';
import * as middleware from './middleware';

await prisma.$connect();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    // ! wildcard for development purposes only
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(202).end();
        return;
    }

    next();
});

app.route('/tasks')
    .get(
        middleware.validateQuery(tasks.schemas.paginationInput),
        middleware.asyncWrapper(async (req, res) => {
            const taskList = await tasks.get(req.query as tasks.schemas.PaginationInput);

            res.status(201).json(taskList);
        })
    )
    .post(
        middleware.validateBody(tasks.schemas.createInput),
        middleware.asyncWrapper(async (req, res) => {
            const createdTask = await tasks.create(req.body as tasks.schemas.CreateInput);

            res.status(200).json(createdTask);
        })
    )
    .patch(
        middleware.validateBody(tasks.schemas.updateInput),
        middleware.asyncWrapper(async (req, res) => {
            const updatedTask = await tasks.update(req.body as tasks.schemas.UpdateInput);

            res.status(200).json(updatedTask);
        })
    )
    .delete(
        middleware.validateBody(tasks.schemas.removeInput),
        middleware.asyncWrapper(async (req, res) => {
            const removedTask = await tasks.remove(req.body as tasks.schemas.RemoveInput);

            res.status(200).json(removedTask);
        })
    );

app.route('/tasks/counts').get(
    middleware.asyncWrapper(async (_, res) => {
        const taskCounts = await tasks.counts();

        res.status(200).json(taskCounts);
    })
);

app.use((_, res) => {
    res.status(404).json({ error: 'Invalid route.' });
});

app.use(middleware.errorHandler);

app.listen(3001, () => {
    console.log('HTTP server started.');
});
