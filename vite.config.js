import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/kids-oyun/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Minik Kaşif Pro",
        short_name: "Minik Kaşif",
        description: "2-4 yaş için özgün Türkçe eğitici oyunlar",
        theme_color: "#7257e8",
        background_color: "#bdeeff",
        display: "standalone",
        orientation: "portrait",
        start_url: "/kids-oyun/",
        icons: [
          { src: "icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any maskable" }
        ]
      }
    })
  ]
});
