import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The app is mounted under a sub-path on the server (e.g. http://IP/proto-routes/).
// `BASE_PATH` defaults to '/proto-routes/' but can be overridden at build time:
//   VITE_BASE=/your-path/ npm run build
const BASE_PATH = process.env.VITE_BASE ?? '/proto-routes/';

export default defineConfig({
  base: BASE_PATH,
  plugins: [react()],
});
