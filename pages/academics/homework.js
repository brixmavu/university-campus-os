import { el } from '../../utils/components.js';
import { Card } from '../../components/card.js';
import { Store } from '../../state/store.js';
import { Notifications } from '../../utils/notifications.js';

export const Homework = (role) => {
  const container = el('div', {}, []);
  container.appendChild(el('h2', {}, ['Homework Submissions']));
  
  if(!Store.get('homework').length) {
    Store.set('homework', [
      {id: 1, assignmentId: 1, student: 'John Doe', status: 'pending', grade: null, file: 'math_quiz.pdf'}
    ]);
  }
  
  const homework = Store.get('homework');
  
  homework.forEach(hw => {
    const cardChildren = [];
    
    if(hw.file) {
      cardChildren.push(el('div', { style: 'font-size:12px; margin-top:4px; color:#888;' }, [`File: ${hw.file}`]));
    }
    
    if(role === 'Student' && hw.status === 'pending') {
      const input = el('input', { type: 'file', style: 'margin-top:8px; font-size:12px; color:#e5e5e5;' });
      const btn = el('button', { style: 'margin-top:8px; font-size:12px; padding:6px 10px;' }, ['Submit']);
      btn.onclick = () => {
        if(input.files[0]) {
          Store.set('homework', homework.map(h => h.id === hw.id? {...h, status: 'submitted', file: input.files[0].name} : h));
          Notifications.add('Homework submitted successfully', 'success');
          window.location.reload();
        }
      };
      cardChildren.push(input, btn);
    }
    
    if(role === 'Lecturer' && hw.status === 'submitted') {
      const input = el('input', { type: 'number', placeholder: 'Grade /100', style: 'margin-top:8px; width:80px; padding:4px; background:#1a1a1a; border:1px solid #2a2a2a; color:#e5e5e5; border-radius:4px;' });
      const btn = el('button', { style: 'margin-top:8px; font-size:12px; padding:6px 10px; background:#10b981;' }, ['Grade']);
      btn.onclick = () => {
        if(input.value) {
          Store.set('homework', homework.map(h => h.id === hw.id? {...h, status: 'graded', grade: input.value} : h));
          Notifications.add(`Graded: ${input.value}/100`, 'success');
          window.location.reload();
        }
      };
      cardChildren.push(input, btn);
    }
    
    if(hw.grade) {
      cardChildren.push(el('div', { style: 'margin-top:8px; color:#10b981; font-size:14px; font-weight:600;' }, [`Grade: ${hw.grade}/100`]));
    }
    
    const card = Card(`Assignment #${hw.assignmentId}`, `Student: ${hw.student} | Status: ${hw.status}`);
    cardChildren.forEach(child => card.appendChild(child));
    container.appendChild(card);
  });
  
  return container;
};
