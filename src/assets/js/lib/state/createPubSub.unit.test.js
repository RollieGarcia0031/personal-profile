import { describe, expect, it, vi } from 'vitest';

import { createPubSub } from './createPubSub.js';

describe('createPubSub', () => {
  it('subscribe registers callbacks and publish forwards payload to all listeners', () => {
    const bus = createPubSub();
    const payload = { id: 'track-1' };
    const listenerA = vi.fn();
    const listenerB = vi.fn();

    bus.subscribe('music:play', listenerA);
    bus.subscribe('music:play', listenerB);

    bus.publish('music:play', payload);

    expect(listenerA).toHaveBeenCalledTimes(1);
    expect(listenerA).toHaveBeenCalledWith(payload);
    expect(listenerB).toHaveBeenCalledTimes(1);
    expect(listenerB).toHaveBeenCalledWith(payload);
  });

  it('returned unsubscribe function removes callback', () => {
    const bus = createPubSub();
    const listener = vi.fn();
    const unsubscribe = bus.subscribe('music:stop', listener);

    unsubscribe();
    bus.publish('music:stop', 'track-2');

    expect(listener).not.toHaveBeenCalled();
  });

  it('publishing unknown event does not crash', () => {
    const bus = createPubSub();

    expect(() => bus.publish('does:not:exist', { noop: true })).not.toThrow();
  });
});
