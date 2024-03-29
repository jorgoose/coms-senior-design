import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_GATEWAY_ENDPOINT

/*
    Example usage:
    const response = await getAllGames();
    This will get all games in the database and store it in response
*/
export async function getAllGames() {
    const data = await axios.get(`${baseURL}/get-all-games`);
    if (!data) {
        throw "Error in fetching all games";
    }
    return data;
}

/*
    Example usage:
    const response = await getGame(80);
    This will get the game with the AppId of 80 and store it in response
*/
export async function getGame(appId: number) {
    const data = await axios.get(`${baseURL}/request-game?AppID=${appId}`);
    if (!data) {
        throw "Error in fetching a specific game";
    }
    return data;
}

export async function getFavoriteGame(UserID: string) {
    const data = await axios.get(`${baseURL}/get-favorite-games?UserID=${UserID}`);
    if(!data) {
        throw "Error in favorite game";
    }
    return data;
}

export async function setFavoriteGame(game: FavoriteGame) {
    const favoriteGame: FavoriteGame = {
        UserID: game.UserID,
        AppID: game.AppID
    };

    const res = await axios.post(`${baseURL}/favorite-game`, favoriteGame);
    if (res.status != 200) {
        return {
            message: res.statusText,
        };
    }
}

export async function unFavoriteGame(game: FavoriteGame) {
    const favoriteGame: FavoriteGame = {
        UserID: game.UserID,
        AppID: game.AppID
    };

    const res = await axios.delete(`${baseURL}/unfavorite-game?UserID=${game.UserID}&AppID=${game.AppID}`);
    if (res.status != 200) {
        return {
            message: res.statusText,
        };
    }
}

export async function getGamesByDeveloper(args: gameByDeveloperArgs) {
    const data = await axios.get(`${baseURL}/request?sele=${args.select}&collum=${args.column}&equal=${args.equal}`);
    if (!data) {
        throw "Error in fetching a specific game";
    }
    return data;
}
