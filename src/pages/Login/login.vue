<template>
  <div>
    <div class="login-box">
      <div class="login-mask"></div>
      <div class="login">
        <div class="login-icon">
          <div class="login-icon-pic"></div>
        </div>
        <div class="form">
          <div class="form_title" @click="changeLoginWay">
            <div :class="['form_title-item', (loginWay==='account'?'active':'')]" data-way="account">密码登录</div>
            <i class="border"></i>
            <div :class="['form_title-item', (loginWay==='message'?'active':'')]" data-way="message">短信登录</div>
          </div>
          <div class="form_account" v-show="loginWay==='account'">
            <div class="form_input">
              <input class="input" type="text" placeholder="手机号" style="outline:none;">
            </div>
            <div class="form_input">
              <input class="input" type="text" placeholder="手机号" style="outline:none;">
            </div>
            <div class="form_btn">
              <button>登录</button>
            </div>
          </div>
          <div class="form_message" v-show="loginWay==='message'">
            <div class="form_input">
              <input class="input" type="text" placeholder="手机号">
            </div>
            <div class="form_input">
              <input class="input" type="text" placeholder="手机号">
              <div class="get_code">发送验证码</div>
            </div>
            <div class="form_btn">
              <button>登录</button>
            </div>
          </div>
          <div class="form-footer">
            <div class="auto_login">
              <div class="auto_login-tips">第三方登录：</div>
              <div class="auto_login-icon"></div>
              <div class="auto_login-icon"></div>
            </div>
            <div class="register">注册</div>
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
    changeLoginWay(e) {
      console.log(e.target.dataset.way)
      this.loginWay = e.target.dataset.way || this.loginWay;
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
    transform: translate(-50%, -50%);
    background: #fff;
    z-index: 101;
    display: flex;
    border-radius: 0.5vw;
    overflow: hidden;
    &-icon{
      width: 17.1rem;
      background: #12acac;
      &-pic{}
    }
    .form{
      width: 30rem;
      padding: 1.1rem 3.1rem 1.9rem 2.4rem;
      background-color: #d9ebc5;
      position: relative;
      &_title{
        display: flex;
        font-family: MicrosoftYaHei;
        font-size: 0.7vw;
        font-weight: normal;
        font-stretch: normal;
        // line-height: 0.2vw;
        letter-spacing: 0vw;
        color: #2c2c2c;
        &-item{
          border:1px solid transparent;
          &.active{border-bottom: 1px solid #000;}
          &:hover{
            cursor: default;
            border-bottom: 1px solid #000;
          }
        }
        margin-bottom: 1.2vw;
        .border{
          width: 2px;
          margin: 3px 8px;
          background: #fff;
        }
      }
      &_account{
        .form_input{
          margin-bottom: 1rem;
          input{
            box-shadow: none;
            outline: none;
            &:focus{
              box-shadow: none;
              outline: none;
            }
          }
          .input{
            height: 3rem;
            padding-left: 20px;
            background: #E6F1D9;
            border-radius: 0.5vw;
            border:2px solid #fff;
            font-family: MicrosoftYaHei;
            font-size: 0.6vw;
            font-weight: normal;
            font-stretch: normal;
            // line-height: 0.2vw;
            letter-spacing: 0vw;
            color: #999999;
          }
        }
        .form_btn{
          margin-top: 1rem;
          button{
            
            &:hover{
              border:none;
              background: #efefef;
            }
            outline: none;
            border:none;
            width: 100%;
            height: 2rem;
            font-family: MicrosoftYaHei;
            font-size: 0.40rem;
            font-weight: normal;
            font-stretch: normal;
            // line-height: 0.2rem;
            letter-spacing: 0rem;
            color: #2c2c2c;            
            background: #fff;
            border-radius: 1.3rem;
          }
        }
      }
      &_message{
        .form_input{
          position: relative;
          margin-bottom: 1rem;
          input{
            box-shadow: none;
            outline: none;
            &:focus{
              box-shadow: none;
              outline: none;
            }
          }
          .get_code{
            cursor: pointer;
            width: 6rem;
            height: 2rem;
            margin-right: 0.4rem;
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
          .input{
            height: 3rem;
            padding-left: 20px;
            background: #E6F1D9;
            border-radius: 0.5vw;
            border:2px solid #fff;
            font-family: MicrosoftYaHei;
            font-size: 0.6vw;
            font-weight: normal;
            font-stretch: normal;
            // line-height: 0.2vw;
            letter-spacing: 0vw;
            color: #999999;
          }
        }
        .form_btn{
          margin-top: 1rem;
          button{
            
            &:hover{
              border:none;
              background: #efefef;
            }
            outline: none;
            border:none;
            width: 100%;
            height: 2rem;
            font-family: MicrosoftYaHei;
            font-size: 0.40rem;
            font-weight: normal;
            font-stretch: normal;
            // line-height: 0.2rem;
            letter-spacing: 0rem;
            color: #2c2c2c;            
            background: #fff;
            border-radius: 1.3rem;
          }
        }      
      }
      &-footer{
        margin-top: 1.5rem;
        display: flex;
        justify-content: space-between;
        font-family: MicrosoftYaHei;
        font-size: 0.7vw;
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
        }
      }
    }
  }
}
</style>
