// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import tailwindcss from "@tailwindcss/vite";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   server: {
//     host: "0.0.0.0",
//     port: 3000,
//     strictPort: true,
//   },
//   build: {
//     outDir: "build",
//     sourcemap: false,
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
  },
  build: {
    outDir: "build",
    sourcemap: false,
    rollupOptions: {
      onwarn(warning, warn) {
        // Suprimir warnings específicos
        if (warning.code === "UNUSED_EXTERNAL_IMPORT") return;
        warn(warning);
      },
    },
  },
  optimizeDeps: {
    // Forzar la pre-bundling de socket.io-client
    include: ["socket.io-client"],
  },
  define: {
    // Necesario para socket.io-client
    global: "globalThis",
  },
  esbuild: {
    // Configuración para manejar JSX y TS
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
});
