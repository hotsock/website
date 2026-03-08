import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/example-apps/real-time-chat/",
  build: {
    outDir: "../../static/example-apps/real-time-chat",
    emptyOutDir: true,
  },
})
