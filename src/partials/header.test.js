import './header.js'
import { beforeEach, describe, expect, it } from 'vitest'

function mountHeaderDom() {
  document.body.innerHTML = `
    <header>
      <button id="menu-collapse-btn">Open</button>
      <nav class="hidden">
        <button id="menu-close-btn">Close</button>
      </nav>
      <button id="theme-toggle-btn">
        <i class="bi bi-moon-stars-fill"></i>
        <span class="theme-toggle-label">Dark mode</span>
      </button>
    </header>
  `
}

function bootstrapHeader() {
  window.dispatchEvent(new Event('DOMContentLoaded'))
}

describe('header partial', () => {
  beforeEach(() => {
    mountHeaderDom()
  })

  it('resolves initial theme from localStorage first', async () => {
    localStorage.setItem('theme', 'dark')
    globalThis.__setMatchMediaPrefersDark(false)

    bootstrapHeader()

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('resolves initial theme from matchMedia when localStorage is missing', async () => {
    globalThis.__setMatchMediaPrefersDark(true)

    bootstrapHeader()

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('falls back to light theme when localStorage and matchMedia do not resolve dark', async () => {
    globalThis.__setMatchMediaPrefersDark(false)

    bootstrapHeader()

    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('updates theme attributes and toggle UI on click', async () => {
    bootstrapHeader()

    const themeToggleBtn = document.querySelector('#theme-toggle-btn')
    const icon = themeToggleBtn?.querySelector('i')
    const label = themeToggleBtn?.querySelector('.theme-toggle-label')

    themeToggleBtn?.click()

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(icon?.className).toBe('bi bi-sun-fill')
    expect(label?.textContent).toBe('Light mode')
    expect(themeToggleBtn?.getAttribute('aria-label')).toBe('Switch to light mode')
    expect(themeToggleBtn?.getAttribute('title')).toBe('Switch to light mode')
  })

  it('toggles nav visibility using collapse and close buttons', async () => {
    bootstrapHeader()

    const nav = document.querySelector('header nav')
    const collapseBtn = document.querySelector('#menu-collapse-btn')
    const closeBtn = document.querySelector('#menu-close-btn')

    collapseBtn?.click()
    expect(nav?.classList.contains('hidden')).toBe(false)

    closeBtn?.click()
    expect(nav?.classList.contains('hidden')).toBe(true)
  })
})
