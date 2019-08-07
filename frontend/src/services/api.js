import axios from 'axios';
import { apiUrl } from '../utils/utils';

const api = axios.create({
    baseURL: apiUrl
});

export default api;

