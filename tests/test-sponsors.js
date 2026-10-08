import { spawn } from 'child_process';
import http from 'http';

const targetUrl = 'file:///c:/Users/juani/.gemini/antigravity-ide/scratch/ligapro-amateur/index.html';

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9225',
  '--disable-gpu',
  '--no-sandbox',
  '--allow-file-access-from-files',
  targetUrl
]);

await new Promise(r => setTimeout(r, 2500));

http.get('http://127.0.0.1:9225/json', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', async () => {
    try {
      const targets = JSON.parse(body);
      const pageTarget = targets.find(t => t.type === 'page');
      const wsUrl = pageTarget.webSocketDebuggerUrl;
      const ws = new globalThis.WebSocket(wsUrl);

      ws.addEventListener('open', () => {
        ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
      });

      ws.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        if (data.id === 50) {
          const report = data.result?.result?.value;
          console.log('\n=== SPONSORS SHOWCASE VERIFICATION REPORT ===');
          console.log(JSON.stringify(report, null, 2));

          let passed = true;
          if (!report.sectionExists) {
            console.error('FAIL: .sponsors-showcase-section not found');
            passed = false;
          }
          if (report.tier1Count !== 8) {
            console.error(`FAIL: Expected 8 Tier 1 sponsors, got ${report.tier1Count}`);
            passed = false;
          }
          if (report.tier2Count !== 8) {
            console.error(`FAIL: Expected 8 Tier 2 sponsors, got ${report.tier2Count}`);
            passed = false;
          }
          if (report.tier3Count !== 5) {
            console.error(`FAIL: Expected 5 Tier 3 sponsors, got ${report.tier3Count}`);
            passed = false;
          }
          if (report.totalSponsors !== 21) {
            console.error(`FAIL: Expected 21 total sponsors, got ${report.totalSponsors}`);
            passed = false;
          }
          if (!report.modalOpenedForBrand) {
            console.error('FAIL: Sponsor brand modal did not open on click');
            passed = false;
          }
          if (!report.modalOpenedForGeneral) {
            console.error('FAIL: General proposal modal did not open on Sé Patrocinador click');
            passed = false;
          }

          if (passed) {
            console.log('\n🎉 ALL SPONSORS SHOWCASE CHECKS PASSED PERFECTLY! ✅\n');
            chrome.kill();
            process.exit(0);
          } else {
            console.error('\n❌ SOME SPONSOR CHECKS FAILED!\n');
            chrome.kill();
            process.exit(1);
          }
        }
      });

      setTimeout(() => {
        const script = `
          (() => {
            const section = document.querySelector('.sponsors-showcase-section');
            const sectionExists = !!section;
            const tier1Count = document.querySelectorAll('.sponsors-grid-tier-1 .sponsor-card').length;
            const tier2Count = document.querySelectorAll('.sponsors-grid-tier-2 .sponsor-card').length;
            const tier3Count = document.querySelectorAll('.sponsors-grid-tier-3 .sponsor-card').length;
            const totalSponsors = document.querySelectorAll('.sponsors-showcase-section .sponsor-card').length;

            // Test clicking a brand (e.g., Puma)
            const firstSponsor = document.querySelector('.sponsors-grid-tier-1 .sponsor-card');
            firstSponsor?.click();
            const modal = document.getElementById('modal-sponsor-partnership');
            const modalOpenedForBrand = modal?.classList.contains('active') && modal.querySelector('#sponsor-modal-title')?.textContent.includes('Puma');
            
            // Close modal
            window.closeModal('modal-sponsor-partnership');

            // Test clicking 'Sé Patrocinador Oficial'
            const contactBtn = document.querySelector('.btn-sponsor-contact');
            contactBtn?.click();
            const modalOpenedForGeneral = modal?.classList.contains('active') && modal.querySelector('#sponsor-modal-title')?.textContent.includes('Patrocinio');

            window.closeModal('modal-sponsor-partnership');

            return {
              sectionExists,
              tier1Count,
              tier2Count,
              tier3Count,
              totalSponsors,
              modalOpenedForBrand,
              modalOpenedForGeneral
            };
          })()
        `;
        ws.send(JSON.stringify({ id: 50, method: 'Runtime.evaluate', params: { expression: script, returnByValue: true } }));
      }, 1500);

      setTimeout(() => {
        chrome.kill();
        process.exit(0);
      }, 7000);

    } catch (e) {
      console.error('Error connecting to Chrome:', e);
      chrome.kill();
      process.exit(1);
    }
  });
});
