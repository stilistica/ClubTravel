import sprite from "/img/sprite.svg";
import {
  formatDate,
  getHotelImage,
  renderCategoryStars,
} from "../pages/home-page/hotHome";

const sortState = {
  sortBy: "",
  order: "asc",
};
let currentHotels = [];

document.addEventListener("DOMContentLoaded", () => {
  initSortList();
});

export function renderHotelsList(hotels) {
  currentHotels = hotels;
  const list = document.querySelector(".result-filter__list");
  if (!list) return;

  list.innerHTML = "";

  if (!hotels.length) {
    list.innerHTML = `
		<li class="result-filter__list-empty">
		По выбранным фильтрам ничего не найдено
		</li>
		`;
    renderFilterInfo([]);
    return;
  }

  list.innerHTML = hotels.map((hotel) => renderHotelCard(hotel)).join("");

  renderFilterInfo(hotels);
  // логіка відкриття у карток додаткової інформації
  document
    .querySelectorAll(".result-filter__list-card-base-two-card-btn")
    .forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const card = e.currentTarget.closest(".result-filter__list-card");
        const cardTwo = card.querySelector(
          ".result-filter__list-card-base-two-card"
        );
        const details = card.querySelector(".result-filter__list-card-details");
        const hotelId = card.dataset.hotelId;

        const hotel = hotels.find((h) => h.id === +hotelId);
        if (!hotel) return;

        details.innerHTML = details.classList.contains("active")
          ? ""
          : renderHotelOptionsTable(hotel);

        details.classList.toggle("active");
        cardTwo.classList.toggle("active");
        btn.classList.toggle("active");
      });
    });
}
function renderFilterInfo(hotels) {
  const info = document.querySelector(".result-filter__info");
  if (!info) return;

  info.classList.add("active");

  const hotelsCount = hotels.length;
  if (!hotelsCount) {
    info.classList.remove("active");
  }

  const totalOtions = hotels.reduce((sum, hotel) => {
    return sum + (hotel.hotel_options?.length || 0);
  }, 0);

  const title = info.querySelector(".result-filter__info-title");
  if (title) {
    title.textContent = `Найдено ${totalOtions} предложения в ${hotelsCount} ${
      hotelsCount === 1 ? "отеле" : "отелях"
    }`;
  }

  const calendarBtn = info.querySelector(".result-filter__info-calendar");
  if (calendarBtn) {
    // тут буде ще логіка
  }

  const sortList = info.querySelector(".result-filter__info-sort ul");
  if (sortList) {
  }
}

// логіка з сортуванням списку
function initSortList() {
  const controls = document.querySelectorAll(
    ".result-filter__info-sort-controls-control"
  );

  function closeAll(except = null) {
    controls.forEach((control) => {
      if (control !== except) {
        control.classList.remove("is-open");
      }
    });
  }

  controls.forEach((control) => {
    const trigger = control.querySelector(
      ".result-filter__info-sort-controls-control-current"
    );
    const dropdown = control.querySelector(
      ".result-filter__info-sort-controls-control-dropdown"
    );
    const valueSpan = trigger.querySelector("span");

    if (!trigger || !dropdown || !valueSpan) return;

    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      closeAll(control);
      control.classList.toggle("is-open");
    });

    dropdown.querySelectorAll("li").forEach((item) => {
      item.addEventListener("click", () => {
        valueSpan.textContent = item.textContent;

        if (item.dataset.sort !== undefined) {
          sortState.sortBy = item.dataset.sort || "";
        }

        if (item.dataset.order) {
          sortState.order = item.dataset.order;
        }

        control.classList.remove("is-open");

        applySorting();
      });
    });
  });
  document.addEventListener("click", () => closeAll());
}
function applySorting() {
  let sorted = [...currentHotels];

  if (!sortState.sortBy) {
    sorted.sort((a, b) => {
      const aDate = new Date(a.updatedAt).getTime();
      const bDate = new Date(b.updatedAt).getTime();
      return bDate - aDate;
    });
  }

  if (sortState.sortBy === "price") {
    sorted.sort((a, b) => {
      const aPrice = a.tour_option?.minPrice ?? 0;
      const bPrice = b.tour_option?.minPrice ?? 0;

      return sortState.order === "asc" ? aPrice - bPrice : bPrice - aPrice;
    });
  }

  renderHotelsList(sorted);
}
// отримання питание у найдешевшої опції готелю
function getHotelMeals(options = []) {
  if (!options.length) return "-";

  const mealsMap = {
    no_meals: "Без питания",
    breakfast: "Завтрак",
    breakfast_dinner: "Завтрак и ужин",
    full_board: "Завтрак, обед, ужин",
    all_inclusive: "Всё включено",
    ultra_all_inclusive: "Ультра: всё включено",
  };

  const option = options.reduce((min, current) => {
    return current.price < min.price ? current : min;
  }, options[0]);

  return mealsMap[option.meals] || "-";
}
// логіка рендеру однієї картки
function renderHotelCard(hotel) {
  const id = hotel.id;
  const img = getHotelImage(hotel.image);
  const name = hotel.nameHotel;
  const destination = hotel.tour?.destination;
  const region = hotel.region;
  const category = renderCategoryStars(hotel.category);
  const meals = getHotelMeals(hotel.hotel_options);
  const days = hotel.tour_option?.days;
  const cate = hotel.category;
  const description = hotel.description;
  const hotelOptionsLength = hotel.hotel_options?.length;
  const minPrice = hotel.tour_option?.minPrice;

  return `
<li class="result-filter__list-card" data-hotel-id="${id}">
      <div class="result-filter__list-card-base">
        <div class="result-filter__list-card-base-one">
          <div class="result-filter__list-card-base-one-image">
            <img src="${img}" alt="${name}" />
          </div>
          <div class="result-filter__list-card-base-one-info">
            <div class="result-filter__list-card-base-one-info-text">
              <h3>${name}</h3>
              <p>
                <svg>
                  <use href="${sprite}#icon-point"></use>
                </svg>
                ${destination}, ${region}
              </p>
              <span
                >Краткое описание отеля. Рекомендуем для семейного и молодёжного
                отдыха. Отель прекрасно сочетает в себе как современный комфорт,
                так и высокий уровень обслуживания...</span
              >
            </div>
            <a
              href="{{link 'html/pages/hotelPage.html'}}"
              class="result-filter__list-card-base-one-info-link"
            >
              Подробнее об отеле
              <svg>
                <use href="${sprite}#icon-arrow-right"></use>
              </svg>
            </a>
          </div>
        </div>
        <div class="result-filter__list-card-base-two">
          <ul class="result-filter__list-card-base-two-info">
            <li class="result-filter__list-card-base-two-info-stars">
              ${category}
            </li>
            <div class="result-filter__list-card-base-two-info-list">
              <li class="result-filter__list-card-base-two-info-item">
                <svg>
                  <use href="${sprite}#icon-clock"></use>
                </svg>
                ${days} дн.
              </li>
              <li class="result-filter__list-card-base-two-info-item">
                <svg>
                  <use href="${sprite}#icon-food"></use>
                </svg>
                ${meals}
              </li>
              <li class="result-filter__list-card-base-two-info-item">
                <svg>
                  <use href="${sprite}#icon-house"></use>
                </svg>
                ${cate}
              </li>
              <li class="result-filter__list-card-base-two-info-item">
                <svg>
                  <use href="${sprite}#icon-sun"></use>
                </svg>
                ${description}
              </li>
            </div>
          </ul>
          <div class="result-filter__list-card-base-two-card">
            <div class="result-filter__list-card-base-two-card-text">
              <p class="result-filter__list-card-base-two-card-text-number">
                ${hotelOptionsLength} предложения
              </p>
              <p class="result-filter__list-card-base-two-card-text-price">
                от <span>${minPrice}€</span>/чел
              </p>
            </div>
            <button
              class="button-org result-filter__list-card-base-two-card-btn"
              style="--btn-width: 100%; --btn-height: 42px"
            >
              Открыть
            </button>
          </div>
        </div>
      </div>
      <div class="result-filter__list-card-details"></div>
    </li>
  `;
}
// логіка рендеру дод інфо
function renderHotelOptionsTable(hotel) {
  if (!hotel.hotel_options?.length) return "<p>Нет доступных вариантов</p>";

  return `
    <table class="result-filter__list-card-details-table">
      <thead>
        <tr>
          <th>Дата</th>
          <th>Период</th>
          <th>Питание</th>
          <th>Категория</th>
          <th>Мест в самолёте</th>
          <th>Стоимость</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${hotel.hotel_options
          .map((option) => renderHotelOptionRow(hotel, option))
          .join("")}
      </tbody>
    </table>
  `;
}
function renderHotelOptionRow(hotel, option) {
  const startDate = formatDate(hotel.tour_option?.startDate);
  const period = hotel.tour_option?.days + " дн.";
  const meals = getHotelMeals([option]);
  const category = hotel.category;
  const seats = "10+";
  const price = option.price;

  return `
    <tr>
    <td data-label="Дата">${startDate}</td>
    <td data-label="Период">${period}</td>
    <td data-label="Питание">${meals}</td>
    <td data-label="Тип номера">${category}</td>
    <td data-label="Мест в самолёте">${seats}</td>
    <td data-label="Стоимость"><span>${price}€</span>/чел</td>
    <td>
      <button
        class="button-org result-filter__list-card-details-btn"
        style="--btn-width: 160px; --btn-height: 42px"
      >
        выбрать
      </button>
    </td>
  </tr>
  `;
}
