'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaUser } from 'react-icons/fa';
import LayoutComponent from '../header/LayoutComponent';
import { getAllUsers, getOneUser } from '@/api/user';

const DeveloperProfileComp = () => {
    const [users, setUsers] = useState<any[]>([]);

    const UserID: string = localStorage.getItem('UserID') ?? '';
    console.log(`UserID: ${UserID}`);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getAllUsers();
                setUsers(usersData.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        const fetchOneUser = async (UserID: string) => {
            try {
                const singleUserData = await getOneUser(UserID);
                console.log(singleUserData);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        }

        fetchUsers();
        fetchOneUser(UserID);
    }, []);

    return (
        <LayoutComponent searchQuery="" setSearchQuery={() => {}} showSearchBar={true}>
            <main className="flex flex-col gap-8 pr-5 pt-12 overflow-auto text-white">
                {users.map((user, index) => (
                    <div key={index} className="flex flex-col items-center relative bg-purple-900 p-8 rounded-xl shadow-lg">

                        {/* Profile Info */}
                        <div className="mt-6 text-center">
                            <h3 className="text-3xl font-semibold leading-8">{user.username}</h3>
                            <p className="mt-4 max-w-md text-sm text-gray-300">
                                <span className="font-semibold">Username:</span> {user.username}
                            </p>
                            <p className="mt-2 max-w-md text-sm text-gray-300">
                                <span className="font-semibold">Date Joined:</span> {user.datejoined}
                            </p>
                            {/* Add other user info here */}
                        </div>
                    </div>
                ))}
            </main>
        </LayoutComponent>
    );
};

export default DeveloperProfileComp;