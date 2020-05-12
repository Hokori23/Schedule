<template>
  <q-layout view="hHh LpR fFf">
    <q-header reveal elevated class="bg-primary text-white" v-model="header">
      <q-toolbar>
        <q-btn flat round icon="arrow_back" @click="$router.go(-1)" />
        <q-toolbar-title>{{$store.state.LoginLayout.titleText}}</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <transition :name="transitionName" mode="out-in">
        <keep-alive>
          <router-view @header="headerChange($event)" />
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
  name: "loginLayout",
  computed: {
    lang() {
      return this.$i18n.locale;
    }
  },
  data() {
    return {
      header: false,
      transitionName: ""
    };
  },
  methods: {
    headerChange(value) {
      this.header = value;
    }
  },
  watch: {
    $route(to, from) {
      if (to.meta.index > from.meta.index) {
        this.transitionName = "slide-left";
      } else if (to.meta.index < from.meta.index) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "";
      }
    },
    lang(lang) {
      // dynamic import, so loading on demand only
      import(
        /* webpackInclude: /(zh-hans|en-us)\.js$/ */
        `quasar/lang/${lang}`
      ).then(lang => {
        this.$q.lang.set(lang.default);
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    // if (
    //   localStorage.getItem("Authorization") &&
    //   localStorage.getItem("Authorization") !== "0"
    // ) {
    //   next({ path: "/", replace: true });
    // } else {
    next(vm => {
      vm.$q.dark.set(false);
      vm.$store.commit("MainLayout/login",false)
    });
    // }
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

<style>
</style>
