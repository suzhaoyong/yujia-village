<template>
  <div style="background:#eee;;">
    <el-row>
      <el-col :span="24">
        <div class="detail-main">
          <session-title name="课程介绍" brief="Sometimes beauty is so simple"></session-title>
          <div class="detail-count-div2">
            <div class="count-div2-img" style="cursor: pointer;">
              <img
                @click="train.teacher_img = item.path"
                v-for="(item, index) in train.train_image"
                :key="index"
                class="img1"
                :src="item.path"
              />
            </div>
            <div class="count-div2-imgpic">
              <img class="img1" :src="train.teacher_img" />
            </div>
            <div class="count-div2-text">
              <h4>{{train.theme}}</h4>
              <h4>￥{{train.price}}</h4>
              <div class="rate-nandu">
                <span class="rate-nandu-span">难度级别：</span>
                <el-rate :colors="['#58B708','#58B708','#58B708']" disabled :value="train.diff"></el-rate>
              </div>
              <div class="cultivate">
                培训老师：
                <span class="cultivate-span">{{train.name}}</span>
              </div>
              <div class="cultivate-text1">培训时间：{{train.startTime}} / {{train.endTime}}</div>
              <div class="cultivate-text2">培训地址：{{train.address}}</div>
              <!-- <div class="cultivate-button">

                <div class="button" @click="callTel">电话咨询</div>

              </div> -->
              <div style="display: flex;justify-content: flex-start;" v-if="config.url" class="count-div2-text-share">
                <share :config="config"></share>
              </div>
              <!-- <img class="imgpic1" src="../../assets/image69.png" /> -->
              <!-- <img class="imgpic2" src="../../assets/image70.png" /> -->
            </div>
            <div class="count-div2-fixdbg">
              
              <ul class="count-div2-fixdbg-ul">
                <li><a href="javascript:;"><img src="/static/img/报名.png" title="我想学" @click="IwantToStudy"></a></li>
                <li @click="callTel"><a href="javascript:;"><img src="/static/img/电话 (2).png" title="咨询电话"></a></li>
              </ul>
            </div>
          </div>
          <div class="detail-count-div3">
            <session-title name="适宜人群" brief="Sometimes beauty is so simple"></session-title>
            <div class="div3-crowd">
              <div class="div3-crowd-li" v-for="(item, index) in train.crowd" :key="index">
                <h5>Easy to navigate</h5>
                <img v-if="index%3 == 1" :src="icon.crowd_img_1" />
                <img v-if="index%3 == 2" :src="icon.crowd_img_2" />
                <img v-if="index%3 == 0" :src="icon.crowd_img_3" />
                <p>{{item}}</p>
              </div>
            </div>
          </div>
          <div class="detail-count-div4">
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
import { getFollowTrain } from '/src/api/personal'
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
      value2: 4,
      train: {}
    };
  },
  mounted() {
    const { id } = this.$route.params;
    getTrainsById(id)
      .then(data => {
        this.train = data;
        // const content = data.content.split("\n").filter(item => item);
        const crowd = data.crowd.split(/；/).filter(item => item);
        // this.train.content = content;
        this.train.crowd = crowd;
      })
      .then(_ => {
        this.initSocialConfig();
      });
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    IwantToStudy (id) {
      if (false) {
        Bus.$emit("login", true);
        return;
      } else {
        getFollowTrain(id).then((data) => {
          this.$message({type: 'success', message: '成功'})
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
.detail-main {
  width: 60rem;
  height: 100%;
  background-color: #eeeeee;
  margin: 0 auto;
  overflow: hidden;
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
    .count-div2-img {
      width: 5.8rem;
      margin-left: 4rem;
      // height: 6.3rem;
      overflow-y: scroll;
      height: 14rem;
      margin-top: 3rem;
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
      width: 18rem;
      margin-left: 1.5rem;
      margin-top: 1rem;
      height: 20rem;
      .img1 {
        width: 100%;
        height: 100%;
      }
    }
    .count-div2-text {
      width: 20rem;
      margin-left: 4rem;
      // height: 20rem;
      margin-top: 3rem;
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

        margin-top: 1.5rem;
      }
      .cultivate-text2 {
        color: #2c2c2c;

        margin-top: 1.5rem;
      }
      // .cultivate-button {
      //   width: 7.4rem;
      //   height: 3rem;
      //   background: rgba(49, 49, 49, 1);
      //   border-radius: 5px;
      //   line-height: 3rem;
      //   margin-top: 1.4rem;
      //   text-align: center;
      //   .button {
      //     color: #ffffff;
      //     cursor: pointer;
      //   }
      // }
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
      &-share {
        position: relative;
        left: -6px;
        bottom: -43px;

      }
    }
    .count-div2-fixdbg {
      background: url('/static/img/圆角矩形 1 拷贝.png') no-repeat;
      position: fixed;
      z-index: 1;
      right: 23.33rem;
      top: 345px;
      &-ul {
        width: 100%;
        height: 80px;
        list-style: none;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        position: relative;
        left: -33px;
        top: 15px;
        li {
          width: 100%; 
          height: 28px;
        }
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
