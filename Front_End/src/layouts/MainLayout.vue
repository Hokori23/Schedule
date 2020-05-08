<template>
  <q-layout view="hHh LpR fFf" class="mainLayout">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat round :icon="leftTopIcon" @click="leftTopIconClick()" />

        <q-toolbar-title>{{title}}</q-toolbar-title>

        <q-btn flat round :icon="refreshIcon" v-if="refreshIcon" @click.prevent="refreshIconClick" />
        <q-btn flat round :icon="rightTopIcon" v-if="rightTopIcon" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="drawer" side="left" elevated>
      <!-- drawer content -->
      <q-list>
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
          class="drawer-item"
          active-class="text-primary shadow-transition shadow-24 inset-shadow hoverable"
        >
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>

          <q-item-section>{{$t('location.home')}}</q-item-section>
        </q-item>

        <!-- 用户中心 -->
        <q-item
          clickable
          v-ripple
          :active="path === '/user'"
          @click="to('/user')"
          class="drawer-item"
          active-class="text-primary shadow-transition shadow-24 inset-shadow hoverable"
        >
          <q-item-section avatar>
            <q-icon name="account_circle" />
          </q-item-section>

          <q-item-section>{{$t('location.user')}}</q-item-section>
        </q-item>

        <!-- 设置 -->
        <q-item
          clickable
          v-ripple
          :active="path === '/setting'"
          @click="to('/setting')"
          class="drawer-item"
          active-class="text-primary shadow-transition shadow-24 inset-shadow hoverable"
        >
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>

          <q-item-section>{{$t('location.setting')}}</q-item-section>
        </q-item>

        <!-- 关于 -->
        <q-item
          clickable
          v-ripple
          :active="path === '/about'"
          @click="to('/about')"
          class="drawer-item"
          active-class="text-primary shadow-transition shadow-24"
        >
          <q-item-section avatar>
            <q-icon name="error" />
          </q-item-section>

          <q-item-section>{{$t('location.about')}}</q-item-section>
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
import languages from "quasar/lang/index.json";
const appLanguages = languages.filter(lang =>
  ["zh-hans", "en-us"].includes(lang.isoName)
);
export default {
  name: "mainLayout",
  computed: {
    login(){
      return this.$store.state.MainLayout.login;
    },
    lang() {
      return this.$i18n.locale;
    },
    title() {
      return this.$store.state.MainLayout.title;
    },
    rightTopIcon() {
      return this.$store.state.MainLayout.rightTopIcon;
    },
    leftTopIcon() {
      return this.$store.state.MainLayout.leftTopIcon;
    },
    refreshIcon() {
      return this.$store.state.MainLayout.refreshIcon;
    },
    refreshState() {
      return this.$store.state.MainLayout.refreshState;
    }
  },
  data() {
    return {
      drawer: false,
      transitionName: "",
      path: this.$route.path,
    };
  },
  methods: {
    to(path) {
      if (this.$route.path !== path) {
        this.$router.push(path);
      }
      this.drawer = false;
    },
    leftTopIconClick() {
      if (this.leftTopIcon === "menu") {
        this.drawer = !this.drawer;
      } else if (this.leftTopIcon === "arrow_back") {
        this.$router.back();
      }
    },
    refreshIconClick() {
      if (this.refreshIcon && !this.refreshState) {
        this.$store.commit("MainLayout/refreshState", true);
        setTimeout(() => {
          this.$store.commit("MainLayout/refreshState", false);
        }, 2000);
      }
    }
  },
  watch: {
    $route(to, from) {
      this.path = to.path;
      if (to.meta.index > from.meta.index) {
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
      //  else if (to.meta.index < from.meta.index) {
      //   this.transitionName = "slide-right";
      // }
    },
    lang(lang) {
      // dynamic import, so loading on demand only
      import(
        /* webpackInclude: /(zh-hans|en-us)\.js$/ */
        `quasar/lang/${lang}`
      ).then(lang => {
        this.$q.lang.set(lang.default);
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (localStorage.getItem("dark-mode") == true) {
        vm.$q.dark.set(true);
      }
      if (!localStorage.getItem("Authorization")||localStorage.getItem("Authorization")==='0') {
        vm.$store.commit("MainLayout/login",false)
        vm.$q
          .dialog({
            message: vm.$t("login.loginExpired"),
            title: vm.$t("common.alert")
          })
          .onDismiss(() => {
            vm.$router.replace("/login");
          });
      }else{
        vm.$store.commit("MainLayout/login",true)
      }
    });
  },
  created() {
    import(
      /* webpackInclude: /(zh-hans|en-us)\.js$/ */
      `quasar/lang/${this.lang}`
    ).then(lang => {
      this.$q.lang.set(lang.default);
    });
  }
};
</script>
