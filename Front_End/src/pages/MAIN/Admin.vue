<template>
  <section class="page">
    <q-list class="list-container non-selectable" :bordered="!$q.screen.lt.md">
      <!-- ID -->
      <q-item
        class="cursor-not-allowed"
        :class="$q.dark.mode ? 'dimmed' : 'light-dimmed'"
        v-for
        :key
      >
        <q-item-section avatar>
          <q-icon name="account_circle" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $t("login.account") }}</q-item-label>
        </q-item-section>
        <q-item-section class="text-primary text-weight-bold" side>
          <q-item-label>{{ subject.self }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </section>
</template>

<script>
export default {
  name: "admin",
  data() {
    return {
      subjectState: false,
      subject: []
    };
  },
  beforeRouteEnter(to, from, next) {
    next(async vm => {
      try {
        let res = await vm.$store.dispatch("MainLayout/getAllSubjects", vm);
        console.log(res);
      } catch (e) {
        console.log(e);
        this.$dealWithError(this, e);
      }
    });
  }
};
</script>

<style></style>
