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
          :dense="$q.screen.lt.sm"
          :options-dense="$q.screen.lt.sm"
          :label="$t('table.subject')"
        >
          <template v-slot:prepend>
            <q-icon name="assignment" />
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
          :dense="$q.screen.lt.sm"
          :options-dense="$q.screen.lt.sm"
        >
          <template v-slot:prepend>
            <q-icon name="message" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click.stop="assignment.info = ''" class="cursor-pointer" />
          </template>
        </q-input>

        <!-- 期限 -->
        <q-input
          v-model="proxy.deadLine"
          mask="####  年  ##  月  ##  日"
          fill-mask="_"
          unmasked-value
          :dense="$q.screen.lt.sm"
          :options-dense="$q.screen.lt.sm"
          input-class="q-px-md"
        >
          <template v-slot:before>
            <q-btn icon="event" round color="primary" :dense="$q.screen.lt.sm">
              <q-popup-proxy
                @before-show="updateDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="proxyDate">
                  <div class="row items-center justify-end q-gutter-sm">
                    <q-btn label="Cancel" color="primary" flat v-close-popup />
                    <q-btn label="OK" color="primary" flat @click="saveDate" v-close-popup />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-btn>
          </template>
        </q-input>
      </q-card-section>

      <!-- 按钮示例 -->
      <q-card-actions align="right">
        <q-btn color="primary" label="Cancel" @click="onCancelClick" flat />
        <q-btn color="primary" label="OK" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  name: "addAssignment",
  props: {
    subjects: Array
  },
  data() {
    return {
      assignment: {
        name: "",
        info: "",
        deadLine: 0 /** Number */
      },
      //DATE INPUT VALUE
      proxy: {
        deadLine: "" /** String */
      },
      /******日历选择器日期******/
      date: "" /** YYYY/MM/DD */,
      proxyDate: "" /** YYYY/MM/DD */
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
      console.log(this.assignment.deadLine);
    }
  },
  methods: {
    updateDateProxy() {
      this.proxyDate = this.date;
    },
    saveDate() {
      //处理和保存时间
      this.proxy.deadLine = this.proxyDate.replace("/", "");
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
      this.$emit("ok", this.assignment);
      // 或带有有效负载：this.$emit('ok', { ... })

      // 然后隐藏对话框
      this.hide();
    },

    onCancelClick() {
      // 我们只需要隐藏对话框
      this.hide();
    }
  },
  created() {
    this.$q.screen.setSizes({ sm: 330, md: 500, lg: 1000, xl: 2000 });

    //初始化时间
    let time = this.$formatTimeStamp();
    this.date = time.format1();
    this.proxy.deadLine = this.date.replace("/", "");
  }
};
</script>
<style lang="sass" scoped>
.add-section
  label,button
    margin: 10px 0
</style>
