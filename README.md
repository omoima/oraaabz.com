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

## Use oraaabz.com

Set `oraaabz.com` as the custom domain in the repository's **Settings → Pages** after enabling GitHub Actions as the publishing source. In the domain's DNS zone, point the apex (`@`) to GitHub Pages with these A records:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

For `www.oraaabz.com`, a CNAME to `omoima.github.io` lets GitHub redirect it to the apex domain. Keep unrelated DNS records as they are. [GitHub's custom-domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) has the current requirements.
