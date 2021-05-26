import axios from 'axios';

export const httpClientApi = axios.create({
    baseURL: 'http://localhost:3000'
})