/**
 * Convert a duration string (`mm:ss`) to total seconds.
 *
 * Invalid values (missing field, missing `:`, non-numeric pieces)
 * intentionally fall back to `0` so duration sorts remain stable and safe.
 *
 * @param {string | undefined | null} duration
 * @returns {number}
 */
export function parseDurationToSeconds(duration) {
  if (!duration || !duration.includes(':')) {
    return 0;
  }

  const [minutesText, secondsText] = duration.split(':');
  const minutes = Number.parseInt(minutesText, 10);
  const seconds = Number.parseInt(secondsText, 10);

  if (Number.isNaN(minutes) || Number.isNaN(seconds)) {
    return 0;
  }

  return (minutes * 60) + seconds;
}

/**
 * Normalize a track field into a comparable sort value.
 *
 * Sort strategy:
 * - `duration`: numeric seconds from `parseDurationToSeconds`
 * - everything else: lower-cased string fallback from selected field -> title -> ''
 *
 * @param {Record<string, unknown>} track
 * @param {string} sortBy
 * @returns {string | number}
 */
export function getSortValue(track, sortBy) {
  if (sortBy === 'duration') {
    return parseDurationToSeconds(/** @type {string | undefined} */ (track.duration));
  }

  return (track[sortBy] || track.title || '').toString().toLowerCase();
}

/**
 * Build the visible track list from source tracks + active filter state.
 *
 * Filtering:
 * - case-insensitive substring match across title/description/genre/writer/id
 *
 * Sorting:
 * - ascending by normalized value from `getSortValue`
 * - numeric compare when both values are numbers; otherwise locale string compare
 *
 * @param {Array<Record<string, any>>} tracks
 * @param {{ searchTerm?: string, sortBy: string }} filters
 * @returns {Array<Record<string, any>>}
 */
export function getVisibleTracks(tracks, filters) {
  const searchTerm = (filters.searchTerm || '').toLowerCase();

  const filteredTracks = tracks.filter((track) => {
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

    return searchableText.includes(searchTerm);
  });

  return [...filteredTracks].sort((a, b) => {
    const first = getSortValue(a, filters.sortBy);
    const second = getSortValue(b, filters.sortBy);

    if (typeof first === 'number' && typeof second === 'number') {
      return first - second;
    }

    return first.localeCompare(second);
  });
}

/**
 * Render tracks as `<track-option>` elements into the provided container.
 *
 * Behavior notes:
 * - fully replaces existing children on each call
 * - mirrors the attribute contract expected by the `track-option` web component
 *
 * @param {HTMLElement} trackGrid
 * @param {Array<Record<string, any>>} tracks
 * @returns {void}
 */
export function renderTracks(trackGrid, tracks) {
  trackGrid.replaceChildren();

  tracks.forEach((track) => {
    const newTrackOption = document.createElement('track-option');

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
 * Wire the grid/list view toggle controls and initialize default grid mode.
 *
 * Adds/removes:
 * - grid class: `grid-view`
 * - list class: `list-view`
 * - active button state: `active`
 *
 * @param {HTMLElement} trackGrid
 * @param {HTMLButtonElement | null} gridButton
 * @param {HTMLButtonElement | null} listButton
 * @returns {{ useGridView: () => void, useListView: () => void }}
 */
export function setupViewToggle(trackGrid, gridButton, listButton) {
  const gridViewClass = 'grid-view';
  const listViewClass = 'list-view';

  function useGridView() {
    listButton?.classList.remove('active');
    gridButton?.classList.add('active');

    trackGrid.classList.remove(listViewClass);
    trackGrid.classList.add(gridViewClass);
  }

  function useListView() {
    gridButton?.classList.remove('active');
    listButton?.classList.add('active');

    trackGrid.classList.remove(gridViewClass);
    trackGrid.classList.add(listViewClass);
  }

  useGridView();
  gridButton?.addEventListener('click', useGridView);
  listButton?.addEventListener('click', useListView);

  return {
    useGridView,
    useListView
  };
}
