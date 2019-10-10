<template>
    <div style="width:100%;height:100%;">
        <Header v-if="value === 'home'"></Header>
        <router-view class="content"></router-view>
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
<style lang="scss" scoped>

</style>