import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          environment: 'node',
          setupFiles: ['./tests/setup/vitest.setup.js'],
          include: ['scripts/**/*.test.mjs', 'src/**/*.unit.test.js']
        }
      },
      {
        test: {
          name: 'integration',
          environment: 'jsdom',
          setupFiles: ['./tests/setup/vitest.setup.js'],
          include: ['src/**/*.test.js'],
          exclude: ['src/**/*.unit.test.js']
        }
      }
    ]
  }
})
