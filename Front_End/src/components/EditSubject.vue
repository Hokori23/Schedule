<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-pa-sm">
      <!--
        ...内容
        ...使用q-card-section展现它?
      -->

      <q-card-section class="column edit-subject__section">
        <!-- Title -->
        <q-card-actions
          align="left"
          class="text-subtitle1 non-selectable text-primary"
        >{{$t('subject.addTitle')}}</q-card-actions>
      </q-card-section>

      <!-- 科目名 -->
      <q-input
        outlined
        v-model="newSubject.name"
        :label="$t('subject.self')"
        :dense="$q.screen.lt.xs"
        :options-dense="$q.screen.lt.xs"
        counter
        bottom-slots
        maxlength="30"
        autogrow
      >
        <template v-slot:prepend>
          <q-icon name="assignment" color="primary" />
        </template>
        <template v-slot:append>
          <q-icon name="close" @click.stop="newSubject.name = ''" class="cursor-pointer" />
        </template>
        <template v-slot:hint>{{$t('common.maxLength')}}</template>
      </q-input>

      <!-- 科目类型 -->
      <q-select
        outlined
        v-model="newSubject.type"
        :options="subjectTypeOptions"
        :dense="$q.screen.lt.xs"
        :options-dense="$q.screen.lt.xs"
        :label="$t('subject.category')"
      >
        <template v-slot:prepend>
          <q-icon name="assignment" color="primary" />
        </template>
      </q-select>

      <!-- 按钮示例 -->
      <q-card-actions align="right">
        <q-btn
          v-if="isEdit"
          color="negative"
          icon="delete"
          flat
          @click="remove"
          :loading="deleteState"
        />
        <q-btn color="primary" :label="$t('common.cancel')" @click="onCancelClick" />
        <q-btn
          color="primary"
          :label="$t('common.confirm')"
          @click="onOKClick"
          :loading="addState"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  name: "editSubject",
  data() {
    return {
      deleteState: false,
      addState: false,
      newSubject: {
        name: "",
        type: "",
      },
      subjectTypeOptions: [
        { label: "选修课", value: 0 },
        { label: "公共课", value: 1 },
        { label: "专业课", value: 2 },
      ],
    };
  },
  props: {
    subject: Object,
    isEdit: Boolean,
  },
  methods: {
    remove() {
      this.$q
        .dialog({
          title: this.$t("common.alert"),
          message: this.$t("common.deleteConfirm"),
          ok: this.$t("common.confirm"),
          cancel: this.$t("common.cancel"),
        })
        .onOk(() => {
          this.deleteState = true;
          this.$emit("ok", {
            subject: {
              name: this.newSubject.name,
              type: this.newSubject.type.value,
            },
            vm: this,
            remove: true,
          });
        });
    },
    show() {
      this.$refs.dialog.show();
    },
    hide() {
      this.$refs.dialog.hide();
    },

    onDialogHide() {
      this.$emit("hide");
    },

    onOKClick() {
      if (this.addState) {
        return;
      }
      this.addState = true;
      this.$emit("ok", {
        subject: {
          name: this.newSubject.name,
          type: this.newSubject.type.value,
          oldname: this.subject && this.subject.name || '',
        },
        vm: this,
      });
      // 或带有有效负载：this.$emit('ok', { ... })
    },

    onCancelClick() {
      this.hide();
    },
  },
  mounted() {
    if (this.isEdit) {
      this.newSubject = JSON.parse(JSON.stringify(this.subject));
      this.subjectTypeOptions.map((val) => {
        if (val.value == this.newSubject.type) {
          this.newSubject.type = JSON.parse(JSON.stringify(val));
        }
      });
    }
  },
};
</script>

<style lang="sass" scoped>
.edit-subject__section
label,button
    margin: 10px 0
</style>
