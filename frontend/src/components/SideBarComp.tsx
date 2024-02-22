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
        <nav className="grid items-start px-4 text-sm font-medium gradient=text">
            <div className="space-y-5">
                <div className="px-5">
                    <div className="flex items-center space-x-1 space-y-1 hover:bg-stone-700 rounded corners"> 
                        <HomeIcon className="w-6 h-5" />
                        <Label className="font-bold text-violet-500" htmlFor="publisher-details">
                            Home
                        </Label>
                    </div>
                </div>
                <div className="px-5">
                    <div className="flex items-center space-x-1 space-y-1 hover:bg-stone-700 rounded corners">
                        <LineChartIcon className="w-6 h-5" />
                        <div className="hover:bg-stone-700 rounded-md">
                            <Label className="font-bold text-violet-500" htmlFor="publisher-details">
                                CurrentGameAnalytics
                            </Label>
                        </div>
                    </div>
                </div>
                <div className="px-5">
                    <div className="flex items-center space-x-1 space-y-1 hover:bg-stone-700 rounded corners">
                        <CalendarIcon className="w-6 h-5" />
                        <div className="hover:bg-stone-700 rounded-md">
                            <Label className="font-bold text-violet-500" htmlFor="steam-count">
                                Upcoming Games
                            </Label>
                        </div>
                    </div>
                </div>
                <div className="px-5">
                    <div className="flex items-center space-x-1 space-y-1 hover:bg-stone-700 rounded corners">
                        <ClipboardIcon className="w-6 h-5" />
                        <div className="hover:bg-stone-700 rounded-md">
                            <Label className="font-bold text-violet-500" htmlFor="past-reviews">
                                Release Predictions
                            </Label>
                        </div>
                    </div>
                </div>
                <div className="px-5">
                    <div className="flex items-center space-x-1 space-y-1 hover:bg-stone-700 rounded corners">
                        <LightbulbIcon className="w-6 h-5" />
                        <div className="hover:bg-stone-700 rounded-md">
                            <Label className="font-bold text-violet-500" htmlFor="publisher-details">
                                Draft Game Idea
                            </Label>
                        </div>
                    </div>
                </div>
                <div className="px-5">
                    <div className="flex items-center space-x-1 space-y-1 hover:bg-stone-700 rounded corners">
                        <TextIcon className="w-6 h-5" />
                        <div className="hover:bg-stone-700 rounded-md">
                            <Label className="font-bold text-violet-500" htmlFor="twitch-viewership">
                                Idea Exchange
                            </Label>
                        </div>
                    </div>
                </div>
                <div className="px-5">
                    <div className="flex items-center space-x-1 space-y-1 hover:bg-stone-700 rounded corners">
                        <NewspaperIcon className="w-6 h-5" />
                        <div className="hover:bg-stone-700 rounded-md">
                            <Label className="font-bold text-violet-500" htmlFor="twitch-viewership">
                                Gaming Industry Roundup
                            </Label>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
  );
};

export default SideBarComp;