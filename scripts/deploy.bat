@echo off
REM Deployment script for Buzzing Chat (Windows)
REM This script handles the complete deployment process

echo 🚀 Starting deployment process...

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo ✅ Node.js version check passed: 
node --version

REM Clean install dependencies
echo 📦 Installing dependencies...
call npm ci --only=production
if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

REM Build the application
echo 🔨 Building application...
call npm run build
if errorlevel 1 (
    echo ❌ Build failed
    pause
    exit /b 1
)

REM Verify build
if not exist "client\dist" (
    echo ❌ Build failed - dist folder not found
    pause
    exit /b 1
)

echo ✅ Build completed successfully

REM Start the application
echo 🚀 Starting application...
call npm start
