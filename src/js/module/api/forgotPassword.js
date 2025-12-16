import api from "./axios";

export async function forgotPassword(email) {
  const response = await api.post("/auth/forgot-password", {
    email,
  });

  return response.data;
}
