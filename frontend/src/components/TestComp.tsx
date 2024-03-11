'use client'

import React, { useEffect, useState } from 'react';
import { getAllGames } from '@/api/games';

function TestComp() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        // Fetch games when component mounts
        async function fetchGames() {
            try {
                const response = await getAllGames();
                setGames(response.data); // Assuming the response contains game data
            } catch (error) {
                console.error('Error fetching games:', error);
            }
        }

        fetchGames();
    }, []);

    return (
        <div>
            <p>{JSON.stringify(games)}</p> {/* Display games data */}
        </div>
    );
}

export default TestComp;
