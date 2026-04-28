import { describe, expect, it, vi } from 'vitest';

import { MusicPlayer } from './MusicPlay.js';

describe('MusicPlayer', () => {
  it('play(trackId) publishes stop for previous and play for next in exact order', () => {
    const bus = { publish: vi.fn() };
    const player = MusicPlayer(bus);

    player.play('track-1');

    expect(bus.publish).toHaveBeenCalledTimes(2);
    expect(bus.publish).toHaveBeenNthCalledWith(1, 'music:stop', null);
    expect(bus.publish).toHaveBeenNthCalledWith(2, 'music:play', 'track-1');

    bus.publish.mockClear();

    player.play('track-2');

    expect(bus.publish).toHaveBeenCalledTimes(2);
    expect(bus.publish).toHaveBeenNthCalledWith(1, 'music:stop', 'track-1');
    expect(bus.publish).toHaveBeenNthCalledWith(2, 'music:play', 'track-2');
  });

  it('playing the same track follows stop path (toggle behavior)', () => {
    const bus = { publish: vi.fn() };
    const player = MusicPlayer(bus);

    player.play('track-1');
    bus.publish.mockClear();

    player.play('track-1');

    expect(bus.publish).toHaveBeenCalledTimes(1);
    expect(bus.publish).toHaveBeenCalledWith('music:stop', 'track-1');
  });

  it('stop() clears current track and publishes stop with the previous current track', () => {
    const bus = { publish: vi.fn() };
    const player = MusicPlayer(bus);

    player.play('track-3');
    bus.publish.mockClear();

    expect(player.getCurrent()).toBe('track-3');

    player.stop();

    expect(bus.publish).toHaveBeenCalledTimes(1);
    expect(bus.publish).toHaveBeenCalledWith('music:stop', 'track-3');
    expect(player.getCurrent()).toBeNull();
  });

  it('getCurrent() reflects state before and after play/stop actions', () => {
    const bus = { publish: vi.fn() };
    const player = MusicPlayer(bus);

    expect(player.getCurrent()).toBeNull();

    player.play('track-a');
    expect(player.getCurrent()).toBe('track-a');

    player.play('track-a');
    expect(player.getCurrent()).toBeNull();

    player.play('track-b');
    expect(player.getCurrent()).toBe('track-b');

    player.stop();
    expect(player.getCurrent()).toBeNull();
  });
});
