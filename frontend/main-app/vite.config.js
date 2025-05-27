import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'app',
      remotes: {
        productApp: 'http://localhost:5001/assets/remoteEntry.js',
        ordersApp: 'http://localhost:5002/assets/remoteEntry.js',
        usersApp : 'http://localhost:5003/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-redux', 'react-toastify', '@apollo/client', 'graphql'],
    }),
  ],
  build:{
    modulePreload:false,
    target:'esnext',
    minify:false,
    cssCodeSplit:false,
  },
});
