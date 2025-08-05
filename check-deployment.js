#!/usr/bin/env node

// Deployment readiness checker for Mini Library App

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking Mini Library App deployment readiness...\n');

const checks = [
  {
    name: 'package.json exists',
    check: () => fs.existsSync('package.json'),
    fix: 'Create package.json with proper dependencies'
  },
  {
    name: 'vercel.json configuration',
    check: () => fs.existsSync('vercel.json'),
    fix: 'Create vercel.json configuration file'
  },
  {
    name: 'API directory structure',
    check: () => fs.existsSync('api') && fs.existsSync('api/books.js'),
    fix: 'Ensure API folder and books.js exist'
  },
  {
    name: 'React build directory',
    check: () => fs.existsSync('build') || fs.existsSync('src'),
    fix: 'Run npm run build or ensure src directory exists'
  },
  {
    name: 'DataStore module',
    check: () => fs.existsSync('lib/dataStore.js'),
    fix: 'Create lib/dataStore.js for shared data management'
  },
  {
    name: 'Git repository',
    check: () => fs.existsSync('.git'),
    fix: 'Initialize git repository with: git init'
  }
];

let allPassed = true;

checks.forEach(({ name, check, fix }) => {
  const passed = check();
  const icon = passed ? '✅' : '❌';
  console.log(`${icon} ${name}`);
  
  if (!passed) {
    console.log(`   Fix: ${fix}`);
    allPassed = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allPassed) {
  console.log('🎉 All checks passed! Your app is ready for Vercel deployment.');
  console.log('\nNext steps:');
  console.log('1. git add .');
  console.log('2. git commit -m "Ready for deployment"');
  console.log('3. git push origin main');
  console.log('4. Connect repository to Vercel at https://vercel.com');
} else {
  console.log('⚠️  Some issues need to be fixed before deployment.');
  console.log('Please address the failed checks above.');
}

console.log('\n📚 For detailed deployment instructions, see DEPLOYMENT.md');
