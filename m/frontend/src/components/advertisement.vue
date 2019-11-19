<template>
  <div>
    <header>
      <van-nav-bar title="为您推荐" left-arrow @click-left="goback" fixed>
      </van-nav-bar>
    </header>
    <div>
    <div class="advertmian" v-if="imgs.length !== 0">
      <img v-for="(img, index) in imgs" :key="index" :src="img">
    </div>
    <div v-else class="advertmiantext">
      敬请期待!
    </div>
    </div>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgs: [],
    }
  },  
    mounted() {
      this.getadvertisementimg()
    },
  methods: {
    goback(){
        this.$router.go(-1)
    },

    getadvertisementimg() {
      this.$request.get(`advertisement/customize/${this.$route.query.id}`).then((res) => {
        this.imgs = res.images
        // console.log(res)
      })
    },
  }
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
.advertmiantext {
  width: 100%;
  font-size: 14px;
  padding-top: 100px;
  text-align: center;
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