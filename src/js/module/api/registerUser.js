import api from "./axios.js";

export async function registerUser(email, password) {
  const response = await api.post("/auth/local/register", {
    username: email,
    email,
    password,
  });

  return response.data;
}
