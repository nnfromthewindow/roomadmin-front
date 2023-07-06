import { defineConfig,splitVendorChunkPlugin } from 'vite'
import { compression } from 'vite-plugin-compression2'
import { visualizer } from "rollup-plugin-visualizer";
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin(),compression(),visualizer()],
  build:{
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/@mui')) {
            if (id.includes('/x-date-pickers/')) {
              return 'mui-x-date-pickers';
            } 
            else return 'mui';

          }
        }}},    
  }
})
