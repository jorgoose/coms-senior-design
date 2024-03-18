import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
<<<<<<< HEAD
import ViewGameAnalyticsComp from '@/components/pageComps/ViewGameAnalyticsComp';
=======
import CurrentGameAnalyticsComp from '@/components/pageComps/CurrentGameAnalyticsComp';
>>>>>>> 31f3000af6a602b233986504cb9b8d1b09349016

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
                <ViewGameAnalyticsComp />
            </div>
        </>
    );
}
  