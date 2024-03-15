import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import IdeaExchangeComp from '@/components/IdeaExchangeComp';

export default async function Home() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
  
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      redirect('/login');
    }

    return (
        <>
            <div className="flex min-h-screen w-full bg-gradient-to-r from-stone-500 text-stone-200">
                <IdeaExchangeComp />
            </div>
        </>
    );
}
  