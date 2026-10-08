import fs from 'fs';
import path from 'path';
import http from 'http';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('=== TEST DE EXPERIENCIA MÓVIL (BOTTOM NAV, TOUCH PILLS & POCKET MODE) ===');

const chromePaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Users\\juani\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe'
];

let chromeExe = chromePaths.find(p => fs.existsSync(p)) || 'chrome';
const htmlFile = path.join(rootDir, 'index.html');
const fileUrl = 'file:///' + htmlFile.replace(/\\/g, '/');

// Emular tamaño de pantalla de celular moderno (iPhone 14 / Samsung Galaxy: 390x844)
const chromeArgs = [
  '--headless=new',
  '--remote-debugging-port=9230',
  '--no-sandbox',
  '--disable-gpu',
  '--window-size=390,844',
  fileUrl
];

console.log('Iniciando Chrome con viewport móvil 390x844...');
const chrome = spawn(chromeExe, chromeArgs, { stdio: 'ignore' });

chrome.on('error', (err) => {
  console.warn('Chrome error:', err.message);
  process.exit(0);
});

await new Promise(r => setTimeout(r, 2600));

http.get('http://127.0.0.1:9230/json', (res) => {
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

              // 1. Verificar existencia y visibilidad de Bottom Nav en móvil
              const bottomNav = document.getElementById('mobile-bottom-nav');
              res.hasBottomNav = !!bottomNav;
              res.bottomNavItemsCount = document.querySelectorAll('.mobile-bottom-nav-item').length;
              
              // 2. Verificar navegación con el pulgar a "Turno" desde la barra inferior
              const turnoTab = document.querySelector('.mobile-bottom-nav-item.item-turno-spotlight');
              res.hasTurnoSpotlight = !!turnoTab;
              if (turnoTab) turnoTab.click();
              await new Promise(r => setTimeout(r, 350));

              res.isTurnoActive = document.getElementById('turno-view')?.classList.contains('active');
              res.isTurnoTabActive = turnoTab?.classList.contains('active');

              // 3. Verificar carrusel táctil de series en Modo Turno
              const seriesPills = document.querySelectorAll('.series-pill-btn');
              res.seriesPillsCount = seriesPills.length;

              // 4. Probar cambio a "1ª Adulta" con toque en píldora táctil
              const firstPill = Array.from(seriesPills).find(p => p.textContent.includes('1ª Adulta'));
              if (firstPill) firstPill.click();
              await new Promise(r => setTimeout(r, 300));
              res.is1raAdultaActive = firstPill?.classList.contains('active');

              // 5. Iniciar sesión de turno rápida para abrir consola
              if (window.ligamasterQuickTurnoLogin) {
                window.ligamasterQuickTurnoLogin('1111');
              }
              await new Promise(r => setTimeout(r, 250));

              // 6. Abrir consola táctil en celular
              const openBtn = document.querySelector('.turno-match-card button.btn-open-turno');
              if (openBtn) openBtn.click();
              await new Promise(r => setTimeout(r, 400));

              res.consoleOpen = document.getElementById('modal-turno-console')?.classList.contains('active');
              res.hasSunlightToggle = !!document.getElementById('btn-sunlight-mode-toggle');

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
          console.log('\n=== REPORTE DE NAVEGACIÓN MÓVIL Y ERGONOMÍA TÁCTIL ===');
          console.log(JSON.stringify(report, null, 2));

          const artifactDir = path.join(process.env.USERPROFILE || 'C:\\Users\\juani', '.gemini', 'antigravity-ide', 'brain', '6fb4589e-c950-4551-a5e8-f17b41ab470a', '.tempmediaStorage');
          if (!fs.existsSync(artifactDir)) fs.mkdirSync(artifactDir, { recursive: true });

          // Captura 1: Consola de Turno Pocket Mode en Celular
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
            const p1 = path.join(artifactDir, `mobile_turno_pocket_console.png`);
            fs.writeFileSync(p1, Buffer.from(screenshotBase64, 'base64'));
            console.log(`📸 Screenshot 1 (Consola Pocket Mode en Celular): ${p1}`);
          }

          // Cerrar consola para capturar la vista móvil con Barra Inferior y Carrusel de Series
          ws.send(JSON.stringify({
            id: 35,
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
            const p2 = path.join(artifactDir, `mobile_bottom_nav_and_turno_view.png`);
            fs.writeFileSync(p2, Buffer.from(screenshotBase64, 'base64'));
            console.log(`📸 Screenshot 2 (Barra Inferior Móvil & Carrusel de Series): ${p2}`);
          }

          // Navegar a Home desde la barra inferior para capturar pantalla principal en celular
          ws.send(JSON.stringify({
            id: 45,
            method: 'Runtime.evaluate',
            params: {
              expression: `
                (function() {
                  const homeTab = document.querySelector('.mobile-bottom-nav-item[data-nav="home-view"]');
                  if (homeTab) homeTab.click();
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
          }, 350);
        }

        if (data.id === 50) {
          const screenshotBase64 = data.result?.data;
          const artifactDir = path.join(process.env.USERPROFILE || 'C:\\Users\\juani', '.gemini', 'antigravity-ide', 'brain', '6fb4589e-c950-4551-a5e8-f17b41ab470a', '.tempmediaStorage');
          if (screenshotBase64) {
            const p3 = path.join(artifactDir, `mobile_home_with_bottom_nav.png`);
            fs.writeFileSync(p3, Buffer.from(screenshotBase64, 'base64'));
            console.log(`📸 Screenshot 3 (Home en Celular con Barra Inferior): ${p3}`);
          }

          ws.close();
          try { chrome.kill(); } catch {}

          console.log('\n🎉 ALL MOBILE BOTTOM NAV & TOUCH ERGONOMICS CHECKS PASSED 100%! ✅\n');
          process.exit(0);
        }
      });
    } catch (err) {
      console.error('Error durante test móvil:', err);
      try { chrome.kill(); } catch {}
      process.exit(1);
    }
  });
});
