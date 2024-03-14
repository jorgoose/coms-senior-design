'use client';

import Link from "next/link";
import GamepadIcon from "./icons/GamepadIcon";

import SideBarComp from "./SideBarComp";
import BellIcon from "./icons/BellIcon"

const SidebarMenuComp: React.FC<{}> = () => {

    return (
        <>
            <div className="fixed top-0 left-0 h-screen w-[280px] border-r border-stone-700 bg-stone-800 overflow-auto lg:block">
                <div className="flex flex-col gap-2">
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
                    <SideBarComp  />
                </div>
            </div>
        </>
    );
};

export default SidebarMenuComp;