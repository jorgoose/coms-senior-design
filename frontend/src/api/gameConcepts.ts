import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_GATEWAY_ENDPOINT

export async function postGameConcept(prevState: any, formData: FormData) {

    const data = {
        title: formData.get('title') as string,
        UserID: formData.get('UserID') as string,
        description: formData.get('description') as string,
        genre: formData.get('genres') as string,
        tags: formData.get('tags') as string,
    };

    const concept: GameConcept = {
        title: data.title,
        UserID: data.UserID,
        description: data.description,
        genre: data.genre.split(','),
        tags: data.tags.split(','),
    }

    const res = await axios.post(`${baseURL}/send-game-concept`, concept);
    if (res.status != 200) {
        return {
            message: res.statusText,
        };
    }
}

export async function getAllGameConcepts() {
    const res = await axios.get(`${baseURL}/get-all-game-concepts`);
    if (!res) {
        throw "Error in Getting All Game Concepts";
    }
    return res;
}

export async function getFilteredConcepts(UserID: string) {
    const res = await axios.get(`${baseURL}/filter-game-concept?UserID=${UserID}`)
    if (!res) {
        throw "Error in Filtering Game Concepts";
    }
    return res;
}