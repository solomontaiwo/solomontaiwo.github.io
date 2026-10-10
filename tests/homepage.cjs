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
    for (const width of [1440, 768, 390, 320]) {
      const mobile = width < 720;
      const page = await browser.newPage({ viewport: { width, height: 1000 }, locale: 'it-IT', colorScheme: 'light' });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(process.env.SITE_URL || 'http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('html').getAttribute('lang'), 'it');
      assert.equal(await page.locator('.project').count(), mobile ? 3 : 6);
      if (!mobile) assert.equal(await page.locator('.project-featured h3').textContent(), 'Seenary — Apri progetto');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `Overflow at ${width}`);
      assert.equal(await page.locator('a[href$=".pdf"]').count(), 0, 'No CV download');

      assert.equal(await page.locator('.hero a, .hero button').count(), mobile ? 0 : 1, 'Hero has no redundant buttons (desktop: only the featured project link)');
      assert.equal(await page.locator('.header-cta').count(), mobile ? 0 : 1);
      assert.equal(await page.locator('.tab-bar a').count(), 4, 'Tab bar has no Home');
      assert.equal(await page.locator('.more-projects').count(), mobile ? 1 : 0, 'See more only on mobile (3 visible of 6)');
      assert.equal(await page.locator('.filters').count(), 0, 'No filters');
      assert.equal(await page.locator('.availability, .facts').count(), 0);

      // Portrait in the header expands to the full photo and closes again.
      await page.locator('.avatar-button').click();
      await page.locator('.photo-large').waitFor();
      await page.waitForTimeout(800);
      assert.equal((await page.locator('.photo-large').boundingBox()).width > 250, true);
      assert.equal(await page.locator('.photo-overlay').getAttribute('role'), 'dialog');
      if (output && width === 390) await page.screenshot({ path: path.join(output, 'mobile-photo.png') });
      await page.keyboard.press('Escape');
      await page.locator('.photo-overlay').waitFor({ state: 'detached' });
      assert.equal(await page.locator('.avatar-button img').isVisible(), true);

      // Navigation: tab bar on mobile, header links from 720px.
      assert.equal(await page.locator('.tab-bar').isVisible(), mobile);
      assert.equal(await page.locator('.desktop-nav').isVisible(), !mobile);

      if (mobile) {
        await page.locator('.tab-bar a[href="#projects"]').click();
        await page.waitForFunction(() => document.querySelector('.tab-bar a[href="#projects"]').hasAttribute('aria-current'));
        assert.equal(await page.locator('.project:visible').count(), 3, 'Three projects visible on mobile');
        await page.getByRole('button', { name: 'Vedi altro (3)' }).click();
        assert.equal(await page.locator('.project:visible').count(), 6);
        await page.getByRole('button', { name: 'Mostra meno' }).click();
        assert.equal(await page.locator('.project:visible').count(), 3);
        const toggle = page.getByRole('button', { name: 'Data & AI' });
        await toggle.click();
        assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
      } else {
        assert.equal(await page.locator('.project:visible').count(), 6);
        assert.equal(await page.locator('.skill-group h3:visible').count(), 3);
        assert.equal(await page.locator('.desktop-nav a').count(), 2, 'Desktop nav: Projects + Profile only');
        await page.locator('.desktop-nav a[href="#about"]').click();
        await page.waitForFunction(() => document.querySelector('.desktop-nav a[href="#about"]').hasAttribute('aria-current'));
        assert.equal(await page.locator('.desktop-nav a[aria-current]').count(), 1);
        await page.locator('.header-cta').click();
        await page.waitForTimeout(900);
        assert.equal(await page.locator('#contact').evaluate(el => el.getBoundingClientRect().top < innerHeight), true, 'CTA scrolls to contact');
      }

      // Details open in a sheet (mobile) / dialog (desktop); the site link lives inside it.
      const opener = page.locator('.project-open').first();
      await opener.scrollIntoViewIfNeeded();
      await opener.click();
      const dialog = page.getByRole('dialog');
      await dialog.waitFor();
      await page.waitForTimeout(500);
      const firstTitle = await dialog.locator('h2').textContent();
      assert.equal(await dialog.locator('a.dialog-cta').getAttribute('href') !== null, true);
      assert.equal(await dialog.locator('a.dialog-cta').getAttribute('target'), '_blank');
      assert.equal(await dialog.locator('.dialog-nav').isVisible(), !mobile);
      assert.equal(await dialog.locator('.dialog-desc').isVisible(), true);
      if (!mobile) {
        await dialog.getByRole('button', { name: 'Progetto successivo' }).click();
        assert.notEqual(await dialog.locator('h2').textContent(), firstTitle);
      }
      const box = await dialog.boundingBox();
      assert.equal(box.x >= 0 && box.x + box.width <= width + 1, true, 'Dialog fits the viewport');
      if (output && (width === 1440 || width === 390)) await page.screenshot({ path: path.join(output, width === 1440 ? 'desktop-dialog.png' : 'mobile-sheet.png') });
      await page.keyboard.press('Escape');
      await dialog.waitFor({ state: 'detached' });
      assert.equal(await page.evaluate(() => document.activeElement && document.activeElement.classList.contains('project-open')), true, 'Focus returns to the card');
      if (mobile) {
        await opener.click();
        await dialog.waitFor();
        await page.waitForTimeout(500);
        const handle = await dialog.locator('.sheet-handle').boundingBox();
        await page.mouse.move(handle.x + handle.width / 2, handle.y + handle.height / 2);
        await page.mouse.down();
        await page.mouse.move(handle.x + handle.width / 2, handle.y + 200, { steps: 6 });
        await page.mouse.up();
        await dialog.waitFor({ state: 'detached' });
      }

      await page.getByRole('button', { name: 'Switch to English' }).click();
      await page.getByRole('heading', { name: 'Complex ideas. Clear software.' }).waitFor();
      await page.getByRole('button', { name: 'Toggle theme' }).click();
      assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
      await page.reload({ waitUntil: 'networkidle' });
      assert.equal(await page.locator('html').getAttribute('lang'), 'en');
      assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      await page.getByRole('button', { name: 'Passa a italiano' }).click();
      await page.getByRole('button', { name: 'Cambia tema' }).click();
      assert.equal(await page.locator('html').getAttribute('data-theme'), 'light');

      await page.locator('.project img').first().scrollIntoViewIfNeeded();
      const broken = await page.locator('img:visible').evaluateAll(async images => {
        await Promise.all(images.map(img => img.decode().catch(() => {})));
        return images.filter(img => !img.naturalWidth).map(img => img.src);
      });
      assert.deepEqual(broken, []);
      assert.equal(await page.locator('#contact a.primary-button').getAttribute('href'), 'mailto:taiwo.o.solomon@gmail.com');
      assert.deepEqual(errors, []);
      if (output && (width === 1440 || width === 390)) {
        await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo({ top: 0, behavior: 'instant' }); });
        await page.waitForFunction(() => window.scrollY === 0);
        await page.screenshot({ path: path.join(output, width === 1440 ? 'desktop-fold.png' : 'mobile-fold.png') });
      }
      console.log(`PASS ${width}px: layout, navigation, projects, skills, language/theme persistence, contact, no CV link, runtime`);
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
