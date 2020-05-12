<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/sad.svg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <div class="text-faded">
      <p style='font-size: 30px;'>404</p>

      <p>抱歉, 找不到该页面...</p>

      <p>Sorry, nothing here...</p>
    </div>
    <q-btn
      color="primary"
      style="width:200px;"
      @click='goBack'
      label="Go back"
    />
  </div>
</template>

<script>
export default {
  name: 'Error404',
  methods:{
    goBack(){
      this.$router.back();
    }
  },
  beforeRouteEnter(to,from,next){
    if(to.path==='/index.html'){
      next('/')
    }else{
      next()
    }
  }
}
</script>
