import { defineConfig } from 'vite'
import { resolve } from 'path'
import { glob } from 'glob'
import { readFileSync } from 'node:fs'

const headerPartialPath = resolve(__dirname, 'src/partials/header.html')
const footerPartialPath = resolve(__dirname, 'src/partials/footer.html')

function normalizeBaseUrl(baseUrl = '/') {
  if (!baseUrl || baseUrl === '/') {
    return '/'
  }

  const trimmedBaseUrl = baseUrl.replace(/^\/+|\/+$/g, '')
  return `/${trimmedBaseUrl}/`
}

function sitePartialsPlugin(baseUrl) {
  return {
    name: 'site-partials',
    transformIndexHtml(html) {
      const headerPartial = readFileSync(headerPartialPath, 'utf8')
      const footerPartial = readFileSync(footerPartialPath, 'utf8')
      const resolvedHeaderPartial = headerPartial.replaceAll('__BASE_URL__', baseUrl)
      const resolvedFooterPartial = footerPartial.replaceAll('__BASE_URL__', baseUrl)

      return html
        .replace('<!-- @site-header -->', resolvedHeaderPartial)
        .replace('<!-- @site-footer -->', resolvedFooterPartial)
    }
  }
}

export default defineConfig(() => {
  const base = normalizeBaseUrl(process.env.BASE_URL)

  return {
    root: 'src',
    base,
    plugins: [sitePartialsPlugin(base)],
    build: {
      outDir: '../dist',
      emptyOutDir: true,
      rollupOptions: {
        input: Object.fromEntries(
          glob.sync('src/**/index.html', { ignore: 'src/track-info-fake/**' }).map(file => [
            file.replace('src/', '').replace('/index.html', '') || 'main',
            resolve(__dirname, file)
          ])
        )
      }
    }
  }
})
