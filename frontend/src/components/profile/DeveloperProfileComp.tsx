'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import LayoutComponent from '../header/LayoutComponent';
import { getOneUser } from '@/api/user'; 
import dummyProfilePic from '../../components/profile/gamer.jpg';
import { getFavoriteGame } from '@/api/games';  

const DeveloperProfileComp = () => {
    const [user, setUser] = useState<User>();
    const [favoriteGames, setFavoriteGames] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const userID = localStorage.getItem('UserID') ?? '';
                const userData = await getOneUser(userID);
                setUser(userData.data[0]);
                const favoriteGamesData = await getFavoriteGame(userID);
                setFavoriteGames(favoriteGamesData.data); 
                setIsLoading(false);
            } catch (error) {
                setError('Error fetching profile data');
                console.error('Error fetching profile data:', error);
                setIsLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    console.log(user);

    return (
        <LayoutComponent searchQuery="" setSearchQuery={() => {}} showSearchBar={true}>
            <main className="flex flex-col gap-8 pr-5 pt-12 overflow-auto text-white">
                {isLoading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {!isLoading && !error && user && (
                    <div key={user.id} className="flex flex-col items-center relative bg-purple-900 p-8 rounded-xl shadow-lg">
                        <Image
                            src={user.profilePic || dummyProfilePic}
                            alt="Profile"
                            width={128}
                            height={128}
                            className="rounded-full border-4 border-white"
                        />
                        <a
                            href="/edit-profile"
                            className="absolute top-0 right-0 mt-1 mr-1 bg-gray-900 hover:bg-gray-800 text-white font-bold py-1 px-2 rounded-full focus:outline-none shadow-md transition duration-300"
                        >
                            Edit
                        </a>
                        <div className="mt-6 text-center">
                            <h3 className="text-3xl font-semibold leading-8">{user.username}</h3>
                            <p className="mt-4 max-w-md text-sm text-gray-300">
                                <span className="font-semibold">Username:</span> {user.username}
                            </p>
                            <p className="mt-2 max-w-md text-sm text-gray-300">
                                <span className="font-semibold">Date Joined:</span> {user.created_at}
                            </p>
                            {user.bio && (
                                <div className="mt-2 max-w-md text-sm text-gray-300">
                                    <span className="font-semibold">Bio:</span> {user.bio}
                                </div>
                            )}
                            {user.account_type && (
                                <p className="mt-2 max-w-md text-sm text-gray-300">
                                    <span className="font-semibold">Account Type:</span> {user.account_type}
                                </p>
                            )}
                        </div>
                    </div>
                )}
                <div className="mt-8">
                    <h4 className="text-lg font-medium leading-6">Favorite Games</h4>
                    <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-3">
                        {favoriteGames.map((game, index) => (
                            <div key={index} className="bg-black p-6 rounded-xl shadow-md hover:bg-maroon-600 transition duration-300 ease-in-out transform hover:-translate-y-2">
                                <h5 className="text-lg font-semibold text-white mb-2">{game.Name}</h5>
                                <Image
                                    src={game["Header image"]}
                                    alt={game.Name}
                                    width={150}
                                    height={150}
                                    className="rounded-lg"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </LayoutComponent>
    );
};

export default DeveloperProfileComp;
