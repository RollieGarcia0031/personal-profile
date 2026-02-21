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

        // set the html elements
        this.innerHTML = HTML_TEMPLATE(track_id, track_title, track_src, this.instruments, this.description, this.genre);

        this._audio = this.querySelector('audio');

        const playButton = this.querySelector('.play-btn');
        // obtain the play icon for updating
        // it should change to pause icon while playing
        this._playIcon = playButton.querySelector('i'); // Get reference to the icon
        playButton.addEventListener('click', this.play.bind(this));

        // Update play/pause icon when audio state changes
        this._audio.addEventListener('play', this._updatePlayButtonIcon.bind(this));
        this._audio.addEventListener('pause', this._updatePlayButtonIcon.bind(this));
        this._audio.addEventListener('ended', this._updatePlayButtonIcon.bind(this));

        // redispatch event to parent
        // to determine which track is currently playing
        const audio = this.querySelector('audio');
        audio.onplay = ()=>{
            this.dispatchEvent(new CustomEvent('play', {detail: track_id}));
        };

        // bind the callback functions to other buttons
        const restartButton = this.querySelector('.restart-btn');
        restartButton.addEventListener('click', this.restart.bind(this));

        const stopButton = this.querySelector('.stop-btn');
        stopButton.addEventListener('click', this.stop.bind(this));

        const forwardButton = this.querySelector('.forward-btn');
        forwardButton.addEventListener('click', this.forward.bind(this));

        const backButton = this.querySelector('.back-btn');
        backButton.addEventListener('click', this.back.bind(this));

        this._progressBar = this.querySelector('.progress-bar');
        this._currentTimeSpan = this.querySelector('.current-time');
        this._durationSpan = this.querySelector('.duration');

        // Event listener for when audio metadata is loaded
        // it sets the max value of the progress bar
        // and the duration
        this._audio.addEventListener('loadedmetadata', () => {
            this._progressBar.max = this._audio.duration;
            this._durationSpan.textContent = this.formatTime(this._audio.duration);
        });

        // Event listener for time updates
        // it updates the progress bar and current time
        // when the audio is playing
        this._audio.addEventListener('timeupdate', () => {
            this._progressBar.value = this._audio.currentTime;
            this._currentTimeSpan.textContent = this.formatTime(this._audio.currentTime);
        });

        // Event listener for seeking
        // it adjusts the current time based on the value of the progress bar
        // so that when user drags the progress bar, the audio will be seeked
        this._progressBar.addEventListener('input', () => {
            this._audio.currentTime = this._progressBar.value;
        });

        this._volumeSlider = this.querySelector('.volumne-control-container input[type="range"]');

        // Set initial volume slider value
        // if this._audio.volume is not set, set the volume to 0.5
        this._volumeSlider.value = (this._audio.volume || 0.5) * 100;

        // Event listener for volume changes
        this._volumeSlider.addEventListener('input', () => {
            this._audio.volume = this._volumeSlider.value / 100;
        });
    }

    /** 
     * Format seconds to mm:ss
     * @param {number} seconds
     * @returns {string} format: mm:ss
     */
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
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

    /** 
     * Updates the play button icon based on the audio's paused state.
     * @private
     */
    _updatePlayButtonIcon() {
        if (this._audio.paused) {
            // put play icon if paused
            this._playIcon.classList.remove('bi-pause-fill');
            this._playIcon.classList.add('bi-play-fill');
        } else {
            // put pause icon if playing
            this._playIcon.classList.remove('bi-play-fill');
            this._playIcon.classList.add('bi-pause-fill');
        }
    }

    /** Play the track */
    play(){
        const player = this._audio;

        // play only if it is paused
        if (player.paused){
            player.play();
        } else {
        // pause the video if it is already playing
            player.pause();
        }
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
