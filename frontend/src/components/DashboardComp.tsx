'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import GamepadIcon from "./icons/GamepadIcon";

import SideBarComp from "./SideBarComp";
import BellIcon from "./icons/BellIcon"
import DropdownComp from "@/components/DropdownComp";
import SearchBar from "@/components/SearchBar";
import GameCard from "@/components/GameCardComp";
import { getAllGames } from '@/api/games';
import SidebarMenuComp from "./SidebarMenuComp";
import TitleComponent from "./TitleComponent";
import LayoutComponent from "./LayoutComponent";

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
            <LayoutComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
                    <main className="flex-1 flex-col md:gap-8 md:p-6 pt-[60px] lg:pt-[60px] overflow-auto">
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