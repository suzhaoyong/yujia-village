<template>
  <div style="width:100%;height:100%;">
    <el-container id="wrapper">
      <!--头部-->
        <el-header style="height:100%;">
          <Header></Header>
        </el-header>
        <!--内容-->
        <el-main>
            <router-view exact></router-view>
        </el-main>
        <!--底部-->
        <el-footer>
          <Footer></Footer>
        </el-footer>
    </el-container>
  </div>
</template>
<script>
import Header from "../components/header";
import Footer from "../components/footer";
import Main from "../pages/main";
export default {
  name: "home",
  components:{
    Header,
    Footer,
    Main
  },
  data() {
    return {
    };
  }
};
</script>
<style scoped>
#wrapper {
  min-height: 100%;
  height: auto !important;
  position: relative;
}
.el-container {
  padding: 0;
}
.el-header{
  padding: 0;
}
.el-footer{
  padding: 0;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  /* margin-bottom: -75px; */
}
.el-main {
  padding: 0;
  overflow-x: hidden;
}
</style>