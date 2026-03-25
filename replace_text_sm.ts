import * as fs from 'fs';

const files = [
  'src/pages/KnowledgeBase.tsx',
  'src/pages/BusinessProfile.tsx',
  'src/pages/FOIAEngine.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  content = content.replace(/text-sm/g, 'text-[10px] uppercase tracking-widest font-bold');
  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
}
