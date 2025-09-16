# SparkFabrik Company Playbook

SparkFabrik Company Playbook is a Raneto-based knowledge management system containing company policies, procedures, and best practices. It's a Node.js application packaged in Docker for development and deployed to Google Cloud Run for production.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Bootstrap and Setup
- **Install dependencies and build the theme:**
  - `cd custom/themes/spark-playbook && npm install` -- takes 25-30 seconds
  - `npm run build` -- takes 6-7 seconds, builds CSS/JS assets
- **Install main Raneto dependencies:**
  - `cd custom && npm install` -- takes 30-35 seconds
- **CRITICAL**: Create symbolic links for content and assets:
  - `cd custom && ln -sf ../content content && ln -sf ../assets assets`
  - Required because Raneto expects content/assets in the custom directory

### Build and Development Commands
- **NEVER CANCEL: Docker builds may fail due to network connectivity issues** with Alpine package repositories. Use native Node.js development instead.
- **Start development server:**
  - `cd custom && NODE_ENV=development PORT=3000 node server.js`
  - Server starts in ~2 seconds, available at `http://localhost:3000`
- **Theme development:**
  - `make theme-build` -- takes 6-7 seconds, builds production CSS/JS
  - `make theme-watch` -- starts file watcher for SCSS/JS development
  - `make theme-scss-lint` -- takes 1.6 seconds, shows SCSS linting warnings
  - `make theme-scss-lint-fix` -- auto-fixes SCSS linting issues

### Testing and Validation
- **Link validation:**
  - `cd custom && npx markdown-link-validator -q -e -o -c 403 --ignorePatternsFrom ../content/.mlvignore ../content`
  - Takes 8-9 seconds, validates ~374 links across 75 markdown files
  - **Expected**: Many external links return HTTP 400/403 errors due to bot blocking - this is normal
- **Docker-based validation (if network allows):**
  - `make check` -- runs link validation in Docker container
  - **NEVER CANCEL: May take 2+ minutes due to Docker build time**

## Validation Scenarios

### Manual Testing Requirements
- **ALWAYS test the complete application startup scenario after making changes:**
  1. Build theme: `cd custom/themes/spark-playbook && npm run build`
  2. Install main dependencies: `cd custom && npm install`
  3. Create symlinks: `cd custom && ln -sf ../content content && ln -sf ../assets assets`
  4. Start server: `NODE_ENV=development PORT=3000 node server.js`
  5. Verify homepage loads: `curl -s http://localhost:3000/ | grep "Company playbook"`
  6. Test specific content: `curl -s http://localhost:3000/tools-and-policies/github-copilot`

### Build Time Expectations
- **Theme npm install**: 25-30 seconds
- **Theme build**: 6-7 seconds  
- **Main npm install**: 30-35 seconds
- **SCSS linting**: 1.6 seconds
- **Link validation**: 8-9 seconds
- **Server startup**: 2-3 seconds
- **Docker builds**: 2+ minutes (may fail due to network issues)

## Repository Structure and Key Locations

### Content Organization
- **`content/`** - 75+ markdown files organized by topic:
  - `organization/` - Company structure and roles
  - `working-at-sparkfabrik/` - HR policies and procedures  
  - `tools-and-policies/` - Technical guidelines and tools
  - `procedures/` - Step-by-step process documentation
  - `guides/` - How-to documentation
  - `resources/` - Important reference materials
  - `FAQ/` - Frequently asked questions

### Technical Structure
- **`custom/`** - Raneto application root
  - `config.js` - Main configuration file
  - `server.js` - Application entry point
  - `package.json` - Main dependencies (Raneto, markdown-link-validator)
  - `themes/spark-playbook/` - Custom theme with Webpack build process
- **`assets/`** - Static assets (favicon, images, downloads)
- **`Dockerfile`** - Multi-stage Docker build (dev/prod targets)
- **`.github/workflows/cloud-run.yml`** - Google Cloud Run deployment

### Build System
- **Make commands** (wrapper around Docker/npm):
  - `make` or `make up` - Start Docker development environment  
  - `make theme-build` - Build theme assets
  - `make theme-watch` - Watch theme files for changes
  - `make check` - Run link validation
- **Direct npm commands** (recommended for development):
  - Theme: `cd custom/themes/spark-playbook && npm run build|watch|scss-lint`
  - Main: `cd custom && npm run check|start`

## Known Issues and Limitations

### Docker Environment Issues
- **Docker builds may fail** due to Alpine package repository connectivity issues
- **Workaround**: Use native Node.js development (recommended approach)
- **Error message**: "ERROR: unable to select packages: tini (no such package)"

### Link Validation Warnings
- **Expected failures**: Many external sites return HTTP 400/403 errors to automated requests
- **Normal behavior**: ~150 invalid links out of ~374 total links
- **Focus on**: 404 errors for internal content and assets

### Theme Development Notes
- **Webpack warnings**: Bundle size warnings are normal (917 KiB main bundle)
- **SCSS linting**: 86+ warnings exist in current codebase - this is normal
- **Bootstrap deprecation**: Uses Bootstrap 4.6.2 with some deprecated features

## Common Tasks and Troubleshooting

### Content Updates
- **Edit markdown files** in `content/` directories
- **Add images** to `assets/images/`
- **Test links** after adding external references
- **Always run link validation** before committing content changes

### Theme Modifications  
- **Edit SCSS** in `custom/themes/spark-playbook/scss/`
- **Edit JS** in `custom/themes/spark-playbook/public/js/`
- **Run build** after changes: `npm run build`
- **Check linting**: `npm run scss-lint`

### Deployment
- **Production builds** happen automatically via Google Cloud Build
- **Cloud Run deployment** triggers on pushes to master branch
- **Theme building** is handled in Dockerfile during production build

### Quick Reference Commands
```bash
# Complete setup from fresh clone
cd custom/themes/spark-playbook && npm install && npm run build
cd ../.. && cd custom && npm install  
ln -sf ../content content && ln -sf ../assets assets

# Start development server
cd custom && NODE_ENV=development PORT=3000 node server.js

# Validate changes
cd custom && npx markdown-link-validator -q -e -o -c 403 --ignorePatternsFrom ../content/.mlvignore ../content
cd themes/spark-playbook && npm run scss-lint
```

## Development Workflow
- **Branch naming**: Follow format `content/###-description` or `feature/###-description`
- **Commits**: Use format `refs ####: Description`
- **Content validation**: Always run link checker before submitting PRs
- **Theme changes**: Always build and test locally before committing
- **Local testing**: Verify server starts and pages load correctly

## CI/CD Pipeline
- **GitHub Actions**: `.github/workflows/cloud-run.yml`
- **Triggers**: Pushes to master branch
- **Process**: Google Cloud Build → Container Registry → Cloud Run deployment
- **Build time**: 2-5 minutes for complete deployment
- **No manual intervention** required for production deployments