type MusicPlay = (bus: PubSub)=>{
    
    /**
     * Plays a track
     * @param trackId 
     */
    play:(trackId: string)=>void;

    /**
     * Stop the current track
     */
    stop:()=>void;

    /**
     * Get the current track id
     */
    getCurrent():string
}