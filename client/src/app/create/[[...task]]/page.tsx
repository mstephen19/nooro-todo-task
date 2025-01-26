import { tasks } from '@/api';
import TaskForm from '@/components/TaskForm';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const Page = async ({ params }: { params: Promise<{ task?: string[] }> }) => {
    // Task ID is an optional slug param
    // If it's present, the form is performing an update rather than a create
    const { task: [taskId] = [] } = await params;

    const task = Boolean(taskId) ? await tasks.get({ task_id: taskId }) : null;

    if (taskId && task === null) {
        return notFound();
    }

    const createTask = async (data: { title: string; color: `#${string}` }) => {
        'use server';
        await tasks.create({
            body: data,
        });
    };

    const updateTask = async (data: { id: number; title?: string; color?: `#${string}` }) => {
        'use server';
        await tasks.update({
            body: data,
        });
    };

    return (
        <div className='pt-[52px]'>
            <Link href='/'>
                <Image alt='Back icon' src='/back.svg' width={30} height={30} />
            </Link>

            {Boolean(task) ? (
                <TaskForm type='update' updateTask={updateTask} task={task!} />
            ) : (
                <TaskForm type='create' createTask={createTask} />
            )}
        </div>
    );
};

export default Page;
