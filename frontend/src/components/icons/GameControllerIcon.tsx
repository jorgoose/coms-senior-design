interface GameControllerIconProps {
    className?: string;
}

const GameControllerIcon: React.FC<GameControllerIconProps> = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6B3FE7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M4 2v20h16V2H4zm8 14H8v-4h4v4zm0-8H8V4h4v4zm5 4h-3v-2h3V6h-3V4h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2z" />
        </svg>
    );
};

export default GameControllerIcon;