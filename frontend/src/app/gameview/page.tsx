'use client'

import Image from "next/image"
import { useState } from "react";
import OverviewContent from "@/components/gameview/OverviewContent";
import DeveloperProfileContent from "@/components/gameview/DeveloperProfileContent";
import DiscussionContent from "@/components/gameview/DiscussionContent";
import SideBarComp from "@/components/SideBarComp";
import Link from "next/link";
import GamepadIcon from "@/components/icons/GamepadIcon";
import BellIcon from "@/components/icons/BellIcon";
import DropdownComp from "@/components/DropdownComp";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

const dummyData = [
    {
        "About the game":"With its extensive Tour of Duty campaign, a near-limitless number of skirmish modes, updates and new content for Counter-Strike's award-winning multiplayer game play, plus over 12 bonus single player missions, Counter-Strike: Condition Zero is a tremendous offering of single and multiplayer content.",
        "Achievements":"0",
        "AppID":"80",
        "Average playtime forever":"1523",
        "Average playtime two weeks":"18",
        "Categories":"Single-player,Multi-player,Valve Anti-Cheat enabled",
        "DLC count":"0",
        "Developers":"Valve",
        "Estimated owners":"5000000 - 10000000",
        "Full audio languages":"[]",
        "Genres":"Action",
        "Header image":"https://cdn.akamai.steamstatic.com/steam/apps/80/header.jpg?t=1602535977",
        "Linux":"TRUE",
        "Mac":"TRUE",
        "Median playtime forever":"36",
        "Median playtime two weeks":"22",
        "Metacritic score":"65",
        "Metacritic url":"https://www.metacritic.com/game/pc/counter-strike-condition-zero?ftag=MCD-06-10aaa1f",
        "Movies":null,
        "Name":"Counter-Strike: Condition Zero",
        "Negative":"1871",
        "Notes":null,
        "Peak CCU":"425",
        "Positive":"19314",
        "Price":"9.99",
        "Publishers":"Valve",
        "Recommendations":"15155",
        "Release date":"1-Mar-04",
        "Required age":"0",
        "Reviews":null,
        "Score rank":null,
        "Screenshots":null,
        "Support email":null,
        "Support url":"http://steamcommunity.com/app/80",
        "Supported languages":"['English', 'French', 'German', 'Italian', 'Spanish - Spain', 'Simplified Chinese', 'Traditional Chinese', 'Korean']",
        "Tags":"Action,FPS,Shooter,Multiplayer,First-Person,Singleplayer,Classic,Tactical,Team-Based,Competitive,Military,Strategy,Online Co-Op,Adventure,Survival,Atmospheric,Open World,Old School,Simulation,Dark",
        "User score":"0",
        "Website":null,
        "Windows":"TRUE"
    }
]

export default async function Gameview() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
  
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      redirect('/login');
    }

    const [selectedView, setSelectedView] = useState('overview');

    const parsed = dummyData[0];

    const desc = parsed["About the game"];
    const dev = parsed.Developers;

    const renderContent = (): JSX.Element => {
        switch (selectedView) {
            case 'overview':
                return <OverviewContent 
                        description={desc} />;
            case 'developerProfile':
                return <DeveloperProfileContent
                        developer={dev} />;
            case 'discussion':
                return <DiscussionContent />;
            default:
                return <OverviewContent 
                        description={desc} />;
        }
    };

    return (
        <div className="dark grid min-h-screen w-full lg:grid-cols-[280px_1fr] bg-gradient-to-r from-stone-500 text-stone-200">
            {/* Sticky sidebar and top bar div, use sticky and top-0 */}
            <div className="border-r border-stone-700 bg-stone-800 lg:block">
                <div className="sticky top-0">
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
            <div className="lg:col-span-1">
                {/* Sticky header, use sticky and top-0 */}
                <header className="sticky top-0 flex h-14 lg:h-[60px] items-center gap-4 border-b border-stone-700 bg-stone-800 px-6">
                    <div className="w-full flex-1"></div>
                    <DropdownComp />
                </header>
                <div className="overflow-auto">
                    <div className="w-full max-w-screen-xl">
                        <Image
                            className="rounded-lg w-full"
                            src="https://cdn.akamai.steamstatic.com/steam/apps/80/header.jpg?t=1602535977"
                            alt="Example Image"
                            width={500}
                            height={500}
                        />
                    </div>
                    <div className="m-4">
                        <p className="text-4xl bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-6">
                            Counter-Strike: Condition Zero
                        </p>
                        <div className="flex gap-4 mb-4 mt-2">
                            <button className={`px-2 text-center rounded-lg shadow-2xl ${selectedView === 'overview' ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'text-stone-400 bg-stone-700'}`} onClick={() => setSelectedView('overview')}>
                                Overview
                            </button>
                            <button className={`px-2 text-center rounded-lg shadow-2xl ${selectedView === 'developerProfile' ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'text-stone-400 bg-stone-700'}`} onClick={() => setSelectedView('developerProfile')}>
                                Developer Profile
                            </button>
                            <button className={`px-2 text-center rounded-lg shadow-2xl ${selectedView === 'discussion' ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'text-stone-400 bg-stone-700'}`} onClick={() => setSelectedView('discussion')}>
                                Discussion
                            </button>
                        </div>
                        <div>
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}