import Vue from "vue";
import { createApp, h } from "vue-demi";
import VueCompositionApi from "@vue/composition-api";
import App from "@/App.vue";

import "./plugins/bootstrap-vue";

Vue.use(VueCompositionApi);

Vue.config.productionTip = false;
Vue.config.devtools = true;

const app = createApp({
  render: () => h(App),
});

app.mount("#app");
