'use client'

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { signUpNewUser } from '@/utils/supabase/client';

export default function SignUp() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [signupText, setSignupText] = useState<string>('Create Account');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
 
        const formData: FormData = new FormData(event.currentTarget);
        const formDataArray: [string, FormDataEntryValue][] = Array.from(formData.entries());

        const userDataSignUp: SignUpUser = {
            email: '',
            password: '',
            options: {
                data: {
                    username: '',
                    account_type: 0,
                }
            }
        };

        for (const pair of formDataArray) {
            const [key, value] = pair;
            if (key === 'username') {
                userDataSignUp.options.data.username = value.toString();
            } else if (key === 'email') {
                userDataSignUp.email = value.toString();
            } else if (key === 'password') {
                userDataSignUp.password = value.toString();
            } else if (key === 'account_type') {
                userDataSignUp.options.data.account_type = parseInt(value.toString(), 10);
            }
        }

        if(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_KEY) {
            const data = await signUpNewUser(userDataSignUp);

            if (data.error) {
                setSignupText(data.error.message);
                setEmail('');
                setPassword('');
                setUsername('');
            } else {
                setSignupText("Logging in!");
            }
        } else {
            console.error("Darn something broke");
        }

        setIsLoading(false);
    }

    return (
        <>
            <div className="bg-gradient-to-r from-stone-500 h-screen w-full flex justify-center items-center flex-col">
                <p className="absolute top-20 text-8xl bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">TRENDPLAY</p>
                <form onSubmit={onSubmit} className="bg-gradient-to-r from-blue-400 to-purple-500 flex justify-center items-center flex-col m-5 p-5 rounded-2xl shadow-2xl space-y-4 size-5/12">
                    <input className="rounded-md w-1/2 text-black" type="username" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input className="rounded-md w-1/2 text-black" type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input className="rounded-md w-1/2 text-black" type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <select className="rounded-md w-1/2 text-black" name="account_type" required>
                        <option value="">Select Account Type</option>
                        <option value="0">Gamer</option>
                        <option value="1">Developer</option>
                    </select>
                    <button type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : `${signupText}`}</button>
                </form>
                <Link className="absolute bottom-10 left-10 bg-gradient-to-r from-blue-400 to-purple-500 px-4 py-2 text-white rounded-md" href="/">Home</Link>
            </div>
        </>
    );
}