import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8081/api", // backend URL
});

export default API;   // 👈 this makes it available for import
