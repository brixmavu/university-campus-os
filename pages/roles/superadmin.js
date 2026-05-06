import { el } from '../../utils/components.js';
import { Card } from '../../components/card.js';
import { Store } from '../../state/store.js';
import { Logs } from '../../state/logs.js';
import { exportToPDF } from '../../utils/pdf.js';

export const SuperAdmin = () => {
  const container = el('div', {}, []);
  container.appendChild(el('h2', {}, ['System Admin Dashboard']));
  
  const storageUsed = (JSON.stringify(localStorage).length / 1024).toFixed(2);
  const health = storageUsed < 100 ? 'Healthy' : storageUsed < 500 ? 'Warning' : 'Critical';
  const healthColor = health === 'Healthy' ? '#10b981' : health === 'Warning' ? '#f59e0b' : '#ef4444';
  container.appendChild(Card('System Health', el('div', { style: `color:${healthColor}; font-weight:600;` }, [`${health} | Storage: ${storageUsed}KB`] )));
  
  const logs = Logs.get().slice(0, 5);
  const crewCard = Card('Crew Activity', logs.length ? '' : 'No recent activity');
  logs.forEach(log => {
    crewCard.appendChild(el('div', { style: 'font-size:12px; margin-top:4px; border-bottom:1px solid #2a2a2a; padding-bottom:4px;' }, 
      [`[${log.time}] ${log.type}: ${log.message}`]));
  });
  container.appendChild(crewCard);
  
  // PDF Export Controls
  container.appendChild(el('h3', { style: 'margin:16px 0 8px;' }, ['Export Reports']));
  const pdfControls = el('div', { style: 'display:flex; gap:8px; margin-bottom:16px; flex-wrap:wrap;' }, []);
  
  const exportAssignments = el('button', {}, ['Assignments PDF']);
  exportAssignments.onclick = () => exportToPDF('Assignments Report', Store.get('assignments'), 'assignments.pdf');
  pdfControls.appendChild(exportAssignments);
  
  const exportFacilities = el('button', {}, ['Facilities PDF']);
  exportFacilities.onclick = () => exportToPDF('Facility Issues Report', Store.get('facilityIssues'), 'facilities.pdf');
  pdfControls.appendChild(exportFacilities);
  
  const exportLogs = el('button', {}, ['Crew Logs PDF']);
  exportLogs.onclick = () => exportToPDF('System Logs Report', Logs.get(), 'logs.pdf');
  pdfControls.appendChild(exportLogs);
  
  container.appendChild(pdfControls);
  
  // Data Controls
  const controls = el('div', { style: 'display:flex; gap:8px; flex-wrap:wrap;' }, []);
  const exportBtn = el('button', {}, ['Export JSON Backup']);
  exportBtn.onclick = () => {
    const data = {books: Store.get('books'), borrowed: Store.get('borrowed'), activities: Store.get('activities'), 
                  timetable: Store.get('timetable'), assignments: Store.get('assignments'), logs: Logs.get()};
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = el('a', { href: url, download: 'campus-backup.json' }, ['']);
    a.click();
  };
  controls.appendChild(exportBtn);
  
  const resetBtn = el('button', { style: 'background:#ef4444;' }, ['Reset Campus Data']);
  resetBtn.onclick = () => { if(confirm('Delete all campus data?')) { Store.clear(); window.location.reload(); } };
  controls.appendChild(resetBtn);
  container.appendChild(controls);
  
  return container;
};
