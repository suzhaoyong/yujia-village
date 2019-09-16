<template>
  <div>
    <div class="login-box">
      <div class="login-mask" @click="() => this.$emit('close', '')"></div>
      <div class="login">
        <!-- <div class="login-icon">
          <div class="login-icon-pic"></div>
        </div> -->
        <div class="form">
          <div class="form-head">
            <h4>找回密码</h4>
            <div class="head-border"></div>
          </div>
          <div class="form-box">
            <div class="item">
              <div class="item-title" style="width:100%;line-height:1.2rem;color:#999;padding-bottom:10px;">验证码将会发送到您绑定的手机上</div>
            </div>
            <div class="item">
              <div class="item-title" style="width:7em;line-height:1.2rem">您当前手机号:</div>
              <div class="item-content" style="color:#2C2C2C;font-weight:bold;">152*****093</div>
            </div>
            <div class="item">
              <!-- <div class="item-title">验证码</div> -->
              <div class="item-content">
                <div class="item-content-input"><input type="text" placeholder="请输入短信验证码"/><div class="get_code">发送验证码</div></div>
                <div class="item-content-tips">{{true?'验证码错误':''}}</div>
              </div>
            </div>
            <div class="item">
              <!-- <div class="item-title">新密码</div> -->
              <div class="item-content">
                <div class="item-content-input"><input type="password" name="" id="" placeholder="新密码"/></div>
                <div class="item-content-tips">{{true?'密码存在异常字符':''}}</div>
              </div>
            </div>
            <div class="item">
              <!-- <div class="item-title">再次确认</div> -->
              <div class="item-content">
                <div class="item-content-input"><input type="password" name="" id="" placeholder="再次确认"/></div>
                <div class="item-content-tips">{{true?'二次密码不一致，请仔细确认':''}}</div>
              </div>
            </div>
            <div class="item">
              <div class="item-content" style="display: flex;justify-content: space-between; padding-top:0.5rem;">
                <div class="item-content-btn"></div>
                <div class="item-content-btn">想起来了，<span style="color:#7FB36B" @click="goLogin">马上登录</span></div>
              </div>
            </div>
          </div>
          <div class="form-footer">
            <div class="auto_login">
              <!-- <div class="auto_login-tips">第三方登录：</div>
              <div class="auto_login-icon"></div>
              <div class="auto_login-icon"></div> -->
              提交
            </div>
            <div class="register" @click="goLogin">返回</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Bus from "@/utils/Bus"
export default {
  data() {
    return {
      loginWay: 'account'
    }
  },
  methods: {
    goRegister() {
      // this.$router.push({
      //   name: 'Register'
      // })
    },
     goLogin() {
      // this.$router.push({
      //   name: 'Login'
      // })
      this.$emit("go-login", "login");
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
    // height: 21rem;
    &-icon{
      width: 14.1rem;
      background: #12acac;
      &-pic{}
    }
    .form{
      width: 27rem;
      padding: 1.5rem 1.5rem 1.5rem;
      background-color: #F6FCF3;
      position: relative;
      font-size: 0.7rem;
      &-head{
        padding-top: 10px;
        h4{
          color: #548940;
          font-size: 16px;
          text-align: center;
          font-family:Microsoft YaHei;
          font-weight:bold;
        }
        .head-border{
          height: 3px;
          background-color: #548940;
          margin-top: 15px;
          margin-bottom: 15px;
        }
      }
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
                height:3rem;
                background:#F6FCF3;
                opacity: 1;
                border: none;
                border-bottom:1px solid #ccc;
                border-radius:0.3rem;
                padding-top: 15px;
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
                background: #7FB36B;
                position: absolute;
                font-size:0.8rem;
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:#fff;
                right: 0;
                top: 55%;
                transform: translateY(-50%);
              }
            }
            &-tips{
              color:#D83211;
              padding-top: 0.3rem;
              // padding-left: 1rem;
              height: 1.2rem;
            }
            &-btn{
              // width: 5rem;
              height: 2rem;
              border-radius: 5px;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              color: #999;
              &:nth-child(2){
                // margin-left: 2rem;
                // width: 8rem;
                height: 2rem;
                border-radius: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
              }
            }
          }
        }
      }
      &-footer{
        margin-top: 0.5rem;
        padding: 20px 0px;
        // display: flex;
        // justify-content: space-between;
        font-family: MicrosoftYaHei;
        font-size:0.7rem;
        font-weight: normal;
        font-stretch: normal;
        // line-height: 0.2vw;
        letter-spacing: 0vw;
        color: #2c2c2c;
        cursor: pointer;
        .auto_login{
          height: 50px;
          background-color: #548940;
          color: #fff;
          text-align: center;
          margin: 0 auto;
          width: 100%;
          font-size: 16px;
          line-height: 50px;
          border-radius: 5px;
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
          text-align: right;
          margin-top: 20px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
