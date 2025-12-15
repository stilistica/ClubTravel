import axios from "axios";

const api = axios.create({
  baseURL: "https://thankful-garden-94c969a4ca.strapiapp.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
