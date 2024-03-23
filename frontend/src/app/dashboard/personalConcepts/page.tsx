import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import PersonalConceptsComp from '@/components/pageComps/PersonalConceptsComp';

export default async function personalConcepts() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }
  const currUser = data.user;

  return (
    <>
      <div className="flex min-h-screen w-full bg-gradient-to-r from-stone-500 text-stone-200">
        <PersonalConceptsComp user={currUser}/>
      </div>
    </>
  );
}