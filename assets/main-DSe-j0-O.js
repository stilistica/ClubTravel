import{a as A,f as H,r as j,S as I,N}from"./vendor-CYiRW1wK.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".open-menu"),t=document.querySelector(".mob-menu");!e||!t||(e.addEventListener("click",()=>{t.classList.toggle("is-open")}),t.addEventListener("click",n=>{n.target===t&&t.classList.remove("is-open")}))});const L=A.create({baseURL:"https://thankful-garden-94c969a4ca.strapiapp.com/api",headers:{"Content-Type":"application/json"}});async function F(e,t){return(await L.post("/auth/local",{identifier:e,password:t})).data}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("loginForm");e&&e.addEventListener("submit",async t=>{t.preventDefault();const n=e.email.value.trim(),r=e.password.value;if(!n||!r){alert("Введите email и пароль");return}try{const o=await F(n,r);localStorage.setItem("jwt",o.jwt),window.location.replace("/ClubTravel/html/pages/accountPage.html")}catch(o){const s=o.response?.data?.error?.message||"Неверный email или пароль";alert(s)}})});function R(){const e=localStorage.getItem("jwt");return typeof e=="string"&&e.length>0}document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".header__top-bar-profile-link");e&&(e.href=R()?"/ClubTravel/html/pages/accountPage.html":"/ClubTravel/html/pages/loginPage.html")});async function U({page:e=1,pageSize:t=5}){const n=localStorage.getItem("jwt");if(!n)throw new Error("Нет JWT");return(await L.get("/orders",{headers:{Authorization:`Bearer ${n}`},params:{populate:"user",pagination:{page:e,pageSize:t},sort:"createdAt:desc"}})).data}const V=5;function B(e){if(!e)return"—";const t=new Date(e),n=t.getDate(),r=t.getFullYear(),o=t.toLocaleString("ru-RU",{month:"long"}),s=String(t.getHours()).padStart(2,"0"),a=String(t.getMinutes()).padStart(2,"0");return`${n} ${o} ${r} ${s}:${a}`}function z(e){const t=e.charter==="Оплачено"?"order-status--paid":"order-status--processing";return`
    <tr>
      <td>${e.orderNumber}</td>
      <td>${e.totalPrice.toFixed(2)}</td>
      <td>${e.user?.email??"—"}</td>
      <td>
        <span class="order-status ${t}">
          ${e.charter}
        </span>
      </td>
      <td>${B(e.date)}</td>
    </tr>
  `}function W(e){const t=e.charter==="Оплачено"?"order-status--paid":"order-status--processing";return`
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
      <div>Дата<span>${B(e.date)}</span></div>
    </div>
  `}function Y(e,t,n){const r=document.getElementById("ordersPagination");if(!r)return;const{page:o,pageCount:s,total:a}=e.pagination;r.innerHTML=`
      <p class="account__pagination-info">
        Показано ${t} из ${a}
      </p>
     <div class="account__pagination-btns-wrapper">
      <button
        class="account__pagination-btn"
        ${o===1?"disabled":""}
        data-action="prev"
      >
        Назад
      </button>

      <div class="account__pagination-page">
      <p class="account__pagination-text">Страница</p>
      <p class="account__pagination-current">${o}</p>
      <p class="account__pagination-text">из ${s}</p>
      </div>

      <button
        class="account__pagination-btn"
        ${o===s?"disabled":""}
        data-action="next"
      >
        Вперёд
      </button>
      </div>
  `,r.onclick=i=>{const l=i.target.dataset.action;l&&(l==="prev"&&o>1&&n(o-1),l==="next"&&o<s&&n(o+1))}}document.addEventListener("DOMContentLoaded",async()=>{const e=document.getElementById("ordersList"),t=document.getElementById("ordersPagination");if(!e||!t)return;let n=1;async function r(o){try{const{data:s,meta:a}=await U({page:o,pageSize:V});if(!s.length){e.innerHTML='<tr><td colspan="5">Заказов нет</td></tr>',t.innerHTML="";return}e.innerHTML=s.map(z).join("");const i=document.getElementById("ordersCards");i&&(i.innerHTML=s.map(W).join("")),Y(a,s.length,l=>{n=l,r(n)})}catch(s){console.error("Ошибка загрузки заказов:",s),e.innerHTML='<tr><td colspan="5">Ошибка загрузки заказов</td></tr>'}}r(n)});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".account__btn-exit");e&&e.addEventListener("click",()=>{localStorage.removeItem("jwt"),localStorage.removeItem("user"),window.location.replace("/ClubTravel/html/pages/loginPage.html")})});async function G(){const{data:e}=await L.get("/tours");return e.data}const K="/ClubTravel/assets/sprite-xjNdH9vZ.svg",w=document.querySelector(".filter"),d={destination:"",days:null,date:null,guests:{adults:null,children:null},category:[],meals:[],tourPackage:[],departureCity:[],price:{min:null,max:null},regions:[]},Z={"filter-destination":"destination","filter-days":"days","filter-date":"date","filter-guests":"guests"};if(w){let e=function(i=null){s.forEach(l=>{l!==i&&l.classList.remove("is-open")})};const t=w.querySelector(".filter__section-form-date__trigger-input"),n=w.querySelector(".filter__section-form-date__trigger"),r=w.querySelector(".filter__section-form-date__trigger-value"),o=H(t,{locale:j.Russian,minDate:"today",dateFormat:"Y-m-d",allowInput:!1,onChange(i){if(!i.length)return;const l=i[0],f=l.getDate(),u=l.getFullYear(),g=l.toLocaleString("ru-RU",{month:"long"});r.textContent=`${f} ${g} ${u}`,d.date=l.toISOString().split("T")[0]}});n.addEventListener("click",()=>{o.open()});const s=w.querySelectorAll(".filter__section-form-item-variant:not(.filter__section-form-guests-variant)");s.forEach(i=>{const f=i.closest(".filter__section-form-item").dataset.name,u=Z[f],g=i.querySelector(".filter__section-form-item-variant__trigger"),p=i.querySelector(".filter__section-form-item-variant__dropdown"),m=g.querySelector("span"),h=i.querySelector("input[type='hidden']");!p||!g||!m||!h||(g.addEventListener("click",_=>{_.stopPropagation(),e(i),i.classList.toggle("is-open")}),p.querySelectorAll("li").forEach(_=>{_.addEventListener("click",()=>{const c=_.dataset.value??_.getAttribute("value")??"";m.textContent=_.textContent,h.value=c,d[u]=c||null,u==="destination"&&(d.regions=[],$&&$(c)),i.classList.remove("is-open")})}))}),document.addEventListener("click",()=>e());const a=w.querySelector(".filter__section-form-guests-variant");if(a){let i=function(){const c=+p.value||0,v=+m.value||0;if(!c&&!v){u.textContent="Любое к-ство",g.value="";return}const y=[];c&&y.push(`Взрослых: ${c}`),v&&y.push(`детей: ${v}`),u.textContent=y.join("; "),d.guests.adults=c,d.guests.children=v};const l=a.querySelector(".filter__section-form-guests-variant__trigger"),f=a.querySelector(".filter__section-form-guests-variant__dropdown"),u=l.querySelector("span"),g=a.querySelector("input[name='filter-guests']"),p=f.querySelector("input[name='filter-adults']"),m=f.querySelector("input[name='filter-children']"),h=f.querySelector("li"),_=f.querySelectorAll("li > div");l.addEventListener("click",c=>{c.stopPropagation(),e(),a.classList.toggle("is-open")}),f.addEventListener("click",c=>c.stopPropagation()),h.addEventListener("click",()=>{p.value="",m.value="",u.textContent="Любое к-ство",d.guests.adults=null,d.guests.children=null,a.classList.remove("is-open")}),p.addEventListener("input",i),m.addEventListener("input",i),_.forEach(c=>{c.addEventListener("click",v=>{v.target.tagName!=="INPUT"&&a.classList.remove("is-open")})})}}const M=document.querySelector(".button-form-search-link");M&&M.addEventListener("click",e=>{if(e.preventDefault(),window.location.pathname.endsWith("searchPage.html"))console.log(d);else{const n="/ClubTravel/";window.location.href=`${n}html/pages/searchPage.html`}});const S=document.querySelector(".filter__extended-btn"),E=document.querySelector(".filter__extended-info");if(S&&E){S.addEventListener("click",()=>{S.classList.add("filter__extended-is-hidden"),E.classList.remove("filter__extended-is-hidden"),Q(),J(),X()});const e=E.querySelector(".filter__extended-info-title-close");e&&e.addEventListener("click",()=>{E.classList.add("filter__extended-is-hidden"),S.classList.remove("filter__extended-is-hidden")})}function J(){const e=document.querySelector(".filter-price-list");if(e){let t=function(){const c=h(p),v=h(m);a.style.left=`${c}%`,i.style.left=`${v}%`,s.style.left=`${c}%`,s.style.right=`${100-v}%`,l.textContent=`${p}€`,f.textContent=`${m}€`},n=function(c,v){const y=o.getBoundingClientRect(),P=O=>{let b=(O.clientX-y.left)/y.width*100;b=Math.max(0,Math.min(100,b));const T=_(b);v?p=Math.min(T,m):m=Math.max(T,p),t(),r()},C=()=>{document.removeEventListener("mousemove",P),document.removeEventListener("mouseup",C)};document.addEventListener("mousemove",P),document.addEventListener("mouseup",C)},r=function(){p===u&&m===g?(d.price.min=null,d.price.max=null):(d.price.min=p,d.price.max=m)};const o=e.querySelector(".filter-price-slider"),s=e.querySelector(".filter-price-range"),a=e.querySelector(".filter-price-thumb.left"),i=e.querySelector(".filter-price-thumb.right"),l=e.querySelector("#minPrice"),f=e.querySelector("#maxPrice"),u=200,g=3e3;let p=200,m=3e3;const h=c=>(c-u)/(g-u)*100,_=c=>Math.round(u+c/100*(g-u));a.addEventListener("mousedown",c=>n(c,!0)),i.addEventListener("mousedown",c=>n(c,!1)),t()}}let $=null;function X(){const e=document.querySelector('[data-extended="regions"]');if(!e)return;const t=e.querySelector(".filter__extended-info-list-column-list"),n=e.querySelector(".filter__extended-info-list-column-hint");let r=[];$=async function(o){if(t.innerHTML="",D(),!o){n.classList.remove("is-hidden"),n.textContent="Выберите сначала направление";return}r.length||(r=await G());const s=r.find(i=>i.destination===o);n.classList.add("is-hidden");const a=s.regions.map(i=>`
  <li class="filter__extended-info-list-column-list-item" data-value="${i}">
    <svg class="filter__extended-info-list-column-list-item-check">
      <use href="${K}#icon-check-circle"></use>
    </svg>
    ${i}
  </li>
`).join("");t.innerHTML=a},$(d.destination)}function Q(){document.querySelectorAll(".filter__extended-categoties").forEach(t=>{const n=t.dataset.extended,r=t.querySelector(".filter__extended-info-list-column-list");r&&r.addEventListener("click",o=>{const s=o.target.closest(".filter__extended-info-list-column-list-item");if(!s)return;const a=s.dataset.value;if(!a)return;const i=d[n];i.includes(a)?(d[n]=i.filter(l=>l!==a),s.classList.remove("is-active")):(d[n].push(a),s.classList.add("is-active")),D()})})}const q=document.querySelector(".filter__extended-info-active-filter"),ee=["category","meals","tourPackage","departureCity","regions"],te={category:"Категория размещения",meals:"Питание",tourPackage:"Состав тура",departureCity:"Вылет из",regions:"Регионы"},k={category:{Budget:"2 звезды",Economy:"3 звезды",Standard:"4 звезды",Comfort:"5 звезд",Apartments:"Апартаменты"},meals:{no_meals:"Без питания",breakfast:"Завтрак",breakfast_dinner:"Затрак и ужин",full_board:"Завтрак, обед, ужин",all_inclusive:"Всё включено",ultra_all_inclusive:"Ультра: всё включено"},tourPackage:{package:"Туристический пакет",flight_only:"Только перелет"},departureCity:{tallinn:"Таллин",riga:"Рига",vilnius:"Вильнюс"},regions:{}};function D(){if(!q)return;q.innerHTML="";const e=ee.map(t=>{const n=d[t];return!Array.isArray(n)||n.length===0?"":(n.map(r=>`<li>${k[t]?.[r]||r}</li>`).join(""),`
        <div class="filter__extended-info-active-filter-item">
          <span class="filter__extended-info-active-filter-item-title">
            ${te[t]}:
          </span>
          <ul class="filter__extended-info-active-filter-item-values">
            ${n.map(r=>`<li>${k[t]?.[r]||r}</li>`).join("")}
          </ul>
        </div>
      `)}).join("");q.innerHTML=e}async function ne(){const{data:e}=await L.get("/news-homes",{params:{populate:{images:!0},sort:["publishedAt:desc"]}});return e.data}I.use([N]);function re(){document.querySelectorAll("[data-swiper]").forEach(e=>{if(e.swiper)return;const t=e.closest(".news-home__slider-wrapper");if(!t)return;const n=t.querySelector(".news-home__button-prev"),r=t.querySelector(".news-home__button-next");new I(e,{slidesPerView:1,spaceBetween:16,speed:600,navigation:{prevEl:n,nextEl:r},breakpoints:{768:{slidesPerView:2,spaceBetween:20},1024:{slidesPerView:3,spaceBetween:27}}})})}function se(){const e=document.querySelector(".news-home__slider-wrapper");if(!e)return null;const t=e.querySelector(".news-home__button-prev"),n=e.querySelector(".news-home__button-next");if(!t||!n)return null;const r=document.createElement("div");return r.className="swiper news-home__swiper",r.setAttribute("data-swiper",""),r.innerHTML=`
    <div class="swiper-wrapper"></div>
  `,e.insertBefore(r,n),r.querySelector(".swiper-wrapper")}function oe(e){const t=se();t&&e.forEach(n=>{const{title:r,price:o,date:s,images:a}=n,i=a?.url?`http://localhost:1337${a.url}`:"",l=document.createElement("div");l.className="swiper-slide",l.innerHTML=`
      <div class="news-home__card">
        <div class="news-home__image">
          <img src="${i}" alt="${r}" />

          ${o?`<p class="news-home__price">от <span>${o}</span></p>`:""}

          ${s?`
              <div class="news-home__date-wrapper">
                <svg width="16" height="16">
                  <use href="./img/sprite.svg#icon-clock"></use>
                </svg>
                <p>${ie(s)}</p>
              </div>
              `:""}
        </div>

        <div class="news-home__content">
          <p class="news-home__title-card">${r}</p>
        </div>
      </div>
    `,t.appendChild(l)})}function ie(e){return new Date(e).toLocaleDateString("ru-RU",{day:"numeric",month:"long",year:"numeric"})}document.addEventListener("DOMContentLoaded",async()=>{const e=await ne();oe(e),re()});async function ae(e,t){return(await L.post("/auth/local/register",{username:e,email:e,password:t})).data}function ce(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}function le(e){return e.length>=8&&/[A-Za-z]/.test(e)&&/\d/.test(e)}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("registerForm");e&&e.addEventListener("submit",async t=>{t.preventDefault();const n=e.email.value.trim(),r=e.password.value,o=e.passwordRepeat.value;if(!n){alert("Введите email");return}if(!ce(n)){alert("Некорректный email");return}if(!r){alert("Введите пароль");return}if(!le(r)){alert("Пароль должен быть минимум 8 символов и содержать букву и цифру");return}if(r!==o){alert("Пароли не совпадают");return}try{const s=await ae(n,r);localStorage.setItem("jwt",s.jwt),window.location.replace("/ClubTravel/html/pages/accountPage.html")}catch(s){const a=s.response?.data?.error?.message||"Ошибка регистрации";alert(a)}})});async function de(e){return(await L.post("/auth/forgot-password",{email:e})).data}const x=document.getElementById("forgotForm");x&&x.addEventListener("submit",async e=>{e.preventDefault();try{await de(x.email.value),x.reset(),alert("Письмо отправлено")}catch{alert("Ошибка")}});
