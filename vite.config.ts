import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import wasmPack from 'vite-plugin-wasm-pack';

export default defineConfig({
  build: {
    minify: false
  },
  plugins: [
    vue(), 
    wasmPack(['./my-crate']), 
  ]
});