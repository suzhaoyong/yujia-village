<template>
  <div class="wrap">
    <van-nav-bar title="支付成功"  fixed>
      <!-- <div class="" slot="right" @click="handleShareGoods">
        <img class="icon" src="../../../assets/img/share.png" />
      </div>-->
      <div class="" slot="left" @click="handleBackHome">
        <span>返回个人中心</span>
      </div>
    </van-nav-bar>
    <div class="order_body">
      <div class="pay_success">
        <div class="title">
          <span>支付成功</span>
        </div>
        <span class="tips">感谢您的光顾，宝贝一定准时送到府上！</span>
        <div class="actions">
          <span class="see_order" @click="viewOrder">查看订单</span>
          <span class="go_on"  @click="goOn">继续逛</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.$store.commit('loadStatus', false)
  },
  methods: {
    back() {},
    handleBackHome() {
      this.$router.push('/personal')
    },
    viewOrder() {
      this.$router.push('/myorder')
    },
    goOn() {
      this.$router.push('/store/category')
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  border: 0;
  box-sizing: border-box;
  font-size: 13px;
  color: #2c2c2c;
  max-width: 100%;
}
.wrap {
  background: #fff;
  .order_body {
    padding: 40px 0;
    .pay_success {
      .title {
        width: 290px;
        margin: 0 auto;
        border: 3px solid #b3d465;
        padding: 20px 0;
        span {
          width: 100%;
          font-size: 30px;
          font-weight: bolder;
          text-align: center;
          display: inline-block;
        }
      }
      .tips {
        padding-top: 10px;
        display: inline-block;
        width: 100%;
        text-align: center;
      }
      .actions {
        padding-top: 10px;
        width: 290px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .see_order, .go_on {
          display: inline-block;
          border:1px solid #EEEEEE;
          border-radius: 5px;
          padding: 8px 26px;
        }
        .go_on {
        }
      }
    }
  }
}
</style>