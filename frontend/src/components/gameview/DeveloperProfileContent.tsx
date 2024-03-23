import { getAllGames, getFavoriteGame, getGamesByDeveloper, setFavoriteGame } from "@/api/games";
import { useEffect, useState } from "react";
import GameCard from "../GameCardComp";

interface DeveloperProfileContentProps {
    game: Game
}

const DeveloperProfileContent: React.FC<DeveloperProfileContentProps> = ({ game }) => {

    const [otherGames, setOtherGames] = useState<Game[]>([]);

    useEffect(() => {
        async function fetchGamesByDeveloper(developerArgs: gameByDeveloperArgs) {
            try {
                const response = await getGamesByDeveloper(developerArgs);
                console.log(response.data);
                setOtherGames(response.data);
                // TEST SCROLLING
                // const data = response.data;
                // const duplicatedData = [...data, ...data, ...data, ...data];
                // setOtherGames(duplicatedData);
                
            } catch(error1) {
                console.error('Bad Response', error1);
            }
        }
        const devArgs: gameByDeveloperArgs = {
            select: "*",
            column: "Developers",
            equal: game.Developers
        };
        fetchGamesByDeveloper(devArgs);
    }, []);

    return (
        <>
            <div className="p-4 bg-stone-800 rounded-xl max-w-fit">
                <p className="text-3xl bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Game Developer: {game.Developers}</p>
                {/* <p className="text-2xl bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"></p> */}
            </div>
            {(otherGames.length > 1) && (
                <div className="mt-6 p-4 bg-stone-800 rounded-xl overflow-x-auto">
                    <p className="text-2xl bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Other Games by this Devloper</p>
                    <div className="flex space-x-4 mt-4 max-w-screen-lg">
                        {otherGames.map((devGame) => (
                            (game.AppID != devGame.AppID && <div key={devGame.AppID}>
                                <GameCard 
                                    key={devGame.AppID}   
                                    game={devGame} 
                                    onClick={()=> {}} 
                                    showFavorite={false}
                                />
                            </div>
                            )
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default DeveloperProfileContent;