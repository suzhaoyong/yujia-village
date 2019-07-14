<template>
  <div>
    <div class="login-box">
      <div class="login-mask"></div>
      <div class="login">
        <div class="login-icon">
          <div class="login-icon-pic"></div>
        </div>
        <div class="form">
          <div class="form-box">
            <div class="item">
              <div class="item-title" style="width:7em;line-height:1.2rem">您当前手机号:</div>
              <div class="item-content" style="color:#2C2C2C;font-weight:bold;">152*****093</div>
            </div>
            <div class="item">
              <div class="item-title">验证码</div>
              <div class="item-content">
                <div class="item-content-input"><input type="text"/><div class="get_code">发送验证码</div></div>
                <div class="item-content-tips">{{true?'验证码错误':''}}</div>
              </div>
            </div>
            <div class="item">
              <div class="item-title">新密码</div>
              <div class="item-content">
                <div class="item-content-input"><input type="password" name="" id=""/></div>
                <div class="item-content-tips">{{true?'密码存在异常字符':''}}</div>
              </div>
            </div>
            <div class="item">
              <div class="item-title">再次确认</div>
              <div class="item-content">
                <div class="item-content-input"><input type="password" name="" id=""/></div>
                <div class="item-content-tips">{{true?'二次密码不一致，请仔细确认':''}}</div>
              </div>
            </div>
            <div class="item">
              <div class="item-content" style="display: flex;justify-content: flex-end; padding-top:0.5rem;">
                <div class="item-content-btn">返回</div>
                <div class="item-content-btn">提交</div>
              </div>
            </div>
          </div>
          <div class="form-footer">
            <div class="auto_login">
              <div class="auto_login-tips">第三方登录：</div>
              <div class="auto_login-icon"></div>
              <div class="auto_login-icon"></div>
            </div>
            <div class="register" @click="goRegister">注册</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import 'bulma/css/bulma.css'
export default {
  data() {
    return {
      loginWay: 'account'
    }
  },
  methods: {
    goRegister() {
      this.$router.push({
        name: 'Register'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
*{
  box-sizing: border-box!important;
}
input{outline:none!important;}
input:focus {outline: none;}
.login-box{
  .login-mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 100;
  }
  .login{
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -30%);
    background: #fff;
    z-index: 101;
    display: flex;
    border-radius: 0.5vw;
    overflow: hidden;
    height: 21rem;
    &-icon{
      width: 14.1rem;
      background: #12acac;
      &-pic{}
    }
    .form{
      width: 26rem;
      padding: 3rem 2rem 2rem;
      background-color: #d9ebc5;
      position: relative;
      font-size: 0.7rem;
      &-box{
        .item{
          display: flex;
          padding: 0.1rem 0;
          &-title{
            width: 5em;
            line-height: 2rem;
          }
          &-content{
            // border:1px solid red;
            flex-grow: 1;
            &-input{
              width: 100%;
              position: relative;
              input{
                width: 100%;
                height:2rem;
                background:#E7F0DA;
                opacity: 1;
                border:1px solid #FFFFFF;
                border-radius:0.3rem;
                padding-left: 5px;
              }
              .get_code{
                cursor: pointer;
                user-select: none;
                width: 6rem;
                height: 2rem;
                border-radius: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #fff;
                position: absolute;
                font-size:0.88rem;
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:rgba(44,44,44,1);
                right: 0;
                top: 50%;
                transform: translateY(-50%);
              }
            }
            &-tips{
              color:#D83211;
              padding-top: 0.3rem;
              padding-left: 1rem;
              height: 1.2rem;
            }
            &-btn{
              width: 5rem;
              height: 2rem;
              background-color: #fff;
              border-radius: 5px;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              &:nth-child(2){
                margin-left: 2rem;
              }
            }
          }
        }
      }
      &-footer{
        margin-top: 0.5rem;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        font-family: MicrosoftYaHei;
        font-size:0.7rem;
        font-weight: normal;
        font-stretch: normal;
        // line-height: 0.2vw;
        letter-spacing: 0vw;
        color: #2c2c2c;
        .auto_login{
          display: flex;
          align-items: center;
          &-tips{}
          &-icon{
            width: 1.7rem;
            height: 1.7rem;
            background: #000;
            border-radius: 50%;
            margin-right: 10px;
          }
        }
        .register{
          cursor: pointer;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
