<template>
  <section class="page column">
    <header class="row items-center no-wrap">
      <div>
        <q-btn icon="date_range" round color="primary" flat>
          <q-popup-proxy
            @before-show="updateDateProxy()"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date v-model="proxyDate" today-btn :events="events">
              <q-btn label="Cancel" color="primary" flat v-close-popup />
              <q-btn label="OK" color="primary" flat @click="saveDate()" v-close-popup />
            </q-date>
          </q-popup-proxy>
        </q-btn>
      </div>
      <div
        v-for="(n,index) in days"
        :key="'time-block-'+n"
        :timeStamp="getTimeStamp(index)"
        v-html="formatTimeStamp(index)"
      ></div>
    </header>
    <header
      class="row items-center no-wrap"
      v-for="subject in subjects"
      :key="subject.name"
      :class="headerClass(subject.type)"
    >
      <div
        class="text-white relative-position non-selectable cursor-pointer text-justify header-subject"
        v-ripple
        clickable
      >
        {{subject.name}}
        <q-inner-loading :showing="subjectState">
          <q-spinner-audio size="50px" color="primary" />
        </q-inner-loading>
      </div>
      <div
        v-for="(n,index) in days"
        :key="subject.name+'-'+n"
        :class="{'shadow-2':paintAssign(subject,index),'assign-block':paintAssign(subject,index)}"
      >
        <transition
          appear
          enter-active-class="animated zoomIn"
          leave-active-class="animated zoomOut"
        >
          <!-- Assign-Block HERE -->
          <div
            v-if="paintAssign(subject,index)"
            v-html="paintAssign(subject,index)"
            class="ellipsis-3-lines text-force-wrap q-px-md text-weight-bold"
          ></div>
        </transition>
      </div>
    </header>
    <q-inner-loading :showing="initState">
      <q-spinner-audio size="50px" color="primary" />
    </q-inner-loading>
  </section>
</template>
<script>
import languages from "quasar/lang/index.json";
const appLanguages = languages.filter(lang =>
  ["zh-hans", "en-us"].includes(lang.isoName)
);
export default {
  name: "home",
  computed: {
    headerClass() {
      return type => {
        let className = "";
        if (!type) {
          //选修课
          className = "subject-elective";
        } else if (type === 1) {
          //公共课
          className = "subject-general";
        } else {
          //专业课
          className = "subject-majory";
        }
        return className;
      };
    },
    formatTimeStamp() {
      return index => {
        //获取当前的floorTime对象
        let time = this.$formatTimeStamp(
          this.$timeStampFloor(Date.now() + index * this.$day)
        );
        return `<div>${time.month} / ${time.date}</div>
                <div>${time.day}</div>`;
      };
    },
    getTimeStamp() {
      return index => {
        //获取当前块的floorTime时间戳
        let time = this.$timeStampFloor(Date.now() + index * this.$day);
        return time;
      };
    },
    paintAssign() {
      return (subject, index) => {
        let length = this.data.length;
        for (let i = 0; i < this.data.length; i++) {
          let nowTimeStamp = this.getTimeStamp(index);
          let subjectTimeStamp = this.$timeStampFloor(this.data[i].deadLine);
          if (
            subjectTimeStamp === nowTimeStamp &&
            this.data[i].name === subject.name
          ) {
            return this.data[i].info;
          }
        }
        return "";
      };
    },
    days() {
      return this.$store.state.Setting.days;
    },
    refreshState() {
      return this.$store.state.MainLayout.refreshState;
    }
  },
  watch: {
    refreshState(val) {
      if (val) {
        this.init();
      }
    }
  },
  data() {
    return {
      subjectState: false,
      assignmentState: false,
      initState: false,
      /******日历选择器日期******/
      date: "",
      proxyDate: "",
      /******日历选择器高亮事件******/
      events: [],
      /******科目******/
      subjects: [{ name: this.$t("common.loading"), type: 0 }],
      data: [],
      cancelTokenArr: [],
    };
  },
  methods: {
    updateDateProxy() {
      this.proxyDate = this.date;
    },
    saveDate() {
      this.date = this.proxyDate;
    },
    init: async function() {
      if (this.initState || !this.$store.state.MainLayout.login) {
        return;
      }
      this.initState = true;
      /************* 初始化今日时间 *************/
      let dateObject = this.$formatTimeStamp(this.$timeStampFloor(Date.now()));
      this.date = this.proxyDate = dateObject.format1();

      /************* 获取所有科目 *************/
      try {
        this.subjects =
          (await this.$store.dispatch("MainLayout/getAllSubjects", this)) ||
          this.subjects;
      } catch (e) {
        this.$q.dialog({
          message: e.message
        });
      }
      /************* 处理数据转为events *************/
      let rowEvents = null;
      try {
        rowEvents =
          (await this.$store.dispatch("MainLayout/getAllAssignments", this)) ||
          [];
      } catch (e) {
        this.$q.dialog({
          message: e.message
        });
        rowEvents = [];
      }
      let arrEvents = [];
      let eventsLength = rowEvents.length;
      for (let i = 0; i < eventsLength; i++) {
        let date = this.$formatTimeStamp(rowEvents[i].deadLine).format1();
        arrEvents[arrEvents.length] = date;
      }
      this.events = arrEvents || this.events;

      /************* 获取指定时间戳前的所有作业 *************/
      try {
        this.data =
          (await this.$store.dispatch("MainLayout/getAssignmentsInPeriod", [
            this.days,
            this
          ])) || this.data;
      } catch (e) {
        this.$q.dialog({
          message: e.message
        });
      }
      this.initState = false;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(async vm => {
      vm.$store.commit("MainLayout/title", vm.$t("location.home"));
      vm.$store.commit("MainLayout/rightTopIcon", "add");
      // vm.$store.commit("MainLayout/leftTopIcon", "menu");
      vm.$store.commit("MainLayout/refreshIcon", "refresh");
      vm.init();
    });
  },
  beforeRouteLeave(to, from, next) {
    //清除ajax请求队列
    this.cancelTokenArr.forEach(source => {
      source.cancel("取消请求");
    });

    this.$store.commit("MainLayout/refreshIcon", "");
    next();
  },
  created: async function() {
    this.init();
  },
  mounted: async function() {
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
    // console.log(time.getDay())
    // let dealTime = new Date(
    //   time.getFullYear(),
    //   time.getMonth(),
    //   time.getDate()
    // );
    // this.$axios
    //   .post("/assignment", {
    //     name: "JavaWeb",
    //     info: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
    //     deadLine: Date.now() + this.$day*2
    //   })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     console.log(err.message);
    //   });
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
    // 查询作业
    // this.$axios.get('/assignment',{
    //   params:{
    //     name:'JavaWeb',
    //     startLine:1588882210855,
    //   }
    // }).then(res=>{
    //   console.log(res)
    // })
  }
};
</script>
<style lang="sass" scoped>
.page
  overflow: auto
  height: calc(100vh - 50px)

.row
  &:first-child
    user-select: none
    flex: 0 0 80px
    >div
      border-bottom: 1px solid #ccc
  &:not(:first-child)
    flex: 1 0 20vh
    min-height: 80px
    max-height: 130px
  &>div
    flex: 1 0 10vw
    height: 100%
    min-width: 50px
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center

@media screen and (max-width:767px)
  .row
    &>div
      flex: 1 0 25vw
      max-width: 80px
    &:not(:first-child)
      flex: 1 0 15vh

.subject-general
  .header-subject
    background-color: $primary

.subject-elective
  .header-subject
    background-color: $positive

.subject-majory
  .header-subject
    background-color: $warning

.assign-block
  background-color: $negative
  opacity: .9
  color: #fff
  letter-spacing: .5px
</style>
