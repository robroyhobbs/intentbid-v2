const fs = require('fs');
const file = 'src/pages/BusinessProfile.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/ rounded /g, ' rounded-none ');
fs.writeFileSync(file, content);
