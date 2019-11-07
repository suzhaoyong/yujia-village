<template>
  <div class="infordetail">
    <header><van-nav-bar
      title="瑜伽知识"
      left-arrow
      @click-left="onClickLeft"
      @click-right="shareMessage"
    >
      <van-icon slot="right" ><img src="../../../static/img/share.svg"></van-icon>
    </van-nav-bar></header>
    <section>
      <van-popup 
        v-model="show"
        round
        :style="{ height: '70%', width: '80%' }"
      >
        <div v-show="!shareimg" class="loading">
            <van-loading color="#7BBB62" size="24px" vertical>加载中...</van-loading>
        </div>
        <div class="sharepopup" v-show="shareimg">
          <img :src="shareimg">
          <div class="sharetext">长按图片，保存或发送给朋友</div>
        </div>
      </van-popup>

      <div class="infordetail-count">
        <div class="infordetail-count-title">
          <p class="titlep">{{ detailLists.headline }}</p>
          <!-- <p class="infordetail-count-title-subhead">{{  }}</p> -->
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
export default {
  data() {
    return {
      detailLists: [],
      createddate: '',
      show: false,
      shareimg: ''
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
  .sharetext {
    text-align: center;
    font-size: 12px;
    margin-top: 25px;

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