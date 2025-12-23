import { loginUser } from "../../api/loginUser";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const identifier = form.email.value.trim();
    const password = form.password.value;

    if (!identifier || !password) {
      alert("Введите email и пароль");
      return;
    }

    try {
      const data = await loginUser(identifier, password);

      localStorage.setItem("jwt", data.jwt);
      window.location.replace("/ClubTravel/html/pages/accountPage.html");
    } catch (error) {
      const message =
        error.response?.data?.error?.message || "Неверный email или пароль";

      alert(message);
    }
  });
});

export function isLoggedIn() {
  const token = localStorage.getItem("jwt");
  return typeof token === "string" && token.length > 0;
}
