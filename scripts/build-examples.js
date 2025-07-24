const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const isDev = process.argv.includes('--dev');

// Configuration
const EXAMPLES_DIR = path.join(__dirname, '../examples');
const OUTPUT_DIR = path.join(__dirname, '../static/demos');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyDir(src, dest) {
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function buildExample(exampleName) {
  const examplePath = path.join(EXAMPLES_DIR, exampleName);
  const packageJsonPath = path.join(examplePath, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    console.log(`⏭️  Skipping ${exampleName} (no package.json found)`);
    return;
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  if (!packageJson.scripts || !packageJson.scripts.build) {
    console.log(`⏭️  Skipping ${exampleName} (no build script found)`);
    return;
  }
  
  console.log(`🔨 Building ${exampleName}...`);
  
  try {
    // Run the build command in the example directory
    execSync('npm run build', {
      cwd: examplePath,
      stdio: isDev ? 'inherit' : 'pipe',
    });
    
    // Copy the built files to the static demos directory
    const distPath = path.join(examplePath, 'dist');
    const outputPath = path.join(OUTPUT_DIR, exampleName);
    
    if (fs.existsSync(distPath)) {
      // Remove existing output directory
      if (fs.existsSync(outputPath)) {
        fs.rmSync(outputPath, { recursive: true });
      }
      
      // Copy new build
      copyDir(distPath, outputPath);
      console.log(`✅ Built ${exampleName} → static/demos/${exampleName}`);
    } else {
      console.log(`⚠️  No dist directory found for ${exampleName}`);
    }
  } catch (error) {
    console.error(`❌ Failed to build ${exampleName}:`, error.message);
    if (isDev) {
      process.exit(1);
    }
  }
}

function main() {
  console.log('🚀 Building examples...');
  
  // Ensure output directory exists
  ensureDir(OUTPUT_DIR);
  
  // Get all example directories
  const examples = fs.readdirSync(EXAMPLES_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  if (examples.length === 0) {
    console.log('No examples found to build.');
    return;
  }
  
  console.log(`Found ${examples.length} example(s): ${examples.join(', ')}\n`);
  
  // Build each example
  for (const example of examples) {
    buildExample(example);
  }
  
  console.log('\n🎉 Example build complete!');
}

main();