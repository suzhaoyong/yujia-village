<template>
  <div>
    <div class="body">
      <div class="step-title">
        <div class="step-box">
          <div :class="['step',{active: step.cur_index >= 1}]">
            <div class="number">①</div>
            <div class="text">同意协议</div>
          </div>
          <i class="line"></i>
          <div :class="['step',{active: step.cur_index >= 2}]">
            <div class="number">②</div>
            <div class="text">填写资料</div>
          </div>
        </div>
      </div>
      <div class="content" v-show="step.cur_index === 1">
        <iframe
          src="../../../static/doc/瑜伽村平台认证服务协议.pdf"
          width="100%"
          height="100%"
          frameborder="1"
        ></iframe>
      </div>
      <div class="form" v-show="step.cur_index === 2">
        <div class="name-address-phone">
          <div class="name-phone">
            <div class="name">
              <span class="title">真实姓名</span>
              <el-input v-model="ruleForm.real_name" placeholder="请填写真实姓名"></el-input>
            </div>
            <div class="phone">
              <span class="title">负责人电话</span>
              <el-input v-model="ruleForm.club_tel" placeholder="请填写负责人电话"></el-input>
            </div>
            <div class="shop">
              <span class="title">联盟馆馆名</span>
              <el-input v-model="ruleForm.club_name" placeholder="请填写联盟馆馆名"></el-input>
            </div>
          </div>
          <div class="address">
            <span class="title">联盟馆地址</span>
            <!-- <v-distpicker :province="province" :city="city" :area="area" @selected="selectAddress"></v-distpicker> -->
            <v-distpicker @selected="selectAddress"></v-distpicker>
          </div>
          <div class="detail_address">
            <span class="title">详细地址</span>
            <el-input style="margin-right:20px;" v-model="ruleForm.address" placeholder="请填写详细地址"></el-input>
          </div>
        </div>
        <div class="card" v-show="isShow('7') || isShow('4')">
          <div class="title-tips">
            <div class="title" style="left: 1em;">工作证明/教练证书</div>
            <div class="tips">请上传最新的工作证明(仅教练需要提交)</div>
          </div>
          <div class="upload-box">
            <el-upload
              action="#"
              :class="{disabled:uploadWorkDisabled}"
              :on-change="changeWorkFile"
              :on-remove="() => this.ruleForm['img_work'] = ''"
              list-type="picture-card"
              :limit="1"
              :auto-upload="false"
            >
              <i class="el-icon-plus"></i>
              <div class="el-upload__tip" slot="tip">支持jpg,jpeg,png格式</div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </div>
        </div>
        <div class="card" v-show="isShow('7') || isShow('2')">
          <div class="title-tips">
            <div class="title" style="left: 1em;">营业执照</div>
            <div class="tips">请上传最新的营业执照(仅机构负责人需要提交)</div>
          </div>
          <div class="upload-box">
            <el-upload
              action="#"
              :class="{disabled:uploadLicenseDisabled}"
              :on-change="changeLicenseFile"
              :on-remove="() => this.ruleForm['img_license'] = ''"
              list-type="picture-card"
              :limit="1"
              :auto-upload="false"
            >
              <i class="el-icon-plus"></i>
              <div class="el-upload__tip" slot="tip">支持jpg,jpeg,png格式</div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </div>
          <div class="form_tips">
            注：带
            <span style="color:#8CD15A;font-size:1.2rem;">*</span>为必填项，其余为选填
          </div>
        </div>
      </div>
      <div class="agreen-next" v-show="step.cur_index === 1">
        <div class="agreen">
          <div :class="['select', { active: step.agree }]" @click="step.agree = !step.agree"></div>
          <div class="text" @click="step.agree = !step.agree">我同意本协议所有内容</div>
        </div>
        <div
          class="next"
          :style="`${step.agree?'':'cursor: not-allowed;background:#ccc;'}`"
          @click="stepOpFor('next')"
        >下一步</div>
      </div>
      <div class="agreen-next" v-show="step.cur_index === 2">
        <div class="next" style="background:#fff;" @click="stepOpFor('prev')">上一步</div>
        <div class="next" @click="stepOpFor('finish')">完成</div>
      </div>
    </div>
  </div>
</template>
<script>
import TopTitle from "./topTItle";
import VDistpicker from "v-distpicker";
import { postUserInfo } from "@/api/personal";
export default {
  props: ["certificate"],
  components: {
    TopTitle,
    VDistpicker
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      step: {
        cur_index: 1,
        agree: false
      },
      ruleForm: {
        identity_auth: "",
        real_name: "",
        club_tel: "",
        club_name: "",
        city: "",
        province: "",
        area: "",
        address: "",
        // img_exemption: "",
        img_work: "",
        img_license: ""
      }
    };
  },
  computed: {
    uploadExemptionDisabled: function() {
      return this.ruleForm.img_exemption;
    },
    uploadWorkDisabled: function() {
      return this.ruleForm.img_work;
    },
    uploadLicenseDisabled: function() {
      return this.ruleForm.img_license;
    },
    isShow() {
      return id => this.certificate.identity == id;
    }
  },
  mounted() {},
  methods: {
    changeExemptionFile(file, fileList) {
      this.changeFile(file, fileList, "img_exemption");
    },
    changeLicenseFile(file, fileList) {
      this.changeFile(file, fileList, "img_license");
    },
    changeWorkFile(file, fileList) {
      this.changeFile(file, fileList, "img_work");
    },

    changeFile(file, fileList, name) {
      // this.ruleForm[name] = file;
      // return;
      let This = this;
      let reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function(e) {
        this.result; // 这个就是base64编码了
        This.ruleForm[name] = this.result;
      };
    },
    selectAddress(data) {
      const { area, city, province } = data;
      let params = {
        province: province.value,
        city: city.value,
        area: area.value
      };
      this.ruleForm = Object.assign({}, this.ruleForm, params);
    },
    stepOpFor(option) {
      const obj = {
        prev: () => {
          this.step.cur_index -= 1;
        },
        next: () => {
          if (!this.step.agree) {
            return;
            this.$message({
              type: "warning",
              message: "请先同意协议内容"
            });
          }
          this.step.cur_index += 1;
        },
        finish: () => {
          const { img_license, img_work} = this.ruleForm;
          let identity_auth = 1;
          if (img_license && img_work) {
            identity_auth = 7;
          } else if (img_license) {
            identity_auth = 4;
          } else if (img_work) {
            identity_auth = 2;
          } else {
            this.$message({
              type: "warning",
              message: "请上传符合自身角色的图片"
            });
            return;
          }
          this.ruleForm.identity_auth = identity_auth;

          // let formData = new FormData();
          // for (const arr of Object.entries(this.ruleForm)) {
          //   const [k, v] = arr;
          //   formData.append(k, v);
          // }
          this.$request.post("/personal/home", this.ruleForm).then(data => {
            this.$message({
              type: "success",
              message: "提交成功"
            });
            this.$alert("前往个人中心", "成功", {
              confirmButtonText: "立即前往",
              callback: action => {
                this.$router.push({
                  name: "personal"
                });
              }
            });
          });
        }
      };
      obj[option]();
    }
  }
};
</script>
<style scoped>
.form >>> .el-input__inner {
  height: 30px;
}
.form >>> .distpicker-address-wrapper select {
  height: 2em;
  margin-right: 10px;
  font-size: 0.7rem;
  padding: 0;
}
.form >>> .disabled .el-upload--picture-card {
  display: none;
}
</style>
<style lang="scss" scoped>
.distpicker-address-wrapper {
  display: flex;
  select {
    height: 30px;
  }
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.body {
  background: #fff;
  width: 60rem;
  margin: 0 auto;
  padding-bottom: 5.75rem;
  .step-title {
    padding-top: 3.35rem;
    padding-bottom: 1.15rem;
    // border-bottom: 1px solid #dcdcdc;
    .step-box {
      display: flex;
      align-items: center;
      justify-content: center;
      .step {
        display: flex;
        color: #2c2c2c;
        font-size: 0.7rem;
        &.active {
          color: #8cd15a;
        }
        .number {
          padding-right: 0.55rem;
        }
        .text {
        }
      }
    }
    .line {
      width: 6.75rem;
      height: 2px;
      margin: 0 1.15rem;
      background: #dcdcdc;
    }
  }
  .content {
    background: #ccc;
    height: 33.25rem;
    border-radius: 0.25rem;
    overflow: auto;
    /* 设置滚动条的样式 */
    &::-webkit-scrollbar {
      width: 0.3rem;
    }
    /* 滚动槽 */
    &::-webkit-scrollbar-track {
      background: #dcdcdc;
      border-radius: 0.15rem;
    }
    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb {
      background: #88bc37;
      border-radius: 0.15rem;
    }
    &::-webkit-scrollbar-thumb {
      background: #88bc37;
    }
  }
  .form {
    .name-address-phone {
      background: #fff;
      border-radius: 0.25rem;
      font-size: 0.7rem;
      color: #2c2c2c;
      box-shadow: -1px 2px 15px 1px rgba(36, 36, 36, 0.2);
      .name-phone {
        display: flex;
        border-bottom: 1px solid #eee;
        padding: 0.65rem 0;
        padding-left: 2rem;
        .name,
        .phone,
        .shop {
          margin-right: 1.6rem;
          display: flex;
          align-items: center;
          .title {
            padding-right: 0.75rem;
            flex-shrink: 0;
            position: relative;
            &::after {
              content: "*";
              color: #8cd15a;
              display: block;
              position: absolute;
              top: 50%;
              left: -0.7em;
              font-size: 1.2rem;
              transform: translateY(-40%);
            }
          }
          .input {
            width: 7rem;
            padding-left: 0.5em;
            height: 100%;
          }
        }
      }
      .detail_address {
        display: flex;
        align-items: center;
        padding: 0rem 0 1.3rem;
        padding-left: 2rem;
        .title {
          width: 5em;
          text-align: right;
          margin-right: 1.6rem;
          flex-shrink: 0;
          position: relative;
          // &::after{
          //   content: '*';
          //   color:#8CD15A;
          //   display: block;
          //   position: absolute;
          //   left: 0.3em;
          //   top: 50%;
          //   transform: translateY(-50%);
          // }
        }
      }
      .address {
        display: flex;
        align-items: center;
        padding: 0.6rem 0;
        padding-left: 2rem;
        .title {
          width: 5em;
          text-align: right;
          margin-right: 1.6rem;
          flex-shrink: 0;
          position: relative;
          &::after {
            content: "*";
            color: #8cd15a;
            display: block;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: -0.7em;
            font-size: 1.2rem;
            transform: translateY(-40%);
          }
        }
        .input {
          width: 32rem;
          height: 100%;
        }
      }
    }
    .card {
      font-size: 0.7rem;
      color: #2c2c2c;
      margin-top: 0.4rem;
      box-shadow: -1px 2px 15px 1px rgba(36, 36, 36, 0.2);
      .title-tips {
        display: flex;
        padding-top: 1.45rem;
        padding-bottom: 0.55rem;
        // padding-left: 3rem;
        border-bottom: 1px solid #eee;
        .title {
          width: 10em;
          text-align: left;
          padding-left: 1em;
          position: relative;
          &::after {
            content: "*";
            color: #8cd15a;
            display: block;
            position: absolute;
            left: 0;
            top: 50%;
            z-index: 2;
            transform: translateY(-50%);
            font-size: 1.2rem;
            transform: translateY(-40%);
          }
        }
        .tips {
          padding-left: 1rem;
          color: #999;
        }
        .download {
          padding-left: 1rem;
          text-decoration: underline;
          cursor: pointer;
        }
      }
      .upload-box {
        padding: 1.35rem 0 1.35rem 7.5rem;
      }
      .form_tips {
        color: #999;
        padding: 1em 1em;
        border-top: 1px solid #eee;
      }
    }
  }
  .agreen-next {
    padding-top: 0.75rem;
    display: flex;
    justify-content: space-between;
    .agreen {
      display: flex;
      align-items: center;
      cursor: pointer;
      .select {
        height: 1rem;
        width: 1rem;
        border: 1px solid #ccc;
        border-radius: 50%;
        display: inline-block;
        &.active {
          background-image: url("../../assets/order/selected.png");
          background-size: 100% 100%;
        }
      }
      .text {
        margin-left: 0.45rem;
        font-size: 0.6rem;
        display: inline-block;
      }
    }
    .next {
      cursor: pointer;
      font-size: 0.7rem;
      padding: 0.5rem 1.18rem;
      border-radius: 0.25rem;
      background: #cde9b4;
    }
  }
}
</style>
