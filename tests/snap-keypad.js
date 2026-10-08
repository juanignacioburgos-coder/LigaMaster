import fs from 'fs';
import path from 'path';
import http from 'http';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const chromePaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Users\\juani\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe'
];

let chromeExe = chromePaths.find(p => fs.existsSync(p)) || 'chrome';
const htmlFile = path.join(rootDir, 'index.html');
const fileUrl = 'file:///' + htmlFile.replace(/\\/g, '/');

const chromeArgs = [
  '--headless=new',
  '--remote-debugging-port=9233',
  '--no-sandbox',
  '--disable-gpu',
  '--window-size=390,844',
  fileUrl
];

const chrome = spawn(chromeExe, chromeArgs, { stdio: 'ignore' });
await new Promise(r => setTimeout(r, 2600));

http.get('http://127.0.0.1:9233/json', (res) => {
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

      ws.addEventListener('message', async (event) => {
        const data = JSON.parse(event.data);

        if (data.id === 1) {
          const script = `
            (async function() {
              if (window.ligamasterNavigate) window.ligamasterNavigate('turno-view');
              await new Promise(r => setTimeout(r, 200));
              if (window.ligamasterOpenTurnoKeypad) window.ligamasterOpenTurnoKeypad('estadio-ramon-burgos');
              if (window.ligamasterKeypadPress) {
                window.ligamasterKeypadPress('1');
                window.ligamasterKeypadPress('1');
              }
              await new Promise(r => setTimeout(r, 200));
              return true;
            })()
          `;
          ws.send(JSON.stringify({
            id: 10,
            method: 'Runtime.evaluate',
            params: { expression: script, awaitPromise: true }
          }));
        }

        if (data.id === 10) {
          ws.send(JSON.stringify({
            id: 20,
            method: 'Page.captureScreenshot',
            params: { format: 'png' }
          }));
        }

        if (data.id === 20) {
          const imgBase64 = data.result?.data;
          if (imgBase64) {
            const outPath = path.join(rootDir, 'tests', 'keypad-modal-screenshot.png');
            fs.writeFileSync(outPath, Buffer.from(imgBase64, 'base64'));
            console.log('📸 Screenshot Keypad guardado en:', outPath);
          }
          chrome.kill();
          process.exit(0);
        }
      });
    } catch (e) {
      console.error(e);
      chrome.kill();
      process.exit(1);
    }
  });
});
