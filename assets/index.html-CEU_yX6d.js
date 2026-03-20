import"./header-WnErQ3ru.js";import{c as u}from"./createPubSub-Ze6cNm9A.js";import"./register-service-worker-C_bD3Os7.js";const l=(e,t,i,s,r,a)=>`
  <audio>
    <source src="${i}" type="audio/mpeg">
  </audio>

  <div class="audio-player-body">
    <div class="title-holder">  
      <p class="title">
        ${t}
      </p>

    </div>

    ${r&&`
      <div class="description">
        <i class="bi bi-chat-quote"></i>
        <i>
          ${r||""}
        </i>
      </div>
    `}

    <p class="genre">
      <i class="bi bi-music-note"></i>
      Genre: <span>${a}</span>
    </p>
      
    <div class="control-container">

      <div class="progress-bar-container">
        <span class="current-time">0:00</span>
        <input type="range" class="progress-bar" value="0" step="0.1">
        <span class="duration">0:00</span>
      </div>

      <div class="control-btn-container">
        <button class="restart-btn">
          <i class="bi bi-arrow-clockwise"></i>
        </button>

        <button class="stop-btn">
          <i class="bi bi-stop-fill"></i>
        </button>

        <button class="back-btn">
          <i class="bi bi-skip-backward-fill"></i>
        </button>

        <button class="play-btn">
          <i class="bi bi-play-fill"></i>
        </button>

        <button class="forward-btn">
          <i class="bi bi-skip-forward-fill"></i>
        </button>

        <div class="volumne-control-container">
          <i class="bi bi-volume-up-fill"></i>
          <input type="range" min="0" max="100" value="50">
        </div>
      </div>
    </div>

    <div class="instruments-container">
      <p class="instrument-title" >
        Instruments
      </p>

      <div class="instrument-list-container">
        ${s.map(n=>`
          <div>${n}</div>  
        `).join("")}
      </div>
    </div>

  </div>
`;class d extends HTMLElement{constructor(){super()}connectedCallback(){const t=this.getAttribute("track-id"),i=this.getAttribute("track-title"),s=this.getAttribute("track-src");this.innerHTML=l(t,i,s,this.instruments,this.description,this.genre),this._audio=this.querySelector("audio");const r=this.querySelector(".play-btn");this._playIcon=r.querySelector("i"),r.addEventListener("click",this.play.bind(this)),this._audio.addEventListener("play",this._updatePlayButtonIcon.bind(this)),this._audio.addEventListener("pause",this._updatePlayButtonIcon.bind(this)),this._audio.addEventListener("ended",this._updatePlayButtonIcon.bind(this));const a=this.querySelector("audio");a.onplay=()=>{this.dispatchEvent(new CustomEvent("play",{detail:t}))},this.querySelector(".restart-btn").addEventListener("click",this.restart.bind(this)),this.querySelector(".stop-btn").addEventListener("click",this.stop.bind(this)),this.querySelector(".forward-btn").addEventListener("click",this.forward.bind(this)),this.querySelector(".back-btn").addEventListener("click",this.back.bind(this)),this._progressBar=this.querySelector(".progress-bar"),this._currentTimeSpan=this.querySelector(".current-time"),this._durationSpan=this.querySelector(".duration"),this._audio.addEventListener("loadedmetadata",()=>{this._progressBar.max=this._audio.duration,this._durationSpan.textContent=this.formatTime(this._audio.duration)}),this._audio.addEventListener("timeupdate",()=>{this._progressBar.value=this._audio.currentTime,this._currentTimeSpan.textContent=this.formatTime(this._audio.currentTime)}),this._progressBar.addEventListener("input",()=>{this._audio.currentTime=this._progressBar.value}),this._volumeSlider=this.querySelector('.volumne-control-container input[type="range"]'),this._volumeSlider.value=(this._audio.volume||.5)*100,this._volumeSlider.addEventListener("input",()=>{this._audio.volume=this._volumeSlider.value/100})}formatTime(t){const i=Math.floor(t/60),s=Math.floor(t%60);return`${i}:${s<10?"0":""}${s}`}get instruments(){try{const t=this.getAttribute("track-instruments");return JSON.parse(t||"[]")}catch(t){return console.error("cannot parse instruments attribute",t),[]}}get description(){return this.getAttribute("track-description")||""}get genre(){return this.getAttribute("track-genre")||""}_updatePlayButtonIcon(){this._audio.paused?(this._playIcon.classList.remove("bi-pause-fill"),this._playIcon.classList.add("bi-play-fill")):(this._playIcon.classList.remove("bi-play-fill"),this._playIcon.classList.add("bi-pause-fill"))}play(){const t=this._audio;t.paused?t.play():t.pause()}pause(){this.querySelector("audio").pause()}stop(){this._audio.pause(),this._audio.currentTime=0,console.log(this.instruments)}restart(){this._audio.currentTime=0,this._audio.play()}forward(){this._audio.currentTime+=10}back(){this._audio.currentTime-=10}static get observedAttributes(){return["track-description","track-genre","track-id","track-mood","track-src","track-title","track-instruments"]}}customElements.define("audio-player",d);const o=u(),c=document.querySelectorAll("audio-player");o.subscribe("music:play",e=>{c.forEach(t=>{t.getAttribute("track-id")!==e&&t.pause()})});c.forEach(e=>{e.addEventListener("play",t=>{const i=e.getAttribute("track-id");o.publish("music:play",i)})});
