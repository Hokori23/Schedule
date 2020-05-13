<template>
  <section class="page single-day">
    <q-page class="relative-position scroll" style="height:calc(100vh - 50px);width:100%">
      <q-pull-to-refresh @refresh="getData" class="relative-position" style="width:100%">
        <!-- Content -->
        <q-banner class="bg-primary text-white non-selectable text-center">
          <span class="text-h5">{{bannerTime}}</span>
        </q-banner>
        <q-splitter :value="20" style="height: 100%">
          <template v-slot:before>
            <q-tabs v-model="tab" vertical class="text-negative">
              <q-tab
                :name="subject.name"
                v-for="subject in data"
                :key="subject.name"
                :label="subject.name"
                style="height:15vh"
              />
            </q-tabs>
          </template>

          <template v-slot:after>
            <q-tab-panels
              v-model="tab"
              animated
              transition-prev="jump-up"
              transition-next="jump-up"
            >
              <q-tab-panel :name="subject.name" v-for="subject in data" :key="subject.name">
                <div class="text-h5 q-my-sm">{{subject.name}}</div>
                <q-separator />
                <p style="white-space:pre-wrap" class="q-mt-md">{{subject.info}}</p>
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter>
      </q-pull-to-refresh>
    </q-page>
  </section>
</template>
<script>
export default {
  name: "singleDay",
  data() {
    return {
      assignmentState: false,
      data: [],
      cancelTokenArr: [],
      tab: ""
    };
  },
  computed: {
    bannerTime() {
      return this.$formatTimeStamp(this.$route.time).format1();
    }
  },
  methods: {
    async getData(done) {
      if (!this.assignmentState) {
        let res = await this.$store.dispatch(
          "MainLayout/getAssignmentsInPeriod",
          [1, this, Number(this.$route.params.time)]
        );
        this.data = res || this.data;
        this.tab = this.data[0].name;
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
<style lang="sass">
.single-day
  .q-tab__label
    -webkit-line-clamp: 3
    overflow: hidden
    display: -webkit-box
    -webkit-box-orient: vertical
    text-align: center
    white-space: pre-wrap
    word-break: break-all
    text-transform: capitalize
</style>
