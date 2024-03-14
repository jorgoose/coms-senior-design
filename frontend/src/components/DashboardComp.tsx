'use client';

import { useState, useEffect } from "react";

import DropdownComp from "@/components/DropdownComp";
import SearchBar from "@/components/SearchBar";
import GameCard from "@/components/GameCardComp";
import { getAllGames } from '@/api/games';
import SidebarMenuComp from "./SidebarMenuComp";

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
            <SidebarMenuComp />
            <div className="flex flex-col w-full lg:pl-[280px]">
                <header className="fixed top-0 z-10 w-full h-14 lg:h-[60px] border-b border-stone-700 bg-stone-800 px-6 flex items-center gap-4">
                    <div className="w-full flex-1">
                        <div className="p-5">
                            <SearchBar 
                                placeholder="Search games..."
                                type="search"
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                            />
                        </div>
                    </div>
                    <DropdownComp />
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 pt-[60px] lg:pt-[60px] overflow-auto">
                    <div className="p-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {filteredGames.map((game) => (
                                <GameCard key={game.AppID} game={game} />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default DashboardComp;