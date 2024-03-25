import { useState, useRef, useEffect } from 'react';
import Link from 'next/link'; 

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
        <div className="relative inline-block text-left px-8" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-full border border-gray-400 w-8 h-8 bg-gray-200 flex items-center justify-center"
                aria-haspopup="true"
                aria-expanded={isOpen ? 'true' : 'false'}
            >
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
                        <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-300" role="menuitem">
                            Logout
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownComp;
