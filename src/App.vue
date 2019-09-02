<template>
  <div id="app" class="scroll-content">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
export default {
  name: 'App',
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
}
</script>

<style>
[v-cloak] {
  display: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
  min-width: 1200px;
}
.el-button:focus ,.el-icon-close:focus, .el-message-box__headerbtn:focus {
  outline: none;
}
/* *{
  margin: 0;
  border: 0;
} */
.title{
  font-size: inherit!important;
  font-weight: inherit!important;
}
</style>
