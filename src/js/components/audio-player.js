
/**
 * 
 * @param {string} track_id 
 * @param {string} track_title 
 * @param {string} track_src 
 * @param {string[]} track_instruments 
 * @param {string} track_description
 * @param {string} track_genre
 * @returns 
 */
const HTML_TEMPLATE =(
    track_id,
    track_title,
    track_src,
    track_instruments,
    track_description,
    track_genre
) =>`
    <style>
      .main-body {
        color: var(--text);
        border: 1px solid var(--border);
        background-color: var(--bg);
        padding: 0.5rem;
        height: 100%;
        display: grid;
        grid-template-rows: 1fr auto 1fr auto;
        justify-items: stretch;
        align-items: center;
        gap: 1.5rem;
      }

      .title-holder {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        align-items: center;
        justify-content: center;
      }

      .title {
        font-size: 2rem;
        font-weight: bold;
      }

      .control-container{
        border: 1px solid var(--border);
        padding: 5px;
      }

      .instruments-container{
        border-top: 1px solid var(--border);
        padding: 0.25rem 1rem;
      }

      .instrument-list-container{
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
      }

      .instrument-list-container > * {
        border: 1px solid var(--border-muted);
        padding: 0.25rem 0.75rem;
        border-radius: 4rem;
        background-color: var(--bg-light);
      }

      .instrument-title{
        font-weight: bold;
        margin: 0.5rem 0;
      }

    </style>

    <audio>
      <source src="${track_src}" type="audio/mpeg">
    </audio>

    <div class="main-body">
      <div class="title-holder">
        <button class="restart-btn">
          <i class="bi bi-arrow-clockwise"></i>
        </button>
  
        <p class="title">
          ${track_title}
        </p>

      </div>

      ${track_description && `
        <p class="description">
          ${track_description || ""}
        </p>
      `}

      <p>
        Genre: ${track_genre}
      </p>
        
      <div class="control-container">

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
      </div>

      <div class="instruments-container">
        <p class="instrument-title" >
          Instruments
        </p>

        <div class="instrument-list-container">
          ${track_instruments.map(insrument => `
            <div>${insrument}</div>  
          `).join('')}
        </div>
      </div>

    </div>
`;

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