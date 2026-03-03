import { defineConfig } from 'vite'
import { resolve } from 'path'
import { glob } from 'glob'
import { readFileSync } from 'node:fs'

const headerPartialPath = resolve(__dirname, 'src/partials/header.html')

function sitePartialsPlugin() {
  return {
    name: 'site-partials',
    transformIndexHtml(html) {
      const headerPartial = readFileSync(headerPartialPath, 'utf8')
      return html.replace('<!-- @site-header -->', headerPartial)
    }
  }
}

export default defineConfig({
  root: 'src',
  plugins: [sitePartialsPlugin()],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      // Automatically finds every index.html in any subfolder of /src
      input: Object.fromEntries(
        glob.sync('src/**/index.html', { ignore: 'src/track-info-fake/**' }).map(file => [
          file.replace('src/', '').replace('/index.html', '') || 'main',
          resolve(__dirname, file)
        ])
      )
    }
  }
})
