import axios from 'axios';

export const wolvesbckApi = axios.create({
    baseURL: "http://localhost:8080"
})