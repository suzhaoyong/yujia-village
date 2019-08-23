<template>
  <div>
    <div class="body">
      <div class="identity">
        <div class="box">
          <div class="img"></div>
          <div class="type">我是馆主</div>
        </div>

        <div class="box">
          <div class="img"></div>
          <div class="type">馆主&amp;教练</div>
        </div>

        <div class="box">
          <div class="img"></div>
          <div class="type">我是教练</div>
        </div>
      </div>
      <div class="my-identity">
        <div class="icon"></div>
        <div class="info">
          <div class="balance">
            <div class="title">
              <span>账户余额</span>
              <span>显示金额</span>
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
              <span>添加银行卡</span>
            </div>
            <div class="card-box">
              <div class="card">
                <div class="name"></div>
                <div class="number">尾号</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="input-card">
        <div class="icon"></div>
        <div class="card">
          <div class="title">
            尊贵的
            <span>馆主</span> 未查询到您的银行卡信息，请完整信息：
          </div>
          <div>请填写银行卡号码</div>
          <div class="input-box">
            <input v-model="ruleForm.bank_card" type="text" />
            <div class="bank-card">
              <div class="name">建设银行</div>
              <div class="tipd">识别有误，手动填写</div>
            </div>
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
export default {
  data() {
    return {
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
    this.getBankCardInfo();
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
</style>