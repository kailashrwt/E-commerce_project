import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
base : process.env.NODE_EVN === "Production
? '/E-commerce_project'
})
