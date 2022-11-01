class EventEmitter {
    constructor() {
      this.listeners = [];
    }
  
    emit(eventName) {
      let parameter = [...Array.from(arguments)].slice(1);
  
      if (this.listeners[eventName]) {
        this.listeners[eventName].forEach((listener) => {
          listener(...parameter);
        });
      }
    }
  
    on(eventName, listener) {
      if (!this.listeners[eventName]) {
        this.listeners[eventName] = [];
      }
  
      this.listeners[eventName].push(listener);
    }
  
    removeAllListeners() {
      this.listeners = [];
    }
  }
  
  export default EventEmitter;
  