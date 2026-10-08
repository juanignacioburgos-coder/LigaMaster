import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const fileUrl = 'file:///c:/Users/juani/.gemini/antigravity-ide/scratch/ligapro-amateur/index.html';

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9231',
  '--disable-gpu',
  '--no-sandbox',
  '--window-size=1360,1100',
  '--allow-file-access-from-files',
  fileUrl
]);

await new Promise(r => setTimeout(r, 2500));

http.get('http://127.0.0.1:9231/json', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const targets = JSON.parse(body);
    const pageTarget = targets.find(t => t.type === 'page');
    const ws = new globalThis.WebSocket(pageTarget.webSocketDebuggerUrl);

    ws.addEventListener('open', () => {
      ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
    });

    ws.addEventListener('message', async (e) => {
      const d = JSON.parse(e.data);
      if (d.id === 1) {
        ws.send(JSON.stringify({
          id: 2,
          method: 'Runtime.evaluate',
          params: {
            expression: `(async () => {
              window.ligamasterNavigate('standings-view');
              await new Promise(r => setTimeout(r, 300));
              window.ligamasterSetCompTab('fairplay');
              await new Promise(r => setTimeout(r, 500));
              window.scrollTo({ top: 120 });
            })()`,
            awaitPromise: true
          }
        }));
      } else if (d.id === 2) {
        ws.send(JSON.stringify({ id: 3, method: 'Page.captureScreenshot', params: { format: 'png' } }));
      } else if (d.id === 3) {
        fs.writeFileSync(path.resolve('tests', 'fairplay-screenshot.png'), Buffer.from(d.result.data, 'base64'));
        console.log('Fairplay screenshot captured OK!');

        // Ahora capturar Valla Menos Batida
        ws.send(JSON.stringify({
          id: 4,
          method: 'Runtime.evaluate',
          params: {
            expression: `(async () => {
              window.ligamasterSetCompTab('valla');
              await new Promise(r => setTimeout(r, 500));
            })()`,
            awaitPromise: true
          }
        }));
      } else if (d.id === 4) {
        ws.send(JSON.stringify({ id: 5, method: 'Page.captureScreenshot', params: { format: 'png' } }));
      } else if (d.id === 5) {
        fs.writeFileSync(path.resolve('tests', 'valla-screenshot.png'), Buffer.from(d.result.data, 'base64'));
        console.log('Valla screenshot captured OK!');
        chrome.kill();
        process.exit(0);
      }
    });
  });
});
