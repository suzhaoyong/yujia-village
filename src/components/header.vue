<template>
  <div>
    <el-col :span="24">
      <div class="header-main">
        <div class="head-quan">
          <div class="head-right">
            <span class="span1">已购课程</span>
            <span class="span1">登录</span>
            <span class="span1">注册</span>
            <span>
              <img class="img" src="../assets/cart.png" />
            </span>
          </div>
        </div>
        <div class="head">
          <el-col :span="24">
            <div class="head-left">
              <img src="../assets/logo.png" />
            </div>
            <el-menu
              :default-active="activeIndex"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
            >
              <el-menu-item index="main">首页</el-menu-item>
              <el-menu-item index="joinclubhouse">加盟会馆</el-menu-item>
              <el-menu-item index="yogoteacher">瑜伽名师</el-menu-item>
              <el-menu-item index="cultivate/cultivate">培训信息</el-menu-item>
              <el-menu-item index="yogoknowledge">瑜伽知识</el-menu-item>
              <el-menu-item index="yogoinformation">瑜伽资讯</el-menu-item>
              <el-menu-item index="market/index">商城</el-menu-item>
              <el-menu-item index="aboutus">关于我们</el-menu-item>
              <el-submenu index="personal">
                <template slot="title">
                  <div class="submenu">个人中心</div>
                </template>
                <el-menu-item index="personal">收藏的课程</el-menu-item>
                <el-menu-item index="personal">现金券与优惠券</el-menu-item>
                <el-menu-item index="safety-center">信息与安全中心</el-menu-item>
                <el-menu-item index="share">分享邀请好友</el-menu-item>
                <el-menu-item index="personal">退出</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </div>
      </div>
    </el-col>
  </div>
</template>
<script>
export default {
  data() {
    return {
        activeIndex:"main",
    };
  },
  watch: {
    $route: "fetchData"
  },
  mounted() {
    this.changenav();
  },
  created() {
    this.fetchData();
  },
  beforeUpdate() {
    this.changenav();
  },
  methods: {
    //路由改变时的导航对应高亮
    changenav() {
      let path = this.$route.path;
      let endIndex = path.lastIndexOf("/");
      let currNav = path.substring(endIndex + 1, path.length);
      this.activeIndex = currNav;
    },
    fetchData() {
      if (this.$route.name == "main") {
        this.activeIndex = "main";
      } else if (this.$route.name == "joinclubhouse") {
        this.activeIndex = "joinclubhouse";
      } else if (this.$route.name == "yogoteacher") {
        this.activeIndex = "yogoteacher";
      } else if (this.$route.name == "yogoknowledge") {
        this.activeIndex = "yogoknowledge";
      } else if (this.$route.name == "yogoinformation") {
        this.activeIndex = "yogoinformation";
      } else if (this.$route.name == "aboutus") {
        this.activeIndex = "aboutus";
      } else if (this.$route.name == "cultivate/cultivate") {
        this.activeIndex = "cultivate/cultivate";
      } else if (this.$route.name == "market/index") {
        this.activeIndex = "market/index";
      }
    },
    handleSelect(key, keyPath) {
      if (keyPath.length >= 2) {
        this.$router.push({
          name: key
        });
        return;
      }
      if ("main" === key) {
        this.$router.push("/main");
      } else if ("joinclubhouse" === key) {
        this.$router.push("/joinclubhouse");
      } else if ("yogoteacher" === key) {
        this.$router.push("/yogoteacher");
      } else if ("yogoknowledge" === key) {
        this.$router.push("/yogoknowledge");
      } else if ("yogoinformation" === key) {
        this.$router.push("/yogoinformation");
      } else if ("aboutus" === key) {
        this.$router.push("/aboutus");
      } else if ("cultivate/cultivate" === key) {
        this.$router.push("/cultivate/cultivate");
      } else if ("market/index" === key) {
        this.$router.push("/market/index");
      } else {
        this.$router.push(`/${key}/index`);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.el-menu {
  width: 80%;
  margin: 0 auto;
  background: #e8f5db;
  height: 64px;
  margin-left: 20%;
}
.el-menu.el-menu--horizontal,
.el-menu--horizontal.el-submenu .el-submenu__title {
  border-bottom: solid 1px #e8f5db;
  margin-top: -44px;
}
.el-menu--horizontal > .el-menu-item.is-active,
.el-menu--horizontal > .el-submenu.is-active {
  border-bottom: 1px solid #e8f5db;
  color: #2c2c2c;
  text-align: center;
  margin: 0 auto;
  font-weight: bold;
  height: 65px;
  background: #fff;
}
.el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
  border: none;
}
.el-menu-item {
  height: 65px;
  font-size: 16px;
  color: #2c2c2c;
  padding: 0 20px;
  cursor: pointer;
  -webkit-transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.el-menu--horizontal > .el-menu-item,
.el-menu--horizontal > .el-submenu,
.submenu {
  float: left;
  height: 65px;
  line-height: 65px;
  margin: 0;
  font-size: 16px;
  border-bottom: 2px solid transparent;
  color: #2c2c2c !important;
}
.el-submenu__title {
  height: 100%;
}
.submenu {
  height: 100%;
}
.el-menu--horizontal > .el-submenu {
  height: 100%;
  border: none;
}
.el-menu-item.is-active {
  color: #2c2c2c;
}
.header-main {
  width: 100%;
  height: 100%;
  padding: 0;
  .head-quan {
    height: 40px;
    display: flex;
    background: #fcfbf1;
    justify-content: flex-end;
    .head-right {
      width: 65%;
      text-align: center;
      margin-top: 7px;
      position: relative;
      .img {
        width: 30px;
        height: 28px;
        display: inline-block;
        position: absolute;
        top: -4px;
        right: 38%;
      }
      .span1 {
        padding-right: 17px;
        color: #2c2c2c;
      }
    }
  }
  .head {
    height: 65px;
    background: #e8f5db;
    .head-left {
      width: 17%;
      text-align: center;
      margin-top: 0px;
      margin-left: 8%;
      height: 44px;
      img {
        width: 157px;
        position: relative;
        top: 10px;
      }
    }
  }
}
</style>

