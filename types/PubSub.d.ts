interface PubSub{
    /**
     * used to subscribe to an event
     * 
     * @param event - the name of event
     * @param fn - callback function to be called when event is triggered
     */
    subscribe(event: string, fn: (data: any) => void): () => void;
    publish(event: string, data: any): void;
}