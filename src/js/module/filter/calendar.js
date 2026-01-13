import Swiper from "swiper/bundle";
import "swiper/css";
import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.css";
import "flatpickr/dist/themes/airbnb.css";
import { Russian } from "flatpickr/dist/l10n/ru.js";
import sprite from "/img/sprite.svg";
import { initSortList } from "./renderHotels";

const infoBlock = document.querySelector(".result-filter__info");
const calendarBlock = document.querySelector(".result-filter__calendar");

let isCalendarOpen = false;
const infoDefaultHTML = infoBlock.innerHTML;
let savedInfoTitle = "";

let swiperInstance = null;
let calendarInstances = [];
let selectedDate = null;

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
  calendarBlock.hidden = true;

  document.addEventListener("click", (e) => {
    const calendarOpenBtn = e.target.closest(".result-filter__info-calendar");
    const calendarCloseBtn = e.target.closest(
      ".result-filter__info-calendar-close"
    );

    if (calendarOpenBtn && !isCalendarOpen) {
      isCalendarOpen = true;

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
    if (calendarCloseBtn && isCalendarOpen) {
      isCalendarOpen = false;

      infoBlock.innerHTML = infoDefaultHTML;

      const titleEl = infoBlock.querySelector(".result-filter__info-title");
      if (titleEl) {
        titleEl.textContent = savedInfoTitle;
      }

      calendarBlock.hidden = true;
      initSortList();
    }
  });
}
function isSameMonth(dateA, dateB) {
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth()
  );
}

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

  // swiper markup
  const swiperEl = document.createElement("div");
  swiperEl.className = "swiper";

  const wrapperEl = document.createElement("div");
  wrapperEl.className = "swiper-wrapper";

  swiperEl.append(wrapperEl);
  resultsWrap.append(swiperEl);

  for (let i = 0; i < monthsCount; i++) {
    const slideEl = document.createElement("div");
    slideEl.className = "swiper-slide";

    // контейнер для календаря
    const calendarEl = document.createElement("div");
    calendarEl.className = "calendar";

    slideEl.append(calendarEl);
    wrapperEl.append(slideEl);

    const monthDate = new Date(today.getFullYear(), today.getMonth() + i, 1);

    const fp = flatpickr(calendarEl, {
      locale: Russian,
      inline: true,
      defaultDate: null,
      showMonths: 1,
      minDate: "today",

      prevArrow: "",
      nextArrow: "",

      onReady: (_, __, instance) => {
        instance.jumpToDate(monthDate, false);

        instance.clear();
      },

      onChange: ([date], _, instance) => {
        if (!date) return;

        selectedDate = date;

        calendarInstances.forEach((item) => {
          if (item.fp !== instance) {
            item.fp.clear();
          }
        });

        calendarInstances.forEach((item) => {
          updateCalendarSelection(item);
        });

        console.log("Selected date:", selectedDate);
      },
    });

    const calendarItem = {
      fp,
      monthDate,
      calendarEl,
    };

    calendarInstances.push(calendarItem);

    // якщо дата вже вибрана — одразу синхронізуємо
    updateCalendarSelection(calendarItem);
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

function updateCalendarSelection(calendarItem) {
  const { fp, monthDate, calendarEl } = calendarItem;

  const selectedDayEls = calendarEl.querySelectorAll(
    ".flatpickr-day.is-selected"
  );

  selectedDayEls.forEach((el) => el.classList.remove("is-selected"));

  if (!selectedDate) return;

  // якщо вибрана дата не з цього місяця — нічого не підсвічуємо
  if (!isSameMonth(selectedDate, monthDate)) return;

  const targetDateStr = selectedDate.getDate().toString();

  const dayEl = calendarEl.querySelector(
    `.flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)[aria-label*="${targetDateStr}"]`
  );

  if (dayEl) {
    dayEl.classList.add("is-selected");
  }
}

function destroyCalendar() {
  const calendarWrap = document.querySelector(".result-filter__calendar");
  calendarWrap.hidden = true;
}



