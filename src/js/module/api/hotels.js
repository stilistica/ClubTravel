import api from "../api/axios.js";

export async function fetchTours() {
  const { data } = await api.get("/tours");
  return data.data;
}

export async function fetchHotels() {
  const { data } = await api.get("/hotels?populate=*");
  return data;
}

export async function fetchHotHotels() {
  const { data } = await api.get(
    "/hotels?populate=*&filters[tour_option][hotOffer][$eq]=true"
  );
  return data.data;
}
