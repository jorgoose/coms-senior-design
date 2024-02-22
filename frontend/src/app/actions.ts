'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function signIn(prevState: any, formData: FormData) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        return {
            message: 'Please enter valid credentials',
        }
    } else {
        revalidatePath('/', 'layout');
        redirect('/');
    }
}

export async function signUp(prevState: any, formData: FormData) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
  
    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        username: formData.get('username') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        account_type: formData.get('account_type') as string
    }
  
    const { error } = await supabase.auth.signUp(data)
  
    if (error) {
        return {
            message: 'Account already in use',
        }
    } else {
        revalidatePath('/', 'layout');
        redirect('/');
    }
  }