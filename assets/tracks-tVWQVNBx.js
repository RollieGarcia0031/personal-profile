import"./header-DPd5T74P.js";import{w as m}from"./register-service-worker-BGOs9hDu.js";import{c as D}from"./createPubSub-Ze6cNm9A.js";const $=(t,e,i,r,s,a,u,C,N)=>{const R=m(C),k=m(N),q=m(`track-info/${u}/`);return`
  <div class="track-option-container">
    <audio src="${R}"></audio>

    <div class="track-img-container">
      <button class="play-button">
        <i class="bi bi-play"></i>
      </button>

      <div class="img-holder">

      </div>
      <img alt="${e}" src="${k}" class="backdrop"/>
      <img alt="${e}" src="${k}" class="frontdrop"/>
    </div>
    <p class="track-genre">
      ${r}
    </p>
    <p class="track-title">
      ${t}
    </p>

    <p class="track-description">
      ${e}
    </p>

    <div class="track-info">
      <span class="track-duration">
        ${i}
      </span>

      <a href="${q}" class="track-listen">
        Listen
      </a>
    </div>

  </div>
`};class w extends HTMLElement{constructor(){super()}connectedCallback(){this.innerHTML=$(this.title,this.description,this.duration,this.genre,this.date,this.bpm,this.id,this.src,this.img),this.addEventListener("click",e=>{this.parentElement?.classList.contains("list-view")&&(window.location.href=m(`track-info/${this.id}/`))})}get title(){return this.getAttribute("track-title")||""}get description(){return this.getAttribute("track-description")||""}get duration(){return this.getAttribute("track-duration")||""}get genre(){return this.getAttribute("track-genre")||""}get date(){return this.getAttribute("track-date")||""}get bpm(){return this.getAttribute("track-bpm")||""}get id(){return this.getAttribute("track-id")||""}get src(){return this.getAttribute("track-src")||""}get img(){return this.getAttribute("track-img")||""}static get observedAttributes(){return["track-title","track-description","track-duration","track-genre","track-date","track-bpm","track-id","track-src","track-img"]}}const v=[{id:"sampaloc",title:"Sampaloc",description:"Romantic Pop demo track.",genre:"Romantic Pop",audioSrc:"mp3/Sampaloc_(vocal).mp3",instruments:["guitar","piano"],imgSrc:"album-cover/sampaloc-cover.png",date:"2025-12-31",bpm:120,duration:"2:25",story:"",writer:"Rollie"},{id:"di-makatulog",title:"Di Makatulog",description:"Acoustic track with guitar, piano, violin, and drums.",genre:"Acoustic",audioSrc:"mp3/Di_Makatulog_(vocal).mp3",instruments:["guitar","piano"],imgSrc:"album-cover/Di_makatulog_cover.png",date:"2025-12-31",bpm:120,duration:"2:25",writer:"Rollie",story:""},{title:"Kahit Ano",description:"Rock demo track.",genre:"Rock",date:"2025-12-31",bpm:120,id:"kahit-ano",audioSrc:"mp3/Dulo (vocal).mp3",imgSrc:"hero_image.png",instruments:["guitar","piano"],duration:"2:25",story:"",writer:"Rollie"},{title:"'Di Ko Maisip",description:"An acoustic song with playful viebs.",genre:"Acoustic Orchestra",date:"2025-12-31",bpm:80,id:"di-ko-maisip",audioSrc:"mp3/Di_ko_maisip.opus",imgSrc:"album-cover/Di_ko_maisip_cover.png",instruments:["guitar","piano","violin","tamborine"],duration:"3:34",story:"",writer:"Rollie"},{title:"Ha?",description:"A cute song with simple theme",genre:"Acoustic Pop",date:"2025-2-12",bpm:81,id:"ha",audioSrc:"mp3/Ha_(vocal).mp3",imgSrc:"album-cover/ha_cover.png",instruments:["guitar","piano","synth","tamborine","drums"],duration:"1:02",story:"",writer:"Rollie"},{title:"Pipiliin Ko",description:"A confusing song that somehow assures...",genre:"Acoustic Pop",date:"2024-12-30",bpm:80,id:"pipiliin_ko",audioSrc:"mp3/pipiliin_ko_vocal.mp3",imgSrc:"album-cover/pipiliin_ko_album_cover.png",instruments:["guitar"],duration:"2:38",story:"The lyrics of this song wasn't really personal, I actually wrote as requested by a friend, at a time where her boyfriend is asking for a breakup",writer:"Rollie"},{title:"Ayos Lang",description:"Yearning song, but still sounds cute",genre:"Pop",date:"2025-8-5",bpm:90,id:"ayos_lang",audioSrc:"mp3/ayos_lang_vocal.mp3",imgSrc:"album-cover/ayos_lang_album_cover.png",instruments:["guitar","tamborine","piano","synth"],duration:"2:17",story:"This is one of the few songs, that I somehow made during college, just for the sake of making music is still fun for me.",writer:"Rollie"}];customElements.define("track-option",w);const n=document.querySelector("#tracks-grid"),g=document.querySelector(".filter-form"),f=g?.querySelector('input[type="search"]'),x=document.querySelector("#sort-by"),p="FILTERS_CHANGED",L="TRACKS_CHANGED",l=D(),o={allTracks:[...v],visibleTracks:[...v],filters:{searchTerm:"",sortBy:x?.value||"title"}};l.subscribe(p,t=>{o.filters={...o.filters,...t};const i=[...o.allTracks.filter(r=>[r.title,r.description,r.genre,r.writer,r.id].filter(Boolean).join(" ").toLowerCase().includes(o.filters.searchTerm.toLowerCase()))].sort((r,s)=>{const a=A(r,o.filters.sortBy),u=A(s,o.filters.sortBy);return typeof a=="number"&&typeof u=="number"?a-u:a.localeCompare(u)});o.visibleTracks=i,l.publish(L,o.visibleTracks)});l.subscribe(L,I);l.publish(p,o.filters);g&&g.addEventListener("submit",t=>{t.preventDefault()});f&&f.addEventListener("input",t=>{l.publish(p,{searchTerm:t.target.value.trim()})});const c=document.querySelector("#sort-by-custom"),d=c?.querySelector(".select-trigger"),S=c?.querySelectorAll(".option"),y=document.querySelector("#sort-by");c&&d&&(d.addEventListener("click",t=>{t.stopPropagation(),c.classList.toggle("open")}),S?.forEach(t=>{t.addEventListener("click",()=>{const e=t.getAttribute("data-value"),i=t.textContent.trim(),r=t.querySelector("i")?.className;if(d){const s=d.querySelector(".selected-text"),a=d.querySelector("i:first-child");s&&(s.textContent=i),a&&r&&(a.className=r)}S.forEach(s=>s.classList.remove("active")),t.classList.add("active"),y&&(y.value=e),l.publish(p,{sortBy:e}),c.classList.remove("open")})}),document.addEventListener("click",()=>{c.classList.remove("open")}));function A(t,e){return e==="duration"?H(t.duration):(t[e]||t.title||"").toString().toLowerCase()}function H(t){if(!t||!t.includes(":"))return 0;const[e,i]=t.split(":"),r=Number.parseInt(e,10),s=Number.parseInt(i,10);return Number.isNaN(r)||Number.isNaN(s)?0:r*60+s}function I(t){n.replaceChildren(),t.forEach(e=>{const i=new w;i.setAttribute("track-id",e.id),i.setAttribute("track-title",e.title),i.setAttribute("track-description",e.description),i.setAttribute("track-genre",e.genre),i.setAttribute("track-src",e.audioSrc),i.setAttribute("track-img",e.imgSrc),i.setAttribute("track-duration",e.duration),i.setAttribute("track-bpm",e.bpm),i.setAttribute("track-date",e.date),n.appendChild(i)})}const b=document.querySelector("#grid-view-btn"),h=document.querySelector("#list-view-btn"),T="grid-view",_="list-view";E();b?.addEventListener("click",E);h?.addEventListener("click",P);function E(){h.classList.remove("active"),b.classList.add("active"),n.classList.remove(_),n.classList.add(T)}function P(){b.classList.remove("active"),h.classList.add("active"),n.classList.remove(T),n.classList.add(_)}
