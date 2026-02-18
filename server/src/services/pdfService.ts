// server/src/services/pdfService.ts
import puppeteer, { Browser } from 'puppeteer';
import { ThemeConfig } from '@shared/types';
import { markdownToHTML } from './markdownService';
import { getThemeCSS } from './themeService';

// Singleton browser instance — avoids cold start on every request
let browserInstance: Browser | null = null;

async function getBrowser(): Promise<Browser> {
  if (!browserInstance || !browserInstance.connected) {
    browserInstance = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  }
  return browserInstance;
}

export async function generatePDF(
  markdown: string,
  theme: ThemeConfig
): Promise<Buffer> {
  const browser = await getBrowser();
  const page = await browser.newPage();

  const bodyHTML = markdownToHTML(markdown);
  const themeCSS = getThemeCSS(theme);

  const fullHTML = buildFullHTML(bodyHTML, themeCSS, theme);

  await page.setContent(fullHTML, { waitUntil: 'networkidle0' });

  const pdf = await page.pdf({
    format: theme.pageSize,
    printBackground: true,
    margin: theme.margins,
  });

  await page.close();
  return Buffer.from(pdf);
}

function buildFullHTML(
  body: string,
  themeCSS: string,
  theme: ThemeConfig
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <style>
    ${themeCSS}
    ${theme.customCSS}
  </style>
</head>
<body>
  <article class="markdown-body">
    ${body}
  </article>
</body>
</html>`;
}