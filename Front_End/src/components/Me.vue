<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin about-content" flat bordered>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="me" icon="account_circle" label="Me" />
        <q-tab name="project" icon="description" label="Project" />
        <!-- <q-tab name="account_circle" label="Movies" /> -->
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <!-- Me -->
        <q-tab-panel name="me">
          <q-card flat>
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <img src="statics/icons/favicon-128x128.png" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>Hokori</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator />

            <q-card-section :class="{'q-pa-none':$q.screen.lt.sm,'q-pt-sm':$q.screen.lt.sm}">
              <p>这是一个简单的小项目，主要用来记录我的作业，以及满足自己想要一个完整的个人项目的愿望</p>
              <p>虽然我可能以后不会怎么做作业了（？），所以最终很可能演变成一个Deadline表（具有更高的扩展性）</p>
              <p>
                后续可能会扩展到通过【建组】来分隔开不同的作业板，也有很多其它的构想
                <span class="line-through">，如果我有精力</span>
              </p>
              <p class="q-mb-none">如果你有兴趣和我合作的话，可以联系我：</p>
              <q-list>
                <q-item>
                  <q-item-section side>
                    <q-icon name="mail" />
                  </q-item-section>
                  <q-item-section>
                    <a
                      data-email="hokori23@qq.com"
                      href="mailto:hokori23@qq.com"
                      class="text-primary"
                      style="text-decoration:none"
                    >hokori23@qq.com</a>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section side>
                    <q-icon name="home" />
                  </q-item-section>
                  <q-item-section>
                    <a
                      href="https://hokori.online"
                      target="_blank"
                      class="text-primary"
                      style="text-decoration:none"
                    >https://hokori.online</a>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-tab-panel>

        <!-- Project -->
        <q-tab-panel name="project">
          <q-card flat>
            <div class="text-primary text-subtitle1">这个项目用到的一些技术：</div>
            <ul style="margin:0">
              <li>前端</li>
              <ul>
                <li>脚手架</li>
                <ul>
                  <li>Quasar</li>
                </ul>
                <li>JS框架</li>
                <ul>
                  <li>Vue</li>
                  <li>Vue-Router</li>
                  <li>Vuex</li>
                </ul>
                <li>CSS框架</li>
                <ul>
                  <li>Quasar</li>
                </ul>
                <li>
                  其他
                  <ul>
                    <li>PWA</li>
                  </ul>
                </li>
              </ul>
              <li>后端</li>
              <ul>
                <li>服务器</li>
                <ul>
                  <li>Nginx</li>
                </ul>
                <li>Nodejs框架</li>
                <ul>
                  <li>Express</li>
                </ul>
                <li>
                  其他
                  <ul>
                    <li>JWT</li>
                    <li>Gzip</li>
                  </ul>
                </li>
              </ul>
            </ul>
          </q-card>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  name: "Me",
  data() {
    return {
      tab: "me"
    };
  },
  methods: {
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
<style lang="sass" scoped>
.about-content
  p
    text-indent: 2em
  .line-through
    text-decoration: line-through
  ul
    &>ul
      list-style: circle
      &>ul
        list-style: square
</style>
