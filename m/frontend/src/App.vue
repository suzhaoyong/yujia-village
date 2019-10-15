<template>
  <div id="app">
    <!-- <div class="loding_wrap" v-show="loading" >
      <van-loading color="#89b264" ref="appLoading"  />
    </div> -->
    <router-view></router-view>
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

<style>
#app {
  background-color: #eee;
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
</style>
