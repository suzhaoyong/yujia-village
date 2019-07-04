<template>
    <div>
        <el-col>
            <div class="nav-main">
                <template>
                    <Nav></Nav>
                </template>
            </div>
        </el-col>
    </div>
</template>
<script>
import Nav from "../components/nav";
export default {
    components:{
        Nav
    },
  data() {
    return {
    };
  }
};
</script>
<style lang="scss" scope>
.nav-main{
    height: 100%;
    padding: 0;
}
</style>
