'use client';

import { useState, useEffect } from "react";

import GameCard from "@/components/GameCardComp";
import { getAllGames, getFavoriteGame } from '@/api/games';
import LayoutComponent from "../header/LayoutComponent";
import GameViewComp from "../gameview/GameViewComp";


interface DashboardCompProps {
    UserID?: string;
    presetGame?: Game;
}

const DashboardComp: React.FC<DashboardCompProps> = ({UserID}) => {

    const [games, setGames] = useState<Game[]>([]);

    const [favoriteGames, setFavoriteGames] = useState<FavoriteGame[]>([]);

    const [showDashboard, setShowDashboard] = useState(true);

    const [game, setGame] = useState<Game>();

    const [ searchQuery, setSearchQuery ] = useState('');

    const filteredGames = games.filter((game) =>
        game?.Name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem('UserID', UserID ?? '');
        }
    });

    useEffect(() => {
        async function fetchGames(userId: string) {
            try {
                const response1 = await getFavoriteGame(userId);
                console.log(response1.data);
                setFavoriteGames(response1.data);
            } catch(error1) {
                console.error('Bad Response', error1);
            }
            try {
                const response = await getAllGames();
                console.log(response.data);
                setGames(response.data);
            } catch (error) {
                console.error('Error fetching games:', error);
            }
        }
         (UserID) && fetchGames(UserID);
    }, []);

    const handleGameClick = (game: Game) => {
        setGame(game);
        game && setShowDashboard(false);
    };

    const isGameFavorite = (gameId: number): boolean => {
        return favoriteGames.some(favorite => favorite.AppID === gameId);
    };

    const selectDevGame = (devGame: Game) => {
        setGame(devGame);
        setShowDashboard(false);
    }

    const dashboardLayout = () => (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredGames.map((game) => (
                    <div key={game.AppID}>
                        <GameCard 
                            key={game.AppID}   
                            game={game} 
                            onClick={handleGameClick} 
                            isFavorite={isGameFavorite(game.AppID)}
                            UserID={UserID}
                        />
                    </div>
                ))}
            </div>
    );

    const gameViewLayout = () => (
        game && <GameViewComp game={game} devGameClick={selectDevGame} />
    );

    return (
        <>
            <LayoutComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery} showSearchBar={true}>
                    <main className="flex flex-col md:gap-8 pr-5 pt-[50px] lg:pt-[60px] overflow-auto">
                        {showDashboard ? dashboardLayout() : gameViewLayout()}
                    </main>
            </LayoutComponent>
        </>
    );
};

export default DashboardComp;