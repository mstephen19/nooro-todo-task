'use client';

import { FormEventHandler, useState } from 'react';
import AddButton from './AddButton';
import { COLOR_OPTIONS } from '@/consts';
import { useRouter } from 'next/navigation';

const CreateForm = ({ createTask }: { createTask: (data: { title: string; color: `#${string}` }) => Promise<void> }) => {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const titleValid = Boolean(title.trim().length);

    const [color, setColor] = useState<`#${string}`>('#');
    const colorValid = color.length > 1;

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        try {
            createTask({ title, color });

            router.push('/');
        } catch {
            alert('Failed to create task.');
        }
    };

    return (
        <form className='py-8 flex flex-col gap-8' onSubmit={handleSubmit}>
            <div className='w-full flex flex-col gap-2'>
                <label className='font-bold text-[var(--blue)]' htmlFor='title'>
                    Title
                </label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Ex. Brush your teeth'
                    type='text'
                    name='title'
                    className='rounded-md bg-[var(--lightgrey)] border border-[var(--extralightgrey)] p-4'
                />
            </div>

            <fieldset className='w-full flex flex-col gap-2'>
                <legend className='font-bold text-[var(--blue)]'>Color</legend>

                <div className='flex gap-4'>
                    {COLOR_OPTIONS.map((hex) => {
                        const selected = hex === color;

                        return (
                            <label
                                key={`color-option-${hex}`}
                                className={`cursor-pointer overflow-hidden flex-[50px] shrink-0 grow-0 h-[50px] border-[2px] rounded-full ${
                                    !selected ? 'border-transparent' : 'border-white'
                                }`}>
                                <div className={`w-full h-full`} style={{ background: hex }}></div>
                                <input type='radio' checked={selected} value={hex} className='hidden' onChange={() => setColor(hex)} />
                            </label>
                        );
                    })}
                </div>
            </fieldset>

            <AddButton type='submit' disabled={!titleValid || !colorValid} text='Add Task' />
        </form>
    );
};

export default CreateForm;
