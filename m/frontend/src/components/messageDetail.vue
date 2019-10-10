<template>
  <div class="messagedetail">
    <header>课程详情</header>
    <main class="messagedetail-main">
      <section>
        <img src="https://api.yujiacun.net/uploads/default-train-banner.png">
      </section>
      <ul  class="messagedetail-main-title">
        <li class="li1">
          <div class="li1-text">空中瑜伽</div>
          <div><span><img src="../../static/img/eye.png">220</span><span><img src="../../static/img/hand.png" class="hand">550</span></div>
        </li>
        <li class="li2">
          <div>空中瑜伽</div>
          <div>￥4880.00</div>
        </li>
        <li class="li3">培训老师： ivav</li>
        <li class="li4">
          <p>培训时间</p>
          <div>2019.05.20-2019.06.20</div>
        </li>
        <li class="li5">
          <p>培训地址</p>
          <div>成都市锦江区双桂路泰合财富中心7栋二单元302</div>
        </li>
      </ul>
      <div class="messagedetail-main-proper">
        <div class="messagedetail-main-proper-title">
          <h6>适宜人群</h6>
          <span>Suitable crowd</span>
        </div>
        <div class="messagedetail-main-proper-show">
          <swiper :options="swiperOption" slideToClickedSlide="true">
            <swiper-slide>
              <div class="messagedetail-main-proper-show-list">
                <div class="list-img"><img src="https://api.yujiacun.net/uploads/base64img/20190909/ad6b4a1e692e1a3ef5ac7b67b0f4744c.jpeg"></div>
                <div class="list-text">有专业瑜伽会员课程1年以上的 瑜伽爱好者，及舞蹈爱好者。</div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="messagedetail-main-proper-show-list">
                <div class="list-img"><img src="https://api.yujiacun.net/uploads/base64img/20190909/ad6b4a1e692e1a3ef5ac7b67b0f4744c.jpeg"></div>
                <div class="list-text">有专业瑜伽会员课程1年以上的 瑜伽爱好者，及舞蹈爱好者。</div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="messagedetail-main-proper-show-list">
                <div class="list-img"><img src="https://api.yujiacun.net/uploads/default-hot-train-cover.png"></div>
                <div class="list-text">有专业瑜伽会员课程1年以上的 瑜伽爱好者，及舞蹈爱好者。</div>
              </div>
            </swiper-slide>
          </swiper>
        </div>

        <!-- 

          <div class="messagedetail-main-proper-show-list">
            <div class="list-img"><img src="https://api.yujiacun.net/uploads/default-hot-train-cover.png"></div>
            <div class="list-text">有专业瑜伽会员课程1年以上的 瑜伽爱好者，及舞蹈爱好者。</div>
          </div>
          <div class="messagedetail-main-proper-show-list">
            <div class="list-img"><img src="https://api.yujiacun.net/uploads/default-hot-train-cover.png"></div>
            <div class="list-text">有专业瑜伽会员课程1年以上的 瑜伽爱好者，及舞蹈爱好者。</div>
          </div>
        </div> -->
      </div>
      <div class="messagedetail-main-teach">
        <div class="messagedetail-main-teach-title">
          <h6>适宜人群</h6>
          <span>Suitable crowd</span>
        </div>
        <div class="messagedetail-main-teach-box">
          <img src=""> 一 空中瑜伽设备的介绍和选择 空中课程的注意事项和会员反应的应对 空中瑜伽的热身体式 空中瑜伽的五大原则  二 1.握姿体系 
          <!-- <div class="messagedetail-main-teach-box-text">
          </div> -->
        </div>
      </div>
    </main>

  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import '../dist/swiper.css'
export default {
  data () {
    return {
      messageDetailLists: [],
      swiperOption: {
          slidesPerView: 3,
          spaceBetween: 30,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  created() {
    this.getmessageDetail()
  },
  mounted () {
  },
  methods: {
    getmessageDetail() {
      console.log(11)
      this.$request.get('trains').then((res) => {
        console.log(res)
      })
    },
    // // 实现滑动效果


  }
}
</script>

<style lang="scss" scope>
  .messagedetail {
    width: 100%;
    height: 100%;
    header {
      height: 35px;
      text-align: center;
      background: #EEEEEE;
      font-size: 16px;
      line-height: 35px;
    }
    &-main {
      background: #EEEEEE;
      section {
        width: 100%;
        height: 200px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &-title {
        width: 100%;
        height: 208px;
        padding: 8px 16px;
        font-size: 12px;
        background: white;
        li {
          margin-top: 9px;
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
        }
        .li3 {
          font-weight: 100;
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
          border-bottom: 1px solid black;
          margin: 0 auto;
          h6 {
            display: block;
            padding-top: 15px;
          }
        }
        &-show {
          height: 200px;
          display: flex;
          max-width: 100%;
          overflow-x: auto;
          &-list {
            width: 120px;
            height: 160px;
            margin-right: 20px;
            .list-img {
              width: 120px;
              height: 120px;
              img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
            .list-text {
              margin-top: 10px;
              width: 90%;
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
        overflow: hidden;
        &-title {
          height: 55px;
          width: 91%;
          border-bottom: 1px solid black;
          margin: 0 auto;
          h6 {
            display: block;
            padding-top: 15px;
          }
        }
        &-box {
          padding: 0 16px;
          max-height: 300px;
          margin-top: 10px;
          img {
            width: 134px;
            height: 165px;
            float: left;
          }
        }
      }
    }

  }
</style>