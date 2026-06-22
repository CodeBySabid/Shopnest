import axios from "axios";

const axiosPublic = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000",
});

export default axiosPublic;