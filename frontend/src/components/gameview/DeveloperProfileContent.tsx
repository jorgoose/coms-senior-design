// This will display all the other games made by the same developer
// Right now it displays the developer
interface DeveloperProfileContentProps {
    developer: string
}

const DeveloperProfileContent: React.FC<DeveloperProfileContentProps> = ({developer}) => {
    return (
        <div className="mt-6">
            <p className="my-4 text-3xl bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Game Developer</p>
            <p className="my-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">{developer}</p>
        </div>
    );
}

export default DeveloperProfileContent;