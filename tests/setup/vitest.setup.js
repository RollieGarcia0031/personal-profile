if (!globalThis.localStorage) {
  const store = new Map()

  globalThis.localStorage = {
    getItem(key) {
      return store.has(key) ? store.get(key) : null
    },
    setItem(key, value) {
      store.set(key, String(value))
    },
    removeItem(key) {
      store.delete(key)
    },
    clear() {
      store.clear()
    }
  }
}

if (typeof globalThis.matchMedia !== 'function') {
  globalThis.matchMedia = query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false
  })
}

if (globalThis.customElements && typeof globalThis.customElements.define === 'function') {
  const originalDefine = globalThis.customElements.define.bind(globalThis.customElements)

  globalThis.customElements.define = (name, constructor, options) => {
    if (!globalThis.customElements.get(name)) {
      originalDefine(name, constructor, options)
    }
  }
}
