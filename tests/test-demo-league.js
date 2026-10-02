import { spawn } from 'child_process';
import http from 'http';

const targetUrl = 'http://localhost:8080/index.html';

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9224',
  '--disable-gpu',
  '--no-sandbox',
  targetUrl
]);

await new Promise(r => setTimeout(r, 2000));

http.get('http://127.0.0.1:9224/json', (res) => {
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

      ws.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        if (data.id === 50) {
          const report = data.result?.result?.value;
          console.log('\n=== LIGA DEMO & 4-SERIES VERIFICATION REPORT ===');
          console.log(JSON.stringify(report, null, 2));

          // Validations
          let passed = true;
          if (report.activeLeagueName !== 'Liga Demo') {
            console.error('FAIL: Expected activeLeagueName to be "Liga Demo", got:', report.activeLeagueName);
            passed = false;
          }
          if (report.standingsSeriesCount !== 4) {
            console.error('FAIL: Expected 4 series pills, got:', report.standingsSeriesCount);
            passed = false;
          }
          if (report.primeraAdultaLeader !== 'Club Deportivo Arauco' || report.primeraAdultaPts !== 9) {
            console.error('FAIL: Expected Primera Adulta leader Arauco with 9 pts, got:', report.primeraAdultaLeader, report.primeraAdultaPts);
            passed = false;
          }
          if (report.seniorLeader !== 'Defensor Playa Brava' || report.seniorPts !== 9) {
            console.error('FAIL: Expected Senior leader Defensor Playa Brava with 9 pts, got:', report.seniorLeader, report.seniorPts);
            passed = false;
          }
          if (report.superSeniorLeader !== 'Club Deportivo Ferroviario' || report.superSeniorPts !== 9) {
            console.error('FAIL: Expected Súper Senior leader Ferroviario with 9 pts, got:', report.superSeniorLeader, report.superSeniorPts);
            passed = false;
          }
          if (!report.juvenilLeader.includes('Juvenil') || report.juvenilPts !== 9) {
            console.error('FAIL: Expected Juvenil leader Unión Juvenil with 9 pts, got:', report.juvenilLeader, report.juvenilPts);
            passed = false;
          }
          if (report.teamResumenSeriesCards !== 4) {
            console.error('FAIL: Expected 4 series cards in club resumen, got:', report.teamResumenSeriesCards);
            passed = false;
          }
          if (report.teamPlantelPills !== 4) {
            console.error('FAIL: Expected 4 series pills in club plantel, got:', report.teamPlantelPills);
            passed = false;
          }
          if (report.plantelRosterCount !== 20) {
            console.error('FAIL: Expected 20 players in active series roster, got:', report.plantelRosterCount);
            passed = false;
          }
          if (report.teamFinishedMatchesCount !== 3) {
            console.error('FAIL: Expected 3 finished matches (3 fechas jugadas), got:', report.teamFinishedMatchesCount);
            passed = false;
          }

          if (passed) {
            console.log('\n🎉 ALL 4-SERIES AND 3-ROUND DEMO LEAGUE CHECKS PASSED PERFECTLY! ✅');
          } else {
            console.error('\n❌ SOME CHECKS FAILED!');
            chrome.kill();
            process.exit(1);
          }
        }
      });

      setTimeout(() => {
        const script = `
          (() => {
            // 1. Switch to Liga Demo
            window.ligamasterSwitchLeague('liga-demo');
            const activeLeagueName = document.getElementById('context-league-name')?.textContent;

            // 2. Standings for Primera Adulta
            window.ligamasterSetSeries('primera_adulta');
            window.ligamasterNavigate('standings-view');
            const standingsSeriesCount = document.querySelectorAll('#standings-series-pills-container .series-pill-btn').length;
            const rows1 = document.querySelectorAll('#standings-table-body tr');
            const primeraAdultaLeader = rows1[0]?.querySelector('.table-team-name')?.textContent?.trim();
            const primeraAdultaPts = parseInt(rows1[0]?.querySelector('.pts-cell')?.textContent?.trim() || '0', 10);
            const primeraAdultaPj = parseInt(rows1[0]?.querySelectorAll('td')[2]?.textContent?.trim() || '0', 10);

            // 3. Switch to Senior
            window.ligamasterSetSeries('senior');
            const rows2 = document.querySelectorAll('#standings-table-body tr');
            const seniorLeader = rows2[0]?.querySelector('.table-team-name')?.textContent?.trim();
            const seniorPts = parseInt(rows2[0]?.querySelector('.pts-cell')?.textContent?.trim() || '0', 10);

            // 4. Switch to Super Senior
            window.ligamasterSetSeries('super_senior');
            const rows3 = document.querySelectorAll('#standings-table-body tr');
            const superSeniorLeader = rows3[0]?.querySelector('.table-team-name')?.textContent?.trim();
            const superSeniorPts = parseInt(rows3[0]?.querySelector('.pts-cell')?.textContent?.trim() || '0', 10);

            // 5. Switch to Juvenil
            window.ligamasterSetSeries('juvenil');
            const rows4 = document.querySelectorAll('#standings-table-body tr');
            const juvenilLeader = rows4[0]?.querySelector('.table-team-name')?.textContent?.trim();
            const juvenilPts = parseInt(rows4[0]?.querySelector('.pts-cell')?.textContent?.trim() || '0', 10);

            // 6. Club View: Resumen Tab
            window.ligamasterSelectTeam('demo-arauco');
            const teamResumenSeriesCards = document.querySelectorAll('.club-series-card').length;

            // 7. Club View: Plantel Tab
            document.querySelector('.team-tab-btn[data-team-tab="plantel"]')?.click();
            const teamPlantelPills = document.querySelectorAll('#team-tab-content-container .series-pill-btn').length;
            const plantelRosterCount = document.querySelectorAll('.player-roster-card').length;

            // 8. Club View: Partidos Tab
            document.querySelector('.team-tab-btn[data-team-tab="partidos"]')?.click();
            const teamFinishedMatchesCount = document.querySelectorAll('#team-tab-content-container .match-status-badge.finished').length;

            // 9. Player View
            window.ligamasterNavigate('player-view');
            const playerProfileName = document.getElementById('player-profile-name')?.textContent;
            const playerProfileSeries = document.getElementById('player-profile-series')?.textContent;
            const playerProfileDorsal = document.getElementById('player-profile-dorsal')?.textContent;

            return {
              activeLeagueName,
              standingsSeriesCount,
              primeraAdultaLeader,
              primeraAdultaPts,
              primeraAdultaPj,
              seniorLeader,
              seniorPts,
              superSeniorLeader,
              superSeniorPts,
              juvenilLeader,
              juvenilPts,
              teamResumenSeriesCards,
              teamPlantelPills,
              plantelRosterCount,
              teamFinishedMatchesCount,
              playerProfileName,
              playerProfileSeries,
              playerProfileDorsal
            };
          })()
        `;
        ws.send(JSON.stringify({ id: 50, method: 'Runtime.evaluate', params: { expression: script, returnByValue: true } }));
      }, 1500);

      setTimeout(() => {
        chrome.kill();
        process.exit(0);
      }, 5000);

    } catch (e) {
      console.error(e);
      chrome.kill();
      process.exit(1);
    }
  });
});
