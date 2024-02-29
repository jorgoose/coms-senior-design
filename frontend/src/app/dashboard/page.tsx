import Link from "next/link";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import GamepadIcon from "../../components/icons/GamepadIcon";

import { createClient } from '@/utils/supabase/server'
import SideBarComp from "../../components/SideBarComp";
import BellIcon from "../../components/icons/BellIcon"
import DropdownComp from "@/components/DropdownComp";
import SearchBar from "@/components/SearchBar";
import TestComp from "@/components/TestComp";

export default async function Home() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
  
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      redirect('/login');
    }
  
    return (
        <>
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
                <div className="flex flex-col">
                    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b border-stone-700 bg-stone-800 px-6">
                        <div className="w-full flex-1">
                            <SearchBar 
                                placeholder="Search games..."
                                type="search"
                            />
                        </div>
                        <DropdownComp />
                    </header>
                </div>
                <TestComp />
            </div>
        </>
    );
}
  