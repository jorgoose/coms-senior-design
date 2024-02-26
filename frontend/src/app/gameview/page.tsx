'use client'

import Image from "next/image"
import { useState } from "react";
import OverviewContent from "@/components/gameview/OverviewContent";
import SideBarComp from "@/components/SideBarComp";
import Link from "next/link";
import GamepadIcon from "@/components/icons/GamepadIcon";
import BellIcon from "@/components/icons/BellIcon";
import DropdownComp from "@/components/DropdownComp";

export default function Gameview() {
    const [selectedView, setSelectedView] = useState('overview');

    const desc = "With its extensive Tour of Duty campaign, a near-limitless number of skirmish modes, updates and new content for Counter-Strike's award-winning multiplayer game play, plus over 12 bonus single player missions, Counter-Strike: Condition Zero is a tremendous offering of single and multiplayer content.";

    const renderContent = (): JSX.Element => {
        switch (selectedView) {
            case 'overview':
                return <OverviewContent 
                        description={desc} />;
            // case 'developerProfile':
            //     return <DeveloperProfileContent />;
            // case 'releasePredictions':
            //     return <ReleasePredictionsContent />;
            // case 'discussion':
            //     return <DiscussionContent />;
            default:
                return <OverviewContent 
                        description={desc} />;
        }
    };

    return (
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
            <div className="lg:col-span-1">
                <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b border-stone-700 bg-stone-800 px-6">
                    <div className="w-full flex-1"></div>
                    <DropdownComp />
                </header>
                <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-center items-center w-full">
                        <div className="w-full max-w-screen-xl">
                            <Image
                                className="rounded-lg w-full"
                                src="https://cdn.akamai.steamstatic.com/steam/apps/80/header.jpg?t=1602535977"
                                alt="Example Image"
                                width={500}
                                height={500}
                            />
                        </div>
                    </div>
                    <div className="w-full max-w-screen-xl">
                        <p className="text-4xl bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text text-center mt-4">
                            Counter-Strike: Condition Zero
                        </p>
                    </div>
                    <div className="flex gap-4 mb-4 mt-2">
                        <button className={`px-2 text-center rounded-lg shadow-2xl ${selectedView === 'overview' ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'text-stone-400 bg-stone-700'}`} onClick={() => setSelectedView('overview')}>
                            Overview
                        </button>
                        <button className={`px-2 text-center rounded-lg shadow-2xl ${selectedView === 'developerProfile' ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'text-stone-400 bg-stone-700'}`} onClick={() => setSelectedView('developerProfile')}>
                            Developer Profile
                        </button>
                        <button className={`px-2 text-center rounded-lg shadow-2xl ${selectedView === 'releasePredictions' ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'text-stone-400 bg-stone-700'}`} onClick={() => setSelectedView('releasePredictions')}>
                            Release Predictions
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
    );
}