import { el } from '../../utils/components.js';
import { Card } from '../../components/card.js';
import { Store } from '../../state/store.js';
import { Logs } from '../../state/logs.js';

const labs = ['Lab 1 - Computer', 'Lab 2 - Chemistry', 'Lab 3 - Physics'];
const timeSlots = ['08:00-10:00', '10:00-12:00', '14:00-16:00', '16:00-18:00'];

export const Labs = (role) => {
  const container = el('div', {}, []);
  container.appendChild(el('h2', {}, ['Lab Booking System']));
  
  if(!Store.get('labBookings').length) {
    Store.set('labBookings', []);
  }
  
  const bookings = Store.get('labBookings');
  
  // Booking form for Lecturers
  if(role === 'Lecturer') {
    const form = el('div', { style: 'margin-bottom:20px; padding:16px; background:#1a1a1a; border-radius:12px; border:1px solid #2a2a2a;' }, [
      el('h3', {}, ['Book Lab Slot']),
      el('select', { id: 'lab', style: 'width:100%; margin:8px 0; padding:8px; background:#0f0f0f; border:1px solid #2a2a2a; color:#e5e5e5; border-radius:6px;' }, 
        labs.map(l => el('option', { value: l }, [l]))),
      el('select', { id: 'time', style: 'width:100%; margin:8px 0; padding:8px; background:#0f0f0f; border:1px solid #2a2a2a; color:#e5e5e5; border-radius:6px;' }, 
        timeSlots.map(t => el('option', { value: t }, [t]))),
      el('button', { style: 'margin-top:8px;' }, ['Request Booking'])
    ]);
    
    form.querySelector('button').onclick = () => {
      const lab = form.querySelector('#lab').value;
      const time = form.querySelector('#time').value;
      const newBooking = {id: Date.now(), lab, time, requestedBy: 'Lecturer', status: 'pending'};
      
      // Check for conflicts
      const conflict = bookings.find(b => b.lab === lab && b.time === time && b.status === 'approved');
      if(conflict) {
        alert('This slot is already booked and approved');
        return;
      }
      
      Store.set('labBookings', [newBooking, ...bookings]);
      Logs.add({type: 'lab', message: `Requested ${lab} at ${time}`});
      window.location.reload();
    };
    container.appendChild(form);
  }
  
  // My Bookings
  container.appendChild(el('h3', { style: 'margin:16px 0 8px;' }, ['My Bookings']));
  bookings.forEach(booking => {
    const statusColor = booking.status === 'pending' ? '#f59e0b' : booking.status === 'approved' ? '#10b981' : '#ef4444';
    container.appendChild(Card(`${booking.lab} - ${booking.time}`, `Status: ${booking.status} | By: ${booking.requestedBy}`));
  });
  
  return container;
};
