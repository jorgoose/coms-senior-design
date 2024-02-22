import React from 'react';
import Label from "./LabelComp"
import ProfileIcon from './icons/ProfileIcon';
import StarIcon from './icons/StarIcon';
import HomeIcon from './icons/HomeIcon';
import CreateDraftIcon from './icons/LightBulbIcon';
import LineChartIcon from './icons/LineChartIcon';
import CalendarIcon from './icons/CalendarIcon';
import ClipboardIcon from './icons/ClipboardIcon';
import LightbulbIcon from './icons/LightBulbIcon';
import TextIcon from './icons/TextIcon';
import NewspaperIcon from './icons/NewspaperIcon';

const SideBarComp: React.FC = () => {
  return (
    <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text">
            <div className="space-y-5">
                <div className="flex items-center space-x-1 space-y-1 px-5">
                    <HomeIcon className="w-6 h-5" />
                    <Label className="font-normal text-transparent" htmlFor="publisher-details">
                        Home
                    </Label>
                </div>
                <div className="flex items-center space-x-1 space-y-1 px-5">
                    <LineChartIcon className="w-6 h-5" />
                    <Label className="font-normal text-transparent" htmlFor="publisher-details">
                        CurrentGameAnalytics
                    </Label>
                </div>
                <div className="flex items-center space-x-1 space-y-1 px-5">
                    <CalendarIcon className="w-6 h-5" />
                    <Label className="font-normal text-transparent" htmlFor="steam-count">
                        Upcoming Games
                    </Label>
                </div>
                <div className="flex items-center space-x-1 space-y-1 px-5">
                    <ClipboardIcon className="w-6 h-5" />
                    <Label className="font-normal text-transparent" htmlFor="past-reviews">
                        Release Predictions
                    </Label>
                </div>
                <div className="flex items-center space-x-1 space-y-1 px-5">
                    <LightbulbIcon className="w-6 h-5" />
                    <Label className="font-normal text-transparent" htmlFor="publisher-details">
                        Draft Game Idea
                    </Label>
                </div>
                <div className="flex items-center space-x-1 space-y-1 px-5">
                    <TextIcon className="w-6 h-5" />
                    <Label className="font-normal text-transparent" htmlFor="twitch-viewership">
                        Idea Exchange
                    </Label>
                </div>
                <div className="flex items-center space-x-1 space-y-1 px-5">
                    <NewspaperIcon className="w-6 h-5" />
                    <Label className="font-normal text-transparent" htmlFor="twitch-viewership">
                        Gaming Industry Roundup
                    </Label>
                </div>
            </div>
        </nav>
    </div>
  );
};

export default SideBarComp;