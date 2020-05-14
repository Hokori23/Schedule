<template>
  <section class="page single-day">
    <q-page class="relative-position scroll" style="height:calc(100vh - 50px);width:100%">
      <q-pull-to-refresh @refresh="getData" class="relative-position" style="width:100%">
        <!-- Content -->
        <q-banner class="bg-primary text-white non-selectable text-center">
          <div class="row" style="width:100%">
            <span class="text-h5" style="flex:auto">{{formatTime($route.params.time)}}</span>
            <q-btn
              icon="date_range"
              color="white"
              rounded
              flat
              :dense="$q.screen.lt.sm"
              :class="{'q-px-xs':$q.screen.lt.sm}"
            >
              <q-popup-proxy
                @before-show="updateDateProxy()"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="proxyDate"
                  today-btn
                  :events="events"
                  :minimal="$q.screen.lt.sm"
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
        </q-banner>

        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          mode="out-in"
        >
          <div v-if="!assignmentState">
            <q-splitter :value="20" style="min-height:calc(100vh - 104px)">
              <template v-slot:before>
                <q-tabs v-model="tab" vertical class="text-negative">
                  <q-tab
                    :name="subject.name"
                    v-for="subject in data"
                    :key="subject.name"
                    :label="subject.name"
                    style="height:15vh"
                  />
                </q-tabs>
              </template>

              <template v-slot:after>
                <q-tab-panels
                  v-model="tab"
                  animated
                  transition-prev="jump-up"
                  transition-next="jump-up"
                >
                  <q-tab-panel :name="subject.name" v-for="subject in data" :key="subject.name">
                    <div class="text-h5 q-my-sm text-primary row justify-between">
                      {{subject.name}}
                      <!-- 按钮组 -->
                      <q-btn-group rounded :flat="true">
                        <q-btn
                          icon="delete"
                          flat
                          color="negative"
                          @click="remove(subject)"
                          :loading="deleteState"
                          :dense="$q.screen.lt.sm"
                          :class="{'q-px-xs':$q.screen.lt.sm}"
                        />
                        <q-btn
                          icon="create"
                          flat
                          color="primary"
                          @click="editData(subject)"
                          :dense="$q.screen.lt.sm"
                          :class="{'q-px-xs':$q.screen.lt.sm}"
                        />
                      </q-btn-group>
                    </div>
                    <q-separator />
                    <p style="white-space:pre-wrap" class="q-mt-md">{{subject.info}}</p>
                    <div class="column items-end non-selectable">
                      <q-list>
                        <q-item>
                          <q-item-section side avatar>
                            <q-icon flat round color="primary" name="access_time" />
                          </q-item-section>
                          <q-item-section side>
                            <q-item-label
                              overline
                              class="text-primary"
                            >{{$t('assignment.lastModified')}}</q-item-label>
                            <q-item-label>{{formatTime(subject.lastModified)}}</q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item>
                          <q-item-section side avatar>
                            <q-icon flat round color="primary" name="account_circle" />
                          </q-item-section>
                          <q-item-section side>
                            <q-item-label overline class="text-primary">{{$t('assignment.author')}}</q-item-label>
                            <q-item-label>{{subject.author}}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </div>
                  </q-tab-panel>
                </q-tab-panels>
              </template>
            </q-splitter>
          </div>
          <div v-else>
            <q-splitter :value="20" style="min-height:calc(100vh - 104px)">
              <template v-slot:before>
                <q-tabs value="skeleton1" vertical class="text-negative">
                  <q-tab style="height:15vh" :name="'skeleton'+n" v-for="n in 4" :key="n">
                    <q-skeleton type="QBtn" height="14px" width="40px" />
                  </q-tab>
                </q-tabs>
              </template>

              <template v-slot:after>
                <q-tab-panels value="skeleton1">
                  <q-tab-panel :name="'skeleton'+n" v-for="n in 4" :key="n">
                    <div class="text-h5 q-my-sm text-primary row justify-between">
                      <q-skeleton type="text" height="29px" width="250px" />
                      <!-- 按钮组 -->
                      <q-btn-group rounded :flat="true">
                        <q-btn
                          icon="delete"
                          flat
                          color="negative"
                          :loading="true"
                          :dense="$q.screen.lt.sm"
                          :class="{'q-px-xs':$q.screen.lt.sm}"
                        />
                        <q-btn
                          icon="create"
                          flat
                          color="primary"
                          :loading="true"
                          :dense="$q.screen.lt.sm"
                          :class="{'q-px-xs':$q.screen.lt.sm}"
                        />
                      </q-btn-group>
                    </div>
                    <q-separator />
                    <p class="q-mt-md">
                      <q-skeleton type="text" width="50%" />
                    </p>
                    <p class="q-mt-md">
                      <q-skeleton type="text" width="80%" />
                    </p>
                    <p class="q-mt-md">
                      <q-skeleton type="text" width="60%" />
                    </p>
                    <div class="column items-end non-selectable">
                      <q-list>
                        <q-item>
                          <q-item-section side avatar>
                            <q-icon flat round color="primary" name="access_time" />
                          </q-item-section>
                          <q-item-section side>
                            <q-item-label
                              overline
                              class="text-primary"
                            >{{$t('assignment.lastModified')}}</q-item-label>
                            <q-item-label>
                              <q-skeleton type="text" width="100px" />
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item>
                          <q-item-section side avatar>
                            <q-icon flat round color="primary" name="account_circle" />
                          </q-item-section>
                          <q-item-section side>
                            <q-item-label overline class="text-primary">{{$t('assignment.author')}}</q-item-label>
                            <q-item-label>
                              <q-skeleton type="text" width="60px" />
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </div>
                  </q-tab-panel>
                </q-tab-panels>
              </template>
            </q-splitter>
          </div>
        </transition>
      </q-pull-to-refresh>
    </q-page>
  </section>
</template>
<script>
import AssignmentDetail from "components/AssignmentDetail";
export default {
  name: "singleDay",
  data() {
    return {
      assignmentState: false,
      deleteState: false,
      data: [],
      cancelTokenArr: [],
      tab: "",
      /******日历选择器日期******/
      date: "" /** YYYY/MM/DD */,
      proxyDate: "" /** YYYY/MM/DD */,
      /******日历选择器高亮事件******/
      events: [],
      /** 日历事件加载状态 */
      eventState: false
    };
  },
  computed: {
    formatTime() {
      return time => {
        return this.$formatTimeStamp(time).format1();
      };
    }
  },
  methods: {
    updateDateProxy() {
      this.proxyDate = this.date;
      this.$store.dispatch("MainLayout/getEvents", [this, true]);
    },
    saveDate() {
      this.date = this.proxyDate;
      const DATE = new Date(this.date);
      this.$route.params.time = DATE.getTime();
      this.getData();
      // this.$router.push('/day')
    },
    async getData(done) {
      if (!this.assignmentState) {
        let res = await this.$store.dispatch(
          "MainLayout/getAssignmentsInPeriod",
          [1, this, Number(this.$route.params.time), done]
        );
        this.data = res || this.data;
        this.tab = this.data[0].name;
      }
    },
    async editData(assignment, day) {
      this.$q
        .dialog({
          component: AssignmentDetail,
          parent: this,
          assignment: assignment,
          ok: this.$t("common.confirm"),
          cancel: this.$t("common.cancel")
        })
        .onOk(async ({ assignment, vm, oldDeadLine, remove }) => {
          //删除作业
          if (remove) {
            remove(assignment);
            return;
          }

          //添加作业
          try {
            let res = await this.$store.dispatch("MainLayout/editAssignment", [
              assignment,
              oldDeadLine,
              this
            ]);
            await this.getData();
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
    },
    async remove(assignment) {
      this.$q
        .dialog({
          title: this.$t("common.alert"),
          message: this.$t("common.deleteConfirm"),
          ok: this.$t("common.confirm"),
          cancel: this.$t("common.cancel")
        })
        .onOk(async () => {
          this.deleteState = true;
          try {
            let res = await this.$store.dispatch(
              "MainLayout/removeAssignment",
              [assignment, this]
            );
            this.$dealWithSuccess(this, res);
            await this.getData();
          } catch (e) {
            this.$dealWithError(this, e);
          } finally {
            this.deleteState = false;
          }
        });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getData();
      vm.date = vm.formatTime(vm.$route.params.time);
      vm.$store.commit("MainLayout/title", vm.$t("location.dayAssignment"));
      vm.$store.commit("MainLayout/leftTopIcon", { icon: "arrow_back" });
      vm.$store.commit("MainLayout/rightTopIcon", { display: false });
      vm.$store.commit("MainLayout/rightTopIcon2", { display: false });
      vm.$store.commit("MainLayout/rightTopIcon3", { display: false });
    });
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("MainLayout/leftTopIcon", { icon: "menu" });
    //清除ajax请求队列
    this.cancelTokenArr.forEach(source => {
      source.cancel("取消请求");
    });
    next();
  }
};
</script>
<style lang="sass">
.single-day
  .q-tab__label
    -webkit-line-clamp: 3
    overflow: hidden
    display: -webkit-box
    -webkit-box-orient: vertical
    text-align: center
    white-space: pre-wrap
    word-break: break-all
    text-transform: capitalize
</style>
