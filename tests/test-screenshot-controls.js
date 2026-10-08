import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9231',
  '--disable-gpu',
  '--no-sandbox',
  '--allow-file-access-from-files',
  '--window-size=1280,920',
  'file:///c:/Users/juani/.gemini/antigravity-ide/scratch/ligapro-amateur/index.html'
]);

await new Promise(r => setTimeout(r, 2000));

http.get('http://127.0.0.1:9231/json', (res) => {
  let b = '';
  res.on('data', c => b += c);
  res.on('end', () => {
    const p = JSON.parse(b).find(x => x.type === 'page');
    const ws = new globalThis.WebSocket(p.webSocketDebuggerUrl);
    ws.addEventListener('open', () => {
      ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
      ws.send(JSON.stringify({ id: 2, method: 'Page.enable' }));
      setTimeout(() => {
        ws.send(JSON.stringify({
          id: 3,
          method: 'Runtime.evaluate',
          params: {
            expression: `(() => {
              window.ligamasterOpenSocialCardModal('resultados', 'primera_adulta', 3);
              const ctrl = document.querySelector('.social-studio-controls');
              if (ctrl) ctrl.scrollTop = 380;
            })()`
          }
        }));
        setTimeout(() => {
          ws.send(JSON.stringify({ id: 4, method: 'Page.captureScreenshot', params: { format: 'png' } }));
        }, 800);
      }, 800);
    });
    ws.addEventListener('message', (e) => {
      const msg = JSON.parse(e.data);
      if (msg.id === 4) {
        fs.writeFileSync('tests/screenshot-scrolled-controls.png', Buffer.from(msg.result.data, 'base64'));
        console.log('Saved tests/screenshot-scrolled-controls.png');
        chrome.kill();
        process.exit(0);
      }
    });
  });
});
