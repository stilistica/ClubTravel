import sprite from "/img/sprite.svg";
// images
import imgHotelOne from "/img/hotel/img-one.webp";
import imgHotelTwo from "/img/hotel/img-two.webp";
import imgHotelThree from "/img/hotel/img-three.webp";
import imgHotelFour from "/img/hotel/img-four.webp";
import imgHotelFive from "/img/hotel/img-five.webp";
import imgContacts from "/img/booking/image-mob.webp";

// logic
import { fetchHotels } from "../../api/hotels.js";
import {
  formatDate,
  getHotelImage,
  renderCategoryStars,
} from "../home-page/hotHome";
import HotelInfo from "/html/components/renderHotelInfo.html";
import { mealsMap } from "../hotPage/tableHot.js";

const infoHotelContainer = document.querySelector(".info-hotel");

const cityMap = {
  tallinn: "Таллина",
  riga: "Риги",
  vilnius: "Вильнуса",
};

let selectedAdults = 1;
let selectedChildren = 0;

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".choose-btn-hotel");
  if (!btn) return;

  const hotelId = btn.dataset.hotelId;
  const optionId = btn.dataset.optionId;

  const base = import.meta.env.BASE_URL;
  window.location.href = `${base}html/pages/hotelPage.html?hotel=${hotelId}&option=${optionId}`;
});

if (infoHotelContainer) {
  const params = new URLSearchParams(window.location.search);

  const hotelId = params.get("hotel");
  const optionId = params.get("option");

  getHotel(hotelId, optionId);
}

async function getHotel(hotId, opId) {
  const response = await fetchHotels();
  const hotels = response.data;

  const hotel = hotels.find((h) => Number(h.id) === Number(hotId));
  if (!hotel) return;

  const option = hotel.hotel_options.find((o) => Number(o.id) === Number(opId));
  if (!option) return;

  const wrapper = infoHotelContainer.querySelector(".info-hotel__wrapper");
  if (!wrapper) return;

  wrapper.innerHTML = "";

  const html = renderHotelPage(hotel, option);

  wrapper.appendChild(html);

  openInput();
  getAmountGuests(hotel, option);
  updateTotalPrice(option);
}
// рендер сторінки
function renderHotelPage(hotel, option) {
  return HotelInfo({
    // id: hotel.id,
    sprite: sprite,
    // imgOne: imgHotelOne,
    imgOne: getHotelImage(hotel.image),

    imgTwo: imgHotelTwo,
    imgThree: imgHotelThree,
    imgFour: imgHotelFour,
    imgFive: imgHotelFive,
		imgContacts: imgContacts,

    hotelName: hotel.nameHotel,
    category: renderCategoryStars(hotel.category),
    destination: hotel.tour?.destination,
    region: hotel.region,
    startDate: formatDate(hotel.tour_option?.startDate),
    days: `${hotel.tour_option?.days} дн.`,
    departureCity: cityMap[hotel.tour_option.departureCity],
    meals: mealsMap?.[option.meals] || option.meals || "-",
    cate: hotel.category,
    price: option.price,

    searchLink: "html/pages/searchPage.html",

    // days: hotel.tour_option?.days,
    // description: hotel.description,
    // hotelOptionsLength: hotel.hotel_options?.length,
    // minPrice: hotel.tour_option?.minPrice,
  });
}
// логіка з інпутом
function openInput() {
  const trigger = infoHotelContainer.querySelector(
    ".info-hotel__wrapper-two-info-two-amount-wrapper__trigger"
  );
  const dropdown = infoHotelContainer.querySelector(
    ".info-hotel__wrapper-two-info-two-amount-wrapper__dropdown"
  );

  if (!trigger || !dropdown) return;

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("is-open");
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".info-hotel__wrapper-two-info-two-amount-wrapper")) {
      dropdown.classList.remove("is-open");
    }
  });
}

function getAmountGuests(hotel, option) {
  const adultsValue = infoHotelContainer.querySelector(".info-hotel__adults");
  const childrenValue = infoHotelContainer.querySelector(
    ".info-hotel__children"
  );

  const dropdownAdults = infoHotelContainer.querySelector(
    ".info-hotel__dropdown-adults-value"
  );
  const dropdownChildren = infoHotelContainer.querySelector(
    ".info-hotel__dropdown-children-value"
  );

  const plusAdultsBtn = infoHotelContainer.querySelector(
    ".info-hotel-adults-plus"
  );
  const minusAdultsBtn = infoHotelContainer.querySelector(
    ".info-hotel-adults-minus"
  );
  const plusChildrenBtn = infoHotelContainer.querySelector(
    ".info-hotel-children-plus"
  );
  const minusChildrenBtn = infoHotelContainer.querySelector(
    ".info-hotel-children-minus"
  );

  const maxAdults = hotel.tour_option?.adults;
  const maxChildren = hotel.tour_option?.children;

  if (!adultsValue || !childrenValue || !dropdownAdults || !dropdownChildren)
    return;

  updateValues(option);

  const dropdown = infoHotelContainer.querySelector(
    ".info-hotel__wrapper-two-info-two-amount-wrapper__dropdown"
  );

  dropdown.addEventListener("click", (e) => {
    const plusAdults = e.target.closest(".info-hotel-adults-plus");
    const minusAdults = e.target.closest(".info-hotel-adults-minus");
    const plusChildren = e.target.closest(".info-hotel-children-plus");
    const minusChildren = e.target.closest(".info-hotel-children-minus");

    if (!plusAdults && !minusAdults && !plusChildren && !minusChildren) return;

    if (plusAdults && selectedAdults < maxAdults) {
      selectedAdults++;
      updateValues();
    }
    if (minusAdults && selectedAdults > 1) {
      selectedAdults--;
      updateValues();
    }
    if (plusChildren && selectedChildren < maxChildren) {
      selectedChildren++;
      updateValues();
    }
    if (minusChildren && selectedChildren > 0) {
      selectedChildren--;
      updateValues();
    }
  });

  function updateValues() {
    dropdownAdults.textContent = selectedAdults;
    adultsValue.textContent = selectedAdults;

    dropdownChildren.textContent = selectedChildren;
    childrenValue.textContent = selectedChildren;

    plusAdultsBtn.classList.toggle("is-disabled", selectedAdults >= maxAdults);
    minusAdultsBtn.classList.toggle("is-disabled", selectedAdults <= 1);
    plusChildrenBtn.classList.toggle(
      "is-disabled",
      selectedChildren >= maxChildren
    );
    minusChildrenBtn.classList.toggle("is-disabled", selectedChildren <= 0);

    renderGuestsInfo();
    updateTotalPrice(option);
  }
}

function renderGuestsInfo() {
  const infoList = infoHotelContainer.querySelector(
    ".info-hotel__wrapper-two-info-two-amount-wrapper__info"
  );
  if (!infoList) return;

  infoList.innerHTML = "";

  if (selectedAdults > 0) {
    const li = document.createElement("li");
    li.textContent = `Взрослых x${selectedAdults}`;
    infoList.appendChild(li);
  }

  if (selectedChildren > 0) {
    const li = document.createElement("li");
    li.textContent = `Дети x${selectedChildren}`;
    infoList.appendChild(li);
  }
}
// отримання повної суми
function updateTotalPrice(option) {
  const totalPriceEl = infoHotelContainer.querySelector(
    ".info-hotel__total-price"
  );
  if (!totalPriceEl) return;

  const pricePerPerson = option.price || 0;

  const totalAmount = selectedAdults + selectedChildren;
  const total = pricePerPerson * totalAmount;

  totalPriceEl.textContent = `${total}€`;
}
