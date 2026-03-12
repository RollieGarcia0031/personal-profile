import { TrackOption } from '../assets/js/components/track-option/track-option.js';
import { createPubSub } from '../assets/js/lib/state/createPubSub.js';
import DATA_JSON from '../../content/tracks.json';

/**
 * Register the custom element used to render each track card.
 * The page template creates <track-option> instances in JS.
 */
customElements.define('track-option', TrackOption);

/** @type {HTMLDivElement} Container where rendered track cards are mounted. */
const trackGrid = document.querySelector('#tracks-grid');
/** @type {HTMLFormElement | null} Filter form wrapping search and sort controls. */
const filterForm = document.querySelector('.filter-form');
/** @type {HTMLInputElement | null} Search input used to filter tracks by text. */
const searchInput = filterForm?.querySelector('input[type="search"]');
/** @type {HTMLSelectElement | null} Sort selector that controls ordering of visible tracks. */
const sortBySelect = document.querySelector('#sort-by');

/** PubSub topic fired when any filter field (search/sort) changes. */
const FILTERS_CHANGED_EVENT = 'FILTERS_CHANGED';
/** PubSub topic fired after filtered/sorted tracks are recomputed. */
const TRACKS_CHANGED_EVENT = 'TRACKS_CHANGED';

/**
 * Central event bus for this page state.
 * It decouples UI inputs (publishers) from state updates + rendering (subscribers).
 */
const trackStore = createPubSub();

/**
 * @typedef {Object} TrackFilters
 * @property {string} searchTerm - Free-text term used for case-insensitive matching.
 * @property {string} sortBy - Selected field from the Sort by dropdown.
 */

/**
 * @typedef {Object} TrackPageState
 * @property {Array<Object>} allTracks - Source track list loaded from tracks.json.
 * @property {Array<Object>} visibleTracks - Derived list after filtering/sorting.
 * @property {TrackFilters} filters - Current values of all active filter controls.
 */

/**
 * Single source of truth for the tracks page.
 * - allTracks: immutable source snapshot from tracks.json
 * - visibleTracks: renderable list derived from current filters
 * - filters: current search/sort UI values
 * @type {TrackPageState}
 */
const state = {
  allTracks: [...DATA_JSON],
  visibleTracks: [...DATA_JSON],
  filters: {
    searchTerm: '',
    sortBy: sortBySelect?.value || 'title'
  }
};

/**
 * Recompute state whenever a filter field changes.
 *
 * Flow:
 * 1) merge incoming partial filter updates into state.filters
 * 2) filter tracks using searchTerm
 * 3) sort the filtered result using selected sort field
 * 4) publish TRACKS_CHANGED so render subscribers can update UI
 */
trackStore.subscribe(FILTERS_CHANGED_EVENT, (filters) => {
  state.filters = {
    ...state.filters,
    ...filters
  };

  const filteredTracks = state.allTracks.filter((track) => {
    const searchableText = [
      track.title,
      track.description,
      track.genre,
      track.writer,
      track.id
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return searchableText.includes(state.filters.searchTerm.toLowerCase());
  });

  const sortedTracks = [...filteredTracks].sort((a, b) => {
    const first = getSortValue(a, state.filters.sortBy);
    const second = getSortValue(b, state.filters.sortBy);

    return first.localeCompare(second);
  });

  state.visibleTracks = sortedTracks;
  trackStore.publish(TRACKS_CHANGED_EVENT, state.visibleTracks);
});

/**
 * Render subscriber: updates DOM whenever visibleTracks changes.
 */
trackStore.subscribe(TRACKS_CHANGED_EVENT, renderTracks);

/**
 * Initial bootstrapping publish.
 * Forces one full compute + render pass using default filters.
 */
trackStore.publish(FILTERS_CHANGED_EVENT, state.filters);

/**
 * Keep form submission from triggering page reload/navigation.
 * The page uses client-side filtering, not server form submit.
 */
if (filterForm) {
  filterForm.addEventListener('submit', (e) => {
    e.preventDefault();
  });
}

/**
 * Search input handler.
 * Publishes the latest search term as a partial filter update.
 */
if (searchInput) {
  searchInput.addEventListener('input', (event) => {
    trackStore.publish(FILTERS_CHANGED_EVENT, {
      searchTerm: event.target.value.trim()
    });
  });
}

/**
 * Sort selection handler.
 * Publishes the chosen sort mode as a partial filter update.
 */
if (sortBySelect) {
  sortBySelect.addEventListener('change', (event) => {
    trackStore.publish(FILTERS_CHANGED_EVENT, {
      sortBy: event.target.value
    });
  });
}

/**
 * Returns a normalized string value used for sorting comparisons.
 *
 * Note on mapping:
 * - UI "artist" maps to track.writer (tracks.json has `writer`, not `artist`)
 * - UI "album" maps to track.genre (closest currently-available field)
 *
 * @param {Object} track - Track item from tracks.json.
 * @param {string} sortBy - Selected sort key from UI.
 * @returns {string} Lowercased sort key for localeCompare.
 */
function getSortValue(track, sortBy) {
  if (sortBy === 'artist') {
    return (track.writer || track.title || '').toLowerCase();
  }

  if (sortBy === 'album') {
    return (track.genre || track.title || '').toLowerCase();
  }

  return (track[sortBy] || track.title || '').toString().toLowerCase();
}

/**
 * Render a list of tracks into #tracks-grid.
 * Existing DOM nodes are replaced on each render to keep output consistent
 * with the latest state.visibleTracks snapshot.
 *
 * @param {Array<Object>} tracks - Tracks to render.
 */
function renderTracks(tracks) {
  trackGrid.replaceChildren();

  tracks.forEach((track) => {
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
}

/**
 * Set up the view mode of the page:
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
 * Switch the track layout to grid view and update active button state.
 */
function useGridView() {
  listButton.classList.remove('active');
  gridButton.classList.add('active');

  trackGrid.classList.remove(listViewClass);
  trackGrid.classList.add(gridViewClass);
}

/**
 * Switch the track layout to list view and update active button state.
 */
function useListView() {
  gridButton.classList.remove('active');
  listButton.classList.add('active');

  trackGrid.classList.remove(gridViewClass);
  trackGrid.classList.add(listViewClass);
}
