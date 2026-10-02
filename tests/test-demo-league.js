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
          console.log('Liga Demo In-Browser Verification:', JSON.stringify(data.result?.result?.value, null, 2));
        }
      });

      setTimeout(() => {
        const script = `
          (() => {
            // Switch to Liga Demo
            window.ligamasterSwitchLeague('liga-demo');
            
            const activeLeagueName = document.getElementById('context-league-name')?.textContent;
            const clubList = document.querySelectorAll('.team-list-card');
            const navToStandings = () => {
              window.ligamasterNavigate('standings-view');
              return document.querySelector('#standings-table-body')?.children.length;
            };
            const navToPlayers = () => {
              window.ligamasterNavigate('player-view');
              return document.getElementById('player-name-display')?.textContent;
            };

            return {
              activeLeagueName,
              activeId: window.localStorage.getItem('LIGAMASTER_ACTIVE_LEAGUE'),
              standingsRows: navToStandings(),
              samplePlayerName: navToPlayers()
            };
          })()
        `;
        ws.send(JSON.stringify({ id: 50, method: 'Runtime.evaluate', params: { expression: script, returnByValue: true } }));
      }, 2000);

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
