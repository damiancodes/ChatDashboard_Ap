 Deployment Guide

This guide provides step-by-step instructions for deploying the Buzzing Chat application in various environments.

##  Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher
- **Git**: For version control (optional)

##  Local Development Deployment

### Quick Start

1. **Clone and install**
   ```bash
   git clone <repository-url>
   cd buzzing-chat
   npm install
   ```

2. **Start development servers**
   ```bash
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Manual Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start backend server**
   ```bash
   npm run server
   ```

3. **Start frontend development server** (in new terminal)
   ```bash
   npm run client
   ```

## Production Deployment

### Method 1: Direct Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

3. **Access the application**
   - Application: http://localhost:5000

### Method 2: Using Deployment Scripts

#### Windows
```bash
scripts/deploy.bat
```

#### Linux/macOS
```bash
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

### Method 3: Using Build Script

```bash
node build.js
```

##  Docker Deployment

### Using Docker Compose (Recommended)

1. **Build and start containers**
   ```bash
   docker-compose up --build
   ```

2. **Access the application**
   - Application: http://localhost:5000

### Using Docker Directly

1. **Build the image**
   ```bash
   docker build -t buzzing-chat .
   ```

2. **Run the container**
   ```bash
   docker run -p 5000:5000 buzzing-chat
   ```

3. **Access the application**
   - Application: http://localhost:5000

## ☁️ Cloud Deployment

### Heroku Deployment

1. **Create Heroku app**
   ```bash
   heroku create your-app-name
   ```

2. **Set environment variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set PORT=5000
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

### Railway Deployment

1. **Connect repository to Railway**
2. **Set environment variables**
   - `NODE_ENV=production`
   - `PORT=5000`
3. **Deploy automatically**

## 🔧 Environment Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NODE_ENV` | Environment mode | `development` | No |
| `PORT` | Server port | `5000` | No |

### Port Configuration

| Service | Port | Description |
|---------|------|-------------|
| Backend API | 5000 | Express server |
| Frontend Dev | 3000 | Vite dev server |
| WebSocket | 5000/ws | Real-time communication |

## 📦 Build Process

### Development Build
```bash
npm run client  # Starts Vite dev server
```

### Production Build
```bash
npm run build   # Creates optimized build in client/dist/
```

### Build Output
```
client/dist/
├── index.html          # Optimized HTML
└── assets/
    ├── index-[hash].css # Minified CSS (16.64 kB gzipped)
    └── index-[hash].js  # Minified JS (60.71 kB gzipped)
```

##  Health Checks

### API Health Check
```bash
curl http://localhost:5000/api/messages
```

### WebSocket Health Check
```bash
# Test WebSocket connection
wscat -c ws://localhost:5000/ws
```

##  Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/macOS
lsof -ti:5000 | xargs kill -9
```

#### Build Failures
```bash
# Clean and rebuild
npm run clean
npm install
npm run build
```

#### Docker Issues
```bash
# Clean Docker
docker system prune -a
docker-compose down
docker-compose up --build
```

### Logs and Debugging

#### Application Logs
```bash
# Development
npm run dev

# Production
npm start
```

#### Docker Logs
```bash
docker-compose logs -f
```

## 📊 Performance Optimization

### Build Optimizations
- **Code Splitting**: Automatic with Vite
- **Tree Shaking**: Removes unused code
- **Minification**: CSS and JS are minified
- **Gzip Compression**: Assets are gzipped

### Runtime Optimizations
- **React Query**: Efficient data caching
- **WebSocket**: Real-time communication
- **Tailwind CSS**: Optimized CSS framework

##  Security Considerations

### Production Checklist
- [ ] Environment variables configured
- [ ] CORS properly configured
- [ ] Input validation implemented
- [ ] Error handling in place
- [ ] HTTPS enabled (if applicable)

### Security Headers
The application includes basic security headers:
- CORS configuration
- Content-Type validation
- Input sanitization

##  Monitoring and Maintenance

### Health Monitoring
- Application responds to `/api/messages`
- WebSocket connection status
- Error logging and handling

### Maintenance Tasks
- Regular dependency updates
- Security patches
- Performance monitoring
- Backup strategies (if using database)

##  Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Build successful
- [ ] Environment variables set
- [ ] Port availability confirmed
- [ ] Dependencies installed

### Post-Deployment
- [ ] Application accessible
- [ ] WebSocket connection working
- [ ] Real-time features functional
- [ ] Error handling working
- [ ] Performance acceptable

## Support

For deployment issues:
1. Check the troubleshooting section
2. Review application logs
3. Verify environment configuration
4. Test with minimal setup

---

**Happy Deploying! **
