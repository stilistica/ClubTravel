import flatpickr from "flatpickr";
import { Russian } from "flatpickr/dist/l10n/ru.js";
import "flatpickr/dist/flatpickr.min.css";

const filter = document.querySelector(".filter__section");

if (filter) {
  /* ---------------- DATE ---------------- */
  const dateInput = filter.querySelector(
    ".filter__section-form-date__trigger-input"
  );
  const dateTrigger = filter.querySelector(
    ".filter__section-form-date__trigger"
  );
  const dateValue = filter.querySelector(
    ".filter__section-form-date__trigger-value"
  );
  const picker = flatpickr(dateInput, {
    locale: Russian,
    minDate: "today",
    dateFormat: "Y-m-d",
    allowInput: false,

    onChange(selectedDates) {
      if (!selectedDates.length) return;

      const date = selectedDates[0];
      const day = date.getDate();
      const year = date.getFullYear();
      const month = date.toLocaleString("ru-RU", { month: "long" });

      dateValue.textContent = `${day} ${month} ${year}`;
    },
  });

  dateTrigger.addEventListener("click", () => {
    picker.open();
  });

  /* ---------------- SELECTS ---------------- */
  const selects = filter.querySelectorAll(
    ".filter__section-form-item-variant:not(.filter__section-form-guests-variant)"
  );
  function closeAll(except = null) {
    selects.forEach((select) => {
      if (select !== except) {
        select.classList.remove("is-open");
      }
    });
  }

  selects.forEach((select) => {
    const trigger = select.querySelector(
      ".filter__section-form-item-variant__trigger"
    );
    const dropdown = select.querySelector(
      ".filter__section-form-item-variant__dropdown"
    );
    const valueSpan = trigger.querySelector("span");
    const hiddenInput = select.querySelector("input[type='hidden']");

    if (!dropdown || !trigger || !valueSpan || !hiddenInput) return;

    trigger.addEventListener("click", (e) => {
      e.stopPropagation();

      closeAll(select);
      select.classList.toggle("is-open");
    });

    dropdown.querySelectorAll("li").forEach((item) => {
      item.addEventListener("click", () => {
        const value = item.dataset.value ?? item.getAttribute("value") ?? "";

        valueSpan.textContent = item.textContent;
        hiddenInput.value = value;

        select.classList.remove("is-open");
      });
    });
  });
  document.addEventListener("click", () => closeAll());

  /* ---------------- GUESTS ---------------- */
  const guestsSelect = filter.querySelector(
    ".filter__section-form-guests-variant"
  );

  if (guestsSelect) {
    const trigger = guestsSelect.querySelector(
      ".filter__section-form-guests-variant__trigger"
    );
    const dropdown = guestsSelect.querySelector(
      ".filter__section-form-guests-variant__dropdown"
    );
    const valueSpan = trigger.querySelector("span");
    const hiddenInput = guestsSelect.querySelector(
      "input[name='filter-guests']"
    );

    const adultsInput = dropdown.querySelector("input[name='filter-adults']");
    const childrenInput = dropdown.querySelector(
      "input[name='filter-children']"
    );
    const anyOption = dropdown.querySelector("li"); // перший li — "Любое к-ство"
    const guestRows = dropdown.querySelectorAll("li > div"); // ряди з input

    // Відкриття/закриття форми по тригеру
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      closeAll();
      guestsSelect.classList.toggle("is-open");
    });

    // Щоб клік по самому dropdown не закривався
    dropdown.addEventListener("click", (e) => e.stopPropagation());

    // Обробка вибору "Любое к-ство"
    anyOption.addEventListener("click", () => {
      adultsInput.value = "";
      childrenInput.value = "";
      valueSpan.textContent = "Любое к-ство";
      hiddenInput.value = "";
      guestsSelect.classList.remove("is-open");
    });

    // Функція оновлення значення при введенні чисел
    function updateGuestsValue() {
      const adults = +adultsInput.value || 0;
      const children = +childrenInput.value || 0;

      if (!adults && !children) {
        valueSpan.textContent = "Любое к-ство";
        hiddenInput.value = "";
        return;
      }

      const parts = [];
      if (adults) parts.push(`Взрослых: ${adults}`);
      if (children) parts.push(`детей: ${children}`);

      valueSpan.textContent = parts.join("; ");
      hiddenInput.value = JSON.stringify({ adults, children });
    }

    adultsInput.addEventListener("input", updateGuestsValue);
    childrenInput.addEventListener("input", updateGuestsValue);

    // Закриття форми при кліку по ряду, але не по input
    guestRows.forEach((row) => {
      row.addEventListener("click", (e) => {
        if (e.target.tagName !== "INPUT") {
          guestsSelect.classList.remove("is-open");
        }
      });
    });
  }
}
