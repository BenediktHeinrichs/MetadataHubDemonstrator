import Vue from "vue";
import { createApp, h } from "vue-demi";
import App from "@/App.vue";

import "@/plugins/bootstrap-vue";
import pinia from "@/plugins/pinia";

Vue.config.productionTip = false;
Vue.config.devtools = true;

const app = createApp({
  pinia,
  render: () => h(App),
});

app.mount("#app");
