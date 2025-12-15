import api from "./axios";

export async function loginUser(identifier, password) {
  const response = await api.post("/auth/local", {
    identifier,
    password,
  });

  return response.data;
}
