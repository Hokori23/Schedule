<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <!--
        ...内容
        ...使用q-card-section展现它?
      -->

      <q-card-section class='column'>
        <!-- 科目名 -->
        <q-select
          outlined
          v-model="assignment.name"
          :options="subjects"
          :dense="false"
          :options-dense="true"
        >
          <template v-slot:prepend>
            <q-icon name="assignment" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click.stop="assignment.name = ''" class="cursor-pointer" />
          </template>
        </q-select>

        <!-- 作业信息 -->
        <q-input outlined v-model="assignment.info" label="Outlined">
          <template v-slot:append>
            <q-icon name="close" @click.stop="assignment.info = ''" class="cursor-pointer" />
          </template>
        </q-input>

        <!-- 期限 -->
        <q-btn icon="event" round color="primary">
          <q-popup-proxy @before-show="updateDateProxy" transition-show="scale" transition-hide="scale">
            <q-date v-model="proxyDate">
              <div class="row items-center justify-end q-gutter-sm">
                <q-btn label="Cancel" color="primary" flat v-close-popup />
                <q-btn label="OK" color="primary" flat @click="saveDate" v-close-popup />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-btn>

      </q-card-section>

      <!-- 按钮示例 -->
      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
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
  computed:{
      // dateFormatted(){
      //   return this.$for
      // }
  },
  data() {
    return {
      assignment: {
        name: "",
        info: "",
        deadLine: 0
      },
      /******日历选择器日期******/
      date: "",
      proxyDate: "",
    };
  },
  methods: {
    updateDateProxy() {
      this.proxyDate = this.date;
    },
    saveDate() {
      this.date = this.proxyDate;
      console.log(new Date(this.date).getTime())
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
      this.$emit("ok", assignment);
      // 或带有有效负载：this.$emit('ok', { ... })

      // 然后隐藏对话框
      this.hide();
    },

    onCancelClick() {
      // 我们只需要隐藏对话框
      this.hide();
    }
  },
  mounted(){
    console.log(this.subjects)
  }
};
</script>
<style lang="sass" scoped>
</style>
