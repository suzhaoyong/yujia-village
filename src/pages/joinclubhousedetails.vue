<template>
    <div>
        <el-col :span="24">
            <div class="joinclubdetails-main">
                <div class="joinclubdetails-cont-div1">
                    <h2><img src="../assets/yujia.png"/>会馆课程</h2>
                    <p class="nav-text">Sometimes beauty is so simple</p>
                    <div class="border-left"></div>
                    <div class="border-right"></div>
                </div>
                <div class="joinclubdetails-cont-div2">
                    <div class="clubhouse">
                        <swiper :options="swiperOption" style="height:530px">
                            <swiper-slide v-for="(page,index) of pages" :key="index">
                                <div class="clubhouse-swiper" v-for="item of page" :key="item.id">
                                    <div class="clubhouse-swiper-img">
                                        <img :src="item.img"/>
                                    </div>
                                    <div class="clubhouse-swiper-name">
                                        <p class="name-p1">{{item.name}}<span class="name-span">{{item.text}}</span></p>
                                        <p class="name-p2">￥{{item.price}}</p>
                                    </div>
                                    <el-rate v-model="item.rate"></el-rate>
                                    <p class="name-p3">电话:{{item.tel}}</p>
                                </div>
                            </swiper-slide>
                            <div class="swiper-button-prev1" slot="button-prev"></div>
                            <div class="swiper-button-next1" slot="button-next"></div>
                        </swiper>
                    </div>
                </div>
                <div class="joinclubdetails-cont-div3">
                    <div class="joinclubdetails-div3-main">
                    <div class="joinclubdetails-left">
                        <div class="left1">
                            <h2><img src="../assets/yujia.png"/>会馆环境</h2>
                            <p class="nav-text">Sometimes beauty is so simple</p>
                        </div>
                        <div class="left2">观云瑜伽拥有1000平米场馆，瑜伽教练团队专业，分工明确。重金聘请印度瑜伽名师Deepak来馆内任教，无论你是新手还是专业人才，在这里都能有所收获。馆内拥有专业的保洁团队，准时清洁每一块场地，每一个死角，确保您始终处于健康安全舒适的环境中。</div>
                        <div class="left3">
                            电话：400-100-7191
                        </div>
                        <div class="left4">
                            地址：成都市锦江区双桂路泰合财富中心7栋302
                        </div>
                    </div>
                    <div class="joinclubdetails-right">
                        <div class="imgpic">
                        <img src="../assets/ss.png" class="img1"/>
                        <img src="../assets/ss.png" class="img2"/>
                        </div>
                        <div class="imgpic1">
                        <img src="../assets/ss.png" class="img3"/>
                        <img src="../assets/ss.png" class="img4"/>
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
                <div class="joinclubdetails-cont-div5">
                    <swiper class="carousel5" :options="swiperOption2" style="height:660px">
                            <swiper-slide class="carousel5-item" v-for="(page2,index) of pages2" :key="index">
                            <div class="carousel-explain2" v-for="item of page2" :key="item.id">
                                <img :src="item.img"/>
                                <div class="explain2-div">
                                    <h3>{{item.name}}<span class="explain2-span">({{item.huiguan}})</span></h3>
                                    <span class="explain2-span2">{{item.text}}</span>
                                </div>
                            </div>
                            </swiper-slide>
                            <div class="swiper-pagination" slot="pagination"></div>
                        </swiper>
                </div>
            </div>
        </el-col>
    </div>
</template>
<script>
export default {
  data() {
    return {
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
        swiperList:[{
            id:1,
            img:require('../assets/ss.png'),
            name:'鲁拉提',
            text:'Pilates',
            price:4800,
            rate:2,
            tel:15211373093
        },
        {
            id:2,
            img:require('../assets/ss.png'),
            name:'鲁拉提',
            text:'Pilates',
            price:4800,
            rate:3,
            tel:15211373093
        },
        {
            id:3,
            img:require('../assets/ss.png'),
            name:'鲁拉提',
            text:'Pilates',
            price:4800,
            rate:1,
            tel:15211373093
        },
        {
            id:4,
            img:require('../assets/ss.png'),
            name:'鲁拉提',
            text:'Pilates',
            price:4800,
            rate:2,
            tel:15211373093
        }],
        famousteach:[
            {
            id:1,
            img:require('../assets/xiazai.png'),
            name:'琦琦',
            huiguan:'馆主',
            text:'2015年7月 获得国际瑜伽导师协会高级教师资格证书'
            },
            {
            id:2,
            img:require('../assets/xiazai.png'),
            name:'琦琦',
            huiguan:'馆主',
            text:'2015年7月 获得国际瑜伽导师协会高级教师资格证书'
            },
            {
            id:3,
            img:require('../assets/xiazai.png'),
            name:'琦琦',
            huiguan:'馆主',
            text:'2015年7月 获得国际瑜伽导师协会高级教师资格证书'
            },
            {
            id:4,
            img:require('../assets/xiazai.png'),
            name:'琦琦',
            huiguan:'馆主',
            text:'2015年7月 获得国际瑜伽导师协会高级教师资格证书'
            },
            {
            id:5,
            img:require('../assets/xiazai.png'),
            name:'琦琦',
            huiguan:'馆主',
            text:'2015年7月 获得国际瑜伽导师协会高级教师资格证书'
            },
            {
            id:6,
            img:require('../assets/xiazai.png'),
            name:'琦琦',
            huiguan:'馆主',
            text:'2015年7月 获得国际瑜伽导师协会高级教师资格证书'
            },
            {
            id:7,
            img:require('../assets/xiazai.png'),
            name:'琦琦',
            huiguan:'馆主',
            text:'2015年7月 获得国际瑜伽导师协会高级教师资格证书'
            }
        ],
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
};
</script>
<style lang="scss" scope>
.el-rate__icon{
    color: #58B708 !important;
}
.el-rate__icon.hover{
    color: #58B708 !important;
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
.joinclubdetails-main{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    .joinclubdetails-cont-div1{
            width: 100%;
            height: 150px;
            text-align: center;
            border: 1px solid;
            position: relative;
            display: inline-block;
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
                img{
                    width: 28px;
                    height: 28px;
                    position: absolute;
                    left: 44%;
                }
            }
        }
    .joinclubdetails-cont-div2{
        width: 100%;
        height: 600px;
        margin: 0 auto;
        margin-top: 40px;
        .clubhouse{
            width: 80%;
            height: 530px;
            margin: 0 auto;
            position: relative;
            .clubhouse-swiper{
                width: 100%;
                height: 514px;
                background:rgba(255,255,255,1);
                box-shadow:2px 3px 20px 1px rgba(164,164,164,0.26);
                border-radius:5px;
                .clubhouse-swiper-img{
                    width: 100%;
                    height: 403px;
                    border-radius:5px 5px 0px 0px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .clubhouse-swiper-name{
                    width: 95%;
                    height: 53px;
                    line-height: 16px;
                    display: flex;
                    margin: 0 auto;
                    justify-content: space-between;
                    .name-p1{
                        font-size: 20px;
                        color: #2c2c2c;
                        font-family:MicrosoftYaHei-Bold;
                        font-weight:bold;
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
                         line-height: 34px;
                    }
                }
                .el-rate{
                    margin-left: 9px;
                }
                .name-p3{
                    width: 95%;
                    text-align: right;
                    margin: 0 auto;
                    font-size: 14px;
                    color: #2c2c2c;
                }
            }
            .swiper-button-prev1{
                    position: absolute;
                    left: 0%;
                    top: 36%;
                    width: 35px;
                    height: 35px;
                    border: 1px solid #e2dbc8;
                    border-radius: 50%;
                    z-index: 10;
                    background-size: 32px 35px;
                    background-color: #fff;
                    background-image: url('../assets/left.png');
            }
            .swiper-button-next1{
                    position: absolute;
                    right: 0%;
                    top: 36%;
                    width: 35px;
                    height: 35px;
                    border: 1px solid #e2dbc8;
                    border-radius: 50%;
                    z-index: 10;
                    background-size: 32px 35px;
                    background-color: #fff;
                    background-image: url('../assets/right.png');
            }
        }
    }
    .joinclubdetails-cont-div3{
        width: 100%;
        border: 1px solid;
        height: 543px;
        background-color: #ebebeb;
        .joinclubdetails-div3-main{
            width: 80%;
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
                    position: relative;
                    display: inline-block;
                    .nav-text{
                        color: #999999;
                        font-size: 14px;
                        margin-top: -8px;
                        padding-right: 21px;
                        text-align: center;
                    }
                    h2{
                        color: #2c2c2c;
                        font-size: 24px;
                        margin-top: 40px;
                        text-align: center;
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
                width: 50%;
                height: 85%;
                margin-top: 35px;
                .imgpic{
                    margin-top: 7px;
                    .img1{
                        width: 49%;
                        height: 226px;
                    }
                    .img2{
                        width: 50%;
                        height: 226px;
                    }
                }
                .imgpic1{
                    margin-top: 2px;
                    .img3{
                        width: 49%;
                        height: 226px;
                        }
                    .img4{
                        width: 50%;
                        height: 226px;
                    }
                }
             }
        }
    }
    .joinclubdetails-cont-div4{
        width: 100%;
            height: 150px;
            text-align: center;
            border: 1px solid;
            position: relative;
            display: inline-block;
            .border-left{
                width: 20%;
                height: 1px;
                background-color: #dcdcdc;
                position: absolute;
                left:20%;
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
                img{
                    width: 28px;
                    height: 28px;
                    position: absolute;
                    left: 43%;
                }
            }
    }
    .joinclubdetails-cont-div5{
        width: 100%;
        height: 660px;
        margin: 0 auto;
        margin-bottom: 60px;
        background-color: #ebebeb;
        .carousel5{
            width: 75% !important;
            height: 660px;
            margin: 0 auto;
            .carousel-explain2{
            height: 227px;
            float: left;
            width: 50%;
            display: flex;
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
}
</style>