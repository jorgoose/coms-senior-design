'use client'

import React, { useEffect, useState } from 'react';
import { getAllGames, getGame } from '@/api/games';

function TestComp() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        // Fetch games when component mounts
        async function fetchGame() {
            try {
                const response = await getGame(80);
                setGames(response.data); // Assuming the response contains game data
            } catch (error) {
                console.error('Error fetching games:', error);
            }
        }

        fetchGame();
    }, []);

    return (
        <div>
            <p>{JSON.stringify(games)}</p> {/* Display games data */}
        </div>
    );
}

export default TestComp;
