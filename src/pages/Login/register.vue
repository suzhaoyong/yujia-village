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
              <div class="item-box left">
                <div class="item-box-title">用户名/USERNAME</div>
                <div class="item-box-input"><input type="text" v-model="ruleForm.userName"/></div>
                <div class="item-box-tips">{{isError('userName')}}</div>
              </div>
              <div class="item-box right">
                <div class="item-box-title">电话/PHONE</div>
                <div class="item-box-input"><input type="text" v-model="ruleForm.phone"/></div>
                <div class="item-box-tips">{{isError('phone')}}</div>
              </div>
            </div>
            <div class="item">
              <div class="item-box">
                <div class="item-box-input"><input type="text" v-model="ruleForm.code"/><div class="get_code">发送验证码</div></div>
                <div class="item-box-tips">{{isError('code')}}</div>
              </div>
            </div>
            <div class="item">
              <div class="item-box left">
                <div class="item-box-title">请设置密码/PASSWORD</div>
                <div class="item-box-input" style="padding-bottom:0;"><input type="password" style="height:1.5rem;width:125%;" v-model="ruleForm.password1"/></div>
                <div class="item-box-input"><input type="password" style="height:1.5rem;width:125%;" v-model="ruleForm.password2"/></div>
                <div class="item-box-tips">{{isError('password1')}}</div>
              </div>
              <div class="item-box right">
                <div class="item-box-btn">注册</div>
              </div>
            </div>
          </div>
          <div class="form-footer">
            <div class="auto_login">
              <div class="auto_login-tips">第三方登录：</div>
              <div class="auto_login-icon"></div>
              <div class="auto_login-icon"></div>
            </div>
            <div class="register" @click="goLogin">已有账号</div>
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
      loginWay: 'account',
      ruleForm: {
        userName: '',
        phone: '',
        code: '',
        password1: '',
        password2: ''
      },
      ruleFormErrorRule: {
        userName: {show: false, msg:'请输入用户名'},
        phone: {show: false, msg:'请输入电话'},
        code: {show: false, msg:'请输入验证码'},
        password1: {show: false, msg:'请输入密码'},
        password2: {show: false, msg:'请输入密码'},
      },
      ruleFormCheckErrorRule: {
        userName: {show: false, msg:'用户昵称已占用'},
        phone: {show: false, msg:'手机号码已注册'},
        code: {show: false, msg:'验证码有误，请重新输入'},
        password1: {show: false, msg:'两次密码不一致'},
        password2: {show: false, msg:'两次密码不一致'},
      },
    }
  },
  computed: {
    isError() {
      return function (item) {
          if(this.ruleFormErrorRule[item].show){
            return this.ruleFormErrorRule[item].msg
          }
          if(this.ruleFormCheckErrorRule[item].show){
            return this.ruleFormCheckErrorRule[item].msg
          }
          return '';
      }
    },
  },
  methods: {

    goLogin() {
      this.$router.push({
        name: 'Login'
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
      &-box{
        .item{
          display: flex;
          padding: 0.1rem 0;
          &-box{
            position: relative;
            // border: 1px solid red;
            flex-grow: 1;
            font-size:12px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(44,44,44,1);
            &.left{
              flex-basis: 50%;
            

            }
            &.right{
              flex-basis: 50%;
            }
            &-title{
              padding-left: 15px;
            }
            &-input{
              width: 100%;
              padding: 5px 10px;
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
              .get_code {
                cursor: pointer;
                user-select: none;
                width: 6rem;
                height: 1.6rem;
                margin-right: 1.2rem;
                border-radius: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #fff;
                font-size:0.88rem;
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:rgba(44,44,44,1);
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
              }
            }
            &-tips{
              padding-left: 15px;
              font-size:0.6rem;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(206,85,26,1);
              height: 1.2rem;
            }
            &-btn{
                
              &:hover{
                border:none;
                background: #efefef;
              }
              position: absolute;
              right: 0;
              bottom: 0;
              transform: translateY(-50%);
              outline: none;
              border:none;
              width: 100%;
              width: 6.15rem;
              height: 2.15rem;
              font-family: MicrosoftYaHei;
              font-size: 0.40rem;
              font-weight: normal;
              font-stretch: normal;
              // line-height: 0.2rem;
              letter-spacing: 0rem;
              color: #2c2c2c;            
              background: #fff;
              border-radius: 1.3rem;
              display: flex;
              justify-content: center;
              align-items: center;
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
