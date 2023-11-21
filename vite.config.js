import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import AutoImport from "unplugin-auto-import/vite";

import { BootstrapVueNextResolver } from "unplugin-vue-components/resolvers";

const config = defineConfig({
  resolve: {
    alias: {
      "@": `${path.resolve(__dirname, "src")}`,
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "bootstrap-vue-next": ["bootstrap-vue-next"],
        },
      },
    },

  },

  plugins: [
    vue(),
    Components({
      dts: "src/components.d.ts",
      include: [/\.vue$/, /\.vue\?vue/],
      exclude: [
        /[\\/]node_modules[\\/]/,
        /[\\/]\.git[\\/]/,
        /[\\/]\.nuxt[\\/]/,
      ],
      resolvers: [
        BootstrapVueNextResolver(),        
        IconsResolver(),
      ],
    }),
    Icons({
      compiler: 'vue3',
      autoInstall: true
    }),
    AutoImport({
      imports: ["vue"],
      dts: "src/auto-imports.d.ts",
      eslintrc: {
        enabled: true,
      }
    }),
  ],

  server: {
    hmr: {
      path: './',
    },
    port: 3339,
    host: true,
  },
  base: './',
});

export default config;
