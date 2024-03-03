'use client';

interface GameCardProps {
    className?: string;
    game: {
        id: number;
        title: string;
        description: string;
        imageUrl: string;
    };
}

const GameCard: React.FC<GameCardProps> = ({ className = '', game }) => {
    return (
        <div className="py-4">
            <div className="w-52 h-60 bg-stone-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 ease-in-out">
                <img className="w-full h-2/3 object-cover" src={game.imageUrl} alt={`Cover for ${game.title}`} />
                <div className="px-4 py-2 h-1/3 flex items-center">
                    <h3 className="text-white text-sm font-bold">{game.title}</h3>
                </div>
            </div>
        </div>
    );
};

export default GameCard;