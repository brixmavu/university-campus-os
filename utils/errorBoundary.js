import { el } from './components.js';

export const ErrorBoundary = (component, role, path, onNavigate) => {
  try {
    return component(role, path, onNavigate);
  } catch(error) {
    console.error('Component Error:', error);
    return el('div', { style: 'padding:20px; background:#1a1a1a; border-radius:12px; border:1px solid #ef4444; color:#ef4444;' }, [
      el('h3', {}, ['Something went wrong']),
      el('div', { style: 'font-size:12px; margin-top:8px;' }, [error.message]),
      el('button', { style: 'margin-top:12px; background:#ef4444;' }, ['Reload Page'])
    ]);
  }
};
