import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the built site can be hosted from any subpath
// (e.g. /rs-chefz/ inside the HTML-websites collection).
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          r3f: ['@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
});
