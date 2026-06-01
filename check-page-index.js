import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    page.on('console', msg => {
      if (msg.type() === 'error' || msg.type() === 'warning') {
        console.log(`PAGE LOG [${msg.type()}]:`, msg.text());
      }
    });
    page.on('pageerror', err => {
      console.log('PAGE EXCEPTION:', err.toString());
    });
    console.log('Navigating to http://localhost:3000/ ...');
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
    console.log('Done capturing.');
    await browser.close();
  } catch (err) {
    console.error('Script Error:', err);
  }
})();
