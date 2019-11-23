<template>
  <div class="wrap">
    <van-nav-bar title="查看结果"  fixed>
      <!-- <div class="" slot="right" @click="handleShareGoods">
        <img class="icon" src="../../../assets/img/share.png" />
      </div>-->
      <div class="" slot="left" @click="handleBackHome">
        <span> <van-icon name="arrow-left"/> </span>
      </div>
    </van-nav-bar>
    <div class="order_body">
      <div class="pay_success">
        <div class="title">
          <span class="title-msg">{{ msg }}</span>
          <!-- <p class="title-integral"><span class="span1">40</span><span>积分</span> </p> -->
        </div>
        <span class="tips">{{ ordermsg }}</span>
        <div class="actions">
          <span class="see_order" @click="viewOrder">查看订单</span>
          <span class="go_on"  @click="goOn">继续逛</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { log } from 'util';
export default {
  data() {
    return {
      msg: '支付成功',
      ordermsg: '感谢您的光顾，宝贝一定准时送到府上！',
      orderid: '',
    };
  },
  beforeRouteEnter: (to, from, next) => {
    console.log(to, from)
    if(from.path === '/fillorder')
    next(() => {
      this.msg = '支付成功'
    })
    next()
  },
  mounted() {
    this.$store.commit('loadStatus', false)
  },
  created() {
    try {
      this.orderid = window.location.href.split('=')[2]
      if (this.orderid) {
        this.$request.post('/getAlipayOrder', { 'out_trade_no': this.orderid }).then((res) => {
          console.log(res)
          this.msg = res.msg
          if( res.msg == '支付成功' ) {
            this.ordermsg = '感谢您的光顾，宝贝一定准时送到府上！'
          } else if (res.msg == '支付失败') {
            this.ordermsg = '失败了！请重新购买'
          } else if (res.msg == '未支付') {
            this.ordermsg = '去支付！'
          }
        })
      }
    }
    catch {
    }
    // console.log(window.location.href)
  },
  methods: {
    back() {},
    handleBackHome() {
      this.$router.push('/store/category')
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
        height: 85px;
        margin: 0 auto;
        border: 3px solid #B3D465;
        padding: 20px 0;
        text-align: center;
        .title-msg {
          width: 100%;
          margin-top: 10px;
          font-size: 14px;
          color: #2C2C2C;
          font-weight: bolder;
          display: inline-block;
        }
        &-integral {
          margin-top: 10px;
          .span1 {
            color: #B3D465;
            font-size: 16px;
          }
        }
      }
      .tips {
        padding-top: 10px;
        display: inline-block;
        width: 100%;
        font-size: 12px;
        color: #999999;
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