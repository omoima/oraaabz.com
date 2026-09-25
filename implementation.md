# Photography implementation notes

Updated 25 September 2026.

This file belongs in Git for maintainers. It is **not website content**: do not move it into `public/`, import it into an entry point, or publish the repository root. The deployed document root must be `dist/`. The same rule applies to `demo-showcase.md`.

## Scope and repository baseline

- Implement the approved dedicated `/photography/` page and a descriptive homepage link.
- Preserve the existing personal identity, homepage, contact actions and sunrise/sunset control.
- User authorized selecting images from `https://www.instagram.com/oraaabz/`.
- Preserve the Flitecare demo added by the latest `main` merge. A fresh `git fetch origin main` confirmed HEAD and origin/main both at `26c3092` with zero commits ahead/behind on 25 September. No extra rebase was necessary; uncommitted work was retained.
- Fix the photography caption TypeScript error using a type predicate to narrow optional strings before `escapeHtml`.
- Retain `.github/workflows/deploy.yml`, but make it build-only as instructed. No deployment or remote workflow dispatch is part of this work.

## Information architecture and layout

- `/` remains the personal introduction. A short photography sentence and native `View photography` anchor appear in the main narrative before contact actions; no gallery assets are imported on the homepage.
- `/photography/` is an independent static HTML entry with a distinct title, canonical URL, description and Open Graph text.
- The compact gallery header has a linked wordmark, explicit Home link and shared theme controls. It does not repeat the homepage's large decorative panel.
- The five selected images are portrait-oriented. On desktop, the introductory text sits alongside the opening photograph; a two-column grid follows. On screens at or below 760 CSS pixels, the intro and photographs form one reading sequence. This avoids forcing portrait photographs into landscape crops.
- Photographs retain their original 3:4 composition. Neutral warm light and charcoal dark backgrounds frame the work; there are no decorative filters or color overlays on the photographs.
- Captions are short editorial titles with the source post's publication year. They are not assertions of an independently verified capture date. Place names are omitted because a carousel's location tag need not identify every frame.
- Instagram remains an ordinary footer link. Work, Notes, filters, a lightbox, a carousel and infinite scrolling are deliberately deferred.

## Selected photographs and provenance

The user explicitly requested this account as the source. Images were visually inspected in public Instagram post carousels and downloaded at their available image resolution. No stock images, generated photographs, video frames or public-grid thumbnails are used. Instagram highlights required sign-in and were not used. The selection presents personal moments from the account without asserting independent authorship for each frame.

| Website asset stem | Source post / carousel item | Downloaded dimensions | Caption / publication year |
| --- | --- | --- | --- |
| `harbour` | [Cape Town collection, item 6](https://www.instagram.com/oraaabz/p/DSnPjRcjFgC/?img_index=6) | 1440 × 1920 | Summer on the water / 2025 |
| `garden` | [August collection, item 7](https://www.instagram.com/oraaabz/p/Dct9ztBjQCF/?img_index=7) | 3072 × 4096 | A quieter afternoon / 2026 |
| `glasshouse-portrait` | [August collection, item 6](https://www.instagram.com/oraaabz/p/Dct9ztBjQCF/?img_index=6) | 3072 × 4096 | Light and lines / 2026 |
| `franschoek` | [August collection, item 1](https://www.instagram.com/oraaabz/p/Dct9ztBjQCF/) | 3072 × 4096 | Franschoek / 2026 |
| `instant-memories` | [Cape Town collection, item 7](https://www.instagram.com/oraaabz/p/DSnPjRcjFgC/?img_index=7) | 1440 × 1920 | Keeping the little things / 2025 |

Public image derivatives live in `public/photography/images/`. Raw downloaded files and temporary processing scripts are outside the repository. Temporary signed Instagram CDN URLs are not stored in the source or delivered to visitors.

On 25 September, the user replaced “In the garden” with the first image of the August collection and explicitly requested the caption “Franschoek”; that spelling is preserved. The replaced image's three public derivatives were removed. At the user's request, Franschoek is also the opening photograph on the page; the remaining photographs retain their relative order.

## Image preparation and loading

- Each image has 480, 960 and 1440 pixel-wide WebP variants at quality 84. Processing used Pillow: EXIF orientation was applied, embedded color profiles converted to sRGB when present, and images resized proportionately with Lanczos. No image was upscaled. Metadata was not carried into the WebP output.
- The browser selects a candidate via `srcset` and layout-matched `sizes`; the normal `src` is the 960px variant.
- Explicit 960 × 1280 dimensions reserve the correct ratio before loading.
- The opening image uses eager loading and high fetch priority. Subsequent photographs use native lazy loading. There is no runtime connection to Instagram and no Instagram embed/tracking script.
- Rendering happens through Vite's HTML transform during development and build. All five real `<img>` elements and their descriptions exist in built HTML even when JavaScript is unavailable.
- The image renderer and ordered typed manifest are in `src/photography.ts`. Edit the ordered array to change the selection; the first entry becomes the opening image. The helper currently models 3:4 images; for another aspect ratio, provide a full `Photograph` record with matching intrinsic dimensions and variants.

## Shared theme and accessibility

- `src/theme.ts` owns the shared control markup and interaction. It reuses the `oraaabz-theme` storage key and the existing `sunrise` / `sunset` values.
- Each HTML entry chooses the saved theme before the first paint, with system preference as the fallback. An explicit choice wins over subsequent system changes. Storage errors do not prevent controls from working on the current page.
- Back/Forward restoration reconciles the saved preference so a cached page does not restore an obsolete theme.
- Theme buttons have descriptive stable accessible labels, pressed state and 44px minimum height. New links use native anchors, visible keyboard focus, and ordinary navigation behavior.
- The gallery has one H1, semantic figures/captions, scene-specific alternative text, and a keyboard-visible skip link. Essential information is not hover-only.
- A 320px layout, both themes, keyboard navigation and direct route loads are part of verification. The caption and interface colors are selected for readable contrast; photographs themselves are not contrast-adjusted.
- The gallery is useful without JavaScript. Theme switching itself requires JavaScript; the homepage already depended on JavaScript before this change.

## Build, notes exclusion and workflows

- Vite's multi-page build includes **all three** entries: home, photography, and `demos/flitecare/index.html`. `appType: 'mpa'` prevents missing document paths from silently falling back to the homepage in Vite development/preview.
- Vite's filesystem deny list keeps its existing sensitive-file rules and explicitly denies `implementation.md` and `demo-showcase.md` during development.
- Both notes files remain in Git at the repository root and are absent from `public/` and `dist/`. This excludes them from the website, not from the public Git repository.
- `npm run build` runs TypeScript checking, Vite, and `scripts/check-build.mjs`. The final check requires all three route documents and rejects either notes filename anywhere in the output directory.
- `.github/workflows/deploy.yml` is retained as **Build site**, with push/manual triggers, read-only repository permission, no Pages deployment job, and a regular `site-dist` artifact. Its existing required `NTANDO_HTML` secret injection is preserved. No deployment permission or OIDC permission is present.
- The existing `publish:ntando` helper still updates its secret and triggers this workflow when explicitly run; its message and README now correctly describe a build rather than deployment. It was not invoked for this task.
- The independently merged **Demo flow** workflow and Flitecare files remain intact.
- On 25 September the user authorized going live. GitHub's Pages configuration confirms workflow-based hosting at `https://oraaabz.com/`. A separate `.github/workflows/publish.yml` provides manual-only publishing; the existing Build site workflow remains non-deploying. Publishing builds and checks `dist/`, restores the Ntando page from its existing secret, repeats the notes-exclusion check, and deploys only the Pages artifact. DNS remains unchanged.

## Research behind the decisions

- [NN/g homepage principles](https://www.nngroup.com/articles/homepage-design-principles/): clear purpose, visible navigation, concise content.
- [NN/g transition and destination pages](https://www.nngroup.com/videos/destination-pages-vs-transition-pages/): homepage introduction leading to a focused gallery.
- [WAI native link pattern](https://www.w3.org/WAI/ARIA/apg/patterns/link/): navigation uses links.
- [WCAG non-text content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html): descriptive identification for photographs, distinct from short captions.
- [web.dev responsive images](https://web.dev/learn/design/responsive-images) and [LCP guidance](https://web.dev/articles/optimize-lcp): responsive candidates, reserved dimensions and prompt opening-image loading.

These support the implementation choices; they do not establish a universal ideal photo count or guarantee better rankings. Performance thresholds are goals, not measured field results.

## Verification

- `npm run build` passed TypeScript, the three-page Vite build and the repository-notes exclusion check.
- The exclusion check was deliberately tested with a temporary `dist/implementation.md`: it rejected the output. The temporary file was removed immediately afterward.
- Production preview returned 200 for `/`, `/photography/`, `/photography/index.html`, `/demos/flitecare/` and a gallery image. `/implementation.md` and `/demo-showcase.md` both returned 404. Development returned 403 for both notes files.
- Parsed built HTML contains all five images with nonempty descriptions, dimensions, correct eager/lazy priorities and all 15 responsive assets present. No unresolved template markers remain.
- Flitecare remains built with `noindex` and is not linked from the homepage. Its source files and Demo flow workflow were preserved.
- Browser checks passed at desktop and 320px viewport widths. At 320px with a visible scrollbar, both document client width and scroll width were 305px: no horizontal overflow. The previous global 320px body minimum was removed to allow this.
- All five photographs loaded; the mobile browser selected 480px variants. The first image is eager and the remaining four use native lazy loading. After the requested Franschoek replacement, derivatives total 2,996,112 bytes across all 15 files; visitors load the selected size per image, not every variant.
- Sunrise and sunset were checked visually. A sunset selection persisted from gallery to Home; changing to sunrise on Home and using browser Back restored the gallery with sunrise and the matching pressed state. Reload also retained the choice.
- Keyboard Tab revealed the skip link with a solid focus outline; Enter moved focus to the main photography content.
- `node --check` passed for both maintenance scripts; `git diff --check` passed.
- No measured field Core Web Vitals or formal screen-reader audit is claimed. No code was committed, pushed or deployed as part of these checks.
