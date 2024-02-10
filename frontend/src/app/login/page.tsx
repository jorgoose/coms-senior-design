'use client'

import Link from "next/link";
import { FormEvent, useState } from "react";
import { postLogin } from "@/brokers/axios";
import { signIn } from "@/utils/supabase/client";

export default function Login() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
 
        const formData: FormData = new FormData(event.currentTarget);
        const formDataArray: [string, FormDataEntryValue][] = Array.from(formData.entries());

        const userData: LoginUser = {
            email: '',
            password: '',
        };

        for (const pair of formDataArray) {
            const [key, value] = pair;
            if (key === 'email') {
                userData.email = value.toString();
            } else if (key === 'password') {
                userData.password = value.toString();
            }
        }

        console.log(userData);

        // SAMS SIGN IN SUPABASE STUFF
        // --------------------------------------------------------------------

        if(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_KEY) {
            const data = await signIn(userData);
            console.log(data);
        } else {
            console.error("Darn something broke");
        }

        // END OF SAMS STUFF
        // --------------------------------------------------------------------

        if (process.env.EC2_SERVER) {
            await postLogin(process.env.EC2_SERVER, userData);
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
                    <input className="rounded-md w-1/2 text-black" type="email" name="email" placeholder="Email" required />
                    <input className="rounded-md w-1/2 text-black" type="password" name="password" placeholder="Password" required />
                    <button type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Login'}</button>
                </form>
                <Link className="absolute bottom-10 left-10 bg-gradient-to-r from-blue-400 to-purple-500 px-4 py-2 text-white rounded-md" href="/">Return</Link>
            </div>
        </>
    );
}