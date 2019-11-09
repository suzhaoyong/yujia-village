<template>
  <div class="infordetail">
    <header><van-nav-bar
      title="瑜伽知识"
      left-arrow
      @click-left="onClickLeft"
      @click-right="shareMessage"
    >
      <van-icon slot="right" name="share"></van-icon>
    </van-nav-bar></header>
    <section>
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
            <img src="../../assets/img/fxwenan.png" alt="" @click="getWenan">
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
      <!-- <Shareing :show="show"></Shareing> -->

      <div class="infordetail-count">
        <div class="infordetail-count-title">
          <p class="titlep">{{ detailLists.headline }}</p>
          <div class="infordetail-count-title-remarks"><span><img src="../../../static/img/eye.png"> {{detailLists.views}}</span> <span>{{ createddate }}</span></div>
        </div>
      </div>
      <main class="infordetail-main">
        <div v-html="detailLists.main_body"></div>
      </main>
    </section>

    <Footer></Footer>
  </div>
</template>
<script>
import Vue from 'vue';
import Footer from '../../components/footer'
import { NavBar, Toast, Popup } from 'vant';
Vue.use(NavBar).use(Toast).use(Popup);
// import shareing from '../../components/shareing'
export default {
  data() {
    return {
      detailLists: [],
      createddate: '',
      show: false,
      shareimg: '',
      // 是否展示文案
      wenanIsShow: false,
      // 文案数据
      wenanData: [],
      // 复制的内容
      copy_content: ''
    }
  },
  components: {
    Footer,
    // shareing
  },
  created() {
    this.yujiamation()

  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    // 分享图片
    shareMessage() {
      this.show = true
      const params = {
          id: this.$route.params.id,
          identity:'knowledge',
          userId: sessionStorage.getItem('user')? JSON.parse(sessionStorage.getItem('user')).id : '',
          responseType: 'arraybuffer'
      }
      this.$request.post(`/show/share/photo`,params).then(res => {
        this.shareimg = res;
      })
    },
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
    yujiamation () {
      const id = this.$route.params.id
      this.$request.get('knowledgeInfo/' + id).then((res) => {
        this.detailLists = res
        this.createddate = res.created_at.substr(0, 10)
      })
    },
  }
}
</script>
<style lang="scss" scope>
  header {
    height: 44px;
    .van-nav-bar {
      background: #FFFFFF;
      img {
        width: 15px;
        height: 15px;
      }
    }
  }
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
  section {
    width: 100%;
    height: 86%;
    overflow: hidden;
    overflow: auto;
   .loading {
    width: 60px;
    height: 30px;
    margin: 49% auto;
  }
  }
  .share-component {
    margin: 30px auto;
  }
  .infordetail {
    width: 100%;
    height: 100%;
    background: white;
  &-count {
    margin-top: 20px;
    &-title {
      width: 303px;
      height: auto;
      margin: 0 auto;
      text-align: center;
      .titlep {
        width: 215px;
        margin: 0 auto;
        font-size: 16px;
        color: #000000;
        font-weight: 600;
      }
      &-subhead {
        margin-top: 18px;
        font-size: 7px;
      }
      &-remarks {
        display: flex;
        justify-content: space-between;
        font-size: 10px;
        margin-top: 30px;
        img {
          width: 15px;
          height: 11px;
        }
      }
    }
    
  }
  &-main {
    width: 100%;
    padding: 0 16px;
    margin-bottom: 55px;
    p {
      font-size: 14px;
      span {
        font-size: 12px;
        margin-top: 7px;
      }
    }
    img {
      width: 100%;
    }
  }
  }
</style>