import { tasks } from '@/api';
import TaskList from '@/components/TaskList';

export default async function Home() {
    const counts = await tasks.counts();
    const list = await tasks.list({ params: { page: 0, per_page: 25 } });

    return <TaskList initialCounts={counts} initialTasks={list.data} initialPageInfo={list.pageInfo} />;
}
