'use client'

import OverviewContent from "./OverviewContent";
import DeveloperProfileContent from "./DeveloperProfileContent";
import DiscussionContent from "./DiscussionContent";
import { useState } from "react";


// TODO Fix this type
interface ButtonBarProps {
    data: any
}

const ButtonBar: React.FC<ButtonBarProps> = ({data}) => {
    const [selectedView, setSelectedView] = useState('overview');

    const parsed = data[0];

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
        <>
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
        </>
    );
}

export default ButtonBar;