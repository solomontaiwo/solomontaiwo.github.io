// Run with Playwright available in NODE_PATH; no production dependency is required.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
  });
  const output = process.env.SCREENSHOT_DIR;
  if (output) fs.mkdirSync(output, { recursive: true });
  try {
    for (const width of [1440, 390, 320, 768]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, locale: 'it-IT', colorScheme: 'light' });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(process.env.SITE_URL || 'http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('html').getAttribute('lang'), 'it');
      assert.equal(await page.locator('.project-card:visible').count(), 3);
      assert.equal(await page.locator('.project-featured h3').textContent(), 'Seenary');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `Overflow at ${width}`);
      if (width < 641) {
        await page.locator('#menu-toggle').click();
        assert.equal(await page.locator('#main-navigation').isVisible(), true);
      }
      await page.getByRole('button', { name: 'Switch to English' }).click();
      await page.getByRole('heading', { name: 'Complex ideas. Clear software.' }).waitFor();
      await page.getByRole('button', { name: 'Toggle theme' }).click();
      assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
      await page.reload({ waitUntil: 'networkidle' });
      assert.equal(await page.locator('html').getAttribute('lang'), 'en');
      assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      if (width < 641) await page.locator('#menu-toggle').click();
      await page.getByRole('button', { name: 'Passa a italiano' }).click();
      await page.getByRole('button', { name: 'Cambia tema' }).click();
      if (width < 641) {
        await page.locator('#main-navigation a[href="#projects"]').click();
        assert.equal(await page.locator('#main-navigation').isVisible(), false);
      }
      await page.getByRole('button', { name: 'Altri progetti (3)' }).click();
      assert.equal(await page.locator('.project-card:visible').count(), 6);
      await page.getByRole('button', { name: 'Mostra meno' }).click();
      assert.equal(await page.locator('.project-card:visible').count(), 3);
      const broken = await page.locator('img:visible').evaluateAll(async images => {
        await Promise.all(images.map(img => img.decode().catch(() => {})));
        return images.filter(img => !img.naturalWidth).map(img => img.src);
      });
      assert.deepEqual(broken, []);
      assert.equal(await page.locator('#contact a').getAttribute('href'), 'mailto:taiwo.o.solomon@gmail.com');
      assert.deepEqual(errors, []);
      if (output && (width === 1440 || width === 390)) {
        await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo({ top: 0, behavior: 'instant' }); });
        await page.waitForFunction(() => window.scrollY === 0);
        await page.screenshot({ path: path.join(output, width === 1440 ? 'desktop.png' : 'mobile.png'), fullPage: true });
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        await page.waitForFunction(() => window.scrollY === 0);
        await page.screenshot({ path: path.join(output, width === 1440 ? 'desktop-fold.png' : 'mobile-fold.png') });
      }
      console.log(`PASS ${width}px: layout, images, project disclosure, menu, language/theme persistence, contact, runtime`);
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
