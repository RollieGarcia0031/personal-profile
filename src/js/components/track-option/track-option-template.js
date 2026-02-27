export const HTML_TEMPLATE = (
  track_title,
  track_description,
  track_duration,
  track_genre,
  track_date,
  track_bpm
) => `
  <div class="track-option">
    <p class="track-title">
      ${track_title}
    </p>
  </div>
`;