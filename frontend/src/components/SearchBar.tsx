'use client';

import React, { useState, FocusEvent } from 'react';
import SearchIcon from './icons/SearchIcon';

interface SearchInputProps {
    placeholder: string;
    type: string;
}

const SearchBar: React.FC<SearchInputProps> = ({ placeholder, type }) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => setIsFocused(true);
    const handleBlur = (event: FocusEvent<HTMLInputElement>) => setIsFocused(false);
  

    return (
        <form>
            <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4" />
                <input
                    className={`w-full bg-stone-700 shadow-none appearance-none rounded-lg pl-8 h-9 md:w-2/3 lg:w-1/3 focus:outline-none 
                    focus:ring-2 focus:ring-purple-800 ${isFocused ? 'text-sky-400' : 'text-sky-400'}`}
                    placeholder={placeholder}
                    type={type}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
        </form>
    );
};

export default SearchBar;