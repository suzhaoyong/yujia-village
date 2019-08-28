<template>
    <el-col>
        <el-carousel height="566px" indicator-position="none" :autoplay="false" :interval="10000" :loop="false">
            <el-carousel-item v-for="item in imgList" :key="item.id">
            <el-row>
                <el-col :span="24"><img :src="item.idView" class="banner_img"/></el-col>
            </el-row>
            </el-carousel-item>
        </el-carousel>
        <!-- <el-carousel height="566px" indicator-position="none" :autoplay="false">
        <el-carousel-item>
            <el-row>
                <el-col :span="24">
                  <img src="../assets/banner1.png" class="banner_img"/>
                </el-col>
            </el-row>
        </el-carousel-item>
        <el-carousel-item>
            <el-row>
                <el-col :span="24" style="position: relative;">
                  <img src="../assets/banner2.png" class="banner_img"/>
                  <div class="banner_button">
                    <el-button type="text" class="butt">申请加盟</el-button>
                  </div>
                </el-col>
            </el-row>
        </el-carousel-item>
        <el-carousel-item>
            <el-row>
                <el-col :span="24">
                  <img src="../assets/banner3.png" class="banner_img"/>
                </el-col>
            </el-row>
        </el-carousel-item>
        <el-carousel-item>
            <el-row>
                <el-col :span="24">
                  <img src="../assets/banner6.png" class="banner_img"/>
                </el-col>
            </el-row>
        </el-carousel-item>
        <el-carousel-item>
            <el-row>
                <el-col :span="24">
                  <img src="../assets/banner4.png" class="banner_img"/>
                </el-col>
            </el-row>
        </el-carousel-item>
        <el-carousel-item>
            <el-row>
                <el-col :span="24">
                  <img src="../assets/banner5.png" class="banner_img"/>
                </el-col>
            </el-row>
        </el-carousel-item>
        </el-carousel> -->
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
  },
  methods:{
  }
};
</script>
<style lang="scss" scope>
.el-carousel__item .banner_img {
    width: 100%;
    height: 566px;
    margin: 0;
  }
  .banner_button{
    position: absolute;
    top: 74%;
    width: 160px;
    background-color: #9AB1C1;
    height: 50px;
    border-radius: 10px;
    right: 45%;
    text-align: center;
    line-height: 50px;
    .butt{
      font-size:18px;
      font-family:Microsoft YaHei;
      font-weight:bold;
      color: #FFFFFF;
    }
  }
  // .el-carousel__item:nth-child(2n) {
  //   background-color: #99a9bf;
  // }
  // .el-carousel__item:nth-child(2n+1) {
  //   background-color: #d3dce6;
  // }
</style>
