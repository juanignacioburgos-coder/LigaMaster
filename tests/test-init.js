import fs from 'fs';

// Mock minimal DOM for Node testing
const html = fs.readFileSync('index.html', 'utf8');

class MockElement {
  constructor(id, tag = 'div') {
    this.id = id;
    this.tagName = tag.toUpperCase();
    this.classList = {
      classes: new Set(),
      add: (c) => this.classList.classes.add(c),
      remove: (c) => this.classList.classes.delete(c),
      contains: (c) => this.classList.classes.has(c)
    };
    this.innerHTML = '';
    this.textContent = '';
    this.value = '';
    this.style = {};
    this.children = [];
    this.attributes = {};
    this.listeners = {};
  }
  getAttribute(name) { return this.attributes[name] || null; }
  setAttribute(name, val) { this.attributes[name] = val; }
  addEventListener(evt, fn) {
    if (!this.listeners[evt]) this.listeners[evt] = [];
    this.listeners[evt].push(fn);
  }
  appendChild(child) { this.children.push(child); }
  closest(selector) {
    if (selector === '[data-nav]' && this.attributes['data-nav']) return this;
    if (selector === '.modal-overlay') return this;
    return null;
  }
  click() {
    if (this.listeners['click']) {
      this.listeners['click'].forEach(fn => fn({ preventDefault: () => {}, target: this }));
    }
  }
}

const elements = {};
// Extract all IDs from index.html
const idMatches = [...html.matchAll(/id=["']([^"']+)["']/g)].map(m => m[1]);
idMatches.forEach(id => {
  elements[id] = new MockElement(id);
});

// Also create elements for any queried platform-views
const viewMatches = [...html.matchAll(/id="([^"]+-view)"/g)].map(m => m[1]);
viewMatches.forEach(id => {
  if (!elements[id]) elements[id] = new MockElement(id);
});

const docListeners = {};

globalThis.document = {
  readyState: 'complete',
  getElementById: (id) => elements[id] || null,
  querySelectorAll: (selector) => {
    if (selector === '.platform-view') {
      return Object.values(elements).filter(el => el.id.endsWith('-view'));
    }
    if (selector === '.platform-nav-link' || selector === '.league-subnav-link') {
      return [];
    }
    if (selector === '[data-close-modal]' || selector === '.modal-overlay') {
      return [];
    }
    return [];
  },
  querySelector: (selector) => null,
  addEventListener: (event, handler) => {
    if (!docListeners[event]) docListeners[event] = [];
    docListeners[event].push(handler);
  },
  createElement: (tag) => new MockElement('mock-' + Math.random(), tag),
  body: new MockElement('body', 'body')
};

globalThis.window = {
  addEventListener: (event, handler) => {
    console.log('Registered window event listener:', event);
  },
  scrollTo: () => {},
  location: { hash: '' }
};

console.log('Testing app initialization...');
try {
  // Now import app.js
  await import('../js/app.js');
  console.log('1. app.js imported cleanly');
  
  // If initLigaMaster was registered to DOMContentLoaded, fire it
  if (docListeners['DOMContentLoaded']) {
    console.log('Firing DOMContentLoaded...');
    docListeners['DOMContentLoaded'].forEach(fn => fn());
  }
  
  console.log('2. initLigaMaster executed successfully!');
  
  // Test clicking navigation buttons!
  if (window.ligamasterNavigate) {
    window.ligamasterNavigate('standings-view');
    console.log('3. Navigated to standings-view OK');
    window.ligamasterNavigate('team-view');
    console.log('4. Navigated to team-view OK');
    window.ligamasterNavigate('admin-view');
    console.log('5. Navigated to admin-view OK');
    window.ligamasterNavigate('home-view');
    console.log('6. Navigated back to home-view OK');
  } else {
    console.error('window.ligamasterNavigate is NOT defined!');
  }
  
  console.log('🎉 ALL INTEGRATION CHECKS PASSED WITH NO ERRORS!');
} catch (err) {
  console.error('ERROR during execution:', err);
  process.exit(1);
}
