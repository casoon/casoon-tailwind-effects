# @casoon/tailwindcss-cards

Ready-to-use card presets for Tailwind CSS v4 - Product cards, pricing tables, testimonials, and feature cards with integrated orb effects and glass morphism.

## ✨ Features

- **Product Cards** - E-commerce ready with ratings, pricing, and actions
- **Pricing Tables** - Beautiful subscription and pricing layouts  
- **Testimonial Cards** - Customer feedback with avatars and ratings
- **Feature Cards** - Service and product feature showcases
- **Glass Effects** - Glass morphism variants for all card types
- **Orb Integration** - Built-in orb effects for enhanced visuals
- **Responsive Design** - Mobile-first responsive layouts
- **Tailwind v4 Compatible** - Built for the latest Tailwind CSS

## 🚀 Installation

```bash
npm install @casoon/tailwindcss-cards
```

## 📝 Usage

Import the cards CSS in your project:

```css
@import "tailwindcss";
@import "@casoon/tailwindcss-cards/src/index.css";
```

### Product Card Example

```html
<div class="cs-card-product">
  <div class="cs-product-image">
    <img src="product.jpg" alt="Product">
    <span class="cs-product-badge">New</span>
  </div>
  
  <div class="cs-product-content">
    <h3 class="cs-product-title">Premium Headphones</h3>
    <p class="cs-product-description">High-quality wireless headphones with noise cancellation.</p>
    
    <div class="cs-product-rating">
      <div class="cs-product-stars">★★★★★</div>
      <span class="cs-product-rating-text">(127 reviews)</span>
    </div>
  </div>
  
  <div class="cs-product-footer">
    <div class="cs-product-price">
      <span class="cs-price-current">$299</span>
      <span class="cs-price-old">$399</span>
    </div>
    <button class="cs-product-action">Add to Cart</button>
  </div>
</div>
```

### Pricing Card Example

```html
<div class="cs-card-pricing cs-card-pricing-featured">
  <div class="cs-pricing-header">
    <h3 class="cs-pricing-plan">Pro Plan</h3>
    <p class="cs-pricing-description">Perfect for growing teams</p>
  </div>
  
  <div class="cs-pricing-amount">
    <span class="cs-pricing-currency">$</span>
    <span class="cs-pricing-price">29</span>
    <span class="cs-pricing-period">/month</span>
  </div>
  
  <ul class="cs-pricing-features">
    <li class="cs-pricing-feature">Up to 10 team members</li>
    <li class="cs-pricing-feature">Advanced analytics</li>
    <li class="cs-pricing-feature">Priority support</li>
    <li class="cs-pricing-feature">Custom integrations</li>
  </ul>
  
  <div class="cs-pricing-action">
    <button class="cs-pricing-button">Get Started</button>
  </div>
</div>
```

### Testimonial Card Example

```html
<div class="cs-card-testimonial">
  <div class="cs-testimonial-rating">
    <div class="cs-rating-stars">
      <span class="cs-rating-star">★</span>
      <span class="cs-rating-star">★</span>
      <span class="cs-rating-star">★</span>
      <span class="cs-rating-star">★</span>
      <span class="cs-rating-star">★</span>
    </div>
    <span class="cs-rating-text">5/5</span>
  </div>
  
  <blockquote class="cs-testimonial-quote">
    "This product has completely transformed how our team works. The interface is intuitive and the features are exactly what we needed."
  </blockquote>
  
  <div class="cs-testimonial-author">
    <img class="cs-author-avatar" src="avatar.jpg" alt="Sarah Johnson">
    <div class="cs-author-info">
      <div class="cs-author-name">Sarah Johnson</div>
      <div class="cs-author-title">Product Manager</div>
      <div class="cs-author-company">TechCorp Inc.</div>
    </div>
  </div>
</div>
```

### Feature Card Example

```html
<div class="cs-card-feature">
  <div class="cs-feature-icon">🚀</div>
  
  <div class="cs-feature-header">
    <h3 class="cs-feature-title">Fast Performance</h3>
    <p class="cs-feature-subtitle">Lightning-fast loading times</p>
  </div>
  
  <div class="cs-feature-content">
    <ul class="cs-feature-list">
      <li class="cs-feature-item">Optimized code delivery</li>
      <li class="cs-feature-item">Global CDN network</li>
      <li class="cs-feature-item">Smart caching</li>
    </ul>
  </div>
  
  <div class="cs-feature-action">
    <a href="#" class="cs-feature-button">Learn More</a>
  </div>
</div>
```

## 🎨 Available Card Types

### Product Cards
- **`.cs-card-product`** - Standard product card with image, content, and pricing
- **`.cs-card-product-compact`** - Horizontal layout for product lists
- **`.cs-card-product-orb`** - Product card with orb hover effect
- **`.cs-card-product-glass`** - Glass morphism product card

### Pricing Cards  
- **`.cs-card-pricing`** - Standard pricing card layout
- **`.cs-card-pricing-featured`** - Highlighted featured plan
- **`.cs-card-pricing-compact`** - Horizontal pricing layout
- **`.cs-card-pricing-orb`** - Pricing card with orb effect
- **`.cs-card-pricing-glass`** - Glass morphism pricing card

### Testimonial Cards
- **`.cs-card-testimonial`** - Standard testimonial with quote and author
- **`.cs-card-testimonial-compact`** - Compact testimonial layout  
- **`.cs-card-testimonial-video`** - Video testimonial card
- **`.cs-card-testimonial-glass`** - Glass morphism testimonial

### Feature Cards
- **`.cs-card-feature`** - Standard feature card with icon and content
- **`.cs-card-feature-horizontal`** - Horizontal feature layout
- **`.cs-card-feature-minimal`** - Minimal feature card design
- **`.cs-card-feature-image`** - Feature card with image header
- **`.cs-card-feature-orb`** - Feature card with orb hover effect
- **`.cs-card-feature-glass`** - Glass morphism feature card

## 🎭 Card Layout Examples

### Product Grid

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="cs-card-product">
    <!-- Product card content -->
  </div>
  <div class="cs-card-product">
    <!-- Product card content -->
  </div>
  <div class="cs-card-product">
    <!-- Product card content -->
  </div>
</div>
```

### Pricing Table

```html
<div class="cs-pricing-table">
  <div class="cs-card-pricing">
    <!-- Basic plan -->
  </div>
  <div class="cs-card-pricing cs-card-pricing-featured">
    <!-- Pro plan (featured) -->
  </div>
  <div class="cs-card-pricing">
    <!-- Enterprise plan -->
  </div>
</div>
```

### Feature Grid

```html
<div class="cs-feature-grid-3">
  <div class="cs-card-feature">
    <!-- Feature 1 -->
  </div>
  <div class="cs-card-feature">
    <!-- Feature 2 -->
  </div>
  <div class="cs-card-feature">
    <!-- Feature 3 -->
  </div>
</div>
```

### Testimonials Grid

```html
<div class="cs-testimonial-grid">
  <div class="cs-card-testimonial">
    <!-- Testimonial 1 -->
  </div>
  <div class="cs-card-testimonial-compact">
    <!-- Testimonial 2 -->
  </div>
  <div class="cs-card-testimonial">
    <!-- Testimonial 3 -->
  </div>
</div>
```

## ✨ Special Effects

### Glass Morphism Cards

Add glass effects to any card:

```html
<div class="cs-card-product cs-card-product-glass">
  <!-- Glass morphism product card -->
</div>

<div class="cs-card-pricing cs-card-pricing-glass">
  <!-- Glass morphism pricing card -->
</div>
```

### Orb Effect Cards

Cards with integrated orb hover effects:

```html
<div class="cs-card-feature cs-card-feature-orb">
  <!-- Feature card with orb effect on hover -->
</div>

<div class="cs-card-pricing cs-card-pricing-orb">
  <!-- Pricing card with orb effect -->
</div>
```

## 🔧 Customization

Customize cards using CSS custom properties:

```css
:root {
  /* Card colors */
  --cs-card-bg: #ffffff;
  --cs-card-border: #e5e7eb;
  --cs-card-text: #111827;
  --cs-card-brand: #4f7cff;
  
  /* Card spacing */
  --cs-card-space-sm: 0.75rem;
  --cs-card-space-md: 1rem;
  --cs-card-space-lg: 1.5rem;
  --cs-card-space-xl: 2rem;
  
  /* Card shadows */
  --cs-card-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --cs-card-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
  --cs-card-shadow-hover: 0 20px 25px rgba(0, 0, 0, 0.15);
  
  /* Card hover effects */
  --cs-card-hover-lift: -2px;
  --cs-card-hover-scale: 1.02;
}
```

### Dark Mode Support

```css
@media (prefers-color-scheme: dark) {
  :root {
    --cs-card-bg: #1f2937;
    --cs-card-border: #374151;
    --cs-card-text: #f9fafb;
    --cs-card-text-muted: #d1d5db;
  }
}
```

## 🎨 Integration with Other Packages

Combine with other Casoon packages:

```html
<!-- Cards with orb backgrounds -->
<div class="cs-orb-scene-galaxy">
  <div class="grid grid-cols-3 gap-6">
    <div class="cs-card-feature cs-card-feature-glass">
      <!-- Glass feature card over orb scene -->
    </div>
  </div>
</div>

<!-- Animated card entrance -->
<div class="cs-card-pricing cs-anim cs-fade-in cs-delay-100">
  <!-- Animated pricing card -->
</div>
```

## 📦 Package Contents

```
tailwindcss-cards/
├── src/
│   ├── index.css                    # Main entry point
│   ├── styles/
│   │   ├── base/
│   │   │   └── tokens.css          # CSS custom properties
│   │   ├── presets/
│   │   │   ├── card-product.css    # Product card styles
│   │   │   ├── card-pricing.css    # Pricing table styles
│   │   │   ├── card-testimonial.css # Testimonial cards
│   │   │   ├── card-feature.css    # Feature card styles
│   │   │   ├── card-blog.css       # Blog card layouts
│   │   │   └── card-dashboard.css  # Dashboard cards
│   │   └── effects/
│   │       └── card-effects.css    # Card animations & effects
└── README.md
```

## 🔗 Related Packages

- **[@casoon/tailwindcss-effects](../tailwindcss-effects)** - Complete effects bundle
- **[@casoon/tailwindcss-forms](../tailwindcss-forms)** - Form presets
- **[@casoon/tailwindcss-glass](../tailwindcss-glass)** - Glass morphism effects
- **[@casoon/tailwindcss-orbs](../tailwindcss-orbs)** - Decorative orb backgrounds

## 📄 License

MIT License - see [LICENSE](../../LICENSE) for details.

## 🤝 Contributing

Contributions are welcome! Please read our [contributing guidelines](../../CONTRIBUTING.md) before submitting PRs.

---

Made with ❤️ by [Casoon](https://casoon.com)