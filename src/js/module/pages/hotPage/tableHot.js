import { fetchHotHotels } from "../../api/hotels";
import { formatDate, renderCategoryStars } from "../home-page/hotHome";
import sprite from "/img/sprite.svg";

const hotTable = document.querySelector(".tabletHot");
const tbody = hotTable.querySelector(".tabletHot__table-tbody");

let arrTourOptions = [];
let allHotHotels = [];

const cityMap = {
  tallinn: "Таллин",
  riga: "Рига",
  vilnius: "Вильнус",
};
const mealsMap = {
  no_meals: "Без питания",
  breakfast: "Завтрак",
  breakfast_dinner: "Завтрак и ужин",
  full_board: "Завтрак, обед, ужин",
  all_inclusive: "Всё включено",
  ultra_all_inclusive: "Ультра: всё включено",
};
const packageMap = {
  package: "Туристический пакет",
  flight_only: "Только перелет",
};

if (hotTable) {
  const hotels = await fetchHotHotels();

  allHotHotels = hotels;

  renderHotTable(hotels);
  initHotHotelsClicks();
  initHotHotelOptionsClicks();
}
// добуваємо унікальі tour_option
function extractUniqueTourOptions(hotels) {
  const map = new Map();

  hotels.forEach((hotel) => {
    const option = hotel.tour_option;
    if (!option?.id) return;

    if (!map.has(option.id)) {
      map.set(option.id, {
        ...option,
        tour: hotel.tour,
        // region: hotel.region,
      });
    }
  });

  return Array.from(map.values());
}
// рендер першої таблиці
function renderHotTable(hotels) {
  arrTourOptions = extractUniqueTourOptions(hotels);

  tbody.innerHTML = "";

  const listItems = arrTourOptions
    .map((option) => renderHotTableRow(option))
    .join("");

  tbody.innerHTML = listItems;
}
function renderHotTableRow(option) {
  const id = option.id;
  const startDate = formatDate(option.startDate);
  const departureCity = cityMap[option.departureCity] || option.departureCity;
  const destination = option.tour?.destination;
  const period = option.days + " дн.";
  const price = option.minPrice;

  return `
  <div class="tabletHot__table-tbody-row" data-option-id="${id}">
  <ul class="tabletHot__table-tbody-row-list">
    <li>${startDate}</li>
		<li>${departureCity}</li>
		<li>${destination}</li>
		<li>${period}</li>
		<li>от <span>${price}€</span>/чел</li>
		<li>
			<button
				class="tabletHot__table-tbody-btn"
				style="--btn-width: 160px; --btn-height: 42px"
        data-option-id="${id}"
			>
				Открыть
			</button>
		</li>
  </ul>
  <div class="tabletHot__table-two"></div>
	</div>

	`;
}
//  РЕНДЕР ДРУГОЇ ТАБЛИЦІ
function initHotHotelsClicks() {
  tbody.addEventListener("click", (e) => {
    const btn = e.target.closest(".tabletHot__table-tbody-btn");
    if (!btn) return;

    const optionTourId = Number(btn.dataset.optionId);
    const row = btn.closest(".tabletHot__table-tbody-row");
    const twoTableContainer = row.querySelector(".tabletHot__table-two");

    const hotelsOfOption = allHotHotels.filter(
      (hotel) => hotel.tour_option?.id === optionTourId
    );

    const isOpen = row.classList.contains("is-open");

    hotTable
      .querySelectorAll(".tabletHot__table-tbody-row.is-open")
      .forEach((r) => {
        r.classList.remove("is-open");
        r.querySelector(".tabletHot__table-two").innerHTML = "";
        r.querySelector(".tabletHot__table-tbody-btn").textContent = "Открыть";
      });

    if (isOpen) return;

    twoTableContainer.innerHTML = renderTwoTableHot(hotelsOfOption);
    row.classList.add("is-open");
    btn.textContent = "Закрыть";
  });
}

function renderTwoTableHot(hotels) {
  return `
  <div class="tabletHot__table-two-hotels">
    <ul class="tabletHot__table-two-hotels-thead">
      <li>Отель</li>
      <li>Категория</li>
      <li>Питание</li>
      <li>Состав тура</li>
      <li>Цена</li>
      <li></li>
    </ul>
    <div class="tabletHot__table-two-hotels-tbody">
    ${hotels.map((hotel) => renderTwoRowHot(hotel)).join("")}
    </div>
  </div>
  `;
}
// логіка з рядками Питание Состав тура
function buildOptionsList(optionsArray, fieldName, map) {
  if (!Array.isArray(optionsArray) || optionsArray.length === 0) {
    return "-";
  }

  const values = optionsArray
    .map((item) => item?.[fieldName])
    // .filter(Boolean)
    .map((value) => map?.[value] || value);

  if (values.length === 0) return "-";

  return [...new Set(values)].join(", ");
}
function renderTwoRowHot(hotel) {
  const id = hotel.id;
  const name = hotel.nameHotel;
  const category = renderCategoryStars(hotel.category);
  const meals = buildOptionsList(hotel.hotel_options, "meals", mealsMap);
  const tourPackage = buildOptionsList(
    hotel.hotel_options,
    "tourPackage",
    packageMap
  );
  const price = hotel.tour_option?.minPrice;

  return `
    <div class="tabletHot__table-two-hotels-tbody-row" data-hotel-id="${id}">
      <ul class="tabletHot__table-two-hotels-tbody-row-list">
      <li class="tabletHot__table-two-hotels-tbody-row-list-link">${name}</li>
      <li>${category}</li>
      <li>${meals}</li>
      <li>${tourPackage}</li>
      <li>от <span>${price}€</span>/чел</li>
      <li>
        <button class="tabletHot__table-two-hotels-tbody-btn"
        data-hotel-id="${id}"
        >
          <p>открыть предложения</p>
          <svg>
          <use href="${sprite}#icon-drop-down"></use>
          </svg>
        </button>
      </li>
      </ul>
      <div class="tabletHot__table-three"></div>
    </div>
  `;
}

// РЕНДЕР ТРЕТЬОЇ ТАБЛИЦІ
function initHotHotelOptionsClicks() {
  tbody.addEventListener("click", (e) => {
    const btn = e.target.closest(".tabletHot__table-two-hotels-tbody-btn");
    if (!btn) return;

    const hotelId = Number(btn.dataset.hotelId);
    const row = btn.closest(".tabletHot__table-two-hotels-tbody-row");
    const container = row.querySelector(".tabletHot__table-three");

    const hotel = allHotHotels.find((h) => h.id === hotelId);
    if (!hotel) return;

    const isOpen = row.classList.contains("is-open");

    tbody
      .querySelectorAll(".tabletHot__table-two-hotels-tbody-row.is-open")
      .forEach((r) => {
        r.classList.remove("is-open");
        r.querySelector(".tabletHot__table-three").innerHTML = "";
        r.querySelector(
          ".tabletHot__table-two-hotels-tbody-btn p"
        ).textContent = "открыть предложения";
      });

    if (isOpen) return;

    container.innerHTML = renderThirdTableHot(hotel);
    row.classList.add("is-open");
    btn.querySelector("p").textContent = "скрыть предложения";
  });
}
function renderThirdTableHot(hotel) {
  return `
    <div class="tabletHot__table-three-tbody">
      ${hotel.hotel_options
        .map((option) => renderThirdRowHot(option, hotel))
        .join("")}
    </div>
  `;
}
function renderThirdRowHot(option, hotel) {
  const id = option.id;
  const name = hotel.nameHotel;
  const category = renderCategoryStars(hotel.category);
  const meals = mealsMap?.[option.meals] || option.meals || "-";
  const tourPackage =
    packageMap?.[option.tourPackage] || option.tourPackage || "-";
  const price = option.price || hotel.tour_option?.minPrice || "-";


  return `
    <ul class="tabletHot__table-three-tbody-row" data-hotel-option-id="${id}">
      <li class="tabletHot__table-three-tbody-row-name">
          ➞  
          ${name}
      </li>
      <li>${category}</li>
      <li>${meals}</li>
      <li>${tourPackage}</li>
      <li><span>${price}€</span>/чел</li>
      <li>
        <button class="button-org tabletHot__table-three-tbody-btn"
        style="--btn-width: 160px; --btn-height: 28px"
        data-hotel-option-id="${id}"
        >
          выбрать
        </button>
      </li>
    </ul>
  `;
}
