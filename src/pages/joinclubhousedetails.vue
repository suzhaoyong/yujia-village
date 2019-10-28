<template>
    <div>
        <el-col :span="24">
            <div class="joinclubdetails-main">
                <div class="joinclubdetails-cont-div3">
                    <div class="joinclubdetails-div3-main">
                    <div class="joinclubdetails-left">
                        <div class="left1">
                            <h2><img src="../assets/yujia.png"/>机构环境</h2>
                            <p class="nav-text">Sometimes beauty is so simple</p>
                            <img src="../assets/image18.png" class="bg-image4"/>
                        </div>
                        <div class="left2" v-html="club.content">{{club.content}}</div>
                        <div class="left3">
                            <!-- 电话：{{club.club_tel}} -->
                        </div>
                        <div class="left4">
                            地址：{{club.club_address}}
                        </div>
                        <div class="share4" v-if="config.url">
                          <share :config="config"></share>
                       </div>
                    </div>
                    <div class="joinclubdetails-right">
                        <div class="imgpic">
                        <img :src="clubs[0]" class="img1" :alt="club.club_name"/>
                        <img :src="clubs[1]" class="img2" :alt="club.club_name"/>
                        </div>
                        <div class="imgpic1">
                        <img :src="clubs[2]" class="img3" :alt="club.club_name"/>
                        <img :src="clubs[3]" class="img4" :alt="club.club_name"/>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="joinclubdetails-cont-div4">
                    <h2><img src="../assets/yujia.png"/>馆内人员简介</h2>
                    <p class="nav-text">Sometimes beauty is so simple</p>
                    <div class="border-left"></div>
                    <div class="border-right"></div>
                </div>
                <div class="joinclubdetails-cont-div5" v-if="this.famousteach.length > 0">
                    <img src="../assets/image52.png" class="bg-image5"/>
                    <img src="../assets/image53.png" class="bg-image6"/>
                    <img src="../assets/image54.png" class="bg-image7"/>
                    <swiper class="carousel5" :options="swiperOption2" style="height:660px">
                        <swiper-slide class="carousel5-item" v-for="(page2,index) of pages2" :key="index">
                        <div class="carousel-explain2" v-for="item of page2" :key="item.id" @click="explain2swiper(item)">
                            <img :src="item.first_img" alt="头像"/>
                            <div class="explain2-div">
                                <h3>{{item.name}}</h3>
                                <span class="explain2-span2" v-html="item.good_at">{{item.good_at}}</span>
                            </div>
                        </div>
                        </swiper-slide>
                        <div class="swiper-pagination" slot="pagination"></div>
                    </swiper>
                    <img src="../assets/image55.png" class="bg-image8"/>
                </div>
                 <div class="Default-page6" v-else>
                    <div class="Default-main6">
                    <img src="../assets/default.png"/>
                    <span class="page-span6">我寻寻觅觅却找不到您的踪迹~</span>
                    </div>
                </div>
                <div class="joinclubdetails-cont-div1">
                    <h2><img src="../assets/yujia.png"/>机构课程</h2>
                    <p class="nav-text">Sometimes beauty is so simple</p>
                    <div class="border-left"></div>
                    <div class="border-right"></div>
                </div>
                <div class="joinclubdetails-cont-div2">
                    <el-col>
                    <div class="clubhouse" v-if="this.swiperList.length > 0">
                        <swiper :options="swiperOption" style="height:530px">
                            <swiper-slide v-for="(page,index) of pages" :key="index">
                                <div class="clubhouse-swiper" v-for="item of page" :key="item.id" @click="clubhouseItem(item)">
                                    <div class="clubhouse-swiper-img">
                                        <img :src="item.teacher_img" :alt="item.theme"/>
                                    </div>
                                    <div class="clubhouse-swiper-name">
                                        <p class="name-p1">{{item.theme}}<span class="name-span">{{item.name}}</span></p>
                                        <p class="name-p2">￥{{item.price}}</p>
                                    </div>
                                    <el-rate :value="item.diff" disabled disabled-void-color="#c0c4cc" :colors="['#58B708']"></el-rate>
                                    <p class="name-p3">电话:{{item.tel}}</p>
                                </div>
                            </swiper-slide>
                        </swiper>
                        <div class="swiper-button-prev1" slot="button-prev"></div>
                        <div class="swiper-button-next1" slot="button-next"></div>
                    </div>
                     <div class="Default-page5" v-else>
                        <div class="Default-main5">
                        <img src="../assets/default.png"/>
                        <span class="page-span5">我寻寻觅觅却找不到您的踪迹~</span>
                        </div>
                    </div>
                    </el-col>
                </div>
            </div>
        </el-col>
    </div>
</template>
<script>
import { getTrains, postTrains, getTrainsById } from "@/api/trains";
export default {
    inject: ["reload"],
  data() {
    return {
        club:{},
        clubs:{},
        swiperOption: {
          slidesPerView: 3,
          spaceBetween: 30,
          slidesPerGroup: 3,
          loop: true,
          loopFillGroupWithBlank: true,
          navigation: {
            nextEl: '.swiper-button-next1',
            prevEl: '.swiper-button-prev1'
          }
        },
        swiperOption2: {
          spaceBetween: 30,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          loop: true,
        },
        swiperList:[],
        famousteach:[],
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
    };
  },
  computed: {
      pages(){
        const pages = []; // pages是为二维数组
        this.swiperList.forEach((item, index) => {
          const page = Math.floor(index / 1); // page本质是0.1.2.3分别表示第1,2,3,4页
          if (!pages[page]) {
            pages[page] = [];
          }
          pages[page].push(item);
        });
        return pages;
      },
      pages2(){
        const pages2 = []; // pages是为二维数组
        this.famousteach.forEach((item, index) => {
          const page2 = Math.floor(index / 6); // page本质是0.1.2.3分别表示第1,2,3,4页
          if (!pages2[page2]) {
            pages2[page2] = [];
          }
          pages2[page2].push(item);
        });
        return pages2;
      }
  },
  created(){
      this.joindatalist();
  },
  methods:{
      joindatalist(){
        let _this = this;
        this.$request(`/clubs/${_this.$route.query.id}`).then(res => {
            let { club } = res;
            _this.club = club;
            _this.clubs = club.club_img;
            _this.famousteach = res.teacher;
            _this.swiperList= res.trains;
        })
        .then(_ => {
          this.initSocialConfig();
        });
      },
      initSocialConfig() {
        const { club_name, club_address, content, first_img } = this.club;
        const params = {
            url: `http://www.yujiacun.net/joinclubhouse/joinclubhousedetails?id=${this.$route.query.id}`,
            title: club_name,
            description: `${club_address}`,
            image: first_img
        };
        this.config = Object.assign({}, this.config, params);
        },
        callTel() {
            this.$alert(`客服电话: 400-100-7191`, "客服电话", {});
        },
      clubhouseItem(item){
          this.$router.push({
            path: `/cultivate/detail/${item.id}`,
        });
      },
      explain2swiper(item){
          this.$router.push({
            path: "/yogoteacher/yogoteacherdetails",
            query: {
            id: item.id
            }
        });
      }
  }
};
</script>
<style lang="scss" scoped>
.swiper-pagination-bullet-active {
    opacity: 1;
    background: #2c2c2c;
}
.swiper-pagination-bullet{
    width: 10px;
    height: 10px;
    border-radius: 50%;
}
.joinclubdetails-main{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    .joinclubdetails-cont-div1{
            width: 1200px;
            height: 150px;
            text-align: center;
            position: relative;
            margin-top: 20px;
            margin: 0 auto;
            .border-left{
                width: 20%;
                height: 1px;
                background-color: #dcdcdc;
                position: absolute;
                left:19%;
                top: 41%;
            }
            .border-right{
                width: 20%;
                height: 1px;
                background-color: #dcdcdc;
                position: absolute;
                right:19%;
                top: 41%;
            }
            .nav-text{
                color: #999999;
                font-size: 14px;
                margin-top: 8px;
            }
            h2{
                color: #2c2c2c;
                font-size: 1.4rem;
                margin-top: 40px;
                padding-top: 24px;
                font-family:Microsoft YaHei;
                font-weight:bold;
                img{
                    width: 28px;
                    height: 28px;
                    position: absolute;
                    left: 42%;
                    top: 18%;
                }
            }
        }
    .joinclubdetails-cont-div2{
        width: 100%;
        height: 600px;
        margin: 0 auto;
        margin-top: 40px;
        margin-bottom: 50px;
        .clubhouse{
            width: 1200px;
            height: 530px;
            margin: 0 auto;
            position: relative;
            cursor:pointer;
            .clubhouse-swiper{
                width: 370px;
                height: 500px;
                background:rgba(255,255,255,1);
                box-shadow:2px 3px 20px 1px rgba(164,164,164,0.26);
                border-radius:5px;
                margin-left: 5px;
                transition: all 1s;
                .clubhouse-swiper-img{
                    width: 100%;
                    height: 390px;
                    border-radius:5px 5px 0px 0px;
                    img{
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
                .clubhouse-swiper-name{
                    width: 90%;
                    height: 30px;
                    line-height: 16px;
                    display: flex;
                    margin: 0 auto;
                    justify-content: space-between;
                    margin-top: 20px;
                    .name-p1{
                        font-size: 20px;
                        color: #2c2c2c;
                        font-family:Source Han Sans CN;
                        font-weight:400;
                        .name-span{
                            font-size: 14px;
                            color: #2c2c2c;
                            margin-left: 16px;
                        }
                    }
                    .name-p2{
                        font-size:14px;
                        font-family:MicrosoftYaHei-Bold;
                        font-weight:bold;
                         color: #2c2c2c;
                         line-height: 25px;
                    }
                }
                .el-rate{
                    margin-left: 20px;
                }
                .name-p3{
                    width: 90%;
                    text-align: right;
                    margin: 0 auto;
                    font-size: 14px;
                    color: #2c2c2c;
                }
            }
            .clubhouse-swiper:hover{
                width: 370px;
                height: 500px;
                background:rgba(255,255,255,1);
                box-shadow:2px 3px 20px 1px rgba(164,164,164,0.26);
                border-radius:5px;
                margin-left: 5px;
                transform: scale(.98);
            }
            .swiper-button-prev1{
                    position: absolute;
                    left: -4%;
                    top: 36%;
                    width: 35px;
                    height: 35px;
                    border: 1px solid #e2dbc8;
                    border-radius: 50%;
                    z-index: 10;
                    background-size: 32px 35px;
                    transition: all .9s;
                    background-color: #fff;
                    background-image: url('../assets/prev.png');
            }
            .swiper-button-prev1:hover{
                    position: absolute;
                    left: -4%;
                    top: 36%;
                    width: 35px;
                    height: 35px;
                    border: 1px solid #e2dbc8;
                    border-radius: 50%;
                    z-index: 10;
                    background-size: 32px 35px;
                    transform: scale(.9);
                    background-color: #fff;
                    background-image: url('../assets/left.png');
            }
            .swiper-button-prev1:focus{
                outline: 0;
            }
            .swiper-button-next1{
                    position: absolute;
                    right: -4%;
                    top: 36%;
                    width: 35px;
                    height: 35px;
                    border: 1px solid #e2dbc8;
                    border-radius: 50%;
                    z-index: 10;
                    transition: all .9s;
                    background-size: 32px 35px;
                    background-color: #fff;
                    background-image: url('../assets/next.png');
            }
            .swiper-button-next1:hover{
                    position: absolute;
                    right: -4%;
                    top: 36%;
                    width: 35px;
                    height: 35px;
                    border: 1px solid #e2dbc8;
                    border-radius: 50%;
                    z-index: 10;
                    transform: scale(.9);
                    background-size: 32px 35px;
                    background-color: #fff;
                    background-image: url('../assets/right.png');
            }
            .swiper-button-next1:focus{
                outline: 0;
            }
        }
        .Default-page5{
            width: 100%;
            height: 530px;
            margin: 0 auto;
            text-align: center;
            line-height: 530px;
            background-color: #fff;
            .Default-main5{
                width: 1200px;
                height: 100%;
                margin: 0 auto;
            img{
                width: 500px;
                height: 300px;
            }
            .page-span5{
                font-size:22px;
                font-family:PingFang SC;
                font-weight:500;
                color: #999;
            }
            }
        }
    }
    .joinclubdetails-cont-div3{
        width: 100%;
        height: 543px;
        display: inline-block;
        background-image: url('../assets/image50.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .joinclubdetails-div3-main{
            width: 1200px;
            margin: 0 auto;
            height: 100%;
            display: flex;
            justify-content: space-between;
             .joinclubdetails-left{
                width: 40%;
                height: 85%;
                margin-top: 35px;
                margin-left: 60px;
                 .left1{
                    width: 100%;
                    height: 140px;
                    margin-top: 30px;
                    position: relative;
                    display: inline-block;
                    .bg-image4{
                        position: absolute;
                        width: 270px;
                        height: 90px;
                        right: 15%;
                        top: 5%;
                    }
                    .nav-text{
                        color: #999999;
                        font-size: 14px;
                        margin-top: -8px;
                        padding-right: 40px;
                        text-align: center;
                    }
                    h2{
                        color: #2c2c2c;
                        font-size: 24px;
                        margin-top: 40px;
                        text-align: center;
                        font-family:Microsoft YaHei;
                        font-weight:bold;
                        img{
                            width: 28px;
                            height: 28px;
                            position: absolute;
                            left: 30%;
                        }
                    }
                 }
                 .left2{
                     text-align: left;
                     color: #999999;
                     font-size: 14px;
                     line-height: 30px;
                     width: 100%;
                     margin-bottom: 90px;
                     display: -webkit-box !important;
                    -webkit-box-orient: vertical !important;
                    -webkit-line-clamp:5 !important;// 限制快级元素的文本行数
                    overflow: hidden !important;
                 }
                 .left3{
                     font-size: 14px;
                     color: #2c2c2c;
                     line-height: 50px;
                 }
                 .left4{
                     font-size: 14px;
                     color: #2c2c2c;
                     line-height: 50px;
                 }
             }
             .joinclubdetails-right{
                height: 85%;
                margin-top: 54px;
                .imgpic{
                    margin-top: 5px;
                    .img1{
                        width: 300px;
                        height: 226px;
                        object-fit: cover;
                    }
                    .img2{
                        width: 300px;
                        height: 226px;
                        object-fit: cover;
                    }
                }
                .imgpic1{
                    margin-top: 5px;
                    .img3{
                        width: 300px;
                        height: 226px;
                        object-fit: cover;
                        }
                    .img4{
                        width: 300px;
                        height: 226px;
                        object-fit: cover;
                    }
                }
             }
        }
    }
    .joinclubdetails-cont-div4{
            width: 1200px;
            height: 150px;
            text-align: center;
            position: relative;
            margin-top: 20px;
            margin: 0 auto;
            .border-left{
                width: 20%;
                height: 1px;
                background-color: #dcdcdc;
                position: absolute;
                left:18%;
                top: 41%;
            }
            .border-right{
                width: 20%;
                height: 1px;
                background-color: #dcdcdc;
                position: absolute;
                right: 18%;
                top: 41%;
            }
            .nav-text{
                color: #999999;
                font-size: 14px;
                margin-top: 8px;
            }
            h2{
                color: #2c2c2c;
                font-size: 1.4rem;
                margin-top: 40px;
                padding-top: 24px;
                font-family:Microsoft YaHei;
                font-weight:bold;
                img{
                    width: 28px;
                    height: 28px;
                    position: absolute;
                    left: 40%;
                    top: 17%;
                }
            }
    }
    .joinclubdetails-cont-div5{
        width: 100%;
        height: 660px;
        margin: 0 auto;
        margin-bottom: 60px;
        background-image: url('../assets/image51.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: relative;
        .bg-image5{
            position: absolute;
            width: 62%;
            height: 710px;
            top: 3%;
            right: 12%;
        }
        .bg-image6{
            position: absolute;
            width: 328px;
            height: 62px;
            top: 86%;
            left: 8%;
        }
        .bg-image7{
            position: absolute;
            width: 145px;
            height: 47px;
            top: 88%;
            left: 15%;
        }
        .bg-image8{
            position: absolute;
            width: 145px;
            height: 47px;
            top: 83%;
            right: 10%;
        }
        .carousel5{
            width: 1200px !important;
            height: 660px;
            margin: 0 auto;
            cursor:pointer;
            .carousel5-item{
                width: 1200px !important;
            .carousel-explain2{
                height: 183px;
                float: left;
                width: 50%;
                display: flex;
                img{
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    margin-top: 18px;
                    transition: all 1s;
                    background-color: #DCD9CC;
                    object-fit: cover;
                }
                img:hover{
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    margin-top: 18px;
                    transform: scale(.9);
                    background-color: #DCD9CC;
                    object-fit: cover;
                }
                .explain2-div{
                    height: 100%;
                    padding-top: 35px;
                    padding-left: 13px;
                    width: 55%;
                    text-align: left;
                    h3{
                        font-size: 14px;
                        color: #000;
                        font-family:Microsoft YaHei;
                        font-weight:bold;
                        .explain2-span{
                            font-size: 14px;
                            color: #000;
                        }
                    }
                    .explain2-span2{
                            font-size: 12px;
                            color: #000;
                        }
                }
            }
            .carousel-explain2:nth-child(2n){
                height: 183px;
                float: left;
                width: 50%;
                display: flex;
                img{
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    margin-top: 18px;
                    position: absolute;
                    right: 0%;
                    background-color: #DCD9CC;
                }
                .explain2-div{
                    height: 100%;
                    padding-top: 35px;
                    padding-left: 0px;
                    padding-right: 13px;
                    margin-left: 18%;
                    width: 55%;
                    text-align: right;
                    h3{
                        font-size: 14px;
                        color: #000;
                        font-family:Microsoft YaHei;
                        font-weight:bold;
                        .explain2-span{
                            font-size: 14px;
                            color: #000;
                        }
                    }
                    .explain2-span2{
                            font-size: 12px;
                            color: #000;
                        }
                }
            }
         }
        }
    }
    .Default-page6{
        width: 100%;
        height: 660px;
        margin: 0 auto;
        text-align: center;
        line-height: 660px;
        background-color: #F7F3E9;
        .Default-main6{
            width: 1200px;
            height: 100%;
            margin: 0 auto;
        img{
            width: 500px;
            height: 300px;
        }
        .page-span6{
            font-size:22px;
            font-family:PingFang SC;
            font-weight:500;
            color: #999;
        }
        }
    }
}
</style>