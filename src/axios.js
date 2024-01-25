// axios.js
import axios from 'axios';

const instance = axios.create({
    baseURL: "https://restro-backend-entri.onrender.com"
});

export default instance;
