import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_GATEWAY_ENDPOINT;

export async function fetchUserProfile(userId: string): Promise<any> {
    try {
        const res = await axios.get(`${baseURL}/users/${userId}`);
        
        if (res.status !== 200) {
            throw new Error(res.statusText);
        }
        
        return res.data;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw new Error("An error occurred while fetching user profile data.");
    }
}
