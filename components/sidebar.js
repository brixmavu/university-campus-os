import { el } from '../utils/components.js';

const menuItems = {
  Student: ['Dashboard', 'Profile', 'Timetable', 'Assignments', 'Homework', 'Library', 'Activities', 'Messages'],
  Lecturer: ['Dashboard', 'Timetable', 'Assignments', 'Homework', 'Labs', 'Activities', 'Messages'],
  HOD: ['Dashboard', 'Department', 'Labs', 'Activities', 'Messages'],
  Janitor: ['Dashboard', 'Facilities', 'Messages'],
  SuperAdmin: ['Dashboard', 'System Health', 'Analytics', 'Messages']
};

export const Sidebar = (role, currentPath, onNavigate) => {
  const items = menuItems[role] || menuItems['Student'];
  const container = el('div', { style: 'display:flex; flex-wrap:wrap; gap:10px; margin-bottom:28px;' }, []);
  
  items.forEach(item => {
    const path = '/' + item.toLowerCase().replace(' ', '-');
    const isActive = currentPath === path;
    const btn = el('button', { 
      style: `padding:10px 14px; border-radius:10px; border:1px solid ${isActive? '#3b82f6' : '#3a3a3a'}; 
              background:${isActive? '#3b82f6' : '#1a1a1a'}; color:${isActive? '#ffffff' : '#e5e5e5'}; 
              cursor:pointer; font-size:14px; font-weight:${isActive? '600' : '400'};`
    }, [item]);
    btn.onclick = () => { window.location.hash = path; onNavigate(path); };
    container.appendChild(btn);
  });
  
  return container;
};
