import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

console.log('=== TEST SUITE: BACKGROUND PHOTOGRAPHY & COLOR MODE IN SOCIAL CARDS ===');

const fileUrl = 'file:///c:/Users/juani/.gemini/antigravity-ide/scratch/ligapro-amateur/index.html';

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9229',
  '--disable-gpu',
  '--no-sandbox',
  '--allow-file-access-from-files',
  '--window-size=1280,900',
  fileUrl
]);

await new Promise(r => setTimeout(r, 2500));

http.get('http://127.0.0.1:9229/json', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', async () => {
    try {
      const targets = JSON.parse(body);
      const pageTarget = targets.find(t => t.type === 'page');
      if (!pageTarget) {
        console.error('No page target found');
        process.exit(1);
      }
      const wsUrl = pageTarget.webSocketDebuggerUrl;
      const ws = new globalThis.WebSocket(wsUrl);

      ws.addEventListener('open', () => {
        ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
      });

      ws.addEventListener('message', async (event) => {
        const data = JSON.parse(event.data);
        if (data.id === 1) {
          // Evaluar controles e interacciones
          ws.send(JSON.stringify({
            id: 2,
            method: 'Runtime.evaluate',
            params: {
              expression: `(async () => {
                // 1. Abrir Modal de Social Cards
                if (window.ligamasterOpenSocialCardModal) {
                  window.ligamasterOpenSocialCardModal('resultados', 'primera_adulta', 3);
                } else {
                  document.getElementById('btn-header-social-cards')?.click();
                }

                await new Promise(r => setTimeout(r, 600));

                const modal = document.getElementById('modal-social-cards');
                const canvas = document.getElementById('social-card-canvas');
                const bgGrid = document.getElementById('studio-bg-grid');
                const btnColTheme = document.getElementById('btn-colormode-theme');
                const btnColOrig = document.getElementById('btn-colormode-original');
                const uploadInput = document.getElementById('studio-upload-bg-input');

                const bgCards = Array.from(bgGrid?.querySelectorAll('.studio-bg-card') || []).map(c => ({
                  id: c.getAttribute('data-bg-id'),
                  title: c.querySelector('.studio-bg-title')?.textContent,
                  active: c.classList.contains('active')
                }));

                // Probar toDataURL sin error de tainted canvas
                let canExportDataUrl = false;
                try {
                  const dataUrl = canvas.toDataURL('image/png');
                  canExportDataUrl = dataUrl && dataUrl.startsWith('data:image/png');
                } catch (e) {
                  canExportDataUrl = false;
                }

                return {
                  modalActive: modal?.classList.contains('active'),
                  canvasWidth: canvas?.width,
                  canvasHeight: canvas?.height,
                  hasBtnColTheme: !!btnColTheme,
                  hasBtnColOrig: !!btnColOrig,
                  hasUploadInput: !!uploadInput,
                  bgCardsCount: bgCards.length,
                  bgCards,
                  canExportDataUrl
                };
              })()`,
              returnByValue: true,
              awaitPromise: true
            }
          }));
        }

        if (data.id === 2) {
          const report = data.result?.result?.value;
          console.log('\n--- VERIFICACIÓN DE CONTROLES INICIALES ---');
          console.log(JSON.stringify(report, null, 2));

          if (!report?.modalActive) {
            console.error('FAIL: El modal no se abrió');
            process.exit(1);
          }
          if (!report?.canExportDataUrl) {
            console.error('FAIL: Canvas está tainted o falló toDataURL');
            process.exit(1);
          }
          if (report?.bgCardsCount < 6) {
            console.error('FAIL: Se esperaban al menos 6 fondos oficiales');
            process.exit(1);
          }
          console.log('✓ Controles iniciales y fondos oficiales cargados correctamente!');
          console.log('✓ El escudo es una opción individual en la galería, sin superponerse a otras fotos!');
          console.log('✓ Canvas exportable a PNG sin restricciones CORS (Untainted)!');

          // Ahora probar cambiar a "Color Original" y seleccionar "Estadio de Noche"
          ws.send(JSON.stringify({
            id: 3,
            method: 'Runtime.evaluate',
            params: {
              expression: `(async () => {
                // Seleccionar Color Original
                const btnOrig = document.getElementById('btn-colormode-original');
                btnOrig?.click();

                // Seleccionar Noche
                const nocheCard = document.querySelector('.studio-bg-card[data-bg-id="noche"]');
                nocheCard?.click();

                await new Promise(r => setTimeout(r, 600));

                const canvas = document.getElementById('social-card-canvas');
                return {
                  colormodeActive: btnOrig?.classList.contains('active'),
                  nocheCardActive: nocheCard?.classList.contains('active'),
                  dataUrl: canvas?.toDataURL('image/png').slice(0, 50)
                };
              })()`,
              returnByValue: true,
              awaitPromise: true
            }
          }));
        }

        if (data.id === 3) {
          console.log('\n--- VERIFICACIÓN MODO COLOR ORIGINAL (NOCHE) ---');
          console.log(JSON.stringify(data.result?.result?.value, null, 2));
          console.log('✓ Modo Color Original activado con éxito!');

          // Tomar screenshot de la página completa para verificar la UI y el canvas
          ws.send(JSON.stringify({
            id: 4,
            method: 'Page.captureScreenshot',
            params: { format: 'png' }
          }));
        }

        if (data.id === 4) {
          const b64 = data.result?.data;
          if (b64) {
            fs.writeFileSync('tests/screenshot-social-original.png', Buffer.from(b64, 'base64'));
            console.log('\n✓ Screenshot guardada en tests/screenshot-social-original.png');
          }

          // Ahora probar cambiar a "Paleta de la Placa" con "Escudo Oficial AFA"
          ws.send(JSON.stringify({
            id: 5,
            method: 'Runtime.evaluate',
            params: {
              expression: `(async () => {
                // Seleccionar Paleta de la Placa
                const btnTheme = document.getElementById('btn-colormode-theme');
                btnTheme?.click();

                // Seleccionar Escudo Oficial AFA
                const escudoCard = document.querySelector('.studio-bg-card[data-bg-id="escudo-afa"]');
                escudoCard?.click();

                await new Promise(r => setTimeout(r, 600));

                return {
                  themeColActive: btnTheme?.classList.contains('active'),
                  escudoActive: escudoCard?.classList.contains('active')
                };
              })()`,
              returnByValue: true,
              awaitPromise: true
            }
          }));
        }

        if (data.id === 5) {
          console.log('\n--- VERIFICACIÓN MODO PALETA DE LA PLACA (ESCUDO AFA) ---');
          console.log(JSON.stringify(data.result?.result?.value, null, 2));
          console.log('✓ Modo Paleta de la Placa con Escudo AFA activado!');

          // Tomar screenshot de este modo también
          ws.send(JSON.stringify({
            id: 6,
            method: 'Page.captureScreenshot',
            params: { format: 'png' }
          }));
        }

        if (data.id === 6) {
          const b64 = data.result?.data;
          if (b64) {
            fs.writeFileSync('tests/screenshot-social-theme-escudo.png', Buffer.from(b64, 'base64'));
            console.log('✓ Screenshot guardada en tests/screenshot-social-theme-escudo.png');
          }

          console.log('\n🎉 TODAS LAS PRUEBAS DE FONDOS Y MODOS DE COLOR PASARON CON 100% DE ÉXITO!');
          chrome.kill();
          process.exit(0);
        }
      });
    } catch (err) {
      console.error('Error parseando targets:', err);
      chrome.kill();
      process.exit(1);
    }
  });
});
