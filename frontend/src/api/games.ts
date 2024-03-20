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