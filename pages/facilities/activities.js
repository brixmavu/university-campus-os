import { el } from '../../utils/components.js';
import { Card } from '../../components/card.js';
import { Store } from '../../state/store.js';
import { Logs } from '../../state/logs.js';
import { Notifications } from '../../utils/notifications.js';

export const Activities = (role) => {
  const container = el('div', {}, []);
  container.appendChild(el('h2', {}, ['Extra Mural Activities']));
  
  if(!Store.get('activities').length) {
    Store.set('activities', [
      {id: 1, name: 'Football Club', coach: 'Coach Moyo', members: 12, max: 20},
      {id: 2, name: 'Debate Club', coach: 'Ms. Nyasha', members: 8, max: 15},
      {id: 3, name: 'Coding Club', coach: 'Mr. Tinashe', members: 15, max: 15}
    ]);
  }
  
  if(!Store.get('attendance').length) {
    Store.set('attendance', []);
  }
  
  const activities = Store.get('activities');
  const joined = Store.get('joinedActivities') || [];
  const attendance = Store.get('attendance');
  const today = new Date().toLocaleDateString();
  
  activities.forEach(act => {
    const isJoined = joined.includes(act.id);
    const isFull = act.members >= act.max;
    const todaysAttendance = attendance.find(a => a.activityId === act.id && a.date === today);
    
    const cardChildren = [];
    if(role === 'Student') {
      const btnText = isJoined? 'Leave' : isFull? 'Full' : 'Join';
      const btnColor = isJoined? '#ef4444' : isFull? '#6b7280' : '#10b981';
      if(!isFull || isJoined) {
        cardChildren.push(el('button', { style: `margin-top:8px; font-size:12px; padding:6px 10px; background:${btnColor};` }, [btnText]));
      }
    }
    
    if((role === 'Lecturer' || role === 'HOD') && todaysAttendance) {
      cardChildren.push(el('div', { style: 'margin-top:8px; color:#10b981; font-size:12px;' }, 
        [`Attendance marked: ${todaysAttendance.present}/${todaysAttendance.total} present`]));
    } else if((role === 'Lecturer' || role === 'HOD') && isJoined) {
      cardChildren.push(el('button', { style: 'margin-top:8px; font-size:12px; padding:6px 10px;' }, ['Mark Attendance']));
    }
    
    const card = Card(act.name, `Coach: ${act.coach} | ${act.members}/${act.max} members`);
    cardChildren.forEach(child => card.appendChild(child));
    container.appendChild(card);
  });
  
  return container;
};
