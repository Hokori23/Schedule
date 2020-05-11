<template>
  <q-layout view="hHh LpR fFf" class="mainLayout">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <!-- btn Animation -->
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <q-btn flat round :icon="leftTopIcon" @click="leftTopIconClick()" />
        </transition>

        <q-toolbar-title>{{title}}</q-toolbar-title>

        <!-- btn Animation -->
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <q-btn
            flat
            round
            :icon="refreshIcon"
            v-if="refreshIcon"
            @click.prevent="refreshIconClick"
          />
        </transition>

        <!-- btn Animation -->
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <q-btn flat round :icon="rightTopIcon" v-if="rightTopIcon" @click="rightTopIconClick" />
        </transition>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="drawer" side="left" elevated class="non-selectable">
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
          active-class="text-primary shadow-transition shadow-24 inset-shadow hoverable"
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
import AddAssignment from "components/AddAssignment";
import languages from "quasar/lang/index.json";
const appLanguages = languages.filter(lang =>
  ["zh-hans", "en-us"].includes(lang.isoName)
);
export default {
  name: "mainLayout",
  computed: {
    login() {
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
      path: this.$route.path
    };
  },
  methods: {
    to(path) {
      if (this.$route.path !== path) {
        this.$router.push(path);
      }
      // this.drawer = false;
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
      }
    },
    //添加作业
    async rightTopIconClick() {
      if (this.rightTopIcon === "add") {
        //判断路由路径
        if (this.$route.path === "/") {
          let subjectsObject = this.$store.state.MainLayout.subjects;
          //判断是否有科目
          if (!subjectsObject.length) {
            //没有的话尝试获取一遍
            await this.$store.dispatch("MainLayout/getAllsubjects", this);
          }

          //处理数据
          let subjects = subjectsObject.map(value => {
            return value.name;
          });

          this.$q
            .dialog({
              component: AddAssignment,
              parent: this,
              subjects: subjects,
              ok: this.$t("common.confirm"),
              cancel: this.$t("common.cancel")
            })
            .onOk(async ({ assignment, vm }) => {
              //添加作业
              try {
                let res = await this.$store.dispatch(
                  "MainLayout/addAssignment",
                  [assignment, this]
                );
                this.$store.commit("MainLayout/refreshState", true);
                this.$dealWithSuccess(this, res);
              } catch (e) {
                this.$dealWithError(this, e);
              } finally {
                vm.submitState = false;
                if (vm.hide) {
                  vm.hide();
                }
              }
            });
        }
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
    login(value) {
      if (!value) {
        this.$store.commit("MainLayout/login", false);
        this.$router.replace("/login");
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      //夜间模式
      if (localStorage.getItem("dark-mode") == true) {
        vm.$q.dark.set(true);
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
