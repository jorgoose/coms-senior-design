import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!
  )
}

const supabase = createClient()

export async function signUpNewUser(user: SignUpUser) {
  const { data, error } = await supabase.auth.signUp(user);
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
}