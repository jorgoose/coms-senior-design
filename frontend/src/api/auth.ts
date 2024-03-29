'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function signIn(prevState: any, formData: FormData) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // type-casting here for convenience
    // in practice, we should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        return {
            message: error.message,
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
    // in practice, we should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        options: {
            data: {
                username: formData.get('username') as string,
                account_type: formData.get('account_type') as string,
            }
        }
    }
  
    const { error } = await supabase.auth.signUp(data)

    console.log(error);
  
    if (error) {
        return {
            message: error.message,
        }
    } else {
        revalidatePath('/', 'layout');
        redirect('/');
    }
}