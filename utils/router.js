export class Router {
  constructor(root) { 
    this.root = document.querySelector(root); 
    this.routes = {}; 
    this.currentPath = '/dashboard';
    this.role = localStorage.getItem('role') || 'Student';
  }
  addRoute(path, component) { this.routes[path] = component; }
  init() { 
    this.seedDemoData();
    window.addEventListener('hashchange', () => this.render());
    this.render();
  }
  seedDemoData() {
    if(!localStorage.getItem('assignments')) {
      localStorage.setItem('assignments', JSON.stringify([
        {id: 1, title: 'Math Quiz', due: '2026-05-10', status: 'pending'}
      ]));
    }
  }
  render() {
    this.currentPath = window.location.hash.slice(1) || '/dashboard';
    const component = this.routes[this.currentPath] || this.routes['/dashboard'];
    this.root.innerHTML = '';
    this.root.appendChild(component(this.role, this.currentPath, (p) => this.currentPath = p));
  }
}
