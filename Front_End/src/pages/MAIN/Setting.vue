<template>
  <section class="page">
    <q-list class='list-container' bordered>
      <!-- 语言设置 -->
      <q-item-label header>{{$t('setting.language')}}</q-item-label>

      <q-item
        clickable
        v-ripple
        :active="lang === 'zh-hans'"
        @click="changeLang('zh-hans')"
        active-class="text-primary text-weight-bold"
      >
        <q-item-section>中文(简体)</q-item-section>
      </q-item>
      <q-item
        clickable
        v-ripple
        :active="lang === 'en-us'"
        @click="changeLang('en-us')"
        active-class="text-primary text-weight-bold"
        class="q-mb-md"
      >
        <q-item-section>English (US)</q-item-section>
      </q-item>

      <q-separator />

      <!-- 作业表设置 -->
      <q-item-label header>{{$t('setting.assignment')}}</q-item-label>

      <q-item-label class="q-mx-lg">
        <q-badge color="accent" class="q-px-md q-py-sm">{{$t('setting.days')}}: {{assign.days}}</q-badge>
      </q-item-label>
      <q-item class="q-mx-md">
        <q-item-section>
          <q-slider v-model="assign.days" :min="7" :max="21" />
        </q-item-section>
      </q-item>


      <q-separator class='q-my-xs'/>

      <!-- 更多 -->
      <q-item-label header>{{$t('common.more')}}</q-item-label>

      <!-- 夜间模式 -->
      <q-item v-ripple @click="changeDark" clickable>
        <q-item-section avatar>
          <q-icon :name="darkIcon" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{$t('setting.darkMode')}}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle color="secondary" v-model="dark" val="dark-mode" />
        </q-item-section>
      </q-item>
    </q-list>
  </section>
</template>
<script>
import { debounce } from "quasar";
export default {
  name: "setting",
  computed: {
    darkIcon() {
      if (this.dark) {
        return "brightness_2";
      }
      return "brightness_5";
    },
    lang() {
      return this.$i18n.locale;
    }
  },
  data() {
    return {
      //once
      dark: this.$store.state.Setting.dark,
      assign: {
        days: this.$store.state.Setting.days,
        daysTimer: null
      }
    };
  },
  methods: {
    changeLang(value) {
      this.$store.commit("Setting/lang", [value, this]);
    },
    changeDark() {
      this.dark = !this.dark;
    },
    changeDays(value) {
      this.$store.commit("Setting/days", value);
    }
  },
  watch: {
    dark(val) {
      this.$store.commit("Setting/dark", [this.dark, this]);
    },
    assign: {
      handler(val) {
        this.changeDays(val.days);
      },
      deep: true
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.commit("MainLayout/title", vm.$t("location.setting"));
    });
  },
  created() {
    this.changeDays = debounce(this.changeDays, 300);
    let dateObject = this.$formatTimeStamp(this.$timeStampFloor(Date.now()));
    this.date = dateObject.format1();
  }
};
</script>
<style scoped>
</style>
