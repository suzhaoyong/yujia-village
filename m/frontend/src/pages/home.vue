<template>
    <div style="width:100%;height:100%;">
        <Header v-if="value === 'home'"></Header>
        <div class="main_content">
          <router-view></router-view>
        </div>
        <Footer @footerByValue="footerByValue"></Footer>
    </div>
</template>
<script>
import Header from "../components/header";
import Footer from "../components/footer";
import Main from "./main";
export default {
    name: 'home',
    components: {
        Header,
        Main,
        Footer
    },
    data() {
        return {
            value: 'home'
        };
    },
    methods: {
        footerByValue(val) {
            // console.log(val);
            this.value = val;
            // console.log(this.value);

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