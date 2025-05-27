import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'product-manager',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
      },
      shared: ['react', 'react-dom', 'react-redux', 'react-toastify', 'axios', '@apollo/client', 'graphql'],
    }),
  ],
  build:{
  outDir: 'dist',
  target: 'esnext',
  cssCodeSplit: false,
  minify: false,
  modulePreload: false,
  },
});
