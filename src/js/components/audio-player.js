import { HTML_TEMPLATE } from './audio-player-template.js';

export class AudioPlayer extends HTMLElement {
    constructor(){
        super();
    }

    /** Initialize the component */
    connectedCallback(){
        const track_id = this.getAttribute('track-id');
        const track_title = this.getAttribute('track-title');
        const track_src = this.getAttribute('track-src');

        this.innerHTML = HTML_TEMPLATE(track_id, track_title, track_src, this.instruments, this.description, this.genre);

        this._audio = this.querySelector('audio');

        const playButton = this.querySelector('.play-btn');
        playButton.addEventListener('click', this.play.bind(this));

        // redispatch event to parent
        // it is to determine which track is currently playing
        const audio = this.querySelector('audio');
        audio.onplay = ()=>{
            this.dispatchEvent(new CustomEvent('play', {detail: track_id}));
        };

        const restartButton = this.querySelector('.restart-btn');
        restartButton.addEventListener('click', this.restart.bind(this));

        const stopButton = this.querySelector('.stop-btn');
        stopButton.addEventListener('click', this.stop.bind(this));

        const forwardButton = this.querySelector('.forward-btn');
        forwardButton.addEventListener('click', this.forward.bind(this));

        const backButton = this.querySelector('.back-btn');
        backButton.addEventListener('click', this.back.bind(this));
    }

    get instruments(){
        try {
            const str = this.getAttribute('track-instruments');
            return JSON.parse(str || '[]');
        } catch(error){
            console.error('cannot parse instruments attribute', error);
            return;
        }
    }

    get description(){
        return this.getAttribute('track-description') || "";
    }

    get genre(){
        return this.getAttribute('track-genre') || "";
    }
    /** Play the track */
    play(){
        const player = this.querySelector('audio');

        // play only if it is paused
        if (player.paused){
            player.play();
            return;
        }

        // pause the video if it is already playing
        player.pause();
    }

    /** Pause the track */
    pause(){
        this.querySelector('audio').pause();
    }

    /** Stop the track and restart it */
    stop(){
        this._audio.pause();
        this._audio.currentTime = 0;
        console.log(this.instruments);
    }

    restart(){
        this._audio.currentTime = 0;
        this._audio.play();
    }

    forward(){
        this._audio.currentTime += 10;
    }

    back(){
        this._audio.currentTime -= 10;
    }

    static get observedAttributes(){
        return [
            'track-description',
            'track-genre',
            'track-id',
            'track-mood',
            'track-src',
            'track-title',
            'track-instruments', // track-instruments='["guitar", "piano", "drums"]'
        ];
    }
}