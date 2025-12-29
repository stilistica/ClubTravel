import { registerUser } from "../../api/registerUser";
import JustValidate from "just-validate";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  if (!form) return;

  const validator = new JustValidate("#registerForm", {
    errorFieldCssClass: "is-error",
    errorLabelCssClass: "login__error",
    focusInvalidField: true,
    lockForm: true,
  });

  validator
    .addField('[name="email"]', [
      {
        rule: "required",
        errorMessage: "Введите e-mail",
      },
      {
        rule: "email",
        errorMessage: "Некорректный e-mail",
      },
    ])
    .addField('[name="password"]', [
      {
        rule: "required",
        errorMessage: "Введите пароль",
      },
      {
        rule: "minLength",
        value: 8,
        errorMessage: "Минимум 8 символов",
      },
      {
        validator: (value) => /[A-Za-z]/.test(value) && /\d/.test(value),
        errorMessage: "Пароль должен содержать букву и цифру",
      },
    ])
    .addField('[name="passwordRepeat"]', [
      {
        rule: "required",
        errorMessage: "Повторите пароль",
      },
      {
        validator: (value, fields) =>
          value === fields['[name="password"]'].elem.value,
        errorMessage: "Пароли не совпадают",
      },
    ])
    .onSuccess(async (event) => {
      event.preventDefault();

      const email = form.email.value.trim();
      const password = form.password.value;

      try {
        const data = await registerUser(email, password);

        localStorage.setItem("jwt", data.jwt);
        window.location.replace("/ClubTravel/html/pages/accountPage.html");
      } catch (error) {
        const message =
          error.response?.data?.error?.message || "Ошибка регистрации";

        validator.showErrors({
          '[name="email"]': message,
        });
      }
    });
});
