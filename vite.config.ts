import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        home: fileURLToPath(new URL('./index.html', import.meta.url)),
        // Client demo: served at /demos/flitecare/ but never linked from the portfolio.
        flitecareDemo: fileURLToPath(new URL('./demos/flitecare/index.html', import.meta.url)),
      },
    },
  },
  server: {
    fs: {
      // Retain Vite's default deny list while keeping the demo showcase notes out of the dev server.
      deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/demo-showcase.md'],
    },
  },
});
