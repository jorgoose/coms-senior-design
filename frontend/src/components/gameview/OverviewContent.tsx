interface OverviewContentProps {
    description: string
}

const OverviewContent: React.FC<OverviewContentProps> = ({description}) => {
    return (
        <div className="mt-6">
            <p className="my-4 text-3xl bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Game Description</p>
            <p className="my-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">{description}</p>
        </div>
    );
}

export default OverviewContent;