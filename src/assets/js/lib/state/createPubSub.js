/**
 * @returns {PubSub}
 */
export function createPubSub(){
    const events = {};

    return {
        subscribe: function(event, fn){
            events[event] ||= new Set();
            events[event].add(fn);
            
            return ()=>events[event].delete(fn)
        },

        publish: function(event, data){
            events[event]?.forEach(fn => fn(data));
        }
    };
}