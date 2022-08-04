import axios from 'axios';

export const baseUrl = "http://localhost:4000"


export const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
}
)

instance.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('auth_token');
    accessToken && (config.headers.Authorization = `Bearer ${accessToken}`);
    return config;
}, error => Promise.reject(error));






export default instance;