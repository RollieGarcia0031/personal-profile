import { describe, expect, it, beforeEach } from 'vitest';
import {
  getSortValue,
  getVisibleTracks,
  parseDurationToSeconds,
  renderTracks,
  setupViewToggle
} from './helpers.js';

const fixtureTracks = [
  {
    id: 'track-zeta',
    title: 'Zeta Song',
    description: 'Final story chapter',
    genre: 'Ambient',
    writer: 'Writer Alpha',
    duration: '02:03',
    date: '2024-05-01',
    audioSrc: '/zeta.mp3',
    imgSrc: '/zeta.png',
    bpm: '110'
  },
  {
    id: 'track-alpha',
    title: 'Alpha Song',
    description: 'Opening theme',
    genre: 'Ballad',
    writer: 'Writer Beta',
    duration: '00:59',
    date: '2023-01-10',
    audioSrc: '/alpha.mp3',
    imgSrc: '/alpha.png',
    bpm: '90'
  },
  {
    id: 'id-only-match',
    title: 'Middle Song',
    description: '',
    genre: undefined,
    writer: undefined,
    duration: 'bad-value',
    date: '2022-12-25',
    audioSrc: '/middle.mp3',
    imgSrc: '/middle.png',
    bpm: '100'
  }
];

describe('tracks helpers', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('filters search across title/description/genre/writer/id', () => {
    expect(getVisibleTracks(fixtureTracks, { searchTerm: 'zeta song', sortBy: 'title' }).map(track => track.id)).toEqual(['track-zeta']);
    expect(getVisibleTracks(fixtureTracks, { searchTerm: 'opening', sortBy: 'title' }).map(track => track.id)).toEqual(['track-alpha']);
    expect(getVisibleTracks(fixtureTracks, { searchTerm: 'ballad', sortBy: 'title' }).map(track => track.id)).toEqual(['track-alpha']);
    expect(getVisibleTracks(fixtureTracks, { searchTerm: 'beta', sortBy: 'title' }).map(track => track.id)).toEqual(['track-alpha']);
    expect(getVisibleTracks(fixtureTracks, { searchTerm: 'id-only', sortBy: 'title' }).map(track => track.id)).toEqual(['id-only-match']);
  });

  it('sorts by title/date/duration and treats malformed durations as 0', () => {
    expect(getVisibleTracks(fixtureTracks, { searchTerm: '', sortBy: 'title' }).map(track => track.title)).toEqual([
      'Alpha Song',
      'Middle Song',
      'Zeta Song'
    ]);

    expect(getVisibleTracks(fixtureTracks, { searchTerm: '', sortBy: 'date' }).map(track => track.date)).toEqual([
      '2022-12-25',
      '2023-01-10',
      '2024-05-01'
    ]);

    expect(getVisibleTracks(fixtureTracks, { searchTerm: '', sortBy: 'duration' }).map(track => track.id)).toEqual([
      'id-only-match',
      'track-alpha',
      'track-zeta'
    ]);

    expect(parseDurationToSeconds('bad-value')).toBe(0);
    expect(getSortValue({ duration: 'broken' }, 'duration')).toBe(0);
  });

  it('renderTracks creates expected track-option elements and attributes', () => {
    const trackGrid = document.createElement('div');

    renderTracks(trackGrid, fixtureTracks.slice(0, 2));

    const options = trackGrid.querySelectorAll('track-option');
    expect(options).toHaveLength(2);
    expect(options[0].getAttribute('track-id')).toBe('track-zeta');
    expect(options[0].getAttribute('track-title')).toBe('Zeta Song');
    expect(options[0].getAttribute('track-duration')).toBe('02:03');
    expect(options[1].getAttribute('track-id')).toBe('track-alpha');
    expect(options[1].getAttribute('track-genre')).toBe('Ballad');
  });

  it('view toggle buttons set grid/list classes and active states', () => {
    const trackGrid = document.createElement('div');
    const gridButton = document.createElement('button');
    const listButton = document.createElement('button');

    setupViewToggle(trackGrid, gridButton, listButton);

    expect(trackGrid.classList.contains('grid-view')).toBe(true);
    expect(trackGrid.classList.contains('list-view')).toBe(false);
    expect(gridButton.classList.contains('active')).toBe(true);
    expect(listButton.classList.contains('active')).toBe(false);

    listButton.click();

    expect(trackGrid.classList.contains('grid-view')).toBe(false);
    expect(trackGrid.classList.contains('list-view')).toBe(true);
    expect(gridButton.classList.contains('active')).toBe(false);
    expect(listButton.classList.contains('active')).toBe(true);
  });
});
