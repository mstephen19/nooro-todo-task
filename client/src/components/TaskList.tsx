'use client';

import { tasks } from '@/api';
import { useCallback, useEffect, useRef, useState } from 'react';
import LabeledChip from './Chip';
import Link from 'next/link';
import Task from './Task';
import Skeleton from './Skeleton';
import AddButton from './AddButton';

type TaskListProps = {
    initialTasks: tasks.Task[];
    initialCounts: tasks.Counts;
    initialPageInfo: tasks.PageInfo;
};

const TaskList = ({ initialTasks, initialCounts, initialPageInfo }: TaskListProps) => {
    const intersectorRef = useRef<HTMLDivElement>(null);

    const [loading, setLoading] = useState(false);
    const [pageInfo, setPageInfo] = useState(initialPageInfo);
    const [taskList, setTaskList] = useState(initialTasks);
    const [counts, setCounts] = useState(initialCounts);

    useEffect(() => {
        if (loading || !intersectorRef.current || !pageInfo.nextPage) return;

        const observer = new IntersectionObserver(async (records) => {
            if (records.some((record) => record.isIntersecting)) {
                observer.disconnect();

                setLoading(true);

                try {
                    const response = await tasks.list({
                        params: {
                            page: pageInfo.page + 1,
                            per_page: pageInfo.per_page,
                        },
                    });

                    setTaskList((prev) => [...prev, ...response.data]);
                    setPageInfo(response.pageInfo);
                } catch {
                    // Would normally display a toast notification, rather than alert
                    alert('Failed to load more tasks.');
                } finally {
                    setLoading(false);
                }
            }
        });

        observer.observe(intersectorRef.current);

        return () => {
            observer.disconnect();
        };
    }, [loading, pageInfo]);

    const handleTaskChange = useCallback(async (targetTask: tasks.Task, completed: boolean) => {
        try {
            await tasks.update({
                body: { id: targetTask.id, completed },
            });

            setTaskList((prev) => {
                const copy = [...prev];
                const targetIndex = prev.findIndex((task) => task.id === targetTask.id);

                copy.splice(targetIndex, 1, { ...copy[targetIndex], completed });

                return copy;
            });

            setCounts((prev) => ({
                total: prev.total,
                total_completed: prev.total_completed + (completed ? 1 : -1),
            }));
        } catch {
            alert('Failed to update task.');
        }
    }, []);

    const handleTaskRemove = useCallback(async (targetTask: tasks.Task) => {
        try {
            await tasks.remove({
                body: { id: targetTask.id },
            });

            setTaskList((prev) => {
                const copy = [...prev];
                copy.splice(
                    prev.findIndex((task) => task.id === targetTask.id),
                    1
                );

                return copy;
            });

            setCounts((prev) => ({
                total: prev.total - 1,
                total_completed: targetTask.completed ? prev.total_completed - 1 : prev.total_completed,
            }));
        } catch {
            alert('Failed to remove task.');
        }
    }, []);

    return (
        <>
            <Link href='/create'>
                <AddButton text='Create Task' className='absolute -translate-x-1/2 left-1/2 top-[-27px]' />
            </Link>

            <div className='pt-[52px] flex flex-col gap-8'>
                <div className='flex justify-between'>
                    <LabeledChip label='Tasks' content={counts.total} />

                    <LabeledChip label='Completed' content={counts.total_completed} />
                </div>

                <ul className='flex flex-col gap-4'>
                    {taskList.map((task) => (
                        <Task key={`task-${task.id}`} task={task} onChange={handleTaskChange} onRemove={handleTaskRemove} />
                    ))}

                    <div ref={intersectorRef} className='w-full h-[1px]'></div>

                    {loading && [...Array(5)].map((_, i) => <Skeleton key={`skeleton-${i}`} className='w-full h-[50px]' />)}
                </ul>
            </div>
        </>
    );
};

export default TaskList;
