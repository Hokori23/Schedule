<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-pa-sm">
      <!--
        ...内容
        ...使用q-card-section展现它?
      -->

      <q-card-section class="column add-section">
        <!-- Title -->
        <q-card-actions
          align="left"
          class="text-subtitle1 non-selectable text-primary"
        >{{$t('assignment.addInfo')}}</q-card-actions>
        <!-- 科目名 -->
        <q-select
          outlined
          v-model="assignment.name"
          :options="subjects"
          :dense="$q.screen.lt.xs"
          :options-dense="$q.screen.lt.xs"
          :label="$t('table.subject')"
        >
          <template v-slot:prepend>
            <q-icon name="assignment" color="primary" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click.stop="assignment.name = ''" class="cursor-pointer" />
          </template>
        </q-select>

        <!-- 作业信息 -->
        <q-input
          outlined
          v-model="assignment.info"
          :label="$t('table.assignment')"
          :dense="$q.screen.lt.xs"
          :options-dense="$q.screen.lt.xs"
          input-style="min-height:100px;"
          counter
          bottom-slots
          maxlength="1450"
          autogrow
        >
          <template v-slot:prepend>
            <q-icon name="message" color="primary" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click.stop="assignment.info = ''" class="cursor-pointer" />
          </template>
          <template v-slot:hint>{{$t('common.maxLength')}}</template>
        </q-input>

        <!-- 期限 -->
        <q-item class="q-mb-sm non-selectable">
          <q-item-section avatar>
            <q-btn icon="event" round color="primary" :dense="$q.screen.lt.xs">
              <q-popup-proxy
                @before-show="updateDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="proxyDate" :minimal="$q.screen.lt.sm">
                  <div class="row items-center justify-end q-gutter-sm">
                    <q-btn label="Cancel" color="primary" flat v-close-popup />
                    <q-btn label="OK" color="primary" flat @click="saveDate" v-close-popup />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-btn>
          </q-item-section>
          <q-item-section>
            <q-item-label overline class="text-primary">{{$t('assignment.deadLine')}}</q-item-label>
            <q-item-label>{{date}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>

      <!-- 按钮组 -->
      <q-card-actions align="right">
        <q-btn color="primary" label="Cancel" @click="onCancelClick" flat />
        <q-btn color="primary" label="OK" @click="onOKClick" :loading="submitState" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  name: "addAssignment",
  props: {
    subjects: Array,
    time: Number, //决定是否为直接添加模式
    subject: String
  },
  data() {
    return {
      assignment: {
        name: this.subject || "",
        info: "",
        deadLine: 0 /** Number */
      },
      /******日历选择器日期******/
      date: "" /** YYYY/MM/DD */,
      proxyDate: "" /** YYYY/MM/DD */,
      submitState: false
    };
  },
  watch: {
    proxy: {
      handler(val) {
        if (val.deadLine.length === 8) {
          //处理和保存时间
          const YEAR = val.deadLine.substr(0, 4);
          const MONTH = val.deadLine.substr(4, 2);
          const DAY = val.deadLine.substr(6, 2);
          this.date = `${YEAR}/${MONTH}/${DAY}`;
        }
      },
      deep: true
    },
    date(val) {
      //传进值为'YYYY/MM/DD'
      //将其处理成时间戳
      this.assignment.deadLine = new Date(val).getTime();
    }
  },
  methods: {
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
      this.$emit("ok", { assignment: this.assignment, vm: this });
      // 或带有有效负载：this.$emit('ok', { ... })
    },

    onCancelClick() {
      // 我们只需要隐藏对话框
      this.hide();
    }
  },
  created() {
    //初始化时间
    let time = this.$formatTimeStamp(this.time || null);
    this.date = time.format1();
  }
};
</script>
<style lang="sass" scoped>
.add-section
  label,button
    margin: 10px 0
</style>
