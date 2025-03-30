export class DropdownMenu {
  constructor() {
    this.modelSelector = document.getElementById('modelSelector');
    this.modelOptions = document.getElementById('modelOptions');
    this.init();
  }

  init() {
    this.modelSelector.addEventListener('click', () => {
      this.modelOptions.classList.toggle('show-options');
    });

    // Hide dropdown when clicking elsewhere
    document.addEventListener('click', (event) => {
      if (!this.modelSelector.contains(event.target)) {
        this.modelOptions.classList.remove('show-options');
      }
    });

    // Select option functionality
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
      option.addEventListener('click', () => {
        this.modelSelector.querySelector('span').innerText = option.innerText;
        this.modelOptions.classList.remove('show-options');
      });
    });
  }
}