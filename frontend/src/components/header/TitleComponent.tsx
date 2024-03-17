// TitleComponent.jsx or TitleComponent.tsx

import React from "react";
import Link from "next/link";
import GamepadIcon from "../icons/GamepadIcon";
import BellIcon from "../icons/BellIcon";
import SearchBar from "@/components/header/SearchBar";
import DropdownComp from "@/components/header/DropdownComp";

interface TitleComponentProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    showSearchBar: boolean;
    title?: string;
}

const TitleComponent: React.FC<TitleComponentProps> = ({ searchQuery, setSearchQuery, showSearchBar, title }) => {
    return (
        <header className="fixed top-0 z-10 w-full lg:h-[60px] border-b border-stone-700 bg-stone-800 flex items-center gap-4">
            <div className="flex px-5">
                <Link className="flex items-center gap-1 font-semibold" href="#">
                    <GamepadIcon className="h-6 w-6" />
                    <span className="px-2 text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">TrendPlay</span>
                </Link>
                <button className="ml-auto pl-16 h-8 w-8 text-transparent">
                    <BellIcon className="h-5 w-5" />
                    <span className="sr-only">Toggle notifications</span>
                </button>
            </div>
            <div className="flex flex-1 items-center h-14 lg:h-[60px]">
                <div className="flex-grow ml-14">
                    {showSearchBar && <SearchBar 
                        placeholder="Search games..."
                        type="search"
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        classNameSize="md:w-2/3 lg:w-1/3"
                    />}
                    {!showSearchBar && <h1 
                        className="gradient-text font-bold text-2xl">{title}</h1>
                    }
                </div>
                <DropdownComp />
            </div>
        </header>
    );
};

export default TitleComponent;
