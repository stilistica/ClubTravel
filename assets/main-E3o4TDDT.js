import{a as Z,J as R,f as X,r as Q,S as q,N as j,P as N,K as U}from"./vendor-Dr0TTguT.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".open-menu"),t=document.querySelector(".mob-menu");!e||!t||(e.addEventListener("click",()=>{t.classList.toggle("is-open")}),t.addEventListener("click",n=>{n.target===t&&t.classList.remove("is-open")}))});const _=Z.create({baseURL:"http://localhost:1337/api",headers:{"Content-Type":"application/json"}});async function ee(e,t){return(await _.post("/auth/local",{identifier:e,password:t})).data}function te(){const e=localStorage.getItem("jwt");return typeof e=="string"&&e.length>0}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("loginForm");if(!e)return;const t=new R("#loginForm",{errorFieldCssClass:"is-error",errorLabelCssClass:"login__error",focusInvalidField:!0,lockForm:!0});t.addField('[name="email"]',[{rule:"required",errorMessage:"Введите e-mail"},{rule:"email",errorMessage:"Некорректный e-mail"}]).addField('[name="password"]',[{rule:"required",errorMessage:"Введите пароль"}]).onSuccess(async n=>{n.preventDefault();const s=e.email.value.trim(),i=e.password.value;try{const r=await ee(s,i);localStorage.setItem("jwt",r.jwt),window.location.replace("/ClubTravel/html/pages/accountPage.html")}catch(r){t.showErrors({'[name="password"]':r.message})}})});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".header__top-bar-profile-link");e&&(e.href=te()?"/ClubTravel/html/pages/accountPage.html":"/ClubTravel/html/pages/loginPage.html")});async function ne({page:e=1,pageSize:t=5}){const n=localStorage.getItem("jwt");if(!n)throw new Error("Нет JWT");return(await _.get("/orders",{headers:{Authorization:`Bearer ${n}`},params:{populate:"user",pagination:{page:e,pageSize:t},sort:"createdAt:desc"}})).data}const re=5;function V(e){if(!e)return"—";const t=new Date(e),n=t.getDate(),s=t.getFullYear(),i=t.toLocaleString("ru-RU",{month:"long"}),r=String(t.getHours()).padStart(2,"0"),c=String(t.getMinutes()).padStart(2,"0");return`${n} ${i} ${s} ${r}:${c}`}function se(e){const t=e.charter==="Оплачено"?"order-status--paid":"order-status--processing";return`
    <tr>
      <td>${e.orderNumber}</td>
      <td>${e.totalPrice.toFixed(2)}</td>
      <td>${e.user?.email??"—"}</td>
      <td>
        <span class="order-status ${t}">
          ${e.charter}
        </span>
      </td>
      <td>${V(e.date)}</td>
    </tr>
  `}function ie(e){const t=e.charter==="Оплачено"?"order-status--paid":"order-status--processing";return`
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
      <div>Дата<span>${V(e.date)}</span></div>
    </div>
  `}function oe(e,t,n){const s=document.getElementById("ordersPagination");if(!s)return;const{page:i,pageCount:r,total:c}=e.pagination;s.innerHTML=`
      <p class="account__pagination-info">
        Показано ${t} из ${c}
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
  `,s.onclick=o=>{const l=o.target.dataset.action;l&&(l==="prev"&&i>1&&n(i-1),l==="next"&&i<r&&n(i+1))}}document.addEventListener("DOMContentLoaded",async()=>{const e=document.getElementById("ordersList"),t=document.getElementById("ordersPagination");if(!e||!t)return;let n=1;async function s(i){try{const{data:r,meta:c}=await ne({page:i,pageSize:re});if(!r.length){e.innerHTML='<tr><td colspan="5">Заказов нет</td></tr>',t.innerHTML="";return}e.innerHTML=r.map(se).join("");const o=document.getElementById("ordersCards");o&&(o.innerHTML=r.map(ie).join("")),oe(c,r.length,l=>{n=l,s(n)})}catch(r){console.error("Ошибка загрузки заказов:",r),e.innerHTML='<tr><td colspan="5">Ошибка загрузки заказов</td></tr>'}}s(n)});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".account__btn-exit");e&&e.addEventListener("click",()=>{localStorage.removeItem("jwt"),localStorage.removeItem("user"),window.location.replace("/ClubTravel/html/pages/loginPage.html")})});async function ae(){const{data:e}=await _.get("/tours");return e.data}async function ce(){const{data:e}=await _.get("/hotels?populate=*");return e}async function le(){const{data:e}=await _.get("/hotels?populate=*&filters[tour_option][hotOffer][$eq]=true");return e.data}async function de(e){const{data:t}=await _.get("/hotels",{params:{populate:{image:!0,tour:!0,hotel_options:!0,tour_option:{populate:["imageTour"]}},filters:{tour_option:{season:{$eq:e}}}}});return t.data}const w="/ClubTravel/assets/sprite-xjNdH9vZ.svg",$=document.querySelector(".filter"),a={destination:"",days:null,date:null,guests:{adults:null,children:null},category:[],meals:[],tourPackage:[],departureCity:[],price:{min:null,max:null},regions:[]},ue={"filter-destination":"destination","filter-days":"days","filter-date":"date","filter-guests":"guests"};if(window.location.pathname.endsWith("searchPage.html"))if([...new URLSearchParams(window.localStorage.search).keys()].length)we();else{const t=localStorage.getItem("filtersState");t&&Object.assign(a,JSON.parse(t)),y(a)}else localStorage.removeItem("filtersState"),window.history.replaceState({},"",window.location.pathname);if($){let e=function(c=null){i.forEach(o=>{o!==c&&o.classList.remove("is-open")})};const t=$.querySelector(".filter__section-form-date__trigger-input"),n=$.querySelector(".filter__section-form-date__trigger"),s=$.querySelector(".filter__section-form-date__trigger-value");if(t||n||s){if(a.date){const o=new Date(a.date),l=o.getDate(),d=o.getFullYear(),m=o.toLocaleString("ru-RU",{month:"long"});s.textContent=`${l} ${m} ${d}`}const c=X(t,{locale:Q.Russian,minDate:"today",dateFormat:"Y-m-d",allowInput:!1,onChange(o){if(!o.length)return;const l=o[0],d=l.getDate(),m=l.getFullYear(),f=l.toLocaleString("ru-RU",{month:"long"});s.textContent=`${d} ${f} ${m}`;const g=l.getFullYear(),p=String(l.getMonth()+1).padStart(2,"0"),u=String(l.getDate()).padStart(2,"0");a.date=`${g}-${p}-${u}`,y(a),S()}});n.addEventListener("click",()=>{c.open()})}const i=$.querySelectorAll(".filter__section-form-item-variant:not(.filter__section-form-guests-variant)");i.forEach(c=>{const l=c.closest(".filter__section-form-item").dataset.name,d=ue[l],m=c.querySelector(".filter__section-form-item-variant__trigger"),f=c.querySelector(".filter__section-form-item-variant__dropdown"),g=m.querySelector("span");if(!(!f||!m||!g)){if(a[d]&&typeof a[d]=="string"){const p=Array.from(f.querySelectorAll("li")).find(u=>(u.dataset.value??u.getAttribute("value"))===a[d]);p&&(g.textContent=p.textContent)}m.addEventListener("click",p=>{p.stopPropagation(),e(c),c.classList.toggle("is-open")}),f.querySelectorAll("li").forEach(p=>{p.addEventListener("click",()=>{const u=p.dataset.value??p.getAttribute("value")??"";g.textContent=p.textContent,a[d]=u||null,y(a),S(),d==="destination"&&(a.regions=[],P&&P(u)),c.classList.remove("is-open")})})}}),document.addEventListener("click",()=>e());const r=$.querySelector(".filter__section-form-guests-variant");if(r){let c=function(){const u=+m.value||0,v=+f.value||0;if(!u&&!v){d.textContent="Любое к-ство";return}const h=[];u&&h.push(`Взрослых: ${u}`),v&&h.push(`детей: ${v}`),d.textContent=h.join("; "),a.guests.adults=u,a.guests.children=v,y(a),S()};const o=r.querySelector(".filter__section-form-guests-variant__trigger"),l=r.querySelector(".filter__section-form-guests-variant__dropdown"),d=o.querySelector("span"),m=l.querySelector("input[name='filter-adults']"),f=l.querySelector("input[name='filter-children']");if(a.guests.adults||a.guests.children){const u=[];a.guests.adults&&u.push(`Взрослых: ${a.guests.adults}`),a.guests.children&&u.push(`детей: ${a.guests.children}`),d.textContent=u.join("; ")}const g=l.querySelector("li"),p=l.querySelectorAll("li > div");o.addEventListener("click",u=>{u.stopPropagation(),e(),r.classList.toggle("is-open")}),l.addEventListener("click",u=>u.stopPropagation()),g.addEventListener("click",()=>{m.value="",f.value="",d.textContent="Любое к-ство",a.guests.adults=null,a.guests.children=null,y(a),S(),r.classList.remove("is-open")}),m.addEventListener("input",c),f.addEventListener("input",c),p.forEach(u=>{u.addEventListener("click",v=>{v.target.tagName!=="INPUT"&&r.classList.remove("is-open")})})}}const k=document.querySelector(".button-form-search-link");k&&k.addEventListener("click",async e=>{if(e.preventDefault(),S(),!window.location.pathname.endsWith("searchPage.html")){const r="/ClubTravel/";window.location.href=`${r}html/pages/searchPage.html`;return}const s=(await ce()).data,i=pe(s,a);y(a),console.log(i)});function pe(e,t){return e.filter(n=>{if(t.destination&&n.tour?.destination!==t.destination||t.days!==null&&n.tour_option?.days!==Number(t.days))return!1;if(t.date){const i=new Date(t.date),r=new Date(n.tour_option?.startDate),c=new Date(n.tour_option?.endDate);if(i<r||i>c)return!1}return!(t.guests.adults!==null&&n.tour_option?.adults<t.guests.adults||t.guests.children!==null&&n.tour_option?.children<t.guests.children||(t.meals.length||t.tourPackage.length||t.price.min!==null||t.price.max!==null)&&!n.hotel_options?.some(r=>!(t.meals.length&&!t.meals.includes(r.meals)||t.tourPackage.length&&!t.tourPackage.includes(r.tourPackage)||t.price.min!==null&&r.price<t.price.min||t.price.max!==null&&r.price>t.price.max))||t.category.length&&!t.category.includes(n.category)||t.departureCity.length&&!t.departureCity.includes(n.tour_option?.departureCity)||t.regions.length&&!t.regions.includes(n.region))})}const x=document.querySelector(".filter__extended-btn"),b=document.querySelector(".filter__extended-info");if(x&&b){x.addEventListener("click",()=>{x.classList.add("filter__extended-is-hidden"),b.classList.remove("filter__extended-is-hidden"),fe(),me(),ge()});const e=b.querySelector(".filter__extended-info-title-close");e&&e.addEventListener("click",()=>{b.classList.add("filter__extended-is-hidden"),x.classList.remove("filter__extended-is-hidden")})}function me(){const e=document.querySelector(".filter-price-list");if(e){let t=function(){const h=u(g),L=u(p);c.style.left=`${h}%`,o.style.left=`${L}%`,r.style.left=`${h}%`,r.style.right=`${100-L}%`,l.textContent=`${g}€`,d.textContent=`${p}€`},n=function(h,L){const T=i.getBoundingClientRect(),B=G=>{let C=(G.clientX-T.left)/T.width*100;C=Math.max(0,Math.min(100,C));const H=v(C);L?g=Math.min(H,p):p=Math.max(H,g),t(),s()},D=()=>{document.removeEventListener("mousemove",B),document.removeEventListener("mouseup",D)};document.addEventListener("mousemove",B),document.addEventListener("mouseup",D)},s=function(){g===m&&p===f?(a.price.min=null,a.price.max=null):(a.price.min=g,a.price.max=p),y(a),S()};const i=e.querySelector(".filter-price-slider"),r=e.querySelector(".filter-price-range"),c=e.querySelector(".filter-price-thumb.left"),o=e.querySelector(".filter-price-thumb.right"),l=e.querySelector("#minPrice"),d=e.querySelector("#maxPrice"),m=200,f=3e3;let g=200,p=3e3;a.price.min!==null&&(g=a.price.min),a.price.max!==null&&(p=a.price.max);const u=h=>(h-m)/(f-m)*100,v=h=>Math.round(m+h/100*(f-m));c.addEventListener("mousedown",h=>n(h,!0)),o.addEventListener("mousedown",h=>n(h,!1)),t()}}let P=null;function ge(){const e=document.querySelector('[data-extended="regions"]');if(!e)return;const t=e.querySelector(".filter__extended-info-list-column-list"),n=e.querySelector(".filter__extended-info-list-column-hint");let s=[];P=async function(i){if(t.innerHTML="",z(),!i){n.classList.remove("is-hidden"),n.textContent="Выберите сначала направление";return}s.length||(s=await ae());const r=s.find(l=>l.destination===i);n.classList.add("is-hidden");const c=r.regions.map(l=>`
  <li class="filter__extended-info-list-column-list-item" data-value="${l}">
    <svg class="filter__extended-info-list-column-list-item-check">
      <use href="${w}#icon-check-circle"></use>
    </svg>
    ${l}
  </li>
`).join("");t.innerHTML=c;const o=a.regions||[];t.querySelectorAll(".filter__extended-info-list-column-list-item").forEach(l=>{o.includes(l.dataset.value)&&l.classList.add("is-active")})},P(a.destination)}function fe(){document.querySelectorAll(".filter__extended-categoties").forEach(t=>{const n=t.dataset.extended,s=t.querySelector(".filter__extended-info-list-column-list");if(!s)return;const i=a[n]||[];s.querySelectorAll(".filter__extended-info-list-column-list-item").forEach(r=>{i.includes(r.dataset.value)&&r.classList.add("is-active")}),s.addEventListener("click",r=>{const c=r.target.closest(".filter__extended-info-list-column-list-item");if(!c)return;const o=c.dataset.value;if(!o)return;const l=a[n];l.includes(o)?(a[n]=l.filter(d=>d!==o),c.classList.remove("is-active")):(a[n].push(o),c.classList.add("is-active")),y(a),S(),z()})})}const M=document.querySelector(".filter__extended-info-active-filter"),he=["category","meals","tourPackage","departureCity","regions"],_e={category:"Категория размещения",meals:"Питание",tourPackage:"Состав тура",departureCity:"Вылет из",regions:"Регионы"},F={category:{Budget:"2 звезды",Economy:"3 звезды",Standard:"4 звезды",Comfort:"5 звезд",Apartments:"Апартаменты"},meals:{no_meals:"Без питания",breakfast:"Завтрак",breakfast_dinner:"Затрак и ужин",full_board:"Завтрак, обед, ужин",all_inclusive:"Всё включено",ultra_all_inclusive:"Ультра: всё включено"},tourPackage:{package:"Туристический пакет",flight_only:"Только перелет"},departureCity:{tallinn:"Таллин",riga:"Рига",vilnius:"Вильнюс"},regions:{}};function z(){if(!M)return;M.innerHTML="";const e=he.map(t=>{const n=a[t];return!Array.isArray(n)||n.length===0?"":(n.map(s=>`<li>${F[t]?.[s]||s}</li>`).join(""),`
        <div class="filter__extended-info-active-filter-item">
          <span class="filter__extended-info-active-filter-item-title">
            ${_e[t]}:
          </span>
          <ul class="filter__extended-info-active-filter-item-values">
            ${n.map(s=>`<li>${F[t]?.[s]||s}</li>`).join("")}
          </ul>
        </div>
      `)}).join("");M.innerHTML=e}function y(e){const t=new URLSearchParams;e.destination&&t.set("destination",e.destination),e.days&&t.set("days",e.days),e.date&&t.set("date",e.date),e.guests.adults!==null&&t.set("adults",e.guests.adults),e.guests.children!==null&&t.set("children",e.guests.children),["category","meals","tourPackage","departureCity","regions"].forEach(s=>{e[s].length&&t.set(s,e[s].join(","))}),e.price.min!==null&&t.set("priceMin",e.price.min),e.price.max!==null&&t.set("priceMax",e.price.max);const n=`${window.location.pathname}?${t.toString()}`;window.history.replaceState({},"",n)}function we(){const e=new URLSearchParams(window.location.search);a.destination=e.get("destination")||"",a.days=e.get("days"),a.date=e.get("date"),a.guests.adults=e.get("adults")?Number(e.get("adults")):null,a.guests.children=e.get("children")?Number(e.get("children")):null,["category","meals","tourPackage","departureCity","regions"].forEach(t=>{const n=e.get(t);a[t]=n?n.split(","):[]}),a.price.min=e.get("priceMin")?Number(e.get("priceMin")):null,a.price.max=e.get("priceMax")?Number(e.get("priceMax")):null}function S(){localStorage.setItem("filtersState",JSON.stringify(a))}async function ve({destination:e,season:t,hotOffer:n,page:s=1,pageSize:i=6}={}){const r={"populate[tour_options][populate]":"imageTour","pagination[page]":s,"pagination[pageSize]":i,sort:"id:asc"};e&&e!=="Все страны"&&(r["filters[destination][$eq]"]=e),t&&(r["populate[tour_options][filters][season][$eq]"]=t),n&&(r["populate[tour_options][filters][hotOffer][$eq]"]=!0);const{data:c}=await _.get("/tours",{params:r});return c}function ye(e){return e.data.map(t=>{const n=t.tour_options||[],s=n.length?Math.min(...n.map(r=>r.minPrice)):null,i=n.find(r=>r.imageTour?.url);return{id:t.id,destination:t.destination,region:t.regions?.[0]??"",priceFrom:s,image:i?i.imageTour.url:"/img/no-image.webp",optionsCount:n.length,dates:n.map(r=>({start:r.startDate,end:r.endDate}))}})}const I=document.querySelectorAll(".directions__filters input[type='checkbox']");let J=null;async function W(){try{const e=await ve({destination:J,page:1,pageSize:6}),t=ye(e);Se(t)}catch(e){console.error("Ошибка загрузки туров",e)}}I.forEach(e=>{e.addEventListener("change",()=>{I.forEach(t=>t.checked=!1),e.checked=!0,J=e.value==="Все страны"?null:e.value,W()})});function A(e){return new Date(e).toLocaleDateString("ru-RU",{day:"2-digit",month:"long",year:"numeric"})}function Se(e){const t=document.querySelector(".directions__wrapper");t&&(t.innerHTML=e.map(n=>`
    <article class="directions__tour-card">

      <img width="273" height="160" src="${n.image}" alt="${n.region||n.destination}">

      <div class="directions__tour-card-body">

        <div class="directions__tour-card-head">
          <p class="directions__tour-card-region">${n.region}</p>
          <p class="directions__tour-card-price">
            от <span>${n.priceFrom?.toFixed(2).replace(".",",")}€</span>/ чел
          </p>
        </div>

        <div class="directions__tour-card-sub">
          <p>${n.destination}</p>
          <p>${n.optionsCount} предложений</p>
        </div>

        <div class="directions__tour-card-dates">
        <div class="directions__tour-card-dates-list">
          ${n.dates.slice(0,2).map(s=>`
            <p class="directions__tour-card-date">
              ${A(s.start)} – ${A(s.end)}
            </p>
              
          `).join("")}
            </div>
            <svg width="24" height="24">
                <use href="${w}#icon-calendar"></use>
            </svg>
        </div>
        <div class="directions__btn-wrapper">
        <a href="/ClubTravel/html/pages/hotelPage.html?id=${n.id}"  class="directions__tour-card-btn">
          ВЫБРАТЬ ТУР
        </a>
        </div>
      </div>
    </article>
  `).join(""))}W();async function Y(){const{data:e}=await _.get("/news-homes",{params:{populate:{images:!0},sort:["publishedAt:desc"]}});return e.data}function $e(e){const t=document.querySelector(".news-page__slider-wrapper");if(!t)return;t.innerHTML="";const n=_.defaults.baseURL.replace(/\/api$/,"");e.forEach(s=>{const{title:i,price:r,date:c,images:o}=s,l=o?.url?n+o.url:"",d=document.createElement("div");d.className="news-home__card",d.innerHTML=`
      <div class="news-home__image">
        <img src="${l}" alt="${i}" />

        ${r?`<p class="news-home__price">от <span>${r}</span></p>`:""}

        ${c?`
            <div class="news-home__date-wrapper">
              <svg width="16" height="16">
                <use href="${w}#icon-clock"></use>
              </svg>
              <p>${Le(c)}</p>
            </div>
            `:""}
      </div>

      <div class="news-home__content">
        <p class="news-home__title-card">${i}</p>
      </div>
    `,t.appendChild(d)})}function Le(e){return new Date(e).toLocaleDateString("ru-RU",{day:"numeric",month:"long",year:"numeric"})}document.addEventListener("DOMContentLoaded",async()=>{const e=await Y();$e(e)});q.use([j]);function xe(){document.querySelectorAll("[data-swiper]").forEach(e=>{if(e.swiper)return;const t=e.closest(".news-home__slider-wrapper");if(!t)return;const n=t.querySelector(".news-home__button-prev"),s=t.querySelector(".news-home__button-next");new q(e,{slidesPerView:1,spaceBetween:16,speed:600,navigation:{prevEl:n,nextEl:s},breakpoints:{768:{slidesPerView:2,spaceBetween:20},1024:{slidesPerView:3,spaceBetween:27}}})})}function be(){const e=document.querySelector(".news-home__slider-wrapper");if(!e)return null;const t=e.querySelector(".news-home__button-prev"),n=e.querySelector(".news-home__button-next");if(!t||!n)return null;const s=document.createElement("div");return s.className="swiper news-home__swiper",s.setAttribute("data-swiper",""),s.innerHTML=`
    <div class="swiper-wrapper"></div>
  `,e.insertBefore(s,n),s.querySelector(".swiper-wrapper")}function Ee(e){const t=be();t&&e.forEach(n=>{const{title:s,price:i,date:r,images:c}=n,o=_.defaults.baseURL.replace(/\/api$/,""),l=c?.url?o+c.url:"",d=document.createElement("div");d.className="swiper-slide",d.innerHTML=`
      <div class="news-home__card">
        <div class="news-home__image">
          <img src="${l}" alt="${s}" />

          ${i?`<p class="news-home__price">от <span>${i}</span></p>`:""}

          ${r?`
              <div class="news-home__date-wrapper">
                <svg width="16" height="16">
                  <use href="${w}#icon-clock"></use>
                </svg>
                <p>${Pe(r)}</p>
              </div>
              `:""}
        </div>

        <div class="news-home__content">
          <p class="news-home__title-card">${s}</p>
        </div>
      </div>
    `,t.appendChild(d)})}function Pe(e){return new Date(e).toLocaleDateString("ru-RU",{day:"numeric",month:"long",year:"numeric"})}document.addEventListener("DOMContentLoaded",async()=>{const e=await Y();Ee(e),xe()});const O=document.querySelector(".hothome__slider-swiper .swiper-wrapper");if(O){let t=function(o){return o?new Date(o).toLocaleDateString("ru-RU",{day:"numeric",month:"long",year:"numeric"}):""},n=function(o=[]){return o.length?Math.min(...o.map(l=>l.price)):null},s=function(o){return o&&(o.formats?.small?.url||o.formats?.thumbnail?.url||o.url)||"/img/hot/image-one.webp"},i=function(o){if(o==="Apartments")return`
      <p class="filter__extended-info-list-column-list-item-app">
        <svg>
          <use href="${w}#icon-house"></use>
        </svg>
        Апартаменты
      </p>
    `;const d={Budget:2,Economy:3,Standard:4,Comfort:5}[o];return d?`
    <div class="filter__extended-info-list-column-list-item-stars">
      ${Array.from({length:d}).map(()=>`
          <svg class="filter__extended-info-list-column-list-item-stars-star">
            <use href="${w}#icon-star"></use>
          </svg>
          `).join("")}
    </div>
  `:""};const r=(await le()).map(o=>{const l=o.nameHotel,d=o.region,m=o.tour?.destination,f=t(o.tour_option?.startDate),g=n(o.hotel_options),p=Math.round(g-g*(30/100)),u=i(o.category);return`
        <div class="hothome__slider-swiper-item swiper-slide">
          <div class="hothome__slider-swiper-item-one">
            <img src="${s(o.image)}" alt="${l}" />
            <div class="hothome__slider-swiper-item-one-list">
            <div
              class="hothome__slider-swiper-item-one-list-item hothome__slider-swiper-item-one-list-date"
            >
              <svg>
                <use href="${w}#icon-clock"></use>
              </svg>
              <p>${f}</p>
            </div>
            <div
              class="hothome__slider-swiper-item-one-list-item hothome__slider-swiper-item-one-list-place"
            >
              <svg>
                <use href="${w}#icon-point"></use>
              </svg>
              <p>${m}, ${d}</p>
            </div>
            </div>
          </div>
          <div class="hothome__slider-swiper-item-two">
            <div class="hothome__slider-swiper-item-two-info">
              <p class="hothome__slider-swiper-item-two-info-name">${l}</p>
              <div class="hothome__slider-swiper-item-two-info-categories">${u}</div>
            </div>
            <div class="hothome__slider-swiper-item-two-price">
              <p class="hothome__slider-swiper-item-two-price-new"><span>${p}</span>€/чел</p>
              <span class="hothome__slider-swiper-item-two-price-old">${g}€/чел</span>
            </div>
            <div class="hothome__slider-swiper-item-two-flag">
              <div>
              <svg>
                <use href="${w}#icon-flag"></use>
              </svg>
							<p>-30%</p>
              </div>
            </div>
          </div>
        </div>
				`}).join("");O.innerHTML=r,new q(".hothome__slider-swiper",{direction:"horizontal",keyboard:{enabled:!0,onlyInViewport:!0},modules:[N,U],resizeObserver:!0,observer:!0,observeParents:!0,navigation:{nextEl:".hothome__slider-buttons-next",prevEl:".hothome__slider-buttons-prev"},loop:!0,breakpoints:{0:{slidesPerView:1,spaceBetween:20},620:{slidesPerView:2,spaceBetween:20},768:{slidesPerView:2,spaceBetween:23},1366:{slidesPerView:3,spaceBetween:26},1440:{slidesPerView:3,spaceBetween:28},1920:{slidesPerView:4,spaceBetween:31}}}).update()}const qe=document.querySelector(".winter-homepage-swiper"),Ce=document.querySelector(".summer-homepage-swiper");qe&&K({containerSelector:".winter-homepage-swiper",prevBtn:".winter-homepage-prev",nextBtn:".winter-homepage-next",season:"winter"});Ce&&K({containerSelector:".summer-homepage-swiper",prevBtn:".summer-homepage-prev",nextBtn:".summer-homepage-next",season:"summer"});async function K({containerSelector:e,prevBtn:t,nextBtn:n,season:s}){const i=document.querySelector(`${e} .swiper-wrapper`),r=await de(s);i.innerHTML=r.map(o=>Me(o)).join(""),new q(e,{direction:"horizontal",keyboard:{enabled:!0,onlyInViewport:!0},modules:[N,U,j],resizeObserver:!0,observer:!0,observeParents:!0,navigation:{nextEl:n,prevEl:t},loop:!0,breakpoints:{0:{slidesPerView:1,spaceBetween:20},620:{slidesPerView:2,spaceBetween:20},768:{slidesPerView:3,spaceBetween:20},1366:{slidesPerView:4,spaceBetween:20},1440:{slidesPerView:4,spaceBetween:23},1920:{slidesPerView:5,spaceBetween:30}}}).update()}function Me(e){function t(r){return r.image?.url||r.tour_option?.imageTour?.url||r.tour_option?.imageTour?.formats?.small?.url||r.tour_option?.imageTour?.formats?.thumbnail?.url}const n=e.tour?.destination,s=e.tour_option?.minPrice;return`
        <div class="winter-summer-home__slider-swiper-slide swiper-slide">
          <div class="winter-summer-home__slider-swiper-slide-image">
            <img src="${t(e)}" alt="${n}" />
          </div>
          <div class="winter-summer-home__slider-swiper-slide-info">
            <div class="winter-summer-home__slider-swiper-slide-info-text">
              <p class="winter-summer-home__slider-swiper-slide-info-text-dest">
                <svg>
                  <use href="${w}#icon-point"></use>
                </svg>
                ${n}
              </p>
              <p class="winter-summer-home__slider-swiper-slide-info-text-price">от <span>${s}</span>€/чел</p>
            </div>
						<a
						href="{{link
            'html/pages/searchPage.html'}}"
						class="button-org"
						style="--btn-width: 100%; --btn-height: 42px;"
						>Выбрать тур</a>
          </div>
        </div>
	`}async function Te(e,t){return(await _.post("/auth/local/register",{username:e,email:e,password:t})).data}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("registerForm");if(!e)return;const t=new R("#registerForm",{errorFieldCssClass:"is-error",errorLabelCssClass:"login__error",focusInvalidField:!0,lockForm:!0});t.addField('[name="email"]',[{rule:"required",errorMessage:"Введите e-mail"},{rule:"email",errorMessage:"Некорректный e-mail"}]).addField('[name="password"]',[{rule:"required",errorMessage:"Введите пароль"},{rule:"minLength",value:8,errorMessage:"Минимум 8 символов"},{validator:n=>/[A-Za-z]/.test(n)&&/\d/.test(n),errorMessage:"Пароль должен содержать букву и цифру"}]).addField('[name="passwordRepeat"]',[{rule:"required",errorMessage:"Повторите пароль"},{validator:(n,s)=>n===s['[name="password"]'].elem.value,errorMessage:"Пароли не совпадают"}]).onSuccess(async n=>{n.preventDefault();const s=e.email.value.trim(),i=e.password.value;try{const r=await Te(s,i);localStorage.setItem("jwt",r.jwt),window.location.replace("/ClubTravel/html/pages/accountPage.html")}catch(r){const c=r.response?.data?.error?.message||"Ошибка регистрации";t.showErrors({'[name="email"]':c})}})});async function Be(e){return(await _.post("/auth/forgot-password",{email:e})).data}const E=document.getElementById("forgotForm");E&&E.addEventListener("submit",async e=>{e.preventDefault();try{await Be(E.email.value),E.reset(),alert("Письмо отправлено")}catch{alert("Ошибка")}});
