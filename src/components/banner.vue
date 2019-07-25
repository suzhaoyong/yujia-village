<template>
    <el-col>
        <el-carousel height="566px" indicator-position="none" :autoplay="true" :interval="3000" :loop="true">
            <el-carousel-item v-for="item in imgList" :key="item.id">
            <el-row>
                <el-col :span="24"><img :src="item.idView" class="banner_img"/></el-col>
            </el-row>
            </el-carousel-item>
        </el-carousel>
    </el-col>
</template>
<script>
export default {
  data() {
    return {
        imgList: [
          {id: 1, idView: require('../assets/banner1.png')},
          {id: 2, idView: require('../assets/banner2.png')},
          {id: 3, idView: require('../assets/banner3.png')},
          {id: 4, idView: require('../assets/banner4.png')},
          {id: 5, idView: require('../assets/banner5.png')}
        ]
    };
  }
};
</script>
<style lang="scss" scope>
.el-carousel__item .banner_img {
    opacity: 0.75;
    width: 100%;
    height: 566px;
    margin: 0;
  }
  // .el-carousel__item:nth-child(2n) {
  //   background-color: #99a9bf;
  // }
  // .el-carousel__item:nth-child(2n+1) {
  //   background-color: #d3dce6;
  // }
</style>
