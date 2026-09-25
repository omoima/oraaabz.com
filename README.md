# Oraaabz

A personal introduction and photography portfolio for Oarabile Moima. Built with TypeScript, plain CSS and Vite. There is no backend, database or API key to maintain.

## Run locally

```bash
npm install
npm run dev
```

Open the local address printed by Vite. Run `npm run build` to check TypeScript and build the static site into `dist/`. Run `npm run preview` to inspect that output locally.

The homepage is at `/` and the photography page is at `/photography/`. Serve `dist/` with a static host that serves each route's `index.html` file.

## Update the site

- Edit the words, email address and GitHub link in [`src/content.ts`](src/content.ts).
- Edit colours and layout in [`src/style.css`](src/style.css). The main Caribbean Blue colour is `#0081a7`.
- Run `npm run build` to validate changes and generate the static output.

The contact buttons open the visitor's email app or copy the address; no message is stored by the site.

## GitHub workflow

The workflow remains in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) under the name **Build site**. A push to `main` or a manual run installs dependencies, checks TypeScript, builds the site, adds the Ntando page from its required repository secret, and uploads a regular `site-dist` build artifact.

**The workflow does not deploy.** It has no GitHub Pages deployment job or deployment permissions. Production uses GitHub Pages at `https://oraaabz.com/`. The separate [Publish site workflow](.github/workflows/publish.yml) publishes only when manually dispatched; ordinary pushes only build. To publish an approved release, run `gh workflow run publish.yml --repo omoima/oraaabz.com --ref main`. It builds the site, restores the Ntando page from its existing secret, checks that repository notes are absent, and deploys `dist/` to GitHub Pages.

Implementation notes in `implementation.md` are tracked in the repository and excluded from the static build. Keep them at the repository root, outside `public/`.

## Client demos

Concept sites for prospective clients are built with the portfolio but not linked from it, and each one is marked `noindex`. The Flitecare demo lives in [`demos/flitecare/index.html`](demos/flitecare/index.html) and [`src/demos/flitecare/`](src/demos/flitecare/) and is served at `/demos/flitecare/`. Preview it with `npm run dev`.

Pitch notes are in `demo-showcase.md` at the repository root. That file is tracked in Git but never built into the site. The repository is public, so keep the notes client-safe. The **Demo flow** workflow ([`.github/workflows/demo.yml`](.github/workflows/demo.yml)) builds the site, checks that the demo exists and the notes stay out of `dist/`, and uploads a `flitecare-demo` artifact.

## Update the Ntando page

The self-contained page at `public/ntando/index.html` is ignored by Git. Its contents are stored as the `NTANDO_HTML` repository secret and added to the CI build artifact. The workflow requires this secret. The main portfolio does not link to the page; if the build is deployed separately, anyone with the `/ntando/` URL can view it.

Edit the local file and preview it at `/ntando/index.html` with `npm run dev`. The existing `npm run publish:ntando` command uses the GitHub CLI to update the secret and queue **Build site**; despite its legacy name, it does not deploy. The local file must be between 1 byte and 48 KB to fit in a GitHub Actions secret. If you clone the repo on another computer, bring your local copy of the Ntando page with you; GitHub cannot show you the secret's contents later.
