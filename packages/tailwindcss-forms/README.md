# @casoon/tailwindcss-forms

Modern form presets and components for Tailwind CSS v4 with glass morphism effects, validation states, and accessibility-first design.

## ✨ Features

- **Modern Form Styles** - Clean, professional form designs
- **Glass Morphism** - Beautiful glassmorphism form variants
- **Validation States** - Built-in success, error, and warning styles
- **Accessibility First** - WCAG compliant with focus management
- **Responsive Design** - Mobile-optimized form layouts
- **CSS Custom Properties** - Easy theming and customization
- **Tailwind v4 Compatible** - Built for the latest Tailwind CSS

## 🚀 Installation

```bash
npm install @casoon/tailwindcss-forms
```

## 📝 Usage

Import the forms CSS in your project:

```css
@import "tailwindcss";
@import "@casoon/tailwindcss-forms/src/index.css";
```

### Modern Form Example

```html
<div class="cs-form-modern">
  <div class="cs-field-modern">
    <label class="cs-label">Email Address</label>
    <input type="email" class="cs-input" placeholder="Enter your email">
  </div>
  
  <div class="cs-field-modern">
    <label class="cs-label">Password</label>
    <input type="password" class="cs-input" placeholder="Enter your password">
  </div>
  
  <button class="cs-btn-modern">Sign In</button>
</div>
```

### Glass Form Example

```html
<div class="cs-form-glass">
  <div class="cs-field-glass">
    <label class="cs-label">Full Name</label>
    <input type="text" class="cs-input" placeholder="John Doe">
  </div>
  
  <div class="cs-field-glass">
    <label class="cs-label">Message</label>
    <textarea class="cs-textarea" placeholder="Your message..."></textarea>
  </div>
  
  <button class="cs-btn-glass">Send Message</button>
</div>
```

## 🎨 Available Classes

### Form Containers
- **`.cs-form-modern`** - Modern form styling with clean borders
- **`.cs-form-glass`** - Glass morphism form with backdrop blur
- **`.cs-form-group-modern`** - Responsive form field grouping
- **`.cs-form-group-glass`** - Glass form field grouping

### Form Fields
- **`.cs-field-modern`** - Modern field wrapper
- **`.cs-field-glass`** - Glass field wrapper with blur effects
- **`.cs-label`** - Form label styling
- **`.cs-input`** - Input field styling
- **`.cs-textarea`** - Textarea styling

### Form Controls
- **`.cs-select-modern`** - Modern select dropdown
- **`.cs-select-glass`** - Glass select with backdrop blur
- **`.cs-checkbox-modern`** - Modern checkbox styling
- **`.cs-checkbox-glass`** - Glass checkbox styling
- **`.cs-radio-modern`** - Modern radio button styling
- **`.cs-radio-glass`** - Glass radio button styling

### Buttons
- **`.cs-btn-modern`** - Modern button styling
- **`.cs-btn-glass`** - Glass button with backdrop effects

### Validation States

Add validation classes to field wrappers:

```html
<!-- Error state -->
<div class="cs-field-modern cs-field-error">
  <label class="cs-label">Email</label>
  <input type="email" class="cs-input" value="invalid-email">
  <span class="cs-field-message">Please enter a valid email address</span>
</div>

<!-- Success state -->
<div class="cs-field-modern cs-field-success">
  <label class="cs-label">Email</label>
  <input type="email" class="cs-input" value="user@example.com">
  <span class="cs-field-message">Email looks good!</span>
</div>
```

## 🎭 Form Layout Examples

### Two-Column Form

```html
<div class="cs-form-modern">
  <div class="cs-form-group-modern">
    <div class="cs-field-modern">
      <label class="cs-label">First Name</label>
      <input type="text" class="cs-input" placeholder="John">
    </div>
    
    <div class="cs-field-modern">
      <label class="cs-label">Last Name</label>
      <input type="text" class="cs-input" placeholder="Doe">
    </div>
  </div>
  
  <div class="cs-field-modern">
    <label class="cs-label">Email Address</label>
    <input type="email" class="cs-input" placeholder="john@example.com">
  </div>
  
  <div class="cs-field-modern">
    <label class="cs-label">Country</label>
    <div class="cs-select-modern">
      <select class="cs-select">
        <option>Choose a country</option>
        <option>United States</option>
        <option>Germany</option>
        <option>France</option>
      </select>
    </div>
  </div>
  
  <div class="flex gap-4">
    <button type="submit" class="cs-btn-modern">Submit</button>
    <button type="button" class="cs-btn-modern cs-btn-secondary">Cancel</button>
  </div>
</div>
```

### Contact Form with Glass Effect

```html
<div class="cs-form-glass">
  <div class="cs-field-glass">
    <label class="cs-label">Your Name</label>
    <input type="text" class="cs-input" placeholder="Enter your name">
  </div>
  
  <div class="cs-field-glass">
    <label class="cs-label">Email Address</label>
    <input type="email" class="cs-input" placeholder="your@email.com">
  </div>
  
  <div class="cs-field-glass">
    <label class="cs-label">Subject</label>
    <input type="text" class="cs-input" placeholder="How can we help?">
  </div>
  
  <div class="cs-field-glass">
    <label class="cs-label">Message</label>
    <textarea class="cs-textarea" rows="4" placeholder="Tell us more..."></textarea>
  </div>
  
  <div class="flex items-center gap-3">
    <label class="cs-checkbox-glass">
      <input type="checkbox">
      <span>I agree to the terms and conditions</span>
    </label>
  </div>
  
  <button type="submit" class="cs-btn-glass">Send Message</button>
</div>
```

## 🔧 Customization

The forms package uses CSS custom properties for easy theming:

```css
:root {
  /* Form colors */
  --cs-form-bg: #ffffff;
  --cs-form-border: #e5e7eb;
  --cs-form-text: #111827;
  --cs-form-focus: #4f7cff;
  
  /* Form spacing */
  --cs-form-space-sm: 0.75rem;
  --cs-form-space-md: 1rem;
  --cs-form-space-lg: 1.5rem;
  
  /* Glass specific */
  --cs-form-glass-bg: rgba(255, 255, 255, 0.1);
  --cs-form-glass-border: rgba(255, 255, 255, 0.2);
  --cs-form-glass-blur: saturate(140%) blur(12px);
}
```

### Dark Mode Support

```css
@media (prefers-color-scheme: dark) {
  :root {
    --cs-form-bg: #1f2937;
    --cs-form-border: #374151;
    --cs-form-text: #f9fafb;
    --cs-form-glass-bg: rgba(0, 0, 0, 0.2);
    --cs-form-glass-border: rgba(255, 255, 255, 0.1);
  }
}
```

## ♿ Accessibility

All form components are built with accessibility in mind:

- **WCAG 2.1 AA compliant** color contrast ratios
- **Focus management** with visible focus indicators
- **Screen reader support** with proper labeling
- **Keyboard navigation** for all interactive elements
- **Error handling** with descriptive messages

## 📱 Mobile Support

Forms automatically adapt to mobile devices with:

- **Touch-friendly** input sizes (44px minimum)
- **Responsive layouts** that stack on small screens
- **Optimized focus states** for touch interaction
- **Reduced motion** support for accessibility

## 🎨 Integration with Other Packages

Combine with other Casoon packages for enhanced effects:

```html
<!-- Form with orb background -->
<div class="cs-orb-scene-sunset">
  <div class="cs-form-glass">
    <!-- Form content -->
  </div>
</div>

<!-- Form with animations -->
<div class="cs-form-modern cs-anim cs-fade-in cs-delay-200">
  <!-- Animated form fields -->
</div>
```

## 📦 Package Contents

```
tailwindcss-forms/
├── src/
│   ├── index.css                 # Main entry point
│   ├── styles/
│   │   ├── base/
│   │   │   ├── tokens.css        # CSS custom properties
│   │   │   └── keyframes.css     # Form animations
│   │   ├── presets/
│   │   │   ├── form-modern.css   # Modern form styles
│   │   │   ├── form-glass.css    # Glass morphism forms
│   │   │   └── form-validation.css # Validation states
│   │   └── components/
│   │       ├── inputs.css        # Input field styles
│   │       ├── buttons.css       # Button components
│   │       ├── selects.css       # Select dropdowns
│   │       └── textareas.css     # Textarea styling
└── README.md
```

## 🔗 Related Packages

- **[@casoon/tailwindcss-effects](../tailwindcss-effects)** - Complete effects bundle
- **[@casoon/tailwindcss-cards](../tailwindcss-cards)** - Card presets
- **[@casoon/tailwindcss-glass](../tailwindcss-glass)** - Glass morphism effects
- **[@casoon/tailwindcss-orbs](../tailwindcss-orbs)** - Decorative orb backgrounds

## 📄 License

MIT License - see [LICENSE](../../LICENSE) for details.

## 🤝 Contributing

Contributions are welcome! Please read our [contributing guidelines](../../CONTRIBUTING.md) before submitting PRs.

---

Made with ❤️ by [Casoon](https://casoon.com)