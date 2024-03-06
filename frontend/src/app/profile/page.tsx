import Link from "next/link";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import GamepadIcon from "../../components/icons/GamepadIcon";
import { createClient } from '@/utils/supabase/server';
import SideBarComp from "../../components/SideBarComp";
import BellIcon from "../../components/icons/BellIcon";
import DropdownComp from "@/components/DropdownComp";
import SearchBar from "@/components/SearchBar";
import ProfileIcon from "../../components/icons/ProfileIcon"; 

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
                    <SideBarComp />
                </div>

                <div className="flex flex-col">
                    <header className="flex h-14 lg:h-[60px] items-center justify-between border-b border-stone-700 bg-stone-800 px-6">
                        <SearchBar placeholder="Search games..." type="search" />
                        <div className="flex items-center gap-4">
                            <ProfileIcon className="h-8 w-8" /> {/* Profile icon */}
                            <DropdownComp />
                        </div>
                    </header>
                    <main className="flex-1 overflow-y-auto p-6">
                        <div className="bg-stone-800 rounded-lg shadow-md p-6 text-center">
                            <div className="avatar mb-4">
                                <div className="w-24 h-24 rounded-full bg-stone-700 inline-flex items-center justify-center">
                                    <ProfileIcon className="h-12 w-12 text-stone-300" /> {/* Profile icon */}
                                </div>
                            </div>
                            <h2 className="text-3xl text-stone-100 font-bold mb-4">Username</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <button className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-red-800 transition duration-300 ease-in-out">Thing 1</button>
                                <button className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-red-800 transition duration-300 ease-in-out">Thing 2</button>
                                <button className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-red-800 transition duration-300 ease-in-out">Thing 3</button>
                                <button className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-red-800 transition duration-300 ease-in-out">Thing 4</button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
