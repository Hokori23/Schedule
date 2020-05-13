<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    this.$q.screen.setSizes({ xs:330,sm: 400, md: 450, lg: 1000, xl: 2000 });
  },
};
</script>
