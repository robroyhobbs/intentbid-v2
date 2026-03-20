import https from 'https';
import fs from 'fs';
import path from 'path';

const files = [
  'src/app/globals.css',
  'src/types/intake.ts',
  'src/lib/proposal-core/wizard-state.ts',
  'src/components/layout/sidebar.tsx',
  'src/app/(dashboard)/proposals/new/_components/wizard-shell.tsx'
];

const baseUrl = 'https://raw.githubusercontent.com/robroyhobbs/intentwin/main/';

files.forEach(file => {
  const url = baseUrl + file;
  https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log(`\n--- ${file} ---\n`);
        console.log(data.substring(0, 1500)); // Print first 1500 chars to avoid overwhelming output
      } else {
        console.log(`\n--- ${file} --- (Failed: ${res.statusCode})\n`);
      }
    });
  }).on('error', (err) => {
    console.error(`Error fetching ${file}:`, err.message);
  });
});
