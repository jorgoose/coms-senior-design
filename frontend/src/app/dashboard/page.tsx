import Link from "next/link";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import GamepadIcon from "../../components/icons/GamepadIcon";

import { createClient } from '@/utils/supabase/server'
import SideBarComp from "../../components/SideBarComp";
import SearchIcon from "../../components/icons/SearchIcon"
import BellIcon from "../../components/icons/BellIcon"
import DropdownComp from "@/components/DropdownComp";

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
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">TrendPlay</span>
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
                    <Link className="lg:hidden text-orange-500" href="#">
                        <GamepadIcon className="h-6 w-6" />
                        <span className="sr-only">Home</span>
                    </Link>
                    <div className="w-full flex-1">
                        <form>
                            <div className="relative">
                                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4" />
                                <input
                                    className="w-full bg-stone-700 shadow-none appearance-none rounded-lg pl-8 h-9 md:w-2/3 lg:w-1/3 text-stone-400"
                                    placeholder="Search games..."
                                    type="search"
                                />
                            </div>
                        </form>
                    </div>
                    <DropdownComp />
                </header>
            </div>
        </div>
      </>
    );
  }

//   <nav className="flex space-x-4">
//                         <Link className="py-2 hover:underline" href="#">
//                             Home
//                         </Link>
//                         <Link className="py-2 hover:underline" href="#">
//                             Upcoming Games
//                         </Link>
//                         <Link className="px-4 py-2 bg-white text-gray-900 rounded-md" href="#">
//                             Sign Out
//                         </Link>
//                     </nav>
//                     <main className="flex flex-1 overflow-hidden">
                        
//                     </main>
  