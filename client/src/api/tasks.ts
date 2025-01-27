import { fetchClient } from './client';

// Docker network_mode: host doesn't work properly on all machines, so this is necessary
// This causes a Next.js error, which is only a result of this dev configuration
const BASE_URL = typeof window === 'undefined' ? `http://host.docker.internal:3001` : `http://localhost:3001`;

export type Task = {
    id: number;
    title: string;
    color: `#${string}`;
    completed: boolean;
    // Unix timestamp in seconds
    created: number;
};

const api = fetchClient({ baseUrl: BASE_URL });

export type Counts = {
    total: number;
    total_completed: number;
};

export const counts = api<never, never, Counts>('GET', '/tasks/counts');

export type PageInfo = {
    page: number;
    per_page: number;
} & (
    | {
          hasNextPage: true;
          nextPage: number;
      }
    | { hasNextPage: false; nextPage: null }
);

export const get = ({ task_id }: { task_id: string | number }) => api<never, never, Task | null>('GET', `/tasks/${task_id}`)();

export const list = api<
    never,
    {
        page: number;
        per_page: number;
    },
    {
        data: Task[];
        pageInfo: PageInfo;
    }
>('GET', '/tasks');

export const create = api<Pick<Task, 'title' | 'color'>, never, Task>('POST', '/tasks');

export const update = api<{ id: number } & Partial<Pick<Task, 'completed' | 'title' | 'color'>>, never, Task>('PATCH', '/tasks');

export const remove = api<{ id: number }, never, Task>('DELETE', '/tasks');
