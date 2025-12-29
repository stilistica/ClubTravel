import { loginUser } from "../../api/loginUser";
import JustValidate from "just-validate";

export function isLoggedIn() {
  const token = localStorage.getItem("jwt");
  return typeof token === "string" && token.length > 0;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (!form) return;

  const validator = new JustValidate("#loginForm", {
    errorFieldCssClass: "is-error",
    errorLabelCssClass: "login__error",
    focusInvalidField: true,
    lockForm: true,
  });

  validator
    .addField('[name="email"]', [
      { rule: "required", errorMessage: "Введите e-mail" },
      { rule: "email", errorMessage: "Некорректный e-mail" },
    ])
    .addField('[name="password"]', [
      { rule: "required", errorMessage: "Введите пароль" },
    ])

    .onSuccess(async (event) => {
      event.preventDefault();

      const identifier = form.email.value.trim();
      const password = form.password.value;

      try {
        const data = await loginUser(identifier, password);

        localStorage.setItem("jwt", data.jwt);

        window.location.replace("/ClubTravel/html/pages/accountPage.html");
      } catch (error) {
        validator.showErrors({
          '[name="password"]': error.message,
        });
      }
    });
});
