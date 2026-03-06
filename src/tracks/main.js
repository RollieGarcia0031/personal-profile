import { TrackOption } from '../assets/js/components/track-option/track-option.js';
import DATA_JSON from '../../content/tracks.json';


/**
 *  Setup the custom track option elements to display
 *  all of the songs available from the tracks.json file
 */
customElements.define('track-option', TrackOption);

const trackGrid = document.querySelector('#tracks-grid');

DATA_JSON.forEach(track => {
  const newTrackOption = new TrackOption();
  newTrackOption.classList.add('card');

  newTrackOption.setAttribute('track-id', track.id);
  newTrackOption.setAttribute('track-title', track.title);
  newTrackOption.setAttribute('track-description', track.description);
  newTrackOption.setAttribute('track-genre', track.genre);
  newTrackOption.setAttribute('track-src', track.audioSrc);
  newTrackOption.setAttribute('track-img', track.imgSrc);
  newTrackOption.setAttribute('track-duration', track.duration);
  newTrackOption.setAttribute('track-bpm', track.bpm);
  newTrackOption.setAttribute('track-date', track.date);

  trackGrid.appendChild(newTrackOption);
});