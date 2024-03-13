import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_EC2_SERVER

export async function getAllGames() {
    const data = await axios.get(`${baseURL}/get-all-games`);
    if (!data) {
        throw "Error in fetching all games";
    }
    return data;
}

// localhost:8080/request-game?AppID=80
export async function getGame(appId: number) {
    const data = await axios.get(`${baseURL}/request-game?AppID=${appId}`);
    if (!data) {
        throw "Error in fetching a specific game";
    }
    return data;
}