<template>
  <div style="width:100%;height:100%;">
    <el-container>
<<<<<<< HEAD
      <!--头部-->
        <el-header style="height:100%;">
          <Header></Header>
        </el-header>
        <!--内容-->
        <el-main>
            <router-view exact></router-view>
        </el-main>
        <!--底部-->
        <el-footer style="height:100%;">
          <Footer></Footer>
        </el-footer>
=======
        <el-header>Header</el-header>
        <el-main>MainMain</el-main>
        <el-footer>Footer</el-footer>
>>>>>>> 463e4501eeadd719dd60db65b3e5a56c2b40e0bb
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
.el-container {
  padding: 0;
}
.el-header{
  padding: 0;
}
.el-footer{
  padding: 0;
}
.el-main {
  padding: 0;
  overflow-x: hidden;
}
</style>