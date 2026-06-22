import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('pageerror', error => console.log('PAGE ERROR STACK:', error.stack));
  await page.goto('http://localhost:4173/');
  await new Promise(r => setTimeout(r, 2000));
  await browser.close();
})();
