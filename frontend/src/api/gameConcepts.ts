import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_GATEWAY_ENDPOINT

export async function postGameConcept(prevState: any, formData: FormData) {

    const concept: GameConcept = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        genre: formData.get('genre') as string,
        tags: formData.get('tags') as string,
        developer_id: formData.get('developer_id') as string,
    };

    const res = await axios.post(`${baseURL}/send-game-concept`, concept);
    if (res.status != 200) {
        return {
            message: res.statusText,
        };
    }
}