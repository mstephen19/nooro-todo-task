import { tasks } from '@/api';
import CreateForm from '@/components/CreateForm';
import Image from 'next/image';
import Link from 'next/link';

const Create = () => {
    const createTask = async (data: { title: string; color: `#${string}` }) => {
        'use server';
        await tasks.create({
            body: data,
        });
    };

    return (
        <div className='pt-[52px]'>
            <Link href='/'>
                <Image alt='Back icon' src='/back.svg' width={30} height={30} />
            </Link>

            <CreateForm createTask={createTask} />
        </div>
    );
};

export default Create;
