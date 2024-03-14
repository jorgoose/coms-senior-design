import Label from "./LabelComp"
import HomeIcon from './icons/HomeIcon';
import LineChartIcon from './icons/LineChartIcon';
import CalendarIcon from './icons/CalendarIcon';
import ClipboardIcon from './icons/ClipboardIcon';
import LightbulbIcon from './icons/LightBulbIcon';
import TextIcon from './icons/TextIcon';
import NewspaperIcon from './icons/NewspaperIcon';

const SideBarComp: React.FC = () => {
    const handleClick = (label: string) => {
        console.log(`${label} clicked`);
    };

    return (
        <div className="fixed top-[60px] lg:top-[50px] w-[280px] h-screen overflow-auto py-4 bg-stone-800 border-r border-stone-700">
            <nav className="py-4 grid items-start text-sm font-medium gradient=text">
                <div className="space-y-6">
                    <div className="px-5">
                        <div className="flex items-center space-x-1 py-1 hover:bg-stone-700 rounded" style={{ cursor: 'pointer' }}> 
                            <HomeIcon className="w-6 h-5" />
                            <Label className="text-sky-500" htmlFor="publisher-details" onClick={() => handleClick('Home')}>
                                Home
                            </Label>
                        </div>
                    </div>
                    <div className="px-5">
                        <div className="flex items-center space-x-1 py-1 hover:bg-stone-700 rounded" style={{ cursor: 'pointer' }}>
                            <LineChartIcon className="w-6 h-5" />
                            <div className="hover:bg-stone-700 rounded-md">
                                <Label className="text-sky-500" htmlFor="publisher-details" onClick={() => handleClick('CurrentGameAnalytics')}>
                                    Current Game Analytics
                                </Label>
                            </div>
                        </div>
                    </div>
                    <div className="px-5">
                        <div className="flex items-center space-x-1 py-1 hover:bg-stone-700 rounded" style={{ cursor: 'pointer' }}>
                            <CalendarIcon className="w-6 h-5" />
                            <div className="hover:bg-stone-700 rounded-md">
                                <Label className="text-sky-500" htmlFor="steam-count" onClick={() => handleClick('Upcoming Games')}>
                                    Upcoming Games
                                </Label>
                            </div>
                        </div>
                    </div>
                    <div className="px-5">
                        <div className="flex items-center space-x-1 py-1 hover:bg-stone-700 rounded" style={{ cursor: 'pointer' }}>
                            <ClipboardIcon className="w-6 h-5" />
                            <div className="hover:bg-stone-700 rounded-md">
                                <Label className="text-sky-500" htmlFor="past-reviews" onClick={() => handleClick('Release Predictions')}>
                                    Release Predictions
                                </Label>
                            </div>
                        </div>
                    </div>
                    <div className="px-5">
                        <div className="flex items-center space-x-1 py-1 hover:bg-stone-700 rounded" style={{ cursor: 'pointer' }}>
                            <LightbulbIcon className="w-6 h-5" />
                            <div className="hover:bg-stone-700 rounded-md">
                                <Label className="text-sky-500" htmlFor="publisher-details" onClick={() => handleClick('Draft Game Ideas')}>
                                    Draft Game Idea
                                </Label>
                            </div>
                        </div>
                    </div>
                    <div className="px-5">
                        <div className="flex items-center space-x-1 py-1 hover:bg-stone-700 rounded" style={{ cursor: 'pointer' }}>
                            <TextIcon className="w-6 h-5" />
                            <div className="hover:bg-stone-700 rounded-md">
                                <Label className="text-sky-500" htmlFor="twitch-viewership" onClick={() => handleClick('Idea Exchange')}>
                                    Idea Exchange
                                </Label>
                            </div>
                        </div>
                    </div>
                    <div className="px-5">
                        <div className="flex items-center space-x-1 py-1 hover:bg-stone-700 rounded" style={{ cursor: 'pointer' }}>
                            <NewspaperIcon className="w-6 h-5" />
                            <div className="hover:bg-stone-700 rounded-md">
                                <Label className="text-sky-500" htmlFor="twitch-viewership" onClick={() => handleClick('Gaming Industry Roundup')}>
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