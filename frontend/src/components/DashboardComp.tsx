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

const dummyData = [
    {
        AppID: 1,
        Name: "Rainbow Six Siege",
        description: "Explore the wilds of Hyrule any way you like.",
        "Header image": "https://cdn.akamai.steamstatic.com/steam/apps/359550/header.jpg?t=1655223333",
    },
    {
        AppID: 2,
        Name: "Destiny 2",
        description: "Kratos and his son Atreus face the oncoming Norse apocalypse, Ragnarok.",
        "Header image": "https://cdn.akamai.steamstatic.com/steam/apps/1085660/header.jpg?t=1657835870",
    },
    {
        AppID: 3,
        Name: "Counter Strike: Condition Zero",
        description: "Geralt of Rivia embarks on a quest to find the child of prophecy in a vast open world rich with merchant cities, pirate islands, dangerous mountain passes, and forgotten caverns to explore.",
        "Header image": "https://cdn.akamai.steamstatic.com/steam/apps/80/header.jpg?t=1602535977",
    },
    {
        AppID: 4,
        Name: "Team Fortress",
        description: "Team-based multiplayer shooter featuring a wide array of unique heroes, fast-paced and fun gameplay, and characters that you will learn to love",
        "Header image": "https://cdn.akamai.steamstatic.com/steam/apps/440/header.jpg?t=1592263852",
    },
    {
        AppID: 5,
        Name: "PUBG Battlegrounds",
        description: "A game about placing blocks and going on adventures. Explore randomly generated worlds and build amazing things from the simplest of homes to the grandest of castles.",
        "Header image": "https://cdn.akamai.steamstatic.com/steam/apps/578080/header.jpg?t=1658287469",
    },
    {
        AppID: 6,
        Name: "Apex Legends",
        description: "An open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour, and body modification.",
        "Header image": "https://cdn.akamai.steamstatic.com/steam/apps/1172470/header.jpg?t=1657217209",
    },
    {
        AppID: 7,
        Name: "Alf Life: Episode Two",
        description: "Explore the wilds of Hyrule any way you like.",
        "Header image": "https://cdn.akamai.steamstatic.com/steam/apps/420/header.jpg?t=1602536144",
    },
    {
        AppID: 9,
        Name: "Dota Two",
        description: "Geralt of Rivia embarks on a quest to find the child of prophecy in a vast open world rich with merchant cities, pirate islands, dangerous mountain passes, and forgotten caverns to explore.",
        "Header image": "https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg?t=1658774750",
    },
    {
        AppID: 12,
        Name: "Destiny 2",
        description: "Kratos and his son Atreus face the oncoming Norse apocalypse, Ragnarok.",
        "Header image": "https://cdn.akamai.steamstatic.com/steam/apps/1085660/header.jpg?t=1657835870",
    },
    {
        AppID: 13,
        Name: "Counter Strike: Condition Zero",
        description: "Geralt of Rivia embarks on a quest to find the child of prophecy in a vast open world rich with merchant cities, pirate islands, dangerous mountain passes, and forgotten caverns to explore.",
        "Header image": "https://cdn.akamai.steamstatic.com/steam/apps/80/header.jpg?t=1602535977",
    },
    {
        AppID: 14,
        Name: "Team Fortress",
        description: "Team-based multiplayer shooter featuring a wide array of unique heroes, fast-paced and fun gameplay, and characters that you will learn to love",
        "Header image": "https://cdn.akamai.steamstatic.com/steam/apps/440/header.jpg?t=1592263852",
    },
    {
        AppID: 15,
        Name: "PUBG Battlegrounds",
        description: "A game about placing blocks and going on adventures. Explore randomly generated worlds and build amazing things from the simplest of homes to the grandest of castles.",
        "Header image": "https://cdn.akamai.steamstatic.com/steam/apps/578080/header.jpg?t=1658287469",
    },
    {
        AppID: 16,
        Name: "Apex Legends",
        description: "An open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour, and body modification.",
        "Header image": "https://cdn.akamai.steamstatic.com/steam/apps/1172470/header.jpg?t=1657217209",
    },
    {
        AppID: 17,
        Name: "Alf Life: Episode Two",
        description: "Explore the wilds of Hyrule any way you like.",
        "Header image": "https://cdn.akamai.steamstatic.com/steam/apps/420/header.jpg?t=1602536144",
    },
    {
        AppID: 19,
        Name: "Dota Two",
        description: "Geralt of Rivia embarks on a quest to find the child of prophecy in a vast open world rich with merchant cities, pirate islands, dangerous mountain passes, and forgotten caverns to explore.",
        "Header image": "https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg?t=1658774750",
    },
    {
        AppID: 22,
        Name: "Destiny 2",
        description: "Kratos and his son Atreus face the oncoming Norse apocalypse, Ragnarok.",
        "Header image": "https://cdn.akamai.steamstatic.com/steam/apps/1085660/header.jpg?t=1657835870",
    },
    {
        AppID: 23,
        Name: "Counter Strike: Condition Zero",
        description: "Geralt of Rivia embarks on a quest to find the child of prophecy in a vast open world rich with merchant cities, pirate islands, dangerous mountain passes, and forgotten caverns to explore.",
        "Header image": "https://cdn.akamai.steamstatic.com/steam/apps/80/header.jpg?t=1602535977",
    },
    {
        AppID: 24,
        Name: "Team Fortress",
        description: "Team-based multiplayer shooter featuring a wide array of unique heroes, fast-paced and fun gameplay, and characters that you will learn to love",
        "Header image": "https://cdn.akamai.steamstatic.com/steam/apps/440/header.jpg?t=1592263852",
    },
    {
        AppID: 25,
        Name: "PUBG Battlegrounds",
        description: "A game about placing blocks and going on adventures. Explore randomly generated worlds and build amazing things from the simplest of homes to the grandest of castles.",
        "Header image": "https://cdn.akamai.steamstatic.com/steam/apps/578080/header.jpg?t=1658287469",
    },
    {
        AppID: 26,
        Name: "Apex Legends",
        description: "An open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour, and body modification.",
        "Header image": "https://cdn.akamai.steamstatic.com/steam/apps/1172470/header.jpg?t=1657217209",
    },
    {
        AppID: 72,
        Name: "Alf Life: Episode Two",
        description: "Explore the wilds of Hyrule any way you like.",
        "Header image": "https://cdn.akamai.steamstatic.com/steam/apps/420/header.jpg?t=1602536144",
    },
    {
        AppID: 29,
        Name: "Dota Two",
        description: "Geralt of Rivia embarks on a quest to find the child of prophecy in a vast open world rich with merchant cities, pirate islands, dangerous mountain passes, and forgotten caverns to explore.",
        "Header image": "https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg?t=1658774750",
    },
    {
        AppID: 32,
        Name: "Destiny 2",
        description: "Kratos and his son Atreus face the oncoming Norse apocalypse, Ragnarok.",
        "Header image": "https://cdn.akamai.steamstatic.com/steam/apps/1085660/header.jpg?t=1657835870",
    },
    {
        AppID: 33,
        Name: "Counter Strike: Condition Zero",
        description: "Geralt of Rivia embarks on a quest to find the child of prophecy in a vast open world rich with merchant cities, pirate islands, dangerous mountain passes, and forgotten caverns to explore.",
        "Header image": "https://cdn.akamai.steamstatic.com/steam/apps/80/header.jpg?t=1602535977",
    },
    {
        AppID: 43,
        Name: "Team Fortress",
        description: "Team-based multiplayer shooter featuring a wide array of unique heroes, fast-paced and fun gameplay, and characters that you will learn to love",
        "Header image": "https://cdn.akamai.steamstatic.com/steam/apps/440/header.jpg?t=1592263852",
    },
    {
        AppID: 35,
        Name: "PUBG Battlegrounds",
        description: "A game about placing blocks and going on adventures. Explore randomly generated worlds and build amazing things from the simplest of homes to the grandest of castles.",
        "Header image": "https://cdn.akamai.steamstatic.com/steam/apps/578080/header.jpg?t=1658287469",
    },
    {
        AppID: 36,
        Name: "Apex Legends",
        description: "An open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour, and body modification.",
        "Header image": "https://cdn.akamai.steamstatic.com/steam/apps/1172470/header.jpg?t=1657217209",
    },
    {
        AppID: 37,
        Name: "Alf Life: Episode Two",
        description: "Explore the wilds of Hyrule any way you like.",
        "Header image": "https://cdn.akamai.steamstatic.com/steam/apps/420/header.jpg?t=1602536144",
    },
    {
        AppID: 39,
        Name: "Dota Two",
        description: "Geralt of Rivia embarks on a quest to find the child of prophecy in a vast open world rich with merchant cities, pirate islands, dangerous mountain passes, and forgotten caverns to explore.",
        "Header image": "https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg?t=1658774750",
    },
];

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