import { defineConfig } from "vite";
import path from "path";
import { resolve } from "path";
import { glob } from "glob";
import handlebars from "vite-plugin-handlebars";
import FullReload from "vite-plugin-full-reload";
import Inspect from "vite-plugin-inspect";

const repoBase = "/ClubTravel/";
const partialDir = [
  resolve(__dirname, "src/html/components"),

  resolve(__dirname, "src/html/pages/layout"),
  resolve(__dirname, "src/html/pages/homepage"),
  resolve(__dirname, "src/html/pages/filter"),
  resolve(__dirname, "src/html/pages/hotpage"),
  resolve(__dirname, "src/html/pages/searchpage"),
  resolve(__dirname, "src/html/pages/hotelpage"),
  resolve(__dirname, "src/html/pages/directionspage"),
  resolve(__dirname, "src/html/pages/newspage"),
  resolve(__dirname, "src/html/pages/bookingpage"),
  resolve(__dirname, "src/html/pages/accountpage"),
  resolve(__dirname, "src/html/pages/contactspage"),
  resolve(__dirname, "src/html/pages/textpage"),
  resolve(__dirname, "src/html/pages/errorpage"),
  resolve(__dirname, "src/html/pages/auth"),
];

export default defineConfig(({ command }) => {
  return {
    base: repoBase,
    root: "src",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      [command === "serve" ? "global" : "_global"]: {},
    },

    plugins: [
      Inspect(),
      handlebars({
        partialDirectory: partialDir,
        helpers: {
          link: (p) => repoBase + p,
        },
      }),
      FullReload(["./src/**/**.html"]),
    ],

    build: {
      outDir: "../dist",
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: resolve(__dirname, "src/index.html"),

          ...Object.fromEntries(
            glob
              .sync("./src/html/pages/*.html")
              .map((file) => [
                file.replace("./src/html/pages/", "").replace(".html", ""),
                resolve(__dirname, file),
              ])
          ),
        },
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
          entryFileNames: (chunkInfo) => {
            if (chunkInfo.name === "commonHelpers") {
              return "commonHelpers.js";
            }
            return "[name].js";
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith(".html")) {
              return "[name].[ext]";
            }
            if (
              assetInfo.name?.endsWith(".woff2") ||
              assetInfo.name?.endsWith(".woff")
            ) {
              return "fonts/[name]-[hash][extname]";
            }

            return "assets/[name]-[hash][extname]";
          },
        },
      },
    },

    // envPrefix: "APP_",
    // server: {
    //   open: true,
    //   port: 5173,
    //   strictPort: true,
    //   fs: {
    //     strict: false, // дозволяє слідкувати за файлами поза коренем
    //   },
    //   watch: {
    //     usePolling: true,
    //   },
    // },
  };
});
