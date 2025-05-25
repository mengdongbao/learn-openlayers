import {defineConfig} from 'vite';
import {dirname, resolve} from 'node:path';
import { fileURLToPath } from 'node:url';
import {walk} from './script/walk.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url))
const demos = walk(resolve(__dirname, 'src'));

export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      'src': resolve(__dirname, 'src'),
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          ...demos,
        }
      }
    },
    plugins: []
});