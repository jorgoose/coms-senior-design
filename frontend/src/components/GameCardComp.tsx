'use client';

interface GameCardProps {
    game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
    return (
        <div className="py-3 px-4">
            <div className="w-56 h-44 bg-stone-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 ease-in-out relative">
                {game["Header image"]!="" ? (
                    <img 
                        className="w-max h-fit object-cover" 
                        src={game["Header image"]} 
                        alt={`Cover for ${game.Name}`} 
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <img
                            className="object-contain h-3/5" 
                            alt={`Cover for ${game.Name}`} 
                        />
                    </div>
                )}
                <div className="absolute bottom-0 px-4 py-3 flex items-center"> 
                    <h3 className="text-white text-sm font-bold align-middle">{game.Name}</h3>
                </div>
            </div>
        </div>
    );
};

export default GameCard;