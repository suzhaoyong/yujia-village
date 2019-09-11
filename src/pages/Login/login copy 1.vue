<template>
  <div>
    <div class="login-box">
      <div class="login-mask" @click="() => this.$emit('close', '')"></div>
      <div class="login">
        <!-- <div class="login-icon">
          <div class="login-icon-pic">
            <img :src="icon.logo" alt />
          </div>
        </div> -->
        <div class="form">
          <div class="form_title" @click="changeLoginWay">
            <div
              :class="['form_title-item', (loginWay==='account'?'active':'')]"
              data-way="account"
            >密码登录</div>
            <!-- <i class="border"></i> -->
            <div
              :class="['form_title-item', (loginWay==='message'?'active':'')]"
              data-way="message"
            >短信登录</div>
          </div>
          <div class="form_account" v-show="loginWay==='account'">
            <div class="form_input">
              <input
                class="input"
                v-model.trim="accountRuleForm.tel"
                type="text"
                placeholder="请输入手机号"
                @blur="checkEmtypeInputBox('tel')"
                style="outline:none;"
              />
              <div class="form_input-tips">{{accountErrorRule.tel.show?accountErrorRule.tel.msg:''}}</div>
            </div>
            <div class="form_input">
              <div class="item" style="align-items: flex-end;">
                <div class="item-box left">
                  <!-- <div class="item-box-title">请在下方填写图形验证码</div> -->
                  <div class="item-box-code-img">
                    <img :src="verification.code_img" alt />
                    <div class="change-code" @click="getVerificationCode"><span style="color:#999">看不清？</span>换一张</div>
                  </div>
                  <div class="item-box-input">
                    <input
                      type="text"
                      @blur="checkEmtypeInputBox('captcha')"
                      placeholder="请输入图形验证码"
                      v-model.trim="accountRuleForm.captcha"
                    />
                  </div>
                  <div class="item-box-tips">{{isError('captcha')}}</div>
                </div>
              </div>
            </div>
            <div class="form_input">
              <input
                class="input"
                v-model.trim="accountRuleForm.password"
                type="password"
                placeholder="请输入密码"
                @blur="checkEmtypeInputBox('password')"
                style="outline:none;"
              />
              <div
                class="form_input-tips"
              >{{accountErrorRule.password.show?accountErrorRule.password.msg:''}}</div>
            </div>
            <div class="form_btn">
              <button @click.stop="submitForm('account')" :disabled="isPostting">登录</button>
            </div>
          </div>
          <div class="form_message" v-show="loginWay==='message'">
            <div class="form_input">
              <input
                class="input"
                type="text"
                v-model.trim="messageRuleForm.tel"
                @blur="checkEmtypeInputBox('tel')"
                placeholder="请输入手机号"
              />
              <div class="form_input-tips">{{messageErrorRule.tel.show?messageErrorRule.tel.msg:''}}</div>
            </div>
            <div class="form_input">
              <div class="item" style="align-items: flex-end;">
                <div class="item-box left">
                  <!-- <div class="item-box-title">请在下方填写图形验证码</div> -->
                  <div class="item-box-code-img">
                    <img :src="verification.code_img" alt />
                    <div class="change-code" @click="getVerificationCode"><span style="color:#999">看不清？</span>换一张</div>
                  </div>
                  <div class="item-box-input">
                    <input
                      type="text"
                      @blur="checkEmtypeInputBox('captcha')"
                      v-model.trim="messageRuleForm.captcha"
                      placeholder="请输入图形验证码"
                    />
                  </div>
                  <div class="item-box-tips">{{isError('captcha')}}</div>
                </div>
              </div>
            </div>
            <div class="form_input">
              <input
                class="input"
                type="text"
                v-model.trim="messageRuleForm.verification_code"
                @blur="checkEmtypeInputBox('verification_code')"
                placeholder="请输入验证码"
              />
              <div class="get_code" @click="getCode">{{codeTips.msg}}</div>
              <div
                class="form_input-tips"
              >{{messageErrorRule.verification_code.show?messageErrorRule.verification_code.msg:''}}</div>
            </div>
            <div class="form_btn">
              <button @click.stop="submitForm('message')" :disabled="isPostting">登录</button>
            </div>
          </div>
          <div class="form-footer">
            <div class="auto_login">
              <!-- <div class="auto_login-tips">第三方登录：</div>
              <div class="auto_login-icon"></div>
              <div class="auto_login-icon"></div>-->
              记住密码
            </div>
            <div class="register">
              <div class="register" @click="goRegister">注册</div>
              <div class="Forget" @click="goForget">忘记密码</div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Exp } from "@/utils/bee.js";
import Bus from "@/utils/Bus";
import logo from "@/assets/market/logo_max.png";
import store from "@/store";
export default {
  data() {
    return {
      icon: {
        logo
      },
      codeTips: {
        msg: "发送验证码",
        count: 0
      },
      accountErrorRule: {
        tel: { show: false, msg: "请输入正确的手机号" },
        password: { show: false, msg: "请输入正确的密码" },
        captcha: { show: false, msg: "请输入正确的验证码" }
      },
      accountRuleForm: {
        tel: "",
        password: "",
        captcha: "",
        key: ""
      },
      messageErrorRule: {
        tel: { show: false, msg: "请输入正确的手机号" },
        verification_code: { show: false, msg: "请输入验证码" },
        captcha: { show: false, msg: "请输入正确的验证码" }
      },
      messageRuleForm: {
        tel: "",
        verification_key: "",
        verification_code: "",
        captcha: "",
        key: ""
      },
      loginWay: "account",
      isPostting: false,
      verification: {
        code_img: "",
        code_key: ""
      }
    };
  },
  computed: {
    isError() {
      return function(item) {
        const rule = this[`${this.loginWay}ErrorRule`][item];
        if (rule.show) {
          return rule.msg;
        }
        return "";
      };
    }
  },
  created() {
    store.dispatch("INFO", { user: {} });
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("access");
  },
  mounted() {
    this.getVerificationCode();
  },
  methods: {
    submitForm(name) {
      let isPass = this.formVaildent(name);
      if (isPass) {
        if (name === "message") {
          this.postTelLogin();
        }
        if (name === "account") {
          this.postAuthLogin();
        }
      } else {
      }
    },
    /* 图形验证码 */
    getVerificationCode() {
      this.$request("/verificationCode").then(data => {
        const { img, key } = data;
        this.verification.code_img = img;
        this.accountRuleForm.key = key;
        this.messageRuleForm.key = key;
      });
    },
    /* 图形验证码校验 */
    postVerificationCode() {
      const { captcha, key } = this.accountRuleForm;
      captcha &&
        key &&
        this.$request
          .post("/verificationCode", { captcha, key })
          .then(data => {});
    },
    /** 个人信息 */
    getPersonal() {
      this.$request("/personal/home").then(data => {
        sessionStorage.setItem("user", JSON.stringify(data));
        window.location.reload();
        this.$emit("suc", data.user.name);
      });
    },
    /** 手机登录 */
    postTelLogin() {
      this.isPostting = true;
      const params = Object.assign({}, this.messageRuleForm);
      this.$request
        .post("/auth/telLogin", params)
        .then(data => {
          sessionStorage.setItem("access", JSON.stringify(data));
          this.isPostting = false;
          this.$message({ message: "登录成功", type: "success" });
          this.$emit("close", "");
        })
        .then(_ => {
          // this.getPersonal();
          window.location.reload();
        })
        .catch(() => {
          this.isPostting = false;
        });
    },
    /** 登录 */
    postAuthLogin() {
      this.isPostting = true;
      const params = Object.assign({}, this.accountRuleForm);
      this.$request
        .post("/auth/login", params)
        .then(data => {
          sessionStorage.setItem("access", JSON.stringify(data));
          this.isPostting = false;
          this.$message({ message: "登录成功", type: "success" });
          this.$emit("close", "");
        })
        .then(_ => {
          // this.getPersonal();
          window.location.reload();
        })
        .catch(() => {
          this.isPostting = false;
        });
    },
    formVaildent(name) {
      // 提交按钮校验输入框
      let _error = this[`${name}ErrorRule`];
      let _form = this[`${name}RuleForm`];
      const whiteList = ["key", "verification_key"];
      let is_pass = true;
      for (let key of Object.keys(_form)) {
        if (whiteList.indexOf(key) !== -1) {
          continue;
        }
        if (_error[key] && _error[key].show) {
          is_pass = false;
        }
        if (_form[key] === "") {
          _error[key].show = true;
          is_pass = false;
        }
      }
      return is_pass;
    },
    getCode() {
      //获取验证码
      if (this.messageRuleForm.tel === "") {
        this.messageErrorRule.tel.show = true;
        return;
      }
      this.getSMSCode();
      if (this.codeTips.count > 0) return;
      this.codeTips.count = 59;
      let timer = setInterval(() => {
        this.codeTips.msg = `${this.codeTips.count--}s重新获取`;
        if (this.codeTips.count <= 0) {
          clearInterval(timer);
          this.codeTips.msg = "重新获取";
        }
      }, 1000);
    },
    getSMSCode() {
      this.checkEmtypeInputBox("tel");

      const { tel } = this.messageRuleForm;
      tel &&
        this.$request.post("/getVerificationCode", { tel }).then(data => {
          this.$message({ message: "发送成功", type: "success" });
          this.messageRuleForm.verification_key = data.key;
        });
    },
    goRegister() {
      // this.$router.push({
      //   name: 'Register'
      // })
      this.$emit("go-register", "register");
    },
    goForget(){
      this.$emit("go-reset", "reset");
      // this.$router.push({
      //   name: 'Reset'
      // })
    },
    resetCode() {
      // 重置获取验证码
      this.codeTips.msg = "发送验证码";
      this.codeTips.count = 0;
    },
    changeLoginWay(e) {
      this.getVerificationCode();
      // 切换登录方式
      this.loginWay = e.target.dataset.way || this.loginWay;
      let _way_obj = {
        account: "message",
        message: "account"
      };
      this.resetInputStatus(_way_obj[this.loginWay]);
      this.resetCode();
    },
    resetInputStatus(name) {
      //重置输入框和错误提示
      let _error = this[`${name}ErrorRule`];
      let _form = this[`${name}RuleForm`];
      for (let key of Object.keys(_error)) {
        _error[key].show = false;
      }
      for (let key of Object.keys(_form)) {
        _form[key] = "";
      }
    },

    checkEmtypeInputBox(item) {
      // 输入框失去焦点适合有值，空则显示错误提示
      let isRightExp = this.checkExpInputItem(item);
      if (!isRightExp) {
        this[`${this.loginWay}ErrorRule`][item].show = true;
        return;
      }
      let _input_value = this[`${this.loginWay}RuleForm`][item];
      if (_input_value) {
        this[`${this.loginWay}ErrorRule`][item].show = false;
      } else {
        this[`${this.loginWay}ErrorRule`][item].show = true;
      }
    },
    checkExpInputItem(item) {
      // 正则校验输入的值是否合法
      let { PhoneUtils, StringUtils } = Exp();
      let _check_item = {
        tel: PhoneUtils.isPhoneNum,
        password: StringUtils.isSpecialCharacterAlphanumeric,
        captcha: item => true,
        verification_code: item => true
      };
      let _input_value = this[`${this.loginWay}RuleForm`][item];
      let _is_pass = _check_item[item] && _check_item[item](_input_value);
      return _is_pass;
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box !important;
}
img {
  width: 100%;
  height: 100%;
}
input {
  outline: none !important;
}
input:focus {
  outline: none;
}
.login-box {
  .login-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 100;
  }
  .login {
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
    &-icon {
      width: 14.1rem;
      background: #f7faf2;
      display: flex;
      justify-content: center;
      align-items: center;
      &-pic {
      }
    }
    .form {
      width: 27rem;
      padding: 3rem 1.5rem 3rem;
      background-color: #F6FCF3;
      position: relative;
      &_title {
        display: flex;
        font-family: MicrosoftYaHei;
        font-size: 0.9vw;
        font-weight: normal;
        font-stretch: normal;
        // line-height: 0.2vw;
        letter-spacing: 0vw;
        color: #2c2c2c;
        cursor: pointer;
        &-item {
          border: 1px solid transparent;
          width: 50%;
          font-family:Microsoft YaHei;
          font-weight:bold;
          color: #2c2c2c;
          &.active {
            border-bottom: 1.5px solid #7FB36B;
            width: 50%;
            color: #7FB36B;
            padding-bottom: 15px;
          }
          &:hover {
            cursor: pointer;
            // border-bottom: 1px solid #7FB36B;
            width: 50%;
            // color: #7FB36B;
          }
        }
        margin-bottom: 1.2vw;
        border-bottom: 1px solid #ccc;
        text-align: center;
        .border {
          width: 2px;
          margin: 3px 8px;
          background: #fff;
        }
      }
      &_account {
        .form_input {
          // margin-bottom: 1rem;
          &-tips {
            height: 1.3rem;
            padding-top: 2px;
            font-size: 0.6rem;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(206, 85, 26, 1);
          }
          .item {
            display: flex;
            padding: 0.1rem 0;
            &-box {
              position: relative;
              // border: 1px solid red;
              flex-grow: 1;
              font-size: 12px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(44, 44, 44, 1);
              &.left {
                flex-basis: 50%;
              }
              &.right {
                flex-basis: 50%;
              }
              &-title {
                padding-left: 15px;
              }
              &-code-img {
                height: 2.35rem;
                background: #B2D6A4;
                width: 9.45rem;
                // margin: 0 auto;
                position: relative;
                margin-top: 20px;
                border-radius: 4px;
                .change-code {
                  position: absolute;
                  padding-left: 10px;
                  color: #6bc839;
                  left: 100%;
                  top: 50%;
                  transform: translateY(-50%);
                  // text-decoration: underline;
                  width: 10em;
                  cursor: pointer;
                }
                input {
                  width: auto;
                }
              }
              &-input {
                width: 100%;
                padding: 10px 0px;
                position: relative;
                input {
                  width: 100%;
                  height: 3rem;
                  opacity: 1;
                  border: none;
                  background-color: #F6FCF3;
                  border-bottom: 1px solid #ccc;
                  border-radius: 0.3rem;
                  // padding-left: 5px;
                }
                .get_code {
                  cursor: pointer;
                  user-select: none;
                  width: 4rem;
                  height: 1.6rem;
                  margin-right: 1.2rem;
                  border-radius: 5px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background: #fff;
                  font-size: 10px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: rgba(44, 44, 44, 1);
                  position: absolute;
                  right: 0;
                  top: 50%;
                  transform: translateY(-50%);
                }
              }
              &-tips {
                // padding-left: 15px;
                font-size: 0.6rem;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: rgba(206, 85, 26, 1);
                height: 1.2rem;
              }
              &-btn {
                &:hover {
                  border: none;
                  background: #efefef;
                }
                position: absolute;
                right: 0;
                bottom: 0;
                transform: translateY(-50%);
                outline: none;
                border: none;
                width: 100%;
                width: 6.15rem;
                height: 2.15rem;
                font-family: MicrosoftYaHei;
                font-size: 0.4rem;
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
          input {
            box-shadow: none;
            outline: none;
            &:focus {
              box-shadow: none;
              outline: none;
            }
          }
          .input {
            height: 3rem;
            width: 100%;
            padding-top: 13px;
            // background: #e6f1d9;
            border-radius: 0.5vw;
            border: none;
            background-color: #F6FCF3;
            border-bottom: 1px solid #ccc;
            font-family: MicrosoftYaHei;
            font-size: 0.8vw;
            font-weight: normal;
            font-stretch: normal;
            // line-height: 0.2vw;
            letter-spacing: 0vw;
            color: #2c2c2c;
          }
        }
        .form_btn {
          margin-top: 2rem;
          button {
            &:hover {
              border: none;
              background: #D4E8BD;
            }
            outline: none;
            border: none;
            width: 100%;
            height: 2.5rem;
            font-family: MicrosoftYaHei;
            font-size: 0.7rem;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0rem;
            color: #2c2c2c;
            background: #D4E8BD;
            border-radius: 0.3rem;
            cursor: pointer;
          }
        }
      }
      &_message {
        .form_input {
          position: relative;
          // margin-bottom: 1rem;
          &-tips {
            height: 1.3rem;
            padding-top: 2px;
            font-size: 0.6rem;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(206, 85, 26, 1);
          }
          .item {
            display: flex;
            padding: 0.1rem 0;
            &-box {
              position: relative;
              // border: 1px solid red;
              flex-grow: 1;
              font-size: 12px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(44, 44, 44, 1);
              &.left {
                flex-basis: 50%;
              }
              &.right {
                flex-basis: 50%;
              }
              &-title {
                padding-left: 15px;
              }
              &-code-img {
                height: 2.35rem;
                background: #B2D6A4;
                width: 9.45rem;
                // margin: 0 auto;
                margin-top:20px;
                border-radius: 4px;
                position: relative;
                .change-code {
                  position: absolute;
                  padding-left: 10px;
                  color: #6bc839;
                  left: 100%;
                  top: 50%;
                  transform: translateY(-50%);
                  // text-decoration: underline;
                  width: 10em;
                  cursor: pointer;
                }
                input {
                  width: auto;
                }
              }
              &-input {
                width: 100%;
                padding: 10px 0px;
                position: relative;
                input {
                  width: 100%;
                  height: 3rem;
                  opacity: 1;
                  border: none;
                  background-color: #F6FCF3;
                  border-bottom: 1px solid #ccc;
                  border-radius: 0.3rem;
                  // padding-left: 5px;
                }
                .get_code {
                  cursor: pointer;
                  user-select: none;
                  width: 4rem;
                  height: 1.6rem;
                  margin-right: 1.2rem;
                  border-radius: 5px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background: #fff;
                  font-size: 10px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: rgba(44, 44, 44, 1);
                  position: absolute;
                  right: 0;
                  top: 50%;
                  transform: translateY(-50%);
                }
              }
              &-tips {
                padding-left: 15px;
                font-size: 0.6rem;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: rgba(206, 85, 26, 1);
                height: 1.2rem;
              }
              &-btn {
                &:hover {
                  border: none;
                  background: #efefef;
                }
                position: absolute;
                right: 0;
                bottom: 0;
                transform: translateY(-50%);
                outline: none;
                border: none;
                width: 100%;
                width: 6.15rem;
                height: 2.15rem;
                font-family: MicrosoftYaHei;
                font-size: 0.4rem;
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
          input {
            box-shadow: none;
            outline: none;
            &:focus {
              box-shadow: none;
              outline: none;
            }
          }
          .get_code {
            cursor: pointer;
            user-select: none;
            width: 6rem;
            height: 2rem;
            margin-right: 0.4rem;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #7FB36B;
            position: absolute;
            font-size: 0.7rem;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: #fff;
            right: 0;
            top: 20%;
            transform: translateY(-20%);
          }
          .input {
            width: 100%;
            height: 3rem;
            padding-top: 13px;
            background-color: #F6FCF3;
            border-radius: 0.5vw;
            border: none;
            border-bottom: 1px solid #ccc;
            font-family: MicrosoftYaHei;
            font-size: 0.8vw;
            font-weight: normal;
            font-stretch: normal;
            // line-height: 0.2vw;
            letter-spacing: 0vw;
            color: #2c2c2c;
          }
        }
        .form_btn {
          margin-top: 2rem;
          button {
            &:hover {
              border: none;
              background: #D4E8BD;
            }
            outline: none;
            border: none;
            width: 100%;
            height: 2.5rem;
            font-family: MicrosoftYaHei;
            font-size: 0.7rem;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0rem;
            color: #2c2c2c;
            background: #D4E8BD;
            border-radius: 0.3rem;
            cursor: pointer;
          }
        }
      }
      &-footer {
        margin-top: 2rem;
        display: flex;
        justify-content: space-between;
        font-family: MicrosoftYaHei;
        font-size: 0.8vw;
        font-weight: normal;
        font-stretch: normal;
        // line-height: 0.2vw;
        letter-spacing: 0vw;
        color: #2c2c2c;
        .auto_login {
          display: flex;
          align-items: center;
          cursor: pointer;
          color: #999;
          &-tips {
          }
          &-icon {
            width: 1.7rem;
            height: 1.7rem;
            background: #000;
            border-radius: 50%;
            margin-right: 10px;
          }
        }
        .register {
          cursor: pointer;
          display: flex;
          align-items: center;
          .Forget{
            cursor: pointer;
            padding-left: 15px;
          }
        }
      }
    }
  }
}
</style>
