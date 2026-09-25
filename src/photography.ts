import { escapeHtml } from './html';

type PhotographPath = `/photography/images/${string}`;

export interface PhotographSource {
  src: PhotographPath;
  width: number;
}

export interface Photograph {
  src: PhotographPath;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  place?: string;
  year?: number;
  sources?: readonly PhotographSource[];
}

const photograph = (slug: string, alt: string, caption: string, year: number): Photograph => ({
  src: `/photography/images/${slug}-960.webp`,
  width: 960,
  height: 1280,
  alt,
  caption,
  year,
  sources: [480, 960, 1440].map((width) => ({ src: `/photography/images/${slug}-${width}.webp`, width })),
});

/** Selected from @oraaabz with permission. Source posts and publication years are recorded in implementation.md. */
export const photographs: readonly Photograph[] = [
  photograph('franschoek', 'A man in a white shirt, blue jeans and green shoes holds a camera in front of a white Mont Rochelle wall under a deep blue sky.', 'Franschoek', 2026),
  photograph('harbour', 'Two people on red jet skis in bright turquoise water, with sailboat masts and a green mountainside behind them.', 'Summer on the water', 2025),
  photograph('garden', 'White loungers on a green lawn, with stepping stones leading toward trees and a pointed mountain beneath a clear blue sky.', 'A quieter afternoon', 2026),
  photograph('glasshouse-portrait', 'A woman in a white dress stands beneath a glass-and-steel roof, framed by open wooden doors and reflections of blue sky.', 'Light and lines', 2026),
  photograph('instant-memories', 'A pale blue instant camera surrounded by small white-bordered photographs on a wooden table.', 'Keeping the little things', 2025),
];

const renderPhotograph = (photograph: Photograph, index: number): string => {
  const opening = index === 0;
  const location = [photograph.place, photograph.year].filter(Boolean).join(' · ');
  const caption = [photograph.caption, location]
    .filter((part): part is string => Boolean(part))
    .map(escapeHtml)
    .join(' — ');
  const sourceSet = photograph.sources?.length
    ? ` srcset="${photograph.sources.map(({ src, width }) => `${escapeHtml(src)} ${width}w`).join(', ')}" sizes="(min-width: 1376px) 624px, (min-width: 761px) calc((100vw - 128px) / 2), calc(100vw - 40px)"`
    : '';

  return `
    <figure class="photograph${opening ? ' photograph--opening' : ''}">
      <img src="${escapeHtml(photograph.src)}"${sourceSet} width="${photograph.width}" height="${photograph.height}" alt="${escapeHtml(photograph.alt)}" loading="${opening ? 'eager' : 'lazy'}"${opening ? ' fetchpriority="high"' : ''} decoding="async" />
      ${caption ? `<figcaption>${caption}</figcaption>` : ''}
    </figure>`;
};

export const renderOpeningPhotograph = (): string => photographs.length ? renderPhotograph(photographs[0], 0) : '';

export const renderPhotographs = (): string => {
  if (photographs.length === 0) {
    return `
      <section class="collection-note" aria-labelledby="collection-note-title">
        <span class="collection-note-rule" aria-hidden="true"></span>
        <h2 id="collection-note-title">A collection in the making.</h2>
        <p>I’m putting together a selection of my photographs. In the meantime, you can find me on Instagram.</p>
      </section>`;
  }

  return `
    <section class="photo-collection" aria-label="Selected photographs">
      ${photographs.length > 1 ? `<div class="photo-grid">${photographs.slice(1).map((photograph, index) => renderPhotograph(photograph, index + 1)).join('')}</div>` : ''}
    </section>`;
};
