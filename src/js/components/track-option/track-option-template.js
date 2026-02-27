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
    <p>
      ${track_genre}
    </p>
    <p class="track-title">
      ${track_title}
    </p>

    <p>
      ${track_description}
    </p>

    <div>
      <span>
        ${track_duration}
      </span>

      <a href="#">
        Listen
      </a>
    </div>

  </div>
`;