import { TrackOption } from '../assets/js/components/track-option/track-option.js';
import { createPubSub } from '../assets/js/lib/state/createPubSub.js';
import DATA_JSON from '../../content/tracks.json';
import { getVisibleTracks, setupViewToggle, renderTracks as renderTracksToGrid } from './helpers.js';

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

  state.visibleTracks = getVisibleTracks(state.allTracks, state.filters);
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

/** Logic for the custom sort dropdown */
const customSelect = document.querySelector('#sort-by-custom');
const selectTrigger = customSelect?.querySelector('.select-trigger');
const selectOptions = customSelect?.querySelectorAll('.option');
const hiddenSortInput = document.querySelector('#sort-by');

if (customSelect && selectTrigger) {
  // Toggle dropdown
  selectTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    customSelect.classList.toggle('open');
  });

  // Handle option selection
  selectOptions?.forEach(option => {
    option.addEventListener('click', () => {
      const value = option.getAttribute('data-value');
      const text = option.textContent.trim();
      const iconClass = option.querySelector('i')?.className;

      // Update UI
      if (selectTrigger) {
        const triggerText = selectTrigger.querySelector('.selected-text');
        const triggerIcon = selectTrigger.querySelector('i:first-child');
        if (triggerText) triggerText.textContent = text;
        if (triggerIcon && iconClass) triggerIcon.className = iconClass;
      }

      // Update active state
      selectOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');

      // Update hidden input and publish change
      if (hiddenSortInput) {
        hiddenSortInput.value = value;
      }
      
      trackStore.publish(FILTERS_CHANGED_EVENT, {
        sortBy: value
      });

      customSelect.classList.remove('open');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', () => {
    customSelect.classList.remove('open');
  });
}



function renderTracks(tracks) {
  renderTracksToGrid(trackGrid, tracks);
}

const gridButton = document.querySelector('#grid-view-btn');
const listButton = document.querySelector('#list-view-btn');

setupViewToggle(trackGrid, gridButton, listButton);
