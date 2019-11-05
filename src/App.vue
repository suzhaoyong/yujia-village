<template>
  <div id="app" class="scroll-content">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>
<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style>
[v-cloak] {
  display: none;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  /* overflow-x: hidden; */
  min-width: 100%;
}
.el-button:focus,
.el-icon-close:focus,
.el-message-box__headerbtn:focus {
  outline: none;
}
.el-carousel__arrow:focus {
  outline: 0 !important;
}
/* *{
  margin: 0;
  border: 0;
} */
.title {
  font-size: inherit !important;
  font-weight: inherit !important;
}
.distpicker-address-wrapper select{
    width: 145px !important;
    padding: 0px 4px !important;
    font-size: 14px !important;
}
.swiper-pagination-bullet-active {
    opacity: 1 !important;
    color:#ACD589 !important;
    background: #ebebeb  !important;
}
.swiper-pagination-bullet{
    margin: 0 5px !important;
    width: 27px !important;
    height: 27px !important;
    line-height: 27px !important;
    background: #ECE9E2 !important;
    border-radius: 0px !important;
    font-size: 14px !important;
    text-align: center !important;
    opacity: 1 !important;
    display: inline-block !important;
}
</style>
