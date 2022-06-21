import { defineConfig } from 'vite'
import { resolve } from 'path'
import * as pkg from './package.json';
import solidPlugin from 'vite-plugin-solid';
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solidPlugin(), dts()],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'solid-query',
      formats: ['umd', 'cjs', 'es'],
      fileName: (format) => `solid-query.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(pkg.devDependencies), ...Object.keys(pkg.peerDependencies), ...Object.keys(pkg.dependencies)],
    }
  }
})