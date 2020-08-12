<template>
  <section class="page" :bordered="!$q.screen.lt.md" style="width:100%;overflow:hidden">
    <q-page class="relative-position scroll" style="height:calc(100vh - 50px);width:100%">
      <q-pull-to-refresh @refresh="getData" class="relative-position" style="width:100%">
        <q-list class="list-container" :bordered="!$q.screen.lt.md">
          <!-- Title -->
          <q-item-label header>{{$t('location.userList')}}</q-item-label>
          <!-- 用户目录 -->
          <div v-if="!loadingState">
            <q-item v-for="(user,index) in users" :key="user.id">
              <q-item-section avatar>
                <q-icon name="account_circle" :color="color(index)" />
              </q-item-section>
              <q-item-section>
                <q-item-label lines="1">{{user.name}}</q-item-label>
                <q-item-label caption>{{power(user.power)}}</q-item-label>
              </q-item-section>
              <q-item-section side no-wrap>
                <q-item-label caption lines="1">{{$t('user.activatedTime')}}</q-item-label>
                <q-item-label>{{time(user.activatedTime)}}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <!-- 加载骨架 -->
          <div v-if="loadingState">
            <q-item v-for="n in 10" :key="n">
              <q-item-section avatar>
                <q-skeleton type="QAvatar" size="24px" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption lines="1">
                  <q-skeleton type="text" height="12px" width="50%" />
                </q-item-label>
                <q-item-label>
                  <q-skeleton type="text" width="50%" />
                </q-item-label>
              </q-item-section>

              <q-item-section>
                <q-item-label caption lines="1">
                  <q-skeleton type="text" width="100%" />
                </q-item-label>
                <q-item-label>
                  <q-skeleton type="text" width="100%" />
                </q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </q-list>
      </q-pull-to-refresh>
    </q-page>
  </section>
</template>
<script>
export default {
  name: "userList",
  computed: {
    users() {
      return (
        this.usersData &&
        this.usersData.sort((a, b) => {
          return Number(b.activatedTime) - Number(a.activatedTime);
        })
      );
    },
    time() {
      return time => {
        return this.$formatTimeStamp(time).toString();
      };
    },
    power() {
      return power => {
        if (power === 1) {
          return this.$t("user.user");
        } else if (power === 2) {
          return this.$t("user.admin");
        }
      };
    },
    color() {
      return n => {
        let arr = ["primary", "secondary", "accent", "info", "warning"];
        return arr[n % arr.length];
      };
    }
  },
  data() {
    return {
      usersData: null,
      loadingState: false,
      cancelTokenArr: [],
      /**
       * 还没做，排序
       */
      sortState: 0
    };
  },
  methods: {
    async getData(done) {
      if (!this.loadingState) {
        let res = await this.$store.dispatch("MainLayout/getAllUsers", [
          this,
          done
        ]);
        this.usersData = res.data.data || null;
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getData();
      vm.$store.commit("MainLayout/title", vm.$t("location.userList"));
      vm.$store.commit("MainLayout/rightTopIcon", { display: false });
      vm.$store.commit("MainLayout/rightTopIcon2", { display: false });
      vm.$store.commit("MainLayout/rightTopIcon3", { display: false });
    });
  },
  beforeRouteLeave(to, from, next) {
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
