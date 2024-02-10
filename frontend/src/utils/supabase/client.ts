import { createBrowserClient } from '@supabase/ssr'
import { SupabaseClient } from '@supabase/supabase-js'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!
  )
}

const supabase = createClient()

export async function signUpNewUser(user: SignUpUser) {
  const { data, error } = await supabase.auth.signUp(user)

  if(error) {
    throw error
  }
}

export async function signIn(userCred: LoginUser) {
  const { data, error } = await supabase.auth.signInWithPassword(userCred)
  
  if (error) {
    throw error
  }
  
  //inside data is session and user data
  return { data, error }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
}