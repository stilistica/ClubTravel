import flatpickr from "flatpickr";
import { Russian } from "flatpickr/dist/l10n/ru.js";
import "flatpickr/dist/flatpickr.min.css";

document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.querySelector(
    ".filter__section-form-date__trigger-input"
  );
  const dateTrigger = document.querySelector(
    ".filter__section-form-date__trigger"
  );
  const dateValue = document.querySelector(
    ".filter__section-form-date__trigger-value"
  );

  if (!dateInput || !dateTrigger) return;

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
});
