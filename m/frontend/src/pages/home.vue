<template>
    <div style="width:100%;height:100%;">
      <!-- 客服图标-注册图标 -->
      <div class="register_fixed-box">

        <div v-if="isUserNeedLogin" class="register_fixed" @click="() => { this.$router.push('/login?q_type=register')}">
        </div>
        <div class="kefu_fixed" @click="callShow = true">
        </div>
      </div>
      <van-popup class="call-center" v-model="callShow">
        <div class="hint">客服微信：ChinaYogaVillage</div>
        <div class="phone-img"></div>
        <a href="tel:400-100-7191">
          <div class="hot-line">点击拨打 400-100-7191</div>
        </a>
      </van-popup>
      <div class="main_content">
        <router-view></router-view>
      </div>
      <Footer></Footer>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import Footer from "../components/footer";
import Main from "./main";
export default {
    name: 'home',
    components: {
        Main,
        Footer
    },
    data() {
      return {
        callShow: false,
      }
    },
    computed: {
      isUserNeedLogin() {
        const isUserLogin = !window.sessionStorage.getItem('access');
        return isUserLogin;
      }
    }
}
</script>
<style lang="scss">
.main_content{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-bottom: 50px;
  overflow: hidden;
}
.main_content > div {
  height: 100%;
  // padding-bottom: 50px;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
</style>
<style lang="scss" scoped>
  .register_fixed-box{
    position: fixed;
    right: 16px;
    bottom: 90px;
    width: 50px;
    height: 120px;
    z-index: 200;
    .register_fixed{
        background-image: url('~@/assets/img/zhuce.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 50px;
        height: 50px;
        margin-bottom: 20px;
    }
    .kefu_fixed{
        background-image: url('~@/assets/img/kefu.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 50px;
        height: 50px;
    }
  }
  .call-center {
    width: 285px;
    height: 132px;
    background-image: url('~@/assets/img/yuan.png');
    background-repeat: no-repeat;
    background-size: cover;
    font-size: 14px;
    text-align: center;
    .hint {
        margin-top: 22px;
    }
    .phone-img {
        position: absolute;
        top: 66px;
        left: 50px;
        width: 23px;
        height: 27px;
        background-image: url('~@/assets/img/phone.png');
        background-repeat: no-repeat;
        background-size: cover;
    }
    .hot-line {
        margin-top: 28px;
        margin-left: 40px;
    }
  }
</style>