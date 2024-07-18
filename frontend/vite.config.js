import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';  // Add this import

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  // Add the resolve configuration here
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});