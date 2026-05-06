import { el } from '../../utils/components.js';
import { Card } from '../../components/card.js';
import { Store } from '../../state/store.js';

export const Analytics = () => {
  const container = el('div', {}, []);
  container.appendChild(el('h2', {}, ['Campus Analytics']));
  
  const assignments = Store.get('assignments') || [];
  const homework = Store.get('homework') || [];
  const books = Store.get('books') || [];
  const borrowed = Store.get('borrowed') || [];
  const activities = Store.get('activities') || [];
  const attendance = Store.get('attendance') || [];
  const facilityIssues = Store.get('facilityIssues') || [];
  
  // Academic Stats
  const submittedHw = homework.filter(h => h.status === 'submitted' || h.status === 'graded').length;
  const gradedHw = homework.filter(h => h.grade!== null);
  const avgGrade = gradedHw.length? (gradedHw.reduce((sum, h) => sum + parseInt(h.grade), 0) / gradedHw.length).toFixed(1) : '0';
  
  container.appendChild(Card('Academic Stats', 
    el('div', {}, [
      el('div', {}, [`Total Assignments: ${assignments.length}`]),
      el('div', {}, [`Homework Submitted: ${submittedHw}/${homework.length}`]),
      el('div', {}, [`Average Grade: ${avgGrade}/100`])
    ])
  ));
  
  // Library Stats
  const borrowedCount = borrowed.length;
  const overdueCount = borrowed.filter(b => b.dueDate < new Date().toLocaleDateString()).length;
  container.appendChild(Card('Library Stats', 
    el('div', {}, [
      el('div', {}, [`Books Borrowed: ${borrowedCount}`]),
      el('div', {}, [`Overdue Books: ${overdueCount}`]),
      el('div', {}, [`Total Books: ${books.length}`])
    ])
  ));
  
  // Facility Stats
  const openIssues = facilityIssues.filter(i => i.status === 'open').length;
  const fixedIssues = facilityIssues.filter(i => i.status === 'fixed' || i.status === 'verified').length;
  container.appendChild(Card('Facility Stats', 
    el('div', {}, [
      el('div', {}, [`Open Issues: ${openIssues}`]),
      el('div', {}, [`Resolved Issues: ${fixedIssues}`]),
      el('div', {}, [`Resolution Rate: ${facilityIssues.length? ((fixedIssues/facilityIssues.length)*100).toFixed(0) : 0}%`])
    ])
  ));
  
  // Activity Attendance Stats
  const avgAttendance = attendance.length? (attendance.reduce((sum, a) => sum + (a.present/a.total*100), 0) / attendance.length).toFixed(0) : '0';
  container.appendChild(Card('Activity Stats', 
    el('div', {}, [
      el('div', {}, [`Total Activities: ${activities.length}`]),
      el('div', {}, [`Average Attendance: ${avgAttendance}%`]),
      el('div', {}, [`Attendance Sessions: ${attendance.length}`])
    ])
  ));
  
  return container;
};
