'use client';

import { useState, useEffect } from "react";

import GameCard from "@/components/GameCardComp";
import { getAllGames } from '@/api/games';
import LayoutComponent from "./header/LayoutComponent";

const DashboardComp: React.FC<{}> = () => {

    const [games, setGames] = useState<Game[]>([]);

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

    return (
        <>
            <LayoutComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery} showSearchBar={true}>
                    <main className="flex flex-col md:gap-8 pr-5 pt-[50px] lg:pt-[60px] overflow-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {filteredGames.map((game) => (
                                    <GameCard key={game.AppID} game={game} />
                                ))}
                            </div>
                    </main>
            </LayoutComponent>
        </>
    );
};

export default DashboardComp;