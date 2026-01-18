import flatpickr from "flatpickr";
import { Russian } from "flatpickr/dist/l10n/ru.js";
import "flatpickr/dist/flatpickr.min.css";
import { fetchTours, fetchHotels } from "../api/hotels.js";
import sprite from "/img/sprite.svg";
import { renderHotelsList } from "./renderHotels.js";

const filter = document.querySelector(".filter");

const filtersState = {
  destination: "",
  days: null,
  date: null,
  guests: {
    adults: null,
    children: null,
  },
  category: [],
  meals: [],
  tourPackage: [],
  departureCity: [],
  price: {
    min: null,
    max: null,
  },
  regions: [],
};

const filterMap = {
  "filter-destination": "destination",
  "filter-days": "days",
  "filter-date": "date",
  "filter-guests": "guests",
};

if (window.location.pathname.endsWith("searchPage.html")) {
  const params = new URLSearchParams(window.localStorage.search);

  if ([...params.keys()].length) {
    loadFiltersFromUrl();
  } else {
    // local
    const storedFilters = localStorage.getItem("filtersState");
    if (storedFilters) {
      Object.assign(filtersState, JSON.parse(storedFilters));
    }
    updateUrlFromFilters(filtersState);
  }
} else if (window.location.pathname.endsWith("hotelPage.html")) {
  localStorage.removeItem("filtersState");
} else {
  localStorage.removeItem("filtersState");
  window.history.replaceState({}, "", window.location.pathname);
}

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
  if (dateInput || dateTrigger || dateValue) {
    // беремо значення з  URL, якщо є
    if (filtersState.date) {
      const date = new Date(filtersState.date);
      const day = date.getDate();
      const year = date.getFullYear();
      const month = date.toLocaleString("ru-RU", { month: "long" });

      dateValue.textContent = `${day} ${month} ${year}`;
    }
    // ----
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

        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");

        filtersState.date = `${y}-${m}-${d}`;

        updateUrlFromFilters(filtersState);
        saveFiltersToStorage(); // local
      },
    });

    dateTrigger.addEventListener("click", () => {
      picker.open();
    });
  }

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
    const filterItem = select.closest(".filter__section-form-item");

    const filterName = filterItem.dataset.name;
    const stateKey = filterMap[filterName];

    const trigger = select.querySelector(
      ".filter__section-form-item-variant__trigger"
    );
    const dropdown = select.querySelector(
      ".filter__section-form-item-variant__dropdown"
    );
    const valueSpan = trigger.querySelector("span");

    if (!dropdown || !trigger || !valueSpan) return;
    // якщо є в Url
    if (filtersState[stateKey] && typeof filtersState[stateKey] === "string") {
      const selectedItem = Array.from(dropdown.querySelectorAll("li")).find(
        (li) =>
          (li.dataset.value ?? li.getAttribute("value")) ===
          filtersState[stateKey]
      );

      if (selectedItem) {
        valueSpan.textContent = selectedItem.textContent;
      }
    }
    // ---
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();

      closeAll(select);
      select.classList.toggle("is-open");
    });

    dropdown.querySelectorAll("li").forEach((item) => {
      item.addEventListener("click", () => {
        const value = item.dataset.value ?? item.getAttribute("value") ?? "";

        valueSpan.textContent = item.textContent;

        filtersState[stateKey] = value || null;
        updateUrlFromFilters(filtersState);
        saveFiltersToStorage(); // local

        if (stateKey === "destination") {
          filtersState.regions = [];

          if (renderRegions) {
            renderRegions(value);
          }
        }

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

    const adultsInput = dropdown.querySelector("input[name='filter-adults']");
    const childrenInput = dropdown.querySelector(
      "input[name='filter-children']"
    );

    if (filtersState.guests.adults || filtersState.guests.children) {
      const parts = [];
      if (filtersState.guests.adults)
        parts.push(`Взрослых: ${filtersState.guests.adults}`);
      if (filtersState.guests.children)
        parts.push(`детей: ${filtersState.guests.children}`);

      valueSpan.textContent = parts.join("; ");
    }

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
      filtersState.guests.adults = null;
      filtersState.guests.children = null;
      updateUrlFromFilters(filtersState);
      saveFiltersToStorage(); // local
      guestsSelect.classList.remove("is-open");
    });

    // Функція оновлення значення при введенні чисел
    function updateGuestsValue() {
      const adults = +adultsInput.value || 0;
      const children = +childrenInput.value || 0;

      if (!adults && !children) {
        valueSpan.textContent = "Любое к-ство";
        return;
      }

      const parts = [];
      if (adults) parts.push(`Взрослых: ${adults}`);
      if (children) parts.push(`детей: ${children}`);

      valueSpan.textContent = parts.join("; ");

      filtersState.guests.adults = adults;
      filtersState.guests.children = children;
      updateUrlFromFilters(filtersState);
      saveFiltersToStorage(); // local
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

// кнопка НАЙТИ
const searchButton = document.querySelector(".button-form-search-link");

if (searchButton) {
  searchButton.addEventListener("click", async (e) => {
    e.preventDefault();

    saveFiltersToStorage(); // local

    const isSearchPage = window.location.pathname.endsWith("searchPage.html");

    if (!isSearchPage) {
      const base = import.meta.env.BASE_URL;
      window.location.href = `${base}html/pages/searchPage.html`;
      return;
    }

    const response = await fetchHotels();
    const hotels = response.data;
    const filteredHotels = filterHotels(hotels, filtersState);

    updateUrlFromFilters(filtersState);

    renderHotelsList(filteredHotels);
    // console.log(filteredHotels);
  });
}
// загальна фунція фільрації
function filterHotels(hotels, filters) {
  return hotels.filter((hotel) => {
    // destination
    if (
      filters.destination &&
      hotel.tour?.destination !== filters.destination
    ) {
      return false;
    }

    // days
    if (
      filters.days !== null &&
      hotel.tour_option?.days !== Number(filters.days)
    ) {
      return false;
    }

    // date
    if (filters.date) {
      const selected = new Date(filters.date);
      const start = new Date(hotel.tour_option?.startDate);
      const end = new Date(hotel.tour_option?.endDate);
      if (selected < start || selected > end) {
        return false;
      }
    }

    // guests
    if (filters.guests.adults !== null) {
      if (hotel.tour_option?.adults < filters.guests.adults) {
        return false;
      }
    }
    if (filters.guests.children !== null) {
      if (hotel.tour_option?.children < filters.guests.children) {
        return false;
      }
    }
    // hotel_oprions
    const optionFiltersUsed =
      filters.meals.length ||
      filters.tourPackage.length ||
      filters.price.min !== null ||
      filters.price.max !== null;

    if (optionFiltersUsed) {
      const optionMatch = hotel.hotel_options?.some((option) => {
        // meals
        if (filters.meals.length && !filters.meals.includes(option.meals)) {
          return false;
        }

        // tourPackage
        if (
          filters.tourPackage.length &&
          !filters.tourPackage.includes(option.tourPackage)
        ) {
          return false;
        }

        // price
        if (filters.price.min !== null && option.price < filters.price.min) {
          return false;
        }
        if (filters.price.max !== null && option.price > filters.price.max) {
          return false;
        }

        return true;
      });
      if (!optionMatch) return false;
    }

    // category
    if (filters.category.length && !filters.category.includes(hotel.category)) {
      return false;
    }

    // departureCity
    if (
      filters.departureCity.length &&
      !filters.departureCity.includes(hotel.tour_option?.departureCity)
    ) {
      return false;
    }

    // regions
    if (filters.regions.length && !filters.regions.includes(hotel.region)) {
      return false;
    }

    return true;
  });
}

// відкриття розшириного пошуку
const extendedBtnOpen = document.querySelector(".filter__extended-btn");
const extendedInfo = document.querySelector(".filter__extended-info");

if (extendedBtnOpen && extendedInfo) {
  extendedBtnOpen.addEventListener("click", () => {
    extendedBtnOpen.classList.add("filter__extended-is-hidden");
    extendedInfo.classList.remove("filter__extended-is-hidden");

    initExtendedFilter();
    initPriceExtended();
    initRegions();
  });

  const extendedBtnClose = extendedInfo.querySelector(
    ".filter__extended-info-title-close"
  );

  if (extendedBtnClose) {
    extendedBtnClose.addEventListener("click", () => {
      extendedInfo.classList.add("filter__extended-is-hidden");
      extendedBtnOpen.classList.remove("filter__extended-is-hidden");
    });
  }
}

// логіка з ціною
function initPriceExtended() {
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

    // якщо є значення в URL
    if (filtersState.price.min !== null) left = filtersState.price.min;
    if (filtersState.price.max !== null) right = filtersState.price.max;
    // ---
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
        syncPriceToState();
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

    function syncPriceToState() {
      if (left === min && right === max) {
        filtersState.price.min = null;
        filtersState.price.max = null;
      } else {
        filtersState.price.min = left;
        filtersState.price.max = right;
      }
      updateUrlFromFilters(filtersState);
      saveFiltersToStorage(); // local
    }
  }
}
// логіка з регіонами
let renderRegions = null;
function initRegions() {
  const regionsBlock = document.querySelector('[data-extended="regions"]');
  if (!regionsBlock) return;

  const regionsList = regionsBlock.querySelector(
    ".filter__extended-info-list-column-list"
  );
  const regionsHint = regionsBlock.querySelector(
    ".filter__extended-info-list-column-hint"
  );

  let toursCache = [];

  renderRegions = async function (destination) {
    regionsList.innerHTML = "";
    renderActiveFilters();

    if (!destination) {
      regionsHint.classList.remove("is-hidden");
      regionsHint.textContent = "Выберите сначала направление";
      return;
    }

    if (!toursCache.length) {
      toursCache = await fetchTours();
    }

    const tour = toursCache.find((item) => item.destination === destination);

    regionsHint.classList.add("is-hidden");

    const regionsHTML = tour.regions
      .map(
        (region) => `
  <li class="filter__extended-info-list-column-list-item" data-value="${region}">
    <svg class="filter__extended-info-list-column-list-item-check">
      <use href="${sprite}#icon-check-circle"></use>
    </svg>
    ${region}
  </li>
`
      )
      .join("");

    regionsList.innerHTML = regionsHTML;

    // якщо в url є регіони
    const selectedRegions = filtersState.regions || [];
    regionsList
      .querySelectorAll(".filter__extended-info-list-column-list-item")
      .forEach((item) => {
        if (selectedRegions.includes(item.dataset.value)) {
          item.classList.add("is-active");
        }
      });
  };

  renderRegions(filtersState.destination);
}
// можливість обирати декілька варівнтів в категорії
function initExtendedFilter() {
  const columns = document.querySelectorAll(".filter__extended-categoties");

  columns.forEach((column) => {
    const key = column.dataset.extended;
    const list = column.querySelector(
      ".filter__extended-info-list-column-list"
    );

    if (!list) return;
    // якщо є дані в url
    const initialValues = filtersState[key] || [];
    list
      .querySelectorAll(".filter__extended-info-list-column-list-item")
      .forEach((item) => {
        if (initialValues.includes(item.dataset.value)) {
          item.classList.add("is-active");
        }
      });
    // ---
    list.addEventListener("click", (e) => {
      const item = e.target.closest(
        ".filter__extended-info-list-column-list-item"
      );
      if (!item) return;

      const value = item.dataset.value;
      if (!value) return;

      const arr = filtersState[key];

      if (arr.includes(value)) {
        filtersState[key] = arr.filter((v) => v !== value);
        item.classList.remove("is-active");
      } else {
        filtersState[key].push(value);
        item.classList.add("is-active");
      }
      updateUrlFromFilters(filtersState);
      saveFiltersToStorage(); // local

      renderActiveFilters();
    });
  });
}
// активні фільтри
const activeFiltersContainer = document.querySelector(
  ".filter__extended-info-active-filter"
);
const activeFiltersState = [
  "category",
  "meals",
  "tourPackage",
  "departureCity",
  "regions",
];
const activeFiltersLabes = {
  category: "Категория размещения",
  meals: "Питание",
  tourPackage: "Состав тура",
  departureCity: "Вылет из",
  regions: "Регионы",
};
const filterLabes = {
  category: {
    Budget: "2 звезды",
    Economy: "3 звезды",
    Standard: "4 звезды",
    Comfort: "5 звезд",
    Apartments: "Апартаменты",
  },
  meals: {
    no_meals: "Без питания",
    breakfast: "Завтрак",
    breakfast_dinner: "Затрак и ужин",
    full_board: "Завтрак, обед, ужин",
    all_inclusive: "Всё включено",
    ultra_all_inclusive: "Ультра: всё включено",
  },
  tourPackage: {
    package: "Туристический пакет",
    flight_only: "Только перелет",
  },
  departureCity: {
    tallinn: "Таллин",
    riga: "Рига",
    vilnius: "Вильнюс",
  },
  regions: {},
};
function renderActiveFilters() {
  if (!activeFiltersContainer) return;

  activeFiltersContainer.innerHTML = "";

  const html = activeFiltersState
    .map((key) => {
      const values = filtersState[key];
      if (!Array.isArray(values) || values.length === 0) return "";

      // const listItems = values
      //   .map((value) => `<li>${filterLabes[key]?.[value] || value}</li>`)
      //   .join("");

      return `
        <div class="filter__extended-info-active-filter-item">
          <span class="filter__extended-info-active-filter-item-title">
            ${activeFiltersLabes[key]}:
          </span>
          <ul class="filter__extended-info-active-filter-item-values">
            ${values
              .map((value) => `<li>${filterLabes[key]?.[value] || value}</li>`)
              .join("")}
          </ul>
        </div>
      `;
    })
    .join("");

  activeFiltersContainer.innerHTML = html;
}

// операція з параметрами в url
function updateUrlFromFilters(filters) {
  const params = new URLSearchParams();
  if (filters.destination) params.set("destination", filters.destination);
  if (filters.days) params.set("days", filters.days);
  if (filters.date) params.set("date", filters.date);

  if (filters.guests.adults !== null)
    params.set("adults", filters.guests.adults);
  if (filters.guests.children !== null)
    params.set("children", filters.guests.children);

  ["category", "meals", "tourPackage", "departureCity", "regions"].forEach(
    (key) => {
      if (filters[key].length) {
        params.set(key, filters[key].join(","));
      }
    }
  );

  if (filters.price.min !== null) params.set("priceMin", filters.price.min);
  if (filters.price.max !== null) params.set("priceMax", filters.price.max);

  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, "", newUrl);
}

function loadFiltersFromUrl() {
  const params = new URLSearchParams(window.location.search);

  filtersState.destination = params.get("destination") || "";
  filtersState.days = params.get("days");
  filtersState.date = params.get("date");

  filtersState.guests.adults = params.get("adults")
    ? Number(params.get("adults"))
    : null;
  filtersState.guests.children = params.get("children")
    ? Number(params.get("children"))
    : null;

  ["category", "meals", "tourPackage", "departureCity", "regions"].forEach(
    (key) => {
      const value = params.get(key);
      filtersState[key] = value ? value.split(",") : [];
    }
  );

  filtersState.price.min = params.get("priceMin")
    ? Number(params.get("priceMin"))
    : null;
  filtersState.price.max = params.get("priceMax")
    ? Number(params.get("priceMax"))
    : null;
}

// local
function saveFiltersToStorage() {
  localStorage.setItem("filtersState", JSON.stringify(filtersState));
}
