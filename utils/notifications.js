import { el } from './components.js';

export const Notifications = {
  get() { return JSON.parse(localStorage.getItem('notifications') || '[]'); },
  add(message, type = 'info') {
    const notifs = this.get();
    const notif = {id: Date.now(), message, type, time: new Date().toLocaleTimeString(), read: false};
    localStorage.setItem('notifications', JSON.stringify([notif,...notifs].slice(0, 20)));
    this.showToast(message, type);
  },
  showToast(message, type) {
    const color = type === 'success'? '#10b981' : type === 'error'? '#ef4444' : type === 'warning'? '#f59e0b' : '#3b82f6';
    const toast = el('div', { 
      style: `position:fixed; top:20px; right:20px; background:${color}; color:white; padding:12px 16px; border-radius:8px; z-index:1000; font-size:14px; box-shadow:0 4px 12px rgba(0,0,0,0.3);` 
    }, [message]);
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  },
  markRead(id) {
    const notifs = this.get().map(n => n.id === id? {...n, read: true} : n);
    localStorage.setItem('notifications', JSON.stringify(notifs));
  }
};
