import fs from 'fs';
import path from 'path';

const jsDir = 'js';
const files = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'));
console.log('Testing files in js/:', files);

for (const file of files) {
  try {
    const filePath = path.join(jsDir, file);
    await import('../' + filePath.replace(/\\/g, '/'));
    console.log(`✅ ${file}: imported cleanly as ES module!`);
  } catch (err) {
    console.error(`❌ ${file}: ERROR ->`, err);
  }
}
