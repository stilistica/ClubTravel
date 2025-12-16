import { forgotPassword } from "../../api/forgotPassword";

const form = document.getElementById("forgotForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    await forgotPassword(form.email.value);
    form.reset();
    alert("Письмо отправлено");
  } catch (err) {
    alert("Ошибка");
  }
});
