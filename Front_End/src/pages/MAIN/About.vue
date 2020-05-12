<template>
  <section class="page">
    <q-list class="list-container" bordered>
      <q-item-label header>{{$t('location.about')}}</q-item-label>
      <q-item clickable v-ripple>
        <q-item-section>{{$t('configInfo.name')}}</q-item-section>
        <q-item-section side>{{$t('config.name')}}</q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>{{$t('configInfo.version')}}</q-item-section>
        <q-item-section side>{{$t('config.version')}}</q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>{{$t('configInfo.updateTime')}}</q-item-section>
        <q-item-section side>{{$t('config.updateTime')}}</q-item-section>
      </q-item>
      <q-item clickable v-ripple @click='toBlog'>
        <q-item-section>{{$t('configInfo.author')}}</q-item-section>
        <q-item-section side>
          <q-avatar rounded>
            <img src="https://hokori.online/image/profile.jpg" />
          </q-avatar>
        </q-item-section>
        <q-item-section side>{{$t('config.author')}}</q-item-section>
      </q-item>
    </q-list>
  </section>
</template>
<script>
export default {
  name: "about",
  methods: {
    toBlog() {
      location.href = "https://hokori.online";
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.commit("MainLayout/title", vm.$t("location.about"));
      vm.$store.commit("MainLayout/rightTopIcon", { display: false });
      vm.$store.commit("MainLayout/rightTopIcon2", { display: false });
      vm.$store.commit("MainLayout/rightTopIcon3", { display: false });
    });
  }
};
</script>
<style lang="sass" scoped>
</style>
