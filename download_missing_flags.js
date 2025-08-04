const https = require('https');
const fs = require('fs');
const path = require('path');

// Flag URLs from flagcdn.com (free flag service)
const flagsToDownload = [
  {
    code: 'au',
    url: 'https://flagcdn.com/au.svg',
    name: 'Australia'
  },
  {
    code: 'dk', 
    url: 'https://flagcdn.com/dk.svg',
    name: 'Denmark'
  },
  {
    code: 'fr',
    url: 'https://flagcdn.com/fr.svg', 
    name: 'France'
  },
  {
    code: 'cn',
    url: 'https://flagcdn.com/cn.svg',
    name: 'China'
  },
  {
    code: 'it',
    url: 'https://flagcdn.com/it.svg',
    name: 'Italy'
  }
];

const flagsDir = path.join(__dirname, 'public', 'flags');

// Ensure flags directory exists
if (!fs.existsSync(flagsDir)) {
  fs.mkdirSync(flagsDir, { recursive: true });
}

function downloadFlag(flag) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(flagsDir, `${flag.code}.svg`);
    
    // Check if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`✅ ${flag.name} flag already exists`);
      resolve();
      return;
    }

    const file = fs.createWriteStream(filePath);
    
    https.get(flag.url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✅ Downloaded ${flag.name} flag (${flag.code}.svg)`);
          resolve();
        });
      } else {
        console.log(`❌ Failed to download ${flag.name} flag: ${response.statusCode}`);
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    }).on('error', (err) => {
      console.log(`❌ Error downloading ${flag.name} flag: ${err.message}`);
      reject(err);
    });
  });
}

async function downloadAllFlags() {
  console.log('🚩 Starting flag downloads...\n');
  
  for (const flag of flagsToDownload) {
    try {
      await downloadFlag(flag);
    } catch (error) {
      console.log(`Failed to download ${flag.name}: ${error.message}`);
    }
  }
  
  console.log('\n🎉 Flag download process completed!');
  console.log('\n📁 Check your public/flags directory for the new files.');
}

downloadAllFlags(); 