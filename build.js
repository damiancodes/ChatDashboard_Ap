#!/usr/bin/env node

/**
 * Build script for Buzzing Chat application
 * This script handles the production build process
 */

import { execSync } from 'child_process';
import { existsSync, rmSync } from 'fs';
import { join } from 'path';

console.log('🚀 Starting production build...\n');

try {
  // Clean previous builds
  console.log('🧹 Cleaning previous builds...');
  const distPaths = ['dist', 'client/dist'];
  
  distPaths.forEach(path => {
    if (existsSync(path)) {
      rmSync(path, { recursive: true, force: true });
      console.log(`✅ Cleaned ${path}`);
    }
  });

  // Install dependencies
  console.log('\n📦 Installing dependencies...');
  execSync('npm ci --only=production', { stdio: 'inherit' });
  console.log('✅ Dependencies installed');

  // Build frontend
  console.log('\n🔨 Building frontend...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Frontend built successfully');

  // Verify build
  console.log('\n🔍 Verifying build...');
  if (existsSync('client/dist')) {
    console.log('✅ Build verification passed');
  } else {
    throw new Error('Build verification failed - dist folder not found');
  }

  console.log('\n🎉 Production build completed successfully!');
  console.log('\n📋 Next steps:');
  console.log('1. Run: npm start');
  console.log('2. Or use Docker: docker-compose up');
  console.log('3. Access at: http://localhost:5000');

} catch (error) {
  console.error('\n❌ Build failed:', error.message);
  process.exit(1);
}
