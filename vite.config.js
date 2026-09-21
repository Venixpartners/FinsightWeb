import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon-32x32.png", "apple-touch-icon.png"],
      workbox: {
        // Never serve API calls or the app shell for API routes from the offline cache.
        navigateFallbackDenylist: [/^\/api\//],
      },
      manifest: {
        name: "FinSight",
        short_name: "FinSight",
        description: "Nigerian business, markets and economy news",
        theme_color: "#071426",
        background_color: "#071426",
        display: "standalone",
        start_url: "/",
        icons: [
          { src: "/pwa-192.png", sizes: "192x192", type: "image/png" },
          { src: "/pwa-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
        ],
      },
    }),
  ],
});
