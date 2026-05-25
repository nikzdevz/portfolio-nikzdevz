import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables from .env file
  const envPath = mode === 'production' ? '.env.production' : '.env';
  const env = require('dotenv').config({ path: envPath }) || {};

  return {
    plugins: [react()],

    server: {
      port: parseInt(process.env.FRONTEND_PORT || '3000', 10),
      host: '0.0.0.0'
    },

    preview: {
      port: parseInt(process.env.FRONTEND_PORT || '3000', 10),
      host: '0.0.0.0'
    },

    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL || 'http://backend:5000'),
      'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY || '')
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },

    build: {
      // Enable source maps for production debugging
      sourcemap: false,
      // Optimize chunk size
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            motion: ['framer-motion'],
          }
        }
      }
    }
  };
});
