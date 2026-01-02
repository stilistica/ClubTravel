import{a as U,J as A,f as V,r as z,S as M,N as J,P as Y,K}from"./vendor-Dr0TTguT.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".open-menu"),t=document.querySelector(".mob-menu");!e||!t||(e.addEventListener("click",()=>{t.classList.toggle("is-open")}),t.addEventListener("click",n=>{n.target===t&&t.classList.remove("is-open")}))});const y=U.create({baseURL:"https://thankful-garden-94c969a4ca.strapiapp.com/api",headers:{"Content-Type":"application/json"}});async function W(e,t){return(await y.post("/auth/local",{identifier:e,password:t})).data}function G(){const e=localStorage.getItem("jwt");return typeof e=="string"&&e.length>0}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("loginForm");if(!e)return;const t=new A("#loginForm",{errorFieldCssClass:"is-error",errorLabelCssClass:"login__error",focusInvalidField:!0,lockForm:!0});t.addField('[name="email"]',[{rule:"required",errorMessage:"Введите e-mail"},{rule:"email",errorMessage:"Некорректный e-mail"}]).addField('[name="password"]',[{rule:"required",errorMessage:"Введите пароль"}]).onSuccess(async n=>{n.preventDefault();const s=e.email.value.trim(),i=e.password.value;try{const r=await W(s,i);localStorage.setItem("jwt",r.jwt),window.location.replace("/ClubTravel/html/pages/accountPage.html")}catch(r){t.showErrors({'[name="password"]':r.message})}})});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".header__top-bar-profile-link");e&&(e.href=G()?"/ClubTravel/html/pages/accountPage.html":"/ClubTravel/html/pages/loginPage.html")});async function Z({page:e=1,pageSize:t=5}){const n=localStorage.getItem("jwt");if(!n)throw new Error("Нет JWT");return(await y.get("/orders",{headers:{Authorization:`Bearer ${n}`},params:{populate:"user",pagination:{page:e,pageSize:t},sort:"createdAt:desc"}})).data}const X=5;function N(e){if(!e)return"—";const t=new Date(e),n=t.getDate(),s=t.getFullYear(),i=t.toLocaleString("ru-RU",{month:"long"}),r=String(t.getHours()).padStart(2,"0"),l=String(t.getMinutes()).padStart(2,"0");return`${n} ${i} ${s} ${r}:${l}`}function Q(e){const t=e.charter==="Оплачено"?"order-status--paid":"order-status--processing";return`
    <tr>
      <td>${e.orderNumber}</td>
      <td>${e.totalPrice.toFixed(2)}</td>
      <td>${e.user?.email??"—"}</td>
      <td>
        <span class="order-status ${t}">
          ${e.charter}
        </span>
      </td>
      <td>${N(e.date)}</td>
    </tr>
  `}function ee(e){const t=e.charter==="Оплачено"?"order-status--paid":"order-status--processing";return`
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
      <div>Дата<span>${N(e.date)}</span></div>
    </div>
  `}function te(e,t,n){const s=document.getElementById("ordersPagination");if(!s)return;const{page:i,pageCount:r,total:l}=e.pagination;s.innerHTML=`
      <p class="account__pagination-info">
        Показано ${t} из ${l}
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
      <p class="account__pagination-text">из ${r}</p>
      </div>

      <button
        class="account__pagination-btn"
        ${i===r?"disabled":""}
        data-action="next"
      >
        Вперёд
      </button>
      </div>
  `,s.onclick=o=>{const c=o.target.dataset.action;c&&(c==="prev"&&i>1&&n(i-1),c==="next"&&i<r&&n(i+1))}}document.addEventListener("DOMContentLoaded",async()=>{const e=document.getElementById("ordersList"),t=document.getElementById("ordersPagination");if(!e||!t)return;let n=1;async function s(i){try{const{data:r,meta:l}=await Z({page:i,pageSize:X});if(!r.length){e.innerHTML='<tr><td colspan="5">Заказов нет</td></tr>',t.innerHTML="";return}e.innerHTML=r.map(Q).join("");const o=document.getElementById("ordersCards");o&&(o.innerHTML=r.map(ee).join("")),te(l,r.length,c=>{n=c,s(n)})}catch(r){console.error("Ошибка загрузки заказов:",r),e.innerHTML='<tr><td colspan="5">Ошибка загрузки заказов</td></tr>'}}s(n)});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".account__btn-exit");e&&e.addEventListener("click",()=>{localStorage.removeItem("jwt"),localStorage.removeItem("user"),window.location.replace("/ClubTravel/html/pages/loginPage.html")})});async function ne(){const{data:e}=await y.get("/tours");return e.data}async function re(){const{data:e}=await y.get("/hotels?populate=*");return e}async function se(){const{data:e}=await y.get("/hotels?populate=*&filters[tour_option][hotOffer][$eq]=true");return e.data}const v="/ClubTravel/assets/sprite-xjNdH9vZ.svg",L=document.querySelector(".filter"),a={destination:"",days:null,date:null,guests:{adults:null,children:null},category:[],meals:[],tourPackage:[],departureCity:[],price:{min:null,max:null},regions:[]},ie={"filter-destination":"destination","filter-days":"days","filter-date":"date","filter-guests":"guests"};if(window.location.pathname.endsWith("searchPage.html"))if([...new URLSearchParams(window.localStorage.search).keys()].length)me();else{const t=localStorage.getItem("filtersState");t&&Object.assign(a,JSON.parse(t)),w(a)}else localStorage.removeItem("filtersState"),window.history.replaceState({},"",window.location.pathname);if(L){let e=function(l=null){i.forEach(o=>{o!==l&&o.classList.remove("is-open")})};const t=L.querySelector(".filter__section-form-date__trigger-input"),n=L.querySelector(".filter__section-form-date__trigger"),s=L.querySelector(".filter__section-form-date__trigger-value");if(t||n||s){if(a.date){const o=new Date(a.date),c=o.getDate(),u=o.getFullYear(),p=o.toLocaleString("ru-RU",{month:"long"});s.textContent=`${c} ${p} ${u}`}const l=V(t,{locale:z.Russian,minDate:"today",dateFormat:"Y-m-d",allowInput:!1,onChange(o){if(!o.length)return;const c=o[0],u=c.getDate(),p=c.getFullYear(),f=c.toLocaleString("ru-RU",{month:"long"});s.textContent=`${u} ${f} ${p}`;const g=c.getFullYear(),m=String(c.getMonth()+1).padStart(2,"0"),d=String(c.getDate()).padStart(2,"0");a.date=`${g}-${m}-${d}`,w(a),S()}});n.addEventListener("click",()=>{l.open()})}const i=L.querySelectorAll(".filter__section-form-item-variant:not(.filter__section-form-guests-variant)");i.forEach(l=>{const c=l.closest(".filter__section-form-item").dataset.name,u=ie[c],p=l.querySelector(".filter__section-form-item-variant__trigger"),f=l.querySelector(".filter__section-form-item-variant__dropdown"),g=p.querySelector("span");if(!(!f||!p||!g)){if(a[u]&&typeof a[u]=="string"){const m=Array.from(f.querySelectorAll("li")).find(d=>(d.dataset.value??d.getAttribute("value"))===a[u]);m&&(g.textContent=m.textContent)}p.addEventListener("click",m=>{m.stopPropagation(),e(l),l.classList.toggle("is-open")}),f.querySelectorAll("li").forEach(m=>{m.addEventListener("click",()=>{const d=m.dataset.value??m.getAttribute("value")??"";g.textContent=m.textContent,a[u]=d||null,w(a),S(),u==="destination"&&(a.regions=[],P&&P(d)),l.classList.remove("is-open")})})}}),document.addEventListener("click",()=>e());const r=L.querySelector(".filter__section-form-guests-variant");if(r){let l=function(){const d=+p.value||0,_=+f.value||0;if(!d&&!_){u.textContent="Любое к-ство";return}const h=[];d&&h.push(`Взрослых: ${d}`),_&&h.push(`детей: ${_}`),u.textContent=h.join("; "),a.guests.adults=d,a.guests.children=_,w(a),S()};const o=r.querySelector(".filter__section-form-guests-variant__trigger"),c=r.querySelector(".filter__section-form-guests-variant__dropdown"),u=o.querySelector("span"),p=c.querySelector("input[name='filter-adults']"),f=c.querySelector("input[name='filter-children']");if(a.guests.adults||a.guests.children){const d=[];a.guests.adults&&d.push(`Взрослых: ${a.guests.adults}`),a.guests.children&&d.push(`детей: ${a.guests.children}`),u.textContent=d.join("; ")}const g=c.querySelector("li"),m=c.querySelectorAll("li > div");o.addEventListener("click",d=>{d.stopPropagation(),e(),r.classList.toggle("is-open")}),c.addEventListener("click",d=>d.stopPropagation()),g.addEventListener("click",()=>{p.value="",f.value="",u.textContent="Любое к-ство",a.guests.adults=null,a.guests.children=null,w(a),S(),r.classList.remove("is-open")}),p.addEventListener("input",l),f.addEventListener("input",l),m.forEach(d=>{d.addEventListener("click",_=>{_.target.tagName!=="INPUT"&&r.classList.remove("is-open")})})}}const T=document.querySelector(".button-form-search-link");T&&T.addEventListener("click",async e=>{if(e.preventDefault(),S(),!window.location.pathname.endsWith("searchPage.html")){const r="/ClubTravel/";window.location.href=`${r}html/pages/searchPage.html`;return}const s=(await re()).data,i=oe(s,a);w(a),console.log(i)});function oe(e,t){return e.filter(n=>{if(t.destination&&n.tour?.destination!==t.destination||t.days!==null&&n.tour_option?.days!==Number(t.days))return!1;if(t.date){const i=new Date(t.date),r=new Date(n.tour_option?.startDate),l=new Date(n.tour_option?.endDate);if(i<r||i>l)return!1}return!(t.guests.adults!==null&&n.tour_option?.adults<t.guests.adults||t.guests.children!==null&&n.tour_option?.children<t.guests.children||(t.meals.length||t.tourPackage.length||t.price.min!==null||t.price.max!==null)&&!n.hotel_options?.some(r=>!(t.meals.length&&!t.meals.includes(r.meals)||t.tourPackage.length&&!t.tourPackage.includes(r.tourPackage)||t.price.min!==null&&r.price<t.price.min||t.price.max!==null&&r.price>t.price.max))||t.category.length&&!t.category.includes(n.category)||t.departureCity.length&&!t.departureCity.includes(n.tour_option?.departureCity)||t.regions.length&&!t.regions.includes(n.region))})}const x=document.querySelector(".filter__extended-btn"),E=document.querySelector(".filter__extended-info");if(x&&E){x.addEventListener("click",()=>{x.classList.add("filter__extended-is-hidden"),E.classList.remove("filter__extended-is-hidden"),le(),ae(),ce()});const e=E.querySelector(".filter__extended-info-title-close");e&&e.addEventListener("click",()=>{E.classList.add("filter__extended-is-hidden"),x.classList.remove("filter__extended-is-hidden")})}function ae(){const e=document.querySelector(".filter-price-list");if(e){let t=function(){const h=d(g),$=d(m);l.style.left=`${h}%`,o.style.left=`${$}%`,r.style.left=`${h}%`,r.style.right=`${100-$}%`,c.textContent=`${g}€`,u.textContent=`${m}€`},n=function(h,$){const k=i.getBoundingClientRect(),F=R=>{let C=(R.clientX-k.left)/k.width*100;C=Math.max(0,Math.min(100,C));const H=_(C);$?g=Math.min(H,m):m=Math.max(H,g),t(),s()},D=()=>{document.removeEventListener("mousemove",F),document.removeEventListener("mouseup",D)};document.addEventListener("mousemove",F),document.addEventListener("mouseup",D)},s=function(){g===p&&m===f?(a.price.min=null,a.price.max=null):(a.price.min=g,a.price.max=m),w(a),S()};const i=e.querySelector(".filter-price-slider"),r=e.querySelector(".filter-price-range"),l=e.querySelector(".filter-price-thumb.left"),o=e.querySelector(".filter-price-thumb.right"),c=e.querySelector("#minPrice"),u=e.querySelector("#maxPrice"),p=200,f=3e3;let g=200,m=3e3;a.price.min!==null&&(g=a.price.min),a.price.max!==null&&(m=a.price.max);const d=h=>(h-p)/(f-p)*100,_=h=>Math.round(p+h/100*(f-p));l.addEventListener("mousedown",h=>n(h,!0)),o.addEventListener("mousedown",h=>n(h,!1)),t()}}let P=null;function ce(){const e=document.querySelector('[data-extended="regions"]');if(!e)return;const t=e.querySelector(".filter__extended-info-list-column-list"),n=e.querySelector(".filter__extended-info-list-column-hint");let s=[];P=async function(i){if(t.innerHTML="",O(),!i){n.classList.remove("is-hidden"),n.textContent="Выберите сначала направление";return}s.length||(s=await ne());const r=s.find(c=>c.destination===i);n.classList.add("is-hidden");const l=r.regions.map(c=>`
  <li class="filter__extended-info-list-column-list-item" data-value="${c}">
    <svg class="filter__extended-info-list-column-list-item-check">
      <use href="${v}#icon-check-circle"></use>
    </svg>
    ${c}
  </li>
`).join("");t.innerHTML=l;const o=a.regions||[];t.querySelectorAll(".filter__extended-info-list-column-list-item").forEach(c=>{o.includes(c.dataset.value)&&c.classList.add("is-active")})},P(a.destination)}function le(){document.querySelectorAll(".filter__extended-categoties").forEach(t=>{const n=t.dataset.extended,s=t.querySelector(".filter__extended-info-list-column-list");if(!s)return;const i=a[n]||[];s.querySelectorAll(".filter__extended-info-list-column-list-item").forEach(r=>{i.includes(r.dataset.value)&&r.classList.add("is-active")}),s.addEventListener("click",r=>{const l=r.target.closest(".filter__extended-info-list-column-list-item");if(!l)return;const o=l.dataset.value;if(!o)return;const c=a[n];c.includes(o)?(a[n]=c.filter(u=>u!==o),l.classList.remove("is-active")):(a[n].push(o),l.classList.add("is-active")),w(a),S(),O()})})}const q=document.querySelector(".filter__extended-info-active-filter"),de=["category","meals","tourPackage","departureCity","regions"],ue={category:"Категория размещения",meals:"Питание",tourPackage:"Состав тура",departureCity:"Вылет из",regions:"Регионы"},I={category:{Budget:"2 звезды",Economy:"3 звезды",Standard:"4 звезды",Comfort:"5 звезд",Apartments:"Апартаменты"},meals:{no_meals:"Без питания",breakfast:"Завтрак",breakfast_dinner:"Затрак и ужин",full_board:"Завтрак, обед, ужин",all_inclusive:"Всё включено",ultra_all_inclusive:"Ультра: всё включено"},tourPackage:{package:"Туристический пакет",flight_only:"Только перелет"},departureCity:{tallinn:"Таллин",riga:"Рига",vilnius:"Вильнюс"},regions:{}};function O(){if(!q)return;q.innerHTML="";const e=de.map(t=>{const n=a[t];return!Array.isArray(n)||n.length===0?"":(n.map(s=>`<li>${I[t]?.[s]||s}</li>`).join(""),`
        <div class="filter__extended-info-active-filter-item">
          <span class="filter__extended-info-active-filter-item-title">
            ${ue[t]}:
          </span>
          <ul class="filter__extended-info-active-filter-item-values">
            ${n.map(s=>`<li>${I[t]?.[s]||s}</li>`).join("")}
          </ul>
        </div>
      `)}).join("");q.innerHTML=e}function w(e){const t=new URLSearchParams;e.destination&&t.set("destination",e.destination),e.days&&t.set("days",e.days),e.date&&t.set("date",e.date),e.guests.adults!==null&&t.set("adults",e.guests.adults),e.guests.children!==null&&t.set("children",e.guests.children),["category","meals","tourPackage","departureCity","regions"].forEach(s=>{e[s].length&&t.set(s,e[s].join(","))}),e.price.min!==null&&t.set("priceMin",e.price.min),e.price.max!==null&&t.set("priceMax",e.price.max);const n=`${window.location.pathname}?${t.toString()}`;window.history.replaceState({},"",n)}function me(){const e=new URLSearchParams(window.location.search);a.destination=e.get("destination")||"",a.days=e.get("days"),a.date=e.get("date"),a.guests.adults=e.get("adults")?Number(e.get("adults")):null,a.guests.children=e.get("children")?Number(e.get("children")):null,["category","meals","tourPackage","departureCity","regions"].forEach(t=>{const n=e.get(t);a[t]=n?n.split(","):[]}),a.price.min=e.get("priceMin")?Number(e.get("priceMin")):null,a.price.max=e.get("priceMax")?Number(e.get("priceMax")):null}function S(){localStorage.setItem("filtersState",JSON.stringify(a))}async function j(){const{data:e}=await y.get("/news-homes",{params:{populate:{images:!0},sort:["publishedAt:desc"]}});return e.data}function pe(e){const t=document.querySelector(".news-page__slider-wrapper");t&&(t.innerHTML="",e.forEach(n=>{const{title:s,price:i,date:r,images:l}=n,o=l?.url??"",c=document.createElement("div");c.className="news-home__card",c.innerHTML=`
      <div class="news-home__image">
        <img src="${o}" alt="${s}" />

        ${i?`<p class="news-home__price">от <span>${i}</span></p>`:""}

        ${r?`
            <div class="news-home__date-wrapper">
              <svg width="16" height="16">
                <use href="${v}#icon-clock"></use>
              </svg>
              <p>${ge(r)}</p>
            </div>
            `:""}
      </div>

      <div class="news-home__content">
        <p class="news-home__title-card">${s}</p>
      </div>
    `,t.appendChild(c)}))}function ge(e){return new Date(e).toLocaleDateString("ru-RU",{day:"numeric",month:"long",year:"numeric"})}document.addEventListener("DOMContentLoaded",async()=>{const e=await j();pe(e)});M.use([J]);function fe(){document.querySelectorAll("[data-swiper]").forEach(e=>{if(e.swiper)return;const t=e.closest(".news-home__slider-wrapper");if(!t)return;const n=t.querySelector(".news-home__button-prev"),s=t.querySelector(".news-home__button-next");new M(e,{slidesPerView:1,spaceBetween:16,speed:600,navigation:{prevEl:n,nextEl:s},breakpoints:{768:{slidesPerView:2,spaceBetween:20},1024:{slidesPerView:3,spaceBetween:27}}})})}function he(){const e=document.querySelector(".news-home__slider-wrapper");if(!e)return null;const t=e.querySelector(".news-home__button-prev"),n=e.querySelector(".news-home__button-next");if(!t||!n)return null;const s=document.createElement("div");return s.className="swiper news-home__swiper",s.setAttribute("data-swiper",""),s.innerHTML=`
    <div class="swiper-wrapper"></div>
  `,e.insertBefore(s,n),s.querySelector(".swiper-wrapper")}function _e(e){const t=he();t&&e.forEach(n=>{const{title:s,price:i,date:r,images:l}=n,o=l?.url,c=document.createElement("div");c.className="swiper-slide",c.innerHTML=`
      <div class="news-home__card">
        <div class="news-home__image">
          <img src="${o}" alt="${s}" />

          ${i?`<p class="news-home__price">от <span>${i}</span></p>`:""}

          ${r?`
              <div class="news-home__date-wrapper">
                <svg width="16" height="16">
                  <use href="${v}#icon-clock"></use>
                </svg>
                <p>${ve(r)}</p>
              </div>
              `:""}
        </div>

        <div class="news-home__content">
          <p class="news-home__title-card">${s}</p>
        </div>
      </div>
    `,t.appendChild(c)})}function ve(e){return new Date(e).toLocaleDateString("ru-RU",{day:"numeric",month:"long",year:"numeric"})}document.addEventListener("DOMContentLoaded",async()=>{const e=await j();_e(e),fe()});const B=document.querySelector(".hothome__slider-swiper .swiper-wrapper");if(B){let t=function(o){return o?new Date(o).toLocaleDateString("ru-RU",{day:"numeric",month:"long",year:"numeric"}):""},n=function(o=[]){return o.length?Math.min(...o.map(c=>c.price)):null},s=function(o){return o&&(o.formats?.small?.url||o.formats?.thumbnail?.url||o.url)||"/img/hot/image-one.webp"},i=function(o){if(o==="Apartments")return`
      <p class="filter__extended-info-list-column-list-item-app">
        <svg>
          <use href="${v}#icon-house"></use>
        </svg>
        Апартаменты
      </p>
    `;const u={Budget:2,Economy:3,Standard:4,Comfort:5}[o];return u?`
    <div class="filter__extended-info-list-column-list-item-stars">
      ${Array.from({length:u}).map(()=>`
          <svg class="filter__extended-info-list-column-list-item-stars-star">
            <use href="${v}#icon-star"></use>
          </svg>
          `).join("")}
    </div>
  `:""};const r=(await se()).map(o=>{const c=o.nameHotel,u=o.region,p=o.tour?.destination,f=t(o.tour_option?.startDate),g=n(o.hotel_options),m=Math.round(g-g*(30/100)),d=i(o.category);return`
        <div class="hothome__slider-swiper-item swiper-slide">
          <div class="hothome__slider-swiper-item-one">
            <img src="${s(o.image)}" alt="${c}" />
            <div class="hothome__slider-swiper-item-one-list">
            <div
              class="hothome__slider-swiper-item-one-list-item hothome__slider-swiper-item-one-list-date"
            >
              <svg>
                <use href="${v}#icon-clock"></use>
              </svg>
              <p>${f}</p>
            </div>
            <div
              class="hothome__slider-swiper-item-one-list-item hothome__slider-swiper-item-one-list-place"
            >
              <svg>
                <use href="${v}#icon-point"></use>
              </svg>
              <p>${p}, ${u}</p>
            </div>
            </div>
          </div>
          <div class="hothome__slider-swiper-item-two">
            <div class="hothome__slider-swiper-item-two-info">
              <p class="hothome__slider-swiper-item-two-info-name">${c}</p>
              <div class="hothome__slider-swiper-item-two-info-categories">${d}</div>
            </div>
            <div class="hothome__slider-swiper-item-two-price">
              <p class="hothome__slider-swiper-item-two-price-new"><span>${m}</span>€/чел</p>
              <span class="hothome__slider-swiper-item-two-price-old">${g}€/чел</span>
            </div>
            <div class="hothome__slider-swiper-item-two-flag">
              <div>
              <svg>
                <use href="${v}#icon-flag"></use>
              </svg>
							<p>-30%</p>
              </div>
            </div>
          </div>
        </div>
				`}).join("");B.innerHTML=r,new M(".hothome__slider-swiper",{direction:"horizontal",keyboard:{enabled:!0,onlyInViewport:!0},modules:[Y,K],resizeObserver:!0,observer:!0,observeParents:!0,navigation:{nextEl:".hothome__slider-buttons-next",prevEl:".hothome__slider-buttons-prev"},loop:!0,breakpoints:{0:{slidesPerView:1,spaceBetween:20},620:{slidesPerView:2,spaceBetween:20},768:{slidesPerView:2,spaceBetween:23},1366:{slidesPerView:3,spaceBetween:26},1440:{slidesPerView:3,spaceBetween:28},1920:{slidesPerView:4,spaceBetween:31}}}).update()}async function we(e,t){return(await y.post("/auth/local/register",{username:e,email:e,password:t})).data}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("registerForm");if(!e)return;const t=new A("#registerForm",{errorFieldCssClass:"is-error",errorLabelCssClass:"login__error",focusInvalidField:!0,lockForm:!0});t.addField('[name="email"]',[{rule:"required",errorMessage:"Введите e-mail"},{rule:"email",errorMessage:"Некорректный e-mail"}]).addField('[name="password"]',[{rule:"required",errorMessage:"Введите пароль"},{rule:"minLength",value:8,errorMessage:"Минимум 8 символов"},{validator:n=>/[A-Za-z]/.test(n)&&/\d/.test(n),errorMessage:"Пароль должен содержать букву и цифру"}]).addField('[name="passwordRepeat"]',[{rule:"required",errorMessage:"Повторите пароль"},{validator:(n,s)=>n===s['[name="password"]'].elem.value,errorMessage:"Пароли не совпадают"}]).onSuccess(async n=>{n.preventDefault();const s=e.email.value.trim(),i=e.password.value;try{const r=await we(s,i);localStorage.setItem("jwt",r.jwt),window.location.replace("/ClubTravel/html/pages/accountPage.html")}catch(r){const l=r.response?.data?.error?.message||"Ошибка регистрации";t.showErrors({'[name="email"]':l})}})});async function ye(e){return(await y.post("/auth/forgot-password",{email:e})).data}const b=document.getElementById("forgotForm");b&&b.addEventListener("submit",async e=>{e.preventDefault();try{await ye(b.email.value),b.reset(),alert("Письмо отправлено")}catch{alert("Ошибка")}});
