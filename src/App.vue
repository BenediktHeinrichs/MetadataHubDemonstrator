<template>
  <div id="app">
    <NavbarHeader />
    <main>
      <b-container>
        <br />
        <h1>MetadataHub Demonstrator</h1>
        <HomePage />
      </b-container>
    </main>
  </div>
</template>

<script lang="ts">
import HomePage from "@/views/HomePage.vue";

export default defineComponent({
  components: {
    HomePage,
  },
});
</script>
