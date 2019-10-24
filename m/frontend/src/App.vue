<template>
  <div id="app">
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

    <div class="loding_wrap" v-show="loading" >
      <van-loading color="#638C0B" ref="appLoading"  />
    </div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import { Loading } from "vant";
Vue.use(Loading);
export default {
  name: "app",
  data() {
    return {
      callShow: false,
    }
  },
  mounted() {
      
  },
  computed: {
    ...mapGetters(["info", "isUserNeedLogin"]),
    loading() {
      setTimeout(() => {
        this.$store.commit("loadStatus", false);
      }, 3000);
      return this.$store.state.loading
    }
  }
};
</script>

<style lang="scss">
#app {
  background-color: #eee;
}

.loding_wrap {
  position: absolute;
  top: 0;
  // left: 0;
  right: 0;
  // bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  // background: rgba(0, 0, 0, 0.3);
}
.van-nav-bar {
    // 不要全局 配置定位
    // position: fixed;
    // top: 0;
    width: 100%;
    background-color: #fff!important;
    font-size: 16px;
    .van-icon {
        font-size: 20px;
        color: #2c2c2c;
    }
    .icon {
        display: block;
        width: 22px;
        height: 22px;
        margin-bottom: 12px;
    }
    .van-ellipsis {
      width: 100%;
      height: 1.17333rem;
      line-height: 1.17333rem;
      font-size: 0.42667rem;
      font-weight: 700;
      color: #000;
      text-align: center;
    }
}
.empty {
    
    width: 100%;
    height: 193px;
    margin-top: 90px;
    background: url('~@/assets/img/empty_img.png');
    background-size: cover;
    position: relative;
    .empty_tips{
      position: absolute;
      top:40%;
      right:20%;
      transform: translateY(-100%);
      font-size: 13px;
      color:#999;
    } 
}

</style>

<style lang="scss" scoped>
  .register_fixed-box{
    position: fixed;
    right: 20px;
    bottom: 80px;
    width: 60px;
    height: 140px;
    z-index: 100;
    .register_fixed{
        background-image: url('~@/assets/img/zhuce.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 60px;
        height: 60px;
        margin-bottom: 20px;
    }
    .kefu_fixed{
        background-image: url('~@/assets/img/kefu.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 60px;
        height: 60px;
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
