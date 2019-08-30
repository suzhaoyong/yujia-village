<template>
  <div>
    <div class="order">订单提交成功，请尽快付款！订单号：10000001000000</div>
    <div class="payway">
      <div class="payway_money">
        <div class="title">余额支付</div>
        <div class="fee">
          支付
          <span style="color:#BC2E33;">55.00</span>元
        </div>
        <div class="balance">
          <div class="icon"></div>
          <span class="text">账号余额</span>
          <span style="padding-left:5rem;">可用余额1000金币</span>
        </div>
        <div class="pay_password">
          <div class="tips">请输入密码支付</div>
          <div class="input-box">
            <el-input class="password" type="password"></el-input>
            <div class="password-tips">忘记密码</div>
          </div>
        </div>
      </div>
      <div class="payway_code">
        <div class="title">扫码支付</div>
        <div class="tags">
          <div class="tag active">支付宝扫码</div>
          <div class="tag">微信扫码</div>
        </div>
        <div class="tags_body">
          <div class="code">
            <div class="code_tips">
              距离二维码过期还有
              <span style="color:#BC2E33;">57</span>秒,过期后请重新刷新页面获取二维码
            </div>
            <div class="code_play"></div>
          </div>
          <div class="code_img"></div>
        </div>
      </div>
    </div>
  </div>
</template><script>
export default {};
</script>
<style scoped lang="scss">
.order {
  width: 60rem;
  margin: 0 auto;
  padding: 2rem 0 1rem 2rem;
  font-size: 0.7rem;
  color: #2c2c2c;
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
        .code_play {
          margin-left: 3rem;
          width: 14rem;
          height: 14rem;
          position: relative;
          border: 1px solid #ccc;
          &::after {
            content: "请使用支付宝扫一扫功能";
            width: 100%;
            margin-top: 0.5rem;
            position: absolute;
            top: 100%;
            text-align: center;
          }
        }
      }
      .code_img {
        margin-left: 8rem;
        width: 14rem;
        height: 20rem;
        border: 1px solid #ccc;
      }
    }
  }
}
</style>