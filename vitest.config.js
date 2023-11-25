import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./config/setupTests.js'],
  },
  resolve: {
    // The issue you need to tell vitest about the aliases you are using (define inside tsconfig.json ).  https://stackoverflow.com/questions/75798479/how-can-i-solve-the-issue-of-failed-to-resolve-import-in-vitest
    // The same thing would happen for jest. https://nextjs.org/docs/pages/building-your-application/optimizing/testing
    alias: [
      { find: '@/components', replacement: './components' },
      { find: '@/hooks', replacement: './hooks' },
      { find: '@/messages', replacement: './messages' },
      { find: '@/types', replacement: './types' },
      { find: '@/utils', replacement: './utils' },
    ],
  },
});
