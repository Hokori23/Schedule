<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-pa-sm">
      <!-- Title -->
      <q-card-actions
        align="left"
        class="text-subtitle1 non-selectable text-primary q-px-md"
      >{{$t('assignment.self')}}</q-card-actions>

      <q-list :dense="$q.screen.lt.sm" clickable>
        <!-- 科目名 -->
        <q-item class="non-selectable">
          <q-item-section avatar>
            <q-icon flat round color="primary" name="assignment" />
          </q-item-section>

          <q-item-section>
            <q-item-label overline class="text-primary">{{$t('table.subject')}}</q-item-label>
            <q-item-label>{{assignment.name}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator inset />

        <!-- 作业信息Banner -->
        <q-item class="q-pb-none">
          <q-item-section avatar>
            <q-icon flat round color="primary" name="message" />
          </q-item-section>
          <q-item-section>
            <q-item-label overline class="text-primary">{{$t('table.assignment')}}</q-item-label>
          </q-item-section>

          <q-item-section side style="padding-left:0">
            <q-btn flat rounded icon="create" color="grey"></q-btn>

            <q-popup-edit
              v-model="submitAssignment.info"
              :title="$t('common.edit')+$t('assignment.self')"
              buttons
              persistent
              fit
              anchor="center right"
              self="center middle"
              content-class="q-dialog-detail"
            >
              <q-input
                v-model="submitAssignment.info"
                :dense="$q.screen.lt.sm"
                autofocus
                counter
                input-class="q-px-md"
                type="textarea"
                @keyup.enter.stop
              >
                <template v-slot:append>
                  <q-icon name="edit" />
                </template>
              </q-input>
            </q-popup-edit>
          </q-item-section>
        </q-item>
        <!-- 作业信息 -->
        <q-item class="q-mb-sm q-pt-none">
          <q-item-section>
            <q-item-label style="word-break:break-all">{{submitAssignment.info}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator inset />

        <!-- 期限 -->
        <q-item class="q-my-sm">
          <q-item-section avatar>
            <q-icon flat round color="primary" name="event" />
          </q-item-section>

          <q-item-section>
            <q-item-label overline class="text-primary">{{$t('assignment.deadLine')}}</q-item-label>
            <q-item-label>{{date}}</q-item-label>
          </q-item-section>

          <q-item-section side style="padding-left:0">
            <q-btn flat rounded icon="create" color="grey" />
            <q-popup-proxy
              @before-show="updateDateProxy"
              transition-show="scale"
              transition-hide="scale"
              class="popup-container"
            >
              <q-date v-model="proxyDate" :minimal="$q.screen.lt.md">
                <div class="row items-center justify-end q-gutter-sm">
                  <q-btn label="Cancel" color="primary" flat v-close-popup />
                  <q-btn label="OK" color="primary" flat @click="saveDate" v-close-popup />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-item-section>
        </q-item>

        <q-separator inset />

        <!-- 最后修改时间 -->
        <q-item class="q-my-sm non-selectable">
          <q-item-section avatar>
            <q-icon flat round color="primary" name="access_time" />
          </q-item-section>

          <q-item-section>
            <q-item-label overline class="text-primary">{{$t('assignment.lastModified')}}</q-item-label>
            <q-item-label>{{lastModified}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <q-separator />
      <!-- 按钮组 -->
      <q-card-actions align="right" class="q-px-md q-mt-md">
        <q-btn color="negative" icon="delete" flat @click="remove" :loading="deleteState" />
        <q-btn color="primary" :label="$t('common.cancel')" @click="onCancelClick" flat />
        <q-btn
          color="primary"
          :label="$t('common.confirm')"
          @click="onOKClick"
          :loading="submitState"
          :disable="!isEdited"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  name: "assignmentDetail",
  computed: {
    isEdited() {
      let flag = false;
      for (let i in this.submitAssignment) {
        if (this.submitAssignment[i] !== this.assignment[i]) {
          flag = true;
          break;
        }
      }
      return flag;
    }
  },
  data() {
    return {
      /******日历选择器日期******/
      date: "" /** YYYY/MM/DD */,
      proxyDate: "" /** YYYY/MM/DD */,
      submitAssignment: {
        name: "",
        info: "",
        deadLine: 0
      },
      oldDeadLine: 0,
      lastModified: "" /** YYYY/MM/DD */,
      submitState: false,
      deleteState: false,
      initState: false
    };
  },
  watch: {
    date(val) {
      //传进值为'YYYY/MM/DD'
      //将其处理成时间戳
      if (!this.initState) {
        this.initState = true;
      }
      let time = (this.submitAssignment.deadLine = new Date(val).getTime());
    }
  },
  props: {
    assignment: Object
  },
  created() {
    //初始化时间
    let time = this.$formatTimeStamp(this.assignment.deadLine || null);
    this.date = time.format1();

    let lastModified = this.$formatTimeStamp(
      this.assignment.lastModified || null
    );
    this.lastModified = lastModified.format1();

    //初始化作业对象
    Object.assign(this.submitAssignment, this.assignment);
    this.oldDeadLine = this.assignment.deadLine;
  },
  methods: {
    remove() {
      this.$q
        .dialog({
          title: this.$t("common.alert"),
          message: this.$t("common.deleteConfirm"),
          ok: this.$t("common.confirm"),
          cancel: this.$t("common.cancel")
        })
        .onOk(() => {
          this.deleteState = true;
          this.$emit("ok", {
            assignment: {
              name: this.assignment.name,
              deadLine: this.assignment.deadLine
            },
            vm: this,
            remove: true
          });
        });
    },
    updateDateProxy() {
      this.proxyDate = this.date;
    },
    saveDate() {
      //处理和保存时间
      this.date = this.proxyDate;
    },
    // 以下方法是必需的
    // (不要改变它的名称 --> "show")
    show() {
      this.$refs.dialog.show();
    },

    // 以下方法是必需的
    // (不要改变它的名称 --> "hide")
    hide() {
      this.$refs.dialog.hide();
    },

    onDialogHide() {
      // QDialog发出“hide”事件时
      // 需要发出
      this.$emit("hide");
    },

    onOKClick() {
      // 按OK，在隐藏QDialog之前
      // 发出“ok”事件（带有可选的有效负载）
      // 是必需的
      this.submitState = true;
      this.$emit("ok", {
        assignment: this.submitAssignment,
        vm: this,
        oldDeadLine: this.oldDeadLine,
        remove: false
      });
      // 或带有有效负载：this.$emit('ok', { ... })
    },

    onCancelClick() {
      // 我们只需要隐藏对话框
      this.hide();
    }
  }
};
</script>
<style lang="sass">
.list--input__inner
  .q-field__control
    height: auto

.q-dialog-detail
  .q-dialog__title
    font-size: 1rem
</style>
