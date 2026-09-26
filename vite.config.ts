import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// Served from GitHub Pages at /crystals-world-store/ (change `base` to '/' on a custom domain).
export default defineConfig({
  base: '/crystals-world-store/',
  plugins: [react(), tailwindcss()],
})
