'use client';

import Link from "next/link";
import GamepadIcon from "./icons/GamepadIcon";
import { SetStateAction, useState, useEffect } from "react";

import SideBarComp from "./SideBarComp";
import BellIcon from "./icons/BellIcon"
import DropdownComp from "@/components/DropdownComp";
import SearchBar from "@/components/SearchBar";
import GameCard from "@/components/GameCardComp";
import { getAllGames } from '@/api/games';

interface DashboardCompProps {
}

const DashboardComp: React.FC<DashboardCompProps> = () => {

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
            <div className="fixed top-0 left-0 h-screen w-[280px] border-r border-stone-700 bg-stone-800 overflow-auto lg:block">
                <div className="flex flex-col gap-2">
                    <div className="flex h-[60px] items-center border-b border-stone-700 px-5">
                        <Link className="flex items-center gap-2 font-semibold" href="#">
                            <GamepadIcon className="h-6 w-6" />
                            <span className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">TrendPlay</span>
                        </Link>
                        <button className="ml-auto h-8 w-8 text-transparent">
                            <BellIcon className="h-5 w-5" />
                            <span className="sr-only">Toggle notifications</span>
                        </button>
                    </div>
                    <SideBarComp  />
                </div>
            </div>
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