import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9228',
  '--disable-gpu',
  '--no-sandbox',
  '--window-size=1280,800',
  'http://localhost:8080/index.html'
]);

await new Promise(r => setTimeout(r, 2000));

http.get('http://127.0.0.1:9228/json', (res) => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    const targets = JSON.parse(body);
    const page = targets.find(t => t.type === 'page');
    const ws = new globalThis.WebSocket(page.webSocketDebuggerUrl);
    
    ws.addEventListener('open', () => {
      ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
      ws.send(JSON.stringify({ id: 2, method: 'Page.enable' }));
      
      setTimeout(() => {
        // Click the button
        ws.send(JSON.stringify({
          id: 3,
          method: 'Runtime.evaluate',
          params: {
            expression: `
              (() => {
                const btn = document.getElementById('btn-header-social-cards');
                if (btn) btn.click();
                const modal = document.getElementById('modal-social-cards');
                return {
                  hasModal: !!modal,
                  classList: modal ? modal.className : '',
                  modalRect: modal ? modal.getBoundingClientRect() : null,
                  canvasRect: document.getElementById('social-card-canvas')?.getBoundingClientRect()
                };
              })()
            `,
            returnByValue: true
          }
        }));
      }, 500);
    });

    ws.addEventListener('message', (e) => {
      const msg = JSON.parse(e.data);
      if (msg.id === 3) {
        console.log('CLICK RESULT:', JSON.stringify(msg.result?.result?.value, null, 2));
        
        // Take screenshot to see what is on screen
        setTimeout(() => {
          ws.send(JSON.stringify({
            id: 4,
            method: 'Page.captureScreenshot',
            params: { format: 'png' }
          }));
        }, 300);
      }
      if (msg.id === 4) {
        const base64Data = msg.result?.data;
        if (base64Data) {
          fs.writeFileSync('tests/screenshot-modal.png', Buffer.from(base64Data, 'base64'));
          console.log('Screenshot saved to tests/screenshot-modal.png');
        }
        ws.close();
        try { chrome.kill(); } catch {}
        process.exit(0);
      }
    });
  });
});
