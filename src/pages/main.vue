<template>
    <div>
        <el-col :span="24">
            <div class="nav-main">
                <template>
                    <Banner></Banner>
                </template>
                <div class="nav-contunt">
                    <div class="nav-contunt-div1">
                        <h2><img src="../assets/yujia.png"/>热门课程</h2>
                         <p class="nav-text">Sometimes beauty is so simple</p>
                        <div class="border-left"></div>
                        <div class="border-right"></div>
                    </div>
                    <el-col :span="24" class="bg-pic">
                    <div class="nav-contunt-div2">
                        <div class="contunt2">
                        <el-carousel height="560px" :interval="5000" arrow="never" direction="vertical" :autoplay="false">
                            <el-carousel-item v-for="item in dataimg" :key="item.id">
                            <div class="carousel-explain">
                                <img :src="item.train_image[0].path" class="img1"/>
                                <img :src="item.train_image[0].path" class="img2"/>
                            </div>
                            <div class="carousel-text">
                                <h4>{{item.theme}}<span>{{item.name}}</span></h4>
                                <el-rate v-model="item.diff"></el-rate>
                            </div>
                            <div class="carousel-detals">
                                <span class="span">{{item.content}}</span>
                                <el-button type="text" class="carousel-btn">了解更多</el-button>
                            </div>
                            </el-carousel-item>
                        </el-carousel>
                        </div>
                    </div>
                    <div class="nav-contunt-div3">
                        <h2><img src="../assets/yujia.png"/>瑜伽资讯</h2>
                        <p class="nav-text">Sometimes beauty is so simple</p>
                        <div class="border-left"></div>
                        <div class="border-right"></div>
                    </div>
                    <div class="nav-contunt-div4">
                        <div class="contunt3">
                            <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
                                <swiper-slide class="slide-1" ></swiper-slide>
                                <swiper-slide class="slide-2"></swiper-slide>
                                <swiper-slide class="slide-3"></swiper-slide>
                                <swiper-slide class="slide-4"></swiper-slide>
                                <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
                                <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
                            </swiper>
                            <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
                                <swiper-slide class="slide-1"></swiper-slide>
                                <swiper-slide class="slide-2"></swiper-slide>
                                <swiper-slide class="slide-3"></swiper-slide>
                                <swiper-slide class="slide-4"></swiper-slide>
                            </swiper>
                         </div>
                    </div>
                    </el-col>
                    <div class="nav-contunt-div8">
                        <img src="../assets/image56.png" class="bg-pic2">
                        <h2><img src="../assets/yujia.png"/>瑜伽名师</h2>
                        <p class="nav-text">Sometimes beauty is so simple</p>
                        <div class="border-left"></div>
                        <div class="border-right"></div>
                        <img src="../assets/image57.png" class="bg-pic3">
                    </div>
                    <div class="nav-contunt-div5">
                        <img src="../assets/image52.png" class="bg-pic4">
                        <swiper class="carousel5" :options="swiperOption" style="height:660px">
                            <swiper-slide class="carousel5-item" v-for="(page,index) of pages" :key="index">
                            <div class="carousel-explain2" v-for="item of page" :key="item.id">
                                <img :src="item.path"/>
                                <div class="explain2-div">
                                    <h3>{{item.name}}</h3>
                                    <span class="explain2-span2">{{item.text}}</span>
                                </div>
                            </div>
                            </swiper-slide>
                            <div class="swiper-pagination" slot="pagination"></div>
                        </swiper>
                    </div>
                    <div class="nav-contunt-div9">
                        <img src="../assets/image58.png" class="bg-pic5">
                        <h2><img src="../assets/yujia.png"/>培训信息</h2>
                        <p class="nav-text">Sometimes beauty is so simple</p>
                        <div class="border-left"></div>
                        <div class="border-right"></div>
                        <img src="../assets/image59.png" class="bg-pic6">
                    </div>
                    <el-col :span="24" class="bg-pic7">
                    <div class="nav-contunt-div6">
                        <div class="explain3">
                            <div class="explain3-border">
                                <img src="../assets/image61.png" class="bg-border-img">
                                <img src="../assets/image62.png" class="bg-border-img2">
                            </div>
                            <div class="explain3-text">
                                <p class="text-p">The Dolphin Method RYT 200 小时</p>
                                <h4 class="text-h4">RYT200小时瑜伽培训</h4>
                                <p class="text-p2">全球最权威的认证机构</p>
                                <p class="text-p3">全球含金量最高的瑜伽证书</p>
                                <img src="../assets/image63.png" class="bg-border-img3">
                                <div class="text-butt">
                                    <el-button type="text" class="text-button">报名</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="nav-contunt-div10">
                        <h2><img src="../assets/yujia.png"/>加盟会馆</h2>
                        <p class="nav-text">Sometimes beauty is so simple</p>
                        <div class="border-left"></div>
                        <div class="border-right"></div>
                    </div>
                    <div class="nav-contunt-div7">
                        <div class="explain4">
                            <img class="nav-div7-img" v-for="(item,index) in clubInfo" :key="index" :src="item.path"/>
                        </div>
                    </div>
                    </el-col>
                    <div class="bai">
                        <img src="../assets/image60.png" class="bg-pic8"/>
                    </div>
                </div>
            </div>
        </el-col>
    </div>
</template>
<script>
import Banner from "../components/banner";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
    components:{
        Banner,
        swiper,
        swiperSlide
    },
  data() {
    return {
        dataimg:[],
        famousteach:[],
        clubInfo:[],
        swiperOption: {
          spaceBetween: 30,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          loop: true,
        },
        swiperOptionTop:{
           spaceBetween: 10,
          loop: true,
          loopedSlides: 5,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        swiperOptionThumbs: {
          spaceBetween: 10,
          slidesPerView: 4,
          touchRatio: 0.2,
          loop: true,
          loopedSlides: 5,
          slideToClickedSlide: true,
        }
    };
  },
   computed: {
      pages(){
        const pages = []; // pages是为二维数组
        this.famousteach.forEach((item, index) => {
          const page = Math.floor(index / 6); // page本质是0.1.2.3分别表示第1,2,3,4页
          if (!pages[page]) {
            pages[page] = [];
          }
          pages[page].push(item);
        });
        return pages;
      }
  },
   mounted() {
      this.$nextTick(() => {
        const swiperTop = this.$refs.swiperTop.swiper;
        const swiperThumbs = this.$refs.swiperThumbs.swiper;
        swiperTop.controller.control = swiperThumbs;
        swiperThumbs.controller.control = swiperTop;
      })
    },
    created(){
        this.listhomedata();
    },
    methods:{
        listhomedata(){
        let _this = this;
        this.$request("/home").then(res => {
            _this.famousteach = res.teachers;
            _this.dataimg = res.hot_trains;
            _this.clubInfo = res.clubInfo;
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
    }
};
</script>
<style lang="scss" scope>
@import "swiper/dist/css/swiper.css";
.el-carousel__item:nth-child(2n) {
    background-color: #939EC4 !important;
}
.el-carousel__item:nth-child(2n+1) {
    background-color: #939EC4 !important;
}
.el-rate__icon.hover{
    color: #fff !important;
}
.el-rate__icon{
    color: #fff !important;
}
.el-carousel__button{
    width: 10px !important;
    height: 10px !important;
    border-radius: 50% !important;
}
.swiper-pagination-bullet-active {
    opacity: 1;
    background: #2c2c2c;
}
.swiper-pagination-bullet{
    width: 10px;
    height: 10px;
    border-radius: 50%;
}
.nav-main{
    height: 100%;
    padding: 0;
    overflow: hidden;
    .nav-contunt{
        height: 100%;
        display:inline-block;
        margin: 0 auto;
        width: 100%;
        .nav-contunt-div1{
            width: 100%;
            height: 150px;
            text-align: center;
            display:inline-block;
            margin-top: 20px;
            position: relative;
            .border-left{
            width: 20%;
            height: 1px;
            background-color: #dcdcdc;
            position: absolute;
            top: 45%;
            left: 22%;
            }
            .border-right{
                width: 20%;
                height: 1px;
                background-color: #dcdcdc;
                position: absolute;
                right: 22%;
                top: 45%;
            }
            .nav-text{
                color: #999999;
                font-size: 14px;
                margin-top: -8px;
            }
            h2{
                color: #2c2c2c;
                font-size: 24px;
                margin-top: 40px;
                font-family:Microsoft YaHei;
                font-weight:bold;
                img{
                    width: 28px;
                    height: 28px;
                    position: absolute;
                    left: 44%;
                }
            }
        }
        .bg-pic{
            background-image: url('../assets/image8.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
        .nav-contunt-div2{
            width: 100%;
            height: 590px;
            margin: 0 auto;
            margin-top: 17px;
            .contunt2{
                width: 75%;
                height: 560px;
                margin: 0 auto;
                background-color: #939EC4;
                opacity: 0.7;
            .carousel-explain{
                height: 350px;
                position: relative;
                .img1{
                    width: 520px;
                    height: 330px;
                    transform: rotate(5deg);
                    -ms-transform: rotate(5deg);
                    -moz-transform: rotate(5deg);
                    -webkit-transform: rotate(5deg);
                    -o-transform: rotate(5deg);
                    position: absolute;
                    left: 40px;
                    top: 23px;
                    }
                .img2{
                        width: 310px;
                        height: 295px;
                        position: absolute;
                        right: 50px;
                        bottom: -5px;
                }
            }
            .carousel-text{
                width: 90%;
                margin: 0 auto;
                margin-top: 30px;
                h4{
                    color: #fff;
                    font-size: 20px;
                    font-family:Source Han Sans CN;
                    font-weight:bold;
                    span{
                    padding-left: 13px;
                    font-size: 14px;
                    font-family:Source Han Sans CN;
                    font-weight:400;
                }
                }
                .el-rate{
                    margin-top: 1px;
                }
            }
            .carousel-detals{
                display: flex;
                justify-content: space-around;
                margin-top: 30px;
                .span{
                    width: 67%;
                    color: #fff;
                    font-size: 14px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;// 限制快级元素的文本行数
                    overflow: hidden;
                }
                .carousel-btn{
                    width: 130px;
                    height: 45px;
                    border: solid 1px #ffffff;
                    color: #fff;
                }
            }
        }
    }
        .nav-contunt-div3{
            width: 100%;
            height: 150px;
            text-align: center;
            display: inline-block;
            position: relative;
            .border-left{
            width: 20%;
            height: 1px;
            background-color: #dcdcdc;
            position: absolute;
            top: 45%;
            left: 22%;
            }
            .border-right{
                width: 20%;
                height: 1px;
                background-color: #dcdcdc;
                position: absolute;
                right: 22%;
                top: 45%;
            }
            .nav-text{
                color: #999999;
                font-size: 14px;
                margin-top: -8px;
            }
            h2{
                color: #2c2c2c;
                font-size: 24px;
                margin-top: 40px;
                font-family:Microsoft YaHei;
                font-weight:bold;
                img{
                    width: 28px;
                    height: 28px;
                    position: absolute;
                    left: 44%;
                }
            }
        }
        .nav-contunt-div4{
            width: 100%;
            margin:0 auto;
            height: 700px;
            margin-top: 15px;
            .contunt3{
                width: 75%;
                margin: 0 auto;
                height: 624px;
             .swiper-container {
                 width: 100%;
                 .swiper-slide {
                    background-size: cover;
                    background-position: center;
                    &.slide-1 {
                    background-image:url('../assets/image3.png');
                    }
                    &.slide-2 {
                    background-image:url('../assets/image4.png');
                    }
                    &.slide-3 {
                    background-image:url('../assets/image5.png');
                    }
                    &.slide-4 {
                    background-image:url('../assets/image6.png');
                    }
                }
            }
            .gallery-top {
                height: 72%!important;
                width: 100%;
            }
             .gallery-thumbs {
                height: 27%!important;
                box-sizing: border-box;
                padding: 10px 0;
                .swiper-slide {
                    width: 25%;
                    height: 100%;
                    opacity: 0.4;
                }
                 .swiper-slide-active {
                    opacity: 1;
                }
            }
        }
      }
    }
        .nav-contunt-div5{
            width: 100%;
            height: 660px;
            margin: 0 auto;
            margin-top: 40px;
            margin-bottom: 34px;
            background-image: url('../assets/image51.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
            position: relative;
            .bg-pic4{
                position: absolute;
                width: 70%;
                right: 9%;
                top: 11%;
                height: 100%;
            }
            .carousel5{
               width: 75% !important;
                height: 660px;
                margin: 0 auto;
                .carousel-explain2{
                height: 227px;
                float: left;
                width: 50%;
                display: flex;
                // .explain2-left{
                //     width: 50%;
                //     display: flex;
                //     justify-content: flex-start;
                    img{
                        width: 160px;
                        height: 160px;
                        border-radius: 50%;
                        margin-top: 18px;
                        margin-left: 10px;
                        background-color: #DCD9CC;
                    }
                    .explain2-div{
                        height: auto;
                        padding-top: 45px;
                        padding-left: 13px;
                        h3{
                            font-size: 14px;
                            color: #000;
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
                // }
                .explain2-right{
                    width: 50%;
                    display: flex;
                    justify-content: flex-end;
                    .explain2-div{
                        height: auto;
                        padding-right: 13px;
                        padding-top: 45px;
                        text-align: right;
                        h3{
                            font-size: 14px;
                            color: #000;
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
                    img{
                        width: 160px;
                        height: 160px;
                        border-radius: 50%;
                        margin-top: 18px;
                        margin-right: 10px;
                        background-color: #DCD9CC;
                    }
                }
              }
            }
        }
        .bg-pic7{
            background-image: url('../assets/image7.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
        .nav-contunt-div6{
            width: 100%;
            height: 660px;
            margin: 0 auto;
            margin-top: 40px;
            .explain3{
                width: 75%;
                margin:0 auto;
                height: 590px;
                display: flex;
                .explain3-border{
                    width: 67%;
                    border: 10px solid #fff;
                    height: 82%;
                    margin: 0 auto;
                    margin-top: 30px;
                    margin-left: 14%;
                    position: relative;
                    .bg-border-img{
                        width: 85%;
                        height: 425px;
                        position: absolute;
                        top: 7%;
                        left: -16%;
                    }
                    .bg-border-img2{
                        width: 134px;
                        height: 36px;
                        position: absolute;
                        top: 58%;
                        left: -29%;
                    }
                }
                .explain3-text{
                    width: 32%;
                    height: 82%;
                    position: relative;
                    .text-p{
                        font-size: 20px;
                        color: #2c2c2c;
                        position: absolute;
                        left: -65%;
                        top: 20%;
                    }
                    .text-p2{
                        font-size: 14px;
                        color: #2c2c2c;
                        position: absolute;
                        left: 7%;
                        top: 54%;
                    }
                    .text-p3{
                        font-size: 14px;
                        color: #2c2c2c;
                        position: absolute;
                        left: 7%;
                        top: 62%;
                    }
                    .text-h4{
                        font-size: 20px;
                        color: #2c2c2c;
                        position: absolute;
                        left: -65%;
                        top: 30%;
                    }
                    .bg-border-img3{
                        width: 134px;
                        height: 34px;
                        position: absolute;
                        top: 40%;
                        right: -7%;
                    }
                    .text-butt{
                        width: 122px;
                        height: 53px;
                        background-color: #ffffff;
                        position: absolute;
                        left: 7%;
                        top: 90%;
                        line-height: 52px;
                        text-align: center;
                        .text-button{
                            color: #2c2c2c;
                        }
                    }
                }
            }
        }
        .nav-contunt-div7{
            width: 100%;
            height: 660px;
            margin: 0 auto;
            margin-top: 10px;
            .explain4{
                width: 75%;
                margin:0 auto;
                height: 602px;
                .nav-div7-img{
                    width: 279px;
                    height: 198px;
                    background-color: #eeeeee;
                    margin-left: 5px;
                    margin-top: 5px;
                }
            }
        }
        .nav-contunt-div10{
            width: 100%;
            height: 150px;
            text-align: center;
            display: inline-block;
            position: relative;
            .border-left{
            width: 20%;
            height: 1px;
            background-color: #dcdcdc;
            position: absolute;
            top: 45%;
            left: 22%;
            }
            .border-right{
                width: 20%;
                height: 1px;
                background-color: #dcdcdc;
                position: absolute;
                right: 22%;
                top: 45%;
            }
            .nav-text{
                color: #999999;
                font-size: 14px;
                margin-top: -8px;
            }
            h2{
                color: #2c2c2c;
                font-size: 24px;
                margin-top: 40px;
                font-family:Microsoft YaHei;
                font-weight:bold;
                img{
                    width: 28px;
                    height: 28px;
                    position: absolute;
                    left: 44%;
                }
            }
        }
    }
        .nav-contunt-div8{
            width: 100%;
            height: 150px;
            margin-top:20px;
            text-align: center;
            display: inline-block;
            position: relative;
            .bg-pic2{
                position: absolute;
                width: 350px;
                height: 160px;
                left: 0%;
                top: -8%;
            }
            .bg-pic3{
                position: absolute;
                width: 620px;
                height: 160px;
                right: 10%;
                top: -6%;
            }
            .border-left{
                width: 20%;
                height: 1px;
                background-color: #dcdcdc;
                position: absolute;
                left:22%;
                top: 45%;
            }
            .border-right{
                width: 20%;
                height: 1px;
                background-color: #dcdcdc;
                position: absolute;
                right: 22%;
                top: 45%;
            }
            .nav-text{
                color: #999999;
                font-size: 14px;
                margin-top: -8px;
            }
            h2{
                color: #2c2c2c;
                font-size: 24px;
                margin-top: 40px;
                font-family:Microsoft YaHei;
                font-weight:bold;
                img{
                    width: 28px;
                    height: 28px;
                    position: absolute;
                    left: 44%;
                }
            }
        }
        .nav-contunt-div9{
            width: 100%;
            height: 150px;
            text-align: center;
            margin-bottom: 30px;
            display: inline-block;
            position: relative;
            .bg-pic5{
                position: absolute;
                width: 560px;
                height: 160px;
                left: 0%;
                top: -8%;
            }
            .bg-pic6{
                position: absolute;
                width: 390px;
                height: 160px;
                right: 0%;
                top: -6%;
            }
            .border-left{
            width: 20%;
            height: 1px;
            background-color: #dcdcdc;
            position: absolute;
            top: 45%;
            left: 22%;
            }
            .border-right{
                width: 20%;
                height: 1px;
                background-color: #dcdcdc;
                position: absolute;
                right: 22%;
                top: 45%;
            }
            .nav-text{
                color: #999999;
                font-size: 14px;
                margin-top: -8px;
            }
            h2{
                color: #2c2c2c;
                font-size: 24px;
                margin-top: 40px;
                font-family:Microsoft YaHei;
                font-weight:bold;
                img{
                    width: 28px;
                    height: 28px;
                    position: absolute;
                    left: 44%;
                }
            }
        }
        .bai{
            width: 100%;
            height: 60px;
            background-color: #fff;
            display: inline-block;
            position: relative;
            .bg-pic8{
                position: absolute;
                width: 235px;
                height: 500px;
                right: 0%;
                bottom: 3%;
            }
        }
    }
}
</style>
