import { registerUser } from "../../api/registerUser";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  return (
    password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password)
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value;
    const passwordConfirm = form.passwordConfirm.value;

    if (!email) {
      alert("Введите email");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Некорректный email");
      return;
    }

    if (!password) {
      alert("Введите пароль");
      return;
    }

    if (!isValidPassword(password)) {
      alert("Пароль должен быть минимум 8 символов и содержать букву и цифру");
      return;
    }

    if (password !== passwordConfirm) {
      alert("Пароли не совпадают");
      return;
    }

    try {
      const data = await registerUser(email, password);

      localStorage.setItem("jwt", data.jwt);
      window.location.replace("/ClubTravel/html/pages/loginPage.html");
    } catch (error) {
      const message =
        error.response?.data?.error?.message || "Ошибка регистрации";

      alert(message);
    }
  });
});
