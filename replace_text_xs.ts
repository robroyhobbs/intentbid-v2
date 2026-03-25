import * as fs from 'fs';

const files = [
  'src/pages/KnowledgeBase.tsx',
  'src/pages/BusinessProfile.tsx',
  'src/pages/FOIAEngine.tsx',
  'src/pages/ManagedDelivery.tsx',
  'src/pages/ProposalWizard.tsx',
  'src/pages/ProposalWorkspace.tsx',
  'src/pages/ProposalsList.tsx',
  'src/pages/Settings.tsx',
  'src/pages/ClientAccountDetail.tsx',
  'src/pages/ClientPortal.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  content = content.replace(/text-xs/g, 'text-[10px] uppercase tracking-widest font-bold');
  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
}
