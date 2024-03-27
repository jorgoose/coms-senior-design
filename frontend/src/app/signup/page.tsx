'use client'

import Link from 'next/link';
import { useFormState } from 'react-dom'
import { signUp } from '@/api/auth';
import SubmitButton from '@/components/SubmitButton';

const initialState = {
    message: '',
}

export default function SignUp() {
    const [state, formAction] = useFormState(signUp, initialState);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-800 to-purple-900 flex items-center justify-center">
            <div className="max-w-md w-full mx-auto py-12 px-8 bg-gray-800 rounded-lg shadow-lg">
                <div className="mb-10 text-center">
                    <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                        TrendPlay
                    </h1>
                    <p className="text-gray-400 text-sm pt-2">Create an account to start validating game ideas</p>
                </div>
                <form
                    action={async (formData: FormData) => {
                        formAction(formData);
                    }}
                    className="space-y-8"
                >
                    <div>
                        <label htmlFor="username" className="block text-cerulean mb-2">
                            Username
                        </label>
                        <input
                            id="username"
                            className="w-full px-4 py-3 text-gray-300 bg-gray-700 rounded-md focus:outline-none focus:bg-gray-600 focus:ring-2 focus:ring-purple-500"
                            type="text"
                            name="username"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-cerulean mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            className="w-full px-4 py-3 text-gray-300 bg-gray-700 rounded-md focus:outline-none focus:bg-gray-600 focus:ring-2 focus:ring-purple-500"
                            type="email"
                            name="email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-cerulean mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            className="w-full px-4 py-3 text-gray-300 bg-gray-700 rounded-md focus:outline-none focus:bg-gray-600 focus:ring-2 focus:ring-purple-500"
                            type="password"
                            name="password"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="account_type" className="block text-cerulean mb-2">
                            Account Type
                        </label>
                        <select
                            id="account_type"
                            className="w-full px-4 py-3 text-gray-300 bg-gray-700 rounded-md focus:outline-none focus:bg-gray-600 focus:ring-2 focus:ring-purple-500"
                            name="account_type"
                            required
                        >
                            <option value="">Select Account Type</option>
                            <option value="0">Gamer</option>
                            <option value="1">Developer</option>
                        </select>
                    </div>
                    <p aria-live="polite" className="text-red-500">
                        {state?.message}
                    </p>
                    <div className="flex justify-center">
                        <SubmitButton
                            use='Sign up'
                            customStyles={{
                                default: 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-md px-4 py-2 m-2',
                                hover: 'hover:bg-gradient-to-l hover:from-purple-600 hover:to-indigo-700 transition-colors duration-300 cursor-pointer',
                                pending: 'bg-gradient-to-r from-purple-400 to-indigo-500 cursor-not-allowed'
                            }}
                        />
                    </div>
                </form>
                <p className="mt-8 text-center text-gray-400">
                    Already have an account?{' '}
                    <Link href="/login" className="text-purple-400 hover:text-purple-300">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
