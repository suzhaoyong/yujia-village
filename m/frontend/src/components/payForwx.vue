<template>
  <div id="pay">
    <van-nav-bar title="订单支付" left-arrow @click-left="goback" fixed>
    </van-nav-bar>
    <div class="payage">
      <p>名称</p>
      <p>订单编号</p>
    </div>
    <van-button type="primary" size="large"><a :href="hes">支付</a></van-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hes: '',
    }
  },
  created () {
      this.hes = this.$route.query.htmls;
  },

  mounted () {
    // console.log(document.querySelectorAll('script')[6].innerHTML)
    // var wxhref = document.querySelectorAll('script')[6].innerHTML
    // var he = wxhref.split( "=", -1)
    // this.hes =  he[1] + he[2] + he[3] + he[4]
    // console.log(this.hes)
  },
}
</script>
<style lang="scss" scope>
  .payage {
    font-size: 14px;
  }
</style>