<template>
  <div style="background:#fff;;">
    <el-row>
      <el-col :span="24">
        <div class="detail-main">
          <!-- <session-title name="课程介绍" brief="Sometimes beauty is so simple"></session-title> -->
          <div class="navs">
                <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/cultivate/index' }">培训信息</el-breadcrumb-item>
                <el-breadcrumb-item>{{this.themes}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
          <div class="detail-count-div2">
            <div  v-if="train.train_image && train.train_image.length > 0" :class="`${train.train_image && train.train_image.length > 0 ? 'count-div2-img scorll' : 'count-div2-img'}`" style="cursor: pointer;">
              <img
                @click="changeTrainImage(item)"
                v-for="(item, index) in train.train_image"
                :key="index"
                class="img1"
                :src="item.path"
              />
            </div>
            <div class="count-div2-imgpic">
              <img class="img1" :src="train.themeImg" :alt="train.theme"/>
            </div>
            <div class="count-div2-text">
              <h4><span class="jifen" v-if="isJifen">积</span>{{train.theme}}</h4>
              <div class="jifen_tips" v-if="isJifen">【积分可兑换该课程或减免课程费用】</div>
              <div class="kecheng_box">
                <div class="kecheng_lf">
                  <div class="kecheng_item" style="padding-bottom:0.95rem;">
                  <span class="kecheng_title">难度级别：</span>
                  <div class="kecheng_value"><el-rate :colors="['#58B708','#58B708','#58B708']" disabled :value="train.diff"></el-rate></div>
                  </div>
                  <div class="kecheng_item">
                  <span class="kecheng_title" style="font-size: 0.7rem;font-weight: bolder;">培训老师：</span>
                  <div class="kecheng_value"  style="font-size: 0.7rem;font-weight: bolder;">{{train.name}}</div>
                  </div>
                </div>
                <div class="kecheng_rh">
                  <div class="kecheng_price" style="padding-bottom:0.95rem;">￥{{train.price > 0 ? train.price: '0.00'}}</div>
                  <div class="kecheng_change"  style="font-size: 0.7rem;font-weight: bolder;color:#999999;" v-if="isJifen">
                    <div style="margin-bottom: 0.3rem;" v-for="(item, index) in train_discount['积分']" :key="index"><span>{{item.consume}}</span> {{item.type}}，课程仅需 <span>{{getCountPrice(item)}}</span> 元</div>
                  </div>
                </div>
              </div>
              <div class="cultivate-text1">培训时间：<span style="font-size: 0.8rem;font-weight: bolder;">{{train.startTime}} / {{train.endTime}}</span></div>
              <div class="cultivate-text2">培训地址：{{train.address}}</div>
              <div class="cultivate-button">
                <div class="button" @click="buyTrain">立即购买</div>
              </div>
              <div style="display: flex;justify-content: flex-start;" v-if="config.url" class="count-div2-text-share">
                <div style="width: 1rem; height: 1rem;position: absolute;right: 0.8rem;bottom: 0.8rem; cursor: pointer;"><img style="object-fit: contain;" src="~@/assets/green_up.png" alt=""></div>
                  <share :config="config"></share>
                </div>
              <!-- <img class="imgpic1" src="../../assets/image69.png" /> -->
              <!-- <img class="imgpic2" src="../../assets/image70.png" /> -->
            </div>
            <div class="count-div2-fixdbg">
              <!-- <ul class="count-div2-fixdbg-ul"> -->
                <li><a href="javascript:;"><img src="/static/img/apply.png" title="我想学" @click="wantToStudy(train.id)"></a></li>
                <li @click="callTel"><a href="javascript:;"><img src="/static/img/phone.png" title="咨询电话"></a></li>
              <!-- </ul> -->
            </div>
          </div>
          <div class="teacher-wrap">
            <div class="teacher-box">
              <div class="teacher-img">
                <div class="img">
                  <img style="width:100%;height:100%; position: relative;z-index: 10;object-fit: cover;" :src="train.teacher_img" :alt="train.theme"/>
                </div>
              </div>
              <div class="teacher-info">
                <div class="info">
                  <div class="name">授 课 老 师： {{train.name}}</div>
                  <div class="berif scorll">
                    <!-- <pre v-html="train.intro"></pre> -->
                    <div class="berif-line" style="margin-bottom:0.4em;" v-for="(item, index) in getIntroList" :key="index">{{item}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="teacher-program">
            <div class="program-title">
              课程大纲
            </div>
            <div class="program-content">
              <div class="program-bg"></div>
              <div class="program-html scorll">
                <div class="program-lint" v-for="(item, index) in getOutlineList" :key="index">{{item}}</div>
              </div>
            </div>
          </div>
          <div class="traning-wrap">
            <div class="traning">
              <div class="traning-content">
                <span class="traning-title">适合人群</span>
                <ul class="scorll">
                  <li style="line-height: 1.2rem;" v-for="(item, index) in getCrowdList" :key="index">
                    {{item}}
                  </li>
                </ul>
              </div>
              <div class="traning-img" :style="`background-image: url('${changedImg}')`">
              </div>
              <div class="change" :style="`transform: rotate(${360 * changeCount}deg);`" @click="changeImg"></div>
            </div>
          </div>
          <div class="course-detail">
            <div class="course-content" v-html="train.content"></div>
          </div>
          <div class="detail-count-div3" v-show="false">
            <session-title name="适宜人群" brief="Sometimes beauty is so simple"></session-title>
            <div class="div3-crowd">
              <div class="div3-crowd-li" v-for="(item, index) in train.crowd" :key="index">
                <h5>Easy to navigate</h5>
                <img v-if="index%3 == 1" :src="icon.crowd_img_1" alt="图片"/>
                <img v-if="index%3 == 2" :src="icon.crowd_img_2" alt="图片"/>
                <img v-if="index%3 == 0" :src="icon.crowd_img_3" alt="图片"/>
                <p>{{item}}</p>
              </div>
            </div>
          </div>
          <div class="detail-count-div4" v-show="false">
            <div class="count-div3-cumtrl2">
              <h2>
                <img src="../../assets/image74.png" />教学大纲
              </h2>
              <p class="nav-text">Sometimes beauty is so simple</p>
            </div>
            <div class="cumtrl2-text">
              <!-- <div v-for="(item, index) in train.content" :key="index">
                {{item}}
              </div> -->
              <div v-html="train.content">
              </div>
            </div>
            <img class="bg-picimg1" src="../../assets/image75.png" />
            <img class="bg-picimg2" src="../../assets/image76.png" />
            <img class="bg-picimg3" src="../../assets/image77.png" />
            <img class="bg-picimg4" src="../../assets/image78.png" />
            <h3 class="h3-bgpic">教学大纲</h3>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getTrains, postTrains, getTrainsById } from "@/api/trains";
import { getFollowTrain } from '@/api/personal'
import { mapGetters } from 'vuex'
import Bus from "@/utils/Bus"
import SessionTitle from "./SessionTitle";
import crowd_img_1 from "@/assets/image71.png";
import crowd_img_2 from "@/assets/image72.png";
import crowd_img_3 from "@/assets/image73.png";
export default {
  components: {
    SessionTitle
  },
  data() {
    return {
      config: {
        url: "",
        source: "",
        title: "",
        description: "",
        sites: ["qzone", "qq", "weibo", "wechat", "douban"],
        wechatQrcodeTitle: "微信扫一扫：分享", // 微信二维码提示文字
        wechatQrcodeHelper:
          "<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>"
      },
      icon: {
        crowd_img_1,
        crowd_img_2,
        crowd_img_3
      },
      changedImg: '',
      changeCount: 0,
      value2: 4,
      themes:'',
      train: {
        themeImg: ''
      },
      train_discount: {}
    };
  },
  mounted() {
    const { id } = this.$route.params;
    getTrainsById(id)
      .then(data => {
        const themeImg = data.train.train_image && data.train.train_image.length > 0 && data.train.train_image[0].path ? data.train.train_image[0].path : data.train.teacher_img 
        this.train = Object.assign({} ,data.train, {themeImg: themeImg});
        this.themes = data.train.theme;
        this.train_discount = data.train_discount
        this.changedImg = data.train.train_old_image[0] && data.train.train_old_image[0].url ||  data.train.teacher_img
      })
      .then(_ => {
        this.initSocialConfig();
      });
  },
  computed: {
    ...mapGetters(['info', 'isUserNeedLogin']),
    getCountPrice() {
      return (item) => {
        if(item.deduction > this.train.price) {
          return '0.00';
        }
        return (this.train.price - item.deduction).toFixed(2)
      }
    },
    isJifen() {
      return this.train_discount['积分'] && this.train_discount['积分'].length > 0
    },
    getCrowdList() {
      return  this.train.crowd && this.train.crowd.split(/[\；]/).filter(item => (item)) || []
    },
    getOutlineList() {
      return  this.train.outline && this.train.outline.split(/[\n|\r|\·]/).filter(item => (item)) || []
    },
    getIntroList() {
      return this.train.intro && this.train.intro.split(/[\n|\r|\·]/).filter(item => (item)) || []
    }
  },
  methods: {
    buyTrain() {
      if (this.isUserNeedLogin) {
        Bus.$emit('login', true);
        return;
      }
      const { id } = this.$route.params;
      this.$router.push(`/cultivate/order/${id}`)
    },
    changeTrainImage(item) {
      this.train.themeImg = item.path
    },
    changeImg() {
      this.changeCount += 1
      let rang_index = this.changeCount % this.train.train_old_image.length
      let img = this.train.train_old_image[rang_index]
      this.changedImg = img && img.url || this.train.teacher_img
    },
    wantToStudy () {
      const { id } = this.$route.params;
      if (this.isUserNeedLogin) {
        Bus.$emit("login", true);
        return;
      } else {
        getFollowTrain(id).then((data) => {
          this.$message({type: 'success', message: '提交成功'})
        })
      }
    },
    initSocialConfig() {
      const { theme, intro, content, teacher_img, crowd } = this.train;
      const params = {
        url: `http://www.yujiacun.net/cultivate/detail/${this.$route.params.id}`,
        title: theme,
        description: `适合人群：${crowd}`,
        image: teacher_img
      };
      this.config = Object.assign({}, this.config, params);
    },
    callTel() {
      this.$alert(`客服电话: 400-100-7191`, "客服电话", {});
    }
  }
};
</script>
<style scoped>
.detail-main >>> .el-rate__icon {
  font-size: 0.7rem !important;
  -webkit-text-stroke: 1px #22cc22;
}
</style>
<style lang="scss" scoped>
*{
  box-sizing: border-box;
}
.jifen{
  display: inline-block;
  width: 1.1rem;
  height: 1.1rem;
  margin-right: 1em;
  border-radius: 50%;
  border: 1px solid #96C55B;
  color:#96C55B;
  font-size: 14px;
  text-align: center;
  padding: 0.1rem;
}
.jifen_tips{
  color: #999;
}
.kecheng_box{
  margin-top: 1.55rem;
  display: flex;
  background: #eee;
  margin-left: -2.7rem;
  padding: 1.3rem 2.7rem;
  padding-bottom: 0.6rem;
  .kecheng_lf{
    flex-basis: 50%;
    .kecheng_item{
      display: flex;
      .kecheng_title{}
      .kecheng_value{}
    }
  }
  .kecheng_rh{
    .kecheng_price{
      font-weight: bolder;
      font-size: 0.9rem;
    }
    .kecheng_change{
      span{
        color: #96C55B;
      }
    }
  }
}
.teacher-wrap {
  background: #fff;
  padding-top: 2rem;
  .teacher-box{
    width: 50rem;
    height: 29.3rem;
    margin: 0 auto;
    // background: #eee;
    display: flex;
    justify-content: space-between;
    background-image: url('~@/assets/trains/teacher.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 1rem;
    position: relative;
    &::after {
        content: '';
        display: block;
        width: 90%;
        height: 3rem;
        position: absolute;
        top: -2.4rem;
        left: 50%;
        transform: translate(-50%, 0);
        background-image: url('~@/assets/trains/text.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    .teacher-img{
      .img{
        width: 21.8rem;
        height: 21.8rem;
        background: #ccc;
        position: relative;
        left: -2.5rem;
        top: 5.5rem;
        position: relative;
        z-index: 10;
        &::after {
          content: 'Yoga teacher';
          text-align: right;
          width: 22rem;
          word-break: keep-all;
          word-wrap: break-word;
          white-space: pre-wrap;
          text-transform : uppercase;
          font-weight: bolder;
          font-size: 2rem;
          display: block;
          padding-top: 3rem;
          padding-right: 1rem;
          padding: 3rem 1rem 4rem 4rem;
          color: #D9D9D9;
          background: #EEEEEE;
          position: absolute;
          bottom: 6rem;
          left: 11.5rem;
          z-index: 1;
          transform: rotate(90deg);
        }
      }
    }
    .teacher-info{
      flex-grow: 1;
      height: 100%;
      .info{
        height: 24rem;
        .name{
          height: 4.5rem;
          // line-height: 4.5rem;
          font-size: 1rem;
          font-weight: bolder;
          text-align: center;
          padding-top: 1.4rem;
          background: #B9D19C;
          background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(185,209,156,1) 100%);
          position: relative;
          &::after {
            content: '';
            display: block;
            width: 16rem;
            height: 4rem;
            position: absolute;
            top: -3rem;
            left: 50%;
            transform: translate(-50%, 0);
            background-image: url('~@/assets/trains/leaf.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
          }
        }
        .berif{
          
          font-size: 0.7rem;
          height: calc(100% - 2rem);
          width: 100%;
          text-align: center;
          padding: 1rem;
          box-sizing: border-box;
          padding-left: 5rem;
          display: -webkit-box !important;
          -webkit-box-orient: vertical !important;
          // -webkit-line-clamp:3 !important;// 限制快级元素的文本行数
          overflow-y: auto;
          overflow-x: hidden;
          /* 设置滚动条的样式 */
          &.scorll::-webkit-scrollbar {
            width: 0.1rem;
          }
          /* 滚动槽 */
          &.scorll::-webkit-scrollbar-track {
            background: #dcdcdc;
            border-radius: 0.15rem;
          }
          /* 滚动条滑块 */
          &.scorll::-webkit-scrollbar-thumb {
            background: #88bc37;
            border-radius: 0.15rem;
          }
          &.scorll::-webkit-scrollbar-thumb {
            background: #88bc37;
          }
          .berif-line {
            font-size: 0.85rem
          }
        }
      }
    }
  }
}
.teacher-program{
  padding-top: 4rem;
  background: #fff;
  .program-title{
    margin-left: 5rem;
    position: relative;
    &::after{
      content:'Teaching program';
      position: absolute;
      bottom: 100%;
      left: 0;
      text-transform : uppercase;
      font-size: 1.4rem;
      font-weight: bolder;
      letter-spacing: -2px;
    }
  }
  .program-content{
    margin-left: 15rem;
    width: 40rem;
    min-height: 17rem;
    height: 22rem;
    // overflow-y: auto;
    // overflow-x: hidden;
    border-top:10px solid #EEEEEE;
    
    position: relative;
    &::before{
      content: '';
      width: 1px;
      height: 3.5rem;
      background: #BFBFBF;
      position: absolute;
      top: 0;
      left: -5rem;
    }
    .program-bg{
      content: '';
      width: 15rem;
      height: 19rem;
      position: absolute;
      top: -3.4rem;
      // left: 100%;
      right: -2rem;
      background-image: url('~@/assets/trains/jiaoxue.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .program-html{
      padding-top: 1rem;
      margin-right: 11rem;
      font-size: 0.7rem;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      /* 设置滚动条的样式 */
      &.scorll::-webkit-scrollbar {
        width: 0.1rem;
      }
      /* 滚动槽 */
      &.scorll::-webkit-scrollbar-track {
        background: #dcdcdc;
        border-radius: 0.15rem;
      }
      /* 滚动条滑块 */
      &.scorll::-webkit-scrollbar-thumb {
        background: #88bc37;
        border-radius: 0.15rem;
      }
      &.scorll::-webkit-scrollbar-thumb {
        background: #88bc37;
      }
    }
  }
}
.course-detail{
  background: #fff;
  padding-top: 5rem;
  padding-bottom: 2rem;
  .course-content{
    width: 40rem;
    margin: 0 auto;
    padding: 1rem 4rem;
    padding-left: 8rem;
    background: #eee;
    position: relative;
    font-size: 0.7rem;
    &::before{
      content: '';
      width: 10rem;
      height: 13rem;
      position: absolute;
      top: -3.4rem;
      // left: 100%;
      left: -4rem;
      background-image: url('~@/assets/trains/course.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }
}
.traning-wrap{
  background: #fff;
  padding: 2rem 0;
  .traning{
    position: relative;
    width: 56rem;
    height: 33rem;
    margin: 0 auto;
    background-image: url('~@/assets/trains/traning.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .traning-title{
      position: relative;
      display: inline-block;
      margin-bottom: 3.4rem;
      margin-left: 1rem;
      font-weight: bolder;
      font-size: 1.3rem;
      font-family: 'MicrosoftYaHei';
      &::after{
        font-size: 0.7rem;
        content: 'suitable crowd';
        width: 10em;
        position: absolute;
        // top: 100%;
        bottom: -2em;
        left: 0;
        text-transform : uppercase;
      }
      
    }
    .traning-content{
      padding-top: 6rem;
      width: 14rem;
      height: 25rem;
      font-size: 0.7rem;
      margin-left: 9rem;
      // overflow: hidden;
      ul {
        height: calc(100% - 3rem);
        list-style-type: none;
        margin: 0;
        overflow-y: auto;
        overflow-x: hidden;
        /* 设置滚动条的样式 */
        &.scorll::-webkit-scrollbar {
          width: 0.1rem;
        }
        /* 滚动槽 */
        &.scorll::-webkit-scrollbar-track {
          background: #dcdcdc;
          border-radius: 0.15rem;
        }
        /* 滚动条滑块 */
        &.scorll::-webkit-scrollbar-thumb {
          background: #88bc37;
          border-radius: 0.15rem;
        }
        &.scorll::-webkit-scrollbar-thumb {
          background: #88bc37;
        }
      
        li{
          position: relative;
          display: block;
          &::before{
            content:'';
            width: 0.4rem;
            height: 0.4rem;
            background: #B4DC81;
            border-radius: 50%;
            position: absolute;
            left: -2em;
            top: 0.3rem;
            // transform: translateY(-100%);
          }
        }
      }
    }
    .traning-img{
      position: absolute;
      bottom: 5.2rem;
      right: 7.2rem;
      width: 15.6rem;
      height: 21.8rem;
      background-repeat: no-repeat;
      background-size: cover;
      transform: skewx(-10.5deg);
      transition: 1s all
    }
    .change{
      cursor: pointer;
      position: absolute;
      top: 50%;
      right: 0;
      width: 3rem;
      height: 3rem;
      background-image: url('~@/assets/trains/change.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      transform: rotate(360deg);
      transition: 1s all;
    }
  }
}
.detail-main {
  width: 60rem;
  height: 100%;
  background-color: #eeeeee;
  margin: 0 auto;
  padding: 2rem 0;
  background: #fff;
  overflow: hidden;
  .navs {
    width: 100%;
    margin: 0 auto;
    padding: 1rem 0rem 3rem 0rem;
    }
  .detail-count-div1 {
    width: 100%;
    height: 9.4rem;
    text-align: center;
    display: inline-block;
    position: relative;
    .border-left {
      width: 20%;
      height: 1px;
      background-color: #dcdcdc;
      position: absolute;
      top: 45%;
      left: 22%;
    }
    .border-right {
      width: 20%;
      height: 1px;
      background-color: #dcdcdc;
      position: absolute;
      right: 22%;
      top: 45%;
    }
    .nav-text {
      color: #999999;
      margin-top: -8px;
    }
    h2 {
      color: #2c2c2c;
      font-size: 24px;
      margin-top: 40px;
      img {
        width: 28px;
        height: 28px;
        position: absolute;
        left: 44%;
      }
    }
  }
  .detail-count-div2 {
    margin: 0 auto;
    // height: 30rem;
    background-color: #ffffff;
    overflow: hidden;
    display: flex;
    font-size: 0.7rem;
    padding-bottom: 4rem;
    position: relative;
    .count-div2-img {
      flex-shrink: 0;
      width: 5.8rem;
      margin-left: 4rem;
      // height: 6.3rem;
      overflow-y: auto;
      height: 14rem;
      margin-top: 3rem;
      /* 设置滚动条的样式 */
      &.scorll::-webkit-scrollbar {
        width: 0.1rem;
      }
      /* 滚动槽 */
      &.scorll::-webkit-scrollbar-track {
        background: #dcdcdc;
        border-radius: 0.15rem;
      }
      /* 滚动条滑块 */
      &.scorll::-webkit-scrollbar-thumb {
        background: #88bc37;
        border-radius: 0.15rem;
      }
      &.scorll::-webkit-scrollbar-thumb {
        background: #88bc37;
      }
      .img1 {
        width: 100%;
        // height: 100%;
        margin-bottom: 1rem;
        // margin-top: 3rem;
      }
      .img2 {
        width: 100%;
        height: 100%;
        margin-bottom: 1rem;
      }
      .img3 {
        width: 100%;
        height: 100%;
      }
    }
    .count-div2-imgpic {
      flex-shrink: 0;
      width: 20rem;
      margin-left: 1.5rem;
      margin-top: 1rem;
      height: 20rem;
      .img1 {
        width: 100%;
        height: 100%;
      }
    }
    .count-div2-text {
      // width: 20rem;
      // margin-left: 4rem;
      // height: 20rem;
      flex-grow: 1;
      padding-left: 2.7rem;
      margin-top: 2.4rem;
      position: relative;
      h4 {
        font-size: 18px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
      }
      .rate-nandu {
        display: flex;
        margin-top: 2rem;
        margin-bottom: 1rem;
        .rate-nandu-span {
          color: #2c2c2c;
        }
      }
      .cultivate {
        color: #2c2c2c;

        margin-top: 1.5rem;
        .cultivate-span {
          color: #22ac38;
        }
      }
      .cultivate-text1 {
        color: #2c2c2c;

        margin-top: 0.5rem;
      }
      .cultivate-text2 {
        color: #2c2c2c;

        margin-top: 0.5rem;
      }
      .cultivate-button {
        display: flex;
        position: absolute;
        bottom: 0;
        left: 2.7rem;
        font-size: 0.8rem;font-weight: bolder;
        .button {
          text-align: center;
          width: 5.4rem;
          height: 2rem;
          background: #B4DC81;
          border-radius: 5px;
          line-height: 2rem;
          color: #ffffff;
          cursor: pointer;
        }
        
      }
      .count-div2-text-share{
          position: absolute;
          bottom: 0;
          right: 1.7rem;
        }
      .imgpic1 {
        position: absolute;
        width: 11.1rem;
        height: 7.7rem;
        top: -30%;
        right: 10%;
      }
      .imgpic2 {
        position: absolute;
        top: -3%;
        right: -13%;
        width: 3.1rem;
        height: 3.4rem;
      }
    }
    .count-div2-fixdbg {
      position: absolute;
      z-index: 100;
      right: 0rem;
      top: 1rem;
      list-style: none;
      background: url('/static/img/rectangle.png') no-repeat;
      background-size: 100% 100%;
      // height: 80px;
      padding: 5px 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        li {
          width: 28px;
          margin: 0 auto; 
          height: 28px;
          display: inline-block;
          margin-top: 1rem;
        }
    }
  }
  .detail-count-div3 {
    // width: 75%;
    // margin: 0 auto;
    // height: 30.4rem;
    background-color: #ffffff;
    margin-top: 2rem;
    padding-top: 0.1rem;
    padding-bottom: 1rem;
    .count-div3-cumtrl {
      width: 100%;
      // height: 9.4rem;
      text-align: center;
      display: inline-block;
      position: relative;
      .border-left {
        width: 20%;
        height: 1px;
        background-color: #dcdcdc;
        position: absolute;
        top: 45%;
        left: 22%;
      }
      .border-right {
        width: 20%;
        height: 1px;
        background-color: #dcdcdc;
        position: absolute;
        right: 22%;
        top: 45%;
      }
      .nav-text {
        color: #999999;

        margin-top: -4px;
      }
      h2 {
        color: #2c2c2c;
        font-size: 24px;
        margin-top: 40px;
        img {
          width: 28px;
          height: 28px;
          position: absolute;
          left: 43%;
        }
      }
    }
    .div3-crowd {
      background: #fff;
      // width: 70%;
      margin: 0 auto;
      // height: 18rem;
      flex-wrap: wrap;
      max-height: 40rem;
      overflow-x: auto;
      display: flex;
      justify-content: space-around;
      /* 设置滚动条的样式 */
      &::-webkit-scrollbar {
        width: 0.1rem;
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
      .div3-crowd-li {
        flex-shrink: 0;
        flex-basis: 30%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        h5 {
          font-family: MicrosoftYaHei;
          font-weight: 400;
          width: 100%;
          color: #999999;
          text-align: center;
        }
        img {
          margin-top: 1.2rem;
          margin: 0 auto;
        }
        p {
          width: 100%;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: #2c2c2c;
          text-align: left;
          margin-top: 1.5rem;
        }
      }
    }
  }
  .detail-count-div4 {
    margin: 0 auto;
    min-height: 24rem;
    padding-bottom: 4rem;
    background-color: #ffffff;
    margin-top: 2rem;
    position: relative;
    margin-bottom: 6rem;
    .count-div3-cumtrl2 {
      width: 100%;
      height: 9.4rem;
      text-align: center;
      display: inline-block;
      position: relative;
      .nav-text {
        color: #999999;

        margin-top: 11px;
      }
      h2 {
        color: #2c2c2c;
        font-size: 24px;
        margin-top: 40px;
        img {
          width: 75px;
          height: 52px;
          position: absolute;
          left: 39%;
          top: 17%;
        }
      }
    }
    .cumtrl2-text {
      line-height: 1rem;
      margin-left: 16rem;
      width: 35rem;
      font-size: 0.7rem;
      p {
        color: #2c2c2c;
        // line-height: 0.3em;
        margin: 0;
      }
    }
    .bg-picimg1 {
      position: absolute;
      top: 4rem;
      left: 1rem;
      width: 15rem;
      z-index: 10;
      height: 20rem;
    }
    .bg-picimg2 {
      position: absolute;
      top: 0;
      left: 2rem;
      width: 10rem;
      height: 23rem;
    }
    .bg-picimg3 {
      position: absolute;
      right: 0%;
      top: 28%;
    }
    .bg-picimg4 {
      position: absolute;
      right: 0%;
      top: 0%;
      height: 24rem;
    }
    .h3-bgpic {
      z-index: 10;
      position: absolute;
      margin: 0 auto;
      width: 30px;
      line-height: 29px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      top: 8rem;
      left: 7rem;
      font-size: 1.3rem;
    }
  }
}
</style>
