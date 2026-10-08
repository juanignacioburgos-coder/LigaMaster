import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const fileUrl = 'file:///c:/Users/juani/.gemini/antigravity-ide/scratch/ligapro-amateur/index.html';

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9228',
  '--disable-gpu',
  '--no-sandbox',
  '--allow-file-access-from-files',
  fileUrl
]);

await new Promise(r => setTimeout(r, 2500));

http.get('http://127.0.0.1:9228/json', (res) => {
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
          // Ejecutar pruebas funcionales en la página
          ws.send(JSON.stringify({
            id: 2,
            method: 'Runtime.evaluate',
            params: {
              expression: `(async () => {
                const results = {
                  compTabsExist: false,
                  regularPanelVisible: false,
                  playoffsTabWorks: false,
                  bracketRoundsRendered: 0,
                  bracketMatchesCount: 0,
                  fairplayTabWorks: false,
                  fairplayRowsCount: 0,
                  vallaTabWorks: false,
                  vallaRowsCount: 0,
                  statsFairplayWorks: false,
                  statsPorterosWorks: false,
                  adminPlayoffEditWorks: false,
                  auditLoggedPlayoff: false,
                  errors: []
                };

                try {
                  // 1. Navegar a standings-view
                  window.ligamasterNavigate('standings-view');
                  await new Promise(r => setTimeout(r, 300));

                  // Verificar comp tabs
                  const compTabs = document.querySelectorAll('#standings-comp-tabs-bar .competition-tab-btn');
                  results.compTabsExist = compTabs.length === 4;
                  results.regularPanelVisible = document.getElementById('standings-regular-panel')?.style.display !== 'none';

                  // 2. Probar cambio a Liguilla & Playoffs
                  window.ligamasterSetCompTab('playoffs');
                  await new Promise(r => setTimeout(r, 300));

                  const playoffsPanel = document.getElementById('standings-playoffs-panel');
                  results.playoffsTabWorks = playoffsPanel?.style.display === 'block';

                  const roundCols = playoffsPanel?.querySelectorAll('.bracket-round-column');
                  results.bracketRoundsRendered = roundCols ? roundCols.length : 0;

                  const matchCards = playoffsPanel?.querySelectorAll('.bracket-card');
                  results.bracketMatchesCount = matchCards ? matchCards.length : 0;

                  // 3. Probar cambio a Fair Play
                  window.ligamasterSetCompTab('fairplay');
                  await new Promise(r => setTimeout(r, 300));

                  const fairplayPanel = document.getElementById('standings-fairplay-panel');
                  results.fairplayTabWorks = fairplayPanel?.style.display === 'block';

                  const fairplayRows = fairplayPanel?.querySelectorAll('#fairplay-table tbody tr');
                  results.fairplayRowsCount = fairplayRows ? fairplayRows.length : 0;

                  // 4. Probar cambio a Valla Menos Batida
                  window.ligamasterSetCompTab('valla');
                  await new Promise(r => setTimeout(r, 300));

                  const vallaPanel = document.getElementById('standings-valla-panel');
                  results.vallaTabWorks = vallaPanel?.style.display === 'block';

                  const vallaRows = vallaPanel?.querySelectorAll('#valla-table tbody tr');
                  results.vallaRowsCount = vallaRows ? vallaRows.length : 0;

                  // 5. Probar Stats View con Fair Play y Porteros
                  window.ligamasterNavigate('stats-view');
                  await new Promise(r => setTimeout(r, 300));

                  // Clic en Fair Play Clubes
                  const fpPill = document.querySelector('.stats-pill-btn[data-stat-category="fairplay"]');
                  if (fpPill) {
                    fpPill.click();
                    await new Promise(r => setTimeout(r, 200));
                    const header = document.getElementById('stats-metric-header')?.textContent;
                    results.statsFairplayWorks = header && header.includes('PENALIZACIÓN');
                  }

                  // Clic en Porteros
                  const portPill = document.querySelector('.stats-pill-btn[data-stat-category="porteros"]');
                  if (portPill) {
                    portPill.click();
                    await new Promise(r => setTimeout(r, 200));
                    const header = document.getElementById('stats-metric-header')?.textContent;
                    results.statsPorterosWorks = header && header.includes('PROMEDIO');
                  }

                  // 6. Probar Edición de Liguilla como Administrador
                  localStorage.setItem('LIGAMASTER_CURRENT_ROLE_V1', 'admin');
                  localStorage.setItem('LIGAMASTER_CURRENT_USER_V1', 'Presidente Claudio Pampaloni');

                  // Re-renderizar bracket para mostrar botón de edición admin
                  const playoffsPanelAdmin = document.getElementById('standings-playoffs-panel');
                  if (playoffsPanelAdmin) {
                    window.ligamasterSetCompTab('playoffs');
                    await new Promise(r => setTimeout(r, 200));
                  }
                  
                  // Abrir modal de edición de llave
                  window.ligamasterOpenEditPlayoff('qf-1', 'primera_adulta');
                  await new Promise(r => setTimeout(r, 200));

                  const modalPlayoff = document.getElementById('modal-edit-playoff');
                  if (modalPlayoff && modalPlayoff.classList.contains('active')) {
                    // Cambiar marcador y guardar
                    const leg1H = document.getElementById('edit-playoff-home-leg1');
                    if (leg1H) leg1H.value = '4';
                    window.ligamasterSaveEditPlayoff();
                    await new Promise(r => setTimeout(r, 200));
                    results.adminPlayoffEditWorks = !modalPlayoff.classList.contains('active');
                  }

                  // Verificar auditoría (unshift agrega en índice 0)
                  const dbRaw = JSON.parse(localStorage.getItem('LIGAMASTER_LEAGUE_ARAUCO_V15') || '{}');
                  const lastAudit = dbRaw?.auditLog?.[0];
                  results.auditLoggedPlayoff = lastAudit?.action === 'playoffs_update_match';

                } catch (e) {
                  results.errors.push(e.message + '\\n' + e.stack);
                }

                return results;
              })()`,
              returnByValue: true,
              awaitPromise: true
            }
          }));
        } else if (data.id === 2) {
          const testResults = data.result?.result?.value;
          console.log('\n======================================================');
          console.log('       PLAYOFFS, FAIR PLAY & VALLA TEST RESULTS        ');
          console.log('======================================================');
          console.log(JSON.stringify(testResults, null, 2));

          const allOk =
            testResults.compTabsExist &&
            testResults.regularPanelVisible &&
            testResults.playoffsTabWorks &&
            testResults.bracketRoundsRendered === 3 &&
            testResults.bracketMatchesCount >= 6 &&
            testResults.fairplayTabWorks &&
            testResults.fairplayRowsCount === 10 &&
            testResults.vallaTabWorks &&
            testResults.vallaRowsCount === 10 &&
            testResults.statsFairplayWorks &&
            testResults.statsPorterosWorks &&
            testResults.adminPlayoffEditWorks &&
            testResults.auditLoggedPlayoff;

          if (allOk) {
            console.log('\n✅ 100% OF PLAYOFFS & COMPETITION TEST ASSERTIONS PASSED!');
          } else {
            console.error('\n❌ SOME TEST ASSERTIONS FAILED!');
          }

          // Capturar screenshot de verificación
          ws.send(JSON.stringify({
            id: 3,
            method: 'Page.captureScreenshot',
            params: { format: 'png' }
          }));
        } else if (data.id === 3) {
          const base64 = data.result?.data;
          if (base64) {
            const outPath = path.resolve('tests', 'playoffs-verification-screenshot.png');
            fs.writeFileSync(outPath, Buffer.from(base64, 'base64'));
            console.log(`📸 Screenshot saved: ${outPath}`);
          }
          chrome.kill();
          process.exit(0);
        }
      });

    } catch (err) {
      console.error('Error in test:', err);
      chrome.kill();
      process.exit(1);
    }
  });
}).on('error', (err) => {
  console.error('HTTP error connecting to Chrome CDP:', err);
  chrome.kill();
  process.exit(1);
});
