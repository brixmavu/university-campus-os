import { el } from '../../utils/components.js';
import { Card } from '../../components/card.js';
import { Store } from '../../state/store.js';
import { Logs } from '../../state/logs.js';

export const HOD = () => {
  const container = el('div', {}, []);
  container.appendChild(el('h2', {}, ['HOD Approvals Dashboard']));
  
  if(!Store.get('labBookings').length) {
    Store.set('labBookings', [
      {id: 1, lab: 'Lab 3', time: 'Wed 14:00', requestedBy: 'Dr. Smith', status: 'pending'}
    ]);
  }
  
  const labBookings = Store.get('labBookings');
  const facilityIssues = Store.get('facilityIssues') || [];
  
  // Lab Bookings Section
  container.appendChild(el('h3', { style: 'margin:16px 0 8px;' }, ['Pending Lab Bookings']));
  labBookings.filter(b => b.status === 'pending').forEach(booking => {
    const card = Card(`${booking.lab} - ${booking.time}`, `Requested by: ${booking.requestedBy}`);
    
    const approveBtn = el('button', { style: 'margin:8px 4px 0 0; font-size:12px; padding:6px 10px; background:#10b981;' }, ['Approve']);
    approveBtn.onclick = () => {
      Store.set('labBookings', labBookings.map(b => b.id === booking.id ? {...b, status: 'approved'} : b));
      Logs.add({type: 'approval', message: `Approved ${booking.lab} booking for ${booking.requestedBy}`});
      window.location.reload();
    };
    
    const rejectBtn = el('button', { style: 'margin:8px 0 0 4px; font-size:12px; padding:6px 10px; background:#ef4444;' }, ['Reject']);
    rejectBtn.onclick = () => {
      Store.set('labBookings', labBookings.map(b => b.id === booking.id ? {...b, status: 'rejected'} : b));
      Logs.add({type: 'approval', message: `Rejected ${booking.lab} booking for ${booking.requestedBy}`});
      window.location.reload();
    };
    
    card.appendChild(approveBtn);
    card.appendChild(rejectBtn);
    container.appendChild(card);
  });
  
  // Facility Issues Section  
  container.appendChild(el('h3', { style: 'margin:24px 0 8px;' }, ['Facility Issues Pending Review']));
  facilityIssues.filter(i => i.status === 'fixed').forEach(issue => {
    const card = Card(`${issue.location} - ${issue.issue}`, `Status: Fixed | Reported: ${issue.reportedAt}`);
    
    const verifyBtn = el('button', { style: 'margin-top:8px; font-size:12px; padding:6px 10px; background:#3b82f6;' }, ['Verify & Close']);
    verifyBtn.onclick = () => {
      Store.set('facilityIssues', facilityIssues.map(i => i.id === issue.id ? {...i, status: 'verified'} : i));
      Logs.add({type: 'approval', message: `Verified fix for ${issue.issue} at ${issue.location}`});
      window.location.reload();
    };
    card.appendChild(verifyBtn);
    container.appendChild(card);
  });
  
  if(labBookings.filter(b => b.status === 'pending').length === 0 && facilityIssues.filter(i => i.status === 'fixed').length === 0) {
    container.appendChild(Card('All Clear', 'No pending approvals'));
  }
  
  return container;
};
