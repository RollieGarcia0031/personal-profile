import { beforeEach } from 'vitest'

const localStorageStore = new Map()

globalThis.localStorage = {
  getItem(key) {
    return localStorageStore.has(key) ? localStorageStore.get(key) : null
  },
  setItem(key, value) {
    localStorageStore.set(key, String(value))
  },
  removeItem(key) {
    localStorageStore.delete(key)
  },
  clear() {
    localStorageStore.clear()
  }
}

let prefersDark = false

globalThis.__setMatchMediaPrefersDark = value => {
  prefersDark = Boolean(value)
}

globalThis.matchMedia = query => ({
  matches: query === '(prefers-color-scheme: dark)' ? prefersDark : false,
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false
})

beforeEach(() => {
  localStorage.clear()
  prefersDark = false
  if (globalThis.document?.documentElement) {
    globalThis.document.documentElement.removeAttribute('data-theme')
  }
})

if (globalThis.customElements && typeof globalThis.customElements.define === 'function') {
  const originalDefine = globalThis.customElements.define.bind(globalThis.customElements)

  globalThis.customElements.define = (name, constructor, options) => {
    if (!globalThis.customElements.get(name)) {
      originalDefine(name, constructor, options)
    }
  }
}
