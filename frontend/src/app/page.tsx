import Link from "next/link";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();

  // IMPORTANT:
  // THIS IS JUST A LANDING PAGE TO EITHER REDIRECT TO LOGIN OR DASHBOARD

  if (error || !data?.user) {
    redirect('/login');
  } else {
    redirect('/dashboard');
  }

  return (
    <>
    </>
  );
}
