import Link from "next/link";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <>
      <div className="bg-gradient-to-r from-stone-500 h-screen w-full flex justify-center items-center flex-col">
        <p className="absolute top-20 text-8xl bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">TRENDPLAY</p>
        <Link className="p-5 m-5 w-1/5 h-1/8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full shadow-2xl text-center" href="/dashboard">DashBoard</Link>
        <Link className="p-5 m-5 w-1/5 h-1/8 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text rounded-full text-center" href="">Single Game View</Link>
      </div>
    </>
  );
}
