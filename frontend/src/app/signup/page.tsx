'use client'

import Link from 'next/link';
import SubmitButton from '@/components/SubmitButton';
import { signUp } from '@/app/actions';
import { useFormState } from 'react-dom';

const initialState = {
    message: '',
}

export default function SignUp() {
    const [state, formAction] = useFormState(signUp, initialState);

    return (
        <>
            <div className="bg-gradient-to-r from-stone-500 h-screen w-full flex justify-center items-center flex-col">
                <p className="absolute top-20 text-8xl bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">TRENDPLAY</p>
                <form action={async (formData: FormData) => {
                    formAction(formData);
                }} className="bg-gradient-to-r from-blue-400 to-purple-500 flex justify-center items-center flex-col m-5 p-5 rounded-2xl shadow-2xl space-y-4 size-5/12">
                    <input className="rounded-md w-1/2 text-black" type="username" name="username" placeholder="Username" required />
                    <input className="rounded-md w-1/2 text-black" type="email" name="email" placeholder="Email" required />
                    <input className="rounded-md w-1/2 text-black" type="password" name="password" placeholder="Password" required />
                    <select className="rounded-md w-1/2 text-black" name="account_type" required>
                        <option value="">Select Account Type</option>
                        <option value="0">Gamer</option>
                        <option value="1">Developer</option>
                    </select>
                    <p aria-live="polite">
                        {state?.message}
                    </p>
                    <SubmitButton use='Sign up' />
                </form>
                <Link className="absolute bottom-10 left-10 bg-gradient-to-r from-blue-400 to-purple-500 px-4 py-2 text-white rounded-md" href="/">Home</Link>
            </div>
        </>
    );
}