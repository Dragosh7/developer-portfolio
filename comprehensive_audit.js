const fs = require('fs');
const path = require('path');

console.log('====================================================');
console.log('   PORTFOLIO INTEGRITY & HEALTH AUDIT');
console.log('====================================================\n');

let errorCount = 0;
let warningCount = 0;

function reportPass(msg) {
  console.log(`\x1b[32m[PASS]\x1b[0m ${msg}`);
}
function reportWarn(msg) {
  warningCount++;
  console.log(`\x1b[33m[WARN]\x1b[0m ${msg}`);
}
function reportFail(msg) {
  errorCount++;
  console.log(`\x1b[31m[FAIL]\x1b[0m ${msg}`);
}

// 1. Check JSON files in data/
console.log('--- Checking JSON Data Files ---');
const dataDir = path.join(__dirname, 'data');
if (fs.existsSync(dataDir)) {
  const jsonFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
  for (const file of jsonFiles) {
    const fullPath = path.join(dataDir, file);
    try {
      const content = fs.readFileSync(fullPath, 'utf8');
      JSON.parse(content);
      reportPass(`Valid JSON: data/${file}`);
    } catch (e) {
      reportFail(`JSON parse error in data/${file}: ${e.message}`);
    }
  }
} else {
  reportFail('data/ directory not found');
}

// 2. Scan HTML files for links, anchors, and legacy placeholders
console.log('\n--- Checking HTML Files Integrity ---');
const htmlFiles = ['index.html', 'blog.html', 'resume.html', 'services.html', 'evidence.html'];

for (const htmlFile of htmlFiles) {
  const fullPath = path.join(__dirname, htmlFile);
  if (!fs.existsSync(fullPath)) {
    reportFail(`Missing HTML file: ${htmlFile}`);
    continue;
  }
  const content = fs.readFileSync(fullPath, 'utf8');

  // Collect all DOM element IDs
  const idRegex = /id=["']([^"']+)["']/g;
  const ids = new Set();
  let match;
  while ((match = idRegex.exec(content)) !== null) {
    ids.add(match[1]);
  }

  // Check in-page anchors
  const anchorRegex = /href=["']#([^"']+)["']/g;
  while ((match = anchorRegex.exec(content)) !== null) {
    const anchor = match[1];
    if (anchor && !ids.has(anchor)) {
      reportWarn(`${htmlFile}: Anchor target '#${anchor}' not found as an ID in same document`);
    }
  }

  // Check internal file references
  const fileLinkRegex = /href=["']([a-zA-Z0-9_\-]+\.html)(#[^"']*)?["']/g;
  while ((match = fileLinkRegex.exec(content)) !== null) {
    const targetFile = match[1];
    if (!fs.existsSync(path.join(__dirname, targetFile))) {
      reportFail(`${htmlFile}: Referenced local file does not exist: ${targetFile}`);
    }
  }

  // Check for legacy dragostecuci links
  if (content.includes('github.com/dragostecuci')) {
    reportFail(`${htmlFile}: Contains legacy link 'github.com/dragostecuci'`);
  }

  // Check for lingering company placeholders
  if (content.includes('[TODO: Customize Company Name]')) {
    reportFail(`${htmlFile}: Contains un-customized '[TODO: Customize Company Name]'`);
  }

  // Check for Dragosh7 and tecuci-dragos presence
  const hasGitHub = content.includes('Dragosh7');
  const hasLinkedIn = content.includes('tecuci-dragos');
  reportPass(`${htmlFile}: IDs: ${ids.size}, GitHub (Dragosh7): ${hasGitHub ? 'YES' : 'N/A'}, LinkedIn: ${hasLinkedIn ? 'YES' : 'N/A'}`);
}

// 3. Scan JSON for legacy links
console.log('\n--- Checking JSON for Legacy Placeholders ---');
if (fs.existsSync(dataDir)) {
  const jsonFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
  for (const file of jsonFiles) {
    const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
    if (content.includes('github.com/dragostecuci')) {
      reportFail(`data/${file}: Contains legacy 'github.com/dragostecuci'`);
    }
    if (content.includes('[TODO: Customize Company Name]')) {
      reportFail(`data/${file}: Contains '[TODO: Customize Company Name]'`);
    }
  }
}

console.log('\n====================================================');
console.log(`AUDIT COMPLETE: ${errorCount} Errors, ${warningCount} Warnings`);
console.log('====================================================');

process.exit(errorCount > 0 ? 1 : 0);
