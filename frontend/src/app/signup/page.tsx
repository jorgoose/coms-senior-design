'use client'

import { FormEvent, useState } from 'react';
import { postSignUp } from '@/brokers/axios';
import Link from 'next/link';

export default function SignUp() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
 
        const formData: FormData = new FormData(event.currentTarget);
        const formDataArray: [string, FormDataEntryValue][] = Array.from(formData.entries());

        const userData: User = {
            username: '',
            email: '',
            password: '',
            account_type: 0,
        };

        for (const pair of formDataArray) {
            const [key, value] = pair;
            if (key === 'username') {
                userData.username = value.toString();
            } else if (key === 'email') {
                userData.email = value.toString();
            } else if (key === 'password') {
                userData.password = value.toString();
            } else if (key === 'account_type') {
                userData.account_type = parseInt(value.toString(), 10);
            }
        }
        console.log(userData);

        if (process.env.EC2_SERVER) {
            await postSignUp(process.env.EC2_SERVER, userData);
        } else {
            console.error("Could not resolve server contact");
        }

        setIsLoading(false);
    }

    return (
        <>
            <div className="bg-gradient-to-r from-stone-500 h-screen w-full flex justify-center items-center flex-col">
                <p className="absolute top-20 text-8xl bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">TRENDPLAY</p>
                <form onSubmit={onSubmit} className="bg-gradient-to-r from-blue-400 to-purple-500 flex justify-center items-center flex-col m-5 p-5 rounded-2xl shadow-2xl space-y-4 size-5/12">
                    <input className="rounded-md w-1/2 text-black" type="username" name="username" placeholder="Username" required />
                    <input className="rounded-md w-1/2 text-black" type="email" name="email" placeholder="Email" required />
                    <input className="rounded-md w-1/2 text-black" type="password" name="password" placeholder="Password" required />
                    <select className="rounded-md w-1/2 text-black" name="account_type" required>
                        <option value="">Select Account Type</option>
                        <option value="0">Gamer</option>
                        <option value="1">Developer</option>
                    </select>
                    <button type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Create Account'}</button>
                </form>
                <Link className="absolute bottom-10 left-10 bg-gradient-to-r from-blue-400 to-purple-500 px-4 py-2 text-white rounded-md" href="/">Return</Link>
            </div>
        </>
    );
}