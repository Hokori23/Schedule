<template>
  <section class="page">
    <q-page class="relative-position scroll" style="height:calc(100vh - 50px);width:100%">
      <q-pull-to-refresh @refresh="getData" class="relative-position" style="width:100%">
        <!-- Content -->
      </q-pull-to-refresh>
    </q-page>
  </section>
</template>
<script>
export default {
  name: "singleSubject",
  data() {
    return {
      loadingState: false,
      data: [],
      cancelTokenArr: []
    };
  },
  methods: {
    async getData(done) {
      if (!this.loadingState) {
        let res = await this.$store.dispatch("MainLayout/getAllUsers", [
          this,
          done
        ]);
        this.data = res.data.data || null;
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getData();
      /**临时标题 */
      vm.$store.commit("MainLayout/title", "单一课表");
      /**标题国际化 */
      // vm.$store.commit("MainLayout/title", vm.$t("location.userList", vm));
      vm.$store.commit("MainLayout/leftTopIcon", { icon: "arrow_back" });
      vm.$store.commit("MainLayout/rightTopIcon", { display: false });
      vm.$store.commit("MainLayout/rightTopIcon2", { display: false });
      vm.$store.commit("MainLayout/rightTopIcon3", { display: false });
    });
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("MainLayout/leftTopIcon", { icon: "menu" });
    //清除ajax请求队列
    this.cancelTokenArr.forEach(source => {
      source.cancel("取消请求");
    });
    next();
  }
};
</script>
<style lang="sass" scoped>
</style>
