'use client'
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link'; 
import Image from 'next/image';
import profilePic from '../../components/profile/gamer.jpg'; // Import profile picture

const DropdownComp: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        
        localStorage.removeItem('accessToken');
        // Redirect to the login page
        window.location.href = '/login'; 
    };

    return (
        <div className="relative inline-block text-left px-8" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-full border border-gray-400 w-8 h-8 bg-gray-200 flex items-center justify-center"
                aria-haspopup="true"
                aria-expanded={isOpen ? 'true' : 'false'}
            >
               {/* Profile picture */}
               <div className="w-8 h-8 relative rounded-full overflow-hidden">
                   <Image
                       alt="Avatar"
                       src={profilePic} 
                       layout="fill"
                       objectFit="cover"
                   />
               </div>
               <span className="sr-only">Toggle user menu</span>
            </button>
            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-200 text-gray-800">
                    <div className="rounded-lg" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <Link href="/profile"> {/* Link to profile page */}
                            <a className="block px-4 py-2 text-sm hover:bg-gray-300" role="menuitem">
                                My Account
                            </a>
                        </Link>
                        <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-300" role="menuitem">
                            Settings
                        </a>
                        <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-300" role="menuitem">
                            Support
                        </a>
                        <button onClick={handleLogout} className="block px-4 py-2 text-sm hover:bg-gray-300 w-full text-left" role="menuitem">
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownComp;
