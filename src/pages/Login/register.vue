<template>
  <div>
    <div class="login-box">
      <div class="login-mask" @click="() => this.$emit('close', '')"></div>
      <div class="login">
        <div class="login-icon">
          <div class="login-icon-pic"></div>
        </div>
        <div class="form">
          <div class="form-box">
            <div class="item">
              <div class="item-box left">
                <div class="item-box-title">用户名/USERNAME</div>
                <div class="item-box-input">
                  <input type="text" @blur="checkEmtypeInputBox('name')" v-model="ruleForm.name" />
                </div>
                <div class="item-box-tips">{{isError('name')}}</div>
              </div>
              <div class="item-box right">
                <div class="item-box-title">电话/PHONE</div>
                <div class="item-box-input">
                  <input type="text" @blur="checkEmtypeInputBox('tel')" v-model="ruleForm.tel" />
                </div>
                <div class="item-box-tips">{{isError('tel')}}</div>
              </div>
            </div>
            <div class="item" style="align-items: flex-end;">
              <div class="item-box left">
                <div class="item-box-title">请在下方填写图形验证码</div>
                <div class="item-box-code-img">
                  <img :src="verification.code_img" alt />
                  <div class="change-code" @click="getVerificationCode">看不清？摇一摇</div>
                </div>
                <div class="item-box-input">
                  <input
                    type="text"
                    @blur="checkEmtypeInputBox('captcha')"
                    v-model="ruleForm.captcha"
                  />
                </div>
                <div class="item-box-tips">{{isError('captcha')}}</div>
              </div>
              <div class="item-box right">
                <div class="item-box-input">
                  <input
                    type="text"
                    @blur="checkEmtypeInputBox('verification_code')"
                    v-model="ruleForm.verification_code"
                  />
                  <div class="get_code" @click="getCode">发送验证码</div>
                </div>
                <div class="item-box-tips">{{isError('verification_code')}}</div>
              </div>
            </div>
            <div class="item">
              <div class="item-box left">
                <div class="item-box-title">请设置密码/PASSWORD</div>
                <div class="item-box-input" style="padding-bottom:0;">
                  <input
                    type="password"
                    style="height:1.5rem;width:125%;"
                    @blur="checkEmtypeInputBox('password')"
                    v-model="ruleForm.password"
                  />
                </div>
                <!-- <div class="item-box-input"><input type="password" style="height:1.5rem;width:125%;" v-model="ruleForm.password2"/></div> -->
                <div class="item-box-tips">{{isError('password')}}</div>
              </div>
              <div class="item-box right">
                <div
                  class="item-box-btn"
                  @click="register"
                  :style="`${isPostting?'pointer-events:none;':''}`"
                >注册</div>
              </div>
            </div>
          </div>
          <div class="form-footer">
            <div class="auto_login">
              <!-- <div class="auto_login-tips">第三方登录：</div>
              <div class="auto_login-icon"></div>
              <div class="auto_login-icon"></div>-->
            </div>
            <div class="register" @click="goLogin">已有账号</div>
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
      loginWay: "account",
      ruleForm: {
        name: "", // 昵称
        tel: "", // 电话
        password: "",
        verification_key: "", // 短信验证码的key
        verification_code: "", // 短信验证码
        key: "", // 图形验证码的key
        captcha: "", // 图形验证码
        invitation_id: "" // 邀请人id
      },
      ruleFormErrorRule: {
        name: { show: false, msg: "请输入用户名" },
        tel: { show: false, msg: "请输入电话" },
        captcha: { show: false, msg: "请输入验证码" },
        verification_code: { show: false, msg: "请输入验证码" },
        password: { show: false, msg: "请输入密码" },
        password2: { show: false, msg: "请输入密码" }
      },
      ruleFormCheckErrorRule: {
        name: { show: false, msg: "用户昵称已占用" },
        tel: { show: false, msg: "手机号码已注册" },
        captcha: { show: false, msg: "验证码有误，请重新输入" },
        verification_code: { show: false, msg: "验证码有误，请重新输入" },
        password: { show: false, msg: "两次密码不一致" },
        password2: { show: false, msg: "两次密码不一致" }
      },
      verification: {
        code_img: "",
        code_key: ""
      },
      isPostting: false
    };
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
    /* 短信验证码 */
    getCode() {
      this.checkEmtypeInputBox("tel");

      const { tel } = this.ruleForm;
      tel &&
        this.$request.post("/getCode", { tel }).then(data => {
          this.$message({ message: "发送成功", type: "success" });
          this.ruleForm.verification_key = data.key;
        });
    },
    /** 注册 */
    register() {
      let isPass = this.formVaildent('ruleForm');
      if(!isPass) return;
      this.isPostting = true;
      const params = Object.assign({}, this.ruleForm);
      this.$request
        .post("/register", params)
        .then(data => {
          this.$message({ message: "注册成功", type: "success" });
          this.isPostting = false;
          this.$emit('close', '')
        })
        .catch(() => {
          this.isPostting = false;
        });
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
      // this.$router.push({
      //   name: 'Login'
      // })
      this.$emit("go-login", "login");
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
    height: 22rem;
    &-icon {
      width: 14.1rem;
      background: #12acac;
      &-pic {
      }
    }
    .form {
      width: 26rem;
      padding: 3rem 2rem 2rem;
      background-color: #d9ebc5;
      position: relative;
      &-box {
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
              background: #fff;
              width: 9.45rem;
              margin: 0 auto;
              position: relative;
              .change-code {
                position: absolute;
                padding-left: 10px;
                color: #6bc839;
                left: 100%;
                top: 50%;
                transform: translateY(-50%);
                text-decoration: underline;
                width: 10em;
                cursor: default;
              }
            }
            &-input {
              width: 100%;
              padding: 5px 10px;
              position: relative;
              input {
                width: 100%;
                height: 2rem;
                background: #e7f0da;
                opacity: 1;
                border: 1px solid #ffffff;
                border-radius: 0.3rem;
                padding-left: 5px;
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
      }
      &-footer {
        margin-top: 0.5rem;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        font-family: MicrosoftYaHei;
        font-size: 0.7rem;
        font-weight: normal;
        font-stretch: normal;
        // line-height: 0.2vw;
        letter-spacing: 0vw;
        color: #2c2c2c;
        .auto_login {
          display: flex;
          align-items: center;
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
        }
      }
    }
  }
}
</style>
