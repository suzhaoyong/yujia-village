<template>
  <div>
    <div class="body">
      <div class="back">
        <span class="back-btn" @click="back">返回上一步</span>
      </div>
      <div class="identity" v-show="step.type === 'identity'">
        <div class="box">
          <div class="img">
            <img :src="icon.identity_1" alt />
          </div>
          <div class="type" @click="myIdentity('2')">我是馆主</div>
        </div>

        <div class="box id2">
          <div class="img">
            <img :src="icon.identity_2" alt />
          </div>
          <div class="type" @click="myIdentity('7')">馆主&amp;教练</div>
        </div>

        <div class="box id3">
          <div class="img">
            <img :src="icon.identity_3" alt />
          </div>
          <div class="type" @click="myIdentity('4')">我是教练</div>
        </div>
      </div>
      <div class="to-certification" v-show="step.type === 'certification'">
        <certification v-if="step.type == 'certification'" :certificate="certificate"></certification>
      </div>
      <div class="my-identity" v-show="step.type === 'my-card'">
        <div class="icon">
          <div class="img">
            <img :src="icon.active" alt />
          </div>
        </div>
        <div class="info">
          <div class="balance">
            <div class="title">
              <span>账户金币</span>
              <span
                v-if="hiddenMoney"
                style="color:#4093A5;margin-left:10px;"
                @click="hiddenMoney = ''"
              >隐藏金币</span>
              <span
                v-else
                style="color:#4093A5;margin-left:10px;"
                @click="hiddenMoney = '**.**'"
              >显示金币</span>
            </div>
            <div class="money">
              <span>{{hiddenMoney || info.user.money}}</span>
              <div class="recharge" @click="step.type = 'recharge'">充值</div>
              <!-- <div class="cash">提现</div> -->
            </div>
            <span class="all-card" v-show="false">我的全部银行卡</span>
          </div>
          <div class="card-wrap" v-show="false">
            <div class="title">
              <span>银行卡管理</span>
              <span style="color:#4093A5;margin-left:10px;" @click="step.type = 'input-card'">添加银行卡</span>
            </div>
            <div class="card-box">
              <div class="cards">
                <span class="name">工商</span>
                <span class="number">尾号</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="input-card" v-show="step.type === 'input-card'">
        <div class="icon">
          <div class="img">
            <img :src="icon.active" alt />
          </div>
        </div>
        <div class="card">
          <div class="title">
            尊贵的
            <span>{{getIdentityAuth(info.user.identity_auth)}}</span> 未查询到您的银行卡信息，请完整信息：
          </div>
          <div style="padding-bottom:1em;">请填写银行卡号码</div>
          <div class="input-box">
            <el-input v-model="ruleForm.bank_card" type="text" />
            <div class="bank-card">
              <div v-show="false">
                <div class="name">建设银行</div>
                <div class="tipd">识别有误，手动填写</div>
              </div>
            </div>
          </div>
          <div style="padding-top:2rem;">
            <span class="sure" @click="changeBankCard">确定</span>
          </div>
        </div>
      </div>
      <div class="pay-card" v-show="step.type === 'recharge'">
        <div class="icon">
          <div class="img">
            <img :src="icon.active" alt />
          </div>
        </div>
        <div class="info">
          <div class="balance" v-show="false">
            <div class="title">
              <span>账户金币</span>
              <span style="color:#4093A5;margin-left:10px;">显示金币</span>
            </div>
            <div class="money">
              <span>{{info.user.money}}</span>
              <div class="recharge">充值</div>
              <!-- <div class="cash">提现</div> -->
            </div>
          </div>
          <div class="card-wrap">
            <div class="title">
              <span>充值金币</span>
            </div>
            <div class="money-wrap">
              <span :class="[isRechangeActive(300)]" @click="rechargeChange('num', 300)">300</span>
              <span :class="[isRechangeActive(500)]" @click="rechargeChange('num', 500)">500</span>
              <span :class="[isRechangeActive(800)]" @click="rechargeChange('num', 800)">800</span>
              <span :class="[isRechangeActive(1000)]" @click="rechargeChange('num', 1000)">1000</span>
              <span :class="[isRechangeActive(2000)]" @click="rechargeChange('num', 2000)">2000</span>
              <span :class="[isRechangeActive(5000)]" @click="rechargeChange('num', 5000)">5000</span>
              <div class="input-money">
                <input v-model.number="money" type="text" placeholder="填写金币" />
              </div>
            </div>
          </div>
        </div>
        <div class="pay-way" v-show="rechargeForm.num || money">
          <div>支付方式</div>
          <div class="way">
            <span :class="[isPayActive(3)]" @click="rechargeChange('payment', '3')">微信</span>
            <span :class="[isPayActive(2)]" @click="rechargeChange('payment', '2')">支付宝</span>
            <!-- <span>银行卡</span> -->
          </div>
          <div class="sure" style="padding-top:2em;">
            <span @click="reCharge">确定</span>
          </div>

          <div class="pay-code" v-show="playcode.show">
            <div class="code">
              <img :src="playcode.src" alt />
            </div>
            <!-- <div class="tips">刷新二维码</div> -->
            <div class="tips">{{playcode.count}}s后关闭</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import identity_1 from "@/assets/personal/identity_1.png";
import identity_2 from "@/assets/personal/identity_2.png";
import identity_3 from "@/assets/personal/identity_3.png";
import certification from "./certification";
import store from "@/store";
import { mapGetters } from "vuex";
import {
  postChangeBankCard,
  getBankCardInfo,
  postRecharge
} from "@/api/personal.js";
import {
  postGetAlipayCode,
  postGetWechatpayCode,
  postGetAlipayOrder,
  postGetWechatOrder
} from "@/api/market";
export default {
  components: {
    certification
  },
  data() {
    return {
      icon: {
        identity_1,
        identity_2,
        identity_3
      },
      certificate: {
        identity: ""
      },
      playcode: { show: false, src: "", count: 0 },
      hiddenMoney: "",
      money: "",
      step: {
        cur_index: 1,
        type: "identity"
      },
      ruleForm: {
        bank_card: ""
      },
      apply: {
        money: ""
      },
      rechargeForm: {
        num: "",
        payment: ""
      }
    };
  },
  watch: {
    money(newvalue, oldvalue) {
      this.rechargeForm.num = "";
    },
    $route() {
      const { type = "identity" } = this.$route.query;
      this.step.type = type;
    }
  },
  computed: {
    ...mapGetters(["info"]),
    getIdentityAuth() {
      return item => {
        const obj = {
          1: "用户",
          2: "馆主",
          4: "教练",
          7: "馆主&教练"
        };

        return obj[item];
      };
    },
    isPayActive() {
      return payment => {
        return { active: this.rechargeForm.payment == payment };
      };
    },
    isRechangeActive() {
      return money => {
        return { active: this.rechargeForm.num === money };
      };
    }
  },
  mounted() {
    // this.getBankCardInfo();
    const { type = "identity" } = this.$route.query;
    this.step.type = type;
  },
  updated() {
    this.$nextTick(function() {});
  },
  methods: {
    back() {
      const { type } = this.step;
      const obj = {
        identity: "identity",
        certification: "identity",
        "my-card": "my-card",
        "input-card": "my-card",
        recharge: "my-card"
      };
      if (type === "identity" || type === "my-card") {
        this.$router.go(-1);
      }
      this.step.type = obj[type];
    },
    myIdentity(identity) {
      this.step.type = "certification";
      this.certificate.identity = identity;
    },
    rechargeChange(name, num) {
      this.rechargeForm[name] = num;
      if (name === "payment") {
        // (this.rechargeForm.num || this.money) && this.reCharge();
      }
    },
    /** 充值 */
    reCharge() {
      if (this.rechargeForm.payment == "") {
        this.$message({
          type: "warning",
          message: "请选择支付方式"
        });
        return;
      }
      const params = Object.assign({}, this.rechargeForm);
      params.num = params.num || this.money;
      this.$request.post(`/personal/recharge`, params).then(data => {
        const { payment, out_trade_no, body, totalPrice } = data;
        // const totalPrice = 0.01;
        if (parseInt(payment) === 2) {
          postGetAlipayCode({ out_trade_no, total_fee: totalPrice, body })
            .then(data => {
              this.playcode.show = true;
              this.playcode.count = 30;
              this.playcode.src = data;
            })
            .then(_ => {
              if (this.playcode.show) {
                const timer = setInterval(() => {
                  if (this.playcode.count < 0 || !this.playcode.show) {
                    this.playcode.show = false;
                    clearInterval(timer);
                  }

                  postGetAlipayOrder({ out_trade_no }).then(data => {
                    this.playcode.count -= 1;
                    if (data.msg === "支付成功") {
                      this.playcode.show = false;
                      this.$message({
                        type: "success",
                        message: "支付成功"
                      });
                    }
                  });
                }, 1000);
              }
            });
        }
        if (parseInt(payment) === 3) {
          postGetWechatpayCode({
            out_trade_no,
            total_fee: totalPrice,
            body
          })
            .then(data => {
              this.playcode.show = true;
              this.playcode.count = 30;
              this.playcode.src = data;
            })
            .then(_ => {
              if (this.playcode.show) {
                const timer = setInterval(() => {
                  if (this.playcode.count <= 0 || !this.playcode.show) {
                    this.playcode.show = false;
                    clearInterval(timer);
                  }

                  postGetWechatOrder({ out_trade_no }).then(data => {
                    this.playcode.count -= 1;
                    if (data.msg === "支付成功") {
                      this.playcode.show = false;
                      this.$message({
                        type: "success",
                        message: "支付成功"
                      });
                    }
                  });
                }, 1000);
              }
            });
        }
      });
    },
    /** 提现申请 */
    cashWithdrawal() {
      const params = Object.assign({}, this.apply);
      this.$request.post(`/personal/cashWithdrawal`, params).then(data => {});
    },
    /** 修改银行卡 */
    changeBankCard() {
      const params = Object.assign({}, this.ruleForm);
      this.$request.post(`/personal/changeBankCard`, params).then(data => {});
    },
    /** 银行卡信息 */
    getBankCardInfo() {
      this.$request(`/personal/getBankCardInfo`).then(data => {});
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  font-size: 0.7rem;
}
img {
  width: 100%;
  height: 100%;
}
.body {
  position: relative;
}
.back {
  width: 60rem;
  margin: 0 auto;
  padding-top: 1rem;
  &-btn {
    cursor: pointer;
    padding: 0.2rem 0.3rem;
    background: #000;
    color: #fff;
  }
}
img {
  width: 100%;
  height: 100%;
}
.identity {
  display: flex;
  justify-content: center;
  padding-top: 4rem;
  min-height: 30rem;
  .box {
    width: 17rem;
    height: 22rem;
    background: #e6f9f1;
    margin-right: 2.5rem;
    &.id1 {
      background: #e6f9f1;
    }
    &.id2 {
      background: #e6f5f9;
    }
    &.id3 {
      background: #fbecd2;
    }
    .img {
      width: 13rem;
      height: 13rem;
      margin: 1rem auto;
    }
    .type {
      cursor: pointer;
      margin: 2rem auto;
      width: 10rem;
      height: 3rem;
      line-height: 3rem;
      text-align: center;
      background: #fff;
    }
  }
}
.my-identity {
  // min-height: 30rem;
  display: flex;
  min-height: 20rem;
  width: 70rem;
  margin: 0 auto;
  margin-top: 4rem;
  margin-bottom: 10rem;
  box-shadow: 0.1rem 0 0.35rem rgba(36, 36, 36, 0.2);
  border-radius: 0.25rem;
  .icon {
    display: flex;
    align-items: center;
    padding: 0 3.6rem;
    border-right: 1px solid #ccc;
    .img {
      width: 9rem;
      height: 9rem;
    }
  }
  .info {
    flex-grow: 1;
    position: relative;
    cursor: pointer;
    padding: 30px 40px 30px 40px;
    .balance {
      .title {
        padding-bottom: 0.4rem;
      }

      .money {
        padding-bottom: 0.4rem;
        .recharge {
          display: inline-block;
          padding: 2px 20px;
          border: 1px solid #ccc;
          margin-right: 10px;
        }
        .cash {
          border: 1px solid #ccc;
          padding: 2px 20px;
          display: inline-block;
        }
      }
      .all-card {
        position: absolute;
        right: 10px;
        top: 20px;
        color: #4093a5;
      }
    }
    .card-wrap {
      padding-top: 2rem;
      .title {
        padding-bottom: 0.4rem;
      }
      .card-box {
        .cards {
          width: 300px;
          height: 200px;
          border-radius: 10px;
          border: 1px solid #ccc;
          background: #fff;
          display: flex;
          padding-top: 20px;
          position: relative;
          &::after {
            content: "";
            display: block;
            width: 100%;
            height: 2rem;
            position: absolute;
            top: 70px;
            background: #000;
          }
          .name {
            display: inline;
            margin-left: 20px;
          }
          .number {
            flex-grow: 1;
            margin-right: 20px;
            display: inline-block;
            text-align: right;
          }
        }
      }
    }
  }
}
.input-card {
  display: flex;
  min-height: 20rem;
  border: 1px solid #ccc;
  width: 70rem;
  margin: 0 auto;
  margin-top: 4rem;
  margin-bottom: 10rem;
  box-shadow: 0.1rem 0 0.35rem rgba(36, 36, 36, 0.2);
  border-radius: 0.25rem;
  .icon {
    display: flex;
    align-items: center;
    padding: 0 3.6rem;
    border-right: 1px solid #ccc;
    .img {
      width: 9rem;
      height: 9rem;
    }
  }
  .card {
    flex-grow: 1;
    padding: 4rem 5rem 0 3rem;
  }
  .title {
    padding-bottom: 1.85rem;
  }
  .input-box {
    .bank-card {
      padding: 1em 0;
      .name {
        cursor: pointer;
        display: inline-block;
        padding: 0.3em 0.6em;
        border: 1px solid #ccc;
      }
      .tipd {
        display: inline-block;
      }
    }
  }
  .sure {
    cursor: pointer;
    display: inline;
    background: #000;
    color: #fff;
    padding: 0.3em 1em;
  }
}
.pay-card {
  display: flex;
  min-height: 20rem;
  border: 1px solid #ccc;
  width: 70rem;
  margin: 0 auto;
  margin-top: 4rem;
  margin-bottom: 10rem;
  box-shadow: 0.1rem 0 0.35rem rgba(36, 36, 36, 0.2);
  border-radius: 0.25rem;
  .icon {
    display: flex;
    align-items: center;
    padding: 0 3.6rem;
    border-right: 1px solid #ccc;
    .img {
      width: 9rem;
      height: 9rem;
    }
  }
  .info {
    flex-grow: 1;
    position: relative;
    cursor: pointer;
    padding: 30px 40px 30px 40px;
    .balance {
      .title {
        padding-bottom: 0.4rem;
      }

      .money {
        padding-bottom: 0.4rem;
        .recharge {
          display: inline-block;
          padding: 2px 20px;
          border: 1px solid #ccc;
          margin-right: 10px;
        }
        .cash {
          border: 1px solid #ccc;
          padding: 2px 20px;
          display: inline-block;
        }
      }
      .all-card {
        position: absolute;
        right: 10px;
        top: 20px;
        color: #4093a5;
      }
    }
    .card-wrap {
      padding-top: 2rem;
      .title {
        padding-bottom: 0.4rem;
      }
      .money-wrap {
        span {
          padding: 0 1em;
          border: 1px solid #ccc;
          &.active {
            border: 1px solid #fbecd2;
            background: #fbecd2;
            // color:#fff;
          }
        }
        .input-money {
          width: 5em;
          margin-top: 1em;
          position: relative;
          &::after {
            position: absolute;
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            content: "元";
            display: inline-block;
            padding-left: 1em;
          }
          input {
            width: 100%;
          }
        }
      }
    }
  }
  .pay-way {
    width: 15rem;
    border-left: 1px solid #ccc;
    padding-top: 2rem;
    padding-left: 1rem;
    .way {
      padding-top: 0.5rem;
      span {
        padding: 0 1em;
        margin-right: 0.5em;
        cursor: pointer;
        &.active {
          color: #4093a5;
        }
      }
    }
    .pay-code {
      height: 12rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .code {
        width: 5rem;
        height: 5rem;
        border: 1px solid #ccc;
      }
      .tips {
      }
    }
    .sure {
      text-align: center;
      span {
        cursor: pointer;
        display: inline;
        background: #000;
        color: #fff;
        padding: 0.3em 1em;
      }
    }
  }
}
</style>