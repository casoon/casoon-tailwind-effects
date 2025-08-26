# Deployment Guide

This guide explains how to deploy and release the Casoon Tailwind Effects packages using npm workspaces and unified versioning.

## 🚀 Quick Start

### 1. Check Current Status
```bash
# Ensure all packages have matching versions
npm run version:check

# Check git status
git status
```

### 2. Update Versions
```bash
# Update to next patch version (0.2.0 → 0.2.1)
npm run version:patch

# Update to next minor version (0.2.0 → 0.3.0)
npm run version:minor

# Update to next major version (0.2.0 → 1.0.0)
npm run version:major
```

### 3. Publish Packages
```bash
# Publish all packages
npm run release:all

# Or publish specific package
npm run release tailwindcss-glass
```

## 📋 Prerequisites

### Required Tools
- **Node.js**: 18+ (for npm workspaces support)
- **npm**: 7+ (for workspace commands)
- **Git**: Clean working directory required

### Authentication
```bash
# Login to npm registry
npm login

# Verify login
npm whoami
```

## 🔧 Version Management

### How It Works
- **Root package.json** contains the master version
- **All packages** automatically sync to the root version
- **npm version commands** update both root and all packages simultaneously

### Version Commands
```bash
# Check all package versions
npm run version:check

# Update versions (automatically updates all packages)
npm run version:patch    # 0.2.0 → 0.2.1
npm run version:minor    # 0.2.0 → 0.3.0
npm run version:major    # 0.2.0 → 1.0.0
```

### Version Strategy
- **Patch (0.2.0 → 0.2.1)**: Bug fixes, small improvements
- **Minor (0.2.0 → 0.3.0)**: New features, backward compatible
- **Major (0.2.0 → 1.0.0)**: Breaking changes, major updates

## 📦 Package Publishing

### Release Process
1. **Update versions** using npm version commands
2. **Commit changes** (git automatically creates commit)
3. **Create git tag** (automatically created)
4. **Publish packages** using release script

### Release Commands
```bash
# Release all packages
npm run release:all

# Release specific package
npm run release tailwindcss-glass

# Dry run (no actual publishing)
npm run release:dry
```

### Package Dependencies
The release script automatically handles dependency order:
1. `@casoon/tailwindcss-animations`
2. `@casoon/tailwindcss-glass`
3. `@casoon/tailwindcss-orbs`
4. `@casoon/tailwindcss-gradients`
5. `@casoon/tailwindcss-scroll`
6. `@casoon/tailwindcss-utilities`
7. `@casoon/tailwindcss-navigation`
8. `@casoon/tailwindcss-effects` (meta package)

## 🛠️ Troubleshooting

### Common Issues

#### Git Working Directory Not Clean
```bash
# Error: "Git working directory not clean"
git add .
git commit -m "Prepare for version update"
npm run version:patch
```

#### Version Mismatch
```bash
# Check for version mismatches
npm run version:check

# Manually sync versions if needed
# (Edit package.json files to match root version)
```

#### Publish Failures
```bash
# Check npm login status
npm whoami

# Verify package access
npm access list packages

# Check for version conflicts
npm view @casoon/tailwindcss-glass versions
```

### Recovery Steps
```bash
# If version update fails
git reset --hard HEAD
npm run version:check

# If publish fails
npm run release:dry  # Check what would happen
```

## 📝 Best Practices

### Before Deployment
1. **Test locally** with `npm run release:dry`
2. **Check versions** with `npm run version:check`
3. **Ensure clean git** working directory
4. **Verify npm login** status

### During Deployment
1. **Use version commands** (not manual editing)
2. **Let npm handle** git commits and tags
3. **Monitor release script** output for errors
4. **Verify published versions** on npm registry

### After Deployment
1. **Check npm registry** for published packages
2. **Verify git tags** were created
3. **Update documentation** if needed
4. **Test installed packages** in a new project

## 🔍 Monitoring

### Check Published Versions
```bash
# View package on npm
npm view @casoon/tailwindcss-glass

# Check all versions
npm view @casoon/tailwindcss-glass versions
```

### Verify Installation
```bash
# Test in new project
npm install @casoon/tailwindcss-glass@latest
npm install @casoon/tailwindcss-effects@latest
```

## 📚 Additional Resources

### npm Workspaces
- [npm Workspaces Documentation](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
- [npm Version Command](https://docs.npmjs.com/cli/v7/commands/npm-version)

### Monorepo Management
- [Lerna](https://lerna.js.org/) - Alternative to npm workspaces
- [Nx](https://nx.dev/) - Modern monorepo tool
- [Rush](https://rushjs.io/) - Microsoft's monorepo solution

---

**Note**: This deployment system ensures all packages maintain version consistency and can be released simultaneously with minimal manual intervention.
