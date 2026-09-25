import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import { content } from './src/content';
import { escapeHtml } from './src/html';
import { renderOpeningPhotograph, renderPhotographs } from './src/photography';
import { renderThemeSwitch } from './src/theme';

export default defineConfig({
  base: './',
  appType: 'mpa',
  plugins: [
    {
      name: 'photography-html',
      transformIndexHtml: {
        order: 'pre',
        handler(html, context) {
          if (!context.filename.replaceAll('\\', '/').endsWith('/photography/index.html')) return html;

          const values: Record<string, string> = {
            WORDMARK: escapeHtml(content.nickname.toLowerCase()),
            THEME_SWITCH: renderThemeSwitch(),
            PHOTOGRAPHS: renderPhotographs(),
            OPENING_PHOTOGRAPH: renderOpeningPhotograph(),
            YEAR: String(new Date().getFullYear()),
            NAME: escapeHtml(content.name),
            INSTAGRAM: escapeHtml(content.instagram),
          };

          return html.replace(/\{\{([A-Z_]+)\}\}/g, (placeholder, key: string) => values[key] ?? placeholder);
        },
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        home: fileURLToPath(new URL('./index.html', import.meta.url)),
        photography: fileURLToPath(new URL('./photography/index.html', import.meta.url)),
        // Client demo: served at /demos/flitecare/ but never linked from the portfolio.
        flitecareDemo: fileURLToPath(new URL('./demos/flitecare/index.html', import.meta.url)),
      },
    },
  },
  server: {
    fs: {
      // Retain Vite's default deny list while keeping implementation and demo showcase notes private.
      deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/implementation.md', '**/demo-showcase.md'],
    },
  },
});
