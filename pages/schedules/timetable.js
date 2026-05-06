import { el } from '../../utils/components.js';
import { Card } from '../../components/card.js';
import { Store } from '../../state/store.js';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const timeSlots = ['08:00', '10:00', '12:00', '14:00', '16:00'];

export const Timetable = (role) => {
  const container = el('div', {}, []);
  container.appendChild(el('h2', {}, ['Weekly Timetable']));
  
  if(!Store.get('timetable').length) {
    Store.set('timetable', [
      {day: 'Mon', time: '08:00', subject: 'Mathematics', type: 'class', location: 'Room 101'},
      {day: 'Wed', time: '14:00', subject: 'Physics Lab', type: 'lab', location: 'Lab 3'},
      {day: 'Fri', time: '16:00', subject: 'Football', type: 'activity', location: 'Field A'}
    ]);
  }
  
  const timetable = Store.get('timetable');
  const grid = el('div', { style: 'display:grid; grid-template-columns: 80px repeat(5, 1fr); gap:8px; overflow-x:auto;' }, []);
  
  grid.appendChild(el('div', { style: 'font-weight:600; padding:8px;' }, ['Time']));
  days.forEach(day => grid.appendChild(el('div', { style: 'font-weight:600; padding:8px; text-align:center;' }, [day])));
  
  timeSlots.forEach(time => {
    grid.appendChild(el('div', { style: 'padding:8px; font-size:12px; color:#888;' }, [time]));
    days.forEach(day => {
      const event = timetable.find(e => e.day === day && e.time === time);
      const color = event?.type === 'lab'? '#3b82f6' : event?.type === 'activity'? '#10b981' : '#f59e0b';
      const cellContent = event? [el('div', { style: 'font-weight:600;' }, [event.subject]), el('div', {}, [event.location])] : [];
      const cell = el('div', { 
        style: `min-height:60px; padding:6px; border-radius:8px; background:${event? color : '#1a1a1a'}; border:1px solid #2a2a; font-size:12px;` 
      }, cellContent);
      grid.appendChild(cell);
    });
  });
  
  container.appendChild(grid);
  
  if(role === 'Lecturer' || role === 'HOD') {
    container.appendChild(el('button', { style: 'margin-top:16px;' }, ['+ Add Event']));
  }
  
  return container;
};
