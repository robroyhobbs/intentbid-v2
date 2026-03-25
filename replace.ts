import * as fs from 'fs';

const files = [
  'src/pages/BusinessProfile.tsx',
  'src/pages/ClientAccountDetail.tsx',
  'src/pages/ClientPortal.tsx',
  'src/pages/ManagedDelivery.tsx',
  'src/pages/Settings.tsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/rounded-(sm|md|lg|xl|2xl|3xl|full)/g, 'rounded-none');
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
