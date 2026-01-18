import sprite from "/img/sprite.svg";
// images
import imgHotelOne from "/img/hotel/img-one.webp";
import imgHotelTwo from "/img/hotel/img-two.webp";
import imgHotelThree from "/img/hotel/img-three.webp";
import imgHotelFour from "/img/hotel/img-four.webp";
import imgHotelFive from "/img/hotel/img-five.webp";
// logic
import { fetchHotels } from "../../api/hotels.js";
import { getHotelImage, renderCategoryStars } from "../home-page/hotHome";
import HotelInfo from "/html/components/renderHotelInfo.html";

const infoHotelContainer = document.querySelector(".info-hotel");

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
}

function renderHotelPage(hotel, option) {
  return HotelInfo({
    // id: hotel.id,
    // img: getHotelImage(hotel.image),
    sprite: sprite,
    // imgOne: imgHotelOne,
    imgOne: getHotelImage(hotel.image),
		
    imgTwo: imgHotelTwo,
    imgThree: imgHotelThree,
    imgFour: imgHotelFour,
    imgFive: imgHotelFive,

    hotelName: hotel.nameHotel,
    category: renderCategoryStars(hotel.category),
    destination: hotel.tour?.destination,
    region: hotel.region,

    // meals: getHotelMeals(hotel.hotel_options),
    // days: hotel.tour_option?.days,
    // cate: hotel.category,
    // description: hotel.description,
    // hotelOptionsLength: hotel.hotel_options?.length,
    // minPrice: hotel.tour_option?.minPrice,
    // hotelLink: "/html/pages/hotelPage.html",
    // buttonText: "Открыть",
  });
}
