<template>
  <div>
    <van-popup
      v-model="show"
      round
      :style="{ width: '100%' }"
    >
      <div v-show="!shareimg" class="loading">
          <van-loading color="#7BBB62" size="24px" vertical>加载中...</van-loading>
      </div>
      <div class="sharepopup" v-show="shareimg">
        <img :src="shareimg" class="shareimg">
        <div class="sharetext">长按图片，保存或发送给朋友</div>
        <div class="bgc">
          <img src="../assets/img/fxwenan.png" alt="" @click="getWenan">
        </div>
      </div>
    </van-popup>
      <van-popup class="popup" v-model="wenanIsShow" round closeable position="bottom"
        :style="{ height: '80%' }">
          <div class="wenan-title">选择分享文案</div>
          <div class="wenan-box">
              <div class="wenan-box-item" v-for="(item,index) in wenanData" :key="index" 
              @click="selectItem(item.content)">{{item.content}}</div>
          </div>
          <button id="copy" v-clipboard:copy="copy_content" 
              v-clipboard:success="onCopy"  v-clipboard:error="onError">一键复制</button>
      </van-popup>
  </div>
</template>
<script>
import Vue from 'vue';
import {  Toast, Popup } from 'vant';
Vue.use(Toast).use(Popup);
export default {
  props: ['show'],
  name: 'shareing',
  data () {
    return {
      // show: false,
      // 是否展示文案
      wenanIsShow: false,
      // 文案数据
      wenanData: [],
      // 复制的内容
      copy_content: ''
    }
  },
  methods: {
    // 获取文案
    getWenan() {
        this.wenanIsShow = true;
        this.$request.get('/personal/share/word/2').then(res => {
            this.wenanData = res;
        })
    },
     // 选中文案
      selectItem(copy_content) {
          this.copy_content = copy_content;
      },
      // 复制成功
      onCopy:function(e){
          Toast("复制成功！");
      },
      onError:function(e){
          Toast("复制失败！");
      },
  },
}
</script>
<style lang="scss" scope>
  .sharepopup {
    .shareimg {
      height: 485px;
      margin: 0 auto;
      // margin-left: 27px;
    }
    .sharetext {
      text-align: center;
      margin-top: 25px;
      font-size: 12px;
    }
    .bgc {
    width: 100%;
    height: 58px;
    margin-top: 32px;
    background-color: #fff;
    text-align: center;
     img {
      width: 79px;
      height: 58px;
      vertical-align: top;
      padding: 0;
    }
  }
  }
    .popup {
  /deep/ .van-icon {
      position: absolute;
      top: 12px;
      font-size: 18px;
      color: #2c2c2c;
  }
  .wenan-title {
      margin: 10px 0;
      font-size: 16px;
      font-weight: 600;
      text-align: center;
  }
  .wenan-box {
      position: absolute;
      top: 41px;
      left: 16px;
      bottom: 64px;
      width: 343px;
      padding: 10px;
      background-color: #eee;
      overflow: scroll;
      &-item {
          width: 100%;
          padding: 8px 10px;
          margin-bottom: 13px;
          background-color: #ddd;
          border-radius: 5px;
          font-size: 14px;
          font-weight: 600;
      }
      &-item:hover {
          box-sizing: border-box;
          background-color: #eefaed;
          border: 1px solid #7BBB62;
      }
  }
  #copy {
      position: absolute;
      left: 16px;
      bottom: 10px;
      width: 343px;
      height: 44px;
      line-height: 44px;
      background-color: #7BBB62;
      border-radius: 22px;
      border: none;
      text-align: center;
      font-size: 16px;
      color: #fff;
  }
}
</style>