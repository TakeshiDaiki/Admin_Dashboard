import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-validator-ygy2.onrender.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
