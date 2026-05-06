import { Logs } from '../state/logs.js';
window.onerror = (msg, src, line, col, err) => {
  Logs.add({ type: 'error', message: msg, location: `${src}:${line}` });
};
