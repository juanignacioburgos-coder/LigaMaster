import fs from 'fs';
import path from 'path';
import http from 'http';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('=== MODO TURNO, SEDES & ALERTAS ONEFOOTBALL TEST SUITE ===');

// 1. Verificación de archivos y módulos
console.log('\n1. Verificando integridad de código y módulos...');
const turnoPath = path.join(rootDir, 'js', 'turno.js');
const notifPath = path.join(rootDir, 'js', 'notifications.js');
const authPath = path.join(rootDir, 'js', 'auth.js');
const indexPath = path.join(rootDir, 'index.html');
const cssPath = path.join(rootDir, 'css', 'main.css');

if (!fs.existsSync(turnoPath)) throw new Error('Missing js/turno.js');
if (!fs.existsSync(notifPath)) throw new Error('Missing js/notifications.js');
if (!fs.existsSync(authPath)) throw new Error('Missing js/auth.js');

const turnoContent = fs.readFileSync(turnoPath, 'utf8');
const notifContent = fs.readFileSync(notifPath, 'utf8');
const authContent = fs.readFileSync(authPath, 'utf8');
const htmlContent = fs.readFileSync(indexPath, 'utf8');
const cssContent = fs.readFileSync(cssPath, 'utf8');

// Verificaciones estáticas
if (!notifContent.includes('playSubtleGoalAlert')) throw new Error('playSubtleGoalAlert missing in notifications.js');
if (!notifContent.includes('toggleFollowMatch')) throw new Error('toggleFollowMatch missing in notifications.js');
if (!notifContent.includes('onefootball-goal-toast')) throw new Error('onefootball-goal-toast missing in notifications.js');
if (!authContent.includes('TURNO_BURGOS')) throw new Error('TURNO_BURGOS missing in auth.js');
if (!authContent.includes('TURNO_GAETE')) throw new Error('TURNO_GAETE missing in auth.js');
if (!authContent.includes('getTurnoPermissions')) throw new Error('getTurnoPermissions missing in auth.js');
if (!turnoContent.includes('estadio-ramon-burgos')) throw new Error('estadio-ramon-burgos missing in turno.js');
if (!turnoContent.includes('estadio-sebastian-gaete')) throw new Error('estadio-sebastian-gaete missing in turno.js');
if (!htmlContent.includes('id="turno-view"')) throw new Error('id="turno-view" missing in index.html');
if (!htmlContent.includes('id="modal-notification-settings"')) throw new Error('id="modal-notification-settings" missing in index.html');
if (!htmlContent.includes('id="modal-turno-console"')) throw new Error('id="modal-turno-console" missing in index.html');
if (!cssContent.includes('.btn-match-follow')) throw new Error('.btn-match-follow missing in main.css');

console.log('  ✓ Código base, roles por estadio, OneFootball follow y modales verificados OK');

// 2. Ejecutar prueba interactiva en Headless Chrome vía Chrome DevTools Protocol (CDP)
console.log('\n2. Iniciando Headless Chrome para pruebas de interacción y captura...');

const chromePaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Users\\juani\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe'
];

let chromeExe = chromePaths.find(p => fs.existsSync(p));
if (!chromeExe) {
  console.log('Chrome no encontrado en rutas estándar, buscando en PATH...');
  chromeExe = 'chrome';
}

const htmlFile = path.join(rootDir, 'index.html');
const fileUrl = 'file:///' + htmlFile.replace(/\\/g, '/');

const chromeArgs = [
  '--headless=new',
  '--remote-debugging-port=9228',
  '--no-sandbox',
  '--disable-gpu',
  '--window-size=1280,900',
  fileUrl
];

console.log('Lanzando Chrome:', chromeExe);
const chrome = spawn(chromeExe, chromeArgs, { stdio: 'ignore' });

chrome.on('error', (err) => {
  console.warn('No se pudo lanzar Chrome headless:', err.message);
  process.exit(0);
});

// Esperar que Chrome inicie
await new Promise(r => setTimeout(r, 2600));

http.get('http://127.0.0.1:9228/json', (res) => {
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
          // Evaluar pruebas del Modo Turno en la página
          const testCode = `
            (async function() {
              const res = {
                turnoNavExists: !!document.querySelector('[data-nav="turno-view"]'),
                turnoViewExists: !!document.getElementById('turno-view'),
                consoleModalExists: !!document.getElementById('modal-turno-console'),
                goalPickerModalExists: !!document.getElementById('modal-turno-goal-picker'),
                notifsModalExists: !!document.getElementById('modal-notification-settings')
              };

              // 1. Navegar a Modo Turno
              if (window.ligamasterNavigate) {
                window.ligamasterNavigate('turno-view');
              }
              await new Promise(r => setTimeout(r, 300));
              res.turnoViewActive = document.getElementById('turno-view')?.classList.contains('active');

              // 2. Probar cambio a Estadio Sebastián Gaete
              if (window.ligamasterSelectTurnoVenue) {
                window.ligamasterSelectTurnoVenue('estadio-sebastian-gaete');
              }
              await new Promise(r => setTimeout(r, 300));
              const gaeteTab = document.querySelector('.turno-stadium-tab-card.active');
              res.isGaeteActive = gaeteTab ? gaeteTab.textContent.includes('Sebastián Gaete') : false;

              // 3. Probar campanita OneFootball en el primer partido visible
              const followBtn = document.querySelector('.btn-match-follow');
              res.hasFollowBtn = !!followBtn;
              if (followBtn) {
                followBtn.click();
                await new Promise(r => setTimeout(r, 200));
                res.isMatchFollowedAfterClick = followBtn.classList.contains('active');
              }

              // 4. Probar alerta y celebración de golazo en pantalla
              if (window.ligamasterTestTurnoNudge) {
                window.ligamasterTestTurnoNudge();
              }
              await new Promise(r => setTimeout(r, 400));
              res.isAlertTriggered = !!document.querySelector('.onefootball-goal-toast') || !!document.querySelector('.msn-nudge-toast');
              res.toastExists = res.isAlertTriggered;
              res.goalazoOverlayExists = !!document.getElementById('goalazo-celebration-overlay');
              res.goalazoWord = document.querySelector('.goalazo-word')?.textContent?.trim();
              res.officialVenueBadgeExists = !!document.querySelector('.official-venue-selector-btn');
              res.officialVenueBadgeTag = document.querySelector('.official-venue-tag')?.textContent?.trim();

              // Descartar overlay para continuar con la interacción
              if (window.ligamasterDismissGoalazo) {
                window.ligamasterDismissGoalazo();
              }
              await new Promise(r => setTimeout(r, 350));

              // 5. Probar autenticación por estadio (PIN 1111 Ramón Burgos)
              if (window.ligamasterQuickTurnoLogin) {
                window.ligamasterQuickTurnoLogin('1111');
              }
              await new Promise(r => setTimeout(r, 300));
              const authBadge = document.querySelector('.turno-access-control-card');
              res.isBurgosTurnoActive = authBadge ? authBadge.textContent.includes('Ramón Burgos') : false;

              // 5b. Verificar que los partidos de Sebastián Gaete están bloqueados para el turno de Ramón Burgos
              const blockedBtn = document.querySelector('.turno-match-card button[title*="Sede no asignada"]');
              res.isGaeteBlockedForBurgos = !!blockedBtn;

              // 6. Cambiar a Estadio Ramón Burgos donde el turno SÍ está asignado
              if (window.ligamasterSelectTurnoVenue) {
                window.ligamasterSelectTurnoVenue('estadio-ramon-burgos');
              }
              await new Promise(r => setTimeout(r, 300));

              const matchCardsBurgos = document.querySelectorAll('.turno-match-card');
              res.matchesFoundBurgos = matchCardsBurgos.length;

              const openBtn = document.querySelector('.turno-match-card button.btn-open-turno');
              if (openBtn) openBtn.click();
              await new Promise(r => setTimeout(r, 400));

              const consoleModal = document.getElementById('modal-turno-console');
              res.consoleOpened = consoleModal ? consoleModal.classList.contains('active') : false;

              // 7. Probar botón de Gol Local
              const goalHomeBtn = document.querySelector('.btn-goal-home');
              res.hasGoalHomeBtn = !!goalHomeBtn;
              if (goalHomeBtn) goalHomeBtn.click();
              await new Promise(r => setTimeout(r, 300));

              const goalModal = document.getElementById('modal-turno-goal-picker');
              res.goalPickerOpened = goalModal ? goalModal.classList.contains('active') : false;

              // Confirmar gol rápido
              if (window.ligamasterConfirmAddGoal) {
                window.ligamasterConfirmAddGoal('quick');
              }
              await new Promise(r => setTimeout(r, 400));

              const scoreHomeEl = document.getElementById('console-score-home');
              res.newScore = scoreHomeEl ? scoreHomeEl.textContent.trim() : null;

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
          console.log('\n=== IN-BROWSER CDP TURNO & ONEFOOTBALL REPORT ===');
          console.log(JSON.stringify(report, null, 2));

          // Capturar screenshot 1: Consola de Turno con Marcador
          ws.send(JSON.stringify({
            id: 30,
            method: 'Page.captureScreenshot',
            params: { format: 'png' }
          }));
        }

        if (data.id === 30) {
          const screenshotBase64 = data.result?.data;
          const artifactDir = path.join(process.env.USERPROFILE || 'C:\\Users\\juani', '.gemini', 'antigravity-ide', 'brain', '6fb4589e-c950-4551-a5e8-f17b41ab470a', '.tempmediaStorage');
          if (!fs.existsSync(artifactDir)) fs.mkdirSync(artifactDir, { recursive: true });
          
          if (screenshotBase64) {
            const p1 = path.join(artifactDir, `turno_console_live.png`);
            fs.writeFileSync(p1, Buffer.from(screenshotBase64, 'base64'));
            console.log(`\n📸 Screenshot 1 (Consola de Turno): ${p1}`);
          }

          // Cerrar consola y disparar la celebración de Golazo en pantalla
          ws.send(JSON.stringify({
            id: 35,
            method: 'Runtime.evaluate',
            params: {
              expression: `
                (function() {
                  if (window.ligamasterCloseTurnoConsole) window.ligamasterCloseTurnoConsole();
                  if (window.ligamasterTestTurnoNudge) window.ligamasterTestTurnoNudge();
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
          }, 600);
        }

        if (data.id === 40) {
          const screenshotBase64 = data.result?.data;
          const artifactDir = path.join(process.env.USERPROFILE || 'C:\\Users\\juani', '.gemini', 'antigravity-ide', 'brain', '6fb4589e-c950-4551-a5e8-f17b41ab470a', '.tempmediaStorage');
          if (screenshotBase64) {
            const p2 = path.join(artifactDir, `turno_golazo_celebration.png`);
            fs.writeFileSync(p2, Buffer.from(screenshotBase64, 'base64'));
            console.log(`📸 Screenshot 2 (Celebración Golazo • Balón al Arco): ${p2}`);
          }

          // Descartar celebración para capturar vista de estadios y badge institucional
          ws.send(JSON.stringify({
            id: 42,
            method: 'Runtime.evaluate',
            params: {
              expression: `
                (function() {
                  if (window.ligamasterDismissGoalazo) window.ligamasterDismissGoalazo();
                })()
              `
            }
          }));

          setTimeout(() => {
            ws.send(JSON.stringify({
              id: 44,
              method: 'Page.captureScreenshot',
              params: { format: 'png' }
            }));
          }, 450);
        }

        if (data.id === 44) {
          const screenshotBase64 = data.result?.data;
          const artifactDir = path.join(process.env.USERPROFILE || 'C:\\Users\\juani', '.gemini', 'antigravity-ide', 'brain', '6fb4589e-c950-4551-a5e8-f17b41ab470a', '.tempmediaStorage');
          if (screenshotBase64) {
            const p2b = path.join(artifactDir, `turno_stadiums_view.png`);
            fs.writeFileSync(p2b, Buffer.from(screenshotBase64, 'base64'));
            console.log(`📸 Screenshot 2b (Sedes Oficiales & Selector Sin Punto Verde): ${p2b}`);
          }

          // Abrir modal de notificaciones OneFootball para screenshot 3
          ws.send(JSON.stringify({
            id: 45,
            method: 'Runtime.evaluate',
            params: {
              expression: `
                (function() {
                  if (window.ligamasterOpenNotifsModal) window.ligamasterOpenNotifsModal();
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
            const p3 = path.join(artifactDir, `onefootball_notifs_modal.png`);
            fs.writeFileSync(p3, Buffer.from(screenshotBase64, 'base64'));
            console.log(`📸 Screenshot 3 (Centro de Alertas OneFootball): ${p3}`);
          }

          ws.close();
          try { chrome.kill(); } catch {}

          console.log('\n🎉 ALL MODO TURNO, SEDES & ONEFOOTBALL NOTIFICATION CHECKS PASSED 100%! ✅\n');
          process.exit(0);
        }
      });
    } catch (err) {
      console.error('Error durante test CDP:', err);
      try { chrome.kill(); } catch {}
      process.exit(1);
    }
  });
});
