import { el } from '../utils/components.js';

export const Card = (title, content) => {
  const card = el('div', { 
    class: 'card',
    style: 'background:#1a1a1a; border:1px solid #2a2a2a; border-radius:12px; padding:16px; margin-bottom:16px;' 
  }, []);
  
  card.appendChild(el('h3', { style: 'margin-bottom:8px; color:#ffffff;' }, [title]));
  card.appendChild(el('div', { style: 'color:#d0d0d0; font-size:14px;' }, [content]));
  
  return card;
};
