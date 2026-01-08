import{a as ie,J as N,S as C,P as U,K as V,f as oe,r as ae,N as z}from"./vendor-d6aZdYq-.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function r(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=r(i);fetch(i.href,s)}})();document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".open-menu"),t=document.querySelector(".mob-menu");!e||!t||(e.addEventListener("click",()=>{t.classList.toggle("is-open")}),t.addEventListener("click",r=>{r.target===t&&t.classList.remove("is-open")}))});const v=ie.create({baseURL:"http://localhost:1337/api",headers:{"Content-Type":"application/json"}});async function le(e,t){return(await v.post("/auth/local",{identifier:e,password:t})).data}function ce(){const e=localStorage.getItem("jwt");return typeof e=="string"&&e.length>0}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("loginForm");if(!e)return;const t=new N("#loginForm",{errorFieldCssClass:"is-error",errorLabelCssClass:"login__error",focusInvalidField:!0,lockForm:!0});t.addField('[name="email"]',[{rule:"required",errorMessage:"Введите e-mail"},{rule:"email",errorMessage:"Некорректный e-mail"}]).addField('[name="password"]',[{rule:"required",errorMessage:"Введите пароль"}]).onSuccess(async r=>{r.preventDefault();const n=e.email.value.trim(),i=e.password.value;try{const s=await le(n,i);localStorage.setItem("jwt",s.jwt),window.location.replace("/ClubTravel/html/pages/accountPage.html")}catch(s){t.showErrors({'[name="password"]':s.message})}})});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".header__top-bar-profile-link");e&&(e.href=ce()?"/ClubTravel/html/pages/accountPage.html":"/ClubTravel/html/pages/loginPage.html")});async function de({page:e=1,pageSize:t=5}){const r=localStorage.getItem("jwt");if(!r)throw new Error("Нет JWT");return(await v.get("/orders",{headers:{Authorization:`Bearer ${r}`},params:{populate:"user",pagination:{page:e,pageSize:t},sort:"createdAt:desc"}})).data}const ue=5;function J(e){if(!e)return"—";const t=new Date(e),r=t.getDate(),n=t.getFullYear(),i=t.toLocaleString("ru-RU",{month:"long"}),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r} ${i} ${n} ${s}:${o}`}function pe(e){const t=e.charter==="Оплачено"?"order-status--paid":"order-status--processing";return`
    <tr>
      <td>${e.orderNumber}</td>
      <td>${e.totalPrice.toFixed(2)}</td>
      <td>${e.user?.email??"—"}</td>
      <td>
        <span class="order-status ${t}">
          ${e.charter}
        </span>
      </td>
      <td>${J(e.date)}</td>
    </tr>
  `}function me(e){const t=e.charter==="Оплачено"?"order-status--paid":"order-status--processing";return`
    <div class="account__order-card">
      <div class="account__order-number">Номер заказа<span class="account__number">${e.orderNumber}</span></div>
      <div account__order-total>Сумма<span>${e.totalPrice.toFixed(2)}</span></div>
      <div>Email<span>${e.user?.email??"—"}</span></div>
      <div>
        Статус
        <span class="account__order-status ${t}">
          ${e.charter}
        </span>
      </div>
      <div>Дата<span>${J(e.date)}</span></div>
    </div>
  `}function fe(e,t,r){const n=document.getElementById("ordersPagination");if(!n)return;const{page:i,pageCount:s,total:o}=e.pagination;n.innerHTML=`
      <p class="account__pagination-info">
        Показано ${t} из ${o}
      </p>
     <div class="account__pagination-btns-wrapper">
      <button
        class="account__pagination-btn"
        ${i===1?"disabled":""}
        data-action="prev"
      >
        Назад
      </button>

      <div class="account__pagination-page">
      <p class="account__pagination-text">Страница</p>
      <p class="account__pagination-current">${i}</p>
      <p class="account__pagination-text">из ${s}</p>
      </div>

      <button
        class="account__pagination-btn"
        ${i===s?"disabled":""}
        data-action="next"
      >
        Вперёд
      </button>
      </div>
  `,n.onclick=c=>{const l=c.target.dataset.action;l&&(l==="prev"&&i>1&&r(i-1),l==="next"&&i<s&&r(i+1))}}document.addEventListener("DOMContentLoaded",async()=>{const e=document.getElementById("ordersList"),t=document.getElementById("ordersPagination");if(!e||!t)return;let r=1;async function n(i){try{const{data:s,meta:o}=await de({page:i,pageSize:ue});if(!s.length){e.innerHTML='<tr><td colspan="5">Заказов нет</td></tr>',t.innerHTML="";return}e.innerHTML=s.map(pe).join("");const c=document.getElementById("ordersCards");c&&(c.innerHTML=s.map(me).join("")),fe(o,s.length,l=>{r=l,n(r)})}catch(s){console.error("Ошибка загрузки заказов:",s),e.innerHTML='<tr><td colspan="5">Ошибка загрузки заказов</td></tr>'}}n(r)});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".account__btn-exit");e&&e.addEventListener("click",()=>{localStorage.removeItem("jwt"),localStorage.removeItem("user"),window.location.replace("/ClubTravel/html/pages/loginPage.html")})});async function ge(){const{data:e}=await v.get("/tours");return e.data}async function _e(){const{data:e}=await v.get("/hotels?populate=*");return e}async function he(){const{data:e}=await v.get("/hotels?populate=*&filters[tour_option][hotOffer][$eq]=true");return e.data}async function ve(e){const{data:t}=await v.get(`/hotels?populate=*&filters[tour_option][season][$eq]=${e}`);return t.data}const _="/ClubTravel/assets/sprite-xjNdH9vZ.svg",F=document.querySelector(".hothome__slider-swiper .swiper-wrapper");function W(e){return e?new Date(e).toLocaleDateString("ru-RU",{day:"numeric",month:"long",year:"numeric"}):""}function we(e=[]){return e.length?Math.min(...e.map(t=>t.price)):null}function Y(e){return e&&(`http://localhost:1337${e.url}`||`http://localhost:1337${e.formats?.small?.url}`||`http://localhost:1337${e.formats?.thumbnail?.url}`||e.formats?.small?.url||e.formats?.thumbnail?.url||e.url)||"/img/hot/image-one.webp"}function K(e){if(e==="Apartments")return`
      <p class="filter__extended-info-list-column-list-item-app">
        <svg>
          <use href="${_}#icon-house"></use>
        </svg>
        Апартаменты
      </p>
    `;const r={Budget:2,Economy:3,Standard:4,Comfort:5}[e];return r?`
    <div class="filter__extended-info-list-column-list-item-stars">
      ${Array.from({length:r}).map(()=>`
          <svg class="filter__extended-info-list-column-list-item-stars-star">
            <use href="${_}#icon-star"></use>
          </svg>
          `).join("")}
    </div>
  `:""}if(F){const t=(await he()).map(n=>{const i=n.nameHotel,s=n.region,o=n.tour?.destination,c=W(n.tour_option?.startDate),l=we(n.hotel_options),d=Math.round(l-l*(30/100)),p=K(n.category);return`
        <div class="hothome__slider-swiper-item swiper-slide">
          <div class="hothome__slider-swiper-item-one">
            <img src="${Y(n.image)}" alt="${i}" />
            <div class="hothome__slider-swiper-item-one-list">
            <div
              class="hothome__slider-swiper-item-one-list-item hothome__slider-swiper-item-one-list-date"
            >
              <svg>
                <use href="${_}#icon-clock"></use>
              </svg>
              <p>${c}</p>
            </div>
            <div
              class="hothome__slider-swiper-item-one-list-item hothome__slider-swiper-item-one-list-place"
            >
              <svg>
                <use href="${_}#icon-point"></use>
              </svg>
              <p>${o}, ${s}</p>
            </div>
            </div>
          </div>
          <div class="hothome__slider-swiper-item-two">
            <div class="hothome__slider-swiper-item-two-info">
              <p class="hothome__slider-swiper-item-two-info-name">${i}</p>
              <div class="hothome__slider-swiper-item-two-info-categories">${p}</div>
            </div>
            <div class="hothome__slider-swiper-item-two-price">
              <p class="hothome__slider-swiper-item-two-price-new"><span>${d}</span>€/чел</p>
              <span class="hothome__slider-swiper-item-two-price-old">${l}€/чел</span>
            </div>
            <div class="hothome__slider-swiper-item-two-flag">
              <div>
              <svg>
                <use href="${_}#icon-flag"></use>
              </svg>
							<p>-30%</p>
              </div>
            </div>
          </div>
        </div>
				`}).join("");F.innerHTML=t,new C(".hothome__slider-swiper",{direction:"horizontal",keyboard:{enabled:!0,onlyInViewport:!0},modules:[U,V],resizeObserver:!0,observer:!0,observeParents:!0,navigation:{nextEl:".hothome__slider-buttons-next",prevEl:".hothome__slider-buttons-prev"},loop:!0,breakpoints:{0:{slidesPerView:1,spaceBetween:20},620:{slidesPerView:2,spaceBetween:20},768:{slidesPerView:2,spaceBetween:23},1366:{slidesPerView:3,spaceBetween:26},1440:{slidesPerView:3,spaceBetween:28},1920:{slidesPerView:4,spaceBetween:31}}}).update()}const S={sortBy:"",order:"asc"};let G=[];document.addEventListener("DOMContentLoaded",()=>{ye()});function Z(e){G=e;const t=document.querySelector(".result-filter__list");if(t){if(t.innerHTML="",!e.length){t.innerHTML=`
		<li class="result-filter__list-empty">
		По выбранным фильтрам ничего не найдено
		</li>
		`,I([]);return}t.innerHTML=e.map(r=>be(r)).join(""),I(e),document.querySelectorAll(".result-filter__list-card-base-two-card-btn").forEach(r=>{r.addEventListener("click",n=>{const i=n.currentTarget.closest(".result-filter__list-card"),s=i.querySelector(".result-filter__list-card-base-two-card"),o=i.querySelector(".result-filter__list-card-details"),c=i.dataset.hotelId,l=e.find(p=>p.id===+c);if(!l)return;const d=r.classList.contains("active");o.innerHTML=o.classList.contains("active")?"":Se(l),o.classList.toggle("active"),s.classList.toggle("active"),r.classList.toggle("active"),r.textContent=d?"Открыть":"Закрыть"})})}}function I(e){const t=document.querySelector(".result-filter__info");if(!t)return;t.classList.add("active");const r=e.length;r||t.classList.remove("active");const n=e.reduce((s,o)=>s+(o.hotel_options?.length||0),0),i=t.querySelector(".result-filter__info-title");i&&(i.textContent=`Найдено ${n} предложения в ${r} ${r===1?"отеле":"отелях"}`),t.querySelector(".result-filter__info-calendar"),t.querySelector(".result-filter__info-sort ul")}function ye(){const e=document.querySelectorAll(".result-filter__info-sort-controls-control");function t(r=null){e.forEach(n=>{n!==r&&n.classList.remove("is-open")})}e.forEach(r=>{const n=r.querySelector(".result-filter__info-sort-controls-control-current"),i=r.querySelector(".result-filter__info-sort-controls-control-dropdown"),s=n.querySelector("span");!n||!i||!s||(n.addEventListener("click",o=>{o.stopPropagation(),t(r),r.classList.toggle("is-open")}),i.querySelectorAll("li").forEach(o=>{o.addEventListener("click",()=>{s.textContent=o.textContent,o.dataset.sort!==void 0&&(S.sortBy=o.dataset.sort||""),o.dataset.order&&(S.order=o.dataset.order),r.classList.remove("is-open"),$e()})}))}),document.addEventListener("click",()=>t())}function $e(){let e=[...G];S.sortBy||e.sort((t,r)=>{const n=new Date(t.updatedAt).getTime();return new Date(r.updatedAt).getTime()-n}),S.sortBy==="price"&&e.sort((t,r)=>{const n=t.tour_option?.minPrice??0,i=r.tour_option?.minPrice??0;return S.order==="asc"?n-i:i-n}),Z(e)}function X(e=[]){if(!e.length)return"-";const t={no_meals:"Без питания",breakfast:"Завтрак",breakfast_dinner:"Завтрак и ужин",full_board:"Завтрак, обед, ужин",all_inclusive:"Всё включено",ultra_all_inclusive:"Ультра: всё включено"},r=e.reduce((n,i)=>i.price<n.price?i:n,e[0]);return t[r.meals]||"-"}function be(e){const t=e.id,r=Y(e.image),n=e.nameHotel,i=e.tour?.destination,s=e.region,o=K(e.category),c=X(e.hotel_options),l=e.tour_option?.days,d=e.category,p=e.description,g=e.hotel_options?.length,f=e.tour_option?.minPrice;return`
<li class="result-filter__list-card" data-hotel-id="${t}">
      <div class="result-filter__list-card-base">
        <div class="result-filter__list-card-base-one">
          <div class="result-filter__list-card-base-one-image">
            <img src="${r}" alt="${n}" />
          </div>
          <div class="result-filter__list-card-base-one-info">
            <div class="result-filter__list-card-base-one-info-text">
              <h3>${n}</h3>
              <p>
                <svg>
                  <use href="${_}#icon-point"></use>
                </svg>
                ${i}, ${s}
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
                <use href="${_}#icon-arrow-right"></use>
              </svg>
            </a>
          </div>
        </div>
        <div class="result-filter__list-card-base-two">
          <ul class="result-filter__list-card-base-two-info">
            <li class="result-filter__list-card-base-two-info-stars">
              ${o}
            </li>
            <div class="result-filter__list-card-base-two-info-list">
              <li class="result-filter__list-card-base-two-info-item">
                <svg>
                  <use href="${_}#icon-clock"></use>
                </svg>
                ${l} дн.
              </li>
              <li class="result-filter__list-card-base-two-info-item">
                <svg>
                  <use href="${_}#icon-food"></use>
                </svg>
                ${c}
              </li>
              <li class="result-filter__list-card-base-two-info-item">
                <svg>
                  <use href="${_}#icon-house"></use>
                </svg>
                ${d}
              </li>
              <li class="result-filter__list-card-base-two-info-item">
                <svg>
                  <use href="${_}#icon-sun"></use>
                </svg>
                ${p}
              </li>
            </div>
          </ul>
          <div class="result-filter__list-card-base-two-card">
            <div class="result-filter__list-card-base-two-card-text">
              <p class="result-filter__list-card-base-two-card-text-number">
                ${g} предложения
              </p>
              <p class="result-filter__list-card-base-two-card-text-price">
                от <span>${f}€</span>/чел
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
  `}function Se(e){return e.hotel_options?.length?`
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
        ${e.hotel_options.map(t=>Le(e,t)).join("")}
      </tbody>
    </table>
  `:"<p>Нет доступных вариантов</p>"}function Le(e,t){const r=W(e.tour_option?.startDate),n=e.tour_option?.days+" дн.",i=X([t]),s=e.category,o="10+",c=t.price;return`
    <tr>
    <td data-label="Дата">${r}</td>
    <td data-label="Период">${n}</td>
    <td data-label="Питание">${i}</td>
    <td data-label="Тип номера">${s}</td>
    <td data-label="Мест в самолёте">${o}</td>
    <td data-label="Стоимость"><span>${c}€</span>/чел</td>
    <td>
      <button
        class="button-org result-filter__list-card-details-btn"
        style="--btn-width: 160px; --btn-height: 42px"
      >
        выбрать
      </button>
    </td>
  </tr>
  `}const b=document.querySelector(".filter"),a={destination:"",days:null,date:null,guests:{adults:null,children:null},category:[],meals:[],tourPackage:[],departureCity:[],price:{min:null,max:null},regions:[]},xe={"filter-destination":"destination","filter-days":"days","filter-date":"date","filter-guests":"guests"};if(window.location.pathname.endsWith("searchPage.html"))if([...new URLSearchParams(window.localStorage.search).keys()].length)He();else{const t=localStorage.getItem("filtersState");t&&Object.assign(a,JSON.parse(t)),y(a)}else localStorage.removeItem("filtersState"),window.history.replaceState({},"",window.location.pathname);if(b){let e=function(o=null){i.forEach(c=>{c!==o&&c.classList.remove("is-open")})};const t=b.querySelector(".filter__section-form-date__trigger-input"),r=b.querySelector(".filter__section-form-date__trigger"),n=b.querySelector(".filter__section-form-date__trigger-value");if(t||r||n){if(a.date){const c=new Date(a.date),l=c.getDate(),d=c.getFullYear(),p=c.toLocaleString("ru-RU",{month:"long"});n.textContent=`${l} ${p} ${d}`}const o=oe(t,{locale:ae.Russian,minDate:"today",dateFormat:"Y-m-d",allowInput:!1,onChange(c){if(!c.length)return;const l=c[0],d=l.getDate(),p=l.getFullYear(),g=l.toLocaleString("ru-RU",{month:"long"});n.textContent=`${d} ${g} ${p}`;const f=l.getFullYear(),m=String(l.getMonth()+1).padStart(2,"0"),u=String(l.getDate()).padStart(2,"0");a.date=`${f}-${m}-${u}`,y(a),$()}});r.addEventListener("click",()=>{o.open()})}const i=b.querySelectorAll(".filter__section-form-item-variant:not(.filter__section-form-guests-variant)");i.forEach(o=>{const l=o.closest(".filter__section-form-item").dataset.name,d=xe[l],p=o.querySelector(".filter__section-form-item-variant__trigger"),g=o.querySelector(".filter__section-form-item-variant__dropdown"),f=p.querySelector("span");if(!(!g||!p||!f)){if(a[d]&&typeof a[d]=="string"){const m=Array.from(g.querySelectorAll("li")).find(u=>(u.dataset.value??u.getAttribute("value"))===a[d]);m&&(f.textContent=m.textContent)}p.addEventListener("click",m=>{m.stopPropagation(),e(o),o.classList.toggle("is-open")}),g.querySelectorAll("li").forEach(m=>{m.addEventListener("click",()=>{const u=m.dataset.value??m.getAttribute("value")??"";f.textContent=m.textContent,a[d]=u||null,y(a),$(),d==="destination"&&(a.regions=[],q&&q(u)),o.classList.remove("is-open")})})}}),document.addEventListener("click",()=>e());const s=b.querySelector(".filter__section-form-guests-variant");if(s){let o=function(){const u=+p.value||0,w=+g.value||0;if(!u&&!w){d.textContent="Любое к-ство";return}const h=[];u&&h.push(`Взрослых: ${u}`),w&&h.push(`детей: ${w}`),d.textContent=h.join("; "),a.guests.adults=u,a.guests.children=w,y(a),$()};const c=s.querySelector(".filter__section-form-guests-variant__trigger"),l=s.querySelector(".filter__section-form-guests-variant__dropdown"),d=c.querySelector("span"),p=l.querySelector("input[name='filter-adults']"),g=l.querySelector("input[name='filter-children']");if(a.guests.adults||a.guests.children){const u=[];a.guests.adults&&u.push(`Взрослых: ${a.guests.adults}`),a.guests.children&&u.push(`детей: ${a.guests.children}`),d.textContent=u.join("; ")}const f=l.querySelector("li"),m=l.querySelectorAll("li > div");c.addEventListener("click",u=>{u.stopPropagation(),e(),s.classList.toggle("is-open")}),l.addEventListener("click",u=>u.stopPropagation()),f.addEventListener("click",()=>{p.value="",g.value="",d.textContent="Любое к-ство",a.guests.adults=null,a.guests.children=null,y(a),$(),s.classList.remove("is-open")}),p.addEventListener("input",o),g.addEventListener("input",o),m.forEach(u=>{u.addEventListener("click",w=>{w.target.tagName!=="INPUT"&&s.classList.remove("is-open")})})}}const A=document.querySelector(".button-form-search-link");A&&A.addEventListener("click",async e=>{if(e.preventDefault(),$(),!window.location.pathname.endsWith("searchPage.html")){const s="/ClubTravel/";window.location.href=`${s}html/pages/searchPage.html`;return}const n=(await _e()).data,i=Ee(n,a);y(a),Z(i)});function Ee(e,t){return e.filter(r=>{if(t.destination&&r.tour?.destination!==t.destination||t.days!==null&&r.tour_option?.days!==Number(t.days))return!1;if(t.date){const i=new Date(t.date),s=new Date(r.tour_option?.startDate),o=new Date(r.tour_option?.endDate);if(i<s||i>o)return!1}return!(t.guests.adults!==null&&r.tour_option?.adults<t.guests.adults||t.guests.children!==null&&r.tour_option?.children<t.guests.children||(t.meals.length||t.tourPackage.length||t.price.min!==null||t.price.max!==null)&&!r.hotel_options?.some(s=>!(t.meals.length&&!t.meals.includes(s.meals)||t.tourPackage.length&&!t.tourPackage.includes(s.tourPackage)||t.price.min!==null&&s.price<t.price.min||t.price.max!==null&&s.price>t.price.max))||t.category.length&&!t.category.includes(r.category)||t.departureCity.length&&!t.departureCity.includes(r.tour_option?.departureCity)||t.regions.length&&!t.regions.includes(r.region))})}const x=document.querySelector(".filter__extended-btn"),E=document.querySelector(".filter__extended-info");if(x&&E){x.addEventListener("click",()=>{x.classList.add("filter__extended-is-hidden"),E.classList.remove("filter__extended-is-hidden"),Ce(),Pe(),qe()});const e=E.querySelector(".filter__extended-info-title-close");e&&e.addEventListener("click",()=>{E.classList.add("filter__extended-is-hidden"),x.classList.remove("filter__extended-is-hidden")})}function Pe(){const e=document.querySelector(".filter-price-list");if(e){let t=function(){const h=u(f),L=u(m);o.style.left=`${h}%`,c.style.left=`${L}%`,s.style.left=`${h}%`,s.style.right=`${100-L}%`,l.textContent=`${f}€`,d.textContent=`${m}€`},r=function(h,L){const H=i.getBoundingClientRect(),D=se=>{let M=(se.clientX-H.left)/H.width*100;M=Math.max(0,Math.min(100,M));const B=w(M);L?f=Math.min(B,m):m=Math.max(B,f),t(),n()},k=()=>{document.removeEventListener("mousemove",D),document.removeEventListener("mouseup",k)};document.addEventListener("mousemove",D),document.addEventListener("mouseup",k)},n=function(){f===p&&m===g?(a.price.min=null,a.price.max=null):(a.price.min=f,a.price.max=m),y(a),$()};const i=e.querySelector(".filter-price-slider"),s=e.querySelector(".filter-price-range"),o=e.querySelector(".filter-price-thumb.left"),c=e.querySelector(".filter-price-thumb.right"),l=e.querySelector("#minPrice"),d=e.querySelector("#maxPrice"),p=200,g=3e3;let f=200,m=3e3;a.price.min!==null&&(f=a.price.min),a.price.max!==null&&(m=a.price.max);const u=h=>(h-p)/(g-p)*100,w=h=>Math.round(p+h/100*(g-p));o.addEventListener("mousedown",h=>r(h,!0)),c.addEventListener("mousedown",h=>r(h,!1)),t()}}let q=null;function qe(){const e=document.querySelector('[data-extended="regions"]');if(!e)return;const t=e.querySelector(".filter__extended-info-list-column-list"),r=e.querySelector(".filter__extended-info-list-column-hint");let n=[];q=async function(i){if(t.innerHTML="",Q(),!i){r.classList.remove("is-hidden"),r.textContent="Выберите сначала направление";return}n.length||(n=await ge());const s=n.find(l=>l.destination===i);r.classList.add("is-hidden");const o=s.regions.map(l=>`
  <li class="filter__extended-info-list-column-list-item" data-value="${l}">
    <svg class="filter__extended-info-list-column-list-item-check">
      <use href="${_}#icon-check-circle"></use>
    </svg>
    ${l}
  </li>
`).join("");t.innerHTML=o;const c=a.regions||[];t.querySelectorAll(".filter__extended-info-list-column-list-item").forEach(l=>{c.includes(l.dataset.value)&&l.classList.add("is-active")})},q(a.destination)}function Ce(){document.querySelectorAll(".filter__extended-categoties").forEach(t=>{const r=t.dataset.extended,n=t.querySelector(".filter__extended-info-list-column-list");if(!n)return;const i=a[r]||[];n.querySelectorAll(".filter__extended-info-list-column-list-item").forEach(s=>{i.includes(s.dataset.value)&&s.classList.add("is-active")}),n.addEventListener("click",s=>{const o=s.target.closest(".filter__extended-info-list-column-list-item");if(!o)return;const c=o.dataset.value;if(!c)return;const l=a[r];l.includes(c)?(a[r]=l.filter(d=>d!==c),o.classList.remove("is-active")):(a[r].push(c),o.classList.add("is-active")),y(a),$(),Q()})})}const T=document.querySelector(".filter__extended-info-active-filter"),Me=["category","meals","tourPackage","departureCity","regions"],Te={category:"Категория размещения",meals:"Питание",tourPackage:"Состав тура",departureCity:"Вылет из",regions:"Регионы"},O={category:{Budget:"2 звезды",Economy:"3 звезды",Standard:"4 звезды",Comfort:"5 звезд",Apartments:"Апартаменты"},meals:{no_meals:"Без питания",breakfast:"Завтрак",breakfast_dinner:"Затрак и ужин",full_board:"Завтрак, обед, ужин",all_inclusive:"Всё включено",ultra_all_inclusive:"Ультра: всё включено"},tourPackage:{package:"Туристический пакет",flight_only:"Только перелет"},departureCity:{tallinn:"Таллин",riga:"Рига",vilnius:"Вильнюс"},regions:{}};function Q(){if(!T)return;T.innerHTML="";const e=Me.map(t=>{const r=a[t];return!Array.isArray(r)||r.length===0?"":(r.map(n=>`<li>${O[t]?.[n]||n}</li>`).join(""),`
        <div class="filter__extended-info-active-filter-item">
          <span class="filter__extended-info-active-filter-item-title">
            ${Te[t]}:
          </span>
          <ul class="filter__extended-info-active-filter-item-values">
            ${r.map(n=>`<li>${O[t]?.[n]||n}</li>`).join("")}
          </ul>
        </div>
      `)}).join("");T.innerHTML=e}function y(e){const t=new URLSearchParams;e.destination&&t.set("destination",e.destination),e.days&&t.set("days",e.days),e.date&&t.set("date",e.date),e.guests.adults!==null&&t.set("adults",e.guests.adults),e.guests.children!==null&&t.set("children",e.guests.children),["category","meals","tourPackage","departureCity","regions"].forEach(n=>{e[n].length&&t.set(n,e[n].join(","))}),e.price.min!==null&&t.set("priceMin",e.price.min),e.price.max!==null&&t.set("priceMax",e.price.max);const r=`${window.location.pathname}?${t.toString()}`;window.history.replaceState({},"",r)}function He(){const e=new URLSearchParams(window.location.search);a.destination=e.get("destination")||"",a.days=e.get("days"),a.date=e.get("date"),a.guests.adults=e.get("adults")?Number(e.get("adults")):null,a.guests.children=e.get("children")?Number(e.get("children")):null,["category","meals","tourPackage","departureCity","regions"].forEach(t=>{const r=e.get(t);a[t]=r?r.split(","):[]}),a.price.min=e.get("priceMin")?Number(e.get("priceMin")):null,a.price.max=e.get("priceMax")?Number(e.get("priceMax")):null}function $(){localStorage.setItem("filtersState",JSON.stringify(a))}async function De({destination:e,season:t,hotOffer:r,page:n=1,pageSize:i=6}={}){const s={"populate[tour_options][populate]":"imageTour","pagination[page]":n,"pagination[pageSize]":i,sort:"id:asc"};e&&e!=="Все страны"&&(s["filters[destination][$eq]"]=e),t&&(s["populate[tour_options][filters][season][$eq]"]=t),r&&(s["populate[tour_options][filters][hotOffer][$eq]"]=!0);const{data:o}=await v.get("/tours",{params:s});return o}function ke(e){return e.data.map(t=>{const r=t.tour_options||[],n=r.length?Math.min(...r.map(s=>s.minPrice)):null,i=r.find(s=>s.imageTour?.url);return{id:t.id,destination:t.destination,region:t.regions?.[0]??"",priceFrom:n,image:i?i.imageTour.url:"/img/no-image.webp",optionsCount:r.length,dates:r.map(s=>({start:s.startDate,end:s.endDate}))}})}const j=document.querySelectorAll(".directions__filters input[type='checkbox']");let ee=null;async function te(){try{const e=await De({destination:ee,page:1,pageSize:6}),t=ke(e);Be(t)}catch(e){console.error("Ошибка загрузки туров",e)}}j.forEach(e=>{e.addEventListener("change",()=>{j.forEach(t=>t.checked=!1),e.checked=!0,ee=e.value==="Все страны"?null:e.value,te()})});function R(e){return new Date(e).toLocaleDateString("ru-RU",{day:"2-digit",month:"long",year:"numeric"})}function Be(e){const t=document.querySelector(".directions__wrapper");t&&(t.innerHTML=e.map(r=>`
    <article class="directions__tour-card">

      <img width="273" height="160" src="${r.image}" alt="${r.region||r.destination}">

      <div class="directions__tour-card-body">

        <div class="directions__tour-card-head">
          <p class="directions__tour-card-region">${r.region}</p>
          <p class="directions__tour-card-price">
            от <span>${r.priceFrom?.toFixed(2).replace(".",",")}€</span>/ чел
          </p>
        </div>

        <div class="directions__tour-card-sub">
          <p>${r.destination}</p>
          <p>${r.optionsCount} предложений</p>
        </div>

        <div class="directions__tour-card-dates">
        <div class="directions__tour-card-dates-list">
          ${r.dates.slice(0,2).map(n=>`
            <p class="directions__tour-card-date">
              ${R(n.start)} – ${R(n.end)}
            </p>
              
          `).join("")}
            </div>
            <svg width="24" height="24">
                <use href="${_}#icon-calendar"></use>
            </svg>
        </div>
        <div class="directions__btn-wrapper">
        <a href="/ClubTravel/html/pages/hotelPage.html?id=${r.id}"  class="directions__tour-card-btn">
          ВЫБРАТЬ ТУР
        </a>
        </div>
      </div>
    </article>
  `).join(""))}te();async function re(){const{data:e}=await v.get("/news-homes",{params:{populate:{images:!0},sort:["publishedAt:desc"]}});return e.data}function Fe(e){const t=document.querySelector(".news-page__slider-wrapper");if(!t)return;t.innerHTML="";const r=v.defaults.baseURL.replace(/\/api$/,"");e.forEach(n=>{const{title:i,price:s,date:o,images:c}=n,l=c?.url?r+c.url:"",d=document.createElement("div");d.className="news-home__card",d.innerHTML=`
      <div class="news-home__image">
        <img src="${l}" alt="${i}" />

        ${s?`<p class="news-home__price">от <span>${s}</span></p>`:""}

        ${o?`
            <div class="news-home__date-wrapper">
              <svg width="16" height="16">
                <use href="${_}#icon-clock"></use>
              </svg>
              <p>${Ie(o)}</p>
            </div>
            `:""}
      </div>

      <div class="news-home__content">
        <p class="news-home__title-card">${i}</p>
      </div>
    `,t.appendChild(d)})}function Ie(e){return new Date(e).toLocaleDateString("ru-RU",{day:"numeric",month:"long",year:"numeric"})}document.addEventListener("DOMContentLoaded",async()=>{const e=await re();Fe(e)});C.use([z]);function Ae(){document.querySelectorAll("[data-swiper]").forEach(e=>{if(e.swiper)return;const t=e.closest(".news-home__slider-wrapper");if(!t)return;const r=t.querySelector(".news-home__button-prev"),n=t.querySelector(".news-home__button-next");new C(e,{slidesPerView:1,spaceBetween:16,speed:600,navigation:{prevEl:r,nextEl:n},breakpoints:{768:{slidesPerView:2,spaceBetween:20},1024:{slidesPerView:3,spaceBetween:27}}})})}function Oe(){const e=document.querySelector(".news-home__slider-wrapper");if(!e)return null;const t=e.querySelector(".news-home__button-prev"),r=e.querySelector(".news-home__button-next");if(!t||!r)return null;const n=document.createElement("div");return n.className="swiper news-home__swiper",n.setAttribute("data-swiper",""),n.innerHTML=`
    <div class="swiper-wrapper"></div>
  `,e.insertBefore(n,r),n.querySelector(".swiper-wrapper")}function je(e){const t=Oe();t&&e.forEach(r=>{const{title:n,price:i,date:s,images:o}=r,c=v.defaults.baseURL.replace(/\/api$/,""),l=o?.url?c+o.url:"",d=document.createElement("div");d.className="swiper-slide",d.innerHTML=`
      <div class="news-home__card">
        <div class="news-home__image">
          <img src="${l}" alt="${n}" />

          ${i?`<p class="news-home__price">от <span>${i}</span></p>`:""}

          ${s?`
              <div class="news-home__date-wrapper">
                <svg width="16" height="16">
                  <use href="${_}#icon-clock"></use>
                </svg>
                <p>${Re(s)}</p>
              </div>
              `:""}
        </div>

        <div class="news-home__content">
          <p class="news-home__title-card">${n}</p>
        </div>
      </div>
    `,t.appendChild(d)})}function Re(e){return new Date(e).toLocaleDateString("ru-RU",{day:"numeric",month:"long",year:"numeric"})}document.addEventListener("DOMContentLoaded",async()=>{const e=await re();je(e),Ae()});const Ne=document.querySelector(".winter-homepage-swiper"),Ue=document.querySelector(".summer-homepage-swiper");Ne&&ne({containerSelector:".winter-homepage-swiper",prevBtn:".winter-homepage-prev",nextBtn:".winter-homepage-next",season:"winter"});Ue&&ne({containerSelector:".summer-homepage-swiper",prevBtn:".summer-homepage-prev",nextBtn:".summer-homepage-next",season:"summer"});async function ne({containerSelector:e,prevBtn:t,nextBtn:r,season:n}){const i=document.querySelector(`${e} .swiper-wrapper`),s=await ve(n);i.innerHTML=s.map(c=>Ve(c)).join(""),new C(e,{direction:"horizontal",keyboard:{enabled:!0,onlyInViewport:!0},modules:[U,V,z],resizeObserver:!0,observer:!0,observeParents:!0,navigation:{nextEl:r,prevEl:t},loop:!0,breakpoints:{0:{slidesPerView:1,spaceBetween:20},620:{slidesPerView:2,spaceBetween:20},768:{slidesPerView:3,spaceBetween:20},1366:{slidesPerView:4,spaceBetween:20},1440:{slidesPerView:4,spaceBetween:23},1920:{slidesPerView:5,spaceBetween:30}}}).update()}function Ve(e){function t(s){return`http://localhost:1337${s.image.url}`||`http://localhost:1337${s.image.formats?.small?.url}`||`http://localhost:1337${s.tour_option?.imageTour?.url}`||s.image?.url||s.tour_option?.imageTour?.url||s.tour_option?.imageTour?.formats?.small?.url||s.tour_option?.imageTour?.formats?.thumbnail?.url}const r=e.tour?.destination,n=e.tour_option?.minPrice;return`
        <div class="winter-summer-home__slider-swiper-slide swiper-slide">
          <div class="winter-summer-home__slider-swiper-slide-image">
            <img src="${t(e)}" alt="${r}" />
          </div>
          <div class="winter-summer-home__slider-swiper-slide-info">
            <div class="winter-summer-home__slider-swiper-slide-info-text">
              <p class="winter-summer-home__slider-swiper-slide-info-text-dest">
                <svg>
                  <use href="${_}#icon-point"></use>
                </svg>
                ${r}
              </p>
              <p class="winter-summer-home__slider-swiper-slide-info-text-price">от <span>${n}</span>€/чел</p>
            </div>
						<a
						href="{{link
            'html/pages/searchPage.html'}}"
						class="button-org"
						style="--btn-width: 100%; --btn-height: 42px;"
						>Выбрать тур</a>
          </div>
        </div>
	`}async function ze(e,t){return(await v.post("/auth/local/register",{username:e,email:e,password:t})).data}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("registerForm");if(!e)return;const t=new N("#registerForm",{errorFieldCssClass:"is-error",errorLabelCssClass:"login__error",focusInvalidField:!0,lockForm:!0});t.addField('[name="email"]',[{rule:"required",errorMessage:"Введите e-mail"},{rule:"email",errorMessage:"Некорректный e-mail"}]).addField('[name="password"]',[{rule:"required",errorMessage:"Введите пароль"},{rule:"minLength",value:8,errorMessage:"Минимум 8 символов"},{validator:r=>/[A-Za-z]/.test(r)&&/\d/.test(r),errorMessage:"Пароль должен содержать букву и цифру"}]).addField('[name="passwordRepeat"]',[{rule:"required",errorMessage:"Повторите пароль"},{validator:(r,n)=>r===n['[name="password"]'].elem.value,errorMessage:"Пароли не совпадают"}]).onSuccess(async r=>{r.preventDefault();const n=e.email.value.trim(),i=e.password.value;try{const s=await ze(n,i);localStorage.setItem("jwt",s.jwt),window.location.replace("/ClubTravel/html/pages/accountPage.html")}catch(s){const o=s.response?.data?.error?.message||"Ошибка регистрации";t.showErrors({'[name="email"]':o})}})});async function Je(e){return(await v.post("/auth/forgot-password",{email:e})).data}const P=document.getElementById("forgotForm");P&&P.addEventListener("submit",async e=>{e.preventDefault();try{await Je(P.email.value),P.reset(),alert("Письмо отправлено")}catch{alert("Ошибка")}});
