import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_GATEWAY_ENDPOINT

export async function getFriends(UserID: string) {
    const data = await axios.get(`${baseURL}/get-friends?UserID=${UserID}`);
    if(!data) {
        throw "Error in getting Friends";
    }
    return data;
}

export async function getUsername(UserID: string) {
    const data = await axios.get(`${baseURL}/get-username?UserID=${UserID}`);
    if(!data) {
        throw "Error in getting Username";
    }
    return data;
}
