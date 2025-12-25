import flatpickr from "flatpickr";
import { Russian } from "flatpickr/dist/l10n/ru.js";
import "flatpickr/dist/flatpickr.min.css";

const filter = document.querySelector(".filter");

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

const searchButton = document.querySelector(".button-form-search-link");

if (searchButton) {
  searchButton.addEventListener("click", (e) => {
    e.preventDefault();

    const isSearchPage = window.location.pathname.endsWith("searchPage.html");

    if (!isSearchPage) {
      const base = import.meta.env.BASE_URL;
      window.location.href = `${base}html/pages/searchPage.html`;
    } else {
      // тут буде сама логіка
    }
  });
}

const filterPrice = document.querySelector(".filter-price-list");

if (filterPrice) {
  const slider = filterPrice.querySelector(".filter-price-slider");
  const range = filterPrice.querySelector(".filter-price-range");
  const leftThumb = filterPrice.querySelector(".filter-price-thumb.left");
  const rightThumb = filterPrice.querySelector(".filter-price-thumb.right");
  const minPriceEl = filterPrice.querySelector("#minPrice");
  const maxPriceEl = filterPrice.querySelector("#maxPrice");

  const min = 200;
  const max = 3000;

  let left = 200;
  let right = 3000;

  const priceToPercent = (p) => ((p - min) / (max - min)) * 100;
  const percentToPrice = (p) => Math.round(min + (p / 100) * (max - min));

  function update() {
    const l = priceToPercent(left);
    const r = priceToPercent(right);

    leftThumb.style.left = `${l}%`;
    rightThumb.style.left = `${r}%`;
    range.style.left = `${l}%`;
    range.style.right = `${100 - r}%`;

    minPriceEl.textContent = `${left}€`;
    maxPriceEl.textContent = `${right}€`;
  }

  function startDrag(e, isLeft) {
    const rect = slider.getBoundingClientRect();

    const move = (ev) => {
      const x = ev.clientX;
      let percent = ((x - rect.left) / rect.width) * 100;
      percent = Math.max(0, Math.min(100, percent));
      const price = percentToPrice(percent);

      if (isLeft) {
        left = Math.min(price, right);
      } else {
        right = Math.max(price, left);
      }

      update();
    };

    const stop = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", stop);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", stop);
  }

  leftThumb.addEventListener("mousedown", (e) => startDrag(e, true));
  rightThumb.addEventListener("mousedown", (e) => startDrag(e, false));

  update();
}
