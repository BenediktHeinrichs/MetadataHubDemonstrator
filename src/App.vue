<template>
  <div id="app">
    <main>
      <b-container>
        <br />
        <h1>MetadataHub Demonstrator</h1>
        <Home />
      </b-container>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";

import Home from "@/views/Home.vue";

export default defineComponent({
  components: {
    Home,
  },
});
</script>
