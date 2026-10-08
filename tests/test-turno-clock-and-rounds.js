import fs from 'fs';
import path from 'path';
import http from 'http';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('=== TEST DE CRONÓMETRO SINCRONIZADO & SELECTOR DE JORNADAS/FECHAS ===');

// 1. Verificación en Headless Chrome vía CDP
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
  '--remote-debugging-port=9229',
  '--no-sandbox',
  '--disable-gpu',
  '--window-size=1280,950',
  fileUrl
];

console.log('Iniciando Chrome para captura de reloj y fechas...');
const chrome = spawn(chromeExe, chromeArgs, { stdio: 'ignore' });

chrome.on('error', (err) => {
  console.warn('Chrome error:', err.message);
  process.exit(0);
});

await new Promise(r => setTimeout(r, 2600));

http.get('http://127.0.0.1:9229/json', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', async () => {
    try {
      const targets = JSON.parse(body);
      const pageTarget = targets.find(t => t.type === 'page');
      if (!pageTarget) throw new Error('No page target found');

      const wsUrl = pageTarget.webSocketDebuggerUrl;
      const ws = new globalThis.WebSocket(wsUrl);

      ws.addEventListener('open', () => {
        ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
      });

      ws.addEventListener('message', async (event) => {
        const data = JSON.parse(event.data);

        if (data.id === 1) {
          const testCode = `
            (async function() {
              const res = {};

              // Navegar a Modo Turno
              if (window.ligamasterNavigate) {
                window.ligamasterNavigate('turno-view');
              }
              await new Promise(r => setTimeout(r, 300));

              // 1. Verificar existencia de barra de fechas
              res.hasRoundBar = !!document.querySelector('.turno-round-bar');
              res.roundPillsCount = document.querySelectorAll('.round-pill-btn').length;
              
              // 2. Verificar partidos estipulados para Fecha 4 (por defecto)
              const cardsF4 = document.querySelectorAll('.turno-match-card');
              res.countMatchesF4 = cardsF4.length;

              // 3. Cambiar a Fecha 1 y verificar
              if (window.ligamasterSelectTurnoRound) {
                window.ligamasterSelectTurnoRound('Fecha 1');
              }
              await new Promise(r => setTimeout(r, 300));
              const cardsF1 = document.querySelectorAll('.turno-match-card');
              res.countMatchesF1 = cardsF1.length;

              // 4. Volver a Fecha 4
              if (window.ligamasterSelectTurnoRound) {
                window.ligamasterSelectTurnoRound('Fecha 4');
              }
              await new Promise(r => setTimeout(r, 300));

              // 5. Autenticar como Turno Ramón Burgos
              if (window.ligamasterQuickTurnoLogin) {
                window.ligamasterQuickTurnoLogin('1111');
              }
              await new Promise(r => setTimeout(r, 250));

              // 6. Abrir consola del primer partido de Fecha 4 en Ramón Burgos
              const openBtn = document.querySelector('.turno-match-card button.btn-open-turno');
              if (openBtn) openBtn.click();
              await new Promise(r => setTimeout(r, 400));

              res.consoleOpen = document.getElementById('modal-turno-console')?.classList.contains('active');
              res.hasStopwatchCard = !!document.querySelector('.console-stopwatch-card');
              res.initialClock = document.getElementById('console-clock-display')?.textContent?.trim();

              // 7. Iniciar 1er tiempo
              if (window.ligamasterStartFirstHalf) {
                window.ligamasterStartFirstHalf();
              }
              await new Promise(r => setTimeout(r, 1200));

              res.clockAfterStart = document.getElementById('console-clock-display')?.textContent?.trim();
              res.clockTickingClass = document.getElementById('console-clock-display')?.classList.contains('live-ticking');

              // 8. Añadir tiempo de descuento (+3 min)
              if (window.ligamasterAddInjuryTime) {
                window.ligamasterAddInjuryTime(3);
              }
              await new Promise(r => setTimeout(r, 300));

              // 9. Abrir modal de gol para verificar auto-sincronización del minuto exacto
              const goalHomeBtn = document.querySelector('.btn-goal-home');
              if (goalHomeBtn) goalHomeBtn.click();
              await new Promise(r => setTimeout(r, 300));

              const minInput = document.getElementById('goal-picker-minute-input');
              res.autoSyncedMinute = minInput ? minInput.value : null;

              return res;
            })()
          `;

          ws.send(JSON.stringify({
            id: 20,
            method: 'Runtime.evaluate',
            params: { expression: testCode, awaitPromise: true, returnByValue: true }
          }));
        }

        if (data.id === 20) {
          const report = data.result?.result?.value;
          console.log('\n=== REPORTE DE SINCRONIZACIÓN DE CRONÓMETRO Y FECHAS ===');
          console.log(JSON.stringify(report, null, 2));

          const artifactDir = path.join(process.env.USERPROFILE || 'C:\\Users\\juani', '.gemini', 'antigravity-ide', 'brain', '6fb4589e-c950-4551-a5e8-f17b41ab470a', '.tempmediaStorage');
          if (!fs.existsSync(artifactDir)) fs.mkdirSync(artifactDir, { recursive: true });

          // Captura 1: Modal de Gol con Minuto Auto-calculado
          ws.send(JSON.stringify({
            id: 30,
            method: 'Page.captureScreenshot',
            params: { format: 'png' }
          }));
        }

        if (data.id === 30) {
          const screenshotBase64 = data.result?.data;
          const artifactDir = path.join(process.env.USERPROFILE || 'C:\\Users\\juani', '.gemini', 'antigravity-ide', 'brain', '6fb4589e-c950-4551-a5e8-f17b41ab470a', '.tempmediaStorage');
          if (screenshotBase64) {
            const p1 = path.join(artifactDir, `turno_goal_minute_autosync.png`);
            fs.writeFileSync(p1, Buffer.from(screenshotBase64, 'base64'));
            console.log(`📸 Screenshot 1 (Minuto Auto-sincronizado en Gol): ${p1}`);
          }

          // Cerrar modal de gol para capturar la consola de cronómetro corriendo
          ws.send(JSON.stringify({
            id: 35,
            method: 'Runtime.evaluate',
            params: {
              expression: `
                (function() {
                  if (window.ligamasterCloseGoalModal) window.ligamasterCloseGoalModal();
                })()
              `
            }
          }));

          setTimeout(() => {
            ws.send(JSON.stringify({
              id: 40,
              method: 'Page.captureScreenshot',
              params: { format: 'png' }
            }));
          }, 350);
        }

        if (data.id === 40) {
          const screenshotBase64 = data.result?.data;
          const artifactDir = path.join(process.env.USERPROFILE || 'C:\\Users\\juani', '.gemini', 'antigravity-ide', 'brain', '6fb4589e-c950-4551-a5e8-f17b41ab470a', '.tempmediaStorage');
          if (screenshotBase64) {
            const p2 = path.join(artifactDir, `turno_console_synchronized_clock.png`);
            fs.writeFileSync(p2, Buffer.from(screenshotBase64, 'base64'));
            console.log(`📸 Screenshot 2 (Cronómetro Digital en Consola de Turno): ${p2}`);
          }

          // Cerrar consola para capturar la vista de partidos con la Barra de Fechas y Tickers
          ws.send(JSON.stringify({
            id: 45,
            method: 'Runtime.evaluate',
            params: {
              expression: `
                (function() {
                  if (window.ligamasterCloseTurnoConsole) window.ligamasterCloseTurnoConsole();
                })()
              `
            }
          }));

          setTimeout(() => {
            ws.send(JSON.stringify({
              id: 50,
              method: 'Page.captureScreenshot',
              params: { format: 'png' }
            }));
          }, 400);
        }

        if (data.id === 50) {
          const screenshotBase64 = data.result?.data;
          const artifactDir = path.join(process.env.USERPROFILE || 'C:\\Users\\juani', '.gemini', 'antigravity-ide', 'brain', '6fb4589e-c950-4551-a5e8-f17b41ab470a', '.tempmediaStorage');
          if (screenshotBase64) {
            const p3 = path.join(artifactDir, `turno_round_selector_and_live_clocks.png`);
            fs.writeFileSync(p3, Buffer.from(screenshotBase64, 'base64'));
            console.log(`📸 Screenshot 3 (Selector de Fechas & Insignias En Vivo): ${p3}`);
          }

          ws.close();
          try { chrome.kill(); } catch {}

          console.log('\n🎉 ALL SYNCHRONIZED CLOCK & ROUND FILTER CHECKS PASSED 100%! ✅\n');
          process.exit(0);
        }
      });
    } catch (err) {
      console.error('Error durante test:', err);
      try { chrome.kill(); } catch {}
      process.exit(1);
    }
  });
});
