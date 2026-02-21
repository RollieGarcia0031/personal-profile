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
  <style>
    .main-body {
      color: var(--text);
      border: 1px solid var(--border);
      background-color: var(--bg);
      border-radius: 1rem;
      padding: 1.5rem;
      height: 100%;
      display: grid;
      grid-template-rows: auto auto auto 1fr auto;
      justify-items: stretch;
      align-items: stretch;
      gap: 0.5rem;
    }

    .main-body button {
      background: unset;
      border:unset;
      color: var(--text);
      font-size: 1.5rem;
    }

    .title-holder {
      display: flex;
      flex-direction: row;
      gap: 1rem;
      align-items: center;
      justify-content: start;
      border-bottom: 1px solid var(--border);
    }

    .description {
      color: var(--text-muted);
      margin-bottom: 1rem;
    }

    .genre {
      color: var(--text-muted);
      font-weight: bold;
    }
    .genre > span {
      font-weight: normal;
    }

    .title {
      font-size: 2rem;
      font-weight: bold;
    }

    .instruments-container{
      border-top: 1px solid var(--border);
      padding: 0;
      padding: 1rem;
    }

    .instrument-list-container{
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
      padding: 0 0.5rem;
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

    .control-container {
      display: grid;
      grid-template-rows: 1fr auto;
      gap: 0.5rem;
      border: 1px solid var(--border);
      border-radius: 0.5rem;
      padding: 0.5rem;
    }

    .control-btn-container {
      display: grid;
      grid-template-columns: repeat(5, auto) 1fr;
      gap: 0.5rem;
    }

    .volumne-control-container {
      margin-left: 0.5rem;
      display: flex;
      flex-direction: row;
      align-items:center;
      gap: 0.25rem;
    }

    .progress-bar-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .progress-bar-container .progress-bar {
      flex-grow: 1;
      -webkit-appearance: none;
      appearance: none;
      height: 8px;
      background: var(--border-muted);
      border-radius: 4px;
      outline: none;
      cursor: pointer;
    }

    .progress-bar-container .progress-bar::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--primary);
      cursor: grab;
    }

    .progress-bar-container .progress-bar::-moz-range-thumb {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--primary);
      cursor: grab;
    }

    .progress-bar-container span {
      font-size: 0.8rem;
      color: var(--text-muted);
    }
  </style>  

  <audio>
    <source src="${track_src}" type="audio/mpeg">
  </audio>

  <div class="main-body">
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
        ${track_instruments.map(insrument => `
          <div>${insrument}</div>  
        `).join('')}
      </div>
    </div>

  </div>
`;