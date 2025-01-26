import prisma from '../config/prisma';
import { getUnixEpoch } from '../utils';

import type { CreateInput, PaginationInput, RemoveInput, UpdateInput } from './schemas';

export * as schemas from './schemas';

const MAX_PER_PAGE = 50;

export const counts = async () => {
    const [data] = await prisma.$queryRaw<[{ total: number; total_completed: number }]>`#sql
        SELECT
            COUNT(*) as total,
            COUNT(CASE WHEN completed = TRUE THEN 1 END) as total_completed
        FROM Task;
    `;

    return {
        total: Number(data.total),
        total_completed: Number(data.total_completed),
    };
};

export const get = async ({ page, per_page }: PaginationInput) => {
    per_page = Math.min(+per_page, MAX_PER_PAGE);
    page = +page;

    const tasks = await prisma.task.findMany({
        orderBy: [
            {
                completed: 'asc',
            },
            {
                created: 'desc',
            },
        ],
        skip: page * per_page,
        take: per_page + 1,
    });

    const hasNextPage = tasks.length > per_page;

    return {
        data: tasks.slice(0, per_page),
        pageInfo: {
            page,
            hasNextPage,
            nextPage: hasNextPage ? page + 1 : null,
            per_page,
        },
    };
};

export const create = async ({ title, color }: CreateInput) => {
    const created = await prisma.task.create({
        data: {
            title,
            color,
            created: getUnixEpoch(),
        },
    });

    return created;
};

export const remove = async ({ id }: RemoveInput) => {
    const removed = await prisma.task.delete({
        where: {
            id,
        },
    });

    return removed;
};

export const update = async ({ id, ...data }: UpdateInput) => {
    const updated = await prisma.task.update({
        where: {
            id,
        },
        data,
    });

    return updated;
};
