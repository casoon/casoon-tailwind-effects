import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    devSourcemap: true
  },
  build: {
    cssMinify: false, // Keep CSS readable for demo
    sourcemap: true
  },
  server: {
    port: 3000,
    open: '/demo-ondemand.html'
  }
})