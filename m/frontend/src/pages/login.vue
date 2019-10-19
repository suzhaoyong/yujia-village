<template>
  <div class="body-wrap">
    <div class="back_home-wrap" @click="goHome">
      <div class="back_home" style=""><van-icon style="font-size: 20px;" name="wap-home" /></div>
    </div>
    <div class="body">
      <!-- <div class="tips" v-show="false">
        <span :class="isActive('register')" @click="changeType('register')">注册</span>
        <span :class="isActive('login')" @click="changeType('login')">登录</span>
        <span :class="isActive('reset')" @click="changeType('reset')">登录</span>
      </div>-->
      <div class="form" v-show="form.type === 'login'">
        <div class="logo">
          <img :src="icon.welcome" alt />
        </div>
        <div class="input-box flex line">
          <div class="icon">
            <img :src="icon.tel" alt />
          </div>
          <input class="input tel" type="tel" v-model="ruleForm.tel" placeholder="请输入手机号码" />
        </div>
        <div class="input-box flex line">
          <div class="icon key">
            <img :src="icon.key" alt />
          </div>
          <input class="input key" type="password" v-model="ruleForm.password" placeholder="请输入密码" />
        </div>
        <div class="input-box flex">
          <input class="input captcha" type="tel" v-model="ruleForm.captcha" placeholder="请输入验证码" />
          <div class="code">
            <div class="img">
              <img :src="verification.code_img" alt />
            </div>
            <div :class="['refresh', {start: verification.is_tap}]">
              <img
                :class="[{start: verification.is_tap}]"
                @click="getVerificationCode"
                :src="icon.refresh"
                alt
              />
            </div>
          </div>
        </div>
        <div class="input-btn">
          <van-button @click="login" type="default">登录</van-button>
          <div class="login-tips">
            <span :class="isActive('register')" @click="changeType('register')">立即注册</span>
            <span :class="isActive('reset')" @click="changeType('reset')">忘记密码</span>
          </div>
        </div>
      </div>
      <div class="form" style="margin-top:68px;" v-show="form.type === 'register'">
        <div class="input-box reg tel">
          <van-field type="tel" v-model="registerForm.tel" placeholder />
        </div>
        <div class="input-box flex">
          <div class="reg-captch">
            <van-field type="tel" v-model="registerForm.captcha" placeholder />
          </div>

          <div class="code">
            <div class="img">
              <img :src="verification.code_img" alt />
            </div>
            <div class="refresh">
              <img
                @click="getVerificationCode"
                :class="[{start: verification.is_tap}]"
                :src="icon.refresh"
                alt
              />
            </div>
          </div>
        </div>
        <div class="input-box reg ver_code">
          <van-field type="tel" v-model="registerForm.verification_code" center clearable placeholder></van-field>
          <van-button
            class="sms"
            size="small"
            @click="getCode('registerForm')"
            type="primary"
          >{{codeTips.msg}}</van-button>
        </div>
        <div class="input-box reg pwd">
          <van-field v-model="registerForm.password" type="password" placeholder />
        </div>

        <div class="input-btn">
          <van-button type="default" @click="register">注册</van-button>
          <div class="reg-tips">
            已有账号？
            <span :class="isActive('login')" @click="changeType('login')">立即登录</span>
          </div>
        </div>
      </div>
      <div class="form" style="margin-top:68px;" v-show="form.type === 'reset'">
        <div class="input-box reg tel">
          <van-field type="tel" v-model="reset.tel" placeholder />
        </div>
        <div class="input-box flex">
          <div class="reg-captch">
            <van-field type="tel" v-model="reset.captcha" placeholder />
          </div>

          <div class="code">
            <div class="img">
              <img :src="verification.code_img" alt />
            </div>
            <div class="refresh">
              <img
                @click="getVerificationCode"
                :class="[{start: verification.is_tap}]"
                :src="icon.refresh"
                alt
              />
            </div>
          </div>
        </div>
        <div class="input-box reg ver_code">
          <van-field type="tel" v-model="reset.verification_code" center clearable placeholder></van-field>
          <van-button
            class="sms"
            size="small"
            @click="getCode('reset')"
            type="primary"
          >{{codeTips.msg}}</van-button>
        </div>
        <div class="input-box reg pwd">
          <van-field v-model="reset.password" type="password" placeholder />
        </div>

        <div class="input-btn">
          <van-button type="default" @click="resetPwd">更改</van-button>
          <div class="reg-tips" v-show="false">
            <span :class="isActive('login')" @click="changeType('login')">立即登录</span>
          </div>
        </div>
      </div>
    </div>
    <div v-show="show.sy">
      <van-dialog title="查看瑜伽村使用协议" v-model="open.sy">
        <div style="height:60vh;overflow: scroll;">
          <!-- <iframe src="../../static/doc/瑜伽村使用协议.pdf" width="100%" height="100vh" frameborder="1"></iframe> -->
          <div id="sy"></div>
        </div>
        <span slot="footer">
          <van-button type="primary" @click="open.sy = false">确 定</van-button>
        </span>
      </van-dialog>
    </div>
    <div v-show="show.ys">
      <van-dialog style="margin-top:1rem;" title="查看瑜伽村隐私政策" v-model="open.ys">
        <div style="height:60vh;overflow: scroll;">
          <div id="ys"></div>
          <!-- <iframe src="../../static/doc/瑜伽村隐私政策.pdf" width="100%" height="100%" frameborder="1"></iframe> -->
        </div>
        <span slot="footer">
          <van-button type="primary" @click="open.ys = false">确 定</van-button>
        </span>
      </van-dialog>
    </div>
    <div class="back-wrap" v-show="form.type === 'reset'" @click="changeType('login')">
      <div class="back">
        <img :src="icon.back" alt />
      </div>
      <span>返回</span>
    </div>
    <div class="shuoming" v-show="form.type === 'register'">
      <p>
        注册即等于同意
        <span
          href="../../../static/doc/瑜伽村隐私政策.DOCX"
          @click="openFile('ys')"
          class="file"
        >《瑜伽村隐私政策》</span>和
        <span
          href="../../../static/doc/瑜伽村使用协议.DOCX"
          @click="openFile('sy')"
          class="file"
        >《瑜伽村使用协议》</span>
      </p>
    </div>
  </div>
</template>
<script>
import "pdfh5/css/pdfh5.css";
import bg from "@/assets/img/logo.png";
import logo from "@/assets/img/logo.png";
import welcome from "@/assets/img/welcome.png";
import tel from "@/assets/img/tel.png";
import back from "@/assets/img/back.png";
import key from "@/assets/img/key.png";
import refresh from "@/assets/img/refresh.png";
import Pdfh5 from "pdfh5";
import Vue from "vue";
import { Field, Button, Notify, Dialog, Icon } from "vant";
import store from "@/store";
Vue.use(Field)
  .use(Button)
  .use(Dialog)
  .use(Icon)
  .use(Notify);
export default {
  data() {
    return {
      pdfh5: null,
      show: {
        sy: false,
        ys: false
      },
      open: {
        sy: true,
        ys: true
      },
      icon: {
        key,
        tel,
        bg,
        logo,
        refresh,
        back,
        welcome
      },
      codeTips: {
        msg: "发送验证码",
        count: 0
      },
      form: { type: "login" },
      ruleForm: {
        tel: "",
        password: "",
        captcha: "",
        key: ""
      },
      registerForm: {
        name: "",
        tel: "",
        verification_key: "",
        verification_code: "",
        captcha: "",
        key: "",
        invitation_id: ""
      },

      reset: {
        tel: "",
        verification_key: "",
        verification_code: "",
        captcha: "",
        key: ""
      },
      verification: {
        code_img: "",
        code_key: "",
        is_tap: false
      }
    };
  },
  computed: {
    isActive() {
      return type => ({ active: this.form.type === type });
    }
  },
  mounted() {
    // this.$store.commit('loadStatus', false)
    this.getVerificationCode();
    this.loadFile("sy");
    this.loadFile("ys");
  },
  methods: {
    // 返回主页
    goHome() {
      this.$router.replace('/main')
    },
    openFile(type) {
      this.show[type] = true;
      this.open[type] = true;
    },
    loadFile(type) {
      this.pdfh5 = new Pdfh5(`#${type}`, {
        pdfurl: `./static/doc/${
          type == "ys" ? "瑜伽村隐私政策" : "瑜伽村使用协议"
        }.pdf`
      });
      //监听完成事件
      // this.pdfh5.on("complete", function(status, msg, time) {
      //   console.log(
      //     "状态：" +
      //       status +
      //       "，信息：" +
      //       msg +
      //       "，耗时：" +
      //       time +
      //       "毫秒，总页数：" +
      //       this.totalNum
      //   );
      // });
    },
    getUrlParams() {
      let search = window.location.search;
      let url = decodeURI(search); // 编码字符 解码
      let splitIndex = url.indexOf("?"); // 返回第一个？号的位置
      let str = url.substring(splitIndex + 1); // 获取到查询参数
      let getAllUrlParam = function(str) {
        var urlArr = str.split("&");
        var obj = {};
        for (var i = 0; i < urlArr.length; i++) {
          var arg = urlArr[i].split("=");
          obj[arg[0]] = arg[1];
        }
        return obj;
      };
      return getAllUrlParam(str);
    },
    login() {
      let is_not_pass = false;
      for (let key of Object.keys(this.ruleForm)) {
        if (this.ruleForm[key] === "" && key !== "invitation_id") {
          is_not_pass = true;
        }
      }
      if (is_not_pass) return;
      const params = Object.assign({}, this.ruleForm);
      this.$request
        .post("/auth/login", params)
        .then((data)=> {
          sessionStorage.setItem("access", JSON.stringify(data));
          Notify({ message: "登录成功", type: "success" });
          this.$router.push('/personal');
        })
        .catch(err => {
          Notify(err);
        });
    },
    register() {
      const urlParams = this.getUrlParams();
      this.registerForm.name = this.registerForm.tel.substr(7);
      this.registerForm.invitation_id = urlParams.invitation_id || "";
      let is_not_pass = false;
      for (let key of Object.keys(this.registerForm)) {
        if (this.registerForm[key] === "" && key !== "invitation_id") {
          is_not_pass = true;
        }
      }
      if (is_not_pass) return;
      const params = Object.assign({}, this.registerForm);
      this.$request
        .post("/register", params)
        .then(() => {
          Notify({ message: "注册成功, 请登录", type: "success" });
        })
        .catch(err => {
          Notify(err);
        });
    },
    resetPwd() {
      this.$request
        .post("/personal/forgetPassword", this.reset)
        .then(() => {
          Notify({ message: "修改成功, 请登录", type: "success" });
        })
        .catch(err => {
          Notify(err);
        });
    },
    changeType(type) {
      this.form.type = type;
      this.resetCode();
      this.getVerificationCode();
    },
    resetCode() {
      this.ruleForm = {
        tel: "",
        password: "",
        captcha: "",
        key: "",
        invitation_id: ""
      };
      this.registerForm = {
        name: "",
        tel: "",
        verification_key: "",
        verification_code: "",
        captcha: "",
        key: "",
        invitation_id: ""
      };
      (this.reset = {
        tel: "",
        verification_key: "",
        verification_code: "",
        captcha: "",
        key: ""
      }),
        // 重置获取验证码
        (this.codeTips.msg = "发送验证码");
      this.codeTips.count = 0;
    },
    /* 短信验证码 */
    getCode(formName) {
      const { tel, captcha, key } = this[formName];
      if (!tel || tel.length !== 11) {
        Notify("请填写正确的手机号码");
        return;
      }
      if (captcha == "") {
        Notify("请输入图形验证码");
        return;
      }
      if (this.codeTips.count > 0) return;
      this.codeTips.count = 59;
      let timer = setInterval(() => {
        this.codeTips.msg = `${this.codeTips.count--}s重新获取`;
        if (this.codeTips.count <= 0) {
          clearInterval(timer);
          this.codeTips.msg = "重新获取";
        }
      }, 1000);
      tel &&
        this.$request
          .post(
            `/${
              formName == "registerForm" ? "getCode" : "getVerificationCode"
            }`,
            { tel, key, captcha }
          )
          .then(data => {
            Notify({ message: "发送成功", type: "success" });
            this.registerForm.verification_key = data.key;
            this.reset.verification_key = data.key;
          })
          .catch(err => {
            this.codeTips.count = 0;
            clearInterval(timer);
            Notify(err);
          });
    },
    /* 图形验证码 */
    getVerificationCode() {
      this.verification.is_tap = true;
      this.$request("/verificationCode")
        .then(data => {
          setTimeout(() => {
            this.verification.is_tap = false;
          }, 1000);
          const { img, key } = data;
          this.verification.code_img = img;
          this.ruleForm.key = key;
          this.registerForm.key = key;
          this.reset.key = key;
        })
        .catch(err => {
          Notify(err);
        });
    }
  }
};
</script>
<style >
/* @import "pdfh5/css/pdfh5.css"; */
.pageNum {
  display: none;
}
.shuoming {
  color: #fff;
  padding: 10px 0;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 30px;
  position: absolute;
  font-size: 10px;
  text-align: center;
  left: 0;
  bottom: 0;
}
.shuoming .file {
  color: #b0f566;
}
.code {
  height: 46px;
  width: 40%;
  margin-left: 10px;
  position: relative;
}
.code .img {
  height: 100%;
}
.code .refresh {
  width: 46px;
  height: 46px;
  position: absolute;
  top: 0;
  left: 100%;
  margin-left: 8px;
}
.code .refresh .start {
  -webkit-transform: rotate(360deg);
  transform: rotate(360deg);
  -webkit-transition: -webkit-transform 1s linear;
  transition: transform 1s linear;
}
.van-cell {
  background: transparent;
  color: #fff;
  border-radius: 5px;
  border: 1px solid #fff;
}
.van-field__control {
  color: #fff;
}
.van-button {
  border-radius: 7.5px;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  width: 260px;
  /* font-size: 10px; */
}
.sms {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 70px;
  height: 100%;
  padding: 0;
  background: #fff;
  color: #2c2c2c;
  border-color: transparent;
}
</style>
<style lang="scss" scoped>
.back_home-wrap{
  position: absolute;
  left: 20px;
  top: 10px;
  .back_home{
    font-size: 20px;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    width: 1rem;
    height: 1rem;
    border: 0;
    border-radius: 100%;
    text-align: center;
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
  }
}
.back-wrap {
  width: 100%;
  padding-bottom: 30px;
  color: #fff;
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-size: 11px;
  .back {
    width: 12px;
    height: 12px;
  }
  span {
    text-decoration: underline;
    color: #fff;
    padding-left: 5px;
  }
}
.input {
  display: block;
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 0;
  color: #fff;
  text-align: left;
  background-color: transparent;
  border: 0;
  resize: none;
}
input::-webkit-input-placeholder {
  color: #fff;
}
.input.tel,
.input.key,
.input.captcha {
  padding: 8px 6px;
  margin-left: 10px;
  position: relative;
}
.input.captcha {
  width: 100px;
  border-bottom: 1px solid #fff;
  align-self: flex-end;
  margin-left: 0;
}
img {
  width: 100%;
  height: 100%;
}
.body-wrap {
  background-image: url("../assets/img/bg.png");
  background-size: 100% 100%;
}
.body {
  font-size: 10px;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
// .logo {
//   width: 100px;
//   height: 120px;
//   margin-top: 80px;
//   margin-bottom: 60px;
// }
.tips {
  width: 320px;
  color: #fff;
  padding-bottom: 20px;
  font-size: 14px;
  span {
    &.active {
      border-bottom: 1px solid #fff;
    }
    margin-right: 10px;
  }
}
.form {
  display: flex;
  flex-direction: column;
  .logo {
    width: 212px;
    height: 25px;
    margin: 55px auto 64px;
  }
}
.input-box {
  width: 260px;
  margin: 0 auto;
  margin-bottom: 40px;
  position: relative;
  .icon {
    width: 16px;
    height: 16px;
    position: relative;
    &.key {
      width: 22px;
      height: 10px;
    }
    &.key::before {
      right: -6px;
      left: inherit;
      height: 16px;
      top: -4px;
    }
    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 100%;
      width: 10px;
      height: 100%;
      border-right: 1px solid #fff;
    }
  }
}
.reg-captch {
  background-image: url("../assets/img/box.png");
  background-size: 100% 100%;
  border: none;
  width: 100px;
  position: relative;
  .van-cell {
    border: none;
  }
  &::before {
    content: "请输入图形验证码";
    width: 200%;
    text-align: center;
    color: #fff;
    display: block;
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
}
.input-box.reg {
  background-image: url("../assets/img/box.png");
  background-size: 100% 100%;
  .van-cell {
    border: none;
  }
  position: relative;
  &.ver_code {
    &::before {
      content: "请输入短信验证码";
    }
  }
  &.pwd {
    &::before {
      content: "设置登录密码";
    }
  }
  &.tel {
    &::before {
      content: "请输入手机号码";
    }
  }
  &.tel,
  &.ver_code,
  &.pwd {
    &::before {
      color: #fff;
      display: block;
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
.input-box.flex {
  display: flex;
  align-items: center;
}
.input-box.flex.line {
  border-bottom: 1px solid #fff;
  font-size: 12px;
}
.input-btn {
  margin: 0 auto;
  .login-tips {
    padding: 12px 0;
    display: flex;
    justify-content: space-between;
    color: #fff;
  }
  .reg-tips {
    color: #dee0e2;
    padding: 12px 0;
    text-align: right;
    span {
      cursor: pointer;
      color: #fff;
      text-decoration: underline;
      margin-left: 4px;
    }
  }
}
</style>