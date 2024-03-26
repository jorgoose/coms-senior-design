'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaUser } from 'react-icons/fa';
import LayoutComponent from '../header/LayoutComponent';
import { getAllUsers, getOneUser } from '@/api/user'; 
import dummyProfilePic from '../../components/profile/gamer.jpg';


const DeveloperProfileComp = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [profileData, setProfileData] = useState({
        favoriteGames: [
            {
                title: 'Counter Strike',
                description: 'A great adventure game',
                image: 'https://cdn.akamai.steamstatic.com/steam/apps/10/capsule_184x69.jpg'
            },
            {
                title: 'Two Dots',
                description: 'An exciting puzzle game',
                image: 'https://cdn.akamai.steamstatic.com/steam/apps/35450/header.jpg?t=1581480848'
            },
            {
                title: 'Dota 2',
                description: 'A fun platformer game',
                image: 'https://cdn.akamai.steamstatic.com/steam/apps/570/capsule_184x69.jpg'
            },

            {
                title: 'Among Us',
                description: 'A multiplayer party game of teamwork and betrayal',
                image: 'https://cdn.akamai.steamstatic.com/steam/apps/945360/capsule_184x69.jpg'
            },
            {
                title: 'Fortnite',
                description: 'A battle royale game with building mechanics',
                image: 'https://cdn.akamai.steamstatic.com/steam/apps/632360/capsule_184x69.jpg'
            },
            {
                title: 'Hades',
                description: 'An award-winning roguelike action game set in Greek mythology',
                image: 'https://cdn.akamai.steamstatic.com/steam/apps/1145360/capsule_184x69.jpg'
            }
        ]
        
    });

    const handleEditProfile = () => {
        console.log('Edit profile clicked');
    };

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
        };

        fetchUsers();
        fetchOneUser(UserID);
    }, []);

    return (
        <LayoutComponent searchQuery="" setSearchQuery={() => {}} showSearchBar={true}>
            <main className="flex flex-col gap-8 pr-5 pt-12 overflow-auto text-white">
                {users.map((user) => (
                    <div key={user.id} className="flex flex-col items-center relative bg-purple-900 p-8 rounded-xl shadow-lg">
                        {/* Use dummy profile picture if user profile picture is not available */}
                        <Image
                            src={user.profilePic || dummyProfilePic} // Use dummy profile picture if user doesn't have one
                            alt="Profile"
                            width={128}
                            height={128}
                            className="rounded-full border-4 border-white"
                        />

                         {/* Edit Profile Button */}
                    <button
                        onClick={handleEditProfile}
                        className="absolute top-0 right-0 mt-1 mr-1 bg-gray-900 hover:bg-gray-800 text-white font-bold py-1 px-2 rounded-full focus:outline-none shadow-md transition duration-300"
                    >
                        Edit
                    </button>


                        
                        <div className="mt-6 text-center">
                            <h3 className="text-3xl font-semibold leading-8">{user.username}</h3>
                            <p className="mt-4 max-w-md text-sm text-gray-300">
                                <span className="font-semibold">Username:</span> {user.username}
                            </p>
                            <p className="mt-2 max-w-md text-sm text-gray-300">
                                <span className="font-semibold">Date Joined:</span> {user.datejoined}
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
                ))}
                        
            </main>

                 {/* Favorite Games Section */}
                 <div className="mt-8">
                    <h4 className="text-lg font-medium leading-6">Favorite Games</h4>
                    <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-3">
                        {profileData.favoriteGames.map((game, index) => (
                            <div key={index} className="bg-black p-6 rounded-xl shadow-md hover:bg-maroon-600 transition duration-300 ease-in-out transform hover:-translate-y-2">
                                <h5 className="text-lg font-semibold text-white mb-2">{game.title}</h5>
                                <Image
                                    src={game.image}
                                    alt={game.title}
                                    width={150}
                                    height={150}
                                    className="rounded-lg"
                                />
                            </div>
                        ))}
                    </div>
                </div>
        </LayoutComponent>
    );
};

export default DeveloperProfileComp;
