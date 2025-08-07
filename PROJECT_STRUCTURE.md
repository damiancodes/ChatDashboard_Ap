# 📁 Project Structure Documentation

## Overview

This document provides a comprehensive overview of the Buzzing Chat project structure, organized for professional development and deployment.

## Root Directory Structure

```
buzzing-chat/
├── 📁 client/                    # Frontend React application
├── 📁 server/                    # Backend Node.js application
├── 📁 shared/                    # Shared utilities and schemas
├── 📁 scripts/                   # Deployment and utility scripts
├── 📄 package.json               # Project configuration and dependencies
├── 📄 vite.config.js             # Vite build configuration
├── 📄 tailwind.config.js         # Tailwind CSS configuration
├── 📄 postcss.config.js          # PostCSS configuration
├── 📄 README.md                  # Project documentation
├── 📄 LICENSE                    # MIT License
├── 📄 .gitignore                 # Git ignore rules
├── 📄 Dockerfile                 # Docker container configuration
├── 📄 docker-compose.yml         # Docker Compose configuration
├── 📄 .dockerignore              # Docker ignore rules
└── 📄 build.js                   # Production build script
```

## Frontend Structure (`client/`)

```
client/
├── 📄 index.html                 # Main HTML template
└── 📁 src/
    ├── 📄 main.jsx               # React application entry point
    ├── 📄 App.jsx                # Main application component
    ├── 📄 index.css              # Global styles and Tailwind imports
    ├── 📁 components/            # Reusable UI components
    │   └── 📄 TypingIndicator.jsx
    ├── 📁 hooks/                 # Custom React hooks
    │   └── 📄 useWebSocket.js
    └── 📁 pages/                 # Page-level components
        └── 📄 ChatDashboard.jsx
```

## Backend Structure (`server/`)

```
server/
├── 📄 index.js                   # Express server and WebSocket setup
└── 📄 storage.js                 # In-memory data storage
```

## Shared Structure (`shared/`)

```
shared/
└── 📄 schema.js                  # Data validation schemas
```

## Scripts Structure (`scripts/`)

```
scripts/
├── 📄 deploy.sh                  # Linux/macOS deployment script
└── 📄 deploy.bat                 # Windows deployment script
```

## Key Files Description

### Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Project metadata, dependencies, and scripts |
| `vite.config.js` | Vite build tool configuration |
| `tailwind.config.js` | Tailwind CSS framework configuration |
| `postcss.config.js` | PostCSS processing configuration |

### Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Comprehensive project documentation |
| `LICENSE` | MIT License terms |
| `PROJECT_STRUCTURE.md` | This file - structure documentation |

### Deployment Files

| File | Purpose |
|------|---------|
| `Dockerfile` | Docker container configuration |
| `docker-compose.yml` | Multi-container deployment |
| `.dockerignore` | Files to exclude from Docker build |
| `build.js` | Production build automation |

### Development Files

| File | Purpose |
|------|---------|
| `.gitignore` | Git version control exclusions |
| `scripts/deploy.sh` | Unix deployment script |
| `scripts/deploy.bat` | Windows deployment script |

## Build Output

After running `npm run build`, the following structure is created:

```
client/
└── 📁 dist/                      # Production build output
    ├── 📄 index.html             # Optimized HTML
    └── 📁 assets/                # Optimized CSS and JS
        ├── 📄 index-[hash].css   # Minified CSS
        └── 📄 index-[hash].js    # Minified JavaScript
```

## File Naming Conventions

- **Components**: PascalCase (e.g., `ChatDashboard.jsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useWebSocket.js`)
- **Utilities**: camelCase (e.g., `schema.js`)
- **Configuration**: kebab-case (e.g., `vite.config.js`)

## Import Structure

### Frontend Imports
```javascript
// Components
import { TypingIndicator } from '../components/TypingIndicator';

// Hooks
import { useWebSocket } from '../hooks/useWebSocket';

// Pages
import ChatDashboard from './pages/ChatDashboard';
```

### Backend Imports
```javascript
// Internal modules
import { storage } from './storage.js';

// Shared modules
import { messageValidation } from '../shared/schema.js';
```

## Assignment Requirements Compliance

This structure ensures compliance with all assignment requirements:

- ✅ **Server and Client separation** - Clear folder structure
- ✅ **Components organization** - Reusable UI components
- ✅ **Hooks organization** - Custom React hooks
- ✅ **Shared utilities** - Common schemas and validation
- ✅ **Professional structure** - Industry-standard organization
- ✅ **Required keywords** - `define-ocg` and `varOcg` in code
- ✅ **Modern architecture** - React + Node.js + WebSocket

## Deployment Readiness

The project is structured for multiple deployment scenarios:

1. **Local Development**: `npm run dev`
2. **Production Build**: `npm run build && npm start`
3. **Docker Deployment**: `docker-compose up`
4. **Script Deployment**: `./scripts/deploy.sh` or `scripts/deploy.bat`

## Maintenance Notes

- All dependencies are properly versioned in `package.json`
- Build process is automated and documented
- Code follows modern JavaScript/React patterns
- Structure supports easy scaling and feature addition
- Documentation is comprehensive and up-to-date
