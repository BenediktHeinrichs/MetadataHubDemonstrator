import { createApp, h } from "vue";
import App from "@/App.vue";

import BootstrapVueNext from "@/plugins/bootstrap-vue-next";
import pinia from "@/plugins/pinia";

import createCustomRouter from "@/router";

const app = createApp({
  render: () => h(App),
});

app.use(createCustomRouter());
app.use(BootstrapVueNext);
app.use(pinia);

app.mount("#app");
