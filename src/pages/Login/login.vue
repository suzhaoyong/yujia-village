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
              <input class="input" v-model.trim="accountRuleForm.name" type="text" placeholder="手机号"
                @blur="checkEmtypeInputBox('name')"
                style="outline:none;">
              <div class="form_input-tips">{{accountErrorRule.name.show?accountErrorRule.name.msg:''}}</div>
            </div>
            <div class="form_input">
              <input class="input" v-model.trim="accountRuleForm.password" type="password" placeholder="输入密码" 
                @blur="checkEmtypeInputBox('password')"
                style="outline:none;">
              <div class="form_input-tips">{{accountErrorRule.password.show?accountErrorRule.password.msg:''}}</div>
            </div>
            <div class="form_btn">
              <button @click.stop="submitForm('account')">登录</button>
            </div>
          </div>
          <div class="form_message" v-show="loginWay==='message'">
            <div class="form_input">
              <input class="input" type="text" 
                v-model.trim="messageRuleForm.phone"
                @blur="checkEmtypeInputBox('phone')"
                placeholder="输入手机号">
              <div class="form_input-tips">{{messageErrorRule.phone.show?messageErrorRule.phone.msg:''}}</div>
            </div>
            <div class="form_input">
              <input class="input" type="text" 
                v-model.trim="messageRuleForm.code"
                @blur="checkEmtypeInputBox('code')"
                placeholder="输入验证码">
              <div class="get_code" @click="getCode">{{codeTips.msg}}</div>
              <div class="form_input-tips">{{messageErrorRule.code.show?messageErrorRule.code.msg:''}}</div>
            </div>
            <div class="form_btn">
              <button @click.stop="submitForm('message')">登录</button>
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
import 'bulma/css/bulma.css';
import {Exp} from '@/utils/bee.js';
export default {
  data() {
    return {
      codeTips: {
        msg: '发送验证码',
        count: 0
      },
      accountErrorRule: {
        name: {show: false, msg:'请输入正确的手机号'},
        password: {show: false, msg:'请输入密码'},
      },
      accountRuleForm: {
        name: '',
        password: '',
      },
      messageErrorRule: {
        phone: {show: false, msg:'请输入正确的手机号'},
        code: {show: false, msg:'请输入验证码'},
      },
      messageRuleForm: {
        phone: '',
        code: '',
      },
      loginWay: 'account'
    }
  },
  methods: {
    submitForm(name) {
      console.log(name)
      let isPass = this.formVaildent(name);
      if(isPass) {

      } else {

      }
    },
    formVaildent(name) { // 提交按钮校验输入框
      let _error = this[`${name}ErrorRule`];
      let _form = this[`${name}RuleForm`];
      let is_pass = true;
      for(let key of Object.keys(_form)) {
        if (_form[key] === '') {
          _error[key].show = true;
          is_pass = false;
        }
      }
      return is_pass;
    },
    getCode() { //获取验证码
      if(this.messageRuleForm.phone === '') {
        this.messageErrorRule.phone.show = true;
        return;
      }
      if(this.codeTips.count > 0) return;
      this.codeTips.count = 59;
      let timer = setInterval(() => {
        this.codeTips.msg = `${this.codeTips.count--}s重新获取`;
        if(this.codeTips.count <= 0) {
          clearInterval(timer);
          this.codeTips.msg = '重新获取';
        }
      }, 1000);
    },
    goRegister() {
      this.$router.push({
        name: 'Register'
      })
    },
    resetCode() { // 重置获取验证码
      this.codeTips.msg = '发送验证码';
      this.codeTips.count = 0;
    },
    changeLoginWay(e) { // 切换登录方式
      this.loginWay = e.target.dataset.way || this.loginWay;
      let _way_obj = {
        account: 'message',
        message: 'account',
      }
      this.resetInputStatus(_way_obj[this.loginWay]);
      this.resetCode();
    },
    resetInputStatus(name) { //重置输入框和错误提示
      let _error = this[`${name}ErrorRule`];
      let _form = this[`${name}RuleForm`];
      for(let key of Object.keys(_error)) {
        _error[key].show = false;
      }
      for(let key of Object.keys(_form)) {
        _form[key] = '';
      }
    },
    
    checkEmtypeInputBox(item) { // 输入框失去焦点适合有值，空则显示错误提示
      let isRightExp = this.checkExpInputItem(item);
      if (!isRightExp) {
        this[`${this.loginWay}ErrorRule`][item].show = true;
        return;
      }
      let _input_value = this[`${this.loginWay}RuleForm`][item];
      if(_input_value) {
        this[`${this.loginWay}ErrorRule`][item].show = false;
      }else{
        this[`${this.loginWay}ErrorRule`][item].show = true;
      }
    },
    checkExpInputItem(item) { // 正则校验输入的值是否合法
      let { PhoneUtils,StringUtils } = Exp();
      let _check_item = {
        'name': PhoneUtils.isPhoneNum,
        'password': StringUtils.isSpecialCharacterAlphanumeric,
      }
      let _input_value = this[`${this.loginWay}RuleForm`][item];
      let _is_pass = _check_item[item]&&_check_item[item](_input_value);
      return _is_pass;
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
          // margin-bottom: 1rem;
          &-tips{
            height: 1.3rem;
            padding-top: 2px;
            font-size:0.6rem;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(206,85,26,1);
          }
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
            color: #2C2C2C;
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
          // margin-bottom: 1rem;
          &-tips{
            height: 1.3rem;
            padding-top: 2px;
            font-size:0.6rem;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(206,85,26,1);
          }
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
            user-select: none;
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
            top: 20%;
            transform: translateY(-20%);
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
            color: #2C2C2C;
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
        margin-top: 2.0rem;
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
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
