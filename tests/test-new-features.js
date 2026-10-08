import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const fileUrl = 'file:///c:/Users/juani/.gemini/antigravity-ide/scratch/ligapro-amateur/index.html';

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9227',
  '--disable-gpu',
  '--no-sandbox',
  '--allow-file-access-from-files',
  fileUrl
]);

await new Promise(r => setTimeout(r, 2500));

http.get('http://127.0.0.1:9227/json', (res) => {
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
                  programacionPillExists: false,
                  programacionRenderSuccess: false,
                  sponsorsChecklistRendered: false,
                  sponsorTogglesWork: false,
                  refereeRbacStrict: false,
                  adminSettingsSecurityExists: false,
                  auditLogTracksActions: false,
                  canvasDataUrlPreview: null,
                  errors: []
                };

                try {
                  // 1. Abrir Modal de Publicaciones
                  window.ligamasterOpenSocialCardModal('programacion', 'primera_adulta', 4);
                  await new Promise(r => setTimeout(r, 600));

                  const progPill = document.querySelector('.studio-template-pill[data-template="programacion"]');
                  results.programacionPillExists = !!progPill;

                  // Verificar render de canvas
                  const canvas = document.getElementById('social-card-canvas');
                  if (canvas && canvas.width === 1080 && canvas.height === 1080) {
                    results.programacionRenderSuccess = true;
                    results.canvasDataUrlPreview = canvas.toDataURL('image/png').substring(0, 50) + '...';
                  }

                  // 2. Verificar checklist rápido de auspiciadores
                  const checklist = document.getElementById('studio-sponsors-checklist');
                  const chips = checklist ? checklist.querySelectorAll('.studio-sponsor-chip') : [];
                  results.sponsorsChecklistRendered = chips.length > 0;
                  results.sponsorsCount = chips.length;

                  // Probar botones Todos / Ninguno
                  const btnNone = document.getElementById('studio-sponsors-select-none');
                  const btnAll = document.getElementById('studio-sponsors-select-all');
                  if (btnNone && btnAll) {
                    btnNone.click();
                    await new Promise(r => setTimeout(r, 200));
                    const noneChecked = Array.from(checklist.querySelectorAll('input[type="checkbox"]')).every(c => !c.checked);
                    btnAll.click();
                    await new Promise(r => setTimeout(r, 200));
                    const allChecked = Array.from(checklist.querySelectorAll('input[type="checkbox"]')).every(c => c.checked);
                    results.sponsorTogglesWork = noneChecked && allChecked;
                  }

                  // 3. Probar Seguridad y Control de Acceso (RBAC)
                  // Iniciar sesión como Turno de Cancha (referee)
                  const loginRef = window.ligamasterLogin ? window.ligamasterLogin('1234', 'Turno Cancha 1') : null;
                  // O llamar a login de auth si está expuesto
                  localStorage.setItem('LIGAMASTER_CURRENT_ROLE_V1', 'referee');
                  localStorage.setItem('LIGAMASTER_CURRENT_USER_V1', 'Turno Arbitral Oficial');
                  
                  if (window.ligamasterNavigate) {
                    window.ligamasterNavigate('admin-view');
                    await new Promise(r => setTimeout(r, 400));
                  }

                  // Comprobar que como referee NO se muestran los tabs de finanzas, clubes, sanciones ni configuración
                  const refereeSubnav = document.querySelector('.admin-subnav-bar');
                  const hasSettingsTab = refereeSubnav ? refereeSubnav.querySelector('[data-admin-tab="settings"]') : null;
                  const hasTreasuryTab = refereeSubnav ? refereeSubnav.querySelector('[data-admin-tab="treasury"]') : null;
                  const hasMatchesTab = refereeSubnav ? refereeSubnav.querySelector('[data-admin-tab="matches"]') : null;
                  results.refereeRbacStrict = !hasSettingsTab && !hasTreasuryTab && !!hasMatchesTab;

                  // Intentar añadir sponsor como referee (debe ser bloqueado)
                  let sponsorBlocked = false;
                  window.ligamasterAddSponsor('TestSponsorRogue');
                  // Comprobar si se añadió o no
                  const dbAfter = JSON.parse(localStorage.getItem('LIGAMASTER_LEAGUE_ARAUCO_V15') || '{}');
                  sponsorBlocked = !(dbAfter.sponsors || []).some(s => s.name === 'TestSponsorRogue');
                  results.sponsorBlockedForNonAdmin = sponsorBlocked;

                  // Ahora cambiar a Admin (9999)
                  localStorage.setItem('LIGAMASTER_CURRENT_ROLE_V1', 'admin');
                  localStorage.setItem('LIGAMASTER_CURRENT_USER_V1', 'Presidente Asociación');
                  if (window.ligamasterNavigate) {
                    window.ligamasterNavigate('admin-view');
                    await new Promise(r => setTimeout(r, 400));
                  }

                  // Ir al tab Settings
                  const btnSettings = document.querySelector('.admin-subnav-btn[data-admin-tab="settings"]');
                  if (btnSettings) {
                    btnSettings.click();
                    await new Promise(r => setTimeout(r, 300));
                  }

                  const securityForm = document.getElementById('admin-security-pins-form');
                  results.adminSettingsSecurityExists = !!securityForm;

                  // Probar añadir sponsor como admin
                  window.ligamasterAddSponsor('PUMA');
                  await new Promise(r => setTimeout(r, 200));

                  const dbAdmin = JSON.parse(localStorage.getItem('LIGAMASTER_LEAGUE_ARAUCO_V15') || '{}');
                  const auditLogs = dbAdmin.auditLog || [];
                  results.auditLogTracksActions = auditLogs.length > 0 && auditLogs.some(l => l.action.includes('Auspiciador'));
                  results.auditLogEntriesCount = auditLogs.length;

                } catch (e) {
                  results.errors.push(e.message + '\\n' + e.stack);
                }

                return results;
              })()`,
              awaitPromise: true,
              returnByValue: true
            }
          }));
        }

        if (data.id === 2) {
          const report = data.result?.result?.value;
          console.log('\n========================================');
          console.log('REPORTE OFICIAL DE PRUEBAS DE SEGURIDAD Y ESTUDIO');
          console.log('========================================');
          console.log(JSON.stringify(report, null, 2));

          chrome.kill();
          if (report.programacionPillExists &&
              report.programacionRenderSuccess &&
              report.sponsorsChecklistRendered &&
              report.sponsorTogglesWork &&
              report.refereeRbacStrict &&
              report.sponsorBlockedForNonAdmin &&
              report.adminSettingsSecurityExists &&
              report.auditLogTracksActions) {
            console.log('\n>>> ¡TODAS LAS PRUEBAS PASARON EXITOSAMENTE! (100% OK) <<<');
            process.exit(0);
          } else {
            console.error('\n>>> ALGUNAS PRUEBAS FALLARON. <<<');
            process.exit(1);
          }
        }
      });
    } catch (err) {
      console.error(err);
      chrome.kill();
      process.exit(1);
    }
  });
});
