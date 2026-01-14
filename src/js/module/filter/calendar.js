import Swiper from "swiper/bundle";
import "swiper/css";
import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.css";
import "flatpickr/dist/themes/airbnb.css";
import { Russian } from "flatpickr/dist/l10n/ru.js";
import sprite from "/img/sprite.svg";
import { currentHotels, initSortList, renderHotelsList } from "./renderHotels";

const infoBlock = document.querySelector(".result-filter__info");
const calendarBlock = document.querySelector(".result-filter__calendar");
const infoTextWrapper = document.querySelector(".result-filter__calendar-text");

let isCalendarOpen = false;
let savedInfoTitle = "";

let swiperInstance = null;
let calendarInstances = [];
let selectedDate = null;
let currentHotelsCalendar = [];

const infoCalendarHTML = `
  <h1 class="result-filter__info-title"></h1>
  <p class="result-filter__info-desc">
    <svg>
      <use href="${sprite}#icon-calendar-euro"></use>
    </svg>
    Сравнение цен на календаре
  </p>
  <button class="result-filter__info-calendar-close">
    <svg>
      <use href="${sprite}#icon-list"></use>
    </svg>
    Список отелей
  </button>
`;

if (infoBlock) {
  const infoDefaultHTML = infoBlock.innerHTML;

  calendarBlock.hidden = true;

  document.addEventListener("click", (e) => {
    const calendarOpenBtn = e.target.closest(".result-filter__info-calendar");
    const calendarCloseBtn = e.target.closest(
      ".result-filter__info-calendar-close"
    );
    // open
    if (calendarOpenBtn && !isCalendarOpen) {
      isCalendarOpen = true;
      currentHotelsCalendar = [...currentHotels];

      const titleEl = infoBlock.querySelector(".result-filter__info-title");
      savedInfoTitle = titleEl.textContent || "";

      infoBlock.innerHTML = infoCalendarHTML;

      const newTitle = infoBlock.querySelector(".result-filter__info-title");
      if (newTitle) {
        newTitle.textContent = savedInfoTitle;
      }

      calendarBlock.hidden = false;

      mountCalendar();
    }
    // close
    if (calendarCloseBtn && isCalendarOpen) {
      isCalendarOpen = false;

      infoBlock.innerHTML = infoDefaultHTML;

      const titleEl = infoBlock.querySelector(".result-filter__info-title");
      if (titleEl) {
        titleEl.textContent = savedInfoTitle;
      }

      calendarBlock.hidden = true;
      initSortList();
      destroyCalendar();

      renderHotelsList(currentHotelsCalendar);
    }
  });
}
function isSameMonth(dateA, dateB) {
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth()
  );
}
// рендер самого календаря зі свайпером
function mountCalendar() {
  const calendarWrap = document.querySelector(".result-filter__calendar");
  const resultsWrap = document.querySelector(
    ".result-filter__calendar-results"
  );

  calendarWrap.hidden = false;
  if (swiperInstance) return;

  const monthsCount = 12;
  const today = new Date();

  resultsWrap.innerHTML = "";
  calendarInstances = [];

  const swiperEl = document.createElement("div");
  swiperEl.className = "swiper";

  const wrapperEl = document.createElement("div");
  wrapperEl.className = "swiper-wrapper";

  swiperEl.append(wrapperEl);
  resultsWrap.append(swiperEl);

  for (let i = 0; i < monthsCount; i++) {
    const slideEl = document.createElement("div");
    slideEl.className = "swiper-slide";

    const calendarEl = document.createElement("div");
    calendarEl.className = "calendar";

    slideEl.append(calendarEl);
    wrapperEl.append(slideEl);

    // конкретна дата для цього місяця
    const monthDate = new Date(today.getFullYear(), today.getMonth() + i, 1);

    const fp = flatpickr(calendarEl, {
      locale: Russian,
      inline: true,
      defaultDate: monthDate,
      showMonths: 1,
      minDate: "today",
      prevArrow: "",
      nextArrow: "",
      onDayCreate: (dObj, dStr, instance, dayElem) => {
        const date = dayElem.dateObj;

        const price = getMinPriceForDate(date);

        if (price) {
          const priceEl = document.createElement("div");
          priceEl.className = "calendar-day-price";
          priceEl.textContent = `${price}€`;

          dayElem.append(priceEl);
        }
      },
      onChange: ([date], _, instance) => {
        if (!date) return;

        selectedDate = date;

        // знімаємо вибір з інших календарів
        calendarInstances.forEach((item) => {
          if (item.fp !== instance) {
            item.fp.clear();
          }
        });

        updateCalendarInfo(date);

        const filteredHotels = filterHotelsByDate(currentHotelsCalendar, date);
        renderHotelsList(filteredHotels);
      },
    });

    fp.clear();

    const selectedEls = calendarEl.querySelectorAll(".flatpickr-day.selected");
    selectedEls.forEach((el) => el.classList.remove("selected"));

    const calendarItem = {
      fp,
      monthDate,
      calendarEl,
    };

    calendarInstances.push(calendarItem);
  }

  swiperInstance = new Swiper(swiperEl, {
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      620: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      930: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1366: {
        slidesPerView: 4,
        spaceBetween: 26,
      },
      1920: {
        slidesPerView: 5,
        spaceBetween: 30,
      },
    },
  });
}
// очищення календаря
function destroyCalendar() {
  selectedDate = null;

  calendarInstances.forEach((item) => {
    item.fp.destroy();
  });

  calendarInstances = [];

  if (swiperInstance) {
    swiperInstance.destroy(true, true);
    swiperInstance = null;
  }

  const calendarWrap = document.querySelector(".result-filter__calendar");
  calendarWrap.hidden = true;

  const dateEl = document.querySelector(".result-filter__calendar-text-date");
  const priceEl = document.querySelector(".result-filter__calendar-text-price");

  if (dateEl) dateEl.textContent = "";
  if (priceEl) priceEl.textContent = "";

  infoTextWrapper.style.display = "none";
}

// рендер ціни в календарі
function isDateInRange(date, start, end) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);

  const s = new Date(start);
  const e = new Date(end);

  return d >= s && d <= e;
}

function getMinPriceForDate(date) {
  let minPrice = null;

  currentHotelsCalendar.forEach((hotel) => {
    const opt = hotel.tour_option;
    if (!opt?.startDate || !opt?.endDate) return;

    if (isDateInRange(new Date(date), opt.startDate, opt.endDate)) {
      if (minPrice === null || opt.minPrice < minPrice) {
        minPrice = opt.minPrice;
      }
    }
  });

  return minPrice;
}

// оновлення дів з текстом
function updateCalendarInfo(date, hotels) {
  const dateEl = infoTextWrapper?.querySelector(
    ".result-filter__calendar-text-date"
  );
  const priceEl = infoTextWrapper?.querySelector(
    ".result-filter__calendar-text-price"
  );

  if (!date || !infoTextWrapper || !dateEl || !priceEl) return;

  const filteredHotels = filterHotelsByDate(currentHotelsCalendar, date);

  if (filteredHotels.length === 0) {
    infoTextWrapper.style.display = "none";
    return;
  }

  infoTextWrapper.style.display = "block";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // місяці 0-11
  const year = date.getFullYear();
  const formatted = `${day}.${month}.${year}`;
  dateEl.textContent = formatted;

  const minPrice = Math.min(
    ...filteredHotels.map((hotel) => hotel.tour_option?.minPrice || Infinity)
  );
  priceEl.textContent = minPrice === Infinity ? "—" : minPrice;
}

// фільтрація отелей по даті
function filterHotelsByDate(hotels, date) {
  if (!date) return hotels;

  return hotels.filter((hotel) => {
    const opt = hotel.tour_option;
    if (!opt?.startDate || !opt?.endDate) return false;

    return isDateInRange(new Date(date), opt.startDate, opt.endDate);
  });
}
