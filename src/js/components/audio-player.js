const HTML_TEMPLATE =(
    track_id,
    track_title,
    track_src
) =>`
    <style>
      .main-body {
          color: var(--text);
          border: 1px solid var(--border);
          height: 100%;
          display: grid;
          grid-template-rows: 1fr 1fr;
          justify-items: center;
          align-items: center;
          gap: 1.5rem;
          padding: 0 5rem;
      }
    </style>

    <audio>
      <source src="${track_src}" type="audio/mpeg">
    </audio>

    <div class="main-body card">
      <p>
        ${track_title}
      </p>

      <button class="play-btn">
        ▶️
      </button>
    </div>
`;

export class AudioPlayer extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback(){
        const track_id = this.getAttribute('track-id');
        const track_title = this.getAttribute('track-title');
        const track_src = this.getAttribute('track-src');

        this.innerHTML = HTML_TEMPLATE(track_id, track_title, track_src);
        this.querySelector('button').addEventListener('click', this.play.bind(this));
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
    stop(){
        this.querySelector('audio').pause();
    }

    static get observedAttributes(){
        return ['track-id', 'track-title', 'track-src'];
    }
}