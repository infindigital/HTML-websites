import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // This invitation is served from a subpath of the studio domain:
  //   https://invite.infindigital.net/imran-rashina
  // so every built asset URL (JS/CSS/public files) must carry that prefix.
  base: '/imran-rashina/',
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
