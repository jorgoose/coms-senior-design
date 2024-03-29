'use client'

import Link from 'next/link';
import { useFormState } from 'react-dom'
import { signIn } from '@/api/auth';
import SubmitButton from '@/components/SubmitButton';

const initialState = {
    message: '',
}

export default function Login() {
    const [state, formAction] = useFormState(signIn, initialState);

    return (
        <>
            <div className="bg-gradient-to-r from-stone-500 h-screen w-full flex justify-center items-center flex-col">
                <p className="absolute top-20 text-8xl bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">TRENDPLAY</p>
                <form action={async (formData: FormData) => {
                    formAction(formData);
                }} className="bg-gradient-to-r from-blue-400 to-purple-500 flex justify-center items-center flex-col m-5 p-5 rounded-2xl shadow-2xl space-y-4 size-5/12">
                    <input className="rounded-md w-1/2 text-black" type="email" name="email" placeholder="Email" required />
                    <input className="rounded-md w-1/2 text-black" type="password" name="password" placeholder="Password" required />
                    <p aria-live="polite">
                        {state?.message}
                    </p>
                    <SubmitButton use='Login' />
                </form>
                <div className="text-white">No account? <Link href="/signup" className="underline">Sign up</Link></div>
            </div>
        </>
    );
}