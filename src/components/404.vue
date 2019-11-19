<template>
  <div class="not_fond-wrap">
    <div class="back_home" @click="() => {this.$router.push('/main');}">返回主页</div>
    <not-found type="not-fond" msg="我寻寻觅觅却找不到该网页"></not-found>  
  </div>
</template>
<script>

export default {
  
}
</script>
<style lang="scss" scoped>
  .not_fond-wrap {
    margin: 0px;
    position: relative;
    .back_home{
      position: absolute;
      top: 2rem;
      left: 2rem;
      width: 7rem;
      height: 3rem;
      line-height: 3rem;
      color: #fff;
      text-align: center;
      background: #68B75B;
      display: inline-block;
      cursor: pointer;
      border-radius: 0.2rem;
      font-size: 0.9rem;
    }
    /deep/ .type_4 {
      height: 100vh;
    }
  }
  
</style>
