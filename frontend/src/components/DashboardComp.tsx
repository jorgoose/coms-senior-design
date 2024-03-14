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

// const games = [
//     {
//         id: 1,
//         title: "Rainbow Six Siege",
//         description: "Explore the wilds of Hyrule any way you like.",
//         imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/359550/header.jpg?t=1655223333",
//     },
//     {
//         id: 2,
//         title: "Destiny 2",
//         description: "Kratos and his son Atreus face the oncoming Norse apocalypse, Ragnarok.",
//         imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1085660/header.jpg?t=1657835870",
//     },
//     {
//         id: 3,
//         title: "Counter Strike: Condition Zero",
//         description: "Geralt of Rivia embarks on a quest to find the child of prophecy in a vast open world rich with merchant cities, pirate islands, dangerous mountain passes, and forgotten caverns to explore.",
//         imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/80/header.jpg?t=1602535977",
//     },
//     {
//         id: 4,
//         title: "Team Fortress",
//         description: "Team-based multiplayer shooter featuring a wide array of unique heroes, fast-paced and fun gameplay, and characters that you will learn to love",
//         imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/440/header.jpg?t=1592263852",
//     },
//     {
//         id: 5,
//         title: "PUBG Battlegrounds",
//         description: "A game about placing blocks and going on adventures. Explore randomly generated worlds and build amazing things from the simplest of homes to the grandest of castles.",
//         imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/578080/header.jpg?t=1658287469",
//     },
//     {
//         id: 6,
//         title: "Apex Legends",
//         description: "An open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour, and body modification.",
//         imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1172470/header.jpg?t=1657217209",
//     },
//     {
//         id: 7,
//         title: "Alf Life: Episode Two",
//         description: "Explore the wilds of Hyrule any way you like.",
//         imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/420/header.jpg?t=1602536144",
//     },
//     {
//         id: 9,
//         title: "Dota Two",
//         description: "Geralt of Rivia embarks on a quest to find the child of prophecy in a vast open world rich with merchant cities, pirate islands, dangerous mountain passes, and forgotten caverns to explore.",
//         imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg?t=1658774750",
//     },
//     {
//         id: 12,
//         title: "Destiny 2",
//         description: "Kratos and his son Atreus face the oncoming Norse apocalypse, Ragnarok.",
//         imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1085660/header.jpg?t=1657835870",
//     },
//     {
//         id: 13,
//         title: "Counter Strike: Condition Zero",
//         description: "Geralt of Rivia embarks on a quest to find the child of prophecy in a vast open world rich with merchant cities, pirate islands, dangerous mountain passes, and forgotten caverns to explore.",
//         imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/80/header.jpg?t=1602535977",
//     },
//     {
//         id: 14,
//         title: "Team Fortress",
//         description: "Team-based multiplayer shooter featuring a wide array of unique heroes, fast-paced and fun gameplay, and characters that you will learn to love",
//         imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/440/header.jpg?t=1592263852",
//     },
//     {
//         id: 15,
//         title: "PUBG Battlegrounds",
//         description: "A game about placing blocks and going on adventures. Explore randomly generated worlds and build amazing things from the simplest of homes to the grandest of castles.",
//         imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/578080/header.jpg?t=1658287469",
//     },
//     {
//         id: 16,
//         title: "Apex Legends",
//         description: "An open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour, and body modification.",
//         imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1172470/header.jpg?t=1657217209",
//     },
//     {
//         id: 17,
//         title: "Alf Life: Episode Two",
//         description: "Explore the wilds of Hyrule any way you like.",
//         imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/420/header.jpg?t=1602536144",
//     },
//     {
//         id: 19,
//         title: "Dota Two",
//         description: "Geralt of Rivia embarks on a quest to find the child of prophecy in a vast open world rich with merchant cities, pirate islands, dangerous mountain passes, and forgotten caverns to explore.",
//         imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg?t=1658774750",
//     },
//     {
//         id: 22,
//         title: "Destiny 2",
//         description: "Kratos and his son Atreus face the oncoming Norse apocalypse, Ragnarok.",
//         imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1085660/header.jpg?t=1657835870",
//     },
//     {
//         id: 23,
//         title: "Counter Strike: Condition Zero",
//         description: "Geralt of Rivia embarks on a quest to find the child of prophecy in a vast open world rich with merchant cities, pirate islands, dangerous mountain passes, and forgotten caverns to explore.",
//         imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/80/header.jpg?t=1602535977",
//     },
//     {
//         id: 24,
//         title: "Team Fortress",
//         description: "Team-based multiplayer shooter featuring a wide array of unique heroes, fast-paced and fun gameplay, and characters that you will learn to love",
//         imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/440/header.jpg?t=1592263852",
//     },
//     {
//         id: 25,
//         title: "PUBG Battlegrounds",
//         description: "A game about placing blocks and going on adventures. Explore randomly generated worlds and build amazing things from the simplest of homes to the grandest of castles.",
//         imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/578080/header.jpg?t=1658287469",
//     },
//     {
//         id: 26,
//         title: "Apex Legends",
//         description: "An open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour, and body modification.",
//         imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1172470/header.jpg?t=1657217209",
//     },
//     {
//         id: 72,
//         title: "Alf Life: Episode Two",
//         description: "Explore the wilds of Hyrule any way you like.",
//         imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/420/header.jpg?t=1602536144",
//     },
//     {
//         id: 29,
//         title: "Dota Two",
//         description: "Geralt of Rivia embarks on a quest to find the child of prophecy in a vast open world rich with merchant cities, pirate islands, dangerous mountain passes, and forgotten caverns to explore.",
//         imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg?t=1658774750",
//     },
//     {
//         id: 32,
//         title: "Destiny 2",
//         description: "Kratos and his son Atreus face the oncoming Norse apocalypse, Ragnarok.",
//         imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1085660/header.jpg?t=1657835870",
//     },
//     {
//         id: 33,
//         title: "Counter Strike: Condition Zero",
//         description: "Geralt of Rivia embarks on a quest to find the child of prophecy in a vast open world rich with merchant cities, pirate islands, dangerous mountain passes, and forgotten caverns to explore.",
//         imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/80/header.jpg?t=1602535977",
//     },
//     {
//         id: 43,
//         title: "Team Fortress",
//         description: "Team-based multiplayer shooter featuring a wide array of unique heroes, fast-paced and fun gameplay, and characters that you will learn to love",
//         imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/440/header.jpg?t=1592263852",
//     },
//     {
//         id: 35,
//         title: "PUBG Battlegrounds",
//         description: "A game about placing blocks and going on adventures. Explore randomly generated worlds and build amazing things from the simplest of homes to the grandest of castles.",
//         imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/578080/header.jpg?t=1658287469",
//     },
//     {
//         id: 36,
//         title: "Apex Legends",
//         description: "An open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour, and body modification.",
//         imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1172470/header.jpg?t=1657217209",
//     },
//     {
//         id: 37,
//         title: "Alf Life: Episode Two",
//         description: "Explore the wilds of Hyrule any way you like.",
//         imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/420/header.jpg?t=1602536144",
//     },
//     {
//         id: 39,
//         title: "Dota Two",
//         description: "Geralt of Rivia embarks on a quest to find the child of prophecy in a vast open world rich with merchant cities, pirate islands, dangerous mountain passes, and forgotten caverns to explore.",
//         imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg?t=1658774750",
//     },
// ];

const DashboardComp: React.FC<DashboardCompProps> = () => {

    const [games, setGames] = useState([]);

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