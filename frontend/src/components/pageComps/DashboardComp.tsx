'use client';

import { useState, useEffect } from "react";

import GameCard from "@/components/GameCardComp";
import { getAllGames } from '@/api/games';
import LayoutComponent from "../header/LayoutComponent";
import GameViewComp from "../gameview/GameViewComp";

const DashboardComp: React.FC<{}> = () => {

    const [games, setGames] = useState<Game[]>([]);

    const [showDashboard, setShowDashboard] = useState(true);

    const [game, setGame] = useState<Game>();

    const [ searchQuery, setSearchQuery ] = useState('');

    const filteredGames = games.filter((game) =>
        game?.Name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        async function fetchGames() {
            try {
                const response = await getAllGames();
                console.log(response.data);
                setGames(response.data);
            } catch (error) {
                console.error('Error fetching games:', error);
            }
        }
        fetchGames();
    }, []);

    const handleGameClick = (game: Game) => {
        setGame(game);
        game && setShowDashboard(false);
    };

    const dashboardLayout = () => (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredGames.map((game) => (
                    <div key={game.AppID} onClick={() => handleGameClick(game)}>
                        <GameCard key={game.AppID} game={game} />
                    </div>
                ))}
            </div>
    );

    const gameViewLayout = () => (
        game && <GameViewComp game={game} />
    );

    return (
        <>
            <LayoutComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery} showSearchBar={true}>
                    <main className="flex flex-col md:gap-8 pr-5 pt-[50px] lg:pt-[60px] overflow-auto">
                        {showDashboard ? dashboardLayout() : gameViewLayout()}
                    </main>
            </LayoutComponent>
        </>
    );
};

export default DashboardComp;