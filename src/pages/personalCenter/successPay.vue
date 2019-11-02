
<template>
  <div class="success-wrap">
    <div class="success-box">
      <div class="titles">您已付款成功</div>
      <div class="tips_problame">如遇到任何问题请拨打：400-100-7191</div>
      <div class="tips_kefu">客服在线时间：周一至周日（08：00-21：00）</div>
      <div class="btn-wrap">
        <span class="view" @click="viewOrder">查看订单</span>
        <span class="back" @click="back">返回首页</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    viewOrder() {
      // this.$router.push({ name: 'personal recode'})
    },
    back() {
      this.$router.push('/main')
    }
  }
}
</script>
<style lang="scss" scoped>
*{
  font-size: 0.7rem;
  color: #2c2c2c;
  margin: 0;
  padding: 0;
}
  .success-wrap{
    .success-box{
      width: 60rem;
      margin: 0 auto;
      margin-top: 3rem;
      box-shadow: 1px 2px 10px #eee;
      .titles{
        padding-top: 2.6rem;
        font-size: 1.5rem;
        margin-left: 6.6rem;
        margin-bottom: 2rem;
        font-weight: bolder;
        color: #68B65B;
      }
      .tips_problame{
        margin-left: 6.6rem;
        margin-bottom: 2rem;
        position: relative;
        &::after{
          color: #999;
          font-size: 0.6rem;
          content: 'If you encounter any problems, please call：400-100-7191';
          width: 40em;
          position: absolute;
          top: 100%;
          left: 0;
          // text-transform : uppercase;
        }
      }
      .tips_kefu{
        margin-left: 6.6rem;
        margin-bottom: 2rem;
        position: relative;
        &::after{
          color: #999;
          font-size: 0.6rem;
          content: 'Customer service online time：Monday to Sunday（08：00-21：00）';
          width: 40em;
          position: absolute;
          top: 100%;
          left: 0;
          // text-transform : uppercase;
        }
      }
      .btn-wrap{
        padding-left: 6.6rem;
        padding-top: 1.25rem;
        padding-bottom: 0.9rem;
        border-top: 1px solid #eee;
        .view{
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
        .back{
          border-radius: 0.2rem;
          font-size: 0.9rem;
          cursor: pointer;
          width: 7rem;
          height: 3rem;
          margin-left: 2rem;
          line-height: 3rem;
          color: #68B75B;
          text-align: center;
          background: #fff;
          border: 1px solid #eee;
          display: inline-block;
        }
      }
    }
  }
</style>