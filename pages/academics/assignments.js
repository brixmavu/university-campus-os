import { el } from '../../utils/components.js';
import { Card } from '../../components/card.js';
import { Store } from '../../state/store.js';
import { Logs } from '../../state/logs.js';
import { Notifications } from '../../utils/notifications.js';

export const Assignments = (role) => {
  const container = el('div', {}, []);
  container.appendChild(el('h2', {}, ['Assignments']));
  
  if(!Store.get('assignments').length) {
    Store.set('assignments', [{id: 1, title: 'Math Quiz', due: '2026-05-10', status: 'pending', createdBy: 'Lecturer'}]);
  }
  
  const assignments = Store.get('assignments');
  
  if(role === 'Lecturer') {
    const form = el('div', { style: 'margin-bottom:20px; padding:16px; background:#1a1a; border-radius:12px; border:1px solid #2a2a2a;' }, [
      el('h3', {}, ['Create Assignment']),
      el('input', { id: 'title', placeholder: 'Assignment title', style: 'width:100%; margin:8px 0; padding:8px; background:#0f0f0f; border:1px solid #2a2a2a; color:#e5e5e5; border-radius:6px;' }),
      el('input', { id: 'due', type: 'date', style: 'width:100%; margin:8px 0; padding:8px; background:#0f0f0f; border:1px solid #2a2a2a; color:#e5e5e5; border-radius:6px;' }),
      el('button', { style: 'margin-top:8px;' }, ['+ Create'])
    ]);
    
    form.querySelector('button').onclick = () => {
      const title = form.querySelector('#title').value;
      const due = form.querySelector('#due').value;
      if(title && due) {
        const newAssign = {id: Date.now(), title, due, status: 'pending', createdBy: 'Lecturer'};
        Store.set('assignments', [newAssign,...assignments]);
        Logs.add({type: 'assignment', message: `Created: ${title} due ${due}`});
        Notifications.add(`Assignment "${title}" created successfully`, 'success');
        window.location.reload();
      }
    };
    container.appendChild(form);
  }
  
  assignments.forEach(a => {
    const card = Card(a.title, `Due: ${a.due} | Status: ${a.status}`);
    if(role === 'Student' && a.status === 'pending') {
      const btn = el('button', { style: 'margin-top:8px; font-size:12px; padding:6px 10px;' }, ['Do Homework']);
      btn.onclick = () => { window.location.hash = '/homework'; };
      card.appendChild(btn);
    }
    container.appendChild(card);
  });
  
  return container;
};
