'use client'

import Image from "next/image"
import { useState } from "react";
import OverviewContent from "@/components/OverviewContent";

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
        <div className="flex flex-col justify-center items-center bg-gradient-to-r from-stone-500">
            <div className="flex flex-col justify-center items-center w-full m-4">
                <Image
                className="rounded-lg"
                src="https://cdn.akamai.steamstatic.com/steam/apps/80/header.jpg?t=1602535977"
                alt="Example Image"
                width={500}
                height={500}
                />
            </div>
            <p className="text-4xl bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text text-center">Counter-Strike: Condition Zero</p>
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
    );
}