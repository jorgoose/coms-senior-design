import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_GATEWAY_ENDPOINT


// MAYBE CHANGE FILE NAME????

export async function getNews(AppID: number) {
    const data = await axios.get(`${baseURL}/get-news?id=${AppID}`);
    if (!data) {
        throw "Error in fetching a specific game";
    }
    return data;
}