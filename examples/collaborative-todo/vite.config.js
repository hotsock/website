import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/example-apps/collaborative-todo/",
  build: {
    outDir: "../../static/example-apps/collaborative-todo",
    emptyOutDir: true,
  },
})
