'use client';

import { useState, useEffect, SetStateAction } from "react";
import LayoutComponent from "../header/LayoutComponent";
import { getAllGames } from '@/api/games';
import SearchBar from "../header/SearchBar";
import GameCard from "../GameCardComp";

const ViewGameAnalyticsComp: React.FC<{}> = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [selectedGame, setSelectedGame] = useState<Game>();
    const [comparisonGame, setComparisonGame] = useState<Game>();
    const [searchQuery, setSearchQuery] = useState('');
    const [compareSearchQuery, setCompareSearchQuery] = useState('');

    useEffect(() => {
        async function fetchGames() {
            const response = await getAllGames();
            setGames(response.data);
        }
        fetchGames();
    }, []);

    const handleGameSelection = (e: any, setGame: any) => {
        const gameId = e.target.value;
        const game = games.find(g => g.AppID === gameId);
        setGame(game);
    };


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>, isComparing: boolean = false) => {
        const query = event.target.value;
        if (isComparing) {
            setCompareSearchQuery(query);
        } else {
            setSearchQuery(query);
        }
    };

    const filteredGames = games.filter((game) =>
        game?.Name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredComparisonGames = games.filter((game) =>
        game?.Name?.toLowerCase().includes(compareSearchQuery.toLowerCase())
    );

    const GameAnalyticsDisplay = (game: Game) => {
        if (!game) return null;
    
        return (
            <div className="px-4 py-2 bg-gray-700 shadow rounded-lg fit-content">
            <img src={game["Header image"]} alt={game.Name} className="w-full h-auto rounded" />
            <div className="p-4">
                <h4 className="text-xl font-bold">{game.Name}</h4>
                <p className="text-lg text-semibold">Release Date: {game["Release date"]}</p>
                <p className="text-lg text-semibold">Price: ${game.Price}</p>
                <p className="text-lg text-semibold">Ratings:</p>
                <p className="text-lg text-semibold">&nbsp;&nbsp;Positive: {game.Positive}</p>
                <p className="text-lg text-semibold">&nbsp;&nbsp;Negative: {game.Negative}</p>
            </div>
        </div>
        );
    };

    const noGameSelected = () => {
        return (
            <>
                <div className="px-4">
                    <SearchBar 
                        placeholder="Search games..."
                        type="search"
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        classNameSize="max-w-xl"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {selectedGame ? GameAnalyticsDisplay(selectedGame) :
                        filteredGames.map((game) => (
                            <div key={game.AppID} onClick={() => setSelectedGame(game)} className="cursor-pointer">
                                <GameCard game={game} />
                            </div>
                        ))}
                </div>
            </>
        );
    };

    const oneGameSelected = () => {
        return (
            <>
                <div className="flex">
                    <div>
                        {selectedGame && GameAnalyticsDisplay(selectedGame)}
                    </div>
                    <div className="px-4">
                        <SearchBar 
                            placeholder="Select a game to compare..."
                            type="search"
                            searchQuery={compareSearchQuery}
                            setSearchQuery={setCompareSearchQuery}
                            classNameSize="max-w-xl"
                        />
                        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                            {filteredComparisonGames.map((game) => (
                                <div key={game.AppID} onClick={() => setComparisonGame(game)} className="cursor-pointer">
                                    <GameCard game={game} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        );
    }

    const bothGamesSelected = () => {
        return (
            <>
                <div className="flex center-items">
                    <div className="px-4">
                        {(selectedGame && GameAnalyticsDisplay(selectedGame))}
                    </div>
                    <div className="px-6">
                        {(comparisonGame && GameAnalyticsDisplay(comparisonGame))}
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <LayoutComponent searchQuery={''} setSearchQuery={() => {}} showSearchBar={false} title={"Select a Game to View Analytics"}>
                    <main className="flex flex-col md:gap-8 pr-5 pt-[50px] lg:pt-[60px] overflow-auto">
                        {!selectedGame && noGameSelected()}
                        {(selectedGame && !comparisonGame) && oneGameSelected()}
                        {(selectedGame && comparisonGame) && bothGamesSelected()}
                    </main>
            </LayoutComponent>
        </>
    );
};

export default ViewGameAnalyticsComp;