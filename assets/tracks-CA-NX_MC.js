import"./header-DPd5T74P.js";import{w as d}from"./register-service-worker-BGOs9hDu.js";import{c as N}from"./createPubSub-Ze6cNm9A.js";const D=(t,e,i,r,a,u,n,y,E)=>{const _=d(y),k=d(E),C=d(`track-info/${n}/`);return`
  <div class="track-option-container">
    <audio src="${_}"></audio>

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

      <a href="${C}" class="track-listen">
        Listen
      </a>
    </div>

  </div>
`};class A extends HTMLElement{constructor(){super()}connectedCallback(){this.innerHTML=D(this.title,this.description,this.duration,this.genre,this.date,this.bpm,this.id,this.src,this.img),this.addEventListener("click",()=>console.log("hello"))}get title(){return this.getAttribute("track-title")||""}get description(){return this.getAttribute("track-description")||""}get duration(){return this.getAttribute("track-duration")||""}get genre(){return this.getAttribute("track-genre")||""}get date(){return this.getAttribute("track-date")||""}get bpm(){return this.getAttribute("track-bpm")||""}get id(){return this.getAttribute("track-id")||""}get src(){return this.getAttribute("track-src")||""}get img(){return this.getAttribute("track-img")||""}static get observedAttributes(){return["track-title","track-description","track-duration","track-genre","track-date","track-bpm","track-id","track-src","track-img"]}}const h=[{id:"sampaloc",title:"Sampaloc",description:"Romantic Pop demo track.",genre:"Romantic Pop",audioSrc:"mp3/Sampaloc_(vocal).mp3",instruments:["guitar","piano"],imgSrc:"album-cover/sampaloc-cover.png",date:"2025-12-31",bpm:120,duration:"2:25",story:"",writer:"Rollie"},{id:"di-makatulog",title:"Di Makatulog",description:"Acoustic track with guitar, piano, violin, and drums.",genre:"Acoustic",audioSrc:"mp3/Di_Makatulog_(vocal).mp3",instruments:["guitar","piano"],imgSrc:"album-cover/Di_makatulog_cover.png",date:"2025-12-31",bpm:120,duration:"2:25",writer:"Rollie",story:""},{title:"Kahit Ano",description:"Rock demo track.",genre:"Rock",date:"2025-12-31",bpm:120,id:"kahit-ano",audioSrc:"mp3/Dulo (vocal).mp3",imgSrc:"hero_image.png",instruments:["guitar","piano"],duration:"2:25",story:"",writer:"Rollie"},{title:"'Di Ko Maisip",description:"An acoustic song with playful viebs.",genre:"Acoustic Orchestra",date:"2025-12-31",bpm:80,id:"di-ko-maisip",audioSrc:"mp3/Di_ko_maisip.opus",imgSrc:"album-cover/Di_ko_maisip_cover.png",instruments:["guitar","piano","violin","tamborine"],duration:"3:34",story:"",writer:"Rollie"},{title:"Ha?",description:"A cute song with simple theme",genre:"Acoustic Pop",date:"2025-2-12",bpm:81,id:"ha",audioSrc:"mp3/Ha_(vocal).mp3",imgSrc:"album-cover/ha_cover.png",instruments:["guitar","piano","synth","tamborine","drums"],duration:"1:02",story:"",writer:"Rollie"}];customElements.define("track-option",A);const c=document.querySelector("#tracks-grid"),m=document.querySelector(".filter-form"),v=m?.querySelector('input[type="search"]'),p=document.querySelector("#sort-by"),l="FILTERS_CHANGED",S="TRACKS_CHANGED",o=N(),s={allTracks:[...h],visibleTracks:[...h],filters:{searchTerm:"",sortBy:p?.value||"title"}};o.subscribe(l,t=>{s.filters={...s.filters,...t};const i=[...s.allTracks.filter(r=>[r.title,r.description,r.genre,r.writer,r.id].filter(Boolean).join(" ").toLowerCase().includes(s.filters.searchTerm.toLowerCase()))].sort((r,a)=>{const u=f(r,s.filters.sortBy),n=f(a,s.filters.sortBy);return typeof u=="number"&&typeof n=="number"?u-n:u.localeCompare(n)});s.visibleTracks=i,o.publish(S,s.visibleTracks)});o.subscribe(S,$);o.publish(l,s.filters);m&&m.addEventListener("submit",t=>{t.preventDefault()});v&&v.addEventListener("input",t=>{o.publish(l,{searchTerm:t.target.value.trim()})});p&&p.addEventListener("change",t=>{o.publish(l,{sortBy:t.target.value})});function f(t,e){return e==="duration"?R(t.duration):(t[e]||t.title||"").toString().toLowerCase()}function R(t){if(!t||!t.includes(":"))return 0;const[e,i]=t.split(":"),r=Number.parseInt(e,10),a=Number.parseInt(i,10);return Number.isNaN(r)||Number.isNaN(a)?0:r*60+a}function $(t){c.replaceChildren(),t.forEach(e=>{const i=new A;i.classList.add("card"),i.setAttribute("track-id",e.id),i.setAttribute("track-title",e.title),i.setAttribute("track-description",e.description),i.setAttribute("track-genre",e.genre),i.setAttribute("track-src",e.audioSrc),i.setAttribute("track-img",e.imgSrc),i.setAttribute("track-duration",e.duration),i.setAttribute("track-bpm",e.bpm),i.setAttribute("track-date",e.date),c.appendChild(i)})}const g=document.querySelector("#grid-view-btn"),b=document.querySelector("#list-view-btn"),T="grid-view",L="list-view";w();g?.addEventListener("click",w);b?.addEventListener("click",H);function w(){b.classList.remove("active"),g.classList.add("active"),c.classList.remove(L),c.classList.add(T)}function H(){g.classList.remove("active"),b.classList.add("active"),c.classList.remove(T),c.classList.add(L)}
