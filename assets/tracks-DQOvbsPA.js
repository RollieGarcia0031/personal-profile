import"./header-C0m8mux7.js";const o=(i,t,r,a,p,g,c,s,n)=>`
  <div class="track-option-container">
    <audio src="${s}"></audio>

    <div class="track-img-container">
      <button class="play-button">
        <i class="bi bi-play"></i>
      </button>

      <img alt="${t}" src="${n}"/>
    </div>
    <p class="track-genre">
      ${a}
    </p>
    <p class="track-title">
      ${i}
    </p>

    <p class="track-description">
      ${t}
    </p>

    <div class="track-info">
      <span class="track-duration">
        ${r}
      </span>

      <a href="/track-info/${c}/" class="track-listen">
        Listen
      </a>
    </div>

  </div>
`;class e extends HTMLElement{constructor(){super()}connectedCallback(){this.innerHTML=o(this.title,this.description,this.duration,this.genre,this.date,this.bpm,this.id,this.src,this.img),this.addEventListener("click",()=>console.log("hello"))}get title(){return this.getAttribute("track-title")||""}get description(){return this.getAttribute("track-description")||""}get duration(){return this.getAttribute("track-duration")||""}get genre(){return this.getAttribute("track-genre")||""}get date(){return this.getAttribute("track-date")||""}get bpm(){return this.getAttribute("track-bpm")||""}get id(){return this.getAttribute("track-id")||""}get src(){return this.getAttribute("track-src")||""}get img(){return this.getAttribute("track-img")||""}static get observedAttributes(){return["track-title","track-description","track-duration","track-genre","track-date","track-bpm","track-id","track-src","track-img"]}}const d=[{id:"sampaloc",title:"Sampaloc",description:"Romantic Pop demo track.",genre:"Romantic Pop",audioSrc:"/mp3/Sampaloc_(vocal).mp3",instruments:["guitar","piano"],imgSrc:"/album-cover/sampaloc-cover.png",date:"2025-12-31",bpm:120,duration:"2:25"},{id:"di-makatulog",title:"Di Makatulog",description:"Acoustic track with guitar, piano, violin, and drums.",genre:"Acoustic",audioSrc:"/mp3/Di_Makatulog_(vocal).mp3",instruments:["guitar","piano"],imgSrc:"/hero_image.png",date:"2025-12-31",bpm:120,duration:"2:25"},{title:"Kahit Ano",description:"Rock demo track.",genre:"Rock",date:"2025-12-31",bpm:120,id:"kahit-ano",audioSrc:"/mp3/Dulo (vocal).mp3",imgSrc:"/hero_image.png",instruments:["guitar","piano"],duration:"2:25"}];customElements.define("track-option",e);const u=document.querySelector("#tracks-grid");d.forEach(i=>{const t=new e;t.classList.add("card"),t.setAttribute("track-id",i.id),t.setAttribute("track-title",i.title),t.setAttribute("track-description",i.description),t.setAttribute("track-genre",i.genre),t.setAttribute("track-src",i.audioSrc),t.setAttribute("track-img",i.imgSrc),t.setAttribute("track-duration",i.duration),t.setAttribute("track-bpm",i.bpm),t.setAttribute("track-date",i.date),u.appendChild(t)});
