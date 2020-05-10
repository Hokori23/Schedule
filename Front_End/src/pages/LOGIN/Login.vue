<template>
  <q-page class="column items-center q-page" :class="{ init: init }">
    <div class="banner justify-center row items-end">
      <q-avatar :class="{ 'shadow-3': init, 'shadow-10': !init }" class="avatar">
        <img src="../../statics/icons/icon-128x128.png" />
      </q-avatar>
    </div>

    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <!-- 输入框 -->
      <div class="input items-center column justify-between" v-show="init">
        <div class="loginAbout items-center column">
          <!-- 账号或邮箱 -->
          <q-input
            bottom-slots
            v-model="info.account"
            :label="$t('login.account')"
            :error-message="text.account"
            ref="accountInput"
            :error="!valid.account"
            @focus="clear('account')"
            @clear="clear('account')"
            class="login-input"
          >
            <template v-slot:prepend>
              <q-icon name="account_circle" />
            </template>
            <template v-slot:append>
              <q-icon name="close" @click="info.account = ''" class="cursor-pointer" />
            </template>
          </q-input>

          <!-- 密码 -->
          <q-input
            bottom-slots
            v-model="info.password"
            :label="$t('login.password')"
            :error-message="text.password"
            ref="passwordInput"
            :error="!valid.password"
            @focus="clear('password')"
            @clear="clear('password')"
            class="login-input"
            :type="isPwd ? 'password' : 'text'"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                name="close"
                @click="info.password = ''"
                :class="{'cursor-pointer':true,'invisible':info.password===''}"
              />
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <!-- 忘记密码 -->
          <q-btn
            flat
            color="primary"
            :label="$t('login.forgot')"
            class="self-end q-px-sm"
            dense
            @click="$router.push('/login/forgot')"
          />
          <!-- 登录 -->
          <q-btn
            color="primary"
            :label="$t('login.login')"
            rounded
            unelevated
            style="width:50vw;max-width:200px"
            class="q-mt-md"
            @click="login()"
          />
        </div>

        <!-- 注册 -->
        <div class="register">
          <div class="row self-center register--box justify-center">
            <div class="column justify-center">{{ $t('login.noAccountYet') }}</div>
            <q-btn
              color="primary"
              :label="$t('login.register')"
              dense
              class="q-mx-xs q-px-sm"
              flat
              @click="$router.push('/login/register')"
            />

            <q-btn round color="primary" icon="g_translate" class="lang" dense>
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup @click="changeLang('zh-hans')">
                    <q-item-section>中文(简体)</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="changeLang('en-us')">
                    <q-item-section>English (US)</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </div>
    </transition>
  </q-page>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      info: {
        account: "",
        password: ""
      },
      init: false,
      valid: {
        account: true,
        password: true
      },
      text: {
        account: this.$t("login.accountErr"),
        password: this.$t("login.passwordErr")
      },
      loginState: false,
      isPwd: true,
    };
  },
  methods: {
    async login() {
      let flag = true;
      if (!this.info.account) {
        this.text.account = this.$t("login.accountErr");
        this.valid.account = false;
        flag = false;
      }
      if (!this.info.password) {
        this.text.password = this.$t("login.passwordErr");
        this.valid.password = false;
        flag = false;
      }
      if (flag && !this.loginState) {
        //登录
        try {
          let res = await this.$store.dispatch("LoginLayout/login", this);
          this.$store.commit("MainLayout/user",res.data.data[0]);
          this.$router.push("/");
        } catch (e) {
          if (e.errcode === 2) {
            e.message = this.$t("login.accountWrong");
          } else if (e.errcode === 3) {
            e.message = this.$t("login.passwordWrong");
          }
          this.$q.dialog({
            message: e.message,
            title: this.$t("common.alert"),
            ok:this.$t('common.confirm'),
            cancel:this.$t('common.cancel')
          });
        }
      }
    },
    clear(value) {
      this.valid[value] = true;
    },
    changeLang(value) {
      this.$store.commit("Setting/lang", [value, this]);
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$emit("header", false);
    });
  },
  mounted() {
    (function(vm) {
      setTimeout(() => {
        vm.init = true;
      }, 1500);
    })(this);
  }
};
</script>

<style lang="sass" scoped>
.q-page
  width: 100%
  overflow: hidden

  .avatar
    width: 80px
    height: 80px
    transform: scale(1.5) translateY(45%)
    transition: transform .2s ease-out, box-shadow .5s
    animation: 1s bound forwards
    animation-delay: .7s
    z-index: 999

  .banner
    width: 100%
    height: 80vh
    margin-bottom: 54px
    position: relative
    transition: height .2s ease-out
    animation: 1s spread forwards
    animation-delay: .5s
    background-image: url(../../statics/18.jpg)
    background-size: 100% auto

  .banner::after
    content: ''
    bottom: 0
    height: 25vh
    z-index: 1
    width: 115%
    position: absolute
    left: 50%
    transform: translateX(-50%)
    border-radius: 0 0 50% 50%
    background-color: transparent
    box-shadow: 0 2020px 0 2000px #ffffff

  &.init
    .avatar
      animation: none
      transform: scale(1) translateY(25%)
    .banner
      animation: none
      height: 25vh
      margin-bottom: 20px

  .input
    width: 100%
    z-index: 999
    height: calc(75vh - 20px)

  .register
    justify-items: flex-end
    margin-bottom: 24px

    .register--box
      position: relative
      height: 100%
      width: 100%

      .lang
        position: absolute
        right: 0
        bottom: 0
        transform: translateX(100%)

  @keyframes bound
    0%
      transform: scale(1.5) translateY(45%)

    50%
      transform: scale(1) translateY(50%)

    100%
      transform: scale(1) translateY(25%)

  @keyframes spread

    0%
      height: 80vh
      margin-bottom: 54px

    15%
      height: 85vh

    70%
      height: 20vh

    100%
      height: 25vh
      margin-bottom: 20px

  .login-input
    width: 35vh
    max-width: 300px
</style>
