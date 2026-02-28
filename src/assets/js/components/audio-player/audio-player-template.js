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
export const HTML_TEMPLATE =(
  track_id,
  track_title,
  track_src,
  track_instruments,
  track_description,
  track_genre
) =>`
  <audio>
    <source src="${track_src}" type="audio/mpeg">
  </audio>

  <div class="audio-player-body">
    <div class="title-holder">  
      <p class="title">
        ${track_title}
      </p>

    </div>

    ${track_description && `
      <div class="description">
        <i class="bi bi-chat-quote"></i>
        <i>
          ${track_description || ""}
        </i>
      </div>
    `}

    <p class="genre">
      <i class="bi bi-music-note"></i>
      Genre: <span>${track_genre}</span>
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
        ${track_instruments.map(instrument => `
          <div>${instrument}</div>  
        `).join('')}
      </div>
    </div>

  </div>
`;