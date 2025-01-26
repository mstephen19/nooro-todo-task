import Image from 'next/image';

const Header = () => (
    <div className='w-full bg-[var(--black)] h-[200px] flex flex-col items-center justify-center'>
        <Image alt='Todo App logo' src='/logo.png' width={226} height={48} />
    </div>
);

export default Header;
