// DeveloperProfileComp.jsx

'use client'

import LayoutComponent from '../header/LayoutComponent';
import { useState } from 'react';
import Image from 'next/image';
import { FaUser } from 'react-icons/fa';
import profilePic from '../../components/profile/profile.jpg';

const DeveloperProfileComp = () => {
    const [profileData, setProfileData] = useState({
        name: 'John Doe',
        username: 'doey',
        dateJoined: 'January 1, 2022',
        bio: 'I am a Gamerican.',
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
            }
        ],
        profilePic: profilePic,
    });

    const handleEditProfile = () => {
        console.log('Edit profile clicked');
    };

    return (
        <LayoutComponent searchQuery={''} setSearchQuery={() => {}} showSearchBar={true}>
            <main className="flex flex-col gap-8 pr-5 pt-12 overflow-auto text-white">
                <div className="flex flex-col items-center relative bg-purple-900 p-8 rounded-xl shadow-lg">
                    {/* Profile Picture or Icon */}
                    {profileData.profilePic ? (
                        <Image
                            src={profileData.profilePic}
                            alt="Profile"
                            width={128}
                            height={128}
                            className="rounded-full border-4 border-white"
                        />
                    ) : (
                        <div className="rounded-full border-4 border-white flex items-center justify-center bg-gray-600 w-24 h-24">
                            <FaUser size={64} className="text-gray-400" />
                        </div>
                    )}

                    {/* Edit Profile Button */}
                    <button
                        onClick={handleEditProfile}
                        className="absolute top-0 right-0 mt-1 mr-1 bg-gray-900 hover:bg-gray-800 text-white font-bold py-1 px-2 rounded-full focus:outline-none shadow-md transition duration-300"
                    >
                        Edit
                    </button>

                    {/* Profile Info */}
                    <div className="mt-6 text-center">
                        <h3 className="text-3xl font-semibold leading-8">{profileData.name}</h3>
                        <p className="mt-4 max-w-md text-sm text-gray-300">
                            <span className="font-semibold">Username:</span> {profileData.username}
                        </p>
                        <p className="mt-2 max-w-md text-sm text-gray-300">
                            <span className="font-semibold">Date Joined:</span> {profileData.dateJoined}
                        </p>
                        <div className="mt-4">
                            <h4 className="text-lg font-semibold leading-6">Bio</h4>
                            <p className="mt-2 max-w-md text-sm text-gray-300">{profileData.bio}</p>
                        </div>
                    </div>
                </div>

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
            </main>
        </LayoutComponent>
    );
};

export default DeveloperProfileComp;
