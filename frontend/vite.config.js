import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          motion: ['framer-motion'],
          redux: ['@reduxjs/toolkit', 'react-redux', 'redux-persist'],
          routing: ['react-router-dom'],
          forms: ['formik', 'yup'],
        },
      },
    },
  },
});
