import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // optimizeDeps: {
  //   include: ['@agoric/ui-components'],
  // },
  build: {
    outDir: 'build',
  },
  plugins: [react()],
  server: {
    open: true,
  },
});
