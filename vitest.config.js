import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: ['./tests/setup/vitest.setup.js'],
    projects: [
      {
        test: {
          name: 'unit',
          environment: 'node',
          include: ['scripts/**/*.test.mjs', 'src/**/*.unit.test.js']
        }
      },
      {
        test: {
          name: 'integration',
          environment: 'jsdom',
          include: ['src/**/*.test.js'],
          exclude: ['src/**/*.unit.test.js']
        }
      }
    ]
  }
})
