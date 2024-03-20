'use client'
import LayoutComponent from '../header/LayoutComponent';
import { useState } from 'react';
import Image from 'next/image'; 
import { FaUserCircle } from 'react-icons/fa';

const DeveloperProfileComp = () => {
    const [profileData, setProfileData] = useState({
        name: 'John Doe',
        age: 30,
        skills: ['JavaScript', 'React', 'Node.js'],
        bio: 'I am a passionate developer eager to learn and grow.',
        favoriteGames: [
            { title: 'Counter Strike', description: 'A great adventure game' },
            { title: 'Two Dots', description: 'An exciting puzzle game' },
            { title: 'Dota 2', description: 'A fun platformer game' },
        ],
        profilePic: null,
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
                            objectFit="cover" 
                            quality={100} 
                        />
                    ) : (
                        <div className="rounded-full border-4 border-white flex items-center justify-center bg-gray-600 w-24 h-24">
                            <FaUserCircle size={64} className="text-gray-400" /> 
                        </div>
                    )}

                    {/* Edit Profile Button */}
                    <button
                        onClick={handleEditProfile}
                        className="absolute top-0 right-0 mt-1 mr-1 bg-gray-900 hover:bg-gray-800 text-white font-bold py-1 px-2 rounded-full focus:outline-none shadow-md"
                    >
                        Edit
                    </button>

                    {/* Profile Info */}
                    <h3 className="text-3xl font-semibold leading-8 mt-6">{profileData.name}</h3>
                    <p className="mt-1 text-sm text-gray-300">Age: {profileData.age}</p>
                    <div className="mt-4">
                        <h4 className="text-lg font-medium leading-6">Skills</h4>
                        <ul className="mt-2 list-disc list-inside text-sm text-gray-300">
                            {profileData.skills.map(skill => (
                                <li key={skill}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-4">
                        <h4 className="text-lg font-medium leading-6">Bio</h4>
                        <p className="mt-2 max-w-md text-sm text-gray-300">{profileData.bio}</p>
                    </div>
                </div>

                {/* Favorite Games Section */}
                <div className="mt-8">
                    <h4 className="text-lg font-medium leading-6">Favorite Games</h4>
                    <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-3">
                        {profileData.favoriteGames.map(game => (
                            <div key={game.title} className="bg-black p-6 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:-translate-y-2 hover:bg-maroon-600">
                                <h5 className="text-lg font-semibold text-white mb-2">{game.title}</h5>
                                <p className="text-sm text-gray-300">{game.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </LayoutComponent>
    );
};

export default DeveloperProfileComp;
