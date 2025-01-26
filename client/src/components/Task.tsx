import Image from 'next/image';

import type { tasks } from '@/api';
import { memo, useCallback } from 'react';
import Link from 'next/link';

const Task = memo(function Task({
    task,
    onChange,
    onRemove,
}: {
    task: tasks.Task;
    onChange: (task: tasks.Task, complete: boolean) => void | Promise<void>;
    onRemove: (task: tasks.Task) => void | Promise<void>;
}) {
    const handleChange = useCallback(() => onChange(task, !task.completed), [task, onChange]);

    const handleRemove = useCallback(() => onRemove(task), [task, onRemove]);

    return (
        <li
            className='bg-[var(--lightgrey)] p-3 rounded-md border  flex gap-3'
            style={{
                borderColor: task.color,
            }}>
            <button
                onClick={handleChange}
                type='button'
                className={`relative rounded-full border-[2px] ${
                    task.completed ? 'border-[var(--purple)] bg-[var(--purple)]' : 'border-[var(--blue)]'
                } flex-[27px] grow-0 shrink-0 h-[27px]`}>
                {task.completed && (
                    <div className='absolute -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2 border-b-[2px] border-r-[2px] h-[12px] w-[8px] border-white rotate-[45deg]'></div>
                )}
            </button>

            <Link className='flex-1' href={`/create/${task.id}`}>
                <span className='break-all'>{task.title}</span>
            </Link>

            <button onClick={handleRemove} type='button' className='h-fit active:opacity-75'>
                <Image alt='Trash' src='/trash.svg' width={27} height={30} />
            </button>
        </li>
    );
});

export default Task;
