<template>
  <div>
    <div class="login-box">
      <div class="login-mask" @click="() => this.$emit('close', '')"></div>
      <div class="login">
        <div class="form">
          <div class="form-head">
            <h4>找回密码</h4>
            <div class="head-border"></div>
          </div>
          <div class="form-box">
            <div class="item">
              <div class="item-title" style="width:100%;line-height:1.2rem;color:#999;padding-bottom:10px;">验证码将会发送到您的手机上</div>
            </div>
            <div class="item">
              <div class="item-content">
                <div class="item-content-input">
                  <input type="password" @blur="checkEmtypeInputBox('tel')" v-model.trim="ruleForm.tel" placeholder="请输入电话"/>
                </div>
                <div class="item-content-tips">{{isError('tel')}}</div>
              </div>
            </div>
            <div class="item">
              <div class="item-content">
                <div class="item-content-input">
                  <input type="text" @blur="checkEmtypeInputBox('verification_code')" v-model.trim="ruleForm.verification_code" placeholder="请输入短信验证码"/>
                  <div class="get_code" @click="getCodeMessage">发送验证码</div>
                </div>
                <div class="item-content-tips">{{isError('verification_code')}}</div>
              </div>
            </div>
            <div class="item">
              <div class="item-content">
                <div class="item-content-input">
                  <input type="password" @blur="checkEmtypeInputBox('password')" v-model.trim="ruleForm.password" placeholder="新密码"/>
                </div>
                <div class="item-content-tips">{{isError('password')}}</div>
              </div>
            </div>
            <div class="item">
              <div class="item-content">
                <div class="item-content-input">
                  <input type="password" @blur="checkEmtypeInputBox('password2')" v-model.trim="ruleForm.password2" placeholder="再次确认"/>
                </div>
                <div class="item-content-tips">{{isError('password2')}}</div>
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
            <div class="auto_login" :style="`${isPostting?'pointer-events:none;':''}`" @click="submit">提交</div>
            <div class="register" @click="goLogin">返回</div>
          </div>
        </div>
      </div>
    </div>
      <el-dialog style="margin-top:1rem;" width="35rem" title="图形验证码" :visible.sync="getCodepass">
        <div class="item-box left">
          <div class="code-title">请在下方填写图形验证码</div>
          <div class="code-img">
            <img :src="verification.code_img" alt />
            <div class="change-code" @click="getVerificationCode">看不清？换一张</div>
          </div>
          <div class="box-input">
            <input
              type="text"
              @blur="checkEmtypeInputBox('captcha')"
              v-model="ruleForm.captcha"
            />
          </div>
          <div class="box-tips">{{isError('captcha')}}</div>
        </div>
        <span slot="footer">
          <el-button type="primary" @click="getCodeMessage2">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
import Bus from "@/utils/Bus"
import { Exp } from "@/utils/bee.js";
import store from "@/store";
import Validator from '@/utils/Validator.js'
export default {
  data() {
    return {
      msg:"",
      isPostting: false,
      getCodepass:false,
      ruleForm: {
        tel:"",//电话
        password: "",//设置密码
        password2: "",//确认密码
        verification_key: "", // 短信验证码的key
        verification_code: "", // 短信验证码
        key: "", // 图形验证码的key
        captcha: "", // 图形验证码
      },
       ruleFormErrorRule: {
        tel: { show: false, msg: "请输入电话" },
        captcha: { show: false, msg: "请输入验证码" },
        verification_code: { show: false, msg: "请输入验证码" },
        password: { show: false, msg: "请输入密码" },
        password2: { show: false, msg: "请输入密码" }
      },
      ruleFormCheckErrorRule: {
        tel: { show: false, msg: "请输入正确的手机号" },
        captcha: { show: false, msg: "验证码有误，请重新输入" },
        verification_code: { show: false, msg: "验证码有误，请重新输入" },
        password: { show: false, msg: "两次密码不一致" },
        password2: { show: false, msg: "两次密码不一致" }
      },
      verification: {
        code_img: "",
        code_key: ""
      },
    }
  },
  computed: {
    isError() {
      return function(item) {
        if (this.ruleFormErrorRule[item].show) {
          return this.ruleFormErrorRule[item].msg;
        }
        if (this.ruleFormCheckErrorRule[item].show) {
          return this.ruleFormCheckErrorRule[item].msg;
        }
        return "";
      };
    }
  },
  mounted() {
    this.getVerificationCode();
  },
  methods: {
    /* 图形验证码 */
    getVerificationCode() {
      this.$request("/verificationCode").then(data => {
        const { img, key } = data;
        this.verification.code_img = img;
        this.ruleForm.key = key;
      });
    },
    /* 图形验证码校验 */
    postVerificationCode() {
      const { captcha, key } = this.ruleForm;
      captcha &&
        key &&
        this.$request
          .post("/verificationCode", { captcha, key })
          .then(data => {});
    },
    //发送验证码
    getCodeMessage(){
        if (this.ruleForm.tel === "") {
        this.ruleFormErrorRule.tel.show = true;
        this.getCodepass = false;
        }else{
          this.getCodepass = true;
        }
    },
    //验证图形码
    getCodeMessage2(){
      const { captcha, key } = this.ruleForm;
      captcha &&
        key &&
        this.$request
          .post("/verificationCode", { captcha, key })
          .then(data => {
            this.msg = data.msg;
            if(this.msg == "OK"){
              this.getCodepass = false;
              this.getCode();
            }else{
              this.getCodepass = true;
              this.postVerificationCode();
              this.getVerificationCode();
              this.ruleForm.captcha = "";
              this.ruleFormCheckErrorRule.captcha.show = true;
              this.ruleFormCheckErrorRule.captcha.msg;
            }
          })
          .catch(() => {
        });
    },
    //短信验证码
    getCode() {
      this.checkEmtypeInputBox("tel");
      this.checkEmtypeInputBox("captcha");
      const { tel, captcha, key} = this.ruleForm;
      tel &&
      captcha &&
      key &&
        this.$request.post("/getVerificationCode", { tel, captcha, key}).then(data => {
          this.$message({ message: "发送成功", type: "success" });
          this.ruleForm.verification_key = data.key;
        });
    },
    /** 提交 */
  submit() {
    if(!this.validatorRegister()) return;
    const { password, password2} = this.ruleForm
    if(password !== password2) {
      this.$message({ type: 'warning', message: '密码不一致' })
      return;
    }
    this.isPostting = true;
    const params = Object.assign({}, this.ruleForm);
    this.$request
      .post("/personal/forgetPassword", params)
      .then(data => {
        this.$message({ message: "提交成功", type: "success" });
        this.isPostting = false;
        this.$emit("close", "");
      })
      .catch(() => {
        this.isPostting = false;
      });
      
    },
    validatorRegister() {
      const validatorFunc = () => {
        const { tel, password, password2, verification_code, captcha} = this.ruleForm
        let validator = new Validator();

        validator.add(tel, [{
            strategy: 'isNonEmpty',
            errorMsg: '手机号码不能为空！'
        }, {
            strategy: 'isMoblie',
            errorMsg: '手机号码格式不正确！'
        }])

        validator.add(verification_code, [{
            strategy: 'isNonEmpty',
            errorMsg: '短信验证码不能为空！'
        }, {
            strategy: 'minLength:6',
            errorMsg: '短信验证码长度不能小于 6 位！'
        }, {
            strategy: 'maxLength:6',
            errorMsg: '短信验证码长度不能大于 6 位！'
        }])

        validator.add(password, [{
            strategy: 'isNonEmpty',
            errorMsg: '密码不能为空！'
        }, {
            strategy: 'minLength:6',
            errorMsg: '密码长度不能小于 6 位！'
        }, {
            strategy: 'maxLength:18',
            errorMsg: '密码长度不能大于 18 位！'
        }])

        validator.add(password2, [{
            strategy: 'isNonEmpty',
            errorMsg: '密码不能为空！'
        }, {
            strategy: 'minLength:6',
            errorMsg: '密码长度不能小于 6 位！'
        }, {
            strategy: 'maxLength:18',
            errorMsg: '密码长度不能大于 18 位！'
        }])

        validator.add(captcha, [{
            strategy: 'isNonEmpty',
            errorMsg: '图形验证码不能为空！'
        }, {
            strategy: 'minLength:4',
            errorMsg: '图形验证码不能小于 4 位！'
        }, {
            strategy: 'maxLength:4',
            errorMsg: '图形验证码不能大于 4 位！'
        }])

        
        let errorMsg = validator.start()
        return errorMsg
      }
      let errorMsg = validatorFunc()
      if(errorMsg) {
        console.log(errorMsg);
        this.$message({ type: 'warning', message: errorMsg })
        return false;
      }
      return true;
    },
    formVaildent(name) {
      // 提交按钮校验输入框
      let _error = this[`${name}ErrorRule`];
      let _form = this[`${name}`];
      let is_pass = true;
      for (let key of Object.keys(_form)) {
        if (_form[key] === "" && _error[key]) {
          _error[key].show = true;
          is_pass = false;
        }
      }
      return is_pass;
    },
    checkEmtypeInputBox(item) {
      // 输入框失去焦点适合有值，空则显示错误提示
      let _input_value = this.ruleForm[item];
      if (_input_value) {
        this.ruleFormErrorRule[item].show = false;
        let obj = {
          captcha: this.postVerificationCode
        };
        obj[item] && obj[item]();
      } else {
        this.ruleFormErrorRule[item].show = true;
      }
    },
     goLogin() {
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
.code-title{
  height: 37px;
  margin-left: 30px;
}
.code-img{
    // width: 300px;
    height: 60px;
    display: flex;
    margin: 0 auto;
    margin-left: 30px;
    img{
      width: 100%;
      height: 100%;
    }
}
.box-input{
    width: 47%;
    height: 3rem;
    padding-top: 15px;
    margin-left: 30px;
    input{
      width: 100%;
      height: 100%;
    }
}
.box-tips{
  color: #ce551a;
  padding-top: 10px;
  margin-left: 30px;
  font-size: 0.6rem;
  font-family: MicrosoftYaHei;
  font-weight: 400;;
  height: 1.2rem;
}
.change-code{
  width: 100%;
  padding-top: 20px;
  cursor: pointer;
}
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
    top: 2rem;
    left: 50%;
    transform: translate(-50%, 0);
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
