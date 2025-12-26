import api from "../api/axios.js";

export async function fetchTours() {
  const { data } = await api.get("/tours");
  return data.data;
}
