import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'orders',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
      },
      shared: ['react', 'react-dom', 'react-toastify', 'axios'],
    }),
  ],
  build: {
    outDir: 'dist',
    target: 'esnext',
    cssCodeSplit: false,
    minify: false,
    modulePreload: false,
  },
})
