<template>
  <section class="page" :bordered="!$q.screen.lt.md" style="width:100%;overflow:hidden">
    <q-page class="relative-position scroll" style="height:calc(100vh - 50px);width:100%">
      <q-pull-to-refresh @refresh="getData" class="relative-position" style="width:100%">
        <q-list class="list-container" :bordered="!$q.screen.lt.md">
          <!-- Title -->
          <q-item-label header>{{$t('subject.self')}}</q-item-label>
          <!-- 用户目录 -->
          <div v-if="!subjectState">
            <q-item
              v-for="(subject, index) in subjects"
              :key="`${subject}-${index}}`"
              clickable
              v-ripple
              @click="editSubject(subject)"
              :class="[`text-bold`, `text-${subjectTextClass(subject.type)}`]"
            >
              <q-item-section>
                <q-item-label lines="2">{{subject.name}}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="create" :color="subjectTextClass(subject.type)" />
              </q-item-section>
            </q-item>
          </div>
          <!-- 加载骨架 -->
          <div v-if="subjectState">
            <q-item v-for="n in 10" :key="n">
              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" width="60%" />
                </q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </q-list>
      </q-pull-to-refresh>
    </q-page>
  </section>
</template>

<script>
import EditSubject from "components/EditSubject";
export default {
  name: "admin",
  data() {
    return {
      subjectState: false,
      cancelTokenArr: [],
    };
  },
  computed: {
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
    },
  },
  methods: {
    async getData(done) {
      if (!this.subjectState) {
        try {
          let { data } = await this.$store.dispatch(
            "MainLayout/getAllSubjects",
            this
          );
        } catch (e) {
          this.$dealWithError(this, e);
        }
        done && done();
      }
    },
    subjectTextClass(type) {
      if (!type) {
        // 选修课
        return "primary";
      }
      if (type === 1) {
        // 公共课
        return "positive";
      }
      // 专业课
      return "warning";
    },
    editSubject(subject) {
      this.$q
        .dialog({
          component: EditSubject,
          parent: this,
          ok: this.$t("common.confirm"),
          cancel: this.$t("common.cancel"),
          subject: subject,
          isEdit: true,
        })
        .onOk(async ({ subject, vm, remove }) => {
          // 删除科目
          if (remove) {
            try {
              let res = await this.$store.dispatch(
                "MainLayout/removeSubject",
                subject
              );
              // 获取最新科目列表
              await this.$store.dispatch("MainLayout/getAllSubjects");
              this.$dealWithSuccess(this, res);
              if (vm.hide) {
                vm.hide();
              }
            } catch (e) {
              this.$dealWithError(this, e);
            } finally {
              vm.deleteState = false;
            }
            return;
          }

          // 修改科目
          try {
            /**
             * 修改******************
             */
            let res = await this.$store.dispatch(
              "MainLayout/editSubject",
              subject
            );
            // 获取最新科目列表
            await this.$store.dispatch("MainLayout/getAllSubjects");
            this.$dealWithSuccess(this, res);
            if (vm.hide) {
              vm.hide();
            }
          } catch (e) {
            this.$dealWithError(this, e);
          } finally {
            vm.addState = false;
          }
        });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getData();
      vm.$store.commit("MainLayout/title", vm.$t("location.adminCenter"));
      vm.$store.commit("MainLayout/rightTopIcon", {
        display: true,
        icon: "more_vert",
      });
      vm.$store.commit("MainLayout/rightTopIcon2", {
        display: true,
        icon: "add",
      });
      vm.$store.commit("MainLayout/rightTopIcon3", {
        display: true,
      });
    });
  },
  beforeRouteLeave(to, from, next) {
    //清除ajax请求队列
    this.cancelTokenArr.forEach((source) => {
      source.cancel("取消请求");
    });
    next();
  },
};
</script>

<style></style>
