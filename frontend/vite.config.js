import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    // Increase the limit as needed
    chunkSizeWarningLimit: 1000, 
  },
  server: {
    middlewareMode: 'html',
    configureServer: ({ middlewares }) => {
      middlewares.use((req, res, next) => {
        if (req.url.startsWith('/api')) {
          return next()
        }
        const filePath = resolve(__dirname, 'dist', 'index.html')
        fs.readFile(filePath, (err, data) => {
          if (err) {
            return next(err)
          }
          res.setHeader('Content-Type', 'text/html')
          res.end(data)
        })
      })
    }
  }
})