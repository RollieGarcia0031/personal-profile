import { AudioPlayer } from './components/audio-player.js';

document.getElementById("menu-collapse-btn").addEventListener("click", ()=>{
    document.querySelector("nav").classList.toggle("hidden");
})

document.getElementById("menu-close-btn").addEventListener('click', ()=>{
    document.querySelector("nav").classList.add("hidden");
})

customElements.define('audio-player', AudioPlayer);