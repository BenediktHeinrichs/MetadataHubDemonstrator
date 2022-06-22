import path from "path";
import { defineConfig } from "vite";
import { createVuePlugin as Vue2 } from "vite-plugin-vue2";
import Components from "unplugin-vue-components/vite";
import ScriptSetup from "unplugin-vue2-script-setup/vite";
import { BootstrapVueResolver } from "./src/plugins/bootstrap-vue-resolver";

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
