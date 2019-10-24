<template>
  <div>
    <el-col :span="24">
      <div class="header-main">
        <div class="head-quan">
          <div class="head-right">
            <el-button type="text" class="span2"></el-button>
            <div style="display:inline-block;" v-if="info.user.name">
              <div class="identity" >
                <img :src="info.user.icon" style="border-radius:50%;" alt="头像" />
              </div>
              <span class="span1" style="line-height: 40px;">{{info.user.name}}</span>
            </div>
            <div style="display:inline-block;" v-else>
              <el-button type="text" class="span1" @click="account.type='login'">登录</el-button>
              <el-button type="text" class="span1" @click="account.type='register'">注册</el-button>
            </div>
            <div style="display:inline-block;" v-if="info.user.name">
              <div style="display: inline-block;">
                <!-- <el-badge :value="0" style=" width:2rem;height: 2rem;"> -->
                <img @click="goto('shopCar')" class="img" src="../assets/cart.png" />
                <!-- </el-badge> -->
              </div>
            </div>
          </div>
        </div>
        <div class="head">
          <div class="head-mu">
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
              <el-menu-item index="joinclubhouse">培训机构</el-menu-item>
              <el-menu-item index="yogoteacher">瑜伽名师</el-menu-item>
              <el-menu-item index="cultivate">培训信息</el-menu-item>
              <el-menu-item index="yogoknowledge">瑜伽知识</el-menu-item>
              <el-menu-item index="yogoinformation">瑜伽资讯</el-menu-item>
              <!-- <el-menu-item index="market">商城</el-menu-item> -->
              <el-menu-item index="aboutus">关于我们</el-menu-item>
              <el-submenu index="personal">
                <template slot="title">
                  <div class="submenu"><router-link to="/personal/index" class="routlink">个人中心</router-link></div>
                </template>
                <!-- <el-menu-item index="personal">收藏的课程</el-menu-item> -->
                <div v-show="!info.user.name">
                  <el-menu-item index="login">请先登录</el-menu-item>
                </div>
                <div v-show="info.user.name">
                  <el-menu-item index="personal">个人中心</el-menu-item>
                  <!-- <el-menu-item index="identity">个人信息</el-menu-item> -->
                  <!-- <el-menu-item index="recode">订单中心</el-menu-item> -->
                  <el-menu-item
                    v-show="info.user.identity_auth === '认证导师中' || info.user.identity_auth === '认证机构负责人中'"
                    index="hell"
                  >机构信息</el-menu-item>
                  <el-menu-item index="safety-center">个人信息与安全</el-menu-item>
                  <el-menu-item index="share">分享邀请好友</el-menu-item>
                  <el-menu-item index="out" @click="logout">退出</el-menu-item>
                </div>
              </el-submenu>
            </el-menu>
          </div>
        </div>
      </div>
    </el-col>
    <div v-if="account.type==='login'">
      <login
        @suc="name => this.username = name"
        @go-register="type=>this.account.type = type"
        @go-reset="type=>this.account.type = type"
        @close="type=>this.account.type = type"
      ></login>
    </div>
    <div v-if="account.type==='register'">
      <register @go-login="type=>this.account.type = type" @close="type=>this.account.type = type" />
    </div>
    <div v-if="account.type==='reset'">
      <reset @go-reset="type=>this.account.type = type" @go-login="type=>this.account.type = type" @close="type=>this.account.type = type"/>
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
import store from "@/store";
import { mapGetters } from "vuex";
import identity_g from "@/assets/order/identity_g.png";
import identity_j from "@/assets/order/identity_j.png";
import identity_gj from "@/assets/order/identity_gj.png";
import identity_y from "@/assets/order/identity_y.png";
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
      },
      icon: {
        identity_g,
        identity_j,
        identity_gj,
        identity_y
      }
    };
  },
  computed: {
    ...mapGetters(["info"]),
    showTopTitle() {
      const show = this.$route.fullPath.startsWith("/personal");
      return show;
    },
    identity() {
      const obj = {
        1: identity_y,
        3: identity_g,
        5: identity_j,
        8: identity_gj
      };
      return obj[this.info.user.identity_auth];
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
    this.getPersonal();
  },
  created() {
    this.fetchData();
  },
  beforeUpdate() {
    // this.changenav();
  },
  beforeDestory() {
    Bus.$off("login");
  },
  methods: {
    successInfo() {
      this.$on("success", name => {
        this.username = name;
      });
    },
    /** 个人信息 */
    getPersonal() {
      sessionStorage.getItem("access") &&
        this.$request("/personal/home").then(data => {
          sessionStorage.setItem("user", JSON.stringify(data));
          store.dispatch("INFO", data);
          // window.location.reload();
          this.$emit("suc", data.user.name);
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
      this.activeIndex = this.$route.meta.header_name || "main";
      return;
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
        const obj = {
          identity: () =>
            this.$router.push({ name: "safety-center", query: { type: 2 } }),
          hell: () =>
            this.$router.push({ name: "safety-center", query: { type: 3 } }),
          login: () => {
            this.account.type = "login";
          }
        };
        if (obj[key]) {
          obj[key]();
          return;
        }
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
        store.dispatch("INFO", { user: {} });
        this.$router.push("/main");
        this.username = "";
        sessionStorage.removeItem("access");
        sessionStorage.removeItem("user");
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
.header-main .el-badge__content.is-fixed {
  top: 0.5rem;
  right: 0.7rem;
}
.header-main .el-submenu__title {
  border: none !important;
  height: 100% !important;
}
</style>
<style lang="scss" scoped>
.identity {
  display: inline-block;
  width: 30px;
  height: 30px;
  img {
    width: 100%;
    height: 100%;
  }
}
.el-menu {
  width: 80%;
  margin: 0 auto;
  background: #e8f5db;
  height: 64px;
  margin-left: 20%;
}
.routlink{
  text-decoration: none;
  color: #2c2c2c;
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
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
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
      width: 1200px;
      text-align: center;
      position: relative;
      margin: 0 auto;
      .img {
        width: 30px;
        height: 28px;
        display: inline-block;
        position: absolute;
        top: 4px;
        right: 6%;
      }
      .span1 {
        padding-right: 5px;
        color: #2c2c2c;
        margin: 0 auto;
      }
      .span2 {
        padding-right: 20px;
        margin-left: 68%;
        color: #2c2c2c;
      }
    }
  }
  .head {
    height: 65px;
    background: #e8f5db;
    .head-mu {
      height: 100%;
      width: 1200px;
      margin: 0 auto;
      .head-left {
        width: 15%;
        text-align: center;
        margin-left: 5%;
        height: 44px;
        line-height: 44px;
        img {
          width: 140px;
          position: relative;
          top: 8px;
        }
      }
    }
  }
}
</style>

