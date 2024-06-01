import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://patrick-ta.github.io/iceborne-endgame-leaderboards/",
  plugins: [react()],
})
