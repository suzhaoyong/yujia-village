<template>
  <div class="messagedetail">
    <van-nav-bar title="课程详情" left-arrow @click-left="goback">
      <van-icon slot="right" name="star-o" @click="study(detailData.id)"></van-icon>
      <van-icon slot="right" name="share" @click="shareMessage"></van-icon>
    </van-nav-bar>
    <main class="messagedetail-main" style="-webkit-overflow-scrolling:touch">
      <div class="banner-train-img">
        <img :src="detailData.train_image.length === 0 ? detailData.teacher_img : detailData.train_image[0].path" alt="" @click="showPic('banner')">
        <div v-if="detailData.train_image.length > 1" class="totle">共{{detailData.train_image.length}}张</div>
        <van-popup v-model="bannerShow" :overlay-style="{backgroundColor: '#000'}">
          <van-swipe indicator-color="white">
            <van-swipe-item v-for="(item,index) in detailData.train_old_image" :key="index">
              <img :src="item.url" alt="">
            </van-swipe-item>
          </van-swipe>
        </van-popup>
      </div>
      <!-- 分享 -->
      <van-popup class="fenxiang" v-model="show">
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
      <!-- 课程详情 -->
      <ul class="messagedetail-main-title">
        <li class="li-title">
          <img class="jifen" src="../../assets/img/jifen.png" alt="" v-if="train_discount.积分.length!==0"> {{ detailData.theme }}
        </li>
        <li class="li1">
          <div class="li1-text"><span>难度: {{ detailData.diff }}</span><span>观看: {{detailData.views}}</span><span>想学: {{ detailData.follow }}</span></div>
          <div class="li1-d2">￥{{ detailData.price }}</div>
        </li>
        <li class="li3"><img src="../../../static/img/teacher.png"> 培训老师： <span>{{ detailData.name }}</span></li>
        <li class="li4"><img src="../../../static/img/time.png"> 培训时间： <span>{{ time }}</span></li>
        <li class="li5"><img src="../../../static/img/adress.png">培训地址： <span>{{ detailData.address }}</span></li>
      </ul>
      <!-- 积分抵扣 -->
      <div class="integral" v-if="train_discount.积分.length!==0">
        <div class="box"> 
          <div v-for="(item,index) in train_discount.积分" :key="index">
            花费<span>{{item.consume}}</span> 积分，价格减免： <span>{{item.deduction}}</span> 元
          </div>
        </div>
      </div>
      <!-- 课程老师介绍 -->
      <div class="yoga-teacher">
        <div class="text"></div>
        <img class="flower" src="../../assets/img/flower.png" alt="">
        <div class="teacher">
          <div class="left-box">
            <img class="img" :src="detailData.teacher_img" alt="">
            <div class="bgc"></div>
          </div>
          <div class="right-box">
            <div class="name">{{detailData.name}}</div>
            <p class="intro" v-html="intro"></p>
          </div>
        </div>
      </div>
      <div class="outline">
        <div class="border-top"></div>
        <div class="border-left"></div>
        <div class="title"></div>
        <div class="kecheng">课程简介</div>
        <div class="outline-content" v-html="outline"></div>
      </div>
      <div class="suitable-crowd">
        <div class="header-title">
          <span>适合人群</span><span>SUITABLE CROWD</span> 
        </div>
        <ul class="list">
          <li v-for="(item,index) in crowds" :key="index">
            <div class="dot"></div>
            <div>{{item}}</div>
          </li>
        </ul>
      </div>
      <div class="past-train">
        <div class="header-title">
          <span>往期培训</span><span>PAST TARINING</span> 
        </div>
        <div class="past-train-img" v-if="detailData.train_old_image.length !== 0" >
          <img :src="detailData.train_old_image[0].url" alt="" @click="showPic">
          <div v-if="detailData.train_old_image.length > 1" class="totle">共{{detailData.train_old_image.length}}张</div>
          <van-popup v-model="imgShow" :overlay-style="{backgroundColor: '#000'}">
            <van-swipe indicator-color="white">
              <van-swipe-item v-for="(item,index) in detailData.train_old_image" :key="index">
                <img :src="item.url" alt="">
              </van-swipe-item>
            </van-swipe>
          </van-popup>
        </div>
      </div>
      <div class="course-details">
        <div class="header-title">
          <span>课程详情</span><span>COURSE DETAILS</span> 
        </div>
        <div class="course-details-content" v-html="detailData.content"></div>
      </div>
    </main>
  <footer class="footer">
    <!-- <div @click="study(detailData.id)">我想学</div> -->
    <div @click="buyCourse">立即购买</div>
  </footer>
  </div>
</template>

<script>
import Vue from 'vue';
import '../../dist/swiper.css'
import { getFollowTrain } from '../../../api/personal'
import { mapGetters } from "vuex";

export default {
  data () {
    return {
      courseId: '',
      detailData: [],
      train_discount: [],
      crowds: [],
      intro: '',
      outline: '',
      bannerShow: false,
      imgShow: false,
      show: false,
      time: '',
      shareimg: '',
      crowdimg: [
        require('../../../static/img/image71.png'),
        require('../../../static/img/image72.png'),
        require('../../../static/img/image73.png'),
      ],
       // 是否展示文案
      wenanIsShow: false,
      // 文案数据
      wenanData: [],
      // 复制的内容
      copy_content: ''
    }
  },
  created() {
    this.courseId = this.$route.params.id;
    this.getmessageDetail(this.courseId);
  },
  mounted () {
  },
  computed: {
    ...mapGetters(["info", "isUserNeedLogin"]),
  },
  methods: {
    goback () {
      this.$router.replace('/yogamessage/list')
    },
    getmessageDetail(id) {
      this.$request.get('trains/' + id).then((res) => {
        this.detailData = res.train;
        this.train_discount = res.train_discount;
        this.time = this.detailData.startTime.replace(/\-/g, '\.')+'-'+this.detailData.startTime.replace(/\-/g, '\.');
        this.intro = this.detailData.intro.replace(/\r\n/g,'<br />');
        this.outline = this.detailData.outline.replace(/\r\n/g,'<br />');
        // 处理数据的分号，中英文区别
        const crowd = this.detailData.crowd.replace(/；/g, ';');
        this.crowds = crowd.split(";");
        this.crowds[this.crowds.length - 1]? this.crowds : this.crowds.pop();

      }) 
    },
    // 
    showPic(keyword) {
      if(keyword === 'banner') {
        this.bannerShow = true;
        return
      }
      if(this.detailData.train_old_image.length === 0) return 
      this.imgShow = true;
    },
    // 分享图片
    shareMessage() {
      if(this.isUserNeedLogin) {
        this.$router.push('/login')
        this.$toast('请登录')
        return;
      }
      this.show = true
      console.log(this.$route.params.id)
      var params = {
          id: this.$route.params.id,
          identity:'train',
          userId:  sessionStorage.getItem('user')? JSON.parse(sessionStorage.getItem('user')).id : '',
          responseType: 'arraybuffer'
      }
      this.$request.post(`/show/share/photo`,params).then(res => {
        console.log(res)
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
            this.$this.$toast("复制成功！");
        },
        onError:function(e){
            this.$this.$toast("复制失败！");
        },
    // 购买跳到支付页面
    buyCourse() {
      if(!window.sessionStorage.getItem('access')) {
        this.$this.$toast('请登录');
        this.$router.push('/login');
        return;
      }
      let courseParams = {
          id: this.courseId,
          courseName: this.detailData.theme,
          price: this.detailData.price,
          coursePic: this.detailData.train_image,
          train_discount: this.train_discount
      }
      // 通过路由传参，讲对象转化json格式，防止接收数据的页面刷新白屏
      courseParams = JSON.stringify(courseParams);
      this.$router.push({
        name: 'payorder',
        query: {
          courseParams
        }
      });
    },
    // 我想学的操作
    study(id) {
      console.log(id)
      if (!JSON.parse(sessionStorage.getItem("user"))) {
        this.$router.push('/login')
        this.$this.$toast('请登录')
        return;
      }
      this.wantStudy(id)
      return false;
    },
    wantStudy(id) {
      // 调用我想学接口
      getFollowTrain(id)
        .then(data => {
          // console.log(data)
          this.$this.$toast(data.msg);
        })
    },
  }
}
</script>

<style lang="scss" scope>
// 分享样式
.fenxiang {
  width: 100%;
  min-height: 80%;
  border-radius: 15px;
  .loading {
    width: 60px;
    height: 30px;
    margin: 49% auto;
  }
}

.sharepopup {
  width: 100%;
  z-index: 99 !important;
  .shareimg {
    height: 485px;
    margin: 0 auto;
    // margin-left: 27px;
  }
  .sharetext {
    // margin-top: -20px;
    text-align: center;
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
.messagedetail {
  width: 100%;
  height: 100%;
  position: relative;
  .van-nav-bar {
    position: fixed;
    top: 0;
    .van-icon {
      margin-left: 8px;
    }
    .van-icon:nth-child(1) {
      margin-bottom: 5px;
    }
  }
  &-main {
    width: 100%;
    height: auto;
    background: white;
    overflow-y: auto;
    margin-top: 46px;
    padding-bottom: 50px;
    -webkit-overflow-scrolling: touch;
    .banner-train-img {
      position: relative;
      width: 100%;
      .totle {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 2px 7px;
        border-radius: 10px;
        background-color: rgba(0,0,0,.3);
        font-size: 10px;
        color: #fff;
      }
      .van-popup {
        width: 100%;
        background-color: #000;
      }
      img {
        width: 100%;
      }
    }
    &-title {
        width: 100%;
        padding: 8px 14px 18px 14px;
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
          .jifen {
            width: 21px;
            height: 21px;
            margin-right: 7px;
            vertical-align: top;
          }
        }
        .li1 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          &-text {
            font-size: 14px;
            font-weight: 600;
            span {
              display: inline-block;
              background: #8FCD71;
              font-size: 10px;
              text-align: center;
              border-radius: 10px;
              margin-right: 6px;
              padding: 2px 10px;
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
    .integral {
        display: flex;
        justify-content: center;
        width: 343px;
        margin: 0 auto;
        margin-bottom: 18px;
        padding-bottom: 6px;
        background-color: #EFFAEA;
        border-radius: 12px;
        font-size: 12px;
        color: #999;
        .box {
          div { 
            margin-top: 6px; 
            span {
              color: #96C55B;
            }
          }
        }
    }
    .yoga-teacher {
        position: relative;
        height: 100px;
        padding: 0 16px;
        padding-top: 10px;
        margin-bottom: 190px;
        background-color: #EEE;
        .text {
          height: 24px;
          background: url('../../assets/img/yoga-text.png') no-repeat;
          background-size: cover;
        }
        .flower {
          position: absolute;
          top: 2px;
          right: 25px;
          z-index: 5;
          width: 138px;
          height: 48px;
        }
        .teacher {
          position: absolute;
          top: 38px;
          left: 16px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 343px;
          height: 221px;
          box-shadow:0px 3px 9px 1px rgba(4,0,0,0.21);
          border-radius:10px;
          background-color: #fff;
          .left-box {
            position: relative;
            width: 136px;
            height: 138px;
            .img {
              position: absolute;
              top: 0;
              left: 0;
              z-index: 2;
              width: 120px;
              height: 120px;
              box-shadow:0px 3px 9px 1px rgba(4,0,0,0.1);
            }
            .bgc {
              position: absolute;
              right: 0;
              bottom: 0;
              width: 128px;
              height: 122px;
              background-color: #eee;
            }
          }
          .right-box {
            width: 150px;
            .name {
              margin-bottom: 8px;
              font-size: 14px;
              font-weight: 600;
              text-align: center;
              color: #999;
              overflow: hidden;
              white-space: nowrap; 
              text-overflow:ellipsis;
            }
            .intro {
              font-size: 10px;
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 10; 
            }
          }
        }
    }
    .outline {
        position: relative;
        width: 343px;
        margin: 0 auto;
        margin-bottom: 22px;
        padding-right: 6px;
        padding-bottom: 45px; 
        border-right: 4px solid #eee;
        border-bottom: 4px solid #eee;
        .border-top {
          position: absolute;
          top: 0;
          right: 0;
          width: 215px;
          height: 4px;
          background-color: #eee;
        }
        .border-left {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 4px;
          height: 30px;
          background-color: #eee;
        }
        .title {
          width: 120px;
          height: 14px;
          background: url('../../assets/img/Teaching-program.png') no-repeat;
          background-size: cover;
        }
        .kecheng {
          margin-top: 6px;
          margin-bottom: 19px;
          font-size: 14px;
          font-weight: 600;
        }
        .outline-content {
          font-size: 11px;
        }
    }
    .suitable-crowd {
        padding: 18px 16px;
        background-color: #eee;
        .list {
          margin-top: 26px;
        }
        .list li {
          display: flex;
          line-height: 20px;
          font-size: 11px;
          .dot {
            display: inline-block;
            width: 6px;
            height: 6px;
            margin-top: 7px;
            margin-right: 5px;
            border-radius: 3px;
            background-color: #7BBB62;
          }
        }
    }
    // 头部样式
    .header-title {
        padding-left: 5px; 
        font-size: 14px;
        border-left: 5px solid #A6C481;
        span:nth-child(1) {
          font-weight: 600;
        }
        span:nth-child(2) {
          margin-left: 8px;
          color: #999;
          font-size: 10px;
        }
    }
    .past-train {
        width: 343px;
        margin: 25px auto;
        &-img {
          position: relative;
          margin-top: 14px;
          width: 100%;
          .totle {
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 2px 7px;
            border-radius: 10px;
            background-color: rgba(0,0,0,.3);
            font-size: 10px;
            color: #fff;
          }
          .van-popup {
            width: 100%;
            background-color: #000;
          }
          img {
            width: 100%;
          }
        }
    }
    .course-details {
      width: 343px;
      margin: 0 auto;
      &-content {
        margin-top: 16px;
        font-size: 11px;
      }
    }
  }
  .footer {
      display: flex;
      width: 100%;
      height: 49px;
      position: fixed;
      bottom: 0;
      z-index: 10;
      line-height: 49px;
      background: #7BBB62;
      text-align: center;
      font-size: 14px;
      font-weight: 600;
      color: white;
      div {
        flex: 1;
        height: 100%;
      }
  }
}
</style>