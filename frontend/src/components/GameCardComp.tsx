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
        <div className="w-48 h-64 bg-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={game.imageUrl} alt={game.title} className="w-full h-full object-cover"/>
        </div>
        <div className="bg-gray-700 bg-opacity-75 text-white p-4 flip-card-back">
          <h3 className="text-lg font-bold">{game.title}</h3>
          <p className="text-sm">{game.description}</p>
        </div>
      </div>
    </div>
    );
};

export default GameCard;