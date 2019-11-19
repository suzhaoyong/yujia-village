<template>
  <div class="not_fond-wrap">
    <img src="../assets/warning/nothing_3.png"/>
    <div class="back_home" @click="() => {this.$router.push('/main');}">返回首页</div>
    <!-- <not-found type="not-fond" msg="我寻寻觅觅却找不到该网页"></not-found>   -->
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  }
}
</script>
<style lang="scss" scoped>
  .not_fond-wrap {
    margin: 0px;
    position: relative;
    img{
      width: 100%;
      height: 100%;
    }
    .back_home{
      position: absolute;
      right: 5.5%;
      top: 54%;
      width: 7.8rem;
      height: 2.8rem;
      line-height: 2.7rem;
      color: #fff;
      text-align: center;
      display: inline-block;
      cursor: pointer;
      border: 2px solid #fff;
      border-radius: 23px;
      font-size: 0.9rem;
      font-family:Microsoft YaHei;
      font-weight:bold;
    }
    /deep/ .type_4 {
      height: 100vh;
    }
  }
  
</style>
