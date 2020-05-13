<template>
  <section class="page" :bordered="!$q.screen.lt.md" style="width:100%;overflow:hidden">
    <q-page class="relative-position scroll" style="height:calc(100vh - 50px);width:100%">
      <q-pull-to-refresh @refresh="getData" class="relative-position" style="width:100%">
        <q-list class="list-container" :bordered="!$q.screen.lt.md">
          <q-item v-for="(user,index) in users" :key="user.id">
            <q-item-section avatar>
              <q-icon name="account_circle" :color="color(index)"/>
            </q-item-section>
            <q-item-section>
              <q-item-label lines="1">{{user.name}}</q-item-label>
              <q-item-label caption>{{power(user.power)}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label caption lines="1">{{$t('user.activatedTime')}}</q-item-label>
              <q-item-label>{{time(user.activatedTime)}}</q-item-label>
            </q-item-section>
          </q-item>
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
    time(){
      return time=>{
        return this.$formatTimeStamp(time).toString()
      }
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
    color(){
      return n=>{
        let arr = ['primary','secondary','accent','info','warning']
        return arr[n%arr.length]
      }
    }
  },
  data() {
    return {
      usersData: null,
      loadingState: false,
      cancelTokenArr: [],
      sortState: 0
    };
  },
  methods: {
    async getData(done) {
      try {
        let res = await this.$store.dispatch("MainLayout/getAllUsers", [
          this,
          done
        ]);
        this.usersData = res.data.data;
        console.log("getData", this.usersData);
      } catch (e) {
        console.log(e);
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getData();
      vm.$store.commit("MainLayout/title", vm.$t("location.userList", vm));
      vm.$store.commit("MainLayout/rightTopIcon", { display: false });
      vm.$store.commit("MainLayout/rightTopIcon2", { display: false });
      vm.$store.commit("MainLayout/rightTopIcon3", { display: false });
    });
  }
};
</script>
<style lang="sass" scoped>
</style>
