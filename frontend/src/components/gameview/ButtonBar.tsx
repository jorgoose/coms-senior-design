'use client'

import OverviewContent from "./OverviewContent";
import DeveloperProfileContent from "./DeveloperProfileContent";
import DiscussionContent from "./DiscussionContent";
import { useState } from "react";
import AnalyticsComp from "./AnalyticsComp";
import RelatedNewsComp from "./RelatedNewsComp";

interface ButtonBarProps {
    game: Game,
    devGameClick?: any
}

const ButtonBar: React.FC<ButtonBarProps> = ({ game, devGameClick }) => {
    const [selectedView, setSelectedView] = useState('overview');

    const desc = game["About the game"];

    const renderContent = (): JSX.Element => {
        switch (selectedView) {
            case 'overview':
                return <OverviewContent 
                        description={desc} />;
            case 'analytics':
                return <AnalyticsComp 
                        game={game} />;
            case 'developerProfile':
                return <DeveloperProfileContent
                            game={game} 
                            devGameClick={devGameClick}
                        />;
            case 'relatedNews':
                return <RelatedNewsComp
                            game={game} 
                        />;
            case 'discussion':
                return <DiscussionContent />;
            default:
                return <OverviewContent 
                        description={desc} />;
        }
    };

    return (
        <>
            <div className="flex gap-4 mb-4 mt-2 py-3">
                <button className={`px-2 text-center rounded-lg shadow-2xl ${selectedView === 'overview' ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'text-stone-400 bg-stone-700'}`} onClick={() => setSelectedView('overview')}>
                    Overview
                </button>
                <button className={`px-2 text-center rounded-lg shadow-2xl ${selectedView === 'analytics' ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'text-stone-400 bg-stone-700'}`} onClick={() => setSelectedView('analytics')}>
                    Analytics
                </button>
                <button className={`px-2 text-center rounded-lg shadow-2xl ${selectedView === 'developerProfile' ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'text-stone-400 bg-stone-700'}`} onClick={() => setSelectedView('developerProfile')}>
                    Developer Profile
                </button>
                <button className={`px-2 text-center rounded-lg shadow-2xl ${selectedView === 'relatedNews' ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'text-stone-400 bg-stone-700'}`} onClick={() => setSelectedView('relatedNews')}>
                    Related News
                </button>
                <button className={`px-2 text-center rounded-lg shadow-2xl ${selectedView === 'discussion' ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'text-stone-400 bg-stone-700'}`} onClick={() => setSelectedView('discussion')}>
                    Discussion
                </button>
            </div>
            <div>
                {renderContent()}
            </div>
        </>
    );
}

export default ButtonBar;