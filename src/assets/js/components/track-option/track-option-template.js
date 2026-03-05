export const HTML_TEMPLATE = (
  track_title,
  track_description,
  track_duration,
  track_genre,
  track_date,
  track_bpm,
  track_id,
  track_src,
  track_img
) => `
  <div class="track-option-container">
    <audio src="${track_src}"></audio>

    <div class="track-img-container">
      <button class="play-button">
        <i class="bi bi-play"></i>
      </button>

      <div class="img-holder">

      </div>
      <img alt="${track_description}" src="${track_img}" class="backdrop"/>
      <img alt="${track_description}" src="${track_img}" class="frontdrop"/>
    </div>
    <p class="track-genre">
      ${track_genre}
    </p>
    <p class="track-title">
      ${track_title}
    </p>

    <p class="track-description">
      ${track_description}
    </p>

    <div class="track-info">
      <span class="track-duration">
        ${track_duration}
      </span>

      <a href="/track-info/${track_id}/" class="track-listen">
        Listen
      </a>
    </div>

  </div>
`;