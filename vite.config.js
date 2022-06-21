import path from "path";
import { defineConfig } from "vite";
import { createVuePlugin as Vue2 } from "vite-plugin-vue2";
import Components from "unplugin-vue-components/vite";
import ScriptSetup from "unplugin-vue2-script-setup/vite";

const config = defineConfig({
  resolve: {
    alias: {
      "@": `${path.resolve(__dirname, "src")}`,
    },
    dedupe: ["vue-demi"],
  },

  build: {
    minify: true,
  },

  plugins: [
    Vue2(),
    ScriptSetup(),
    Components({
      dts: "src/components.d.ts",
    }),
  ],

  server: {
    port: 3333,
  },
});

export default config;
