import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
   
    VitePWA({
      registerType: 'autoUpdate', 
        injectRegister: 'auto', 
      includeAssets: ['favicon.ico', 'robots.txt', 'icons/*.png', 'primeicons.css'],
      manifest: {
        name: 'Job Organizer App',
        short_name: 'App',
        description: 'App to semplify job search',
        theme_color: '#1E40AF',
        background_color: '#1E40AF',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
