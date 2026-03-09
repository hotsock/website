import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/example-apps/notification-feed/",
  build: {
    outDir: "../../static/example-apps/notification-feed",
    emptyOutDir: true,
  },
})
