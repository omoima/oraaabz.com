import './style.css';
import { content } from './content';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) throw new Error('The app root was not found.');

const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[character];
  });

const email = escapeHtml(content.email);

type Theme = 'sunrise' | 'sunset';

const initialTheme = document.documentElement.dataset.theme === 'sunset' ? 'sunset' : 'sunrise';

app.innerHTML = `
  <div class="layout">
    <aside class="blue-panel" aria-label="A little more about Oarabile">
      <div class="panel-top">
        <span class="wordmark">${escapeHtml(content.nickname.toLowerCase())}<span>.</span></span>
        <span class="panel-label">CAPE TOWN / SA</span>
      </div>

      <div class="panel-art" aria-hidden="true">
        <div class="orbit orbit-one"></div>
        <div class="orbit orbit-two"></div>
        <span class="big-o">O</span>
        <span class="little-star">✳</span>
      </div>

      <div class="panel-bottom">
        <div class="panel-rule"></div>
        <p>${escapeHtml(content.roots)}<br />${escapeHtml(content.personal)}</p>
      </div>
    </aside>

    <main class="main-panel">
      <div class="topbar">
        <div class="topline"><span>TECHNICAL / CREATIVE</span><span>HELLO FROM CAPE TOWN</span></div>
        <div class="theme-switch" role="group" aria-label="Colour mode">
          <button class="theme-option" type="button" data-theme-value="sunrise" aria-label="Use sunrise light mode" aria-pressed="${initialTheme === 'sunrise'}">
            <span aria-hidden="true">☀︎</span><span>Sunrise</span>
          </button>
          <button class="theme-option" type="button" data-theme-value="sunset" aria-label="Use sunset dark mode" aria-pressed="${initialTheme === 'sunset'}">
            <span aria-hidden="true">☾</span><span>Sunset</span>
          </button>
        </div>
      </div>

      <div class="intro-block">
        <p class="hello">HELLO, I'M</p>
        <h1>${escapeHtml(content.heading)}</h1>
        <div class="intro-rule"></div>
        <p class="lead">${escapeHtml(content.intro)}</p>
        <p class="current">${escapeHtml(content.current)}</p>
        <p class="tools-line">${escapeHtml(content.tools)}</p>
        <p class="fpl-note">${escapeHtml(content.fpl)}</p>

        <div class="contact-block">
          <span class="contact-label">LET'S CONNECT</span>
          <div class="contact-actions">
            <a class="email-link" href="mailto:${email}">Write me an email <span aria-hidden="true">↗</span></a>
            <button class="copy-button" type="button" id="copy-email" aria-label="Copy ${email}">Copy address</button>
          </div>
          <span class="address">${email}</span>
          <span id="copy-status" class="sr-only" role="status" aria-live="polite"></span>
        </div>
      </div>

      <footer class="main-footer">
        <span>© ${new Date().getFullYear()} ${escapeHtml(content.name)}</span>
        <div class="social-links">
          <a href="${escapeHtml(content.github)}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href="${escapeHtml(content.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a href="${escapeHtml(content.instagram)}" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
          <a href="${escapeHtml(content.twitter)}" target="_blank" rel="noopener noreferrer">X ↗</a>
        </div>
      </footer>
    </main>
  </div>
`;

const themeButtons = document.querySelectorAll<HTMLButtonElement>('[data-theme-value]');
const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');

const applyTheme = (theme: Theme, persist = true): void => {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme === 'sunset' ? 'dark' : 'light';
  themeColor?.setAttribute('content', theme === 'sunset' ? '#171021' : '#fffaf3');

  themeButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.themeValue === theme));
  });

  if (persist) {
    try {
      window.localStorage.setItem('oraaabz-theme', theme);
    } catch {
      // The selected theme still applies when storage is unavailable.
    }
  }
};

applyTheme(initialTheme, false);

themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const theme = button.dataset.themeValue;
    if (theme === 'sunrise' || theme === 'sunset') applyTheme(theme);
  });
});

const copyButton = document.querySelector<HTMLButtonElement>('#copy-email');
const copyStatus = document.querySelector<HTMLElement>('#copy-status');
let copyResetTimer: number | undefined;

copyButton?.addEventListener('click', async () => {
  if (!copyStatus) return;

  try {
    await navigator.clipboard.writeText(content.email);
    copyButton.textContent = 'Copied';
    copyStatus.textContent = 'Email address copied to clipboard.';
    window.clearTimeout(copyResetTimer);
    copyResetTimer = window.setTimeout(() => {
      copyButton.textContent = 'Copy address';
    }, 2400);
  } catch {
    copyStatus.textContent = 'Could not copy automatically. You can select the email address below.';
  }
});
