import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// Browsers we build for. Kept in step with the stylesheet conversion in scripts/postbuild.mjs.
const JS_TARGETS = ["es2018", "chrome70", "edge79", "firefox68", "safari12"];

export default defineConfig(({ isSsrBuild }) => ({
  build: isSsrBuild ? {} : { target: JS_TARGETS, cssTarget: JS_TARGETS },
  plugins: [
    react(),
    tailwindcss(),
    !isSsrBuild &&
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["favicon-32x32.png", "apple-touch-icon.png"],
        workbox: {
          // Cache the code and images only. Pages always come fresh from the server,
          // so an update never leaves a visitor holding a page that points at old files.
          globPatterns: ["**/*.{js,css,png,svg,webmanifest}"],
          globIgnores: ["**/og-image.png"],
          navigateFallback: null,
          cleanupOutdatedCaches: true,
        },
        manifest: {
          name: "FinSight",
          short_name: "FinSight",
          description: "Nigerian business, markets and economy news",
          theme_color: "#071426",
          background_color: "#071426",
          display: "standalone",
          start_url: "/",
          lang: "en-NG",
          icons: [
            { src: "/pwa-192.png", sizes: "192x192", type: "image/png" },
            { src: "/pwa-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
          ],
        },
      }),
  ].filter(Boolean),
}));
