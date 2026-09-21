import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Served under invite.infindigital.net/imran-rashina, so every built asset
  // URL is prefixed with this base...
  base: '/imran-rashina/',
  // ...and the files are emitted into a matching physical subfolder, so that on
  // Vercel's static hosting (which serves `dist/` at the root) the prefixed URLs
  // resolve to real files at dist/imran-rashina/... without any asset rewrites.
  build: {
    outDir: 'dist/imran-rashina',
    emptyOutDir: true,
  },
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 4173,
  },
})
