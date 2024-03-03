import Link from "next/link";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import GamepadIcon from "../../components/icons/GamepadIcon";

import { createClient } from '@/utils/supabase/server'
import SideBarComp from "../../components/SideBarComp";
import BellIcon from "../../components/icons/BellIcon"
import DropdownComp from "@/components/DropdownComp";
import SearchBar from "@/components/SearchBar";
import GameCard from "@/components/GameCardComp";

export default async function Home() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
  
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      redirect('/login');
    }

    const games = [
        {
            id: 1,
            title: "The Legend of Zelda: Breath of the Wild",
            description: "Explore the wilds of Hyrule any way you like.",
            imageUrl: "https://via.placeholder.com/150",
        },
        {
            id: 2,
            title: "God of War",
            description: "Kratos and his son Atreus face the oncoming Norse apocalypse, Ragnarok.",
            imageUrl: "https://via.placeholder.com/150",
        },
        {
            id: 3,
            title: "The Witcher 3: Wild Hunt",
            description: "Geralt of Rivia embarks on a quest to find the child of prophecy in a vast open world rich with merchant cities, pirate islands, dangerous mountain passes, and forgotten caverns to explore.",
            imageUrl: "https://via.placeholder.com/150",
        },
        {
            id: 4,
            title: "Overwatch",
            description: "Team-based multiplayer shooter featuring a wide array of unique heroes, fast-paced and fun gameplay, and characters that you will learn to love",
            imageUrl: "https://via.placeholder.com/150",
        },
        {
            id: 5,
            title: "Minecraft",
            description: "A game about placing blocks and going on adventures. Explore randomly generated worlds and build amazing things from the simplest of homes to the grandest of castles.",
            imageUrl: "https://via.placeholder.com/150",
        },
        {
            id: 6,
            title: "Cyberpunk 2077",
            description: "An open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour, and body modification.",
            imageUrl: "https://via.placeholder.com/150",
        },
    ];
  
    return (
        <>
            <div className="dark grid min-h-screen w-full lg:grid-cols-[280px_1fr] bg-gradient-to-r from-stone-500 text-stone-200">
                <div className="hidden border-r border-stone-700 bg-stone-800 lg:block">
                    <div className="flex h-full max-h-screen flex-col gap-2">
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
                        <SideBarComp />
                    </div>
                </div>
                <div className="flex flex-col">
                    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b border-stone-700 bg-stone-800 px-6">
                        <div className="w-full flex-1">
                            <SearchBar 
                                placeholder="Search games..."
                                type="search"
                            />
                        </div>
                        <DropdownComp />
                    </header>
                    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                        <div className="p-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {games.map((game) => (
                                    <GameCard key={game.id} game={game} />
                                ))}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
  