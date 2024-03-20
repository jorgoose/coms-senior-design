'use client';

import { setFavoriteGame } from "@/api/games";
import { useState } from "react";

interface GameCardProps {
    game: Game;
    onClick: any;
    isFavorite?: boolean;
    UserID?: string;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick, isFavorite, UserID }) => {
    const [isFavorited, setIsFavorited] = useState(isFavorite);

    const toggleFavorite = () => {
        setIsFavorited(!isFavorited);

        console.log("WOWOW");

        if(isFavorited === false) {  
            console.log("GOt here");      
            const favGame: FavoriteGame = {
                UserID: UserID,
                AppID: game.AppID
            }
            setFavoriteGame(favGame);
        }
    };

    return (
        <div className="py-3 px-4">
            <div className="w-56 h-44 bg-stone-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 ease-in-out relative">
                <div className="absolute top-2 right-2 z-10">
                    <svg onClick={toggleFavorite} className={`w-6 h-6 ${isFavorited ? 'text-yellow-400' : 'text-gray-300'} cursor-pointer`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d={isFavorited 
                        ? "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" 
                        : "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"} />
                    </svg>
                </div>
                <div onClick={() => onClick(game)}>
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
        </div>
    );
};

export default GameCard;