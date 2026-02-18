// server/src/services/themeService.ts
import { ThemeConfig, FontFamily } from '@shared/types';

const FONT_STACKS: Record<FontFamily, string> = {
  sans: "'Inter', 'Helvetica Neue', Arial, sans-serif",
  serif: "Georgia, 'Times New Roman', serif",
  mono: "'Fira Code', 'Courier New', monospace",
};

// Base reset + shared rules applied to ALL themes
const BASE_CSS = (theme: ThemeConfig) => `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fira+Code&display=swap');

  :root {
    --accent: ${theme.accentColor};
    --font-body: ${FONT_STACKS[theme.fontFamily]};
    --font-code: 'Fira Code', 'Courier New', monospace;
    --font-size-base: ${theme.fontSize}px;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: var(--font-body);
    font-size: var(--font-size-base);
    line-height: 1.7;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  article.markdown-body { max-width: 100%; }

  /* Page break utilities */
  .page-break { page-break-after: always; }
  h1, h2, h3 { page-break-after: avoid; }
  pre, table, figure { page-break-inside: avoid; }

  /* Syntax highlighting base */
  pre code.hljs { display: block; overflow-x: auto; padding: 1em; border-radius: 6px; }
  code.hljs { padding: 0.2em 0.4em; border-radius: 3px; }
`;

// ─── THEMES ──────────────────────────────────────────────────────────────────

const GITHUB_CSS = `
  body { color: #1f2328; background: #ffffff; }
  h1, h2, h3, h4, h5, h6 {
    color: #1f2328; font-weight: 600; margin: 1.5em 0 0.5em;
    line-height: 1.25;
  }
  h1 { font-size: 2em; border-bottom: 1px solid #d0d7de; padding-bottom: 0.3em; }
  h2 { font-size: 1.5em; border-bottom: 1px solid #d0d7de; padding-bottom: 0.3em; }
  h3 { font-size: 1.25em; }
  p { margin: 0.8em 0; }
  a { color: var(--accent); text-decoration: none; }
  a:hover { text-decoration: underline; }
  code { background: #f6f8fa; padding: 0.2em 0.4em; border-radius: 6px; font-size: 0.9em; font-family: var(--font-code); }
  pre { background: #f6f8fa; padding: 1.2em; border-radius: 6px; margin: 1em 0; overflow-x: auto; }
  pre code { background: none; padding: 0; }
  blockquote { border-left: 4px solid var(--accent); padding: 0.5em 1em; color: #57606a; margin: 1em 0; background: #f6f8fa; }
  table { border-collapse: collapse; width: 100%; margin: 1em 0; }
  th, td { border: 1px solid #d0d7de; padding: 0.6em 1em; text-align: left; }
  th { background: #f6f8fa; font-weight: 600; }
  tr:nth-child(even) { background: #f6f8fa; }
  hr { border: none; border-top: 1px solid #d0d7de; margin: 1.5em 0; }
  ul, ol { padding-left: 2em; margin: 0.8em 0; }
  li { margin: 0.3em 0; }
  img { max-width: 100%; height: auto; border-radius: 6px; }
`;

const ACADEMIC_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;1,400&display=swap');
  body { color: #1a1a1a; background: #fffef8; font-family: 'EB Garamond', Georgia, serif; font-size: 1.1em; }
  h1, h2, h3, h4, h5, h6 { font-family: 'EB Garamond', Georgia, serif; color: #1a1a1a; font-weight: 600; margin: 1.8em 0 0.6em; }
  h1 { font-size: 1.8em; text-align: center; margin-bottom: 1.5em; }
  h2 { font-size: 1.3em; font-variant: small-caps; letter-spacing: 0.05em; border-bottom: 1px solid #ccc; padding-bottom: 0.2em; }
  p { margin: 0.8em 0; text-align: justify; hyphens: auto; }
  a { color: var(--accent); }
  code { font-family: var(--font-code); background: #f0efe8; padding: 0.15em 0.35em; border-radius: 3px; font-size: 0.85em; }
  pre { background: #f0efe8; padding: 1.2em; border-radius: 4px; margin: 1.2em 0; border-left: 3px solid var(--accent); }
  pre code { background: none; }
  blockquote { font-style: italic; border-left: 3px solid var(--accent); padding-left: 1.2em; color: #444; margin: 1.2em 2em; }
  table { border-collapse: collapse; width: 100%; margin: 1.2em 0; font-size: 0.95em; }
  th, td { border: 1px solid #aaa; padding: 0.5em 0.8em; }
  th { background: #e8e7e0; font-variant: small-caps; }
  ul, ol { padding-left: 2em; margin: 0.8em 0; }
`;

const MINIMAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Mono&display=swap');
  body { color: #111; background: #fff; font-family: 'DM Sans', sans-serif; font-weight: 300; }
  h1, h2, h3, h4, h5, h6 { font-weight: 500; color: #000; margin: 2em 0 0.5em; letter-spacing: -0.02em; }
  h1 { font-size: 2.2em; }
  h2 { font-size: 1.4em; }
  p { margin: 1em 0; color: #333; }
  a { color: var(--accent); text-decoration: none; border-bottom: 1px solid var(--accent); }
  code { font-family: 'DM Mono', monospace; font-size: 0.88em; background: #f5f5f5; padding: 0.15em 0.35em; border-radius: 3px; }
  pre { background: #f5f5f5; padding: 1.5em; border-radius: 4px; margin: 1.5em 0; }
  pre code { background: none; }
  blockquote { border-left: 2px solid var(--accent); margin: 1.5em 0; padding-left: 1.5em; color: #666; }
  table { width: 100%; border-collapse: collapse; margin: 1.5em 0; }
  th, td { border-bottom: 1px solid #e5e5e5; padding: 0.75em 0; text-align: left; }
  th { font-weight: 500; color: #000; }
  hr { border: none; border-top: 1px solid #e5e5e5; margin: 2em 0; }
  ul, ol { padding-left: 1.5em; margin: 1em 0; }
`;

const DARK_CSS = `
  body { color: #cdd6f4; background: #1e1e2e; }
  h1, h2, h3, h4, h5, h6 { color: #cba6f7; margin: 1.5em 0 0.5em; font-weight: 600; }
  h1 { font-size: 2em; border-bottom: 1px solid #45475a; padding-bottom: 0.3em; }
  h2 { font-size: 1.5em; border-bottom: 1px solid #45475a; padding-bottom: 0.3em; }
  p { margin: 0.8em 0; }
  a { color: var(--accent); }
  code { background: #313244; color: #cdd6f4; padding: 0.2em 0.4em; border-radius: 6px; font-size: 0.9em; font-family: var(--font-code); }
  pre { background: #181825; padding: 1.2em; border-radius: 8px; margin: 1em 0; border: 1px solid #45475a; }
  pre code { background: none; padding: 0; }
  blockquote { border-left: 4px solid #cba6f7; padding: 0.5em 1em; color: #a6adc8; margin: 1em 0; background: #181825; }
  table { border-collapse: collapse; width: 100%; margin: 1em 0; }
  th, td { border: 1px solid #45475a; padding: 0.6em 1em; }
  th { background: #313244; color: #cba6f7; font-weight: 600; }
  tr:nth-child(even) { background: #181825; }
  hr { border: none; border-top: 1px solid #45475a; margin: 1.5em 0; }
  ul, ol { padding-left: 2em; margin: 0.8em 0; }
  img { max-width: 100%; border-radius: 6px; }
`;

const THEMES = {
  github: GITHUB_CSS,
  academic: ACADEMIC_CSS,
  minimal: MINIMAL_CSS,
  dark: DARK_CSS,
};

export function getThemeCSS(theme: ThemeConfig): string {
  const themeStyles = THEMES[theme.selectedTheme] ?? THEMES.github;
  return `${BASE_CSS(theme)}\n${themeStyles}`;
}