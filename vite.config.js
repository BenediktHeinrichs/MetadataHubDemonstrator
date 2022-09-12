import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import Components from "unplugin-vue-components/vite";
import ScriptSetup from "unplugin-vue2-script-setup/vite";

import { BootstrapVueResolver } from "unplugin-vue-components/resolvers";

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
    vue(),
    ScriptSetup(),
    Components({
      dts: "src/components.d.ts",
      include: [/\.vue$/, /\.vue\?vue/],
      exclude: [
        /[\\/]node_modules[\\/]/,
        /[\\/]\.git[\\/]/,
        /[\\/]\.nuxt[\\/]/,
      ],
      resolvers: [BootstrapVueResolver()],
    }),
  ],

  server: {
    port: 3339,
    host: true,
  },
});

export default config;
