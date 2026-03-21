import { withBaseUrl } from '../../lib/base-url.js';

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
) => {
  const audioSrc = withBaseUrl(track_src);
  const imageSrc = withBaseUrl(track_img);
  const trackInfoHref = withBaseUrl(`track-info/${track_id}/`);

  return `
  <div class="track-option-container">
    <audio src="${audioSrc}"></audio>

    <div class="track-img-container">
      <button class="play-button">
        <i class="bi bi-play"></i>
      </button>

      <div class="img-holder">

      </div>
      <img alt="${track_description}" src="${imageSrc}" class="backdrop"/>
      <img alt="${track_description}" src="${imageSrc}" class="frontdrop"/>
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

      <a href="${trackInfoHref}" class="track-listen">
        Listen
      </a>
    </div>

  </div>
`;
};
