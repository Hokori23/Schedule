<template>
  <q-layout view="hHh LpR fFf" class="mainLayout">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <!--  Animation -->
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <q-btn flat round :icon="leftTopIcon.icon" @click="leftTopIconClick()" />
        </transition>

        <q-toolbar-title>{{title}}</q-toolbar-title>

        <!-- SORT Animation -->
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <q-btn
            flat
            round
            :icon="rightTopIcon3.icon"
            v-if="rightTopIcon3.display"
            @click="subjectSort"
          />
        </transition>

        <!-- ADD Animation -->
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <q-btn
            flat
            round
            :icon="rightTopIcon2.icon"
            v-if="rightTopIcon2.display"
            @click="rightTopIconClick"
          />
        </transition>

        <!-- MORE Animation -->
        <!-- <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <q-btn flat round :icon="rightTopIcon.icon" v-if="rightTopIcon.display" />
        </transition>-->
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

        <!-- 用户目录 -->
        <q-item
          clickable
          v-ripple
          :active="path === '/userlist'"
          @click="to('/userlist')"
          class="drawer-item"
          active-class="text-primary shadow-transition shadow-24 inset-shadow hoverable"
        >
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>

          <q-item-section>{{$t('location.userList')}}</q-item-section>
        </q-item>

        <!-- 管理员中心 -->
        <q-item
          clickable
          v-ripple
          :active="path === '/admin'"
          @click="to('/admin')"
          class="drawer-item"
          active-class="text-primary shadow-transition shadow-24 inset-shadow hoverable"
          v-if="user&&user.power>0"
        >
          <q-item-section avatar>
            <q-icon name="build" />
          </q-item-section>

          <q-item-section>{{$t('location.adminCenter')}}</q-item-section>
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
    rightTopIcon2() {
      return this.$store.state.MainLayout.rightTopIcon2;
    },
    rightTopIcon3() {
      return this.$store.state.MainLayout.rightTopIcon3;
    },
    leftTopIcon() {
      return this.$store.state.MainLayout.leftTopIcon;
    },
    refreshState() {
      return this.$store.state.MainLayout.refreshState;
    },
    user() {
      return this.$store.state.MainLayout.user;
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
      if (this.leftTopIcon.icon === "menu") {
        this.drawer = !this.drawer;
      } else if (this.leftTopIcon.icon === "arrow_back") {
        this.$routerBack(this);
      }
    },
    async rightTopIconClick() {
      //添加作业
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
            let res = await this.$store.dispatch("MainLayout/addAssignment", [
              assignment,
              this
            ]);
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
    },
    subjectSort() {
      let icon = this.$store.state.MainLayout.rightTopIcon3.icon;
      if (icon === "sort") {
        //顺序排序
        this.$store.commit("MainLayout/rightTopIcon3", {
          icon: "arrow_upward"
        });
        this.$store.commit("MainLayout/subjectSort", true);
      } else if (icon === "arrow_upward") {
        //降序排序
        this.$store.commit("MainLayout/rightTopIcon3", {
          icon: "arrow_downward"
        });
        this.$store.commit("MainLayout/subjectSort", false);
      } else {
        //不排序
        this.$store.commit("MainLayout/rightTopIcon3", {
          icon: "sort"
        });
        this.$store.commit("MainLayout/subjectSort", null);
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
  },
};
</script>
