import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true
    },
    strictPort: true,
    host: true,
    port: 5173,
  },
  plugins: [
    react(),
  ],
})
