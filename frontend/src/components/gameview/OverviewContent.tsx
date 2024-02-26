interface OverviewContentProps {
    description: string
}

const OverviewContent: React.FC<OverviewContentProps> = ({description}) => {
    return (
        <div>
            <p className="m-4 mb-0 text-3xl bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Game Description</p>
            <p className="m-4 mt-2 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">{description}</p>
        </div>
    );
}

export default OverviewContent;