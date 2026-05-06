import { Router } from './utils/router.js';
import { Navbar } from './components/navbar.js';
import { Sidebar } from './components/sidebar.js';
import { Dashboard } from './pages/dashboard.js';
import { Assignments } from './pages/academics/assignments.js';
import { Homework } from './pages/academics/homework.js';
import { Timetable } from './pages/schedules/timetable.js';
import { Library } from './pages/facilities/library.js';
import { Activities } from './pages/facilities/activities.js';
import { Labs } from './pages/facilities/labs.js';
import { Janitor } from './pages/roles/janitor.js';
import { HOD } from './pages/roles/hod.js';
import { Student } from './pages/roles/student.js';
import { SuperAdmin } from './pages/roles/superadmin.js';
import { Messages } from './pages/messages.js';
import { Analytics } from './pages/roles/analytics.js';
import { ErrorBoundary } from './utils/errorBoundary.js';
import './utils/logger.js';

const app = document.querySelector('#app');
const router = new Router('#app');

router.routes = {
  '/dashboard': Dashboard,
  '/assignments': Assignments,
  '/homework': Homework,
  '/timetable': Timetable,
  '/library': Library,
  '/activities': Activities,
  '/labs': Labs,
  '/facilities': Janitor,
  '/department': HOD,
  '/profile': Student,
  '/messages': Messages,
  '/analytics': Analytics,
  '/system-health': SuperAdmin
};

const renderApp = (role, path, onNavigate) => {
  app.innerHTML = '';
  const wrapper = document.createElement('div');
  
  const onRoleChange = (newRole) => {
    localStorage.setItem('role', newRole);
    window.location.reload();
  };
  
  wrapper.appendChild(Navbar(role, onRoleChange));
  wrapper.appendChild(Sidebar(role, path, onNavigate));
  
  const content = document.createElement('div');
  content.id = 'content';
  wrapper.appendChild(content);
  
  app.appendChild(wrapper);
  const pageComponent = router.routes[router.currentPath];
  document.querySelector('#content').appendChild(ErrorBoundary(pageComponent, router.role, router.currentPath, onNavigate));
};

router.render = () => {
  router.currentPath = window.location.hash.slice(1) || '/dashboard';
  renderApp(router.role, router.currentPath, (p) => router.currentPath = p);
};

router.init();
