import './style-clean.css';

// Minimal JavaScript for the clean demo
console.log('Casoon Tailwind Effects v4 - Clean Demo loaded successfully');

// Add some basic interactivity without problematic effects
document.addEventListener('DOMContentLoaded', () => {
  // Safe button click handlers
  const buttons = document.querySelectorAll('button');

  buttons.forEach((button) => {
    button.addEventListener('click', function (e) {
      // Visual feedback without transforms
      const originalBg = this.style.backgroundColor;
      this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';

      setTimeout(() => {
        this.style.backgroundColor = originalBg;
      }, 150);
    });
  });

  // Add safe hover effects to cards
  const cards = document.querySelectorAll('.card');

  cards.forEach((card) => {
    card.addEventListener('mouseenter', function () {
      this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
    });

    card.addEventListener('mouseleave', function () {
      this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    });
  });
});
