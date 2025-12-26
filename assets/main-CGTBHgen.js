import{a as x,f as M,r as I,S as q,N as T}from"./vendor-CYiRW1wK.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=o(n);fetch(n.href,r)}})();document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".open-menu"),t=document.querySelector(".mob-menu");!e||!t||(e.addEventListener("click",()=>{t.classList.toggle("is-open")}),t.addEventListener("click",o=>{o.target===t&&t.classList.remove("is-open")}))});const L=x.create({baseURL:"http://localhost:1337/api",headers:{"Content-Type":"application/json"}});async function D(e,t){return(await L.post("/auth/local",{identifier:e,password:t})).data}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("loginForm");e&&e.addEventListener("submit",async t=>{t.preventDefault();const o=e.email.value.trim(),a=e.password.value;if(!o||!a){alert("Введите email и пароль");return}try{const n=await D(o,a);localStorage.setItem("jwt",n.jwt),window.location.replace("/ClubTravel/html/pages/accountPage.html")}catch(n){const r=n.response?.data?.error?.message||"Неверный email или пароль";alert(r)}})});function B(){const e=localStorage.getItem("jwt");return typeof e=="string"&&e.length>0}document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".header__top-bar-profile-link");e&&(e.href=B()?"/ClubTravel/html/pages/accountPage.html":"/ClubTravel/html/pages/loginPage.html")});async function O({page:e=1,pageSize:t=5}){const o=localStorage.getItem("jwt");if(!o)throw new Error("Нет JWT");return(await L.get("/orders",{headers:{Authorization:`Bearer ${o}`},params:{populate:"user",pagination:{page:e,pageSize:t},sort:"createdAt:desc"}})).data}const k=5;function P(e){if(!e)return"—";const t=new Date(e),o=t.getDate(),a=t.getFullYear(),n=t.toLocaleString("ru-RU",{month:"long"}),r=String(t.getHours()).padStart(2,"0"),i=String(t.getMinutes()).padStart(2,"0");return`${o} ${n} ${a} ${r}:${i}`}function N(e){const t=e.charter==="Оплачено"?"order-status--paid":"order-status--processing";return`
    <tr>
      <td>${e.orderNumber}</td>
      <td>${e.totalPrice.toFixed(2)}</td>
      <td>${e.user?.email??"—"}</td>
      <td>
        <span class="order-status ${t}">
          ${e.charter}
        </span>
      </td>
      <td>${P(e.date)}</td>
    </tr>
  `}function A(e){const t=e.charter==="Оплачено"?"order-status--paid":"order-status--processing";return`
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
      <div>Дата<span>${P(e.date)}</span></div>
    </div>
  `}function j(e,t,o){const a=document.getElementById("ordersPagination");if(!a)return;const{page:n,pageCount:r,total:i}=e.pagination;a.innerHTML=`
      <p class="account__pagination-info">
        Показано ${t} из ${i}
      </p>
     <div class="account__pagination-btns-wrapper">
      <button
        class="account__pagination-btn"
        ${n===1?"disabled":""}
        data-action="prev"
      >
        Назад
      </button>

      <div class="account__pagination-page">
      <p class="account__pagination-text">Страница</p>
      <p class="account__pagination-current">${n}</p>
      <p class="account__pagination-text">из ${r}</p>
      </div>

      <button
        class="account__pagination-btn"
        ${n===r?"disabled":""}
        data-action="next"
      >
        Вперёд
      </button>
      </div>
  `,a.onclick=c=>{const s=c.target.dataset.action;s&&(s==="prev"&&n>1&&o(n-1),s==="next"&&n<r&&o(n+1))}}document.addEventListener("DOMContentLoaded",async()=>{const e=document.getElementById("ordersList"),t=document.getElementById("ordersPagination");if(!e||!t)return;let o=1;async function a(n){try{const{data:r,meta:i}=await O({page:n,pageSize:k});if(!r.length){e.innerHTML='<tr><td colspan="5">Заказов нет</td></tr>',t.innerHTML="";return}e.innerHTML=r.map(N).join("");const c=document.getElementById("ordersCards");c&&(c.innerHTML=r.map(A).join("")),j(i,r.length,s=>{o=s,a(o)})}catch(r){console.error("Ошибка загрузки заказов:",r),e.innerHTML='<tr><td colspan="5">Ошибка загрузки заказов</td></tr>'}}a(o)});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".account__btn-exit");e&&e.addEventListener("click",()=>{localStorage.removeItem("jwt"),localStorage.removeItem("user"),window.location.replace("/ClubTravel/html/pages/loginPage.html")})});const y=document.querySelector(".filter");if(y){let e=function(c=null){r.forEach(s=>{s!==c&&s.classList.remove("is-open")})};const t=y.querySelector(".filter__section-form-date__trigger-input"),o=y.querySelector(".filter__section-form-date__trigger"),a=y.querySelector(".filter__section-form-date__trigger-value"),n=M(t,{locale:I.Russian,minDate:"today",dateFormat:"Y-m-d",allowInput:!1,onChange(c){if(!c.length)return;const s=c[0],l=s.getDate(),u=s.getFullYear(),d=s.toLocaleString("ru-RU",{month:"long"});a.textContent=`${l} ${d} ${u}`}});o.addEventListener("click",()=>{n.open()});const r=y.querySelectorAll(".filter__section-form-item-variant:not(.filter__section-form-guests-variant)");r.forEach(c=>{const s=c.querySelector(".filter__section-form-item-variant__trigger"),l=c.querySelector(".filter__section-form-item-variant__dropdown"),u=s.querySelector("span"),d=c.querySelector("input[type='hidden']");!l||!s||!u||!d||(s.addEventListener("click",p=>{p.stopPropagation(),e(c),c.classList.toggle("is-open")}),l.querySelectorAll("li").forEach(p=>{p.addEventListener("click",()=>{const v=p.dataset.value??p.getAttribute("value")??"";u.textContent=p.textContent,d.value=v,c.classList.remove("is-open")})}))}),document.addEventListener("click",()=>e());const i=y.querySelector(".filter__section-form-guests-variant");if(i){let c=function(){const f=+p.value||0,g=+v.value||0;if(!f&&!g){u.textContent="Любое к-ство",d.value="";return}const _=[];f&&_.push(`Взрослых: ${f}`),g&&_.push(`детей: ${g}`),u.textContent=_.join("; "),d.value=JSON.stringify({adults:f,children:g})};const s=i.querySelector(".filter__section-form-guests-variant__trigger"),l=i.querySelector(".filter__section-form-guests-variant__dropdown"),u=s.querySelector("span"),d=i.querySelector("input[name='filter-guests']"),p=l.querySelector("input[name='filter-adults']"),v=l.querySelector("input[name='filter-children']"),m=l.querySelector("li"),w=l.querySelectorAll("li > div");s.addEventListener("click",f=>{f.stopPropagation(),e(),i.classList.toggle("is-open")}),l.addEventListener("click",f=>f.stopPropagation()),m.addEventListener("click",()=>{p.value="",v.value="",u.textContent="Любое к-ство",d.value="",i.classList.remove("is-open")}),p.addEventListener("input",c),v.addEventListener("input",c),w.forEach(f=>{f.addEventListener("click",g=>{g.target.tagName!=="INPUT"&&i.classList.remove("is-open")})})}}const b=document.querySelector(".button-form-search-link");b&&b.addEventListener("click",e=>{if(e.preventDefault(),!window.location.pathname.endsWith("searchPage.html")){const o="/ClubTravel/";window.location.href=`${o}html/pages/searchPage.html`}});const h=document.querySelector(".filter-price-list");if(h){let e=function(){const m=p(u),w=p(d);n.style.left=`${m}%`,r.style.left=`${w}%`,a.style.left=`${m}%`,a.style.right=`${100-w}%`,i.textContent=`${u}€`,c.textContent=`${d}€`},t=function(m,w){const f=o.getBoundingClientRect(),g=C=>{let E=(C.clientX-f.left)/f.width*100;E=Math.max(0,Math.min(100,E));const $=v(E);w?u=Math.min($,d):d=Math.max($,u),e()},_=()=>{document.removeEventListener("mousemove",g),document.removeEventListener("mouseup",_)};document.addEventListener("mousemove",g),document.addEventListener("mouseup",_)};const o=h.querySelector(".filter-price-slider"),a=h.querySelector(".filter-price-range"),n=h.querySelector(".filter-price-thumb.left"),r=h.querySelector(".filter-price-thumb.right"),i=h.querySelector("#minPrice"),c=h.querySelector("#maxPrice"),s=200,l=3e3;let u=200,d=3e3;const p=m=>(m-s)/(l-s)*100,v=m=>Math.round(s+m/100*(l-s));n.addEventListener("mousedown",m=>t(m,!0)),r.addEventListener("mousedown",m=>t(m,!1)),e()}async function R(){const{data:e}=await L.get("/news-homes",{params:{populate:{images:!0},sort:["publishedAt:desc"]}});return e.data}q.use([T]);function H(){document.querySelectorAll("[data-swiper]").forEach(e=>{if(e.swiper)return;const t=e.closest(".news-home__slider-wrapper");if(!t)return;const o=t.querySelector(".news-home__button-prev"),a=t.querySelector(".news-home__button-next");new q(e,{slidesPerView:1,spaceBetween:16,speed:600,navigation:{prevEl:o,nextEl:a},breakpoints:{768:{slidesPerView:2,spaceBetween:20},1024:{slidesPerView:3,spaceBetween:27}}})})}function F(){const e=document.querySelector(".news-home__slider-wrapper");if(!e)return null;const t=e.querySelector(".news-home__button-prev"),o=e.querySelector(".news-home__button-next");if(!t||!o)return null;const a=document.createElement("div");return a.className="swiper news-home__swiper",a.setAttribute("data-swiper",""),a.innerHTML=`
    <div class="swiper-wrapper"></div>
  `,e.insertBefore(a,o),a.querySelector(".swiper-wrapper")}function U(e){const t=F();t&&e.forEach(o=>{const{title:a,price:n,date:r,images:i}=o,c=i?.url?`http://localhost:1337${i.url}`:"",s=document.createElement("div");s.className="swiper-slide",s.innerHTML=`
      <div class="news-home__card">
        <div class="news-home__image">
          <img src="${c}" alt="${a}" />

          ${n?`<p class="news-home__price">от <span>${n}</span></p>`:""}

          ${r?`
              <div class="news-home__date-wrapper">
                <svg width="16" height="16">
                  <use href="./img/sprite.svg#icon-clock"></use>
                </svg>
                <p>${V(r)}</p>
              </div>
              `:""}
        </div>

        <div class="news-home__content">
          <p class="news-home__title-card">${a}</p>
        </div>
      </div>
    `,t.appendChild(s)})}function V(e){return new Date(e).toLocaleDateString("ru-RU",{day:"numeric",month:"long",year:"numeric"})}document.addEventListener("DOMContentLoaded",async()=>{const e=await R();U(e),H()});async function z(e,t){return(await L.post("/auth/local/register",{username:e,email:e,password:t})).data}function W(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}function Y(e){return e.length>=8&&/[A-Za-z]/.test(e)&&/\d/.test(e)}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("registerForm");e&&e.addEventListener("submit",async t=>{t.preventDefault();const o=e.email.value.trim(),a=e.password.value,n=e.passwordRepeat.value;if(!o){alert("Введите email");return}if(!W(o)){alert("Некорректный email");return}if(!a){alert("Введите пароль");return}if(!Y(a)){alert("Пароль должен быть минимум 8 символов и содержать букву и цифру");return}if(a!==n){alert("Пароли не совпадают");return}try{const r=await z(o,a);localStorage.setItem("jwt",r.jwt),window.location.replace("/ClubTravel/html/pages/accountPage.html")}catch(r){const i=r.response?.data?.error?.message||"Ошибка регистрации";alert(i)}})});async function G(e){return(await L.post("/auth/forgot-password",{email:e})).data}const S=document.getElementById("forgotForm");S&&S.addEventListener("submit",async e=>{e.preventDefault();try{await G(S.email.value),S.reset(),alert("Письмо отправлено")}catch{alert("Ошибка")}});
