import { defineConfig } from 'vite'
import { resolve } from 'path'
import { glob } from 'glob'

export default defineConfig({
  root: 'src',
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
