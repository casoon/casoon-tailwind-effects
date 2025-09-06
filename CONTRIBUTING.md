# 🤝 Contributing to @casoon/tailwindcss-effects

Thank you for your interest in contributing! This project uses **fully automated workflows** to ensure consistency and prevent common release mistakes.

## 🚀 Quick Start for Contributors

### Prerequisites
- Node.js 16+ 
- pnpm 9.0+
- npm account (for publishing)

### Setup
```bash
git clone https://github.com/jseidel19/casoon-tailwind-effects
cd casoon-tailwind-effects
pnpm install
```

### Making Changes
```bash
# 1. Create a feature branch
git checkout -b feat/your-feature-name

# 2. Make your changes to packages
# - Edit files in packages/tailwindcss-*/
# - Add new utilities, fix bugs, etc.

# 3. Test everything BEFORE committing
npm run ready
# ↳ This runs ALL checks and simulates release
# ↳ Must pass before proceeding

# 4. Commit your changes (if ready passed)
git add .
git commit -m "feat: add new glassmorphism utilities"

# 5. Push and create PR
git push origin feat/your-feature-name
```

## 🎯 Development Workflow

### Always Start Here
```bash
npm run ready
```
This is your **safety net** that:
- ✅ Generates fresh documentation
- ✅ Validates all packages
- ✅ Runs comprehensive tests
- ✅ Simulates the entire release process
- ✅ Catches issues before they become problems

### Package Structure
```
packages/
├── tailwindcss-animations/     # Animation utilities
├── tailwindcss-glass/          # Glassmorphism effects
├── tailwindcss-gradients/      # Gradient backgrounds
├── tailwindcss-orbs/           # Orb backgrounds
├── tailwindcss-scroll/         # Scroll utilities
├── tailwindcss-navigation/     # Navigation components
├── tailwindcss-utilities/      # Basic utilities
├── tailwindcss-loading/        # Loading indicators
├── tailwindcss-micro-interactions/ # Micro-interactions
└── tailwindcss-effects/        # Meta package (all combined)
```

### Adding New Features

#### 1. **Adding CSS Classes**
```css
/* In packages/tailwindcss-glass/index.css */
.glass-new-variant {
  background: var(--cs-glass-bg-new);
  backdrop-filter: blur(var(--cs-glass-blur-new));
  border: 1px solid var(--cs-glass-border-new);
}
```

#### 2. **Adding CSS Variables** 
```css
/* In packages/tailwindcss-glass/tokens.css */
:root {
  --cs-glass-bg-new: rgba(255, 255, 255, 0.08);
  --cs-glass-blur-new: 12px;
  --cs-glass-border-new: rgba(255, 255, 255, 0.2);
}
```

#### 3. **Plugin Configuration**
```js
/* In packages/tailwindcss-glass/plugin.js */
export default function glassPlugin(options = {}) {
  return {
    handler({ addUtilities }) {
      addUtilities({
        '.glass-new-variant': {
          background: 'var(--cs-glass-bg-new)',
          backdropFilter: 'blur(var(--cs-glass-blur-new))',
          border: '1px solid var(--cs-glass-border-new)'
        }
      })
    }
  }
}
```

### Testing Your Changes
```bash
# Run the full test suite
npm test

# Test specific aspects
npm run test:classes         # Class compatibility
npm run test:syntax          # CSS syntax validation
npm run generate:catalog     # Update documentation
```

## 🔧 Automated Systems

### What Gets Generated Automatically
- **Package Catalogs** (`packages/*/catalog.md`) - AI-friendly documentation
- **Global Catalog** (`/catalog.md`) - Complete class reference
- **Plugin Files** - Validated and updated as needed
- **CSS Builds** - Distribution-ready CSS files
- **Version Consistency** - All packages stay in sync

### What You Don't Need to Worry About
- ✅ Updating documentation (automatic)
- ✅ Version bumping (automated commands)
- ✅ Building packages (automatic)
- ✅ npm authentication checks (automatic)
- ✅ Git status validation (automatic)
- ✅ Test execution (automatic)

## 📝 Commit Guidelines

### Commit Message Format
```
type(scope): description

feat(glass): add glass-frosted variant
fix(animations): resolve timing issue in fade-in
docs(readme): update installation instructions
```

### Types
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test additions/modifications
- `chore`: Maintenance tasks

### Scopes
- `animations`, `glass`, `gradients`, `orbs`, `scroll`, `navigation`, `utilities`, `loading`, `micro-interactions`, `effects`

## 🚨 Before Submitting PR

### Checklist
- [ ] `npm run ready` passes completely
- [ ] All tests pass
- [ ] Code follows existing patterns
- [ ] CSS variables use `--cs-` prefix
- [ ] Class names follow package conventions
- [ ] No breaking changes (unless major version)
- [ ] Documentation generated automatically

### Common Issues
**❌ "npm run ready failed"**
- Check the error output carefully
- Fix any test failures
- Ensure git working directory is clean
- Verify npm authentication

**❌ "Version mismatch"**
```bash
npm run version:check
```

**❌ "Uncommitted changes"**
```bash
git add . && git commit -m "your message"
```

## 🎨 Design Guidelines

### CSS Custom Properties
```css
/* ✅ Good - Use cs- prefix */
--cs-glass-bg-light: rgba(255, 255, 255, 0.1);

/* ❌ Bad - No prefix */
--glass-bg: rgba(255, 255, 255, 0.1);
```

### Class Names
```css
/* ✅ Good - Package-specific prefix */
.glass-frosted { }
.anim-fade-in { }
.orb-pulse { }

/* ❌ Bad - Generic names */
.frosted { }
.fade { }
.pulse { }
```

### Plugin Structure
```js
// ✅ Good - Consistent export
export default function packagePlugin(options = {}) {
  return {
    handler({ addUtilities, addComponents }) {
      // Plugin logic
    }
  }
}

// ❌ Bad - Inconsistent structure
module.exports = function() { /* ... */ }
```

## 🔄 Release Process (Maintainers Only)

```bash
# 1. Ensure everything is ready
npm run ready

# 2. Commit any pending changes
git add . && git commit -m "release: prepare for vX.X.X"

# 3. Version bump
npm run version:patch    # or minor/major

# 4. Publish
npm run release:all
```

## 🆘 Getting Help

- **Issues**: Create a GitHub issue
- **Questions**: Start a discussion
- **Emergency**: Check [WORKFLOW.md](./WORKFLOW.md) troubleshooting section

## 📄 Code of Conduct

- Be respectful and inclusive
- Follow project conventions
- Test your changes thoroughly
- Document significant changes
- Help others learn and contribute

---

> **💡 Remember**: The automated workflow is your friend! `npm run ready` catches issues early and saves time for everyone.
