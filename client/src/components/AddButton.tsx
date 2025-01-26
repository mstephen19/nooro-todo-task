import Image from 'next/image';

const AddButton = ({
    type = 'button',
    text,
    className,
    disabled,
}: {
    text: string;
    className?: string;
    disabled?: boolean;
    type?: 'submit' | 'button';
}) => {
    return (
        <button
            disabled={disabled}
            className={`${
                disabled ? 'pointer-events-none ' : ''
            }disabled:opacity-50 font-bold w-full bg-[var(--blue)] h-[52px] rounded-md active:bg-blue-600 hover:bg-blue-800${
                className ? ` ${className}` : ''
            }`}
            type={type}>
            {text}
            <span className='inline-block align-middle pl-2'>
                <Image alt='Plus icon' src='/plus.svg' width={20} height={20} />
            </span>
        </button>
    );
};

export default AddButton;
