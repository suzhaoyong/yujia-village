<template>
  <div>
    <div class="body">
      <div class="identity" v-show="false">
        <div class="box">
          <div class="img">
            <img :src="icon.identity_1" alt />
          </div>
          <div class="type">我是馆主</div>
        </div>

        <div class="box id2">
          <div class="img">
            <img :src="icon.identity_2" alt />
          </div>
          <div class="type">馆主&amp;教练</div>
        </div>

        <div class="box id3">
          <div class="img">
            <img :src="icon.identity_3" alt />
          </div>
          <div class="type">我是教练</div>
        </div>
      </div>
      <div class="my-identity" v-show="false">
        <div class="icon">
          <div class="img">
            <img :src="icon.identity_1" alt />
          </div>
        </div>
        <div class="info">
          <div class="balance">
            <div class="title">
              <span>账户余额</span>
              <span style="color:#4093A5;margin-left:10px;">显示金额</span>
            </div>
            <div class="money">
              <span>8888</span>
              <div class="recharge">充值</div>
              <div class="cash">提现</div>
            </div>
            <span class="all-card">我的全部银行卡</span>
          </div>
          <div class="card-wrap">
            <div class="title">
              <span>银行卡管理</span>
              <span style="color:#4093A5;margin-left:10px;">添加银行卡</span>
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
      <div class="input-card" v-show="false">
        <div class="icon">
          <div class="img">
            <img :src="icon.identity_1" alt />
          </div>
        </div>
        <div class="card">
          <div class="title">
            尊贵的
            <span>馆主</span> 未查询到您的银行卡信息，请完整信息：
          </div>
          <div style="padding-bottom:1em;">请填写银行卡号码</div>
          <div class="input-box">
            <el-input v-model="ruleForm.bank_card" type="text" />
            <div class="bank-card">
              <div class="name">建设银行</div>
              <div class="tipd">识别有误，手动填写</div>
            </div>
          </div>
          <div>
            <span class="sure">确定</span>
          </div>
        </div>
      </div>
      <div class="pay-card" v-show="true">
        <div class="icon">
          <div class="img">
            <img :src="icon.identity_1" alt />
          </div>
        </div>
        <div class="info">
          <div class="balance">
            <div class="title">
              <span>账户余额</span>
              <span style="color:#4093A5;margin-left:10px;">显示金额</span>
            </div>
            <div class="money">
              <span>8888</span>
              <div class="recharge">充值</div>
              <div class="cash">提现</div>
            </div>
          </div>
          <div class="card-wrap">
            <div class="title">
              <span>充值金额</span>
            </div>
            <div class="money-wrap">
              <span>300</span>
              <span>500</span>
              <span>800</span>
              <span>1000</span>
              <span>2000</span>
              <span>5000</span>
              <div class="input-money">
                <input type="text" placeholder="填写金额">
              </div>
            </div>

          </div>
        </div>
        <div class="pay-way">
          <div>支付方式</div>
          <div class="way">
            <span>微信</span>
            <span>支付宝</span>
            <span>银行卡</span>
          </div>
          <div class="pay-code">
            <div class="code"></div>
            <div class="tips">刷新二维码</div>
          </div>
          <div class="sure">
            <span>确定</span>
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
export default {
  data() {
    return {
      icon: {
        identity_1,
        identity_2,
        identity_3
      },
      ruleForm: {
        bank_card: ""
      },
      apply: {
        money: ""
      },
      recharge: {
        num: "",
        payment: ""
      }
    };
  },
  mounted() {
    // this.getBankCardInfo();
  },
  methods: {
    /** 充值 */
    reCharge() {
      const params = Object.assign({}, this.recharge);
      this.$request.post(`/personal/recharge`, params).then(data => {});
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
.identity {
  display: flex;
  justify-content: center;
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
  display: flex;
  min-height: 20rem;
  border: 1px solid #ccc;
  width: 70rem;
  margin: 0 auto;
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
      .money-wrap{
        span{
          padding: 0 1em;
          border: 1px solid #ccc;
        }
        .input-money{
          width: 5em;
          margin-top: 1em;
          position: relative;
          &::after{
            position: absolute;
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            content:'元';
            display: inline-block;
            padding-left: 1em;
          }
          input{
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

      }
    }
    .pay-code {
      height: 12rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .code {
        width: 3rem;
        height: 3rem;
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