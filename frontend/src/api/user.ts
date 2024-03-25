
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_GATEWAY_ENDPOINT;

interface User {
    username: string;
    email: string;
    datejoined: string;
}
export async function getOneUser() {
    const data = await axios.get(`${baseURL}/get-one-user`);
    if (!data) {
        throw "Error in fetching all games";
    }
    return data;
}

export async function getAllUsers() {
    const data = await axios.get(`${baseURL}/get-all-users`);
    if (!data) {
        throw "Error in fetching all games";
    }
    return data;
}

export async function deleteUser() {
    const data = await axios.get(`${baseURL}/delete-user`);
    if (!data) {
        throw "Error in fetching all games";
    }
    return data;
}

export async function UpdateUser() {
    const data = await axios.get(`${baseURL}/update-user`);
    if (!data) {
        throw "Error in fetching all games";
    }
    return data;
}
