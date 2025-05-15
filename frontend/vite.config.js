import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // todo lo que empiece /api/* va a http://localhost:3000/api/*
      '/api': { target: 'http://localhost:3000', changeOrigin: true },
      '/pizzas': { target: 'http://localhost:3000' },
      '/cart': { target: 'http://localhost:3000' },
    }
  }
});