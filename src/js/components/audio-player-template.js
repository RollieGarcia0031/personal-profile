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