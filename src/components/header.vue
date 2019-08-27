<template>
  <div>
    <el-col :span="24">
      <div class="header-main">
        <div class="head-quan">
          <div class="head-right">
            <el-button type="text" class="span2">已购课程</el-button>
            <div style="display:inline-block;" v-if="username || info.name">
              <span class="span1">{{username || info.name}}</span>
            </div>
            <div style="display:inline-block;" v-else>
              <el-button type="text" class="span1" @click="account.type='login'">登录</el-button>
              <el-button type="text" class="span1" @click="account.type='register'">注册</el-button>
            </div>
            <span>
              <img @click="goto('shopCar')" class="img" src="../assets/cart.png" />
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
              <el-menu-item index="cultivate">培训信息</el-menu-item>
              <el-menu-item index="yogoknowledge">瑜伽知识</el-menu-item>
              <el-menu-item index="yogoinformation">瑜伽资讯</el-menu-item>
              <el-menu-item index="market">商城</el-menu-item>
              <el-menu-item index="aboutus">关于我们</el-menu-item>
              <el-submenu index="personal" v-show="username || info.name">
                <template slot="title">
                  <div class="submenu">个人中心</div>
                </template>
                <!-- <el-menu-item index="personal">收藏的课程</el-menu-item> -->
                <el-menu-item index="personal">现金券与优惠券</el-menu-item>
                <el-menu-item index="safety-center">信息与安全中心</el-menu-item>
                <el-menu-item index="share">分享邀请好友</el-menu-item>
                <el-menu-item index="out" @click="logout">退出</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </div>
      </div>
    </el-col>
    <div v-if="account.type==='login'">
      <login
        @suc="name => this.username = name"
        @go-register="type=>this.account.type = type"
        @close="type=>this.account.type = type"
      ></login>
    </div>
    <div v-if="account.type==='register'">
      <register @go-login="type=>this.account.type = type" @close="type=>this.account.type = type" />
    </div>
    <div v-if="account.type==='reset'">
      <reset />
    </div>
    <div v-if="showTopTitle">
      <top-title />
    </div>
  </div>
</template>
<script>
import Login from "@/pages/Login/login";
import Register from "@/pages/Login/register";
import Reset from "@/pages/Login/reset";
import TopTitle from "@/pages/personalCenter/topTItle";
import Bus from "@/utils/Bus";
export default {
  components: {
    Login,
    Register,
    Reset,
    TopTitle
  },
  data() {
    return {
      activeIndex: "main",
      username: "",
      account: {
        type: ""
      }
    };
  },
  computed: {
    info() {
      const user = sessionStorage.getItem("user");
      return (user && JSON.parse(user).user) || {};
    },
    showTopTitle() {
      const show = this.$route.fullPath.startsWith("/personal");
      return show;
    }
  },
  watch: {
    $route: "fetchData"
  },
  mounted() {
    // this.changenav();
    Bus.$on("login", () => {
      this.account.type = "login";
    });
    this.activeIndex = this.$route.name || this.$route.path || "main";
  },
  created() {
    this.fetchData();
  },
  beforeUpdate() {
    this.changenav();
  },
  beforeDestory() {
    Bus.$off("login");
  },
  methods: {
    successInfo() {
      this.$on("success", name => {
        console.log(name);
        this.username = name;
      });
    },
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
      } else if (this.$route.name == "cultivate") {
        this.activeIndex = "cultivate";
      } else if (this.$route.name == "market") {
        this.activeIndex = "market";
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
      } else if ("cultivate" === key) {
        this.$router.push("/cultivate/index");
      } else if ("market/index" === key) {
        this.$router.push("/market/index");
      } else {
        this.$router.push(`/${key}/index`);
      }
    },
    /** 登出 */
    logout() {
      this.$request.post("/auth/logout").then(data => {
        this.$message({ type: "success", message: "退出成功" });
        this.$router.push('/main')
        this.username = ""
        sessionStorage.removeItem('access')
        sessionStorage.removeItem('user')
      });
    },
    /** 用户基本信息 */
    getInfo() {
      this.$request("/auth/me").then(data => {});
    },
    goto(name, item) {
      let id = item || "";
      this.$router.push({
        name,
        params: {
          id
        }
      });
    }
  }
};
</script>
<style>
.header-main .el-submenu__title {
  border: none !important;
  height: 100%!important;
}
</style>
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
      position: relative;
      .img {
        width: 30px;
        height: 28px;
        display: inline-block;
        position: absolute;
        top: 4px;
        right: 38%;
      }
      .span1 {
        padding-right: 5px;
        color: #2c2c2c;
        margin: 0 auto;
      }
      .span2 {
        padding-right: 20px;
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

