import { AudioPlayer } from './assets/js/components/audio-player/audio-player.js';
import { createPubSub } from './assets/js/lib/state/createPubSub.js';

customElements.define('audio-player', AudioPlayer);

const bus = createPubSub();
const audioPlayers = document.querySelectorAll('audio-player');

bus.subscribe('music:play', (trackId)=>{
    audioPlayers.forEach((player)=>{
        if (player.getAttribute('track-id') !== trackId) {
            player.pause();
        }
    });
});

audioPlayers.forEach((player)=>{
    player.addEventListener('play', (e)=>{
        const trackId = player.getAttribute('track-id');
        bus.publish('music:play', trackId);
    });
});