import axios from "axios";

export async function postSignUp(link: string, userData: User) {
    axios.post(`${link}/signup`, userData)
    .then(response => {
        // Handle success
        console.log('Response: ', response.data);
    })
    .catch(error => {
        // Handle error
        console.error('Error: ', error);
    });
}

export async function postLogin(link: string, userData: LoginUser) {
    axios.post(`${link}/login`, userData)
    .then(response => {
        // Handle success
        console.log('Response: ', response.data);
    })
    .catch(error => {
        // Handle error
        console.error('Error: ', error);
    });
}
