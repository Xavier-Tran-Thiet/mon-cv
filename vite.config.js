import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' : chemins relatifs, le build fonctionne à la racine d'un domaine,
// dans un sous-dossier (GitHub Pages) ou derrière Nginx dans Docker.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 800,
  },
});
