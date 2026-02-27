export const HTML_TEMPLATE = (
  track_title,
  track_description,
  track_duration,
  track_genre,
  track_date,
  track_bpm
) => `
  <div class="track-option-container">
    <img alt="${track_description}"/>
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

      <a href="#">
        Listen
      </a>
    </div>

  </div>
`;