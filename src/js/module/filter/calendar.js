import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import sprite from "/img/sprite.svg";
import { initSortList } from "./renderHotels";

const infoBlock = document.querySelector(".result-filter__info");
const calendarBlock = document.querySelector(".result-filter__calendar");

let isCalendarOpen = false;
const infoDefaultHTML = infoBlock.innerHTML;
let savedInfoTitle = "";

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

      // mountCalendar();
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
