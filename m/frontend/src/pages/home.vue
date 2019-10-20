<template>
    <div style="width:100%;height:100%;">
        <div class="main_content">
          <router-view></router-view>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import Footer from "../components/footer";
import Main from "./main";
export default {
    name: 'home',
    components: {
        Main,
        Footer
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