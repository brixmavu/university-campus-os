import { el } from '../../utils/components.js';
import { Card } from '../../components/card.js';
import { Store } from '../../state/store.js';
import { Logs } from '../../state/logs.js';

export const Janitor = () => {
  const container = el('div', {}, []);
  container.appendChild(el('h2', {}, ['Facility Maintenance']));
  
  if(!Store.get('facilityIssues').length) {
    Store.set('facilityIssues', [
      {id: 1, location: 'Room 101', issue: 'Broken desk', status: 'open', reportedAt: new Date().toLocaleTimeString()},
      {id: 2, location: 'Lab 3', issue: 'Water leak', status: 'fixed', reportedAt: '08:30am'}
    ]);
  }
  
  const issues = Store.get('facilityIssues');
  
  // Report form
  const form = el('div', { style: 'margin-bottom:20px; padding:16px; background:#1a1a1a; border-radius:12px; border:1px solid #2a2a2a;' }, [
    el('h3', {}, ['Report New Issue']),
    el('input', { id: 'location', placeholder: 'Location e.g. Room 202', style: 'width:100%; margin:8px 0; padding:8px; background:#0f0f0f; border:1px solid #2a2a2a; color:#e5e5e5; border-radius:6px;' }),
    el('input', { id: 'issue', placeholder: 'Issue description', style: 'width:100%; margin:8px 0; padding:8px; background:#0f0f0f; border:1px solid #2a2a2a; color:#e5e5e5; border-radius:6px;' }),
    el('button', { style: 'margin-top:8px;' }, ['Submit Report'])
  ]);
  
  form.querySelector('button').onclick = () => {
    const location = form.querySelector('#location').value;
    const issue = form.querySelector('#issue').value;
    if(location && issue) {
      const newIssue = {id: Date.now(), location, issue, status: 'open', reportedAt: new Date().toLocaleTimeString()};
      Store.set('facilityIssues', [newIssue, ...issues]);
      Logs.add({type: 'facility', message: `Reported: ${issue} at ${location}`});
      window.location.reload();
    }
  };
  container.appendChild(form);
  
  // Issues list
  issues.forEach(issue => {
    const statusColor = issue.status === 'open' ? '#ef4444' : issue.status === 'in-progress' ? '#f59e0b' : '#10b981';
    const card = Card(`${issue.location} - ${issue.issue}`, `Status: ${issue.status} | Reported: ${issue.reportedAt}`);
    
    if(issue.status !== 'fixed') {
      const btn = el('button', { style: `margin-top:8px; font-size:12px; padding:6px 10px; background:${statusColor};` }, 
        [issue.status === 'open' ? 'Start Fix' : 'Mark Fixed']);
      btn.onclick = () => {
        const newStatus = issue.status === 'open' ? 'in-progress' : 'fixed';
        Store.set('facilityIssues', issues.map(i => i.id === issue.id ? {...i, status: newStatus} : i));
        Logs.add({type: 'facility', message: `${newStatus}: ${issue.issue} at ${issue.location}`});
        window.location.reload();
      };
      card.appendChild(btn);
    }
    
    container.appendChild(card);
  });
  
  return container;
};
