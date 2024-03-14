'use client';

import SearchIcon from '../icons/SearchIcon';

interface SearchInputProps {
    placeholder: string;
    type: string;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchInputProps> = ({ placeholder, type, searchQuery, setSearchQuery }) => {
    return (
        <form>
            <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4" />
                <input
                    className="w-full bg-stone-700 shadow-none appearance-none rounded-lg pl-8 h-9 md:w-2/3 lg:w-1/3 focus:outline-none 
                    focus:ring-2 focus:ring-purple-800 text-sky-400"
                    placeholder={placeholder}
                    type={type}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </form>
    );
};

export default SearchBar;