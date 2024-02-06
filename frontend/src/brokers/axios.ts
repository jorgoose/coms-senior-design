import axios from "axios";

export function postSignUp(userData: User) {
    axios.post('post link', userData)
    .then(response => {
        // Handle success
        console.log('Response:', response.data);
    })
    .catch(error => {
        // Handle error
        console.error('Error:', error);
    });
}