'use client';

import React from 'react';
import SearchIcon from './icons/SearchIcon';

interface SearchInputProps {
    className: string;
    placeholder: string;
    type: string;
}

const SearchBar: React.FC<SearchInputProps> = ({ className, placeholder, type }) => {
    return (
        <form>
            <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4" />
                <input
                    className={className}
                    placeholder={placeholder}
                    type={type}
                />
            </div>
        </form>
    );
};

export default SearchBar;