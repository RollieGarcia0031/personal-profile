// @ts-check

import { createPubSub } from './createPubSub.js';

/**
 * @type {MusicPlay}
 */
export const MusicPlayer = (bus)=>{
    /** @type {any} */
    let currentTrack = null;

    return {
        play(trackId){
            // stop if the currently playing track is the same
            if (trackId === currentTrack) {
                this.stop();
                return;
            };

            // stop the currently playing track
            bus.publish('music:stop', currentTrack);
            // update the currently played id track
            currentTrack = trackId;
            // play the new track
            bus.publish('music:play', trackId);
        },

        stop(){
            bus.publish('music:stop', currentTrack);
            currentTrack = null;
        },

        getCurrent() {
            return currentTrack;
        }
    }
}