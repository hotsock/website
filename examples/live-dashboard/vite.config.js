import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/example-apps/live-dashboard/",
  build: {
    outDir: "../../static/example-apps/live-dashboard",
    emptyOutDir: true,
  },
})
