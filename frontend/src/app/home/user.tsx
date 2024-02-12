import React from 'react';
import Link from 'next/link';

const UserPage: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
        <div className="flex items-center justify-center h-20 border-b border-gray-600">
          {/* Replace with your actual logo */}
          <span className="text-2xl font-bold">TrendPlay</span>
        </div>
        <nav className="mt-10">
          <Link href="/"><a className="block px-4 py-3 hover:bg-gray-600">Home</a></Link>
          <Link href="/game-data"><a className="block px-4 py-3 hover:bg-gray-600">Game Data</a></Link>
          {/* Repeat for each link */}
        </nav>
      </aside>

      {/* Main content area */}
      <main className="flex-1 flex flex-col">
        {/* Search bar */}
        <div className="flex items-center justify-between p-4 h-16 bg-gray-800">
          <input
            type="search"
            placeholder="Search..."
            className="w-full px-4 py-2 mr-4 rounded leading-tight text-black focus:outline-none"
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Search
          </button>
        </div>

        {/* Main content */}
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Current Games</h1>
          <div className="bg-white p-4 rounded-lg shadow-md">
            {/* Main UI content */}
            <p className="mb-2">UI box here will contain:</p>
            <ul className="list-disc pl-5">
              <li>Top current games</li>
              <li>Charts and average metrics for different genres</li>
              <li>Browse by genre, category etc.</li>
              <li>More depending on other use cases</li>
            </ul>
          </div>
        </div>
        {/* Gradient text logo */}
        <p className="absolute top-20 left-1/2 transform -translate-x-1/2 text-8xl bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          TRENDPLAY
        </p>
      </main>
    </div>
  );
};

export default UserPage;
