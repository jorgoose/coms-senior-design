import axios from "axios";

export async function getAllGames() {
    const data = await axios.get(`${process.env.NEXT_PUBLIC_EC2_SERVER}/get-all-games`);
    if (!data) {
        throw "Error in fetching data"
    }
    return data;
}