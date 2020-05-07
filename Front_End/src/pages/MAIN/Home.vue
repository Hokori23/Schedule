<template>
  <section class='q-pa-md'>
    <router-link to="/setting">Go to setting</router-link>
    <div>
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
      >
        <template v-slot:prepend>
          <q-icon name="lock" />
        </template>
        <template v-slot:append>
          <q-icon name="close" @click="info.password = ''" class="cursor-pointer" />
        </template>
      </q-input>
    <q-btn class="primary" @click="$router.push('/login')">返回登陆</q-btn>
    <q-btn class="primary" @click="edit()">修改信息</q-btn>
    </div>
  </section>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      welcome: "",
      back: false,
      info: {
        name: sessionStorage.getItem("name")
      },
      valid: {
        name: true,
        password: true
      },
      text: {
        name: this.$t("login.nickNameErr"),
        password: this.$t("login.passwordErr")
      }
    };
  },
  methods: {
    edit() {
      let flag = true;
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
        this.$axios
          .put("/user", {
            id: sessionStorage.getItem("id"),
            password: this.info.password,
            name: this.info.name
          })
          .then(res => {
            console.log(res)
            this.$q.dialog({
              message: res.data.message
            });
          })
          .catch(e => {
            this.$q.dialog({
              message: e.message
            });
          });
      }
    },
    clear(value) {
      this.valid[value] = true;
    },
  },
  mounted() {
    //注册
    // this.$axios
    //   .post("/user", {
    //     id: "test4",
    //     name: "Hokori4",
    //   })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(e => {
    //     console.log(e.message);
    //   });
    // //登录
    // this.$axios
    //   .get("/user", {
    //     params: {
    //       id: "524159845",
    //       password: "bnm19990412"
    //     }
    //   })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
    //查找
    // this.$axios
    //   .get("/user")
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
    //删除
    // this.$axios
    //   .delete("/user", {
    //     params: {
    //       id: "123125"
    //     }
    //   })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(e => {
    //     console.log(e.message);
    //   });
    //改
    // this.$axios
    //   .put("/user", {
    //       id: "524159845",
    //       name:'Natsuya'
    //   })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
    //添加科目
    // this.$axios({
    //     url:'/subject',
    //     method:'post',
    //     data:{
    //         name:'test',
    //         type:'0'
    //     }
    // }).then(res=>{
    //     console.log(res)
    // }).catch(err=>{
    //     console.log(err.message)
    // })
    // 删除科目
    // this.$axios
    //   .delete("/subject", {
    //     params: {
    //       name: "Chinese"
    //     }
    //   })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err.message);
    //   });
    //修改科目;
    // this.$axios
    //   .put("/subject", {
    //       name: "test2",
    //       type:0,
    //       oldname:'test'
    //   })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err.message);
    //   });
    // 查询科目;
    // this.$axios
    //   .get("/subject",{
    //     params:{
    //       name:'Math'
    //     }
    //   })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     console.log(err.message);
    //   });
    //添加作业
    // let time = new Date();
    // let dealTime = new Date(
    //   time.getFullYear(),
    //   time.getMonth(),
    //   time.getDate()
    // );
    this.$axios
      .post("/assignment", {
        name: "JavaWeb",
        info: "Java作业",
        deadLine: 1588089655555
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      });
    //编辑作业
    // this.$axios
    //   .put("/assignment", {
    //     name: "test",
    //     info: "edit",
    //     deadLine: dealTime.getTime()
    //   })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     console.log(err.message);
    //   });

    //删除作业
    // this.$axios
    //   .delete("/assignment", {
    //     params: {
    //       name: "test",
    //       deadLine: dealTime.getTime()
    //     }
    //   })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     console.log(err.message);
    //   });

    //查询作业
    // this.$axios.get('/assignment').then(res=>{
    //   console.log(res)
    // })
  }
};
</script>
<style scoped>
</style>
