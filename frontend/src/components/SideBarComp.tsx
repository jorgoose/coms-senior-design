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
    <aside className="w-75 bg-gray-800 text-white p-6 space-y-6">
        <div className="space-y-5">
            <div className="flex items-center space-x-1 space-y-1 px-5">
                <HomeIcon className="w-6 h-5" />
                <Label className="font-normal" htmlFor="publisher-details">
                    Home
                </Label>
            </div>
            <div className="flex items-center space-x-1 space-y-1 px-5">
                <LineChartIcon className="w-6 h-5" />
                <Label className="font-normal" htmlFor="publisher-details">
                    CurrentGameAnalytics
                </Label>
            </div>
            <div className="flex items-center space-x-1 space-y-1 px-5">
                <CalendarIcon className="w-6 h-5" />
                <Label className="font-normal" htmlFor="steam-count">
                    Upcoming Games
                </Label>
            </div>
            <div className="flex items-center space-x-1 space-y-1 px-5">
                <ClipboardIcon className="w-6 h-5" />
                <Label className="font-normal" htmlFor="past-reviews">
                    Release Predictions
                </Label>
            </div>
            <div className="flex items-center space-x-1 space-y-1 px-5">
                <LightbulbIcon className="w-6 h-5" />
                <Label className="font-normal" htmlFor="publisher-details">
                    Draft Game Idea
                </Label>
            </div>
            <div className="flex items-center space-x-1 space-y-1 px-5">
                <TextIcon className="w-6 h-5" />
                <Label className="font-normal" htmlFor="twitch-viewership">
                    Idea Exchange
                </Label>
            </div>
            <div className="flex items-center space-x-1 space-y-1 px-5">
                <NewspaperIcon className="w-6 h-5" />
                <Label className="font-normal" htmlFor="twitch-viewership">
                    Gaming Industry Roundup
                </Label>
            </div>
        </div>
    </aside>
  );
};

export default SideBarComp;