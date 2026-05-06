import { el } from '../utils/components.js';
import { Card } from '../components/card.js';
import { Store } from '../state/store.js';

export const Dashboard = (role) => {
  const container = el('div', {}, []);
  container.appendChild(el('h2', { style: 'color:#ffffff; margin-bottom:20px;' }, [`Campus Dashboard - ${role}`]));
  
  const assignments = Store.get('assignments') || [];
  const homework = Store.get('homework') || [];
  const books = Store.get('books') || [];
  const facilityIssues = Store.get('facilityIssues') || [];
  const labBookings = Store.get('labBookings') || [];
  
  if(role === 'Student') {
    const pendingHw = homework.filter(h => h.status === 'pending').length;
    const overdueBooks = (Store.get('borrowed') || []).filter(b => b.dueDate < new Date().toLocaleDateString()).length;
    container.appendChild(Card('Today', `1 assignments | ${pendingHw} pending homework | ${overdueBooks} overdue books`));
  }
  
  if(role === 'Lecturer') {
    const submittedHw = homework.filter(h => h.status === 'submitted').length;
    container.appendChild(Card('Today', `${assignments.length} assignments created | ${submittedHw} submissions to grade`));
  }
  
  if(role === 'HOD') {
    const pendingLabs = labBookings.filter(b => b.status === 'pending').length;
    const pendingFacilities = facilityIssues.filter(i => i.status === 'fixed').length;
    container.appendChild(Card('Today', `${pendingLabs} lab bookings pending | ${pendingFacilities} facility fixes to verify`));
  }
  
  if(role === 'Janitor') {
    const openIssues = facilityIssues.filter(i => i.status === 'open').length;
    container.appendChild(Card('Today', `${openIssues} open facility issues | ${facilityIssues.filter(i => i.status === 'in-progress').length} in progress`));
  }
  
  if(role === 'SuperAdmin') {
    const storageUsed = (JSON.stringify(localStorage).length / 1024).toFixed(2);
    container.appendChild(Card('System Status', `Storage: ${storageUsed}KB | All systems operational`));
  }
  
  return container;
};
