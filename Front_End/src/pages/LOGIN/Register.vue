<template>
  <q-page>
    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      animated
      header-nav
      keep-alive
      swipeable
      :contracted="$q.screen.lt.md"
      class="stepper"
    >
      <!-- Step 1 -->
      <q-step
        :name="1"
        :title="$t('login.registerAnnounceTitle')"
        icon="message"
        :done="step > 1"
        class="register-box"
      >
        <div>
          <q-chat-message
            name="Hokori"
            avatar="https://hokori.online/image/profile.jpg"
            :text="[$t('login.registerAnnouncement3')]"
            size="10"
            text-color="white"
            bg-color="primary"
            style="white-space:pre-wrap"
            class="q-mb-md"
          />
          <q-chat-message
            name="Hokori"
            avatar="https://hokori.online/image/profile.jpg"
            :text="[$t('login.registerAnnouncement1')]"
            :stamp="$t('login.registerAnnounceTitle')"
            size="10"
            text-color="white"
            bg-color="primary"
            class="q-mb-md"
          />
          <q-chat-message
            hoverable
            name="Hokori"
            avatar="https://hokori.online/image/profile.jpg"
            :text="[$t('login.registerAnnouncement2')]"
            size="10"
            text-color="white"
            bg-color="primary"
            style="cursor:pointer;white-space:pre-wrap"
            @click="toBlog()"
          />
        </div>
      </q-step>

      <!-- Step 2 -->
      <q-step :name="2" title="Register format" icon="assignment" :done="step > 2" class="register-box">
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
        >
          <template v-slot:prepend>
            <q-icon name="account_circle" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click="info.account = ''" class="cursor-pointer" />
          </template>
        </q-input>
        <!-- 昵称 -->
        <q-input
          bottom-slots
          v-model="info.name"
          :label="$t('login.nickName')"
          :error-message="text.name"
          ref="nameInput"
          :error="!valid.name"
          @focus="clear('name')"
          @clear="clear('name')"
        >
          <template v-slot:prepend>
            <q-icon name="chrome_reader_mode" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click="info.name = ''" class="cursor-pointer" />
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
          :type="isPwd ? 'password' : 'text'"
        >
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click="info.password = ''" class="cursor-pointer" />
          </template>
        </q-input>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation class="navigation">
          <q-btn
            @click="next()"
            color="primary"
            :label="step === 2 ? $t('common.finish') : $t('common.continue')"
          />
          <q-btn
            flat
            color="primary"
            @click="step>1?$refs.stepper.previous():$router.back()"
            :label="$t('common.back')"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </q-page>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      step: 1,
      info: {
        account: "",
        name: "",
        password: ""
      },
      valid: {
        account: true,
        name: true,
        password: true
      },
      text: {
        account: this.$t("login.accountErr"),
        name: this.$t("login.nickNameErr"),
        password: this.$t("login.passwordErr")
      },
      registerState: false,
      isPwd: true,
      cancelTokenArr: []
    };
  },
  methods: {
    toBlog() {
      location.href = "https://hokori.online";
    },
    clear(value) {
      this.valid[value] = true;
    },
    async next() {
      if (this.step === 1) {
        this.$refs.stepper.next();
      } else if (this.step === 2) {
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
        if (!this.info.name) {
          this.text.name = this.$t("login.nickNameErr");
          this.valid.name = false;
          flag = false;
        }
        if (flag) {
          try {
            await this.$store.dispatch("LoginLayout/register", this);
            let res = await this.$store.dispatch("LoginLayout/login", this);
            this.$store.commit("MainLayout/user", res.data.data[0]);
            this.$router.push("/");
          } catch (e) {
            if (e.errcode === 2) {
              e.message = this.$t("login.accountExisted");
            }
            this.$q.dialog({
              message: e.message,
              title: this.$t("common.alert"),
              ok: this.$t("common.confirm")
            });
          }
        }
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$emit("header", true);
      vm.$store.commit("LoginLayout/titleText", vm.$t("login.register"));
    });
  }
};
</script>

<style lang="sass" scoped>
.q-page
  width: 100%

.stepper
  min-height: calc(100vh - 50px)
  box-sizing: border-box
  padding-bottom: 55px
  position: relative
  width: 100%

.navigation
  position: absolute
  bottom: 0
  right: 0
  display: flex
  flex-direction: row-reverse
  button.q-btn
    margin: 0 5px

.register-box
  display: flex
  justify-content: center
  overflow: hidden
  label
    width: 80vw
    max-width: 300px
</style>
