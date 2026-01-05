
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Shims process.env.API_KEY to be available in the browser during build/dev.
    // Netlify will provide the real API_KEY from its environment variables.
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
});
