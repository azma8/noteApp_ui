import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true, // biar bisa diakses dari luar container
    port: 4173,
  },
  preview: {
    port: 4173,
    host: true,
    allowedHosts: [
      'note-ui-note-app.apps.dev.mibocp.co.id' // <--- tambahin ini
    ]
  }
})
