<template>
    <div>
        <div class="details_main">
            <van-nav-bar title="名师详情" left-arrow @click-left="goback" fixed>
                <div class="share_img" slot="right" @click="handleShareGoods">
                    <img class="share" src="../../assets/teacherclub/share.png" />
                </div>
            </van-nav-bar>
            <div class="details_head">
                <div class="count-img">
                    <div class="count-name">
                        <span class="span1">瑜伽名师<span class="span2">-{{teacher.name}}</span></span>
                    </div>
                    <div class="count-imgpic">
                      <img :src="teacher.cover" class="count-name-img" :alt="teacher.name"/>
                    </div>
                </div>
            </div>
            <div class="details_center">
                <div class="yogofigcaption-title">
                    <h2>个人简介</h2>
                    <p class="p1">Good at courses</p>
                    <div class="p2">擅长课程：<div style="width: 81%;line-height: 20px;">{{teacher.good_at}}</div></div>
                    <div class="p3">课程特色：<div style="width: 81%;line-height: 20px;" v-html="teacher.content">{{teacher.content}}</div></div>
                </div>
            </div>
            <div class="details_foot">
                <div class="foot_exhibition">
                    <div class="foot_exhibition_page">
                        <img src="../../assets/teacherclub/yujia.png"/>
                        <span class="tips">名师个人SHOW</span>
                    </div>
                    <div class="foot_exhibition_staff">PERSONAL DISPLAY</div>
                </div>
                <div class="hot-swiper" v-if="footlist.length > 0">
                    <div class="swiper-container swiper1">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(item,index) in footlist" :key="index">
                                <div class="club_items_img">
                                    <img :src="item" class="list_foot_img" alt="名师个人show"/>
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>
                <div class="Default-page" v-else>
                    <span class="page-span">我寻寻觅觅却找不到您的踪迹~</span>
                </div>
            </div>
        </div>
        <van-popup v-model="show">
            <div v-show="!base64img" class="loading">
                <van-loading color="#7BBB62" size="24px" vertical>加载中...</van-loading>
            </div>
            <div v-show="base64img">
                <img :src="base64img"/>
                <div class="textbase">长按图片，保存或发送给朋友</div>
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
    </div>
</template>
<script>
import Vue from 'vue';
import Bus from "@/utils/Bus";
import { mapGetters } from "vuex"
import Swiper from 'swiper';

export default {
  data() {
    return {
        footlist:[],
        teacher:{},
        show: false,
        base64img:"",
         // 是否展示文案
            wenanIsShow: false,
            // 文案数据
            wenanData: [],
            // 复制的内容
            copy_content: ''
    };
  },
   computed: {
    ...mapGetters(["info","isUserNeedLogin"]),
  },
  created(){
      this.yogoteacherdata();
  },
  methods:{
      swiperInit() {
            new Swiper('.swiper1', {
                slidesPerView: 'auto',
                freeMode: true,
                observer: true,
            });
      },
       yogoteacherdata(){
        this.$request.get(`/teachers/${this.$route.query.id}`).then(res => {
            let { teacher,course} = res;
            this.footlist = res.teacher.teacher_img;
            this.teacher = res.teacher;
            this.teacherid = res.teacher.id;
            this.$nextTick(function() {
                this.swiperInit();
            })
        })
        .catch(error => {
            let { response: { data: { errorCode, msg } } } = error;
            if (errorCode != 0) {
            this.$message({
                message: msg,
                type: "error"
            });
            return;
            }
        });
      },
      // 分享商品
    handleShareGoods() {
    this.show = true;
    const params = {
        id:this.$route.query.id,
        identity:'teacher',
        userId: this.isUserNeedLogin ? "" : (this.info.user && this.info.user.id) || '',
        responseType: 'arraybuffer'
    }
    this.$request.post(`/show/share/photo`,params)
    .then(res => {
        this.base64img = res;
    })
    },
      goback() {
        this.$router.back('teacherClub/list');
      },
      // 获取文案
    getWenan() {
        this.wenanIsShow = true;
        this.$request.get('/personal/share/word/4').then(res => {
            this.wenanData = res;
        })
    },
    // 选中文案
    selectItem(copy_content) {
        this.copy_content = copy_content;
    },
    // 复制成功
    onCopy:function(e){
        this.$toast("复制成功！");
    },
    onError:function(e){
        this.$toast("复制失败！");
    },
  }
};
</script>
<style lang="scss" scope>
.van-nav-bar .van-icon {
    vertical-align: middle;
}
.van-nav-bar--fixed{
    position: fixed!important;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99 !important;
}
.share_img{
    line-height: 0px;
    margin-top: -34px;
  .share{
      width: 22px;
      height: 22px;
  }
  }
  .van-popup--center{
      width: 100%;
      height: 90%;
      border-radius: 15px;
        .loading {
            width: 60px;
            height: 30px;
            margin: 52% auto;
        }
      img {
          width: 100%;
      }
  }
  .textbase{
      width: 100%;
      height: 60px;
      background: #fff;
      font-size: 12px;
      color: #2c2c2c;
      text-align: center;
      line-height: 50px;
  }
   .bgc {
        width: 100%;
        height: 58px;
        background-color: #fff;
        text-align: center;
        img {
            width: 79px;
            height: 58px;
            vertical-align: top;
        }
    }
.details_main{
    width: 100%;
    height: 100%;
    display: inline-block;
    background: #fff !important;
    .details_head{
        width: 100%;
        height: 210px;
        background-color: #3E3E3E;
        background-image: url('../../assets/teacherclub/bg2.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-top: 46px;
        .count-img{
            width: 93%;
            height: 100%;
            position: relative;
            margin: 0 auto;
            .count-name{
                width: 48%;
                margin: 0 auto;
                border: 2px solid transparent;
                height: auto;
                position: absolute;
                bottom: 7%;
                left: 0%;
                transition: all .9s;
                line-height: 15px;
                padding-bottom: 5px;
                text-align: center;
                border-image:linear-gradient(to left,#43516A,#AE8D66) 1 10;
                .span1{
                    font-size:12px;
                    font-family:Gulim;
                    font-weight:400;
                    font-style:italic;
                    color: #43516A;
                    .span2{
                        font-size:12px;
                        font-family:Gulim;
                        font-weight:400;
                        font-style:italic;
                        color: #43516A;
                    }
                }
            }
            .count-imgpic{
                width: 98px;
                height: 98px;
                position: absolute;
                top: 10%;
                left: 19%;
                background-image: url('../../assets/teacherclub/bgimg22.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;
                .count-name-img{
                    width: 73px;
                    height: 71px;
                    position: absolute;
                    top: 8%;
                    left: 11%;
                    object-fit: cover;
                }
            }
        }
    }
    .details_center{
        width: 100%;
        height: auto;
        background-color: #3E3E3E;
        background-image: url('../../assets/teacherclub/bg1.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        display: flex;
        .yogofigcaption-title{
                width: 93%;
                height: 100%;
                margin: 0 auto;
                margin-bottom: 10px;
                margin-top: 10px;
               h2{
                    font-size:16px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    color: #fff;
                    margin-top: 3%;
               }
               .p1{
                   color: #fff;
                   font-size: 14px;
                   font-family:Myriad Pro;
                   font-weight:400;
               }
               .p2{
                   color: #fff;
                   font-size: 10px;
                   font-family:Microsoft YaHei;
                   margin-top: 6%;
                   font-weight:400;
                   margin-bottom: 7px;
                   display: flex;
               }
               .p3{
                   color: #fff;
                   font-size: 10px;
                   font-family:Microsoft YaHei;
                   font-weight:400;
                   display: flex;
               }
           }
    }
    .details_foot{
        width: 100%;
        height: auto;
        background-color: #3E3E3E;
        background-image: url('../../assets/teacherclub/bg3.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        display: inline-block;
        .foot_exhibition{
            width: 93%;
            height: 60px;
            margin: 0 auto;
            margin-top: 30px;
            .foot_exhibition_page{
                display: flex;
                margin-top: 15px;
                img{
                    width: 13px;
                    height: 15px;
                    display: block;
                    margin-top: 5px;
                }
                .tips{
                    font-size:16px;
                    font-family:PingFang SC;
                    font-weight:bold;
                    color:#65627D;
                    padding-left: 6px;
                }
            }
            .foot_exhibition_staff{
                font-size:12px;
                font-family:PingFang SC;
                font-weight:400;
                color:rgba(44,44,44,1);
                padding-top: 5px;
            }
        }
        .hot-swiper {
        padding: 5px 0 23px 16px;
        .swiper-slide {
            width: 214px;
            height: 270px;
            margin-right: 11px;
            .club_items_img{
                width: 100%;
                height:270px;
                background-color: #E5E5E5;
                border-radius: 4px;
                .list_foot_img{
                    width: 100%;
                    height: 100%;
                    display: block;
                    object-fit: cover;
                    border-radius: 4px;
                }
            }
        }
    }
        .Default-page{
            width: 100%;
            height: 100px;
            margin: 0 auto;
            text-align: center;
            line-height: 60px;
            .page-span{
                font-size:12px;
                font-family:PingFang SC;
                font-weight:500;
                color: #999;
            }
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
