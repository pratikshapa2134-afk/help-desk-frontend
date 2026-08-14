import axios from 'axios';

// Ensure your base URL points to the Render backend URL
const API = axios.create({
    baseURL: 'https://help-desk-backend.onrender.com/api',
});

// Automatically attach the token to every request
API.interceptors.request.use((config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        const { token } = JSON.parse(userInfo);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default API;