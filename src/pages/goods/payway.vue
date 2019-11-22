<template>
  <div style="padding-bottom:5rem;">
    <div class="order"><span class="view-order" @click="viewOrder" style="">返回查看订单</span>订单提交成功，请尽快付款！订单号：{{order.out_trade_no}}</div>
    <div class="payway">
      <div class="payway_money" v-show="false">
        <div class="title">金币支付</div>
        <div class="fee">
          支付
          <span style="color:#BC2E33;">{{order.totalPrice}}</span>元
        </div>
        <div class="balance">
          <div class="icon">
            <el-checkbox v-model="goldpay.allow" :disabled="isDisable"></el-checkbox>
          </div>
          <div class="pay_icon">
            <img :src="icon.qianbaoIcon" alt />
          </div>
          <span class="text">账号金币</span>
          <span style="padding-left:5rem;" v-if="isDisable">金币不足</span>
          <span style="padding-left:5rem;" v-else>可用{{info.user.money}}金币</span>
        </div>
        <div class="pay_password" v-if="goldpay.allow">
          <div class="tips">请输入密码支付</div>
          <div class="input-box">
            <el-input v-model="goldpay.password" class="password" type="password"></el-input>
            <div
              class="password-tips"
              @click="() => {this.$router.push({name: 'safety-center',})}"
            >忘记密码</div>
          </div>
          <div class="btn-wrap">
            <div class="btn" @click="submintPay">确认支付</div>
          </div>
        </div>
      </div>
      <div class="payway_code">
        <div class="title">扫码支付</div>
        <div class="tags">
          <div @click="changePayWay('2')" :class="['tag', isActive('2')]">支付宝扫码</div>
          <div @click="changePayWay('3')" :class="['tag', isActive('3')]">微信扫码</div>
        </div>
        <div class="tags_body">
          <div class="code">
            <div class="code_tips">
              距离二维码过期还有
              <span style="color:#BC2E33;">{{payway.count}}</span> 秒,过期后请重新刷新页面获取二维码
            </div>
            <div :class="`code_play${payway.way}`">
              <img
                v-if="payway.success"
                style="width:3rem;height:3rem;position: absolute; top: 70%; left: 60%;"
                :src="icon.success"
                alt
              />
              <img :src="payway.src" alt />
            </div>
          </div>
          <div class="code_img">
            <img :src="icon.active" alt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qianbaoIcon from "@/assets/order/qianbao.png";
import success from "@/assets/order/pay_success.png";
import alipayIcon from "@/assets/order/alipay_img.png";
import wechatIcon from "@/assets/order/wechat_img.png";
import store from "@/store";
import { mapGetters } from "vuex";
import {
  postGoldPay,
  postGetAlipayCode,
  postGetWechatpayCode,
  postGetAlipayOrder,
  postGetWechatOrder
} from "@/api/market";
let timer = null;
export default {
  props: ["order"],
  data() {
    return {
      icon: {
        qianbaoIcon,
        success,
        alipayIcon,
        wechatIcon,
        active: alipayIcon
      },
      payway: {
        show: false,
        success: false,
        count: 0,
        src: "",
        way: "2"
      },
      goldpay: {
        allow: false,
        out_trade_no: this.order.out_trade_no, // 统一订单编号
        password: "", // 密码
        total_fee: this.order.totalPrice // 总价格
      }
    };
  },
  computed: {
    ...mapGetters(["info"]),
    isDisable() {
      if (this.order.totalPrice > this.info.user.fraction) {
        return true;
      }
      return false;
    },
    isActive() {
      return type => ({ active: this.payway.way == type });
    }
  },
  mounted() {
    this.changePayWay(this.payway.way);
  },
  beforeDestroy() {
    timer && clearInterval(timer);
  },
  methods: {
    viewOrder() {
      this.$emit('back')
    },
    submintPay() {
      let pwd = this.goldpay.password;
      if (pwd.length === 0 || pwd.length < 6) {
        this.$message({
          type: "warning",
          message: "密码不能位空或不少与六位"
        });
        return;
      }
      let params = Object.assign({}, this.goldpay);
      delete params.allow;
      postGoldPay(params).then(data => {
        this.$message({
          type: "success",
          message: "支付成功"
        });
        timer && clearInterval(timer);
        this.$alert("前往订单中心", "成功", {
          confirmButtonText: "立即前往",
          callback: action => {
            this.$emit('close')
            this.$router.push({
              name: "recode"
            });
          }
        });
      });
    },
    async changePayWay(payment) {
      timer && clearInterval(timer);
      this.payway.way = payment;
      if (this.payway.success) {
        this.$message({
          type: "success",
          message: "已成功支付"
        });
        return;
      }

      let { out_trade_no, body, totalPrice } = this.order;
      // totalPrice = 0.01;
      if (parseInt(payment) === 2) {
        this.icon.active = alipayIcon;
        postGetAlipayCode({ out_trade_no, total_fee: totalPrice, body })
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
                if (this.payway.count <= 1 || !this.payway.show) {
                  this.changePayWay("2");
                  // this.payway.show = false;
                  clearInterval(timer);
                }
                this.payway.count -= 1;
                if (this.payway.count % 5 !== 0) return;
                postGetAlipayOrder({ out_trade_no }).then(data => {
                  if (data.msg === "支付成功") {
                    // this.payway.show = false;
                    this.payway.success = true;
                    this.$message({
                      type: "success",
                      message: "支付成功"
                    });
                    timer && clearInterval(timer);
                    this.$alert("前往订单中心", "成功", {
                      confirmButtonText: "立即前往",
                      callback: action => {
                        this.$emit('close')
                        this.$router.push({
                          name: "recode"
                        });
                      }
                    });
                  }
                });
              }, 1000);
            }
          });
      }
      if (parseInt(payment) === 3) {
        this.icon.active = wechatIcon;
        postGetWechatpayCode({
          out_trade_no,
          total_fee: totalPrice,
          body
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
                
                if (this.payway.count <= 1 || !this.payway.show) {
                  this.changePayWay("3");
                  // this.payway.show = false;
                  clearInterval(timer);
                }
                this.payway.count -= 1;
                if (this.payway.count % 5 !== 0) return;
                postGetWechatOrder({ out_trade_no }).then(data => {
                  if (data.msg === "支付成功") {
                    // this.payway.show = false;
                    this.payway.success = true;
                    this.$message({
                      type: "success",
                      message: "支付成功"
                    });
                    timer && clearInterval(timer);
                    this.$alert("前往订单中心", "成功", {
                      confirmButtonText: "立即前往",
                      callback: action => {
                        this.$emit('close')
                        this.$router.push({
                          name: "recode"
                        });
                      }
                    });
                  }
                });
              }, 1000);
            }
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
}
.order {
  width: 60rem;
  margin: 0 auto;
  padding: 2rem 0 1rem 0rem;
  font-size: 0.7rem;
  color: #2c2c2c;
}
.view-order{
  background: #3a794b; width: 10rem; text-align: center; color: #fff;
    border-top-right-radius: 1rem; border-bottom-right-radius: 1rem;
    display: inline-block;
    margin-right: 1rem;
    cursor: pointer;
}
.payway {
  font-size: 0.7rem;
  color: #2c2c2c;
  width: 60rem;
  margin: 0 auto;
  position: relative;
  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 1px 9px 1px rgba(92, 92, 92, 0.28);
  margin-bottom: 2rem;
  .pay_icon {
    width: 1.6rem;
    height: 1.6rem;
    display: inline-block;
    margin-right: 1rem;
  }
  .payway_money {
    position: relative;
    padding: 0 2.65rem;
    padding-bottom: 1.3rem;
    padding-top: 2rem;
    .title {
      background: #3a794b;
      width: 10rem;
      text-align: center;
      color: #fff;
      border-top-right-radius: 1rem;
      border-bottom-right-radius: 1rem;
      position: absolute;
      left: -0.06rem;
    }
    .fee {
      text-align: right;
      font-weight: bolder;
      padding-bottom: 1rem;
    }
    .balance {
      padding: 0.9rem 1.45rem;
      border: 1px solid #3a794b;
      .icon {
        display: inline-block;
        margin-right: 1rem;
      }
      .text {
        font-weight: bolder;
        font-size: 0.8rem;
      }
    }
    .pay_password {
      padding-top: 1rem;
      .tips {
        color: #999999;
        padding-bottom: 0.5rem;
      }
      .input-box {
        display: flex;
        align-items: center;
        .password {
          width: 17.5rem;
        }
        .password-tips {
          color: #24a3d8;
          padding-left: 1rem;
          cursor: pointer;
        }
      }
      .btn-wrap {
        margin-top: 1em;
        margin-left: 0em;
        .btn {
          cursor: pointer;
          border: 1px solid #7d7d7d;
          padding: 0.55rem 1.95rem;
        }
      }
    }
  }
  .payway_code {
    border-top: 0.3rem solid #eeeeee;
    position: relative;
    padding-bottom: 1.3rem;
    padding-top: 2rem;
    .title {
      background: #3a794b;
      width: 10rem;
      text-align: center;
      color: #fff;
      border-top-right-radius: 1rem;
      border-bottom-right-radius: 1rem;
      position: absolute;
      left: -0.06rem;
    }
    .tags {
      padding-top: 2rem;
      display: flex;
      cursor: pointer;
      color: #999999;
      .tag {
        width: 10rem;
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        background: #eeeeee;
        &.active {
          background: #fff;
        }
      }
    }
    .tags_body {
      padding: 3rem;
      border-top: 1px solid #ccc;
      display: flex;
      .code {
        .code_tips {
          padding-bottom: 2rem;
        }
        .code_play2,
        .code_play3 {
          margin-left: 3rem;
          width: 14rem;
          height: 14rem;
          position: relative;
          border: 1px solid #ccc;
        }
        .code_play2 {
          &::after {
            content: "请使用支付宝扫一扫功能";
            width: 100%;
            margin-top: 0.5rem;
            position: absolute;
            top: 100%;
            left: 0;
            text-align: center;
          }
        }
        .code_play3 {
          &::after {
            content: "请使用微信扫一扫功能";
            width: 100%;
            margin-top: 0.5rem;
            position: absolute;
            top: 100%;
            left: 0;
            text-align: center;
          }
        }
      }
      .code_img {
        margin-left: 8rem;
        width: 14rem;
        height: 20rem;
        // border: 1px solid #ccc;
      }
    }
  }
}
</style>