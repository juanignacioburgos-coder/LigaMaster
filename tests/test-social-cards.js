import { spawn } from 'child_process';
import http from 'http';
import { renderSocialCard, CARD_THEMES } from '../js/social-cards.js';

console.log('=== SOCIAL MEDIA CARDS TEST SUITE ===');

// 1. Test Mock Canvas Rendering in Node
class MockContext2D {
  constructor() {
    this.fillStyle = '';
    this.strokeStyle = '';
    this.lineWidth = 1;
    this.font = '';
    this.textAlign = 'left';
    this.textBaseline = 'top';
    this.calls = [];
  }
  save() { this.calls.push('save'); }
  restore() { this.calls.push('restore'); }
  beginPath() { this.calls.push('beginPath'); }
  closePath() { this.calls.push('closePath'); }
  moveTo(x, y) { this.calls.push(`moveTo(${x},${y})`); }
  lineTo(x, y) { this.calls.push(`lineTo(${x},${y})`); }
  quadraticCurveTo() { this.calls.push('quadraticCurveTo'); }
  arc() { this.calls.push('arc'); }
  fill() { this.calls.push('fill'); }
  stroke() { this.calls.push('stroke'); }
  fillRect(x, y, w, h) { this.calls.push(`fillRect(${w}x${h})`); }
  strokeRect(x, y, w, h) { this.calls.push(`strokeRect(${w}x${h})`); }
  fillText(text) { this.calls.push(`fillText("${text}")`); }
  drawImage() { this.calls.push('drawImage'); }
  createLinearGradient() {
    return { addColorStop: () => {} };
  }
  createRadialGradient() {
    return { addColorStop: () => {} };
  }
}

class MockCanvas {
  constructor(w = 1080, h = 1080) {
    this.width = w;
    this.height = h;
    this.ctx = new MockContext2D();
  }
  getContext(type) {
    return type === '2d' ? this.ctx : null;
  }
  toDataURL() {
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  }
}

// Test unit: all 4 templates and both formats
const templates = ['resultados', 'tabla', 'partido', 'goleadores'];
const formats = ['square', 'story'];

for (const tmpl of templates) {
  for (const fmt of formats) {
    const canvas = new MockCanvas();
    await renderSocialCard(canvas, {
      template: tmpl,
      format: fmt,
      seriesId: 'primera_adulta',
      round: 3,
      theme: 'dark-coral'
    });

    const expectedW = 1080;
    const expectedH = fmt === 'story' ? 1920 : 1080;

    if (canvas.width !== expectedW || canvas.height !== expectedH) {
      console.error(`FAIL: Invalid dimensions for ${tmpl} (${fmt}): ${canvas.width}x${canvas.height}`);
      process.exit(1);
    }
    if (canvas.ctx.calls.length < 20) {
      console.error(`FAIL: Too few draw operations for ${tmpl} (${fmt}): ${canvas.ctx.calls.length}`);
      process.exit(1);
    }
    console.log(`  ✓ Template [${tmpl}] Format [${fmt}] (${expectedW}x${expectedH}): ${canvas.ctx.calls.length} draw calls`);
  }
}

console.log('\n2. Testing in Headless Chrome via CDP...');

const targetUrl = 'http://localhost:8080/index.html';

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9225',
  '--disable-gpu',
  '--no-sandbox',
  targetUrl
]);

await new Promise(r => setTimeout(r, 2000));

http.get('http://127.0.0.1:9225/json', (res) => {
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
          console.log('\n=== SOCIAL CARDS IN-BROWSER CDP REPORT ===');
          console.log(JSON.stringify(report, null, 2));

          let passed = true;
          if (!report.modalExists) {
            console.error('FAIL: #modal-social-cards does not exist in DOM');
            passed = false;
          }
          if (!report.headerButtonExists) {
            console.error('FAIL: #btn-header-social-cards does not exist');
            passed = false;
          }
          if (!report.modalOpened) {
            console.error('FAIL: Modal did not open with active class');
            passed = false;
          }
          if (report.canvasWidth !== 1080 || report.canvasHeight !== 1080) {
            console.error('FAIL: Canvas dimensions incorrect:', report.canvasWidth, report.canvasHeight);
            passed = false;
          }
          if (report.templatesCount !== 4) {
            console.error('FAIL: Expected 4 template pills, got:', report.templatesCount);
            passed = false;
          }
          if (report.formatsCount !== 2) {
            console.error('FAIL: Expected 2 format pills, got:', report.formatsCount);
            passed = false;
          }
          if (!report.isStorySwitched || report.storyCanvasHeight !== 1920) {
            console.error('FAIL: Switching to story format failed:', report.storyCanvasHeight);
            passed = false;
          }

          ws.close();
          try { chrome.kill(); } catch {}

          if (passed) {
            console.log('\n🎉 ALL SOCIAL MEDIA CARDS CHECKS PASSED 100%! ✅');
            process.exit(0);
          } else {
            console.error('\n❌ SOME SOCIAL CARDS CHECKS FAILED');
            process.exit(1);
          }
        } else if (data.id === 1) {
          // Eval script in browser
          const expr = `
            (async () => {
              const modal = document.getElementById('modal-social-cards');
              const headerBtn = document.getElementById('btn-header-social-cards');
              const canvas = document.getElementById('social-card-canvas');
              
              const modalExists = !!modal;
              const headerButtonExists = !!headerBtn;
              
              // Open modal
              if (window.ligamasterOpenSocialCardModal) {
                window.ligamasterOpenSocialCardModal({ template: 'resultados', format: 'square' });
              } else if (headerBtn) {
                headerBtn.click();
              }
              
              // Small delay for rendering
              await new Promise(r => setTimeout(r, 400));
              
              const modalOpened = modal && modal.classList.contains('active');
              const canvasWidth = canvas ? canvas.width : 0;
              const canvasHeight = canvas ? canvas.height : 0;
              
              const templatePills = document.querySelectorAll('.studio-template-pill');
              const formatPills = document.querySelectorAll('.studio-format-pill');
              
              // Switch to story format
              const storyBtn = document.querySelector('.studio-format-pill[data-format="story"]');
              if (storyBtn) storyBtn.click();
              
              await new Promise(r => setTimeout(r, 400));
              
              const storyCanvasHeight = canvas ? canvas.height : 0;
              const isStorySwitched = storyCanvasHeight === 1920;
              
              return {
                modalExists,
                headerButtonExists,
                modalOpened,
                canvasWidth,
                canvasHeight,
                templatesCount: templatePills.length,
                formatsCount: formatPills.length,
                isStorySwitched,
                storyCanvasHeight
              };
            })()
          `;
          ws.send(JSON.stringify({
            id: 50,
            method: 'Runtime.evaluate',
            params: {
              expression: expr,
              awaitPromise: true,
              returnByValue: true
            }
          }));
        }
      });
    } catch (e) {
      console.error('CDP connect error:', e);
      try { chrome.kill(); } catch {}
      process.exit(1);
    }
  });
}).on('error', (e) => {
  console.error('CDP HTTP error:', e);
  try { chrome.kill(); } catch {}
  process.exit(1);
});
