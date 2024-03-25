import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_GATEWAY_ENDPOINT

export async function getConceptReviews(ConceptID: string) {
    const data = await axios.get(`${baseURL}/get-reviews?id=${ConceptID}`);
    if (!data) {
        throw "Error in fetching concept reviews";
    }
    return data;
}

export async function postReview(prevState: any, formData: FormData) {
    
    const review: Review = {
        UserID: formData.get('UserID') as string,
        ConceptID: formData.get('ConceptID') as string,
        Comment: formData.get('comment') as string,
        Vote: 0
    }

    const res = await axios.post(`${baseURL}/send-review`, review);
    
    if (res.status != 200) {
        return {
            message: res.statusText,
        };
    }
}