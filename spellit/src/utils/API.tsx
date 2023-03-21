import axios from 'axios'

const API = axios.create({
    baseURL: process.env.REACT_APP_SPRING,
    headers: {
        "Content-Type": "application/json",
    },
    // withCredentials: true,
})
export default API;