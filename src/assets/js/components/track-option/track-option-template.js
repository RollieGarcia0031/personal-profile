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
      <picture class="backdrop">
        <source srcset="${withBaseUrl(`avif/${track_img}.avif`)}" type="image/avif">
        <source srcset="${withBaseUrl(`webp/${track_img}.webp`)}" type="image/webp">
        <img alt="${track_description}" src="${withBaseUrl(`jpg/${track_img}.jpg`)}" class="backdrop"/>
      </picture>
      <picture class="frontdrop">
        <source srcset="${withBaseUrl(`avif/${track_img}.avif`)}" type="image/avif">
        <source srcset="${withBaseUrl(`webp/${track_img}.webp`)}" type="image/webp">
        <img alt="${track_description}" src="${withBaseUrl(`jpg/${track_img}.jpg`)}" class="frontdrop"/>
      </picture>
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
