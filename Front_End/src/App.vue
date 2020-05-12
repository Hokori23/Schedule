<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    this.$q.screen.setSizes({ sm: 330, md: 400, lg: 1000, xl: 2000 });
  },
};
</script>
