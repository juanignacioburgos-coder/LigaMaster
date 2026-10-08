const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  await page.goto(`file://${__dirname}/index.html`);
  
  // Create dummy sponsor
  await page.evaluate(() => {
     window.ligamasterAddSponsor('PUMA');
  });

  // Open modal
  await page.evaluate(() => {
     window.ligamasterOpenSocialCardModal({template: 'resultados', format: 'square'});
  });

  await page.waitForTimeout(1000);
  await browser.close();
})();
