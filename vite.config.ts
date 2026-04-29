import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url' // Required to fix __dirname
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Define __dirname manually for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id: string) { // Added : string type here
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    react(),
    tailwindcss(),
  ],
  base: "/slytherin/", // Matches your repo name
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
