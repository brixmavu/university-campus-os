import { el } from '../utils/components.js';
import { Notifications } from '../utils/notifications.js';

export const Navbar = (currentRole, onRoleChange) => {
  const roles = ['Student', 'Lecturer', 'HOD', 'Janitor', 'SuperAdmin'];
  const select = el('select', { style: 'padding:10px 12px; border-radius:8px; background:#1a1a1a; color:#ffffff; border:1px solid #3a3a3a; min-width:120px;' }, []);
  
  roles.forEach(r => {
    const opt = el('option', { value: r }, [r]);
    if(r === currentRole) opt.selected = true;
    select.appendChild(opt);
  });
  
  select.onchange = (e) => onRoleChange(e.target.value);
  
  const notifs = Notifications.get();
  const unreadCount = notifs.filter(n =>!n.read).length;
  
  const bellChildren = [el('span', { style: 'font-size:22px;' }, ['🔔'])];
  if(unreadCount > 0) {
    bellChildren.push(el('span', { 
      style: 'position:absolute; top:2px; right:2px; background:#ef4444; color:white; border-radius:50%; width:20px; height:20px; font-size:12px; display:flex; align-items:center; justify-content:center; font-weight:600;' 
    }, [unreadCount.toString()]));
  }
  
  const bell = el('div', { style: 'position:relative; cursor:pointer; padding:8px;' }, bellChildren);
  
  bell.onclick = () => {
    alert('Notifications:\n' + notifs.map(n => `• ${n.message} [${n.time}]`).join('\n'));
    notifs.filter(n =>!n.read).forEach(n => Notifications.markRead(n.id));
  };
  
  return el('div', { 
    style: 'display:flex; justify-content:space-between; align-items:center; padding:16px 0; border-bottom:1px solid #2a2a2a; margin-bottom:24px;' 
  }, [el('h1', { style: 'font-size:18px; font-weight:600; color:#ffffff;' }, ['University Campus OS']), 
      el('div', { style: 'display:flex; align-items:center; gap:16px;' }, [bell, select])]);
};
