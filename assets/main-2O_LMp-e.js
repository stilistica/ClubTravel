import{a as N,J as I,f as j,r as R,S as F,N as U}from"./vendor-2n-u-6o3.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".open-menu"),t=document.querySelector(".mob-menu");!e||!t||(e.addEventListener("click",()=>{t.classList.toggle("is-open")}),t.addEventListener("click",n=>{n.target===t&&t.classList.remove("is-open")}))});const L=N.create({baseURL:"https://thankful-garden-94c969a4ca.strapiapp.com/api",headers:{"Content-Type":"application/json"}});async function V(e,t){return(await L.post("/auth/local",{identifier:e,password:t})).data}function z(){const e=localStorage.getItem("jwt");return typeof e=="string"&&e.length>0}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("loginForm");if(!e)return;const t=new I("#loginForm",{errorFieldCssClass:"is-error",errorLabelCssClass:"login__error",focusInvalidField:!0,lockForm:!0});t.addField('[name="email"]',[{rule:"required",errorMessage:"Введите e-mail"},{rule:"email",errorMessage:"Некорректный e-mail"}]).addField('[name="password"]',[{rule:"required",errorMessage:"Введите пароль"}]).onSuccess(async n=>{n.preventDefault();const s=e.email.value.trim(),o=e.password.value;try{const r=await V(s,o);localStorage.setItem("jwt",r.jwt),window.location.replace("/ClubTravel/html/pages/accountPage.html")}catch(r){t.showErrors({'[name="password"]':r.message})}})});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".header__top-bar-profile-link");e&&(e.href=z()?"/ClubTravel/html/pages/accountPage.html":"/ClubTravel/html/pages/loginPage.html")});async function J({page:e=1,pageSize:t=5}){const n=localStorage.getItem("jwt");if(!n)throw new Error("Нет JWT");return(await L.get("/orders",{headers:{Authorization:`Bearer ${n}`},params:{populate:"user",pagination:{page:e,pageSize:t},sort:"createdAt:desc"}})).data}const W=5;function D(e){if(!e)return"—";const t=new Date(e),n=t.getDate(),s=t.getFullYear(),o=t.toLocaleString("ru-RU",{month:"long"}),r=String(t.getHours()).padStart(2,"0"),i=String(t.getMinutes()).padStart(2,"0");return`${n} ${o} ${s} ${r}:${i}`}function Y(e){const t=e.charter==="Оплачено"?"order-status--paid":"order-status--processing";return`
    <tr>
      <td>${e.orderNumber}</td>
      <td>${e.totalPrice.toFixed(2)}</td>
      <td>${e.user?.email??"—"}</td>
      <td>
        <span class="order-status ${t}">
          ${e.charter}
        </span>
      </td>
      <td>${D(e.date)}</td>
    </tr>
  `}function G(e){const t=e.charter==="Оплачено"?"order-status--paid":"order-status--processing";return`
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
      <div>Дата<span>${D(e.date)}</span></div>
    </div>
  `}function K(e,t,n){const s=document.getElementById("ordersPagination");if(!s)return;const{page:o,pageCount:r,total:i}=e.pagination;s.innerHTML=`
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
      <p class="account__pagination-text">из ${r}</p>
      </div>

      <button
        class="account__pagination-btn"
        ${o===r?"disabled":""}
        data-action="next"
      >
        Вперёд
      </button>
      </div>
  `,s.onclick=a=>{const c=a.target.dataset.action;c&&(c==="prev"&&o>1&&n(o-1),c==="next"&&o<r&&n(o+1))}}document.addEventListener("DOMContentLoaded",async()=>{const e=document.getElementById("ordersList"),t=document.getElementById("ordersPagination");if(!e||!t)return;let n=1;async function s(o){try{const{data:r,meta:i}=await J({page:o,pageSize:W});if(!r.length){e.innerHTML='<tr><td colspan="5">Заказов нет</td></tr>',t.innerHTML="";return}e.innerHTML=r.map(Y).join("");const a=document.getElementById("ordersCards");a&&(a.innerHTML=r.map(G).join("")),K(i,r.length,c=>{n=c,s(n)})}catch(r){console.error("Ошибка загрузки заказов:",r),e.innerHTML='<tr><td colspan="5">Ошибка загрузки заказов</td></tr>'}}s(n)});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".account__btn-exit");e&&e.addEventListener("click",()=>{localStorage.removeItem("jwt"),localStorage.removeItem("user"),window.location.replace("/ClubTravel/html/pages/loginPage.html")})});async function Z(){const{data:e}=await L.get("/tours");return e.data}const B="/ClubTravel/assets/sprite-xjNdH9vZ.svg",y=document.querySelector(".filter"),d={destination:"",days:null,date:null,guests:{adults:null,children:null},category:[],meals:[],tourPackage:[],departureCity:[],price:{min:null,max:null},regions:[]},X={"filter-destination":"destination","filter-days":"days","filter-date":"date","filter-guests":"guests"};if(y){let e=function(a=null){r.forEach(c=>{c!==a&&c.classList.remove("is-open")})};const t=y.querySelector(".filter__section-form-date__trigger-input"),n=y.querySelector(".filter__section-form-date__trigger"),s=y.querySelector(".filter__section-form-date__trigger-value"),o=j(t,{locale:R.Russian,minDate:"today",dateFormat:"Y-m-d",allowInput:!1,onChange(a){if(!a.length)return;const c=a[0],f=c.getDate(),u=c.getFullYear(),g=c.toLocaleString("ru-RU",{month:"long"});s.textContent=`${f} ${g} ${u}`,d.date=c.toISOString().split("T")[0]}});n.addEventListener("click",()=>{o.open()});const r=y.querySelectorAll(".filter__section-form-item-variant:not(.filter__section-form-guests-variant)");r.forEach(a=>{const f=a.closest(".filter__section-form-item").dataset.name,u=X[f],g=a.querySelector(".filter__section-form-item-variant__trigger"),m=a.querySelector(".filter__section-form-item-variant__dropdown"),p=g.querySelector("span"),h=a.querySelector("input[type='hidden']");!m||!g||!p||!h||(g.addEventListener("click",_=>{_.stopPropagation(),e(a),a.classList.toggle("is-open")}),m.querySelectorAll("li").forEach(_=>{_.addEventListener("click",()=>{const l=_.dataset.value??_.getAttribute("value")??"";p.textContent=_.textContent,h.value=l,d[u]=l||null,u==="destination"&&(d.regions=[],x&&x(l)),a.classList.remove("is-open")})}))}),document.addEventListener("click",()=>e());const i=y.querySelector(".filter__section-form-guests-variant");if(i){let a=function(){const l=+m.value||0,v=+p.value||0;if(!l&&!v){u.textContent="Любое к-ство",g.value="";return}const w=[];l&&w.push(`Взрослых: ${l}`),v&&w.push(`детей: ${v}`),u.textContent=w.join("; "),d.guests.adults=l,d.guests.children=v};const c=i.querySelector(".filter__section-form-guests-variant__trigger"),f=i.querySelector(".filter__section-form-guests-variant__dropdown"),u=c.querySelector("span"),g=i.querySelector("input[name='filter-guests']"),m=f.querySelector("input[name='filter-adults']"),p=f.querySelector("input[name='filter-children']"),h=f.querySelector("li"),_=f.querySelectorAll("li > div");c.addEventListener("click",l=>{l.stopPropagation(),e(),i.classList.toggle("is-open")}),f.addEventListener("click",l=>l.stopPropagation()),h.addEventListener("click",()=>{m.value="",p.value="",u.textContent="Любое к-ство",d.guests.adults=null,d.guests.children=null,i.classList.remove("is-open")}),m.addEventListener("input",a),p.addEventListener("input",a),_.forEach(l=>{l.addEventListener("click",v=>{v.target.tagName!=="INPUT"&&i.classList.remove("is-open")})})}}const T=document.querySelector(".button-form-search-link");T&&T.addEventListener("click",e=>{if(e.preventDefault(),window.location.pathname.endsWith("searchPage.html"))console.log(d);else{const n="/ClubTravel/";window.location.href=`${n}html/pages/searchPage.html`}});const S=document.querySelector(".filter__extended-btn"),E=document.querySelector(".filter__extended-info");if(S&&E){S.addEventListener("click",()=>{S.classList.add("filter__extended-is-hidden"),E.classList.remove("filter__extended-is-hidden"),te(),Q(),ee()});const e=E.querySelector(".filter__extended-info-title-close");e&&e.addEventListener("click",()=>{E.classList.add("filter__extended-is-hidden"),S.classList.remove("filter__extended-is-hidden")})}function Q(){const e=document.querySelector(".filter-price-list");if(e){let t=function(){const l=h(m),v=h(p);i.style.left=`${l}%`,a.style.left=`${v}%`,r.style.left=`${l}%`,r.style.right=`${100-v}%`,c.textContent=`${m}€`,f.textContent=`${p}€`},n=function(l,v){const w=o.getBoundingClientRect(),C=A=>{let q=(A.clientX-w.left)/w.width*100;q=Math.max(0,Math.min(100,q));const P=_(q);v?m=Math.min(P,p):p=Math.max(P,m),t(),s()},M=()=>{document.removeEventListener("mousemove",C),document.removeEventListener("mouseup",M)};document.addEventListener("mousemove",C),document.addEventListener("mouseup",M)},s=function(){m===u&&p===g?(d.price.min=null,d.price.max=null):(d.price.min=m,d.price.max=p)};const o=e.querySelector(".filter-price-slider"),r=e.querySelector(".filter-price-range"),i=e.querySelector(".filter-price-thumb.left"),a=e.querySelector(".filter-price-thumb.right"),c=e.querySelector("#minPrice"),f=e.querySelector("#maxPrice"),u=200,g=3e3;let m=200,p=3e3;const h=l=>(l-u)/(g-u)*100,_=l=>Math.round(u+l/100*(g-u));i.addEventListener("mousedown",l=>n(l,!0)),a.addEventListener("mousedown",l=>n(l,!1)),t()}}let x=null;function ee(){const e=document.querySelector('[data-extended="regions"]');if(!e)return;const t=e.querySelector(".filter__extended-info-list-column-list"),n=e.querySelector(".filter__extended-info-list-column-hint");let s=[];x=async function(o){if(t.innerHTML="",O(),!o){n.classList.remove("is-hidden"),n.textContent="Выберите сначала направление";return}s.length||(s=await Z());const r=s.find(a=>a.destination===o);n.classList.add("is-hidden");const i=r.regions.map(a=>`
  <li class="filter__extended-info-list-column-list-item" data-value="${a}">
    <svg class="filter__extended-info-list-column-list-item-check">
      <use href="${B}#icon-check-circle"></use>
    </svg>
    ${a}
  </li>
`).join("");t.innerHTML=i},x(d.destination)}function te(){document.querySelectorAll(".filter__extended-categoties").forEach(t=>{const n=t.dataset.extended,s=t.querySelector(".filter__extended-info-list-column-list");s&&s.addEventListener("click",o=>{const r=o.target.closest(".filter__extended-info-list-column-list-item");if(!r)return;const i=r.dataset.value;if(!i)return;const a=d[n];a.includes(i)?(d[n]=a.filter(c=>c!==i),r.classList.remove("is-active")):(d[n].push(i),r.classList.add("is-active")),O()})})}const b=document.querySelector(".filter__extended-info-active-filter"),ne=["category","meals","tourPackage","departureCity","regions"],re={category:"Категория размещения",meals:"Питание",tourPackage:"Состав тура",departureCity:"Вылет из",regions:"Регионы"},k={category:{Budget:"2 звезды",Economy:"3 звезды",Standard:"4 звезды",Comfort:"5 звезд",Apartments:"Апартаменты"},meals:{no_meals:"Без питания",breakfast:"Завтрак",breakfast_dinner:"Затрак и ужин",full_board:"Завтрак, обед, ужин",all_inclusive:"Всё включено",ultra_all_inclusive:"Ультра: всё включено"},tourPackage:{package:"Туристический пакет",flight_only:"Только перелет"},departureCity:{tallinn:"Таллин",riga:"Рига",vilnius:"Вильнюс"},regions:{}};function O(){if(!b)return;b.innerHTML="";const e=ne.map(t=>{const n=d[t];return!Array.isArray(n)||n.length===0?"":(n.map(s=>`<li>${k[t]?.[s]||s}</li>`).join(""),`
        <div class="filter__extended-info-active-filter-item">
          <span class="filter__extended-info-active-filter-item-title">
            ${re[t]}:
          </span>
          <ul class="filter__extended-info-active-filter-item-values">
            ${n.map(s=>`<li>${k[t]?.[s]||s}</li>`).join("")}
          </ul>
        </div>
      `)}).join("");b.innerHTML=e}async function H(){const{data:e}=await L.get("/news-homes",{params:{populate:{images:!0},sort:["publishedAt:desc"]}});return e.data}function se(e){const t=document.querySelector(".news-page__slider-wrapper");t&&(t.innerHTML="",e.forEach(n=>{const{title:s,price:o,date:r,images:i}=n,a=i?.url??"",c=document.createElement("div");c.className="news-home__card",c.innerHTML=`
      <div class="news-home__image">
        <img src="${a}" alt="${s}" />

        ${o?`<p class="news-home__price">от <span>${o}</span></p>`:""}

        ${r?`
            <div class="news-home__date-wrapper">
              <svg width="16" height="16">
                <use href="${B}#icon-clock"></use>
              </svg>
              <p>${oe(r)}</p>
            </div>
            `:""}
      </div>

      <div class="news-home__content">
        <p class="news-home__title-card">${s}</p>
      </div>
    `,t.appendChild(c)}))}function oe(e){return new Date(e).toLocaleDateString("ru-RU",{day:"numeric",month:"long",year:"numeric"})}document.addEventListener("DOMContentLoaded",async()=>{const e=await H();se(e)});F.use([U]);function ae(){document.querySelectorAll("[data-swiper]").forEach(e=>{if(e.swiper)return;const t=e.closest(".news-home__slider-wrapper");if(!t)return;const n=t.querySelector(".news-home__button-prev"),s=t.querySelector(".news-home__button-next");new F(e,{slidesPerView:1,spaceBetween:16,speed:600,navigation:{prevEl:n,nextEl:s},breakpoints:{768:{slidesPerView:2,spaceBetween:20},1024:{slidesPerView:3,spaceBetween:27}}})})}function ie(){const e=document.querySelector(".news-home__slider-wrapper");if(!e)return null;const t=e.querySelector(".news-home__button-prev"),n=e.querySelector(".news-home__button-next");if(!t||!n)return null;const s=document.createElement("div");return s.className="swiper news-home__swiper",s.setAttribute("data-swiper",""),s.innerHTML=`
    <div class="swiper-wrapper"></div>
  `,e.insertBefore(s,n),s.querySelector(".swiper-wrapper")}function ce(e){const t=ie();t&&e.forEach(n=>{const{title:s,price:o,date:r,images:i}=n,a=i?.url,c=document.createElement("div");c.className="swiper-slide",c.innerHTML=`
      <div class="news-home__card">
        <div class="news-home__image">
          <img src="${a}" alt="${s}" />

          ${o?`<p class="news-home__price">от <span>${o}</span></p>`:""}

          ${r?`
              <div class="news-home__date-wrapper">
                <svg width="16" height="16">
                  <use href="./img/sprite.svg#icon-clock"></use>
                </svg>
                <p>${le(r)}</p>
              </div>
              `:""}
        </div>

        <div class="news-home__content">
          <p class="news-home__title-card">${s}</p>
        </div>
      </div>
    `,t.appendChild(c)})}function le(e){return new Date(e).toLocaleDateString("ru-RU",{day:"numeric",month:"long",year:"numeric"})}document.addEventListener("DOMContentLoaded",async()=>{const e=await H();ce(e),ae()});async function de(e,t){return(await L.post("/auth/local/register",{username:e,email:e,password:t})).data}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("registerForm");if(!e)return;const t=new I("#registerForm",{errorFieldCssClass:"is-error",errorLabelCssClass:"login__error",focusInvalidField:!0,lockForm:!0});t.addField('[name="email"]',[{rule:"required",errorMessage:"Введите e-mail"},{rule:"email",errorMessage:"Некорректный e-mail"}]).addField('[name="password"]',[{rule:"required",errorMessage:"Введите пароль"},{rule:"minLength",value:8,errorMessage:"Минимум 8 символов"},{validator:n=>/[A-Za-z]/.test(n)&&/\d/.test(n),errorMessage:"Пароль должен содержать букву и цифру"}]).addField('[name="passwordRepeat"]',[{rule:"required",errorMessage:"Повторите пароль"},{validator:(n,s)=>n===s['[name="password"]'].elem.value,errorMessage:"Пароли не совпадают"}]).onSuccess(async n=>{n.preventDefault();const s=e.email.value.trim(),o=e.password.value;try{const r=await de(s,o);localStorage.setItem("jwt",r.jwt),window.location.replace("/ClubTravel/html/pages/accountPage.html")}catch(r){const i=r.response?.data?.error?.message||"Ошибка регистрации";t.showErrors({'[name="email"]':i})}})});async function ue(e){return(await L.post("/auth/forgot-password",{email:e})).data}const $=document.getElementById("forgotForm");$&&$.addEventListener("submit",async e=>{e.preventDefault();try{await ue($.email.value),$.reset(),alert("Письмо отправлено")}catch{alert("Ошибка")}});
