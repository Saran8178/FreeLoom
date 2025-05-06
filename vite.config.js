import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src', // This tells Vite to look in the 'src' folder for the '@' alias
    },
  },
  plugins: [react()],
});
