import Link from "next/link";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import GamepadIcon from "../../components/icons/GamepadIcon";

import { createClient } from '@/utils/supabase/server'
import NavBarComp from "../../components/NavBarComp";

export default async function Home() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
  
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      redirect('/login');
    }
  
    return (
      <>
        <div className="flex flex-col h-screen">
            <header className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
                <div className="flex items-center space-x-4">
                <GamepadIcon className="w-8 h-8" />
                <Link className="text-lg font-semibold" href="#">
                    GameStats
                </Link>
                </div>
                <nav className="flex space-x-4">
                    <Link className="py-2 hover:underline" href="#">
                        Home
                    </Link>
                    <Link className="py-2 hover:underline" href="#">
                        Upcoming Games
                    </Link>
                    <Link className="px-4 py-2 bg-white text-gray-900 rounded-md" href="#">
                        Sign Out
                    </Link>
                </nav>
            </header>
            <main className="flex flex-1 overflow-hidden">
                <NavBarComp />
            </main>
        </div>
      </>
    );
  }
  