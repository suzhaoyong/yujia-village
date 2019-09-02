<template>
  <div>
    <div class="safe">
      <session-title name="信息与安全中心"></session-title>
      <cloud :arr="[1,2,4]"></cloud>
      <div class="body">
        <div class="tabs">
          <div @click="tagsChange(0)" :class="['tab', isTagActive(0)]">修改密码</div>
          <div @click="tagsChange(1)" :class="['tab', isTagActive(1)]">修改绑定手机</div>
          <div @click="tagsChange(2)" :class="['tab', isTagActive(2)]">个人信息</div>
          <div
            v-show="parseInt(info.user.identity_auth) == 2  || parseInt(info.user.identity_auth) == 7"
            @click="tagsChange(3)"
            :class="['tab', isTagActive(3)]"
          >会馆信息</div>
        </div>
        <div class="content">
          <div v-show="!success">
            <div
              class="edit-password"
              v-show="tagList[0].active && tagList[0].methods === 'password'"
            >
              <div class="form">
                <div class="item">
                  <span class="title">旧密码</span>
                  <div class="form_input">
                    <input
                      type="password"
                      v-model="ruleForm.old_password"
                      class="form-control input"
                      placeholder="请输入旧密码"
                    />
                    <div class="form_input-tips"></div>
                  </div>
                </div>
                <div class="item">
                  <span class="title">新密码</span>
                  <div class="form_input">
                    <input
                      type="password"
                      v-model="ruleForm.password"
                      class="form-control input"
                      placeholder="请输入旧密码"
                    />
                    <div class="form_input-tips"></div>
                  </div>
                </div>
                <!-- <div class="item">
                <span class="title">二次确认</span>
                <div class="form_input">
                  <input type="password" class="form-control input" placeholder="请输入旧密码" />
                  <div class="form_input-tips">密码错误</div>
                </div>
                </div>-->
                <div class="submit">
                  <!-- <div class="btn">返回</div> -->
                  <div class="btn" @click="updatePassword">更改</div>
                </div>
              </div>
              <div class="tips">
                <span
                  @click="tagList[0].methods = 'phone';ruleForm = resetForm('ruleForm');"
                >忘记密码？更换验证方式</span>
              </div>
            </div>
            <div
              class="edit-password-by-code"
              v-show="tagList[0].active && tagList[0].methods === 'phone'"
            >
              <div class="form">
                <div class="item">
                  <span class="title">验证码</span>
                  <div class="form_input">
                    <input
                      type="text"
                      v-model="ruleForm.verification_code"
                      class="form-control input"
                      placeholder="请输入验证码"
                    />
                    <div class="getcode" @click="getCode">{{codeTips.msg}}</div>
                    <div class="form_input-tips"></div>
                  </div>
                </div>
                <div class="item">
                  <span class="title">新密码</span>
                  <div class="form_input">
                    <input
                      type="password"
                      v-model="ruleForm.password"
                      class="form-control input"
                      placeholder="请输入旧密码"
                    />
                    <div class="form_input-tips"></div>
                  </div>
                </div>
                <!-- <div class="item">
                <span class="title">二次确认</span>
                <div class="form_input">
                  <input type="password" class="form-control input" placeholder="请输入旧密码" />
                  <div class="form_input-tips">密码错误</div>
                </div>
                </div>-->
                <div class="submit">
                  <div
                    class="btn"
                    @click="() => { 
                      this.tagList[0].methods = 'password';
                      this.ruleForm = this.resetForm('ruleForm');
                      this.resetCode();
                      }"
                  >返回</div>
                  <div class="btn" @click="updatePassword">更改</div>
                </div>
              </div>
              <div class="tips">
                <span>您当前手机号:</span>
                <br />
                <span>{{tel}}</span>
              </div>
            </div>
            <div class="edit-phone" v-show="tagList[1].active">
              <div class="form">
                <div class="item">
                  <span class="title">验证码</span>
                  <div class="form_input">
                    <input
                      type="text"
                      v-model="telForm.verification_code"
                      class="form-control input"
                      placeholder="请输入验证码"
                    />
                    <div class="getcode" @click="getCode">{{codeTips.msg}}</div>
                    <div class="form_input-tips"></div>
                  </div>
                </div>
                <div class="item">
                  <span class="title">新手机号</span>
                  <div class="form_input">
                    <input
                      type="text"
                      v-model="telForm.tel"
                      class="form-control input"
                      placeholder="请输入新手机号"
                    />
                    <div class="form_input-tips"></div>
                  </div>
                </div>
                <div class="submit">
                  <!-- <div class="btn">返回</div> -->
                  <div class="btn" @click="updateTel">更改</div>
                </div>
              </div>
              <div class="tips">
                <span>您当前手机号:</span>
                <br />
                <span>{{tel}}</span>
              </div>
            </div>
            <div class="edit-personage" v-show="tagList[2].active && info.user.name">
              <div class="item">
                <div class="lable">用户名</div>
                <div class="value">
                  <el-input v-model="userForm.name"></el-input>
                </div>
              </div>
              <div class="item">
                <div class="lable">真实姓名</div>
                <div class="value">
                  <el-input v-model="userForm.real_name"></el-input>
                </div>
              </div>
              <div class="item">
                <div class="lable">性别</div>
                <div class="value">
                  <el-radio-group v-model="userForm.sex">
                    <el-radio :label="2">男</el-radio>
                    <el-radio :label="1">女</el-radio>
                    <el-radio :label="3">保密</el-radio>
                  </el-radio-group>
                </div>
              </div>
              <div class="item">
                <div class="lable">生日</div>
                <div class="value">
                  <el-date-picker
                    v-model="userForm.birthday"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </div>
              </div>
              <div class="item" v-show="false">
                <div class="lable">邮箱</div>
                <div class="value"></div>
              </div>
              <div class="item">
                <div class="lable">所在城市</div>
                <div class="value">
                  <v-distpicker
                    :province="userForm.province"
                    :city="userForm.city"
                    :area="userForm.area"
                    @selected="onDistpickerSelected"
                  ></v-distpicker>
                </div>
              </div>
              <div
                class="teach"
                v-show="userForm.identity_auth == 4 || userForm.identity_auth == 7"
              >
                <div class="item">
                  <div class="lable">系统认证身份</div>
                  <div class="value"></div>
                </div>
                <div class="item">
                  <div class="lable">教龄</div>
                  <div class="value">{{teacherForm.num}}</div>
                </div>
                <div class="item">
                  <div class="lable">擅长领域</div>
                  <div class="value">{{teacherForm.good_at}}</div>
                </div>
                <div class="item">
                  <div class="lable">个人简介</div>
                  <div class="value">{{teacherForm.content}}</div>
                </div>
                <div class="item">
                  <div class="lable">荣誉/感悟</div>
                  <div class="value">
                    <el-input v-model="teacherForm.info" type="textarea"></el-input>
                  </div>
                </div>
              </div>
              <div class="btn-wrap">
                <div class="btn" @click="updateTeachUser">更改</div>
              </div>
            </div>
            <div class="edit-hall" v-show="tagList[3].active">
              <div class="item">
                <div class="lable">会馆名称</div>
                <div class="value">
                  <el-select
                    v-model="clubForm.club_name"
                    @change="changeClub"
                    placeholder="请选择会馆名称"
                  >
                    <el-option
                      v-for="item in clubList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>

              <div v-show="false">
                <div class="item">
                  <div class="lable">会馆电话</div>
                  <div class="value">
                    <el-input v-model="clubForm.name"></el-input>
                  </div>
                </div>
                <div class="item">
                  <div class="lable">会馆所在城市</div>
                  <div class="value">
                    <v-distpicker
                      :province="clubForm.province"
                      :city="clubForm.city"
                      :area="clubForm.area"
                      @selected="onDistpickerSelected"
                    ></v-distpicker>
                  </div>
                </div>
                <div class="item">
                  <div class="lable">会馆地址</div>
                  <div class="value">
                    <el-input v-model="clubForm.club_address"></el-input>
                  </div>
                </div>
                <div class="item">
                  <div class="lable">会馆联系人</div>
                  <div class="value">
                    <el-input v-model="clubForm.club_name"></el-input>
                  </div>
                </div>
                <div class="item">
                  <div class="lable">联系人电话</div>
                  <div class="value">
                    <el-input v-model="clubForm.tel"></el-input>
                  </div>
                </div>
              </div>
              <div class="btn-wrap">
                <div class="btn" @click="updateClub">更改</div>
              </div>
            </div>
          </div>

          <div class="success" v-show="success">
            <span>更改成功！</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SessionTitle from "./SessionTitle";
import VDistpicker from "v-distpicker";
import Cloud from "./cloud";
import {
  postUpdateTeacherInfo,
  getTeacherInfo,
  postUpdateClubInfo,
  getClubInfo,
  postUpdateInfo
} from "@/api/personal";

export default {
  components: {
    SessionTitle,
    VDistpicker,
    Cloud
  },
  data() {
    return {
      success: false,
      clubList: [],
      codeTips: {
        msg: "发送验证码",
        count: 0
      },
      tagList: [
        { type: "password", active: true, methods: "password" },
        { type: "phone", active: false },
        { type: "personage", active: false },
        { type: "hall", active: false }
      ],
      ruleForm: {
        old_password: "",
        password: "",
        verification_key: "",
        verification_code: ""
      },
      telForm: {
        old_tel: "",
        tel: "",
        verification_key: "",
        verification_code: ""
      },
      clubForm: {
        id: "", // 会馆id
        name: "",
        tel: "",
        club_tel: "",
        club_name: "",
        club_address: "",
        city: "",
        province: "",
        area: ""
      },
      teacherForm: {
        id: "", // 会馆id
        info: "",
        city: "",
        province: "",
        area: ""
      },
      userForm: {
        name: "", //
        real_name: "", //
        sex: "", // 性别1-女 2-男 3-保密
        birthday: "",
        city: "",
        province: "",
        area: ""
      },
      info: {
        user: {}
      }
    };
  },
  computed: {
    // info() {
    //   const user = sessionStorage.getItem("user");
    //   return user && JSON.parse(user);
    // },
    isTagActive() {
      return index => ({
        active: this.tagList[index].active
      });
    },
    /** 手机号码加密 */
    tel() {
      return (
        this.info &&
        this.info.user &&
        this.info.user.tel &&
        `${this.info.user.tel.substr(0, 3)}****${this.info.user.tel.substr(
          7,
          11
        )}`
      );
    }
  },
  created() {
    this.getPersonal();
  },
  mounted() {
    const { type } = this.$route.query;
    type && this.tagsChange(type);
  },
  methods: {
    /** 个人信息 */
    getPersonal() {
      this.$request("/personal/home").then(data => {
        sessionStorage.setItem("user", JSON.stringify(data));
        this.info = data;
        const {
          area,
          province,
          city,
          birthday,
          sex,
          tel,
          identity_auth,
          name,
          real_name
        } = this.info.user;
        this.userForm = Object.assign(
          {},
          {
            area,
            province,
            city,
            birthday,
            sex,
            tel,
            identity_auth,
            name,
            real_name
          }
        );
      });
    },
    onDistpickerSelected(data) {
      const { area, city, province } = data;
      if (this)
        this.userForm = Object.assign({}, this.userForm, {
          area: area.value,
          city: city.value,
          province: province.value
        });
    },
    changeClub() {},
    resetForm(name) {
      const form = {
        ruleForm: {
          old_password: "",
          password: "",
          verification_key: "",
          verification_code: ""
        },
        telForm: {
          old_tel: "",
          tel: "",
          verification_key: "",
          verification_code: ""
        }
      };
      return form[name];
    },
    resetCode() {
      // 重置获取验证码
      this.codeTips.msg = "发送验证码";
      this.codeTips.count = 0;
    },

    /* 短信验证码 */
    getCode() {
      if (this.codeTips.count > 0) return;
      this.codeTips.count = 59;
      let timer = setInterval(() => {
        this.codeTips.msg = `${this.codeTips.count--}s重新获取`;
        if (this.codeTips.count <= 0) {
          clearInterval(timer);
          this.codeTips.msg = "重新获取";
        }
      }, 1000);

      const { tel } = this.info && this.info.user;
      tel &&
        this.$request
          .post("/getVerificationCode", { tel })
          .then(data => {
            this.$message({ message: "发送成功", type: "success" });
            this.ruleForm.verification_key = data.key;
            this.telForm.verification_key = data.key;
          })
          .catch(_ => {
            this.resetCode();
          });
    },
    /** 修改手机号码 */
    updateTel() {
      const way = this.tagList[1];
      if (!way.active) return;
      const params = Object.assign({}, this.telForm, {
        old_tel: this.info.user.tel
      });
      if (this.checkoutEmpty(params)) return;
      this.$request.post("/personal/updatePassword", params).then(data => {
        this.$message({
          type: "success",
          message: "修改成功"
        });
      });
    },
    checkoutEmpty(form) {
      for (const item of Object.entries(form)) {
        const [k, v] = item;
        if (!v) return true;
      }
      return false;
    },
    /** 修改密码 */
    updatePassword() {
      const way = this.tagList[0];
      if (!way.active) return;
      let params = Object.assign({}, this.ruleForm);
      if (way.methods === "password") {
        delete params.verification_key;
        delete params.verification_code;
        if (this.checkoutEmpty(params)) return;
      } else {
        delete params.old_password;
        if (this.checkoutEmpty(params)) return;
      }
      this.$request.post("/personal/updatePassword", params).then(data => {
        this.$message({
          type: "success",
          message: "修改成功"
        });
      });
    },
    /** 切换选项 */
    tagsChange(cur_index) {
      this.success = false;
      this.resetCode();
      if (cur_index == 1) {
        this.ruleForm = this.resetForm("ruleForm");
      } else {
        this.telForm = this.resetForm("telForm");
      }
      this.tagList = this.tagList.map((item, index) => {
        if (index == cur_index) {
          item.active = true;
        } else {
          item.active = false;
        }
        return item;
      });

      const obj = {
        2: this.getTeacher,
        3: this.getClub
      };
      obj[cur_index] && obj[cur_index]();
    },
    getTeacher() {
      const {
        area,
        province,
        city,
        birthday,
        sex,
        tel,
        identity_auth,
        name,
        real_name
      } = this.info.user;
      this.userForm = Object.assign(
        {},
        {
          area,
          province,
          city,
          birthday,
          sex,
          tel,
          identity_auth,
          name,
          real_name
        }
      );
      if (identity_auth === 4 || identity_auth === 7) {
        getTeacherInfo().then(data => (this.teacherForm = data));
      }
    },
    getClub() {
      getClubInfo().then(data => (this.clubList = data));
    },
    updateTeachUser() {
      // postUpdateTeacherInfo();
      let params = Object.assign({}, this.userForm);
      postUpdateInfo(params).then(data => {
        this.getPersonal();
        this.$message({
          type: "success",
          message: "修改成功"
        });
      });
    },
    updateClub() {
      postUpdateClubInfo().then(data => {
        this.getPersonal();
        this.$message({
          type: "success",
          message: "修改成功"
        });
      });
    }
  }
};
</script>
<style scoped>
.edit-personage >>> .el-input__icon {
  display: none;
}
.edit-personage >>> .distpicker-address-wrapper select {
  height: 2em;
  margin-right: 10px;
  font-size: 0.7rem;
  padding:0;
}
.edit-personage >>> .disabled .el-upload--picture-card {
  display: none;
}
.edit-personage >>> .el-input__inner {
  height: 30px;
}

.edit-hall >>> .distpicker-address-wrapper select {
  height: 2em;
  margin-right: 10px;
  font-size: 0.7rem;
  padding:0;
}
.edit-hall >>> .disabled .el-upload--picture-card {
  display: none;
}
.edit-hall >>> .el-input__inner {
  height: 30px;
}
</style>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.edit-hall,
.edit-personage {
  .item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .lable {
      width: 8em;
      text-align: right;
      margin-right: 10px;
    }
    .value {
    }
  }
  .btn-wrap {
    margin-top: 3em;
    margin-left: 9em;
    .btn {
      cursor: pointer;
      border: 1px solid #7d7d7d;
      padding: 0.55rem 1.95rem;
    }
  }
}
.safe {
  position: relative;
  width: 60rem;
  margin: 0 auto;
  min-height: 40rem;
  .body {
    display: flex;
    padding-bottom: 5rem;
    .tabs {
      font-size: 0.7rem;
      .tab {
        cursor: pointer;
        margin-bottom: 1.55rem;
        &.active {
          font-weight: 800;
          position: relative;
          z-index: 4;
          &::before {
            content: "";
            display: block;
            position: absolute;
            top: 50%;
            left: -0.4rem;
            transform: translateY(-50%);
            width: 0.2rem;
            height: 0.7rem;
            background: #2c2c2c;
          }
          &::after {
            content: "";
            display: block;
            position: absolute;
            left: -0.35rem;
            top: 0;
            background: rgba(0, 0, 0, 0.3);
            background: linear-gradient(to right, #afafaf 0%, #ffffff 100%);
            z-index: -1;
            width: 100%;
            height: 100%;
          }
        }
      }
      padding-right: 4.85rem;
    }
    .content {
      border: 1px solid #ccc;
      box-shadow: 0.1rem 0 0.35rem rgba(36, 36, 36, 0.2);
      border-radius: 0.25rem;
      width: 40rem;
      padding: 2.4rem 1.5rem 1.5rem;
      font-size: 0.7rem;
      .success {
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          padding-top: 1.4rem;
          padding-bottom: 2.5rem;
          font-weight: 800;
        }
      }
      .edit-password,
      .edit-password-by-code,
      .edit-phone {
        display: flex;
        .form {
          .item {
            display: flex;
            .title {
              width: 5em;
              line-height: 1.85rem;
              text-align: right;
              padding-right: 0.5rem;
            }
            .input {
              width: 22rem;
              height: 1.85rem;
              font-size: 0.7rem;
              padding-left: 0.6rem;
              overflow: hidden;
            }
            .form_input {
              position: relative;
            }
            .getcode {
              position: absolute;
              top: 0;
              right: 0;
              height: 1.85rem;
              line-height: 1.85rem;
              border-radius: 0.25rem;
              padding: 0 0.85rem;
              border: 1px solid #dcdcdc;
              cursor: pointer;
            }
            .form_input-tips {
              color: #d83211;
              padding-top: 0.2rem;
              padding-left: 0.6rem;
              height: 1.8rem;
            }
          }
          .submit {
            display: flex;
            justify-content: center;
            .btn {
              cursor: pointer;
              border: 1px solid #7d7d7d;
              padding: 0.55rem 1.95rem;
              &:first-child {
                margin-right: 2.45rem;
              }
            }
          }
        }
        .tips {
          margin-left: 2.3rem;
          cursor: pointer;
        }
      }
      .edit-phone,
      .edit-password-by-code {
        .form {
          .title {
          }
          .getcode {
          }
          .form-control {
          }
          .submit {
            .btn {
            }
          }
        }
        .tips {
          padding-top: 2rem;
          span {
            &:nth-of-type(2) {
              display: block;
              padding-top: 0.4rem;
              font-weight: 800;
            }
          }
        }
      }
    }
  }
}
</style>

