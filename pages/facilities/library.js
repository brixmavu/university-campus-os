import { el } from '../../utils/components.js';
import { Card } from '../../components/card.js';
import { Store } from '../../state/store.js';
import { Notifications } from '../../utils/notifications.js';

const getDueDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 14);
  return date.toLocaleDateString();
};

export const Library = (role) => {
  const container = el('div', {}, []);
  container.appendChild(el('h2', {}, ['Library']));
  
  if(!Store.get('books').length) {
    Store.set('books', [
      {id: 1, title: 'Physics Fundamentals', author: 'Dr. Smith', available: 3},
      {id: 2, title: 'Advanced Mathematics', author: 'Prof. Jones', available: 1},
      {id: 3, title: 'Computer Science 101', author: 'Dr. Kim', available: 0}
    ]);
  }
  
  const books = Store.get('books');
  const borrowed = Store.get('borrowed') || [];
  const today = new Date().toLocaleDateString();
  
  books.forEach(book => {
    const borrowedRecord = borrowed.find(b => b.bookId === book.id);
    const isBorrowed =!!borrowedRecord;
    const isOverdue = borrowedRecord && borrowedRecord.dueDate < today;
    
    const cardChildren = [];
    if(isBorrowed) {
      const dueColor = isOverdue? '#ef4444' : '#10b981';
      cardChildren.push(el('div', { style: `margin-top:8px; color:${dueColor}; font-size:12px;` }, 
        [`Due: ${borrowedRecord.dueDate} ${isOverdue? '(OVERDUE)' : ''}`]));
      if(role === 'Student') {
        cardChildren.push(el('button', { style: 'margin-top:8px; font-size:12px; padding:6px 10px; background:#ef4444;' }, ['Return']));
      }
    } else if(role === 'Student' && book.available > 0) {
      cardChildren.push(el('button', { style: 'margin-top:8px; font-size:12px; padding:6px 10px;' }, ['Borrow']));
    }
    
    const card = Card(book.title, `${book.author} | Available: ${book.available}`);
    cardChildren.forEach(child => card.appendChild(child));
    container.appendChild(card);
  });
  
  return container;
};
