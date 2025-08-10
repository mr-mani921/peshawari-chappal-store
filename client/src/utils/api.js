import axios from "axios";
// const API_URL = import.meta.env.VITE_API_URL;

const API = axios.create({
baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});


 
export default API;
