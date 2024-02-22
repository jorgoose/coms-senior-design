'use client'

import React, { useState, useRef, useEffect } from 'react';

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

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-full border border-stone-700 w-8 h-8 bg-stone-700 flex items-center justify-center"
                aria-haspopup="true"
                aria-expanded={isOpen ? 'true' : 'false'}
            >
                <img
                    alt="Avatar"
                    className="rounded-full w-8 h-8"
                    src="/placeholder.svg"
                    style={{
                    aspectRatio: '1 / 1',
                    objectFit: 'cover',
                    }}
                />
                <span className="sr-only">Toggle user menu</span>
            </button>
            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-stone-800 text-stone-400">
                    <div className="rounded-lg" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <a href="#" className="block px-4 py-2 text-sm hover:bg-stone-700 gradient-text" role="menuitem">
                            My Account
                        </a>
                        <a href="#" className="block px-4 py-2 text-sm hover:bg-stone-700 gradient-text" role="menuitem">
                            Settings
                        </a>
                        <a href="#" className="block px-4 py-2 text-sm hover:bg-stone-700 gradient-text" role="menuitem">
                            Support
                        </a>
                        <a href="#" className="block px-4 py-2 text-sm hover:bg-stone-700 gradient-text" role="menuitem">
                            Logout
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownComp;
