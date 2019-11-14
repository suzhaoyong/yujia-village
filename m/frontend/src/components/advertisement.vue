<template>
  <div>
    <header>
      <van-nav-bar title="" left-arrow @click-left="goback" fixed>
      </van-nav-bar>
    </header>
    <div class="advertmian">
      <img src="../../static/img/advertimg/1.jpg">
      <img src="../../static/img/advertimg/2.jpg">
      <img src="../../static/img/advertimg/3.jpg">
      <img src="../../static/img/advertimg/4.jpg">
      <img src="../../static/img/advertimg/5.jpg">
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    goback(){
        this.$router.go(-1)
    },
  },
}
</script>

<style lang="scss" scope>
body {
  border: 1px solid white;
}
header {
  
  .van-nav-bar .van-icon {
      vertical-align: middle;
  }
  .van-nav-bar .van-ellipsis {
    height: 40px;
  }
  .van-nav-bar--fixed{
      height: 40px;
      position: fixed!important;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 99 !important;
  }
}

  .advertmian {
    display: inline-block;
    margin-top: 44px;
    width: 100%;
    img {
      display: block;
      width: 100%;
    }
  }
</style>