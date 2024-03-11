'use client';

interface GameCardProps {
    className?: string;
    game: {
        AppID: number;
        Name: string;
        description: string;
        "Header image": string;
    };
}

const GameCard: React.FC<GameCardProps> = ({ className = '', game }) => {
    return (
        <div className="py-2">
            <div className="w-56 h-44 bg-stone-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 ease-in-out">
                <img className="w-max h-fit object-cover" src={game["Header image"]} alt={`Cover for ${game.Name}`} />
                <div className="px-4 py-3 h-2/5 flex items-center">
                    <h3 className="text-white text-sm font-bold align-middle">{game.Name}</h3>
                </div>
            </div>
        </div>
    );
};

export default GameCard;