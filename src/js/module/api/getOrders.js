import api from "./axios";

export async function getOrders({ page = 1, pageSize = 5 }) {
  const jwt = localStorage.getItem("jwt");
  if (!jwt) {
    throw new Error("Нет JWT");
  }

  const response = await api.get("/orders", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    params: {
      populate: "user",
      pagination: {
        page,
        pageSize,
      },
      sort: "createdAt:desc",
    },
  });

  return response.data;
}
