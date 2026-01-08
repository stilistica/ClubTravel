import{a as oe,J as j,S as H,P as Q,K as T,f as ae,r as ce,N as k}from"./vendor-d6aZdYq-.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".open-menu"),t=document.querySelector(".mob-menu");!e||!t||(e.addEventListener("click",()=>{t.classList.toggle("is-open")}),t.addEventListener("click",n=>{n.target===t&&t.classList.remove("is-open")}))});const v=oe.create({baseURL:"http://localhost:1337/api",headers:{"Content-Type":"application/json"}});async function le(e,t){return(await v.post("/auth/local",{identifier:e,password:t})).data}function de(){const e=localStorage.getItem("jwt");return typeof e=="string"&&e.length>0}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("loginForm");if(!e)return;const t=new j("#loginForm",{errorFieldCssClass:"is-error",errorLabelCssClass:"login__error",focusInvalidField:!0,lockForm:!0});t.addField('[name="email"]',[{rule:"required",errorMessage:"Введите e-mail"},{rule:"email",errorMessage:"Некорректный e-mail"}]).addField('[name="password"]',[{rule:"required",errorMessage:"Введите пароль"}]).onSuccess(async n=>{n.preventDefault();const r=e.email.value.trim(),i=e.password.value;try{const s=await le(r,i);localStorage.setItem("jwt",s.jwt),window.location.replace("/ClubTravel/html/pages/accountPage.html")}catch(s){t.showErrors({'[name="password"]':s.message})}})});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".header__top-bar-profile-link");e&&(e.href=de()?"/ClubTravel/html/pages/accountPage.html":"/ClubTravel/html/pages/loginPage.html")});async function ue({page:e=1,pageSize:t=5}){const n=localStorage.getItem("jwt");if(!n)throw new Error("Нет JWT");return(await v.get("/orders",{headers:{Authorization:`Bearer ${n}`},params:{populate:"user",pagination:{page:e,pageSize:t},sort:"createdAt:desc"}})).data}const ge=5;function F(e){if(!e)return"—";const t=new Date(e),n=t.getDate(),r=t.getFullYear(),i=t.toLocaleString("ru-RU",{month:"long"}),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n} ${i} ${r} ${s}:${o}`}function pe(e){const t=e.charter==="Оплачено"?"order-status--paid":"order-status--processing";return`
    <tr>
      <td>${e.orderNumber}</td>
      <td>${e.totalPrice.toFixed(2)}</td>
      <td>${e.user?.email??"—"}</td>
      <td>
        <span class="order-status ${t}">
          ${e.charter}
        </span>
      </td>
      <td>${F(e.date)}</td>
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
      <div>Дата<span>${F(e.date)}</span></div>
    </div>
  `}function fe(e,t,n){const r=document.getElementById("ordersPagination");if(!r)return;const{page:i,pageCount:s,total:o}=e.pagination;r.innerHTML=`
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
  `,r.onclick=a=>{const d=a.target.dataset.action;d&&(d==="prev"&&i>1&&n(i-1),d==="next"&&i<s&&n(i+1))}}document.addEventListener("DOMContentLoaded",async()=>{const e=document.getElementById("ordersList"),t=document.getElementById("ordersPagination");if(!e||!t)return;let n=1;async function r(i){try{const{data:s,meta:o}=await ue({page:i,pageSize:ge});if(!s.length){e.innerHTML='<tr><td colspan="5">Заказов нет</td></tr>',t.innerHTML="";return}e.innerHTML=s.map(pe).join("");const a=document.getElementById("ordersCards");a&&(a.innerHTML=s.map(me).join("")),fe(o,s.length,d=>{n=d,r(n)})}catch(s){console.error("Ошибка загрузки заказов:",s),e.innerHTML='<tr><td colspan="5">Ошибка загрузки заказов</td></tr>'}}r(n)});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".account__btn-exit");e&&e.addEventListener("click",()=>{localStorage.removeItem("jwt"),localStorage.removeItem("user"),window.location.replace("/ClubTravel/html/pages/loginPage.html")})});async function Ce(){const{data:e}=await v.get("/tours");return e.data}async function he(){const{data:e}=await v.get("/hotels?populate=*");return e}async function Ie(){const{data:e}=await v.get("/hotels?populate=*&filters[tour_option][hotOffer][$eq]=true");return e.data}async function ve(e){const{data:t}=await v.get(`/hotels?populate=*&filters[tour_option][season][$eq]=${e}`);return t.data}const _="/ClubTravel/assets/sprite-xjNdH9vZ.svg",W=document.querySelector(".hothome__slider-swiper .swiper-wrapper");function V(e){return e?new Date(e).toLocaleDateString("ru-RU",{day:"numeric",month:"long",year:"numeric"}):""}function _e(e=[]){return e.length?Math.min(...e.map(t=>t.price)):null}function J(e){return e&&(`http://localhost:1337${e.url}`||`http://localhost:1337${e.formats?.small?.url}`||`http://localhost:1337${e.formats?.thumbnail?.url}`||e.formats?.small?.url||e.formats?.thumbnail?.url||e.url)||"/img/hot/image-one.webp"}function O(e){if(e==="Apartments")return`
      <p class="filter__extended-info-list-column-list-item-app">
        <svg>
          <use href="${_}#icon-house"></use>
        </svg>
        Апартаменты
      </p>
    `;const n={Budget:2,Economy:3,Standard:4,Comfort:5}[e];return n?`
    <div class="filter__extended-info-list-column-list-item-stars">
      ${Array.from({length:n}).map(()=>`
          <svg class="filter__extended-info-list-column-list-item-stars-star">
            <use href="${_}#icon-star"></use>
          </svg>
          `).join("")}
    </div>
  `:""}if(W){const t=(await Ie()).map(r=>{const i=r.nameHotel,s=r.region,o=r.tour?.destination,a=V(r.tour_option?.startDate),d=_e(r.hotel_options),g=Math.round(d-d*(30/100)),p=O(r.category);return`
        <div class="hothome__slider-swiper-item swiper-slide">
          <div class="hothome__slider-swiper-item-one">
            <img src="${J(r.image)}" alt="${i}" />
            <div class="hothome__slider-swiper-item-one-list">
            <div
              class="hothome__slider-swiper-item-one-list-item hothome__slider-swiper-item-one-list-date"
            >
              <svg>
                <use href="${_}#icon-clock"></use>
              </svg>
              <p>${a}</p>
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
              <p class="hothome__slider-swiper-item-two-price-new"><span>${g}</span>€/чел</p>
              <span class="hothome__slider-swiper-item-two-price-old">${d}€/чел</span>
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
				`}).join("");W.innerHTML=t,new H(".hothome__slider-swiper",{direction:"horizontal",keyboard:{enabled:!0,onlyInViewport:!0},modules:[Q,T],resizeObserver:!0,observer:!0,observeParents:!0,navigation:{nextEl:".hothome__slider-buttons-next",prevEl:".hothome__slider-buttons-prev"},loop:!0,breakpoints:{0:{slidesPerView:1,spaceBetween:20},620:{slidesPerView:2,spaceBetween:20},768:{slidesPerView:2,spaceBetween:23},1366:{slidesPerView:3,spaceBetween:26},1440:{slidesPerView:3,spaceBetween:28},1920:{slidesPerView:4,spaceBetween:31}}}).update()}function we(e={}){const n=(u=>{if(typeof atob=="function"&&typeof TextDecoder<"u"){const m=atob(u),C=new Uint8Array(m.length);for(let I=0;I<m.length;I++)C[I]=m.charCodeAt(I);return new TextDecoder("utf-8").decode(C)}if(typeof Buffer<"u")return Buffer.from(u,"base64").toString("utf-8");const c=atob(u);try{return decodeURIComponent(escape(c))}catch{return c}})("PGxpIGNsYXNzPSJyZXN1bHQtZmlsdGVyX19saXN0LWNhcmQiIGRhdGEtaG90ZWwtaWQ9Int7aWR9fSI+CiAgPGRpdiBjbGFzcz0icmVzdWx0LWZpbHRlcl9fbGlzdC1jYXJkLWJhc2UiPgogICAgPGRpdiBjbGFzcz0icmVzdWx0LWZpbHRlcl9fbGlzdC1jYXJkLWJhc2Utb25lIj4KICAgICAgPGRpdiBjbGFzcz0icmVzdWx0LWZpbHRlcl9fbGlzdC1jYXJkLWJhc2Utb25lLWltYWdlIj4KICAgICAgICA8aW1nIHNyYz0ie3tpbWd9fSIgYWx0PSJ7e25hbWV9fSIgLz4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9InJlc3VsdC1maWx0ZXJfX2xpc3QtY2FyZC1iYXNlLW9uZS1pbmZvIj4KICAgICAgICA8ZGl2IGNsYXNzPSJyZXN1bHQtZmlsdGVyX19saXN0LWNhcmQtYmFzZS1vbmUtaW5mby10ZXh0Ij4KICAgICAgICAgIDxoMz57e25hbWV9fTwvaDM+CiAgICAgICAgICA8cD4KICAgICAgICAgICAgPHN2Zz4KICAgICAgICAgICAgICA8dXNlIGhyZWY9Int7c3ByaXRlfX0jaWNvbi1wb2ludCI+PC91c2U+CiAgICAgICAgICAgIDwvc3ZnPgogICAgICAgICAgICB7e2Rlc3RpbmF0aW9ufX0sIHt7cmVnaW9ufX0KICAgICAgICAgIDwvcD4KICAgICAgICAgIDxzcGFuCiAgICAgICAgICAgID7QmtGA0LDRgtC60L7QtSDQvtC/0LjRgdCw0L3QuNC1INC+0YLQtdC70Y8uINCg0LXQutC+0LzQtdC90LTRg9C10Lwg0LTQu9GPINGB0LXQvNC10LnQvdC+0LPQviDQuCDQvNC+0LvQvtC00ZHQttC90L7Qs9C+CiAgICAgICAgICAgINC+0YLQtNGL0YXQsC4g0J7RgtC10LvRjCDQv9GA0LXQutGA0LDRgdC90L4g0YHQvtGH0LXRgtCw0LXRgiDQsiDRgdC10LHQtSDQutCw0Log0YHQvtCy0YDQtdC80LXQvdC90YvQuSDQutC+0LzRhNC+0YDRgiwg0YLQsNC6CiAgICAgICAgICAgINC4INCy0YvRgdC+0LrQuNC5INGD0YDQvtCy0LXQvdGMINC+0LHRgdC70YPQttC40LLQsNC90LjRjy4uLjwvc3BhbgogICAgICAgICAgPgogICAgICAgIDwvZGl2PgogICAgICAgIDxhCiAgICAgICAgICBocmVmPSJ7e2hvdGVsTGlua319IgogICAgICAgICAgY2xhc3M9InJlc3VsdC1maWx0ZXJfX2xpc3QtY2FyZC1iYXNlLW9uZS1pbmZvLWxpbmsiCiAgICAgICAgPgogICAgICAgICAg0J/QvtC00YDQvtCx0L3QtdC1INC+0LEg0L7RgtC10LvQtQogICAgICAgICAgPHN2Zz4KICAgICAgICAgICAgPHVzZSBocmVmPSJ7e3Nwcml0ZX19I2ljb24tYXJyb3ctcmlnaHQiPjwvdXNlPgogICAgICAgICAgPC9zdmc+CiAgICAgICAgPC9hPgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgogICAgPGRpdiBjbGFzcz0icmVzdWx0LWZpbHRlcl9fbGlzdC1jYXJkLWJhc2UtdHdvIj4KICAgICAgPHVsIGNsYXNzPSJyZXN1bHQtZmlsdGVyX19saXN0LWNhcmQtYmFzZS10d28taW5mbyI+CiAgICAgICAgPGxpIGNsYXNzPSJyZXN1bHQtZmlsdGVyX19saXN0LWNhcmQtYmFzZS10d28taW5mby1zdGFycyI+CiAgICAgICAgICB7e2NhdGVnb3J5fX0KICAgICAgICA8L2xpPgogICAgICAgIDxkaXYgY2xhc3M9InJlc3VsdC1maWx0ZXJfX2xpc3QtY2FyZC1iYXNlLXR3by1pbmZvLWxpc3QiPgogICAgICAgICAgPGxpIGNsYXNzPSJyZXN1bHQtZmlsdGVyX19saXN0LWNhcmQtYmFzZS10d28taW5mby1pdGVtIj4KICAgICAgICAgICAgPHN2Zz4KICAgICAgICAgICAgICA8dXNlIGhyZWY9Int7c3ByaXRlfX0jaWNvbi1jbG9jayI+PC91c2U+CiAgICAgICAgICAgIDwvc3ZnPgogICAgICAgICAgICB7e2RheXN9fSDQtNC9LgogICAgICAgICAgPC9saT4KICAgICAgICAgIDxsaSBjbGFzcz0icmVzdWx0LWZpbHRlcl9fbGlzdC1jYXJkLWJhc2UtdHdvLWluZm8taXRlbSI+CiAgICAgICAgICAgIDxzdmc+CiAgICAgICAgICAgICAgPHVzZSBocmVmPSJ7e3Nwcml0ZX19I2ljb24tZm9vZCI+PC91c2U+CiAgICAgICAgICAgIDwvc3ZnPgogICAgICAgICAgICB7e21lYWxzfX0KICAgICAgICAgIDwvbGk+CiAgICAgICAgICA8bGkgY2xhc3M9InJlc3VsdC1maWx0ZXJfX2xpc3QtY2FyZC1iYXNlLXR3by1pbmZvLWl0ZW0iPgogICAgICAgICAgICA8c3ZnPgogICAgICAgICAgICAgIDx1c2UgaHJlZj0ie3tzcHJpdGV9fSNpY29uLWhvdXNlIj48L3VzZT4KICAgICAgICAgICAgPC9zdmc+CiAgICAgICAgICAgIHt7Y2F0ZX19CiAgICAgICAgICA8L2xpPgogICAgICAgICAgPGxpIGNsYXNzPSJyZXN1bHQtZmlsdGVyX19saXN0LWNhcmQtYmFzZS10d28taW5mby1pdGVtIj4KICAgICAgICAgICAgPHN2Zz4KICAgICAgICAgICAgICA8dXNlIGhyZWY9Int7c3ByaXRlfX0jaWNvbi1zdW4iPjwvdXNlPgogICAgICAgICAgICA8L3N2Zz4KICAgICAgICAgICAge3tkZXNjcmlwdGlvbn19CiAgICAgICAgICA8L2xpPgogICAgICAgIDwvZGl2PgogICAgICA8L3VsPgogICAgICA8ZGl2IGNsYXNzPSJyZXN1bHQtZmlsdGVyX19saXN0LWNhcmQtYmFzZS10d28tY2FyZCI+CiAgICAgICAgPGRpdiBjbGFzcz0icmVzdWx0LWZpbHRlcl9fbGlzdC1jYXJkLWJhc2UtdHdvLWNhcmQtdGV4dCI+CiAgICAgICAgICA8cCBjbGFzcz0icmVzdWx0LWZpbHRlcl9fbGlzdC1jYXJkLWJhc2UtdHdvLWNhcmQtdGV4dC1udW1iZXIiPgogICAgICAgICAgICB7e2hvdGVsT3B0aW9uc0xlbmd0aH19INC/0YDQtdC00LvQvtC20LXQvdC40Y8KICAgICAgICAgIDwvcD4KICAgICAgICAgIDxwIGNsYXNzPSJyZXN1bHQtZmlsdGVyX19saXN0LWNhcmQtYmFzZS10d28tY2FyZC10ZXh0LXByaWNlIj4KICAgICAgICAgICAg0L7RgiA8c3Bhbj57e21pblByaWNlfX3igqw8L3NwYW4+L9GH0LXQuwogICAgICAgICAgPC9wPgogICAgICAgIDwvZGl2PgogICAgICAgIDxidXR0b24KICAgICAgICAgIGNsYXNzPSJidXR0b24tb3JnIHJlc3VsdC1maWx0ZXJfX2xpc3QtY2FyZC1iYXNlLXR3by1jYXJkLWJ0biIKICAgICAgICAgIHN0eWxlPSItLWJ0bi13aWR0aDogMTAwJTsgLS1idG4taGVpZ2h0OiA0MnB4IgogICAgICAgID4KICAgICAgICAgINCe0YLQutGA0YvRgtGMCiAgICAgICAgPC9idXR0b24+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CiAgPC9kaXY+CiAgPGRpdiBjbGFzcz0icmVzdWx0LWZpbHRlcl9fbGlzdC1jYXJkLWRldGFpbHMiPjwvZGl2Pgo8L2xpPgo=");let r={...e};const i="{",s="}",o=i+i,a=s+s;function d(u){let c=n,m=10,C=0;for(;C<m&&c.indexOf(o+"#if")!==-1;)C++,c=c.replace(new RegExp(`${o}#if\\s+([^}]+?)${a}([\\s\\S]*?)${o}else\\s*${a}([\\s\\S]*?)${o}\\/if\\s*${a}`,"g"),(I,w,A,y)=>u[w.trim()]?A:y),c=c.replace(new RegExp(`${o}#if\\s+([^}]+?)${a}([\\s\\S]*?)${o}\\/if\\s*${a}`,"g"),(I,w,A)=>u[w.trim()]?A:""),c=c.replace(new RegExp(`${o}#if\\s*\\((eq\\s+([^\\s]+)\\s+"([^"]+)"\\s*)\\)${a}([\\s\\S]*?)${o}else\\s*${a}([\\s\\S]*?)${o}\\/if\\s*${a}`,"g"),(I,w,A,y,P,G)=>u[A]===y?P:G),c=c.replace(new RegExp(`${o}#if\\s*\\((eq\\s+([^\\s]+)\\s+"([^"]+)"\\s*)\\)${a}([\\s\\S]*?)${o}\\/if\\s*${a}`,"g"),(I,w,A,y,P)=>u[A]===y?P:"");return Object.keys(u).forEach(I=>{const w=new RegExp(`${o}\\s*${I}\\s*${a}`,"g");c=c.replace(w,u[I]??"")}),c=c.replace(/\s[a-zA-Z0-9_-]+=['"]\s*['"]/g,""),c=c.replace(new RegExp(`${o}[^}]+?${a}`,"g"),""),c}function g(u){const c=d(u),m=document.createElement("div");return m.innerHTML=c.trim(),m.firstElementChild}let p=g(r);const f={};function h(u){if(r={...r,...u},p.parentElement){const c=p.parentElement,m=g(r);return Object.keys(f).forEach(C=>m[C]=f[C]),c.replaceChild(m,p),p=m,m}else{const c=g(r);return Object.keys(f).forEach(m=>c[m]=f[m]),p=c,c}}return f.update=h,f.toString=()=>p?.outerHTML??"",f.render=u=>(u&&u.appendChild&&u.appendChild(p),p),Object.keys(f).forEach(u=>p[u]=f[u]),p}const x={sortBy:"",order:"asc"};let U=[];document.addEventListener("DOMContentLoaded",()=>{Ae()});function K(e){U=e;const t=document.querySelector(".result-filter__list");if(t){if(t.innerHTML="",!e.length){t.innerHTML=`
		<li class="result-filter__list-empty">
		По выбранным фильтрам ничего не найдено
		</li>
		`,q([]);return}t.innerHTML="",e.forEach(n=>{const r=Le(n);t.appendChild(r)}),q(e),document.querySelectorAll(".result-filter__list-card-base-two-card-btn").forEach(n=>{n.addEventListener("click",r=>{const i=r.currentTarget.closest(".result-filter__list-card"),s=i.querySelector(".result-filter__list-card-base-two-card"),o=i.querySelector(".result-filter__list-card-details"),a=i.dataset.hotelId,d=e.find(p=>p.id===+a);if(!d)return;const g=n.classList.contains("active");o.innerHTML=o.classList.contains("active")?"":be(d),o.classList.toggle("active"),s.classList.toggle("active"),n.classList.toggle("active"),n.textContent=g?"Открыть":"Закрыть"})})}}function q(e){const t=document.querySelector(".result-filter__info");if(!t)return;t.classList.add("active");const n=e.length;n||t.classList.remove("active");const r=e.reduce((s,o)=>s+(o.hotel_options?.length||0),0),i=t.querySelector(".result-filter__info-title");i&&(i.textContent=`Найдено ${r} предложения в ${n} ${n===1?"отеле":"отелях"}`),t.querySelector(".result-filter__info-calendar"),t.querySelector(".result-filter__info-sort ul")}function Ae(){const e=document.querySelectorAll(".result-filter__info-sort-controls-control");function t(n=null){e.forEach(r=>{r!==n&&r.classList.remove("is-open")})}e.forEach(n=>{const r=n.querySelector(".result-filter__info-sort-controls-control-current"),i=n.querySelector(".result-filter__info-sort-controls-control-dropdown"),s=r.querySelector("span");!r||!i||!s||(r.addEventListener("click",o=>{o.stopPropagation(),t(n),n.classList.toggle("is-open")}),i.querySelectorAll("li").forEach(o=>{o.addEventListener("click",()=>{s.textContent=o.textContent,o.dataset.sort!==void 0&&(x.sortBy=o.dataset.sort||""),o.dataset.order&&(x.order=o.dataset.order),n.classList.remove("is-open"),ye()})}))}),document.addEventListener("click",()=>t())}function ye(){let e=[...U];x.sortBy||e.sort((t,n)=>{const r=new Date(t.updatedAt).getTime();return new Date(n.updatedAt).getTime()-r}),x.sortBy==="price"&&e.sort((t,n)=>{const r=t.tour_option?.minPrice??0,i=n.tour_option?.minPrice??0;return x.order==="asc"?r-i:i-r}),K(e)}function ee(e=[]){if(!e.length)return"-";const t={no_meals:"Без питания",breakfast:"Завтрак",breakfast_dinner:"Завтрак и ужин",full_board:"Завтрак, обед, ужин",all_inclusive:"Всё включено",ultra_all_inclusive:"Ультра: всё включено"},n=e.reduce((r,i)=>i.price<r.price?i:r,e[0]);return t[n.meals]||"-"}function Le(e){return we({id:e.id,img:J(e.image),name:e.nameHotel,destination:e.tour?.destination,region:e.region,category:O(e.category),meals:ee(e.hotel_options),days:e.tour_option?.days,cate:e.category,description:e.description,hotelOptionsLength:e.hotel_options?.length,minPrice:e.tour_option?.minPrice,sprite:_,hotelLink:"/html/pages/hotelPage.html",buttonText:"Открыть"})}function be(e){return e.hotel_options?.length?`
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
        ${e.hotel_options.map(t=>Se(e,t)).join("")}
      </tbody>
    </table>
  `:"<p>Нет доступных вариантов</p>"}function Se(e,t){const n=V(e.tour_option?.startDate),r=e.tour_option?.days+" дн.",i=ee([t]),s=e.category,o="10+",a=t.price;return`
    <tr>
    <td data-label="Дата">${n}</td>
    <td data-label="Период">${r}</td>
    <td data-label="Питание">${i}</td>
    <td data-label="Тип номера">${s}</td>
    <td data-label="Мест в самолёте">${o}</td>
    <td data-label="Стоимость"><span>${a}€</span>/чел</td>
    <td>
      <button
        class="button-org result-filter__list-card-details-btn"
        style="--btn-width: 160px; --btn-height: 42px"
      >
        выбрать
      </button>
    </td>
  </tr>
  `}const S=document.querySelector(".filter"),l={destination:"",days:null,date:null,guests:{adults:null,children:null},category:[],meals:[],tourPackage:[],departureCity:[],price:{min:null,max:null},regions:[]},Pe={"filter-destination":"destination","filter-days":"days","filter-date":"date","filter-guests":"guests"};if(window.location.pathname.endsWith("searchPage.html"))if([...new URLSearchParams(window.localStorage.search).keys()].length)De();else{const t=localStorage.getItem("filtersState");t&&Object.assign(l,JSON.parse(t)),L(l)}else localStorage.removeItem("filtersState"),window.history.replaceState({},"",window.location.pathname);if(S){let e=function(o=null){i.forEach(a=>{a!==o&&a.classList.remove("is-open")})};const t=S.querySelector(".filter__section-form-date__trigger-input"),n=S.querySelector(".filter__section-form-date__trigger"),r=S.querySelector(".filter__section-form-date__trigger-value");if(t||n||r){if(l.date){const a=new Date(l.date),d=a.getDate(),g=a.getFullYear(),p=a.toLocaleString("ru-RU",{month:"long"});r.textContent=`${d} ${p} ${g}`}const o=ae(t,{locale:ce.Russian,minDate:"today",dateFormat:"Y-m-d",allowInput:!1,onChange(a){if(!a.length)return;const d=a[0],g=d.getDate(),p=d.getFullYear(),f=d.toLocaleString("ru-RU",{month:"long"});r.textContent=`${g} ${f} ${p}`;const h=d.getFullYear(),u=String(d.getMonth()+1).padStart(2,"0"),c=String(d.getDate()).padStart(2,"0");l.date=`${h}-${u}-${c}`,L(l),b()}});n.addEventListener("click",()=>{o.open()})}const i=S.querySelectorAll(".filter__section-form-item-variant:not(.filter__section-form-guests-variant)");i.forEach(o=>{const d=o.closest(".filter__section-form-item").dataset.name,g=Pe[d],p=o.querySelector(".filter__section-form-item-variant__trigger"),f=o.querySelector(".filter__section-form-item-variant__dropdown"),h=p.querySelector("span");if(!(!f||!p||!h)){if(l[g]&&typeof l[g]=="string"){const u=Array.from(f.querySelectorAll("li")).find(c=>(c.dataset.value??c.getAttribute("value"))===l[g]);u&&(h.textContent=u.textContent)}p.addEventListener("click",u=>{u.stopPropagation(),e(o),o.classList.toggle("is-open")}),f.querySelectorAll("li").forEach(u=>{u.addEventListener("click",()=>{const c=u.dataset.value??u.getAttribute("value")??"";h.textContent=u.textContent,l[g]=c||null,L(l),b(),g==="destination"&&(l.regions=[],X&&X(c)),o.classList.remove("is-open")})})}}),document.addEventListener("click",()=>e());const s=S.querySelector(".filter__section-form-guests-variant");if(s){let o=function(){const c=+p.value||0,m=+f.value||0;if(!c&&!m){g.textContent="Любое к-ство";return}const C=[];c&&C.push(`Взрослых: ${c}`),m&&C.push(`детей: ${m}`),g.textContent=C.join("; "),l.guests.adults=c,l.guests.children=m,L(l),b()};const a=s.querySelector(".filter__section-form-guests-variant__trigger"),d=s.querySelector(".filter__section-form-guests-variant__dropdown"),g=a.querySelector("span"),p=d.querySelector("input[name='filter-adults']"),f=d.querySelector("input[name='filter-children']");if(l.guests.adults||l.guests.children){const c=[];l.guests.adults&&c.push(`Взрослых: ${l.guests.adults}`),l.guests.children&&c.push(`детей: ${l.guests.children}`),g.textContent=c.join("; ")}const h=d.querySelector("li"),u=d.querySelectorAll("li > div");a.addEventListener("click",c=>{c.stopPropagation(),e(),s.classList.toggle("is-open")}),d.addEventListener("click",c=>c.stopPropagation()),h.addEventListener("click",()=>{p.value="",f.value="",g.textContent="Любое к-ство",l.guests.adults=null,l.guests.children=null,L(l),b(),s.classList.remove("is-open")}),p.addEventListener("input",o),f.addEventListener("input",o),u.forEach(c=>{c.addEventListener("click",m=>{m.target.tagName!=="INPUT"&&s.classList.remove("is-open")})})}}const Y=document.querySelector(".button-form-search-link");Y&&Y.addEventListener("click",async e=>{if(e.preventDefault(),b(),!window.location.pathname.endsWith("searchPage.html")){const s="/ClubTravel/";window.location.href=`${s}html/pages/searchPage.html`;return}const r=(await he()).data,i=xe(r,l);L(l),K(i)});function xe(e,t){return e.filter(n=>{if(t.destination&&n.tour?.destination!==t.destination||t.days!==null&&n.tour_option?.days!==Number(t.days))return!1;if(t.date){const i=new Date(t.date),s=new Date(n.tour_option?.startDate),o=new Date(n.tour_option?.endDate);if(i<s||i>o)return!1}return!(t.guests.adults!==null&&n.tour_option?.adults<t.guests.adults||t.guests.children!==null&&n.tour_option?.children<t.guests.children||(t.meals.length||t.tourPackage.length||t.price.min!==null||t.price.max!==null)&&!n.hotel_options?.some(s=>!(t.meals.length&&!t.meals.includes(s.meals)||t.tourPackage.length&&!t.tourPackage.includes(s.tourPackage)||t.price.min!==null&&s.price<t.price.min||t.price.max!==null&&s.price>t.price.max))||t.category.length&&!t.category.includes(n.category)||t.departureCity.length&&!t.departureCity.includes(n.tour_option?.departureCity)||t.regions.length&&!t.regions.includes(n.region))})}const $=document.querySelector(".filter__extended-btn"),N=document.querySelector(".filter__extended-info");if($&&N){$.addEventListener("click",()=>{$.classList.add("filter__extended-is-hidden"),N.classList.remove("filter__extended-is-hidden"),Ee(),$e(),Ne()});const e=N.querySelector(".filter__extended-info-title-close");e&&e.addEventListener("click",()=>{N.classList.add("filter__extended-is-hidden"),$.classList.remove("filter__extended-is-hidden")})}function $e(){const e=document.querySelector(".filter-price-list");if(e){let t=function(){const C=c(h),I=c(u);o.style.left=`${C}%`,a.style.left=`${I}%`,s.style.left=`${C}%`,s.style.right=`${100-I}%`,d.textContent=`${h}€`,g.textContent=`${u}€`},n=function(C,I){const w=i.getBoundingClientRect(),A=P=>{let D=(P.clientX-w.left)/w.width*100;D=Math.max(0,Math.min(100,D));const R=m(D);I?h=Math.min(R,u):u=Math.max(R,h),t(),r()},y=()=>{document.removeEventListener("mousemove",A),document.removeEventListener("mouseup",y)};document.addEventListener("mousemove",A),document.addEventListener("mouseup",y)},r=function(){h===p&&u===f?(l.price.min=null,l.price.max=null):(l.price.min=h,l.price.max=u),L(l),b()};const i=e.querySelector(".filter-price-slider"),s=e.querySelector(".filter-price-range"),o=e.querySelector(".filter-price-thumb.left"),a=e.querySelector(".filter-price-thumb.right"),d=e.querySelector("#minPrice"),g=e.querySelector("#maxPrice"),p=200,f=3e3;let h=200,u=3e3;l.price.min!==null&&(h=l.price.min),l.price.max!==null&&(u=l.price.max);const c=C=>(C-p)/(f-p)*100,m=C=>Math.round(p+C/100*(f-p));o.addEventListener("mousedown",C=>n(C,!0)),a.addEventListener("mousedown",C=>n(C,!1)),t()}}let X=null;function Ne(){const e=document.querySelector('[data-extended="regions"]');if(!e)return;const t=e.querySelector(".filter__extended-info-list-column-list"),n=e.querySelector(".filter__extended-info-list-column-hint");let r=[];X=async function(i){if(t.innerHTML="",te(),!i){n.classList.remove("is-hidden"),n.textContent="Выберите сначала направление";return}r.length||(r=await Ce());const s=r.find(d=>d.destination===i);n.classList.add("is-hidden");const o=s.regions.map(d=>`
  <li class="filter__extended-info-list-column-list-item" data-value="${d}">
    <svg class="filter__extended-info-list-column-list-item-check">
      <use href="${_}#icon-check-circle"></use>
    </svg>
    ${d}
  </li>
`).join("");t.innerHTML=o;const a=l.regions||[];t.querySelectorAll(".filter__extended-info-list-column-list-item").forEach(d=>{a.includes(d.dataset.value)&&d.classList.add("is-active")})},X(l.destination)}function Ee(){document.querySelectorAll(".filter__extended-categoties").forEach(t=>{const n=t.dataset.extended,r=t.querySelector(".filter__extended-info-list-column-list");if(!r)return;const i=l[n]||[];r.querySelectorAll(".filter__extended-info-list-column-list-item").forEach(s=>{i.includes(s.dataset.value)&&s.classList.add("is-active")}),r.addEventListener("click",s=>{const o=s.target.closest(".filter__extended-info-list-column-list-item");if(!o)return;const a=o.dataset.value;if(!a)return;const d=l[n];d.includes(a)?(l[n]=d.filter(g=>g!==a),o.classList.remove("is-active")):(l[n].push(a),o.classList.add("is-active")),L(l),b(),te()})})}const Z=document.querySelector(".filter__extended-info-active-filter"),Xe=["category","meals","tourPackage","departureCity","regions"],He={category:"Категория размещения",meals:"Питание",tourPackage:"Состав тура",departureCity:"Вылет из",regions:"Регионы"},z={category:{Budget:"2 звезды",Economy:"3 звезды",Standard:"4 звезды",Comfort:"5 звезд",Apartments:"Апартаменты"},meals:{no_meals:"Без питания",breakfast:"Завтрак",breakfast_dinner:"Затрак и ужин",full_board:"Завтрак, обед, ужин",all_inclusive:"Всё включено",ultra_all_inclusive:"Ультра: всё включено"},tourPackage:{package:"Туристический пакет",flight_only:"Только перелет"},departureCity:{tallinn:"Таллин",riga:"Рига",vilnius:"Вильнюс"},regions:{}};function te(){if(!Z)return;Z.innerHTML="";const e=Xe.map(t=>{const n=l[t];return!Array.isArray(n)||n.length===0?"":(n.map(r=>`<li>${z[t]?.[r]||r}</li>`).join(""),`
        <div class="filter__extended-info-active-filter-item">
          <span class="filter__extended-info-active-filter-item-title">
            ${He[t]}:
          </span>
          <ul class="filter__extended-info-active-filter-item-values">
            ${n.map(r=>`<li>${z[t]?.[r]||r}</li>`).join("")}
          </ul>
        </div>
      `)}).join("");Z.innerHTML=e}function L(e){const t=new URLSearchParams;e.destination&&t.set("destination",e.destination),e.days&&t.set("days",e.days),e.date&&t.set("date",e.date),e.guests.adults!==null&&t.set("adults",e.guests.adults),e.guests.children!==null&&t.set("children",e.guests.children),["category","meals","tourPackage","departureCity","regions"].forEach(r=>{e[r].length&&t.set(r,e[r].join(","))}),e.price.min!==null&&t.set("priceMin",e.price.min),e.price.max!==null&&t.set("priceMax",e.price.max);const n=`${window.location.pathname}?${t.toString()}`;window.history.replaceState({},"",n)}function De(){const e=new URLSearchParams(window.location.search);l.destination=e.get("destination")||"",l.days=e.get("days"),l.date=e.get("date"),l.guests.adults=e.get("adults")?Number(e.get("adults")):null,l.guests.children=e.get("children")?Number(e.get("children")):null,["category","meals","tourPackage","departureCity","regions"].forEach(t=>{const n=e.get(t);l[t]=n?n.split(","):[]}),l.price.min=e.get("priceMin")?Number(e.get("priceMin")):null,l.price.max=e.get("priceMax")?Number(e.get("priceMax")):null}function b(){localStorage.setItem("filtersState",JSON.stringify(l))}async function Ze({destination:e,season:t,hotOffer:n,page:r=1,pageSize:i=6}={}){const s={"populate[tour_options][populate]":"imageTour","pagination[page]":r,"pagination[pageSize]":i,sort:"id:asc"};e&&e!=="Все страны"&&(s["filters[destination][$eq]"]=e),t&&(s["populate[tour_options][filters][season][$eq]"]=t),n&&(s["populate[tour_options][filters][hotOffer][$eq]"]=!0);const{data:o}=await v.get("/tours",{params:s});return o}function Ge(e){return e.data.map(t=>{const n=t.tour_options||[],r=n.length?Math.min(...n.map(s=>s.minPrice)):null,i=n.find(s=>s.imageTour?.url);return{id:t.id,destination:t.destination,region:t.regions?.[0]??"",priceFrom:r,image:i?i.imageTour.url:"/img/no-image.webp",optionsCount:n.length,dates:n.map(s=>({start:s.startDate,end:s.endDate}))}})}const B=document.querySelectorAll(".directions__filters input[type='checkbox']");let ne=null;async function re(){try{const e=await Ze({destination:ne,page:1,pageSize:6}),t=Ge(e);Re(t)}catch(e){console.error("Ошибка загрузки туров",e)}}B.forEach(e=>{e.addEventListener("change",()=>{B.forEach(t=>t.checked=!1),e.checked=!0,ne=e.value==="Все страны"?null:e.value,re()})});function M(e){return new Date(e).toLocaleDateString("ru-RU",{day:"2-digit",month:"long",year:"numeric"})}function Re(e){const t=document.querySelector(".directions__wrapper");t&&(t.innerHTML=e.map(n=>`
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
          ${n.dates.slice(0,2).map(r=>`
            <p class="directions__tour-card-date">
              ${M(r.start)} – ${M(r.end)}
            </p>
              
          `).join("")}
            </div>
            <svg width="24" height="24">
                <use href="${_}#icon-calendar"></use>
            </svg>
        </div>
        <div class="directions__btn-wrapper">
        <a href="/ClubTravel/html/pages/hotelPage.html?id=${n.id}"  class="directions__tour-card-btn">
          ВЫБРАТЬ ТУР
        </a>
        </div>
      </div>
    </article>
  `).join(""))}re();async function se(){const{data:e}=await v.get("/news-homes",{params:{populate:{images:!0},sort:["publishedAt:desc"]}});return e.data}function We(e){const t=document.querySelector(".news-page__slider-wrapper");if(!t)return;t.innerHTML="";const n=v.defaults.baseURL.replace(/\/api$/,"");e.forEach(r=>{const{title:i,price:s,date:o,images:a}=r,d=a?.url?n+a.url:"",g=document.createElement("div");g.className="news-home__card",g.innerHTML=`
      <div class="news-home__image">
        <img src="${d}" alt="${i}" />

        ${s?`<p class="news-home__price">от <span>${s}</span></p>`:""}

        ${o?`
            <div class="news-home__date-wrapper">
              <svg width="16" height="16">
                <use href="${_}#icon-clock"></use>
              </svg>
              <p>${qe(o)}</p>
            </div>
            `:""}
      </div>

      <div class="news-home__content">
        <p class="news-home__title-card">${i}</p>
      </div>
    `,t.appendChild(g)})}function qe(e){return new Date(e).toLocaleDateString("ru-RU",{day:"numeric",month:"long",year:"numeric"})}document.addEventListener("DOMContentLoaded",async()=>{const e=await se();We(e)});H.use([k]);function Ye(){document.querySelectorAll("[data-swiper]").forEach(e=>{if(e.swiper)return;const t=e.closest(".news-home__slider-wrapper");if(!t)return;const n=t.querySelector(".news-home__button-prev"),r=t.querySelector(".news-home__button-next");new H(e,{slidesPerView:1,spaceBetween:16,speed:600,navigation:{prevEl:n,nextEl:r},breakpoints:{768:{slidesPerView:2,spaceBetween:20},1024:{slidesPerView:3,spaceBetween:27}}})})}function ze(){const e=document.querySelector(".news-home__slider-wrapper");if(!e)return null;const t=e.querySelector(".news-home__button-prev"),n=e.querySelector(".news-home__button-next");if(!t||!n)return null;const r=document.createElement("div");return r.className="swiper news-home__swiper",r.setAttribute("data-swiper",""),r.innerHTML=`
    <div class="swiper-wrapper"></div>
  `,e.insertBefore(r,n),r.querySelector(".swiper-wrapper")}function Be(e){const t=ze();t&&e.forEach(n=>{const{title:r,price:i,date:s,images:o}=n,a=v.defaults.baseURL.replace(/\/api$/,""),d=o?.url?a+o.url:"",g=document.createElement("div");g.className="swiper-slide",g.innerHTML=`
      <div class="news-home__card">
        <div class="news-home__image">
          <img src="${d}" alt="${r}" />

          ${i?`<p class="news-home__price">от <span>${i}</span></p>`:""}

          ${s?`
              <div class="news-home__date-wrapper">
                <svg width="16" height="16">
                  <use href="${_}#icon-clock"></use>
                </svg>
                <p>${Me(s)}</p>
              </div>
              `:""}
        </div>

        <div class="news-home__content">
          <p class="news-home__title-card">${r}</p>
        </div>
      </div>
    `,t.appendChild(g)})}function Me(e){return new Date(e).toLocaleDateString("ru-RU",{day:"numeric",month:"long",year:"numeric"})}document.addEventListener("DOMContentLoaded",async()=>{const e=await se();Be(e),Ye()});const je=document.querySelector(".winter-homepage-swiper"),Qe=document.querySelector(".summer-homepage-swiper");je&&ie({containerSelector:".winter-homepage-swiper",prevBtn:".winter-homepage-prev",nextBtn:".winter-homepage-next",season:"winter"});Qe&&ie({containerSelector:".summer-homepage-swiper",prevBtn:".summer-homepage-prev",nextBtn:".summer-homepage-next",season:"summer"});async function ie({containerSelector:e,prevBtn:t,nextBtn:n,season:r}){const i=document.querySelector(`${e} .swiper-wrapper`),s=await ve(r);i.innerHTML=s.map(a=>Te(a)).join(""),new H(e,{direction:"horizontal",keyboard:{enabled:!0,onlyInViewport:!0},modules:[Q,T,k],resizeObserver:!0,observer:!0,observeParents:!0,navigation:{nextEl:n,prevEl:t},loop:!0,breakpoints:{0:{slidesPerView:1,spaceBetween:20},620:{slidesPerView:2,spaceBetween:20},768:{slidesPerView:3,spaceBetween:20},1366:{slidesPerView:4,spaceBetween:20},1440:{slidesPerView:4,spaceBetween:23},1920:{slidesPerView:5,spaceBetween:30}}}).update()}function Te(e){function t(s){return`http://localhost:1337${s.image.url}`||`http://localhost:1337${s.image.formats?.small?.url}`||`http://localhost:1337${s.tour_option?.imageTour?.url}`||s.image?.url||s.tour_option?.imageTour?.url||s.tour_option?.imageTour?.formats?.small?.url||s.tour_option?.imageTour?.formats?.thumbnail?.url}const n=e.tour?.destination,r=e.tour_option?.minPrice;return`
        <div class="winter-summer-home__slider-swiper-slide swiper-slide">
          <div class="winter-summer-home__slider-swiper-slide-image">
            <img src="${t(e)}" alt="${n}" />
          </div>
          <div class="winter-summer-home__slider-swiper-slide-info">
            <div class="winter-summer-home__slider-swiper-slide-info-text">
              <p class="winter-summer-home__slider-swiper-slide-info-text-dest">
                <svg>
                  <use href="${_}#icon-point"></use>
                </svg>
                ${n}
              </p>
              <p class="winter-summer-home__slider-swiper-slide-info-text-price">от <span>${r}</span>€/чел</p>
            </div>
						<a
						href="{{link
            'html/pages/searchPage.html'}}"
						class="button-org"
						style="--btn-width: 100%; --btn-height: 42px;"
						>Выбрать тур</a>
          </div>
        </div>
	`}async function ke(e,t){return(await v.post("/auth/local/register",{username:e,email:e,password:t})).data}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("registerForm");if(!e)return;const t=new j("#registerForm",{errorFieldCssClass:"is-error",errorLabelCssClass:"login__error",focusInvalidField:!0,lockForm:!0});t.addField('[name="email"]',[{rule:"required",errorMessage:"Введите e-mail"},{rule:"email",errorMessage:"Некорректный e-mail"}]).addField('[name="password"]',[{rule:"required",errorMessage:"Введите пароль"},{rule:"minLength",value:8,errorMessage:"Минимум 8 символов"},{validator:n=>/[A-Za-z]/.test(n)&&/\d/.test(n),errorMessage:"Пароль должен содержать букву и цифру"}]).addField('[name="passwordRepeat"]',[{rule:"required",errorMessage:"Повторите пароль"},{validator:(n,r)=>n===r['[name="password"]'].elem.value,errorMessage:"Пароли не совпадают"}]).onSuccess(async n=>{n.preventDefault();const r=e.email.value.trim(),i=e.password.value;try{const s=await ke(r,i);localStorage.setItem("jwt",s.jwt),window.location.replace("/ClubTravel/html/pages/accountPage.html")}catch(s){const o=s.response?.data?.error?.message||"Ошибка регистрации";t.showErrors({'[name="email"]':o})}})});async function Fe(e){return(await v.post("/auth/forgot-password",{email:e})).data}const E=document.getElementById("forgotForm");E&&E.addEventListener("submit",async e=>{e.preventDefault();try{await Fe(E.email.value),E.reset(),alert("Письмо отправлено")}catch{alert("Ошибка")}});
