import { el } from '../utils/components.js';
import { Card } from '../components/card.js';
import { Store } from '../state/store.js';

export const Messages = (role) => {
  const container = el('div', {}, []);
  container.appendChild(el('h2', {}, ['Campus Inbox']));
  
  if(!Store.get('messages').length) {
    Store.set('messages', [
      {id: 1, from: 'SuperAdmin', to: 'All', subject: 'Welcome to Campus OS', content: 'System is now live', time: '09:00am', read: false}
    ]);
  }
  
  const messages = Store.get('messages');
  const userMessages = messages.filter(m => m.to === role || m.to === 'All');
  
  if(role!== 'Student') {
    const form = el('div', { style: 'margin-bottom:20px; padding:16px; background:#1a1a1a; border-radius:12px; border:1px solid #2a2a2a;' }, [
      el('h3', {}, ['Send Message']),
      el('select', { id: 'to', style: 'width:100%; margin:8px 0; padding:8px; background:#0f0f0f; border:1px solid #2a2a2a; color:#e5e5e5; border-radius:6px;' }, 
        ['Student','Lecturer','HOD','Janitor','All'].map(r => el('option', { value: r }, [r]))),
      el('input', { id: 'subject', placeholder: 'Subject', style: 'width:100%; margin:8px 0; padding:8px; background:#0f0f0f; border:1px solid #2a2a2a; color:#e5e5e5; border-radius:6px;' }),
      el('textarea', { id: 'content', placeholder: 'Message', style: 'width:100%; margin:8px 0; padding:8px; background:#0f0f0f; border:1px solid #2a2a2a; color:#e5e5e5; border-radius:6px; height:60px;' }),
      el('button', { style: 'margin-top:8px;' }, ['Send'])
    ]);
    
    form.querySelector('button').onclick = () => {
      const to = form.querySelector('#to').value;
      const subject = form.querySelector('#subject').value;
      const content = form.querySelector('#content').value;
      if(subject && content) {
        const newMsg = {id: Date.now(), from: role, to, subject, content, time: new Date().toLocaleTimeString(), read: false};
        Store.set('messages', [newMsg,...messages]);
        window.location.reload();
      }
    };
    container.appendChild(form);
  }
  
  userMessages.forEach(msg => {
    const cardChildren = [el('div', { style: 'margin-top:8px; font-size:14px; color:#ccc;' }, [msg.content])];
    if(!msg.read) {
      cardChildren.push(el('button', { style: 'margin-top:8px; font-size:12px; padding:6px 10px;' }, ['Mark Read']));
    }
    const card = Card(msg.subject, `From: ${msg.from} | ${msg.time}`);
    cardChildren.forEach(child => card.appendChild(child));
    container.appendChild(card);
  });
  
  if(!userMessages.length) {
    container.appendChild(Card('Inbox Empty', 'No messages yet'));
  }
  
  return container;
};
