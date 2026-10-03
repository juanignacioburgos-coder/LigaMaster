import { spawn } from 'child_process';
import http from 'http';

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9227',
  '--disable-gpu',
  '--no-sandbox',
  'http://localhost:8080/index.html'
]);

await new Promise(r => setTimeout(r, 2000));

http.get('http://127.0.0.1:9227/json', (res) => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    const targets = JSON.parse(body);
    const page = targets.find(t => t.type === 'page');
    const ws = new globalThis.WebSocket(page.webSocketDebuggerUrl);
    
    ws.addEventListener('open', () => {
      ws.send(JSON.stringify({ id: 1, method: 'Log.enable' }));
      ws.send(JSON.stringify({ id: 2, method: 'Runtime.enable' }));
      setTimeout(() => {
        ws.send(JSON.stringify({
          id: 10,
          method: 'Runtime.evaluate',
          params: {
            expression: `
              (() => {
                const buttons = Array.from(document.querySelectorAll('button'))
                  .filter(b => b.textContent.includes('Placa'))
                  .map(b => ({
                    id: b.id,
                    text: b.textContent.trim(),
                    onclick: b.getAttribute('onclick'),
                    visible: b.offsetWidth > 0 && b.offsetHeight > 0
                  }));
                
                const fnType = typeof window.ligamasterOpenSocialCardModal;
                const modal = document.getElementById('modal-social-cards');
                const modalDisplay = modal ? window.getComputedStyle(modal).display : null;
                const modalOpacity = modal ? window.getComputedStyle(modal).opacity : null;
                const modalVisibility = modal ? window.getComputedStyle(modal).visibility : null;
                const modalZIndex = modal ? window.getComputedStyle(modal).zIndex : null;

                // Now simulate clicking the button
                const btn = document.getElementById('nav-btn-social-cards') || document.getElementById('btn-header-social-cards');
                let clicked = false;
                if (btn) {
                  btn.click();
                  clicked = true;
                }

                const modalAfterClickClass = modal ? modal.className : null;
                const modalAfterClickDisplay = modal ? window.getComputedStyle(modal).display : null;
                const modalAfterClickOpacity = modal ? window.getComputedStyle(modal).opacity : null;
                const modalAfterClickVisibility = modal ? window.getComputedStyle(modal).visibility : null;

                return {
                  buttons,
                  fnType,
                  modalExists: !!modal,
                  modalDisplay,
                  modalOpacity,
                  modalVisibility,
                  modalZIndex,
                  clicked,
                  modalAfterClickClass,
                  modalAfterClickDisplay,
                  modalAfterClickOpacity,
                  modalAfterClickVisibility
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
      if (msg.method === 'Runtime.consoleAPICalled') {
        console.log('CONSOLE:', msg.params.args.map(a => a.value || a.description).join(' '));
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        console.error('EXCEPTION:', msg.params.exceptionDetails);
      }
      if (msg.id === 10) {
        console.log('RESULT:\n', JSON.stringify(msg.result?.result?.value, null, 2));
        ws.close();
        try { chrome.kill(); } catch {}
        process.exit(0);
      }
    });
  });
});
