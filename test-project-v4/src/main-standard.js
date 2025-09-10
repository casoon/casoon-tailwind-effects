import './style-standard.css';

// Standard minimal JavaScript - no workarounds needed
console.log('Casoon Tailwind Effects - Standard Demo loaded');

// Optional: Basic click feedback for buttons (standard web behavior)
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('button');

  buttons.forEach((button) => {
    button.addEventListener('click', function () {
      console.log(`Button clicked: ${this.textContent}`);
    });
  });
});
