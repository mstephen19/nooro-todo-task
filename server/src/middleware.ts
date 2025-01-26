import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import type { ErrorRequestHandler, RequestHandler } from 'express';
import type z from 'zod';
import { ZodError } from 'zod';

// Pass promise rejections to error handler
export const asyncWrapper =
    (handler: RequestHandler): RequestHandler =>
    async (req, res, next) => {
        try {
            await handler(req, res, next);
        } catch (error) {
            next(error);
        }
    };

export const validateBody =
    (schema: z.Schema): RequestHandler =>
    (req, _, next) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            next(error);
        }
    };

export const validateQuery =
    (schema: z.Schema): RequestHandler =>
    (req, _, next) => {
        try {
            schema.parse(req.query);
            next();
        } catch (error) {
            next(error);
        }
    };

export const errorHandler: ErrorRequestHandler = (err, _, res, __) => {
    if (!err) return;

    if (err instanceof ZodError) {
        res.status(400).json({ error: 'Invalid schema.' });
        return;
    }

    if (
        err instanceof PrismaClientKnownRequestError &&
        ['not found', 'not exist'].some((term) => (err.meta?.cause as string | undefined)?.includes(term))
    ) {
        res.status(404).json({ error: 'Record not found.' });
        return;
    }

    res.status(500).json({ error: 'Internal server error.' });
};
