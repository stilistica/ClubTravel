import api from "./axios";

export async function fetchNews() {
  const { data } = await api.get("/news-homes", {
    params: {
      populate: {
        images: true,
      },
      sort: ["publishedAt:desc"],
    },
  });

  return data.data;
}
