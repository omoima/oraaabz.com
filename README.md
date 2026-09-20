# Oraaabz

A single-page introduction for Oarabile Moima. Built with TypeScript, plain CSS and Vite. There is no backend, database or API key to maintain.

## Run locally

```bash
npm install
npm run dev
```

Open the local address printed by Vite. Run `npm run build` to check and build the site into `dist/`.

## Update the site

- Edit the words, email address and GitHub link in [`src/content.ts`](src/content.ts).
- Edit colours and layout in [`src/style.css`](src/style.css). The main Caribbean Blue colour is `#0081a7`.
- Push to `main` to publish through GitHub Pages once Pages is enabled with **GitHub Actions** as its source.

The site uses relative asset paths so it works at a GitHub Pages project URL and at a custom domain. The contact buttons open the visitor's email app or copy the address; no message is stored by the site.
