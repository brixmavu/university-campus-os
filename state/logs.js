export const Logs = {
  get() { return JSON.parse(localStorage.getItem('logs') || '[]'); },
  add(entry) { 
    const logs = this.get(); 
    logs.unshift({...entry, time: new Date().toLocaleTimeString() });
    localStorage.setItem('logs', JSON.stringify(logs.slice(0, 100)));
  }
};
