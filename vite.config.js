import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// This is the ONLY code that should be in this file.
export default defineConfig({
  plugins: [react()],
})