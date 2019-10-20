<template>
  <div class="messagedetail">
    <header><van-nav-bar
      title="瑜伽资讯"
      left-arrow
      @click-left="goback"
      @click-right="shareMessage"
    >
      <van-icon slot="right" ><img src="../../../static/img/share.svg"></van-icon>
    </van-nav-bar></header>
    <main class="messagedetail-main">
      <section>
        <img :src="detailData.teacher_img">
      </section>
      <van-popup 
        v-model="show"
        round
        :style="{ maxHeight: '500px', width: '80%' }"
      >
        <div class="sharepopup">
          <img :src="shareimg">
          <div class="sharetext">长按图片，保存或发送给朋友</div>
        </div>
      </van-popup>
      <ul  class="messagedetail-main-title">
        <li class="li1">
          <div class="li1-text">{{ detailData.type }}</div>
          <div><span><img src="../../../static/img/eye.png">{{ detailData.views }}</span><span><img src="../../../static/img/hand.png" class="hand">100</span></div>
        </li>
        <li>
        </li>
        <li class="li2">
          <p class="stardiff">
            <van-rate
              v-model='detailData.diff'
              readonly
              :size="8"
              color='#58B708'
              void-icon="star"
              void-color="#eee"
            /></p>
          <div>￥{{ detailData.price }}</div>
        </li>
        <li class="li3">培训老师： <span>{{ detailData.name }}</span></li>
        <li class="li4">
          <p>培训时间</p>
          <div>{{ detailData.startTime }}-{{ detailData.endTime }}</div>
        </li>
        <li class="li5">
          <p>培训地址</p>
          <div>{{ detailData.custom_address }}{{ detailData.address }}</div>
        </li>
      </ul>
      <div class="messagedetail-main-proper">
        <div class="messagedetail-main-proper-title">
          <h6><span><img src="../../../static/img/yogateach.png"></span>适宜人群</h6>
          <span>Suitable crowd</span>
        </div>
        <div class="messagedetail-main-proper-show" >
          <div class="messagedetail-main-proper-show-list" v-for="(list, index) in crowds" :key="index">
            <div class="list-img"><img :src="crowdimg[index]"></div>
            <div class="list-text">{{ list }}</div>
          </div>
        </div>
      </div>
      <div class="messagedetail-main-teach">
        <div class="messagedetail-main-teach-title">
          <h6><span><img src="../../../static/img/yogateach.png"></span>教学大纲</h6>
          <span>syllabus</span>
        </div>
        <div class="messagedetail-main-teach-box">
          <img src="../../../static/img/bookbg.png">
          <span v-html="detailData.content"></span>
        </div>
      </div>
      <!-- <div class="content" v-html="detailData.content"></div> -->
    </main>
  <Footer></Footer>
  </div>
</template>

<script>
import Vue from 'vue';
import Footer from '../../components/footer'
import '../../dist/swiper.css'
import { Rate, Popup, NavBar} from 'vant'


Vue.use(Rate).use(NavBar).use(Popup)
export default {
  components: {
    Footer
  },
  data () {
    return {
      detailData: [],
      crowds: [],
      show: false,
      shareimg: '',
      crowdimg: [
        require('../../../static/img/image71.png'),
        require('../../../static/img/image72.png'),
        require('../../../static/img/image73.png'),
        require('../../../static/img/image71.png')
      ]
    }
  },
  created() {
    this.getmessageDetail()
  },
  mounted () {
  },
  methods: {
    goback () {
      this.$router.back()
    },
    getmessageDetail() {
      const id = this.$route.params.id
      this.$request.get('trains/' + id).then((res) => {
        this.detailData = res
        this.crowds = res.crowd.split("；")
      })
    },
    // 分享图片
    shareMessage() {
      this.show = true
      console.log(this.$route.params.id)
      var params = {
          id: this.$route.params.id,
          identity:'train',
          userId:"",
          responseType: 'arraybuffer'
      }
      this.$request.post(`/show/share/photo`,params).then(res => {
        this.shareimg = res;
      })
    },
  }
}
</script>

<style lang="scss" scope>
  // 分享样式
  .sharepopup {
    img {
      padding: 16px;
    }
    .sharetext {
      text-align: center;
      margin-top: 25px;
      font-size: 12px;
    }
  }
  .messagedetail {
    width: 100%;
    height: 100%;
    header {
      width: 100%;
      height: 44px;
      text-align: center;
      background-color: #E0EED2;
      font-weight: 700;
      font-size: 16px;
      font-size: 16px;
      line-height: 44px;
      position: fixed;
      top: 0;
      z-index: 99;
      .van-nav-bar {
        background: #FFFFFF;
        border-bottom: 2px solid #EEEEEE;
        img {
          width: 15px;
          height: 15px;
        }
      }
      span {
        position: relative;
        left: -35%;
        top: 5%;
        i {
          font-size: 16px;
        }
      }
    }
    &-main {
      width: 100%;
      height: auto;
      background: #EEEEEE;
      overflow: auto;
      margin-top: 44px;
      margin-bottom: 50px;
      section {
        width: 100%;
        background: white;
        height: auto;
        img {
          width: 100%;
        }
      }
      .van-popup {
        height: 70%;
      }
      &-title {
        width: 100%;
        height: 208px;
        padding: 8px 14px;
        font-size: 12px;
        background: white;
        li {
          margin-top: 4px;
        }
        .li1 {
          display: flex;
          justify-content: space-between;
          &-text {
            font-size: 14px;
            font-weight: 600;
          }
          img {
            width: 10px;
            height: 10px;
            margin-right: 4px;
          }
          .hand {
            margin-left: 4px;
            width: 6px;
            height: 12px;
          }
        }
        .li2 {
          display: flex;
          justify-content: space-between;
          margin: 13px 0;
        }
        .li3 {
          font-weight: 100;
          span {
            color: #22AC38;
          }
        }
        .li4 {
          div {
            display: block;
            width: 343px;
            height: 22px;
            background: #EEEEEE;
            padding: 0 14px;
            color: #999999;
          }
        }
        .li5 {
          div {
            display: block;
            width: 343px;
            height: 42px;
            background: #EEEEEE;
            padding: 0 14px;
            color: #999999;
          }
        }
      }
      &-proper {
        margin-top: 4px;
        background: white;
        font-size: 10px;
        overflow: hidden;
        &-title {
          height: 55px;
          width: 91%;
          border-bottom: 1px solid #EEEEEE;
          margin: 0 auto;
          h6 {
            span {
              margin-right: 8px;
              img {
                width: 10px;
                height: 15px;
              }
            }
            display: block;
            padding-top: 18px;
            font-size: 14px;
            font-weight: 900;
            color: #2C2C2C;
          }
          span {
            font-size: 10px;
            color: #999999;
          }
        }
        &-show {
          height: 200px;
          display: flex;
          overflow-x: auto;
          align-items: center;
          justify-content: center;
          &-list {
            width: 120px;
            height: 160px;
            margin: 0 20px;
            .list-img {
              width: 120px;
              height: 120px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .list-text {
              font-size: 10px;
              margin-top: 10px;
              overflow: hidden;
              text-align: center;
            }
          }
        }
        .messagedetail-main-proper-show::-webkit-scrollbar{   //去除滚动条
          width: 0;
          height: 0;
          display: none;
        }
      }
      &-teach {
        margin-top: 4px;
        background: white;
        font-size: 10px;
        min-height: 250px;
        &-title {
          height: 55px;
          width: 91%;
          border-bottom: 1px solid #EEEEEE;
          margin: 0 auto;
          h6 {
            span {
              margin-right: 8px;
              img {
                width: 10px;
                height: 15px;
              }
            }
            display: block;
            padding-top: 18px;
            font-size: 14px;
            font-weight: 900;
            color: #2C2C2C;
          }
          span {
            font-size: 10px;
            color: #999999;
          }
        }
        &-box {
          padding: 0 16px;
          min-height: 250px;
          margin-top: 10px;
          img {
            width: 134px;
            height: 165px;
            float: left;
          }
        }
      }
      .content {
        margin-top: 4px;
        padding: 16px;
        width: 100%;
        height: auto;
        background: white;
        font-size: 12px;
      }
    }

  }
</style>