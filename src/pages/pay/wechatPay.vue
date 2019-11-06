<template >
  <div class="pay-wrap">
    <div class="pay">
      <div class="pay_title">微信支付 <span v-show="false">￥500.00</span></div>
      <div class="pay_waiting">
        <div class="pay_code">
          <el-image :src="payway.src" class="qrcode"></el-image>
          <!-- <img :setsrc="payway.src"  class="qrcode"> -->
        </div>
        <div class="pay_info">
          <p>请使用微信扫描二维码支付</p>
          <p>「上海一伽健身服务有限公司」</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Bus from '@/utils/Bus.js'
import store from "@/store";
import { mapGetters } from "vuex";
import {
  postGetWechatpayCode,
  postGetWechatOrder
} from "@/api/trains";
let timer = null;
export default {
  data() {
    return {
      order: {
        out_trade_no: ''
      },
      payway: {
        show: false,
        success: false,
        count: 0,
        src: "",
      },
    };
  },
  computed: {
    ...mapGetters(["info"]),
  },
  beforeCreate() {
  },
  created() {
    const { orderId } = this.$route.query
    this.order.out_trade_no = orderId
  },
  mounted() {
    const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        loading.close();
      }, 2000);
    this.changePayWay();
  },
  beforeDestroy() {
    timer && clearInterval(timer);
  },
  methods: {
    async changePayWay() {
      timer && clearInterval(timer);
      if (this.payway.success) {
        this.$message({
          type: "success",
          message: "已成功支付"
        });
        return;
      }

      let { out_trade_no } = this.order;

      postGetWechatpayCode({
        out_trade_no
      })
      .then(data => {
        this.payway.show = true;
        this.payway.success = false;
        this.payway.count = 59;
        this.payway.src = data;
      })
      .then(_ => {
        if (this.payway.show) {
          timer = setInterval(() => {
            if (this.payway.success) {
              clearInterval(timer);
            }
            
            if (this.payway.count < 1) {
              this.payway.count = 59;
            }
            this.payway.count -= 1;
            if (this.payway.count % 5 !== 0) return;
            postGetWechatOrder({ out_trade_no }).then(data => {
              if (data.msg === "支付成功") {
                this.payway.success = true;
                timer && clearInterval(timer);
                this.$router.push({ name: 'thank you page' })
              }
            });
          }, 1000);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
  .pay-wrap{
    background: rgb(51, 51, 51);
    // background: #ccc;
    height: 100vh;
    width: 100vw;
    font-family: "Microsoft Yahei";
    color: #fff;
    .pay{
      padding-top: 50px;
      line-height: 1.6;
      position: relative;
      width: 100%;
      z-index: 1;
      text-align: center;
      .pay_title{
        text-align: center;
        font-size: 20px;
        font-weight: 800;
      }
      .pay_waiting{
        .pay_code{
          .qrcode{
            width: 280px;
            height: 280px;
            margin-top: 15px;
            border: 10px solid #fff;
          }
        }
        .pay_info{
          width: 280px;
          margin: 0 auto;
          padding: 7px 14px;
          margin-top: 15px;
          background-color: #232323;
          box-shadow: inset 0 5px 10px -5px #191919, 0 1px 0 0 #444;
          border-radius: 100px;
          p{
            font-size: 13px;
            font-weight: 600;
            margin: 0;
          }
        }
      }
    }
  }
</style>