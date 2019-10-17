<template>
  <div class="infordetail">
    <header><van-nav-bar
      title="瑜伽知识"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    > 
      <van-icon slot="right" ><img src="../../../static/img/share.svg"></van-icon>
    </van-nav-bar></header>
    <section>
      <van-popup v-model="show"
        position="top"
        :style="{ height: '20%' }"
      ><share :config="config"></share></van-popup>
      <div class="infordetail-count">
        <div class="infordetail-count-title">
          <p class="titlep">{{ detailLists.headline }}</p>
          <p class="infordetail-count-title-subhead">{{  }}</p>
          <div class="infordetail-count-title-remarks"><span><img src="../../../static/img/eye.png"> {{detailLists.views}}</span> <span>{{ createddate }}</span></div>
        </div>
      </div>
      <main class="infordetail-main">
        <div v-html="detailLists.content"></div>
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
export default {
  data() {
    return {
      detailLists: [],
      createddate: '',
      show: false,
      config: {
        url: "",
        source: "",
        title: "",
        description: "",
        sites: ["qzone", "qq", "weibo", "wechat", "douban"],
        wechatQrcodeTitle: "微信扫一扫：分享", // 微信二维码提示文字
        wechatQrcodeHelper:
          "<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>"
      }
    }
  },
  components: {
    Footer
  },
  created() {
    this.yujiamation()

  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    onClickRight() {
      this.show = true
    },
    yujiamation () {
      const id = this.$route.params.id
      this.$request.get('informationInfo/' + id).then((res) => {
        console.log(res)
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
      border-bottom: 2px solid #EEEEEE;
      img {
        width: 15px;
        height: 15px;
      }
    }
  }
  section {
    width: 100%;
    height: 86%;
    overflow: hidden;
    overflow: auto;
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
      font-size: 16px;
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