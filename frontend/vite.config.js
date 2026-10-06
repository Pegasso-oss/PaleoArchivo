import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("framer-motion")) return "vendor-animation";
          if (id.includes("lucide-react")) return "vendor-icons";
          if (id.includes("node_modules/d3")) return "vendor-visualization";
          if (id.includes("react") || id.includes("scheduler")) return "vendor-react";
        },
      },
    },
  },
  server:{
    allowedHosts: [
      'nonelemental-deb-revealedly.ngrok-free.dev'
    ]
  }
})
