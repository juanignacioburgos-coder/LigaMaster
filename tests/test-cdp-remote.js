import { spawn } from 'child_process';
import http from 'http';

const targetUrl = process.argv[2] || 'https://juanignacioburgos-coder.github.io/LigaMaster/';
console.log('Testing URL:', targetUrl);

// Launch Chrome with remote debugging
const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9223',
  '--disable-gpu',
  '--no-sandbox',
  targetUrl
]);

await new Promise(r => setTimeout(r, 2500));

http.get('http://127.0.0.1:9223/json', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', async () => {
    try {
      const targets = JSON.parse(body);
      const pageTarget = targets.find(t => t.type === 'page');
      if (!pageTarget) {
        console.error('No page target found');
        chrome.kill();
        process.exit(1);
      }
      
      const wsUrl = pageTarget.webSocketDebuggerUrl;
      console.log('Connecting to WebSocket...');
      const ws = new globalThis.WebSocket(wsUrl);
      
      ws.addEventListener('open', () => {
        ws.send(JSON.stringify({ id: 1, method: 'Console.enable' }));
        ws.send(JSON.stringify({ id: 2, method: 'Runtime.enable' }));
        ws.send(JSON.stringify({ id: 3, method: 'Page.enable' }));
      });
      
      ws.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        if (data.method === 'Runtime.consoleAPICalled') {
          console.log('[BROWSER CONSOLE]', data.params.type, data.params.args.map(a => a.value || a.description));
        }
        if (data.method === 'Runtime.exceptionThrown') {
          console.error('💥 [BROWSER EXCEPTION]', data.params.exceptionDetails.text, data.params.exceptionDetails.exception?.description);
        }
        if (data.id === 20) {
          console.log('Click Navigation test result:', data.result?.result?.value || data.result);
        }
      });
      
      setTimeout(async () => {
        console.log('Simulating clicks in page...');
        const clickTest = `
          (() => {
            const results = {};
            results.initialActive = document.querySelector('.platform-view.active')?.id;
            
            // Find Tabla button
            const tablaBtn = document.querySelector('button[data-nav="standings-view"]');
            if (tablaBtn) {
              tablaBtn.click();
              results.afterTablaClick = document.querySelector('.platform-view.active')?.id;
            } else {
              results.afterTablaClick = 'NOT_FOUND';
            }
            
            // Find Admin button
            const adminBtn = document.querySelector('button[data-nav="admin-view"]');
            if (adminBtn) {
              adminBtn.click();
              results.afterAdminClick = document.querySelector('.platform-view.active')?.id;
            } else {
              results.afterAdminClick = 'NOT_FOUND';
            }

            // Find Ligas picker button
            const ligasBtn = document.getElementById('nav-btn-ligas-picker');
            if (ligasBtn) {
              ligasBtn.click();
              results.pickerModalActive = document.getElementById('modal-league-picker')?.classList.contains('active');
            } else {
              results.pickerModalActive = 'NOT_FOUND';
            }
            
            return results;
          })()
        `;
        ws.send(JSON.stringify({ id: 20, method: 'Runtime.evaluate', params: { expression: clickTest, returnByValue: true } }));
      }, 3000);
      
      setTimeout(() => {
        chrome.kill();
        process.exit(0);
      }, 7000);
      
    } catch (err) {
      console.error('Error:', err);
      chrome.kill();
      process.exit(1);
    }
  });
}).on('error', (e) => {
  console.error('CDP connect error:', e);
  chrome.kill();
  process.exit(1);
});
