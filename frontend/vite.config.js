import { defineConfig } from 'vite'
import react      from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/pizzas':  { target: 'http://localhost:3000', changeOrigin: true },
      '/cart':    { target: 'http://localhost:3000', changeOrigin: true },
        '/api/auth':  { target: 'http://localhost:3000', changeOrigin: true },
      '/api/checkouts': { target: 'http://localhost:3000', changeOrigin: true }
    }
  }
});