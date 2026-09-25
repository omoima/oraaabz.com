type Theme = 'sunrise' | 'sunset';

const themeStorageKey = 'oraaabz-theme';
const currentTheme = (): Theme =>
  typeof document !== 'undefined' && document.documentElement.dataset.theme === 'sunset'
    ? 'sunset'
    : 'sunrise';

export const renderThemeSwitch = (): string => {
  const theme = currentTheme();

  return `
    <div class="theme-switch" role="group" aria-label="Colour mode">
      <button class="theme-option" type="button" data-theme-value="sunrise" aria-label="Use sunrise light mode" aria-pressed="${theme === 'sunrise'}">
        <span aria-hidden="true">☀︎</span><span>Sunrise</span>
      </button>
      <button class="theme-option" type="button" data-theme-value="sunset" aria-label="Use sunset dark mode" aria-pressed="${theme === 'sunset'}">
        <span aria-hidden="true">☾</span><span>Sunset</span>
      </button>
    </div>
  `;
};

/** Run after rendering the controls; the head script chooses the initial theme. */
export const initTheme = (): void => {
  const themeButtons = document.querySelectorAll<HTMLButtonElement>('[data-theme-value]');
  const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  let hasExplicitPreference = false;

  try {
    const savedTheme = window.localStorage.getItem(themeStorageKey);
    hasExplicitPreference = savedTheme === 'sunrise' || savedTheme === 'sunset';
  } catch {
    // System preference remains available when storage is blocked.
  }

  const applyTheme = (theme: Theme): void => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme === 'sunset' ? 'dark' : 'light';
    themeColor?.setAttribute('content', theme === 'sunset' ? '#171021' : '#fffaf3');

    themeButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.themeValue === theme));
    });
  };

  applyTheme(currentTheme());

  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const theme = button.dataset.themeValue;
      if (theme !== 'sunrise' && theme !== 'sunset') return;

      hasExplicitPreference = true;
      applyTheme(theme);

      try {
        window.localStorage.setItem(themeStorageKey, theme);
      } catch {
        // A manual selection still applies on this page without storage.
      }
    });
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    if (!hasExplicitPreference) applyTheme(event.matches ? 'sunset' : 'sunrise');
  });

  // A page restored by Back/Forward may predate a choice made on the other page.
  window.addEventListener('pageshow', (event) => {
    if (!event.persisted) return;
    try {
      const savedTheme = window.localStorage.getItem(themeStorageKey);
      hasExplicitPreference = savedTheme === 'sunrise' || savedTheme === 'sunset';
      applyTheme(hasExplicitPreference
        ? savedTheme as Theme
        : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'sunset' : 'sunrise');
    } catch {
      // Keep the in-memory selection when storage is unavailable.
    }
  });
};
