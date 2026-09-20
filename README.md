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
- Push to `main` to publish through GitHub Pages.

The site uses relative asset paths so it loads at `oraaabz.com`. The contact buttons open the visitor's email app or copy the address; no message is stored by the site.

## Use oraaabz.com

This repository's **Settings → Pages** has `oraaabz.com` as its custom domain. The existing `omoima.github.io` site has its own repository and stays separate. In Route 53, create one A record with a blank record name (the root domain), Alias off, and these four values:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

No `www` record is needed for `oraaabz.com` itself. Keep unrelated DNS records as they are. GitHub can take time to issue the HTTPS certificate after DNS starts resolving; then enable **Enforce HTTPS** in **Settings → Pages**. [GitHub's custom-domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) has the current requirements.

## Update the Ntando page

The self-contained page at `public/ntando/index.html` is ignored by Git. Its contents are stored as the `NTANDO_HTML` repository secret and added to the published site by the deployment workflow. The main portfolio does not link to it, but anyone with the `/ntando/` URL can view it.

Edit the local file, preview it at `/ntando/index.html` with `npm run dev`, then run `npm run publish:ntando` to update the secret and publish the site. The local file must be under 48 KB to fit in a GitHub Actions secret. If you clone the repo on another computer, bring your local copy of the Ntando page with you; GitHub cannot show you the secret's contents later.
