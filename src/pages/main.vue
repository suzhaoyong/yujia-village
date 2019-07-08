<template>
    <div>
        <el-col>
            <div class="nav-main">
                <template>
                    <Nav></Nav>
                </template>
                <div class="nav-contunt">
                    <div class="nav-contunt-div1">
                        <h2><img src="../assets/yujia.png"/>热门课程</h2>
                         <p class="nav-text">Sometimes beauty is so simple</p>
                    </div>
                    <div class="border-left"></div>
                    <div class="border-right"></div>
                    <div class="nav-contunt-div2">
                        <el-carousel height="560px" :interval="5000" arrow="never" direction="vertical" :autoplay="false">
                            <el-carousel-item v-for="item in dataimg" :key="item.id">
                            <div class="carousel-explain">
                                <img :src="item.img1" class="img1"/>
                                <img :src="item.img2" class="img2"/>
                            </div>
                            <div class="carousel-text">
                                <h4>{{item.name}}<span>{{item.train}}</span></h4>
                                <el-rate v-model="item.rate"></el-rate>
                            </div>
                            <div class="carousel-detals">
                                <span>{{item.datels}}</span>
                                <el-button type="text" class="carousel-btn">了解更多</el-button>
                            </div>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <div class="nav-contunt-div3">
                        <h2><img src="../assets/yujia.png"/>瑜伽资讯</h2>
                        <p class="nav-text">Sometimes beauty is so simple</p>
                    </div>
                    <div class="nav-contunt-div4">
                        <div class="swiper-container gallery-top" :options="swiperOption">
                                <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <img src="../assets/172901eaaci443syyscwzw.jpg" alt="">
                                </div>
                                <div class="swiper-slide">
                                    <img src="../assets/xiazai.png" alt="">
                                </div>
                                </div>
                                <div class="swiper-button-next swiper-button-black"></div>
                                <div class="swiper-button-prev swiper-button-black"></div>
                            </div>
                            <div class="swiper-container gallery-thumbs">
                                <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <img src="../assets/172901eaaci443syyscwzw.jpg" alt="">
                                </div>
                                <div class="swiper-slide">
                                    <img src="../assets/172901eaaci443syyscwzw.jpg" alt="">
                                </div>
                                </div>
                            </div>
                    </div>
                    <div class="nav-contunt-div3">
                        <h2><img src="../assets/yujia.png"/>瑜伽名师</h2>
                        <p class="nav-text">Sometimes beauty is so simple</p>
                    </div>
                    <div class="nav-contunt-div5">
                        <el-carousel class="carousel5" height="660px" :interval="5000" arrow="never" direction="vertical" :autoplay="false">
                            <el-carousel-item class="carousel5-item" v-for="item in famousteach" :key="item.id">
                            <div class="carousel-explain2">
                                <div class="explain2-left">
                                    <img :src="item.img"/>
                                    <div class="explain2-div">
                                        <h3>{{item.name}}<span class="explain2-span">({{item.huiguan}})</span></h3>
                                        <span class="explain2-span2">{{item.text}}</span>
                                    </div>
                                </div>
                                <div class="explain2-right">
                                    <div class="explain2-div">
                                        <h3>{{item.name}}<span class="explain2-span">({{item.huiguan}})</span></h3>
                                        <span class="explain2-span2">{{item.text}}</span>
                                    </div>
                                    <img :src="item.img"/>
                                </div>
                            </div>
                            <div class="carousel-explain2">
                                <div class="explain2-left">
                                    <img :src="item.img"/>
                                    <div class="explain2-div">
                                        <h3>{{item.name}}<span class="explain2-span">({{item.huiguan}})</span></h3>
                                        <span class="explain2-span2">{{item.text}}</span>
                                    </div>
                                </div>
                                <div class="explain2-right">
                                    <div class="explain2-div">
                                        <h3>{{item.name}}<span class="explain2-span">({{item.huiguan}})</span></h3>
                                        <span class="explain2-span2">{{item.text}}</span>
                                    </div>
                                    <img :src="item.img"/>
                                </div>
                            </div>
                            <div class="carousel-explain2">
                                <div class="explain2-left">
                                    <img :src="item.img"/>
                                    <div class="explain2-div">
                                        <h3>{{item.name}}<span class="explain2-span">({{item.huiguan}})</span></h3>
                                        <span class="explain2-span2">{{item.text}}</span>
                                    </div>
                                </div>
                                <div class="explain2-right">
                                    <div class="explain2-div">
                                        <h3>{{item.name}}<span class="explain2-span">({{item.huiguan}})</span></h3>
                                        <span class="explain2-span2">{{item.text}}</span>
                                    </div>
                                    <img :src="item.img"/>
                                </div>
                            </div>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <div class="nav-contunt-div3">
                        <h2><img src="../assets/yujia.png"/>培训信息</h2>
                        <p class="nav-text">Sometimes beauty is so simple</p>
                    </div>
                    <div class="nav-contunt-div6">
                        <div class="explain3"></div>
                    </div>
                    <div class="nav-contunt-div3">
                        <h2><img src="../assets/yujia.png"/>加盟会馆</h2>
                        <p class="nav-text">Sometimes beauty is so simple</p>
                    </div>
                    <div class="nav-contunt-div7">
                        <div class="explain4">
                           <img class="nav-div7-img" src="../assets/ss.png"/>
                           <img class="nav-div7-img" src="../assets/ss.png"/>
                           <img class="nav-div7-img" src="../assets/ss.png"/>
                           <img class="nav-div7-img" src="../assets/ss.png"/>
                           <img class="nav-div7-img" src="../assets/ss.png"/>
                           <img class="nav-div7-img" src="../assets/ss.png"/>
                           <img class="nav-div7-img" src="../assets/ss.png"/>
                           <img class="nav-div7-img" src="../assets/ss.png"/>
                           <img class="nav-div7-img" src="../assets/ss.png"/>
                           <img class="nav-div7-img" src="../assets/ss.png"/>
                           <img class="nav-div7-img" src="../assets/ss.png"/>
                           <img class="nav-div7-img" src="../assets/ss.png"/>
                        </div>
                    </div>
                </div>
            </div>
        </el-col>
    </div>
</template>
<script>
import Nav from "../components/nav";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
    components:{
        Nav,
        swiper,
        swiperSlide
    },
  data() {
    return {
        dataimg:[
            {
            id:1,
            img1:require('../assets/172901eaaci443syyscwzw.jpg'),
            img2:require('../assets/16394929757_1920x1080.jpg'),
            name:'空中瑜伽',
            train:'Pilates',
            rate:1,
            datels:'空中瑜伽又叫反重力瑜伽，利用空中瑜伽吊床，完成哈他瑜伽体式。练习者感受到身体体重，加深体式的伸展、阻力和正位能力，具有高效的放松、疗愈、瘦身效果，更具有趣味性和互动性 。'
            },
            {
            id:2,
            img1:require('../assets/eyucCpbjxAvtwAe.jpg'),
            img2:require('../assets/153_140620153629_2.jpg'),
            name:'基础瑜伽',
            train:'YangFei',
            rate:2,
            datels:'基础瑜伽又叫反重力瑜伽，利用空中瑜伽吊床，完成哈他瑜伽体式。练习者感受到身体体重，加深体式的伸展、阻力和正位能力，具有高效的放松、疗愈、瘦身效果，更具有趣味性和互动性 。'
            }
        ],
        famousteach:[{
            id:1,
            img:require('../assets/xiazai.png'),
            name:'新悦',
            huiguan:'观云瑜伽馆',
            text:'2015年7月 获得国际瑜伽导师协会高级教师资格证书'
        },
        {
            id:2,
            img:require('../assets/xiazai.png'),
            name:'新悦',
            huiguan:'观云瑜伽馆',
            text:'2015年7月 获得国际瑜伽导师协会高级教师资格证书'
        }],
        swiperOption:{
           spaceBetween: 10,
           thumbs: {
            swiper: {
            el: '.swiper-container',
            spaceBetween: 10,
            slidesPerView: 4,
            watchSlidesVisibility: true,/*避免出现bug*/
            },
        }
        }
    };
  },
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
.nav-main{
    height: 100%;
    padding: 0;
    overflow: hidden;
    .nav-contunt{
        border: 1px solid;
        height: 100%;
        display:inline-block;
        position: relative;
        .border-left{
            width: 25%;
            height: 1px;
            background-color: #dcdcdc;
            position: absolute;
            top: 75px;
            left: 17%;
        }
        .border-right{
            width: 25%;
            height: 1px;
            background-color: #dcdcdc;
            position: absolute;
            right: 17%;
            top: 75px;
        }
        .nav-contunt-div1{
            width: 100%;
            height: 150px;
            text-align: center;
            border: 1px solid;
            position: relative;
            .nav-text{
                color: #999999;
                font-size: 14px;
                margin-top: -8px;
            }
            h2{
                color: #2c2c2c;
                font-size: 24px;
                margin-top: 40px;
                img{
                    width: 28px;
                    height: 28px;
                    position: absolute;
                    left: 44%;
                }
            }
        }
        .nav-contunt-div2{
            width: 65%;
            height: 560px;
            margin: 0 auto;
            background-color: #939EC4;
            margin-top: 40px;
            margin-bottom: 60px;
            // opacity: 0.6;
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
                margin-top: -14px;
                h4{
                    color: #fff;
                    font-size: 20px;
                    span{
                    padding-left: 13px;
                    font-size: 14px;
                }
                }
                .el-rate{
                    margin-top: -14px;
                }
            }
            .carousel-detals{
                display: flex;
                justify-content: space-around;
                margin-top: 30px;
                span{
                        width: 67%;
                        color: #fff;
                        font-size: 14px;
                }
                .carousel-btn{
                    width: 130px;
                    height: 45px;
                    border: solid 1px #ffffff;
                    color: #fff;
                }
            }
        }
        .nav-contunt-div3{
            width: 100%;
            height: 150px;
            text-align: center;
            border: 1px solid;
            position: relative;
            .nav-text{
                color: #999999;
                font-size: 14px;
                margin-top: -8px;
            }
            h2{
                color: #2c2c2c;
                font-size: 24px;
                margin-top: 40px;
                img{
                    width: 28px;
                    height: 28px;
                    position: absolute;
                    left: 44%;
                }
            }
        }
        .nav-contunt-div4{
            width: 65%;
            margin:0 auto;
            height: 560px;
            margin-top: 40px;
            margin-bottom: 60px;
            border: 1px solid;
            .swiper-container {
                width: 100%;
                height: 300px;
                margin-left: auto;
                margin-right: auto;
               
            }
            .gallery-top {
                height: 70%;
                width: 100%;
                position: relative;
                 .swiper-slide {
                    background-size: cover;
                    background-position: center;
                    img{
                        width: 490px;
                        height: 390px;
                    }
                }
                .swiper-button-next{
                    position: absolute;
                    top: 90%;
                    width: 30px;
                    height: 24px;
                    right: 4%;
                }
                .swiper-button-prev{
                    position: absolute;
                    left: 83%;
                    top: 90%;
                    width: 30px;
                    height: 24px;
                }
                }
            .gallery-thumbs {
                height: 30%;
                box-sizing: border-box;
                padding: 10px 0;
                .swiper-slide {
                height: 100%;
                opacity: 0.4;
                img{
                    width: 200px;
                    height: 100%;
                }
                }
                .swiper-slide-thumb-active {
                  opacity: 1;
                }
           }
        }
        .nav-contunt-div5{
            width: 100%;
            height: 660px;
            margin: 0 auto;
            margin-top: 40px;
            margin-bottom: 60px;
            // opacity: 0.6;
            .carousel5{
               width: 65% !important;
                height: 660px;
                margin: 0 auto;
                // opacity: 0.3;
                .carousel-explain2{
                height: 200px;
                display: flex;
                .explain2-left{
                    width: 50%;
                    display: flex;
                    justify-content: flex-start;
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
                }
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
            .carousel5-item:nth-child(2n){
                background-color: #EEEADC !important;
            }
            .carousel5-item:nth-child(2n+1){
                background-color: #EEEADC !important;
            }
        }
        .nav-contunt-div6{
            width: 100%;
            height: 660px;
            margin: 0 auto;
            margin-top: 40px;
            .explain3{
                width: 65%;
                margin:0 auto;
                height: 590px;
                border: 1px solid;
            }
        }
        .nav-contunt-div7{
            width: 100%;
            height: 660px;
            margin: 0 auto;
            margin-top: 40px;
            .explain4{
                width: 65%;
                margin:0 auto;
                height: 602px;
                border: 1px solid;
                .nav-div7-img{
                    width: 243px;
                    height: 198px;
                    background-color: #eeeeee;
                }
            }
        }
    }
}
</style>
