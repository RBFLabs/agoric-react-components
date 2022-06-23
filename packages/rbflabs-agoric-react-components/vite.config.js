// NOTE: This might not be necessary as we use new monorepo
import react from '@vitejs/plugin-react';
import path from 'node:path';
import {defineConfig} from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: '@rbflabs/agoric-react-components',
      fileName: format => `@rbflabs/agoric-react-components.${format}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'styled-components',
        'react-icons',
        '@agoric/web-components',
        '@agoric/notifier',
        '@agoric/eventual-send',
        'react-toastify',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled',
        },
      },
    },
  },
});
