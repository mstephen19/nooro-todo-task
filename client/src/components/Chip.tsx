const Chip = ({ content }: { content: string | number }) => {
    return <div className='bg-[#333333] w-fit px-3 rounded-full'>{content}</div>;
};

const LabeledChip = ({ label, content }: { label: string; content: string | number }) => {
    return (
        <div className='flex gap-2 items-center'>
            <span className={`font-bold`}>{label}</span>

            <Chip content={content} />
        </div>
    );
};

export default LabeledChip;
