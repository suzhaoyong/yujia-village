<template>
  <div class="messagedetail">
    <header><van-nav-bar
      title="课程详情"
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
        <li class="li-title"> {{ detailData.theme }} </li>
        <li class="li1">
          <div class="li1-text"><span>难度: {{ detailData.diff }}</span><span>观看: {{detailData.views}}</span><span>想学: {{ detailData.follow }}</span></div>
          <div class="li1-d2">￥{{ detailData.price }}</div>
        </li>
        <li class="li3"><img src="../../../static/img/teacher.png"> 培训老师： <span>{{ detailData.name }}</span></li>
        <li class="li4"><img src="../../../static/img/time.png"> 培训时间： <span>{{ time }}</span></li>
        <li class="li5"><img src="../../../static/img/teacher.png">培训地址： <span>{{ detailData.address }}</span></li>
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
      time: '',
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
        console.log(res)
        this.detailData = res
        this.crowds = res.crowd.split("；")
        this.time = this.detailData.startTime.replace(/\-/g, '\.')+'-'+this.detailData.startTime.replace(/\-/g, '\.')
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
      font-weight: 700;
      font-size: 16px;
      font-size: 16px;
      line-height: 44px;
      position: fixed;
      top: 0;
      z-index: 99;
      .van-nav-bar {
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
      background: white;
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
        padding: 8px 14px 0;
        font-size: 12px;
        background: white;
        li {
          margin-top: 15px;
          width: 100%;
          overflow: hidden;
          white-space: normal;
          text-overflow: ellipsis;
        }
        .li-title {
          color: #2C2C2C;
          font-size: 14px;
          font-weight: 600;
        }
        .li1 {
          display: flex;
          justify-content: space-between;
          &-text {
            font-size: 14px;
            font-weight: 600;
            span {
              width: auto;
              height: 20px;
              background: #8FCD71;
              font-size: 10px;
              text-align: center;
              border-radius: 10px;
              margin-right: 6px;
              padding: 0 6px;
              color: white;
            }
          }
          .li1-d2 {
            color: #DA1111;
            font-size: 14px;
          }
        }
        .li2 {
          display: flex;
          justify-content: space-between;
          margin: 13px 0;
        }
        li img {
          width: 16px;
          height: 14px;
          margin-right: 10px;
        }
        .li3 {
          font-weight: 100;
          color: #999999;
          span {
            color: #22AC38;
          }
        }
        .li4 {
          color: #999999;
        }
        .li5 {
          color: #999999;
          img {
            margin-right: 13px;
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
          overflow-x: auto;
          text-align: center;
          white-space:nowrap;
          &-list {
            display: inline-block;
            width: 120px;
            height: 160px;
            margin: 30px 20px 0;
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
        .messagedetail-main-proper-show::-webkit-scrollbar{  //去除滚动条
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
          span {
            height: auto;
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