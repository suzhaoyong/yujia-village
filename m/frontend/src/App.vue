<template>
  <div id="app">
    <div class="loding_wrap" v-show="loading" >
      <van-loading color="#89b264" ref="appLoading"  />
    </div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
  <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import Vue from "vue";
import { Loading } from "vant";
Vue.use(Loading);
export default {
  name: "app",
  computed: {
    loading() {
      return this.$store.state.loading
    }
  }
};
</script>

<style lang="scss">
#app {
  background-color: #eee;
}
.van-cell__title {
  color: #2c2c2c;
}
.loding_wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.3);
}
.van-nav-bar {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #eee;
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
}
.empty {
    width: 100%;
    height: 193px;
    margin-top: 90px;
    background: url('~@/assets/img/Nothing_Order.png');
    background-size: cover;
}
</style>
