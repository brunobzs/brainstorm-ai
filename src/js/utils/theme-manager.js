export class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('theme-toggle');
    this.html = document.documentElement;
    this.init();
  }

  init() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    this.html.setAttribute('data-theme', savedTheme);
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
  }

  toggleTheme() {
    const currentTheme = this.html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }
}