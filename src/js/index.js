import { AudioPlayer } from './components/audio-player.js';
import { MusicPlayer } from './lib/state/MusicPlay.js';
import { createPubSub } from './lib/state/createPubSub.js';

document.getElementById("menu-collapse-btn").addEventListener("click", ()=>{
    document.querySelector("nav").classList.toggle("hidden");
})

document.getElementById("menu-close-btn").addEventListener('click', ()=>{
    document.querySelector("nav").classList.add("hidden");
})

customElements.define('audio-player', AudioPlayer);

const bus = createPubSub();
const audioPlayers = document.querySelectorAll('audio-player');

bus.subscribe('music:play', (trackId)=>{
    audioPlayers.forEach((player)=>{
        if (player.getAttribute('track-id') !== trackId) {
            player.stop();
        }
    });
});

audioPlayers.forEach((player)=>{
    player.addEventListener('play', (e)=>{
        const trackId = player.getAttribute('track-id');
        bus.publish('music:play', trackId);
    });
});