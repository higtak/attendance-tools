console.log('ハジマタ');

const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    defaultViewport: {
      width: 1280,
      height: 800
    }
  });
  const page = await browser.newPage();
  await page.goto('https://www.google.com');
  await page.screenshot({path: 'example.png'});

  await page.waitFor(3000);

  await browser.close();
})();
