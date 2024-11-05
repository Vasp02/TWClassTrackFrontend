import axios from 'axios';

export const baseUrl = 'http://localhost:8080';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiClient;