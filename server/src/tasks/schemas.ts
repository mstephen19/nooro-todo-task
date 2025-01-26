import z from 'zod';

export const paginationInput = z.object({
    page: z.number().or(z.string()),
    per_page: z.number().or(z.string()),
});

export type PaginationInput = z.infer<typeof paginationInput>;

export const createInput = z.object({
    title: z.string(),
    color: z.string(),
});

export type CreateInput = z.infer<typeof createInput>;

export const removeInput = z.object({
    id: z.number(),
});

export type RemoveInput = z.infer<typeof removeInput>;

export const updateInput = z.object({
    id: z.number(),
    title: z.string().optional(),
    completed: z.boolean().optional(),
});

export type UpdateInput = z.infer<typeof updateInput>;
