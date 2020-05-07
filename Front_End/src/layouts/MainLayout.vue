<template>
  <q-layout view="hHh LpR fFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat round icon="menu" @click="drawer = !drawer" />

        <q-toolbar-title>Title</q-toolbar-title>

        <q-btn flat round icon="whatshot" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="drawer" side="left" elevated>
      <!-- drawer content -->
      <q-list class="text-primary">
        <!-- Banner -->
        <q-item class="q-py-lg bg-negative text-white drawer-item--banner">
          <q-item-section avatar>
            <q-icon name="assignment" />
          </q-item-section>

          <q-item-section>{{$t('config.name')}}</q-item-section>
        </q-item>
        <!-- 首页 -->
        <q-item
          clickable
          v-ripple
          :active="path === '/'"
          @click="to('/')"
          active-class="drawer-item--active"
        >
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>

          <q-item-section>{{$t('location.home')}}</q-item-section>
        </q-item>

        <!-- 设置 -->
        <q-item
          clickable
          v-ripple
          :active="path === '/setting'"
          @click="to('/setting')"
          active-class="drawer-item--active"
        >
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>

          <q-item-section>{{$t('location.setting')}}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <transition :name="transitionName" mode="out-in">
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>
    </q-page-container>
  </q-layout>
</template>


<script>
export default {
  name: "mainLayout",
  data() {
    return {
      drawer: false,
      transitionName: "",
      path: this.$route.path
    };
  },
  methods: {
    to(path) {
      if (this.$route.path !== path) {
        this.$router.push(path);
      }
      this.drawer = false;
    }
  },
  watch: {
    $route(to, from) {
      this.path = to.path;
      if (to.meta.index > from.meta.index) {
        this.transitionName = "slide-left";
      } else if (to.meta.index < from.meta.index) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "";
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    console.log("before");
    next(vm => {
      if (!localStorage.getItem("Authorization")) {
        vm.$q
          .dialog({
            message: vm.$t("login.loginExpired"),
            title: vm.$t("common.alert")
          })
          .onDismiss(() => {
            vm.$router.push("/login");
          });
      }
    });
  }
};
</script>
<style lang="sass">
@media (max-width:$breakpoint-xs-max)
  .q-drawer
    max-width: 70vw

.drawer-item--banner
  font-size: 16px
  cursor: default
  user-select: none
  font-weight: bold
.drawer-item--active
  background-color: $primary
  color: #fff
</style>
