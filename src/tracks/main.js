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




/**
 * Set up the search bar to filter the tracks
 */

const filterForm = document.querySelector('.filter-form');
filterForm.addEventListener('submit', (e) => {
  e.preventDefault();
})

/**
 * Set up the view mode of the page
 * 1. Grid view
 * 2. List view
 */

const gridButton = document.querySelector('#grid-view-btn');
const listButton = document.querySelector('#list-view-btn');
const gridViewClass = 'grid-view';
const listViewClass = 'list-view';

useGridView();
gridButton?.addEventListener('click', useGridView);
listButton?.addEventListener('click', useListView);



/**
 * Toggle function to switch between grid and list view
 */

function useGridView(){
  listButton.classList.remove('active');
  gridButton.classList.add('active');

  trackGrid.classList.remove(listViewClass);
  trackGrid.classList.add(gridViewClass);
}

function useListView(){
  gridButton.classList.remove('active');
  listButton.classList.add('active');

  trackGrid.classList.remove(gridViewClass);
  trackGrid.classList.add(listViewClass);
}