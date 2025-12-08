import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Optional: Handle 401 for token refresh logic if needed
        // For now we will just reject
        return Promise.reject(error);
    }
);

export default api;
