<template>
  <q-page class="scroll relative-position" style="height:calc(100vh - 50px)">
    <q-pull-to-refresh @refresh="init">
      <!-- <section
      class="page column no-wrap q-pb-xs"
      v-touch-pan.horizontal.prevent.mouse="drag"
      ref="homeContainer"
      >-->
      <section
        class="page column no-wrap q-pb-xs"
        ref="homeContainer"
        style="height:auto;overflow-y:auto;min-height:calc(100vh - 50px)"
      >
        <!-- 第一行：时间 -->
        <header class="row items-center no-wrap">
          <div>
            <q-btn icon="date_range" round color="primary" flat>
              <q-popup-proxy
                @before-show="updateDateProxy()"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="proxyDate"
                  today-btn
                  :events="events"
                  :minimal="$q.screen.lt.md"
                  class="relative-position"
                >
                  <q-btn label="Cancel" color="primary" flat v-close-popup />
                  <q-btn label="OK" color="primary" flat @click="saveDate()" v-close-popup />

                  <!-- 内部加载 -->
                  <q-inner-loading :showing="eventState">
                    <!-- <q-spinner-gears size="50px" color="primary" /> -->
                    <q-spinner-oval color="primary" size="2em" />
                  </q-inner-loading>
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
          <!-- 科目名 -->
          <div
            class="non-selectable header-subject relative-position q-px-sm shadow-10"
            :class="{'dimmed':$q.dark.mode}"
          >
            <div class="text-center text-white ellipsis-3-lines">{{subject.name}}</div>
            <q-inner-loading :showing="subjectState">
              <q-spinner-audio size="50px" color="primary" />
            </q-inner-loading>
          </div>
          <!-- Assign-Blcok Container HERE -->
          <div
            v-for="(n,index) in days"
            :key="subject.name+'-'+n"
            class="relative-position non-selectable cursor-pointer"
            v-ripple
            :class="{'shadow-2':paintAssign(subject,index),'assign-block':paintAssign(subject,index),'dimmed':$q.dark.mode}"
            @click="getDetail(paintAssign(subject,index),subject,index)"
          >
            <transition
              appear
              enter-active-class="animated zoomIn"
              leave-active-class="animated zoomOut"
              mode="out-in"
            >
              <!-- Assign-Block HERE -->
              <div
                v-if="paintAssign(subject,index)"
                v-html="data[Number(paintAssign(subject,index))].info"
                class="ellipsis-3-lines text-force-wrap q-px-sm text-weight-bold"
                key="assignment"
              ></div>
              <div v-else key="blank">
                <q-icon size="sm" name="add" color="grey" :class="{'blank__light-dimmed':!$q.dark.mode}" />
              </div>
            </transition>
            <transition
              appear
              enter-active-class="animated zoomIn"
              leave-active-class="animated zoomOut"
              mode="out-in"
            ></transition>
          </div>
        </header>
        <!-- <q-inner-loading :showing="initState">
        <q-spinner-audio size="50px" color="primary" />
        </q-inner-loading>-->
      </section>
    </q-pull-to-refresh>
  </q-page>
</template>
<script>
import { debounce } from "quasar";
import AddAssignment from "components/AddAssignment";
import AssignmentDetail from "components/AssignmentDetail";
import languages from "quasar/lang/index.json";
import { CLIENT_RENEG_WINDOW } from "tls";
const appLanguages = languages.filter(lang =>
  ["zh-hans", "en-us"].includes(lang.isoName)
);
export default {
  name: "home",
  computed: {
    refreshState() {
      return this.$store.state.MainLayout.refreshState;
    },
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
          let subjectTimeStamp = this.$timeStampFloor(
            Number(this.data[i].deadLine)
          );
          if (
            subjectTimeStamp === nowTimeStamp &&
            this.data[i].name === subject.name
          ) {
            // return { info: this.data[i].info, flag: true, index: i };
            return String(i);
          }
        }
        // return { flag: false };
        return false;
      };
    },
    days() {
      return this.$store.state.Setting.days;
    },
    subjects() {
      let subjects = Array.prototype.slice.call(
        this.$store.state.MainLayout.subjects
      );
      if (!subjects.length) {
        subjects = [{ name: this.$t("common.loading"), type: 0 }];
      }

      if (this.subjectSort !== null && !this.subjectSort) {
        subjects.sort((a, b) => {
          return a.type - b.type;
        });
      } else if (this.subjectSort) {
        subjects.sort((a, b) => {
          return b.type - a.type;
        });
      }
      return subjects;
    },
    /**是否对科目排序 */
    subjectSort() {
      return this.$store.state.MainLayout.subjectSort;
    }
  },
  data() {
    return {
      subjectState: false,
      assignmentState: false,
      initState: false,
      /******日历选择器日期******/
      date: "" /** YYYY/MM/DD */,
      proxyDate: "" /** YYYY/MM/DD */,
      /******日历选择器高亮事件******/
      events: [],
      /** 日历事件加载状态 */
      eventState: false,
      data: [],
      cancelTokenArr: [],
      scrollLeft: 0
    };
  },
  methods: {
    // drag({ evt, ...info }) {
    //   this.$refs.homeContainer.scrollLeft =
    //     this.scrollLeft - info.offset.x / 15;
    //   this.setScrollLeft(this.$refs.homeContainer.scrollLeft);
    // },
    setScrollLeft(val) {
      this.scrollLeft = val;
    },
    refresh() {},
    async getDetail(index, subject, day) {
      if (index !== false) {
        //查看编辑
        this.$q
          .dialog({
            component: AssignmentDetail,
            parent: this,
            assignment: this.data[Number(index)],
            ok: this.$t("common.confirm"),
            cancel: this.$t("common.cancel")
          })
          .onOk(async ({ assignment, vm, oldDeadLine, remove }) => {
            //删除作业
            if (remove) {
              try {
                let res = await this.$store.dispatch(
                  "MainLayout/removeAssignment",
                  [assignment, vm]
                );
                await this.$store.dispatch("MainLayout/refreshAssignment", [
                  this
                ]);
              } catch (e) {
                this.$dealWithError(this, e);
              } finally {
                vm.deleteState = false;
                if (vm.hide) {
                  vm.hide();
                }
              }
              return;
            }

            //添加作业
            try {
              let res = await this.$store.dispatch(
                "MainLayout/editAssignment",
                [assignment, oldDeadLine, this]
              );
              await this.$store.dispatch("MainLayout/refreshAssignment", [
                this
              ]);
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
        return;
      }

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
          subject: subject.name,
          time: this.getTimeStamp(day),
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
            await this.$store.dispatch("MainLayout/refreshAssignment", [this]);
            this.$dealWithSuccess(this, res);
          } catch (e) {
            this.$dealWithError(this, e);
          } finally {
            vm.submitState = false;
            vm.hide();
          }
        });
    },
    updateDateProxy() {
      this.proxyDate = this.date;
      this.$store.dispatch("MainLayout/getEvents", this);
    },
    saveDate() {
      this.date = this.proxyDate;
    },
    init: function(done) {
      this.$store.dispatch("MainLayout/init", [this, done]);
    }
  },
  watch: {
    refreshState(val) {
      if (val) {
        this.init();
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(async vm => {
      vm.$store.commit("MainLayout/title", vm.$t("location.home"));
      vm.$store.commit("MainLayout/rightTopIcon", {
        display: true,
        icon: "more_vert"
      });
      vm.$store.commit("MainLayout/rightTopIcon2", {
        display: true,
        icon: "add"
      });
      vm.$store.commit("MainLayout/rightTopIcon3", {
        display: true
      });
      vm.init();
    });
  },
  beforeRouteLeave(to, from, next) {
    //清除ajax请求队列
    this.cancelTokenArr.forEach(source => {
      source.cancel("取消请求");
    });
    next();
  },
  created: async function() {
    // this.setScrollLeft = debounce(this.setScrollLeft, 50);
    this.init();
  }
};
</script>
<style lang="sass" scoped>
.page
  // overflow: auto
  height: calc(100vh - 50px)

.row
  &:first-child
    user-select: none
    flex: 0 0 80px
    height: 80px
    >div
      border-bottom: 1px solid #ccc
  &:not(:first-child)
    flex: 1 0 20vh
    height: 20vh
    min-height: 80px
    max-height: 130px
  &>div
    flex: 1 0 10vw
    width: 10vw
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
      height: 15vh

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

div.header-subject.dimmed::after,
div.assign-block.dimmed::after
  background: rgba(0, 0, 0, 0.2) !important

.blank__light-dimmed
  opacity: .4
</style>
