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
export default {
  name: "loginLayout",
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
    }
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("Authorization")) {
      next({ path: "/", replace: true });
    } else {
      next();
    }
  }
};
</script>

<style>
</style>
