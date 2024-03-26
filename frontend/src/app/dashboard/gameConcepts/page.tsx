import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import GameConceptsComp from '@/components/pageComps/GameConceptsComp';

export default async function personalConcepts() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }
  const UserID = data.user.id;

  return (
    <>
      <div className="flex min-h-screen w-full bg-gradient-to-r from-stone-500 text-stone-200">
        <GameConceptsComp UserID={UserID}/>
      </div>
    </>
  );
}