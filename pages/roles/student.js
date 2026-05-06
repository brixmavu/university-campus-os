import { el } from '../../utils/components.js';
import { Card } from '../../components/card.js';
import { Store } from '../../state/store.js';

export const Student = () => {
  const container = el('div', {}, []);
  container.appendChild(el('h2', {}, ['Student Profile']));
  
  const homework = Store.get('homework') || [];
  const borrowed = Store.get('borrowed') || [];
  const joinedActivities = Store.get('joinedActivities') || [];
  const activities = Store.get('activities') || [];
  const books = Store.get('books') || [];
  
  // Grades Summary
  const gradedHomework = homework.filter(h => h.grade!== null);
  const avgGrade = gradedHomework.length? (gradedHomework.reduce((sum, h) => sum + parseInt(h.grade), 0) / gradedHomework.length).toFixed(1) : 'N/A';
  container.appendChild(Card('Academic Performance', `Average Grade: ${avgGrade}/100 | Submitted: ${gradedHomework.length}/${homework.length}`));
  
  // Borrowed Books
  container.appendChild(el('h3', { style: 'margin:16px 0 8px;' }, ['Borrowed Books']));
  borrowed.forEach(b => {
    const book = books.find(book => book.id === b.bookId);
    if(book) {
      const isOverdue = b.dueDate < new Date().toLocaleDateString();
      container.appendChild(Card(book.title, `Due: ${b.dueDate} ${isOverdue? '| OVERDUE' : ''}`));
    }
  });
  
  // Joined Activities
  container.appendChild(el('h3', { style: 'margin:16px 0 8px;' }, ['My Activities']));
  joinedActivities.forEach(actId => {
    const act = activities.find(a => a.id === actId);
    if(act) container.appendChild(Card(act.name, `Coach: ${act.coach}`));
  });
  
  if(!borrowed.length &&!joinedActivities.length) {
    container.appendChild(Card('No Activity', 'You haven\'t borrowed books or joined activities yet'));
  }
  
  return container;
};
