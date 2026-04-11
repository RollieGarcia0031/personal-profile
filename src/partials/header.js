/**
 * Header behavior controller.
 *
 * Responsibilities:
 * 1) Mobile nav interactions
 *    - Open menu via `#menu-collapse-btn`
 *    - Close menu via `#menu-close-btn`
 *
 * 2) Theme toggle interactions
 *    - Read saved theme from localStorage
 *    - Fallback to system preference (`prefers-color-scheme`)
 *    - Apply theme through `document.documentElement[data-theme]`
 *    - Persist selection and update the button UI state
 *
 * Required DOM selectors (from `templates/partials/header.html`):
 * - `header nav`
 * - `#menu-collapse-btn`
 * - `#menu-close-btn`
 * - `#theme-toggle-btn` with child `<i>` and `.theme-toggle-label`
 */

const THEME_STORAGE_KEY = 'theme';
const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';

/**
 * Returns the user's preferred theme.
 *
 * Resolution order:
 * 1) Saved theme in localStorage (if valid)
 * 2) System preference (`prefers-color-scheme: dark`)
 * 3) Light theme fallback
 *
 * @returns {'light' | 'dark'}
 */
function getPreferredTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme === LIGHT_THEME || savedTheme === DARK_THEME) {
    return savedTheme;
  }

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return DARK_THEME;
  }

  return LIGHT_THEME;
}

/**
 * Applies a theme and synchronizes the toggle button state.
 *
 * @param {'light' | 'dark'} theme
 * @param {HTMLButtonElement | null} themeToggleBtn
 */
function setTheme(theme, themeToggleBtn) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);

  if (!themeToggleBtn) return;

  const themeIcon = themeToggleBtn.querySelector('i');
  const themeLabel = themeToggleBtn.querySelector('.theme-toggle-label');
  const isDark = theme === DARK_THEME;

  if (themeIcon) {
    themeIcon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
  }

  if (themeLabel) {
    themeLabel.textContent = isDark ? 'Light mode' : 'Dark mode';
  }

  const actionText = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  themeToggleBtn.setAttribute('aria-label', actionText);
  themeToggleBtn.setAttribute('title', actionText);
}

window.addEventListener('DOMContentLoaded', () => {
  const headerNav = document.querySelector('header nav');
  const closeBtn = document.querySelector('header #menu-close-btn');
  const collapseBtn = document.querySelector('header #menu-collapse-btn');
  const themeToggleBtn = document.querySelector('header #theme-toggle-btn');

  closeBtn?.addEventListener('click', () => {
    headerNav?.classList.add('hidden');
  });

  collapseBtn?.addEventListener('click', () => {
    headerNav?.classList.remove('hidden');
  });

  setTheme(getPreferredTheme(), themeToggleBtn);

  themeToggleBtn?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') === DARK_THEME
      ? DARK_THEME
      : LIGHT_THEME;

    setTheme(currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME, themeToggleBtn);
  });
});
