<template>
  <div>
    <top-title></top-title>
    <div class="body">
      <div class="step-title">
        <div class="step-box">
          <div class="step active">
            <div class="number">①</div>
            <div class="text">同意协议</div>
          </div>
          <i class="line"></i>
          <div class="step">
            <div class="number">②</div>
            <div class="text">填写资料</div>
          </div>
        </div>
      </div>
      <div class="content" v-show="false"></div>
      <div class="form">
        <div class="name-address-phone">
          <div class="name-phone">
            <div class="name">
              <span class="title">真实姓名</span>
              <input type="text" class="form-control input" placeholder="商品名或关键词" />
            </div>
            <div class="phone">
              <span class="title">馆内联系电话</span>
              <input type="text" class="form-control input" placeholder="商品名或关键词" />
            </div>
            <div class="shop">
              <span class="title">加盟馆馆名</span>
              <input type="text" class="form-control input" placeholder="商品名或关键词" />
            </div>
          </div>
          <div class="address">
            <span class="title">加盟馆地址</span>
            <input type="text" class="form-control input" placeholder="详细地址" />
          </div>
        </div>
        <div class="card">
          <div class="title-tips">
            <div class="title">免责声明</div>
            <div class="download">下载模版</div>
          </div>
          <div class="upload-box">
            <el-upload action="#" list-type="picture-card" :auto-upload="false">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </div>
        </div>
      </div>
      <div class="agreen-next">
        <div class="agreen">
          <div class="select"></div>
          <div class="text">我同意本协议所有内容</div>
        </div>
        <div class="next">下一步</div>
      </div>
    </div>
  </div>
</template>
<script>
import TopTitle from "./topTItle";
export default {
  components: {
    TopTitle
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false
    };
  },
  methods: {
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.body {
  width: 60rem;
  margin: 0 auto;
  padding-bottom: 5.75rem;
  .step-title {
    padding-top: 3.35rem;
    padding-bottom: 1.15rem;
    border-bottom: 1px solid #dcdcdc;
    .step-box {
      display: flex;
      align-items: center;
      justify-content: center;
      .step {
        display: flex;
        color: #2c2c2c;
        font-size: 0.7rem;
        &.active {
          color: #538940;
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
      border: 1px solid #ccc;
      font-size: 0.7rem;
      color: #2c2c2c;
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
          }
          .input {
            width: 7rem;
            padding-left: 0.5em;
            height: 100%;
          }
        }
      }
      .address {
        display: flex;
        padding: 0.6rem 0 1.3rem;
        padding-left: 2rem;
        .title {
          margin-right: 1.6rem;
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
      .title-tips {
        display: flex;
        padding-top: 1.45rem;
        padding-bottom: 0.55rem;
        padding-left: 3rem;
        border-bottom: 1px solid #eee;
        .title {
        }
        .tips {
          padding-left: 2.5rem;
          color: #999;
        }
        .download {
          padding-left: 2.5rem;
          text-decoration: underline;
          cursor: pointer;
        }
      }
      .upload-box {
        padding: 1.35rem 0 1.35rem 7.5rem;
      }
    }
  }
  .agreen-next {
    padding-top: 0.75rem;
    display: flex;
    justify-content: space-between;
    .agreen {
      .select {
        height: 0.75rem;
        width: 0.75rem;
        background: #ccc;
        border-radius: 50%;
        display: inline-block;
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
