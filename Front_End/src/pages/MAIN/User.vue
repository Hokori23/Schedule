<template>
  <section class="page">
    <q-list class="list-container non-selectable" bordered>
      <q-item-label header>{{$t('location.user')}}</q-item-label>

      <!-- 昵称 -->
      <q-item clickable v-ripple @click="editNickName">
        <q-item-section avatar>
          <q-icon name="chrome_reader_mode" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{$t('login.nickName')}}</q-item-label>
        </q-item-section>
        <q-item-section class="text-primary text-weight-bold">
          <q-item-label>{{user.name}}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="create" color="grey" />
        </q-item-section>
      </q-item>

      <!-- ID -->
      <q-item class="cursor-not-allowed light-dimmed">
        <q-item-section avatar>
          <q-icon name="account_circle" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{$t('login.account')}}</q-item-label>
        </q-item-section>
        <q-item-section class="text-primary text-weight-bold" side>
          <q-item-label>{{user.id}}</q-item-label>
        </q-item-section>
      </q-item>

      <!-- 创建时间 -->
      <q-item class="cursor-not-allowed light-dimmed">
        <q-item-section avatar>
          <q-icon name="add" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{$t('user.createdTime')}}</q-item-label>
        </q-item-section>
        <q-item-section class="text-primary text-weight-bold" side>
          <q-item-label>{{$formatTimeStamp(user.createdTime).format1()}}</q-item-label>
        </q-item-section>
      </q-item>

      <!-- 最后活跃时间 -->
      <q-item class="cursor-not-allowed light-dimmed">
        <q-item-section avatar>
          <q-icon name="access_time" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{$t('user.activatedTime')}}</q-item-label>
        </q-item-section>
        <q-item-section class="text-primary text-weight-bold" side>
          <q-item-label>{{$formatTimeStamp(user.activatedTime).format1()}}</q-item-label>
        </q-item-section>
      </q-item>

      <!-- 注销 -->
      <q-item clickable v-ripple @click="cancelAccount">
        <q-item-section avatar>
          <q-icon name="delete_forever" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{$t('user.delete')}}</q-item-label>
        </q-item-section>
      </q-item>

      <!-- 退出登录 -->
      <q-item clickable v-ripple @click="logOut">
        <q-item-section avatar>
          <q-icon name="exit_to_app" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{$t('user.logOut')}}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </section>
</template>
<script>
export default {
  name: "user",
  computed: {
    user() {
      return this.$store.state.MainLayout.user;
    }
  },
  methods: {
    editNickName() {
      this.$q
        .dialog({
          title: this.$t("common.edit"),
          message: this.$t("user.editMsg"),
          prompt: {
            model: this.user.name,
            type: "text"
          },
          cancel: true
        })
        .onOk(async data => {
          if (data !== this.user.name) {
            try {
              let res = await this.$store.dispatch("MainLayout/editSelf", [
                data,
                this
              ]);
              this.$dealWithSuccess(this, res.data);
            } catch (e) {
              this.$dealWithError(this, e);
            }
          }
        });
    },
    cancelAccount() {
      this.$q
        .dialog({
          title: this.$t("user.delete"),
          message: this.$t("user.deleteMsg"),
          prompt: {
            type: "password"
          },
          cancel: true
        })
        .onOk(async data => {
          if (data) {
            try {
              let res = awaitthis.$store.dispatch("MainLayout/deleteSelf", [
                data,
                this
              ]);
              this.$dealWithSuccess(this, res.data);
            } catch (e) {
              this.$dealWithError(this, e);
            }
          }
        });
    },
    logOut() {
      this.$q
        .dialog({
          title: this.$t("common.alert"),
          message: this.$t("user.logOutConfirm"),
          cancel: true
        })
        .onOk(() => {
          this.$store.commit("MainLayout/login", false);
        });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 未登录
      if (!Number(localStorage.getItem("login"))) {
        let flag = 0;
        vm.$q
          .dialog({
            message: vm.$t("user.notLogin"),
            ok: vm.$t("user.suggestToLogin"),
            cancel: vm.$t("common.cancel")
          })
          .onOk(() => {
            flag = 1;
            vm.$router.push("/login");
          })
          .onDismiss(() => {
            if (!flag) {
              vm.$router.push(from.path);
            }
          });
      } else {
        // 已登录
        vm.$store.commit("MainLayout/title", vm.$t("location.user"));
        try {
          vm.$store.dispatch("MainLayout/getSelf", vm);
        } catch (e) {
          vm.$dealWithError(vm, e);
        }
      }
    });
  }
};
</script>
<style lang="sass" scoped>
</style>
