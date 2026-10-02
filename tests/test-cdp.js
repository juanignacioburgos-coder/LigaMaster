import { spawn } from 'child_process';
import http from 'http';

// Launch Chrome with remote debugging
const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9222',
  '--disable-gpu',
  '--no-sandbox',
  'http://localhost:8080/index.html'
]);

// Wait 2 seconds for Chrome to start
await new Promise(r => setTimeout(r, 2000));

// Query JSON endpoints to get WebSocket debugger URL
http.get('http://127.0.0.1:9222/json', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', async () => {
    try {
      const targets = JSON.parse(body);
      console.log('Targets found:', targets.length);
      const pageTarget = targets.find(t => t.type === 'page');
      if (!pageTarget) {
        console.error('No page target found');
        chrome.kill();
        process.exit(1);
      }
      
      const wsUrl = pageTarget.webSocketDebuggerUrl;
      console.log('Connecting to WebSocket:', wsUrl);
      
      const ws = new globalThis.WebSocket(wsUrl);
      
      ws.addEventListener('open', () => {
        console.log('CDP Connected! Enabling Console & Runtime...');
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
          console.error('💥 [BROWSER EXCEPTION]', data.params.exceptionDetails);
        }
        if (data.id === 10) {
          console.log('Result of eval:', data.result);
        }
      });
      
      setTimeout(async () => {
        // Evaluate in page: test navigation
        console.log('Evaluating window.ligamasterNavigate...');
        const evalMsg = {
          id: 10,
          method: 'Runtime.evaluate',
          params: {
            expression: `
              ({
                hasLigamasterNavigate: typeof window.ligamasterNavigate === 'function',
                activeView: document.querySelector('.platform-view.active')?.id,
                hasOpenModal: typeof window.openModal === 'function'
              })
            `,
            returnByValue: true
          }
        };
        ws.send(JSON.stringify(evalMsg));
      }, 2000);
      
      setTimeout(() => {
        chrome.kill();
        process.exit(0);
      }, 5000);
      
    } catch (err) {
      console.error('Error parsing CDP json:', err);
      chrome.kill();
      process.exit(1);
    }
  });
}).on('error', (e) => {
  console.error('CDP connect error:', e);
  chrome.kill();
  process.exit(1);
});
