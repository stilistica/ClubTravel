import{a as pe,J,S as D,P as O,K as U,f as me,r as fe,N as K}from"./vendor-d6aZdYq-.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".open-menu"),t=document.querySelector(".mob-menu");!e||!t||(e.addEventListener("click",()=>{t.classList.toggle("is-open")}),t.addEventListener("click",n=>{n.target===t&&t.classList.remove("is-open")}))});const v=pe.create({baseURL:"http://localhost:1337/api",headers:{"Content-Type":"application/json"}});async function Ce(e,t){return(await v.post("/auth/local",{identifier:e,password:t})).data}function he(){const e=localStorage.getItem("jwt");return typeof e=="string"&&e.length>0}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("loginForm");if(!e)return;const t=new J("#loginForm",{errorFieldCssClass:"is-error",errorLabelCssClass:"login__error",focusInvalidField:!0,lockForm:!0});t.addField('[name="email"]',[{rule:"required",errorMessage:"Введите e-mail"},{rule:"email",errorMessage:"Некорректный e-mail"}]).addField('[name="password"]',[{rule:"required",errorMessage:"Введите пароль"}]).onSuccess(async n=>{n.preventDefault();const r=e.email.value.trim(),o=e.password.value;try{const s=await Ce(r,o);localStorage.setItem("jwt",s.jwt),window.location.replace("/ClubTravel/html/pages/accountPage.html")}catch(s){t.showErrors({'[name="password"]':s.message})}})});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".header__top-bar-profile-link");e&&(e.href=he()?"/ClubTravel/html/pages/accountPage.html":"/ClubTravel/html/pages/loginPage.html")});async function _e({page:e=1,pageSize:t=5}){const n=localStorage.getItem("jwt");if(!n)throw new Error("Нет JWT");return(await v.get("/orders",{headers:{Authorization:`Bearer ${n}`},params:{populate:"user",pagination:{page:e,pageSize:t},sort:"createdAt:desc"}})).data}const Ie=5;function ee(e){if(!e)return"—";const t=new Date(e),n=t.getDate(),r=t.getFullYear(),o=t.toLocaleString("ru-RU",{month:"long"}),s=String(t.getHours()).padStart(2,"0"),i=String(t.getMinutes()).padStart(2,"0");return`${n} ${o} ${r} ${s}:${i}`}function ve(e){const t=e.charter==="Оплачено"?"order-status--paid":"order-status--processing";return`
    <tr>
      <td>${e.orderNumber}</td>
      <td>${e.totalPrice.toFixed(2)}</td>
      <td>${e.user?.email??"—"}</td>
      <td>
        <span class="order-status ${t}">
          ${e.charter}
        </span>
      </td>
      <td>${ee(e.date)}</td>
    </tr>
  `}function we(e){const t=e.charter==="Оплачено"?"order-status--paid":"order-status--processing";return`
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
      <div>Дата<span>${ee(e.date)}</span></div>
    </div>
  `}function be(e,t,n){const r=document.getElementById("ordersPagination");if(!r)return;const{page:o,pageCount:s,total:i}=e.pagination;r.innerHTML=`
      <p class="account__pagination-info">
        Показано ${t} из ${i}
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
  `,r.onclick=a=>{const d=a.target.dataset.action;d&&(d==="prev"&&o>1&&n(o-1),d==="next"&&o<s&&n(o+1))}}document.addEventListener("DOMContentLoaded",async()=>{const e=document.getElementById("ordersList"),t=document.getElementById("ordersPagination");if(!e||!t)return;let n=1;async function r(o){try{const{data:s,meta:i}=await _e({page:o,pageSize:Ie});if(!s.length){e.innerHTML='<tr><td colspan="5">Заказов нет</td></tr>',t.innerHTML="";return}e.innerHTML=s.map(ve).join("");const a=document.getElementById("ordersCards");a&&(a.innerHTML=s.map(we).join("")),be(i,s.length,d=>{n=d,r(n)})}catch(s){console.error("Ошибка загрузки заказов:",s),e.innerHTML='<tr><td colspan="5">Ошибка загрузки заказов</td></tr>'}}r(n)});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".account__btn-exit");e&&e.addEventListener("click",()=>{localStorage.removeItem("jwt"),localStorage.removeItem("user"),window.location.replace("/ClubTravel/html/pages/loginPage.html")})});async function ye(){const{data:e}=await v.get("/tours");return e.data}async function Ae(){const{data:e}=await v.get("/hotels?populate=*");return e}async function te(){const{data:e}=await v.get("/hotels?populate=*&filters[tour_option][hotOffer][$eq]=true");return e.data}async function Le(e){const{data:t}=await v.get(`/hotels?populate=*&filters[tour_option][season][$eq]=${e}`);return t.data}const I="/ClubTravel/assets/sprite-xjNdH9vZ.svg",Y=document.querySelector(".hothome__slider-swiper .swiper-wrapper");function Z(e){return e?new Date(e).toLocaleDateString("ru-RU",{day:"numeric",month:"long",year:"numeric"}):""}function Se(e=[]){return e.length?Math.min(...e.map(t=>t.price)):null}function ne(e){return e&&(`http://localhost:1337${e.url}`||`http://localhost:1337${e.formats?.small?.url}`||`http://localhost:1337${e.formats?.thumbnail?.url}`||e.formats?.small?.url||e.formats?.thumbnail?.url||e.url)||"/img/hot/image-one.webp"}function q(e){if(e==="Apartments")return`
      <p class="filter__extended-info-list-column-list-item-app">
        <svg>
          <use href="${I}#icon-house"></use>
        </svg>
        Апартаменты
      </p>
    `;const n={Budget:2,Economy:3,Standard:4,Comfort:5}[e];return n?`
    <div class="filter__extended-info-list-column-list-item-stars">
      ${Array.from({length:n}).map(()=>`
          <svg class="filter__extended-info-list-column-list-item-stars-star">
            <use href="${I}#icon-star"></use>
          </svg>
          `).join("")}
    </div>
  `:""}if(Y){const t=(await te()).map(r=>{const o=r.nameHotel,s=r.region,i=r.tour?.destination,a=Z(r.tour_option?.startDate),d=Se(r.hotel_options),g=Math.round(d-d*(30/100)),p=q(r.category);return`
        <div class="hothome__slider-swiper-item swiper-slide">
          <div class="hothome__slider-swiper-item-one">
            <img src="${ne(r.image)}" alt="${o}" />
            <div class="hothome__slider-swiper-item-one-list">
            <div
              class="hothome__slider-swiper-item-one-list-item hothome__slider-swiper-item-one-list-date"
            >
              <svg>
                <use href="${I}#icon-clock"></use>
              </svg>
              <p>${a}</p>
            </div>
            <div
              class="hothome__slider-swiper-item-one-list-item hothome__slider-swiper-item-one-list-place"
            >
              <svg>
                <use href="${I}#icon-point"></use>
              </svg>
              <p>${i}, ${s}</p>
            </div>
            </div>
          </div>
          <div class="hothome__slider-swiper-item-two">
            <div class="hothome__slider-swiper-item-two-info">
              <p class="hothome__slider-swiper-item-two-info-name">${o}</p>
              <div class="hothome__slider-swiper-item-two-info-categories">${p}</div>
            </div>
            <div class="hothome__slider-swiper-item-two-price">
              <p class="hothome__slider-swiper-item-two-price-new"><span>${g}</span>€/чел</p>
              <span class="hothome__slider-swiper-item-two-price-old">${d}€/чел</span>
            </div>
            <div class="hothome__slider-swiper-item-two-flag">
              <div>
              <svg>
                <use href="${I}#icon-flag"></use>
              </svg>
							<p>-30%</p>
              </div>
            </div>
          </div>
        </div>
				`}).join("");Y.innerHTML=t,new D(".hothome__slider-swiper",{direction:"horizontal",keyboard:{enabled:!0,onlyInViewport:!0},modules:[O,U],resizeObserver:!0,observer:!0,observeParents:!0,navigation:{nextEl:".hothome__slider-buttons-next",prevEl:".hothome__slider-buttons-prev"},loop:!0,breakpoints:{0:{slidesPerView:1,spaceBetween:20},620:{slidesPerView:2,spaceBetween:20},768:{slidesPerView:2,spaceBetween:23},1366:{slidesPerView:3,spaceBetween:26},1440:{slidesPerView:3,spaceBetween:28},1920:{slidesPerView:4,spaceBetween:31}}}).update()}function $e(e={}){const n=(u=>{if(typeof atob=="function"&&typeof TextDecoder<"u"){const m=atob(u),C=new Uint8Array(m.length);for(let _=0;_<m.length;_++)C[_]=m.charCodeAt(_);return new TextDecoder("utf-8").decode(C)}if(typeof Buffer<"u")return Buffer.from(u,"base64").toString("utf-8");const l=atob(u);try{return decodeURIComponent(escape(l))}catch{return l}})("PGxpIGNsYXNzPSJyZXN1bHQtZmlsdGVyX19saXN0LWNhcmQiIGRhdGEtaG90ZWwtaWQ9Int7aWR9fSI+CiAgPGRpdiBjbGFzcz0icmVzdWx0LWZpbHRlcl9fbGlzdC1jYXJkLWJhc2UiPgogICAgPGRpdiBjbGFzcz0icmVzdWx0LWZpbHRlcl9fbGlzdC1jYXJkLWJhc2Utb25lIj4KICAgICAgPGRpdiBjbGFzcz0icmVzdWx0LWZpbHRlcl9fbGlzdC1jYXJkLWJhc2Utb25lLWltYWdlIj4KICAgICAgICA8aW1nIHNyYz0ie3tpbWd9fSIgYWx0PSJ7e25hbWV9fSIgLz4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9InJlc3VsdC1maWx0ZXJfX2xpc3QtY2FyZC1iYXNlLW9uZS1pbmZvIj4KICAgICAgICA8ZGl2IGNsYXNzPSJyZXN1bHQtZmlsdGVyX19saXN0LWNhcmQtYmFzZS1vbmUtaW5mby10ZXh0Ij4KICAgICAgICAgIDxoMz57e25hbWV9fTwvaDM+CiAgICAgICAgICA8cD4KICAgICAgICAgICAgPHN2Zz4KICAgICAgICAgICAgICA8dXNlIGhyZWY9Int7c3ByaXRlfX0jaWNvbi1wb2ludCI+PC91c2U+CiAgICAgICAgICAgIDwvc3ZnPgogICAgICAgICAgICB7e2Rlc3RpbmF0aW9ufX0sIHt7cmVnaW9ufX0KICAgICAgICAgIDwvcD4KICAgICAgICAgIDxzcGFuCiAgICAgICAgICAgID7QmtGA0LDRgtC60L7QtSDQvtC/0LjRgdCw0L3QuNC1INC+0YLQtdC70Y8uINCg0LXQutC+0LzQtdC90LTRg9C10Lwg0LTQu9GPINGB0LXQvNC10LnQvdC+0LPQviDQuCDQvNC+0LvQvtC00ZHQttC90L7Qs9C+CiAgICAgICAgICAgINC+0YLQtNGL0YXQsC4g0J7RgtC10LvRjCDQv9GA0LXQutGA0LDRgdC90L4g0YHQvtGH0LXRgtCw0LXRgiDQsiDRgdC10LHQtSDQutCw0Log0YHQvtCy0YDQtdC80LXQvdC90YvQuSDQutC+0LzRhNC+0YDRgiwg0YLQsNC6CiAgICAgICAgICAgINC4INCy0YvRgdC+0LrQuNC5INGD0YDQvtCy0LXQvdGMINC+0LHRgdC70YPQttC40LLQsNC90LjRjy4uLjwvc3BhbgogICAgICAgICAgPgogICAgICAgIDwvZGl2PgogICAgICAgIDxhCiAgICAgICAgICBocmVmPSJ7e2hvdGVsTGlua319IgogICAgICAgICAgY2xhc3M9InJlc3VsdC1maWx0ZXJfX2xpc3QtY2FyZC1iYXNlLW9uZS1pbmZvLWxpbmsiCiAgICAgICAgPgogICAgICAgICAg0J/QvtC00YDQvtCx0L3QtdC1INC+0LEg0L7RgtC10LvQtQogICAgICAgICAgPHN2Zz4KICAgICAgICAgICAgPHVzZSBocmVmPSJ7e3Nwcml0ZX19I2ljb24tYXJyb3ctcmlnaHQiPjwvdXNlPgogICAgICAgICAgPC9zdmc+CiAgICAgICAgPC9hPgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgogICAgPGRpdiBjbGFzcz0icmVzdWx0LWZpbHRlcl9fbGlzdC1jYXJkLWJhc2UtdHdvIj4KICAgICAgPHVsIGNsYXNzPSJyZXN1bHQtZmlsdGVyX19saXN0LWNhcmQtYmFzZS10d28taW5mbyI+CiAgICAgICAgPGxpIGNsYXNzPSJyZXN1bHQtZmlsdGVyX19saXN0LWNhcmQtYmFzZS10d28taW5mby1zdGFycyI+CiAgICAgICAgICB7e2NhdGVnb3J5fX0KICAgICAgICA8L2xpPgogICAgICAgIDxkaXYgY2xhc3M9InJlc3VsdC1maWx0ZXJfX2xpc3QtY2FyZC1iYXNlLXR3by1pbmZvLWxpc3QiPgogICAgICAgICAgPGxpIGNsYXNzPSJyZXN1bHQtZmlsdGVyX19saXN0LWNhcmQtYmFzZS10d28taW5mby1pdGVtIj4KICAgICAgICAgICAgPHN2Zz4KICAgICAgICAgICAgICA8dXNlIGhyZWY9Int7c3ByaXRlfX0jaWNvbi1jbG9jayI+PC91c2U+CiAgICAgICAgICAgIDwvc3ZnPgogICAgICAgICAgICB7e2RheXN9fSDQtNC9LgogICAgICAgICAgPC9saT4KICAgICAgICAgIDxsaSBjbGFzcz0icmVzdWx0LWZpbHRlcl9fbGlzdC1jYXJkLWJhc2UtdHdvLWluZm8taXRlbSI+CiAgICAgICAgICAgIDxzdmc+CiAgICAgICAgICAgICAgPHVzZSBocmVmPSJ7e3Nwcml0ZX19I2ljb24tZm9vZCI+PC91c2U+CiAgICAgICAgICAgIDwvc3ZnPgogICAgICAgICAgICB7e21lYWxzfX0KICAgICAgICAgIDwvbGk+CiAgICAgICAgICA8bGkgY2xhc3M9InJlc3VsdC1maWx0ZXJfX2xpc3QtY2FyZC1iYXNlLXR3by1pbmZvLWl0ZW0iPgogICAgICAgICAgICA8c3ZnPgogICAgICAgICAgICAgIDx1c2UgaHJlZj0ie3tzcHJpdGV9fSNpY29uLWhvdXNlIj48L3VzZT4KICAgICAgICAgICAgPC9zdmc+CiAgICAgICAgICAgIHt7Y2F0ZX19CiAgICAgICAgICA8L2xpPgogICAgICAgICAgPGxpIGNsYXNzPSJyZXN1bHQtZmlsdGVyX19saXN0LWNhcmQtYmFzZS10d28taW5mby1pdGVtIj4KICAgICAgICAgICAgPHN2Zz4KICAgICAgICAgICAgICA8dXNlIGhyZWY9Int7c3ByaXRlfX0jaWNvbi1zdW4iPjwvdXNlPgogICAgICAgICAgICA8L3N2Zz4KICAgICAgICAgICAge3tkZXNjcmlwdGlvbn19CiAgICAgICAgICA8L2xpPgogICAgICAgIDwvZGl2PgogICAgICA8L3VsPgogICAgICA8ZGl2IGNsYXNzPSJyZXN1bHQtZmlsdGVyX19saXN0LWNhcmQtYmFzZS10d28tY2FyZCI+CiAgICAgICAgPGRpdiBjbGFzcz0icmVzdWx0LWZpbHRlcl9fbGlzdC1jYXJkLWJhc2UtdHdvLWNhcmQtdGV4dCI+CiAgICAgICAgICA8cCBjbGFzcz0icmVzdWx0LWZpbHRlcl9fbGlzdC1jYXJkLWJhc2UtdHdvLWNhcmQtdGV4dC1udW1iZXIiPgogICAgICAgICAgICB7e2hvdGVsT3B0aW9uc0xlbmd0aH19INC/0YDQtdC00LvQvtC20LXQvdC40Y8KICAgICAgICAgIDwvcD4KICAgICAgICAgIDxwIGNsYXNzPSJyZXN1bHQtZmlsdGVyX19saXN0LWNhcmQtYmFzZS10d28tY2FyZC10ZXh0LXByaWNlIj4KICAgICAgICAgICAg0L7RgiA8c3Bhbj57e21pblByaWNlfX3igqw8L3NwYW4+L9GH0LXQuwogICAgICAgICAgPC9wPgogICAgICAgIDwvZGl2PgogICAgICAgIDxidXR0b24KICAgICAgICAgIGNsYXNzPSJidXR0b24tb3JnIHJlc3VsdC1maWx0ZXJfX2xpc3QtY2FyZC1iYXNlLXR3by1jYXJkLWJ0biIKICAgICAgICAgIHN0eWxlPSItLWJ0bi13aWR0aDogMTAwJTsgLS1idG4taGVpZ2h0OiA0MnB4IgogICAgICAgID4KICAgICAgICAgINCe0YLQutGA0YvRgtGMCiAgICAgICAgPC9idXR0b24+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CiAgPC9kaXY+CiAgPGRpdiBjbGFzcz0icmVzdWx0LWZpbHRlcl9fbGlzdC1jYXJkLWRldGFpbHMiPjwvZGl2Pgo8L2xpPgo=");let r={...e};const o="{",s="}",i=o+o,a=s+s;function d(u){let l=n,m=10,C=0;for(;C<m&&l.indexOf(i+"#if")!==-1;)C++,l=l.replace(new RegExp(`${i}#if\\s+([^}]+?)${a}([\\s\\S]*?)${i}else\\s*${a}([\\s\\S]*?)${i}\\/if\\s*${a}`,"g"),(_,w,b,y)=>u[w.trim()]?b:y),l=l.replace(new RegExp(`${i}#if\\s+([^}]+?)${a}([\\s\\S]*?)${i}\\/if\\s*${a}`,"g"),(_,w,b)=>u[w.trim()]?b:""),l=l.replace(new RegExp(`${i}#if\\s*\\((eq\\s+([^\\s]+)\\s+"([^"]+)"\\s*)\\)${a}([\\s\\S]*?)${i}else\\s*${a}([\\s\\S]*?)${i}\\/if\\s*${a}`,"g"),(_,w,b,y,$,W)=>u[b]===y?$:W),l=l.replace(new RegExp(`${i}#if\\s*\\((eq\\s+([^\\s]+)\\s+"([^"]+)"\\s*)\\)${a}([\\s\\S]*?)${i}\\/if\\s*${a}`,"g"),(_,w,b,y,$)=>u[b]===y?$:"");return Object.keys(u).forEach(_=>{const w=new RegExp(`${i}\\s*${_}\\s*${a}`,"g");l=l.replace(w,u[_]??"")}),l=l.replace(/\s[a-zA-Z0-9_-]+=['"]\s*['"]/g,""),l=l.replace(new RegExp(`${i}[^}]+?${a}`,"g"),""),l}function g(u){const l=d(u),m=document.createElement("div");return m.innerHTML=l.trim(),m.firstElementChild}let p=g(r);const f={};function h(u){if(r={...r,...u},p.parentElement){const l=p.parentElement,m=g(r);return Object.keys(f).forEach(C=>m[C]=f[C]),l.replaceChild(m,p),p=m,m}else{const l=g(r);return Object.keys(f).forEach(m=>l[m]=f[m]),p=l,l}}return f.update=h,f.toString=()=>p?.outerHTML??"",f.render=u=>(u&&u.appendChild&&u.appendChild(p),p),Object.keys(f).forEach(u=>p[u]=f[u]),p}const P={sortBy:"",order:"asc"};let re=[];document.addEventListener("DOMContentLoaded",()=>{Pe()});function se(e){re=e;const t=document.querySelector(".result-filter__list");if(t){if(t.innerHTML="",!e.length){t.innerHTML=`
		<li class="result-filter__list-empty">
		По выбранным фильтрам ничего не найдено
		</li>
		`,z([]);return}t.innerHTML="",e.forEach(n=>{const r=He(n);t.appendChild(r)}),z(e),document.querySelectorAll(".result-filter__list-card-base-two-card-btn").forEach(n=>{n.addEventListener("click",r=>{const o=r.currentTarget.closest(".result-filter__list-card"),s=o.querySelector(".result-filter__list-card-base-two-card"),i=o.querySelector(".result-filter__list-card-details"),a=o.dataset.hotelId,d=e.find(p=>p.id===+a);if(!d)return;const g=n.classList.contains("active");i.innerHTML=i.classList.contains("active")?"":Ne(d),i.classList.toggle("active"),s.classList.toggle("active"),n.classList.toggle("active"),n.textContent=g?"Открыть":"Закрыть"})})}}function z(e){const t=document.querySelector(".result-filter__info");if(!t)return;t.classList.add("active");const n=e.length;n||t.classList.remove("active");const r=e.reduce((s,i)=>s+(i.hotel_options?.length||0),0),o=t.querySelector(".result-filter__info-title");o&&(o.textContent=`Найдено ${r} предложения в ${n} ${n===1?"отеле":"отелях"}`),t.querySelector(".result-filter__info-calendar"),t.querySelector(".result-filter__info-sort ul")}function Pe(){const e=document.querySelectorAll(".result-filter__info-sort-controls-control");function t(n=null){e.forEach(r=>{r!==n&&r.classList.remove("is-open")})}e.forEach(n=>{const r=n.querySelector(".result-filter__info-sort-controls-control-current"),o=n.querySelector(".result-filter__info-sort-controls-control-dropdown"),s=r.querySelector("span");!r||!o||!s||(r.addEventListener("click",i=>{i.stopPropagation(),t(n),n.classList.toggle("is-open")}),o.querySelectorAll("li").forEach(i=>{i.addEventListener("click",()=>{s.textContent=i.textContent,i.dataset.sort!==void 0&&(P.sortBy=i.dataset.sort||""),i.dataset.order&&(P.order=i.dataset.order),n.classList.remove("is-open"),xe()})}))}),document.addEventListener("click",()=>t())}function xe(){let e=[...re];P.sortBy||e.sort((t,n)=>{const r=new Date(t.updatedAt).getTime();return new Date(n.updatedAt).getTime()-r}),P.sortBy==="price"&&e.sort((t,n)=>{const r=t.tour_option?.minPrice??0,o=n.tour_option?.minPrice??0;return P.order==="asc"?r-o:o-r}),se(e)}function oe(e=[]){if(!e.length)return"-";const t={no_meals:"Без питания",breakfast:"Завтрак",breakfast_dinner:"Завтрак и ужин",full_board:"Завтрак, обед, ужин",all_inclusive:"Всё включено",ultra_all_inclusive:"Ультра: всё включено"},n=e.reduce((r,o)=>o.price<r.price?o:r,e[0]);return t[n.meals]||"-"}function He(e){return $e({id:e.id,img:ne(e.image),name:e.nameHotel,destination:e.tour?.destination,region:e.region,category:q(e.category),meals:oe(e.hotel_options),days:e.tour_option?.days,cate:e.category,description:e.description,hotelOptionsLength:e.hotel_options?.length,minPrice:e.tour_option?.minPrice,sprite:I,hotelLink:"/html/pages/hotelPage.html",buttonText:"Открыть"})}function Ne(e){return e.hotel_options?.length?`
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
        ${e.hotel_options.map(t=>Ee(e,t)).join("")}
      </tbody>
    </table>
  `:"<p>Нет доступных вариантов</p>"}function Ee(e,t){const n=Z(e.tour_option?.startDate),r=e.tour_option?.days+" дн.",o=oe([t]),s=e.category,i="10+",a=t.price;return`
    <tr>
    <td data-label="Дата">${n}</td>
    <td data-label="Период">${r}</td>
    <td data-label="Питание">${o}</td>
    <td data-label="Тип номера">${s}</td>
    <td data-label="Мест в самолёте">${i}</td>
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
  `}const S=document.querySelector(".filter"),c={destination:"",days:null,date:null,guests:{adults:null,children:null},category:[],meals:[],tourPackage:[],departureCity:[],price:{min:null,max:null},regions:[]},Xe={"filter-destination":"destination","filter-days":"days","filter-date":"date","filter-guests":"guests"};if(window.location.pathname.endsWith("searchPage.html"))if([...new URLSearchParams(window.localStorage.search).keys()].length)We();else{const t=localStorage.getItem("filtersState");t&&Object.assign(c,JSON.parse(t)),A(c)}else localStorage.removeItem("filtersState"),window.history.replaceState({},"",window.location.pathname);if(S){let e=function(i=null){o.forEach(a=>{a!==i&&a.classList.remove("is-open")})};const t=S.querySelector(".filter__section-form-date__trigger-input"),n=S.querySelector(".filter__section-form-date__trigger"),r=S.querySelector(".filter__section-form-date__trigger-value");if(t||n||r){if(c.date){const a=new Date(c.date),d=a.getDate(),g=a.getFullYear(),p=a.toLocaleString("ru-RU",{month:"long"});r.textContent=`${d} ${p} ${g}`}const i=me(t,{locale:fe.Russian,minDate:"today",dateFormat:"Y-m-d",allowInput:!1,onChange(a){if(!a.length)return;const d=a[0],g=d.getDate(),p=d.getFullYear(),f=d.toLocaleString("ru-RU",{month:"long"});r.textContent=`${g} ${f} ${p}`;const h=d.getFullYear(),u=String(d.getMonth()+1).padStart(2,"0"),l=String(d.getDate()).padStart(2,"0");c.date=`${h}-${u}-${l}`,A(c),L()}});n.addEventListener("click",()=>{i.open()})}const o=S.querySelectorAll(".filter__section-form-item-variant:not(.filter__section-form-guests-variant)");o.forEach(i=>{const d=i.closest(".filter__section-form-item").dataset.name,g=Xe[d],p=i.querySelector(".filter__section-form-item-variant__trigger"),f=i.querySelector(".filter__section-form-item-variant__dropdown"),h=p.querySelector("span");if(!(!f||!p||!h)){if(c[g]&&typeof c[g]=="string"){const u=Array.from(f.querySelectorAll("li")).find(l=>(l.dataset.value??l.getAttribute("value"))===c[g]);u&&(h.textContent=u.textContent)}p.addEventListener("click",u=>{u.stopPropagation(),e(i),i.classList.toggle("is-open")}),f.querySelectorAll("li").forEach(u=>{u.addEventListener("click",()=>{const l=u.dataset.value??u.getAttribute("value")??"";h.textContent=u.textContent,c[g]=l||null,A(c),L(),g==="destination"&&(c.regions=[],X&&X(l)),i.classList.remove("is-open")})})}}),document.addEventListener("click",()=>e());const s=S.querySelector(".filter__section-form-guests-variant");if(s){let i=function(){const l=+p.value||0,m=+f.value||0;if(!l&&!m){g.textContent="Любое к-ство";return}const C=[];l&&C.push(`Взрослых: ${l}`),m&&C.push(`детей: ${m}`),g.textContent=C.join("; "),c.guests.adults=l,c.guests.children=m,A(c),L()};const a=s.querySelector(".filter__section-form-guests-variant__trigger"),d=s.querySelector(".filter__section-form-guests-variant__dropdown"),g=a.querySelector("span"),p=d.querySelector("input[name='filter-adults']"),f=d.querySelector("input[name='filter-children']");if(c.guests.adults||c.guests.children){const l=[];c.guests.adults&&l.push(`Взрослых: ${c.guests.adults}`),c.guests.children&&l.push(`детей: ${c.guests.children}`),g.textContent=l.join("; ")}const h=d.querySelector("li"),u=d.querySelectorAll("li > div");a.addEventListener("click",l=>{l.stopPropagation(),e(),s.classList.toggle("is-open")}),d.addEventListener("click",l=>l.stopPropagation()),h.addEventListener("click",()=>{p.value="",f.value="",g.textContent="Любое к-ство",c.guests.adults=null,c.guests.children=null,A(c),L(),s.classList.remove("is-open")}),p.addEventListener("input",i),f.addEventListener("input",i),u.forEach(l=>{l.addEventListener("click",m=>{m.target.tagName!=="INPUT"&&s.classList.remove("is-open")})})}}const B=document.querySelector(".button-form-search-link");B&&B.addEventListener("click",async e=>{if(e.preventDefault(),L(),!window.location.pathname.endsWith("searchPage.html")){const s="/ClubTravel/";window.location.href=`${s}html/pages/searchPage.html`;return}const r=(await Ae()).data,o=De(r,c);A(c),se(o)});function De(e,t){return e.filter(n=>{if(t.destination&&n.tour?.destination!==t.destination||t.days!==null&&n.tour_option?.days!==Number(t.days))return!1;if(t.date){const o=new Date(t.date),s=new Date(n.tour_option?.startDate),i=new Date(n.tour_option?.endDate);if(o<s||o>i)return!1}return!(t.guests.adults!==null&&n.tour_option?.adults<t.guests.adults||t.guests.children!==null&&n.tour_option?.children<t.guests.children||(t.meals.length||t.tourPackage.length||t.price.min!==null||t.price.max!==null)&&!n.hotel_options?.some(s=>!(t.meals.length&&!t.meals.includes(s.meals)||t.tourPackage.length&&!t.tourPackage.includes(s.tourPackage)||t.price.min!==null&&s.price<t.price.min||t.price.max!==null&&s.price>t.price.max))||t.category.length&&!t.category.includes(n.category)||t.departureCity.length&&!t.departureCity.includes(n.tour_option?.departureCity)||t.regions.length&&!t.regions.includes(n.region))})}const H=document.querySelector(".filter__extended-btn"),N=document.querySelector(".filter__extended-info");if(H&&N){H.addEventListener("click",()=>{H.classList.add("filter__extended-is-hidden"),N.classList.remove("filter__extended-is-hidden"),Re(),qe(),Te()});const e=N.querySelector(".filter__extended-info-title-close");e&&e.addEventListener("click",()=>{N.classList.add("filter__extended-is-hidden"),H.classList.remove("filter__extended-is-hidden")})}function qe(){const e=document.querySelector(".filter-price-list");if(e){let t=function(){const C=l(h),_=l(u);i.style.left=`${C}%`,a.style.left=`${_}%`,s.style.left=`${C}%`,s.style.right=`${100-_}%`,d.textContent=`${h}€`,g.textContent=`${u}€`},n=function(C,_){const w=o.getBoundingClientRect(),b=$=>{let T=($.clientX-w.left)/w.width*100;T=Math.max(0,Math.min(100,T));const k=m(T);_?h=Math.min(k,u):u=Math.max(k,h),t(),r()},y=()=>{document.removeEventListener("mousemove",b),document.removeEventListener("mouseup",y)};document.addEventListener("mousemove",b),document.addEventListener("mouseup",y)},r=function(){h===p&&u===f?(c.price.min=null,c.price.max=null):(c.price.min=h,c.price.max=u),A(c),L()};const o=e.querySelector(".filter-price-slider"),s=e.querySelector(".filter-price-range"),i=e.querySelector(".filter-price-thumb.left"),a=e.querySelector(".filter-price-thumb.right"),d=e.querySelector("#minPrice"),g=e.querySelector("#maxPrice"),p=200,f=3e3;let h=200,u=3e3;c.price.min!==null&&(h=c.price.min),c.price.max!==null&&(u=c.price.max);const l=C=>(C-p)/(f-p)*100,m=C=>Math.round(p+C/100*(f-p));i.addEventListener("mousedown",C=>n(C,!0)),a.addEventListener("mousedown",C=>n(C,!1)),t()}}let X=null;function Te(){const e=document.querySelector('[data-extended="regions"]');if(!e)return;const t=e.querySelector(".filter__extended-info-list-column-list"),n=e.querySelector(".filter__extended-info-list-column-hint");let r=[];X=async function(o){if(t.innerHTML="",ie(),!o){n.classList.remove("is-hidden"),n.textContent="Выберите сначала направление";return}r.length||(r=await ye());const s=r.find(d=>d.destination===o);n.classList.add("is-hidden");const i=s.regions.map(d=>`
  <li class="filter__extended-info-list-column-list-item" data-value="${d}">
    <svg class="filter__extended-info-list-column-list-item-check">
      <use href="${I}#icon-check-circle"></use>
    </svg>
    ${d}
  </li>
`).join("");t.innerHTML=i;const a=c.regions||[];t.querySelectorAll(".filter__extended-info-list-column-list-item").forEach(d=>{a.includes(d.dataset.value)&&d.classList.add("is-active")})},X(c.destination)}function Re(){document.querySelectorAll(".filter__extended-categoties").forEach(t=>{const n=t.dataset.extended,r=t.querySelector(".filter__extended-info-list-column-list");if(!r)return;const o=c[n]||[];r.querySelectorAll(".filter__extended-info-list-column-list-item").forEach(s=>{o.includes(s.dataset.value)&&s.classList.add("is-active")}),r.addEventListener("click",s=>{const i=s.target.closest(".filter__extended-info-list-column-list-item");if(!i)return;const a=i.dataset.value;if(!a)return;const d=c[n];d.includes(a)?(c[n]=d.filter(g=>g!==a),i.classList.remove("is-active")):(c[n].push(a),i.classList.add("is-active")),A(c),L(),ie()})})}const R=document.querySelector(".filter__extended-info-active-filter"),Ze=["category","meals","tourPackage","departureCity","regions"],Ge={category:"Категория размещения",meals:"Питание",tourPackage:"Состав тура",departureCity:"Вылет из",regions:"Регионы"},Me={category:{Budget:"2 звезды",Economy:"3 звезды",Standard:"4 звезды",Comfort:"5 звезд",Apartments:"Апартаменты"},meals:{no_meals:"Без питания",breakfast:"Завтрак",breakfast_dinner:"Затрак и ужин",full_board:"Завтрак, обед, ужин",all_inclusive:"Всё включено",ultra_all_inclusive:"Ультра: всё включено"},tourPackage:{package:"Туристический пакет",flight_only:"Только перелет"},departureCity:{tallinn:"Таллин",riga:"Рига",vilnius:"Вильнюс"},regions:{}};function ie(){if(!R)return;R.innerHTML="";const e=Ze.map(t=>{const n=c[t];return!Array.isArray(n)||n.length===0?"":`
        <div class="filter__extended-info-active-filter-item">
          <span class="filter__extended-info-active-filter-item-title">
            ${Ge[t]}:
          </span>
          <ul class="filter__extended-info-active-filter-item-values">
            ${n.map(r=>`<li>${Me[t]?.[r]||r}</li>`).join("")}
          </ul>
        </div>
      `}).join("");R.innerHTML=e}function A(e){const t=new URLSearchParams;e.destination&&t.set("destination",e.destination),e.days&&t.set("days",e.days),e.date&&t.set("date",e.date),e.guests.adults!==null&&t.set("adults",e.guests.adults),e.guests.children!==null&&t.set("children",e.guests.children),["category","meals","tourPackage","departureCity","regions"].forEach(r=>{e[r].length&&t.set(r,e[r].join(","))}),e.price.min!==null&&t.set("priceMin",e.price.min),e.price.max!==null&&t.set("priceMax",e.price.max);const n=`${window.location.pathname}?${t.toString()}`;window.history.replaceState({},"",n)}function We(){const e=new URLSearchParams(window.location.search);c.destination=e.get("destination")||"",c.days=e.get("days"),c.date=e.get("date"),c.guests.adults=e.get("adults")?Number(e.get("adults")):null,c.guests.children=e.get("children")?Number(e.get("children")):null,["category","meals","tourPackage","departureCity","regions"].forEach(t=>{const n=e.get(t);c[t]=n?n.split(","):[]}),c.price.min=e.get("priceMin")?Number(e.get("priceMin")):null,c.price.max=e.get("priceMax")?Number(e.get("priceMax")):null}function L(){localStorage.setItem("filtersState",JSON.stringify(c))}async function ke({destination:e,season:t,hotOffer:n,page:r=1,pageSize:o=6}={}){const s={"populate[tour_options][populate]":"imageTour","pagination[page]":r,"pagination[pageSize]":o,sort:"id:asc"};e&&e!=="Все страны"&&(s["filters[destination][$eq]"]=e),t&&(s["populate[tour_options][filters][season][$eq]"]=t),n&&(s["populate[tour_options][filters][hotOffer][$eq]"]=!0);const{data:i}=await v.get("/tours",{params:s});return i}function Ye(e){return e.data.map(t=>{const n=t.tour_options||[],r=n.length?Math.min(...n.map(s=>s.minPrice)):null,o=n.find(s=>s.imageTour?.url);return{id:t.id,destination:t.destination,region:t.regions?.[0]??"",priceFrom:r,image:o?o.imageTour.url:"/img/no-image.webp",optionsCount:n.length,dates:n.map(s=>({start:s.startDate,end:s.endDate}))}})}const j=document.querySelectorAll(".directions__filters input[type='checkbox']");let ae=null;async function le(){try{const e=await ke({destination:ae,page:1,pageSize:6}),t=Ye(e);ze(t)}catch(e){console.error("Ошибка загрузки туров",e)}}j.forEach(e=>{e.addEventListener("change",()=>{j.forEach(t=>t.checked=!1),e.checked=!0,ae=e.value==="Все страны"?null:e.value,le()})});function Q(e){return new Date(e).toLocaleDateString("ru-RU",{day:"2-digit",month:"long",year:"numeric"})}function ze(e){const t=document.querySelector(".directions__wrapper");t&&(t.innerHTML=e.map(n=>`
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
              ${Q(r.start)} – ${Q(r.end)}
            </p>
              
          `).join("")}
            </div>
            <svg width="24" height="24">
                <use href="${I}#icon-calendar"></use>
            </svg>
        </div>
        <div class="directions__btn-wrapper">
        <a href="/ClubTravel/html/pages/hotelPage.html?id=${n.id}"  class="directions__tour-card-btn">
          ВЫБРАТЬ ТУР
        </a>
        </div>
      </div>
    </article>
  `).join(""))}le();async function ce(){const{data:e}=await v.get("/news-homes",{params:{populate:{images:!0},sort:["publishedAt:desc"]}});return e.data}function Be(e){const t=document.querySelector(".news-page__slider-wrapper");if(!t)return;t.innerHTML="";const n=v.defaults.baseURL.replace(/\/api$/,"");e.forEach(r=>{const{title:o,price:s,date:i,images:a}=r,d=a?.url?n+a.url:"",g=document.createElement("div");g.className="news-home__card",g.innerHTML=`
      <div class="news-home__image">
        <img src="${d}" alt="${o}" />

        ${s?`<p class="news-home__price">от <span>${s}</span></p>`:""}

        ${i?`
            <div class="news-home__date-wrapper">
              <svg width="16" height="16">
                <use href="${I}#icon-clock"></use>
              </svg>
              <p>${je(i)}</p>
            </div>
            `:""}
      </div>

      <div class="news-home__content">
        <p class="news-home__title-card">${o}</p>
      </div>
    `,t.appendChild(g)})}function je(e){return new Date(e).toLocaleDateString("ru-RU",{day:"numeric",month:"long",year:"numeric"})}document.addEventListener("DOMContentLoaded",async()=>{const e=await ce();Be(e)});D.use([K]);function Qe(){document.querySelectorAll("[data-swiper]").forEach(e=>{if(e.swiper)return;const t=e.closest(".news-home__slider-wrapper");if(!t)return;const n=t.querySelector(".news-home__button-prev"),r=t.querySelector(".news-home__button-next");new D(e,{slidesPerView:1,spaceBetween:16,speed:600,navigation:{prevEl:n,nextEl:r},breakpoints:{768:{slidesPerView:2,spaceBetween:20},1024:{slidesPerView:3,spaceBetween:27}}})})}function Fe(){const e=document.querySelector(".news-home__slider-wrapper");if(!e)return null;const t=e.querySelector(".news-home__button-prev"),n=e.querySelector(".news-home__button-next");if(!t||!n)return null;const r=document.createElement("div");return r.className="swiper news-home__swiper",r.setAttribute("data-swiper",""),r.innerHTML=`
    <div class="swiper-wrapper"></div>
  `,e.insertBefore(r,n),r.querySelector(".swiper-wrapper")}function Ve(e){const t=Fe();t&&e.forEach(n=>{const{title:r,price:o,date:s,images:i}=n,a=v.defaults.baseURL.replace(/\/api$/,""),d=i?.url?a+i.url:"",g=document.createElement("div");g.className="swiper-slide",g.innerHTML=`
      <div class="news-home__card">
        <div class="news-home__image">
          <img src="${d}" alt="${r}" />

          ${o?`<p class="news-home__price">от <span>${o}</span></p>`:""}

          ${s?`
              <div class="news-home__date-wrapper">
                <svg width="16" height="16">
                  <use href="${I}#icon-clock"></use>
                </svg>
                <p>${Je(s)}</p>
              </div>
              `:""}
        </div>

        <div class="news-home__content">
          <p class="news-home__title-card">${r}</p>
        </div>
      </div>
    `,t.appendChild(g)})}function Je(e){return new Date(e).toLocaleDateString("ru-RU",{day:"numeric",month:"long",year:"numeric"})}document.addEventListener("DOMContentLoaded",async()=>{const e=await ce();Ve(e),Qe()});const Oe=document.querySelector(".winter-homepage-swiper"),Ue=document.querySelector(".summer-homepage-swiper");Oe&&de({containerSelector:".winter-homepage-swiper",prevBtn:".winter-homepage-prev",nextBtn:".winter-homepage-next",season:"winter"});Ue&&de({containerSelector:".summer-homepage-swiper",prevBtn:".summer-homepage-prev",nextBtn:".summer-homepage-next",season:"summer"});async function de({containerSelector:e,prevBtn:t,nextBtn:n,season:r}){const o=document.querySelector(`${e} .swiper-wrapper`),s=await Le(r);o.innerHTML=s.map(a=>Ke(a)).join(""),new D(e,{direction:"horizontal",keyboard:{enabled:!0,onlyInViewport:!0},modules:[O,U,K],resizeObserver:!0,observer:!0,observeParents:!0,navigation:{nextEl:n,prevEl:t},loop:!0,breakpoints:{0:{slidesPerView:1,spaceBetween:20},620:{slidesPerView:2,spaceBetween:20},768:{slidesPerView:3,spaceBetween:20},1366:{slidesPerView:4,spaceBetween:20},1440:{slidesPerView:4,spaceBetween:23},1920:{slidesPerView:5,spaceBetween:30}}}).update()}function Ke(e){function t(s){return`http://localhost:1337${s.image.url}`||`http://localhost:1337${s.image.formats?.small?.url}`||`http://localhost:1337${s.tour_option?.imageTour?.url}`||s.image?.url||s.tour_option?.imageTour?.url||s.tour_option?.imageTour?.formats?.small?.url||s.tour_option?.imageTour?.formats?.thumbnail?.url}const n=e.tour?.destination,r=e.tour_option?.minPrice;return`
        <div class="winter-summer-home__slider-swiper-slide swiper-slide">
          <div class="winter-summer-home__slider-swiper-slide-image">
            <img src="${t(e)}" alt="${n}" />
          </div>
          <div class="winter-summer-home__slider-swiper-slide-info">
            <div class="winter-summer-home__slider-swiper-slide-info-text">
              <p class="winter-summer-home__slider-swiper-slide-info-text-dest">
                <svg>
                  <use href="${I}#icon-point"></use>
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
	`}const G=document.querySelector(".tabletHot"),x=G.querySelector(".tabletHot__table-tbody");let F=[],M=[];const et={tallinn:"Таллин",riga:"Рига",vilnius:"Вильнус"},ue={no_meals:"Без питания",breakfast:"Завтрак",breakfast_dinner:"Завтрак и ужин",full_board:"Завтрак, обед, ужин",all_inclusive:"Всё включено",ultra_all_inclusive:"Ультра: всё включено"},ge={package:"Туристический пакет",flight_only:"Только перелет"};if(G){const e=await te();M=e,nt(e),st(),at()}function tt(e){const t=new Map;return e.forEach(n=>{const r=n.tour_option;r?.id&&(t.has(r.id)||t.set(r.id,{...r,tour:n.tour}))}),Array.from(t.values())}function nt(e){F=tt(e),x.innerHTML="";const t=F.map(n=>rt(n)).join("");x.innerHTML=t}function rt(e){const t=e.id,n=Z(e.startDate),r=et[e.departureCity]||e.departureCity,o=e.tour?.destination,s=e.days+" дн.",i=e.minPrice;return`
  <div class="tabletHot__table-tbody-row" data-option-id="${t}">
  <ul class="tabletHot__table-tbody-row-list">
    <li>${n}</li>
		<li>${r}</li>
		<li>${o}</li>
		<li>${s}</li>
		<li>от <span>${i}€</span>/чел</li>
		<li>
			<button
				class="tabletHot__table-tbody-btn"
				style="--btn-width: 160px; --btn-height: 42px"
        data-option-id="${t}"
			>
				Открыть
			</button>
		</li>
  </ul>
  <div class="tabletHot__table-two"></div>
	</div>

	`}function st(){x.addEventListener("click",e=>{const t=e.target.closest(".tabletHot__table-tbody-btn");if(!t)return;const n=Number(t.dataset.optionId),r=t.closest(".tabletHot__table-tbody-row"),o=r.querySelector(".tabletHot__table-two"),s=M.filter(a=>a.tour_option?.id===n),i=r.classList.contains("is-open");G.querySelectorAll(".tabletHot__table-tbody-row.is-open").forEach(a=>{a.classList.remove("is-open"),a.querySelector(".tabletHot__table-two").innerHTML="",a.querySelector(".tabletHot__table-tbody-btn").textContent="Открыть"}),!i&&(o.innerHTML=ot(s),r.classList.add("is-open"),t.textContent="Закрыть")})}function ot(e){return`
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
    ${e.map(t=>it(t)).join("")}
    </div>
  </div>
  `}function V(e,t,n){if(!Array.isArray(e)||e.length===0)return"-";const r=e.map(o=>o?.[t]).map(o=>n?.[o]||o);return r.length===0?"-":[...new Set(r)].join(", ")}function it(e){const t=e.id,n=e.nameHotel,r=q(e.category),o=V(e.hotel_options,"meals",ue),s=V(e.hotel_options,"tourPackage",ge),i=e.tour_option?.minPrice;return`
    <div class="tabletHot__table-two-hotels-tbody-row" data-hotel-id="${t}">
      <ul class="tabletHot__table-two-hotels-tbody-row-list">
      <li class="tabletHot__table-two-hotels-tbody-row-list-link">${n}</li>
      <li>${r}</li>
      <li>${o}</li>
      <li>${s}</li>
      <li>от <span>${i}€</span>/чел</li>
      <li>
        <button class="tabletHot__table-two-hotels-tbody-btn"
        data-hotel-id="${t}"
        >
          <p>открыть предложения</p>
          <svg>
          <use href="${I}#icon-drop-down"></use>
          </svg>
        </button>
      </li>
      </ul>
      <div class="tabletHot__table-three"></div>
    </div>
  `}function at(){x.addEventListener("click",e=>{const t=e.target.closest(".tabletHot__table-two-hotels-tbody-btn");if(!t)return;const n=Number(t.dataset.hotelId),r=t.closest(".tabletHot__table-two-hotels-tbody-row"),o=r.querySelector(".tabletHot__table-three"),s=M.find(a=>a.id===n);if(!s)return;const i=r.classList.contains("is-open");x.querySelectorAll(".tabletHot__table-two-hotels-tbody-row.is-open").forEach(a=>{a.classList.remove("is-open"),a.querySelector(".tabletHot__table-three").innerHTML="",a.querySelector(".tabletHot__table-two-hotels-tbody-btn p").textContent="открыть предложения"}),!i&&(o.innerHTML=lt(s),r.classList.add("is-open"),t.querySelector("p").textContent="скрыть предложения")})}function lt(e){return`
    <div class="tabletHot__table-three-tbody">
      ${e.hotel_options.map(t=>ct(t,e)).join("")}
    </div>
  `}function ct(e,t){const n=e.id,r=t.nameHotel,o=q(t.category),s=ue?.[e.meals]||e.meals||"-",i=ge?.[e.tourPackage]||e.tourPackage||"-",a=e.price||t.tour_option?.minPrice||"-";return`
    <ul class="tabletHot__table-three-tbody-row" data-hotel-option-id="${n}">
      <li class="tabletHot__table-three-tbody-row-name">
          ➞  
          ${r}
      </li>
      <li>${o}</li>
      <li>${s}</li>
      <li>${i}</li>
      <li><span>${a}€</span>/чел</li>
      <li>
        <button class="button-org tabletHot__table-three-tbody-btn"
        style="--btn-width: 160px; --btn-height: 28px"
        data-hotel-option-id="${n}"
        >
          выбрать
        </button>
      </li>
    </ul>
  `}async function dt(e,t){return(await v.post("/auth/local/register",{username:e,email:e,password:t})).data}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("registerForm");if(!e)return;const t=new J("#registerForm",{errorFieldCssClass:"is-error",errorLabelCssClass:"login__error",focusInvalidField:!0,lockForm:!0});t.addField('[name="email"]',[{rule:"required",errorMessage:"Введите e-mail"},{rule:"email",errorMessage:"Некорректный e-mail"}]).addField('[name="password"]',[{rule:"required",errorMessage:"Введите пароль"},{rule:"minLength",value:8,errorMessage:"Минимум 8 символов"},{validator:n=>/[A-Za-z]/.test(n)&&/\d/.test(n),errorMessage:"Пароль должен содержать букву и цифру"}]).addField('[name="passwordRepeat"]',[{rule:"required",errorMessage:"Повторите пароль"},{validator:(n,r)=>n===r['[name="password"]'].elem.value,errorMessage:"Пароли не совпадают"}]).onSuccess(async n=>{n.preventDefault();const r=e.email.value.trim(),o=e.password.value;try{const s=await dt(r,o);localStorage.setItem("jwt",s.jwt),window.location.replace("/ClubTravel/html/pages/accountPage.html")}catch(s){const i=s.response?.data?.error?.message||"Ошибка регистрации";t.showErrors({'[name="email"]':i})}})});async function ut(e){return(await v.post("/auth/forgot-password",{email:e})).data}const E=document.getElementById("forgotForm");E&&E.addEventListener("submit",async e=>{e.preventDefault();try{await ut(E.email.value),E.reset(),alert("Письмо отправлено")}catch{alert("Ошибка")}});
