<template>
    <div>
        <el-col :span="24">
            <div class="nav-main">
                <template>
                    <!-- <Banner></Banner> -->
                    <div class="bg_img">
                      <img :src="banner" alt />
                    </div>
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
                        <div class="carousel">
                        <el-carousel height="620px" :interval="5000" arrow="always" trigger="click" direction="vertical" :autoplay="true">
                            <el-carousel-item v-for="item in dataimg" :key="item.id">
                                <div class="contunt2">
                                <div class="carousel-explain">
                                    <img :src="item.path1" class="img1"/>
                                    <img :src="item.path2" class="img2"/>
                                </div>
                                <div class="carousel-text">
                                    <h4>{{item.theme}}<span>{{item.name}}</span></h4>
                                    <el-rate :value="item.diff" disabled disabled-void-color="#c0c4cc" :colors="['#fff']"></el-rate>
                                </div>
                                <div class="carousel-detals">
                                    <span class="span">{{item.intro}}</span>
                                    <el-button type="text" class="carousel-btn" @click="Learnmore(item)">了解更多</el-button>
                                </div>
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
                            <swiper :options="swiperOptionData" style="height:630px;width:1200px">
                                <swiper-slide v-for="(page2,index) of pages2" :key="index">
                                    <div class="yogocontunt-swiper">
                                        <div class="yogoswiper-img">
                                            <div class="rhomb1">
                                                <img :src="namelist.icon_url"/>
                                            </div>
                                        </div>
                                        <div class="yogoswiper-text">
                                            <h3>{{namelist.headline}}</h3>
                                            <div class="yogoswiper-butt">
                                            <el-button type="text" @click="ViewAll(namelist)">查看详情</el-button>
                                            </div>
                                        </div>
                                        <p class="p1">{{namelist.summary}}</p>
                                    </div>
                                    <div class="icon" v-for="(item,idx) of page2" :key="item.id" :class="activeClass == idx ? 'active':''" @click="selectItem(item,idx)">
                                        <img class="icon-img-content" :src="item.icon_url">
                                    </div>
                                </swiper-slide>
                                <div class="swiper-button-prev1" slot="button-prev" @click="buttonprev(pages2)"></div>
                                <div class="swiper-button-next1" slot="button-next" @click="buttonnext(pages2)"></div>
                            </swiper>
                         </div>
                    </div>
                    </el-col>
                    <div class="nav-contunt-div8">
                        <img src="../assets/image56.png" class="bg-pic2">
                        <div class="carousel33">
                        <h2><img src="../assets/yujia.png"/>瑜伽名师</h2>
                        <p class="nav-text">Sometimes beauty is so simple</p>
                        <div class="border-left"></div>
                        <div class="border-right"></div>
                        </div>
                        <img src="../assets/image57.png" class="bg-pic3">
                    </div>
                    <div class="nav-contunt-div5">
                        <img src="../assets/image52.png" class="bg-pic4">
                        <swiper class="carousel5" :options="swiperOption" style="height:660px;width:1200px;">
                            <swiper-slide class="carousel5-item" v-for="(page,index) of pages" :key="index">
                            <div class="carousel-explain2" v-for="item of page" :key="item.id" @click="carouselswiper(item)">
                                <img :src="item.path"/>
                                <div class="explain2-div">
                                    <h3>{{item.name}}</h3>
                                    <span class="explain2-span2">{{item.good_at}}</span>
                                </div>
                            </div>
                            </swiper-slide>
                            <div class="swiper-pagination" slot="pagination"></div>
                        </swiper>
                    </div>
                    <el-col class="carousel44">
                        <img src="../assets/image58.png" class="bg-pic5">
                        <div class="nav-contunt-div9">
                            <h2><img src="../assets/yujia.png"/>培训信息</h2>
                            <p class="nav-text">Sometimes beauty is so simple</p>
                            <div class="border-left"></div>
                            <div class="border-right"></div>
                        </div>
                        <img src="../assets/image59.png" class="bg-pic6">
                    </el-col>
                    <el-col :span="24" class="bg-pic7">
                    <div class="nav-contunt-div6">
                        <div class="navcount">
                        <el-carousel height="560px" :interval="5000" arrow="hover" trigger="click" direction="vertical" :autoplay="true">
                        <el-carousel-item v-for="item in newtrains" :key="item.id">
                            <div class="explain3">
                            <div class="explain3-border">
                                <img :src="item.path" class="bg-border-img">
                                <img src="../assets/image62.png" class="bg-border-img2">
                            </div>
                            <div class="explain3-text">
                                <p class="text-p">{{item.theme}}</p>
                                <h4 class="text-h4">{{item.name}}</h4>
                                <p class="text-p2">老师名字：{{item.teacherName}}</p>
                                <div class="text-p3">课程难度：<el-rate :value="item.diff" disabled disabled-void-color="#fff" :colors="['#58B708']"></el-rate></div>
                                <p class="text-p4">开课时间：{{item.startTime}}</p>
                                <img src="../assets/image63.png" class="bg-border-img3">
                                <div class="text-butt">
                                    <el-button type="text" class="text-button" @click="explaindetail(item)">详情</el-button>
                                </div>
                            </div>
                            </div>
                        </el-carousel-item>
                        </el-carousel>
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
                            <img class="nav-div7-img" v-for="(item,index) in clubInfo" :key="index" :src="item.path" @click="ImgItem(item)"/>
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
        newtrains:[],
        famousteach:[],
        clubInfo:[],
        info:[],
        namelist:[],
        banner:'',
        activeClass: 0,
        i:0,
        swiperOption: {
          spaceBetween: 30,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          loop: true,
        },
        swiperOptionData: {
          pagination: ".swiper-pagination",
          autoplay: false,
          loopFillGroupWithBlank: true,
          loop: true,
          navigation: {
            nextEl: '.swiper-button-next1',
            prevEl: '.swiper-button-prev1'
          },
        },
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
      },
      pages2(){
        const pages2 = []; // pages是为二维数组
        this.info.forEach((item, index) => {
          const page2 = Math.floor(index / 4); // page本质是0.1.2.3分别表示第1,2,3,4页
          if (!pages2[page2]) {
            pages2[page2] = [];
          }
          pages2[page2].push(item);
        });
        return pages2;
      },
  },
    created(){
        this.listhomedata();
    },
    methods:{
        selectItem(item,idx){
          this.namelist = item;
          this.activeClass = idx;
      },
        listhomedata(){
        let _this = this;
        this.$request("/home").then(res => {
            _this.famousteach = res.teachers;
            _this.dataimg = res.hot_trains;
            _this.clubInfo = res.clubInfo;
            _this.newtrains = res.new_trains;
            _this.info = res.info;
            _this.namelist=res.info[0];
            _this.banner = res.banner;
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
      buttonprev(m){ 
         this.namelist=m[this.i-1][0];
         this.i--;
      },
      buttonnext(m){
        this.namelist=m[this.i+1][0];
        this.i++;
      },
      explaindetail(item){
          this.$router.push({
            path: "/cultivate/detail",
            query: {
            id: item.id
            }
        });
      },
      Learnmore(item){
          this.$router.push({
            path: "/cultivate/detail",
            query: {
            id: item.id
            }
        });
      },
      ImgItem(item){
        this.$router.push({
            path: "/joinclubhouse/joinclubhousedetails",
            query: {
            id: item.id
            }
        });
      },
      carouselswiper(item){
        this.$router.push({
            path: "/yogoteacher/yogoteacherdetails",
            query: {
            id: item.id
            }
        });
      },
      ViewAll(namelist){
          this.$router.push({
            path: "/yogoinformation/yogoinformationdetails",
            query: {
            id: namelist.lid
            }
        });
      },
    }
};
</script>
<style lang="scss" scoped>
@import "swiper/dist/css/swiper.css";
.el-carousel__button{
    width: 13px !important;
    height: 13px !important;
    border-radius: 50% !important;
}
.swiper-pagination-bullet-active {
    opacity: 1;
    background: #2c2c2c !important;
}
.el-carousel__arrow--right{
    right: 28px !important;
}
.el-carousel__arrow--left{
    left: 28px !important;
}
.el-carousel__arrow{
    position: absolute;
    right: 28px;
}
.swiper-pagination-bullet{
    width: 12px !important;
    height: 12px!important;
    border-radius: 50% !important;
    display: inline-block !important;
    border-radius: 100% !important;
    background: #000 !important;
    opacity: .2 !important;
}
.bg_img {
  width: 100%;
  height: 100%;
  img{
      width: 100%;
      height: 100%;
  }
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
        background-color: #FCFBF1;
        .nav-contunt-div1{
            width: 1200px;
            height: 150px;
            text-align: center;
            margin-top: 20px;
            margin: 0 auto;
            position: relative;
            .border-left{
            width: 20%;
            height: 1px;
            background-color: #dcdcdc;
            position: absolute;
            top: 45%;
            left: 19%;
            }
            .border-right{
                width: 20%;
                height: 1px;
                background-color: #dcdcdc;
                position: absolute;
                right: 19%;
                top: 45%;
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
                font-family:Microsoft YaHei;
                font-weight:bold;
                padding-top: 35px;
                img{
                    width: 28px;
                    height: 28px;
                    position: absolute;
                    left: 42%;
                    top: 25%;
                }
            }
        }
        .bg-pic{
            background-image: url('../assets/image8.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
        .nav-contunt-div2{
            width: 100%;
            height: 640px;
            margin: 0 auto;
            .carousel{
                width: 1257px;
                margin: 0 auto;
                height: 100%;
            .contunt2{
                width: 1200px;
                height: 620px;
                margin: 0 auto;
                background-color: #939EC4;
                opacity: 0.7;
                margin-top: 6%;
                cursor:pointer;
            .carousel-explain{
                height: 350px;
                position: relative;
                .img1{
                    width: 600px;
                    height: 370px;
                    transform: rotate(10deg);
                    -ms-transform: rotate(10deg);
                    -moz-transform: rotate(10deg);
                    -webkit-transform: rotate(10deg);
                    -o-transform: rotate(10deg);
                    position: inherit;
                    left: 0px;
                    top: -24px;
                    }
                .img2{
                       width: 376px;
                        height: 325px;
                        position: absolute;
                        right: 80px;
                        bottom: -23px;
                }
            }
            .carousel-text{
                width: 60%;
                margin-top: -3px;
                margin-left: 37px;
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
                margin-top: 25px;
                .span{
                    width: 60%;
                    color: #fff;
                    font-size: 14px;
                    display: -webkit-box !important;
                    -webkit-box-orient: vertical !important;
                    -webkit-line-clamp: 2 !important;// 限制快级元素的文本行数
                    overflow: hidden !important;
                    margin-left: -65px;
                }
                .carousel-btn{
                    width: 130px;
                    height: 45px;
                    border: solid 1px #ffffff;
                    color: #fff;
                    transition: all 1s;
                }
                .carousel-btn:hover{
                    width: 130px;
                    height: 45px;
                    border: solid 1px #ffffff;
                    color: #fff;
                    transform: scale(.9);
                    background-color: rgba(31,45,61,.11);
                }
            }
        }
        }
    }
        .nav-contunt-div3{
            width: 1200px;
            height: 150px;
            text-align: center;
            margin: 0 auto;
            position: relative;
            .border-left{
            width: 20%;
            height: 1px;
            background-color: #dcdcdc;
            position: absolute;
            top: 45%;
            left: 19%;
            }
            .border-right{
                width: 20%;
                height: 1px;
                background-color: #dcdcdc;
                position: absolute;
                right: 19%;
                top: 45%;
            }
            .nav-text{
                color: #999999;
                font-size: 14px;
                margin-top: 8px;
            }
            h2{
                color: #2c2c2c;
                font-size: 1.4rem;
                padding-top: 24px;
                margin-top: 40px;
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
        .nav-contunt-div4{
            width: 100%;
            margin:0 auto;
            height: 700px;
            margin-top: 15px;
            .contunt3{
                width: 1200px;
                margin: 0 auto;
                height: 624px;
                cursor:pointer;
                .icon{
                    float: left;
                    width: 23%;
                    height: 198px;
                    margin-top: 25px;
                    margin-right:24px;
                    box-shadow: 1px 1px 6px 0px rgba(36, 36, 36, 0.2);
                    background-color: #fff;
                    .icon-img-content{
                        width: 100%;
                        height: 100%;
                        transition: all 1s;
                    }
                    .icon-img-content:hover{
                            width: 100%;
                            height: 100%;
                            transform: scale(1.1)
                        }
                }
                .active {
                    box-shadow:2px 7px 9px 0px rgba(36,36,36,0.2);
                    }
                .yogocontunt-swiper{
                    width: 100%;
                    height: 400px;
                    margin: 0 auto;
                    display: flex;
                    position: relative;
                    .yogoswiper-img{
                        width: 52%;
                        height: 100%;
                        position: relative;
                        .rhomb1{
                            width: 100%;
                            height: 100%;
                            background-color: #E2DBC8;
                            img{
                                width: 100%;
                                height: 100%;
                                }
                        }
                    }
                    .yogoswiper-text{
                        width: 30%;
                        height: 85%;
                        background-color: #fff;
                        opacity: 0.6;
                        position: absolute;
                        bottom: 0%;
                        right: 18%;
                        .yogoswiper-butt{
                            width: 120px;
                            border: 1px solid #1B1B1B;
                            background: #1B1B1B;
                            text-align: center;
                            position: absolute;
                            bottom: 6%;
                            right: 53%;
                            transition: all .8s;
                            .el-button--text{
                                color: #fff;
                                background: 0 0;
                                padding-left: 0;
                                padding-right: 0;
                                width: 100%;
                            }
                        }
                        .yogoswiper-butt:hover{
                            width: 120px;
                            border: 1px solid #130C0C;
                            background: #130C0C;
                            text-align: center;
                            border-radius: 5px;
                            transform: scale(.96);
                        }
                        h3{
                            text-align: left;
                            line-height:30px;
                            color: #2c2c2c;
                            font-size:16px;
                            margin-top:20px;
                            font-family:Source Han Sans CN;
                            font-weight:bold;
                            margin-left: 50px;
                            display: -webkit-box !important;
                            -webkit-box-orient: vertical !important;
                            -webkit-line-clamp:2 !important;// 限制快级元素的文本行数
                            overflow: hidden !important;
                            width: 67%;
                        }
                    }
                    .p1{
                            color: #2c2c2c;
                            font-size: 14px;
                            display: -webkit-box !important;
                            -webkit-box-orient: vertical !important;
                            -webkit-line-clamp:2 !important;// 限制快级元素的文本行数
                            overflow: hidden !important;
                            position: absolute;
                            width: 44%;
                            right: 0%;
                            top: 43%;
                        }
                }
                .swiper-button-prev1{
                        position: absolute;
                        left: 88%;
                        top: 57%;
                        width: 27px;
                        height: 27px;
                        border: 1px solid #e2dbc8;
                        border-radius: 50%;
                        z-index: 10;
                        background-size: 24px 24px;
                        background-color: #fff;
                        transition: all .8s;
                        background-image: url('../assets/left.png');
                }
                .swiper-button-prev1:hover{
                        position: absolute;
                        left: 88%;
                        top: 57%;
                        width: 27px;
                        height: 27px;
                        border: 1px solid #e2dbc8;
                        border-radius: 50%;
                        z-index: 10;
                        background-size: 28px 24px;
                        transform: scale(.9);
                        background-color: #fff;
                        background-image: url('../assets/left.png');
                }
                .swiper-button-prev1:focus{
                    outline: 0;
                }
                .swiper-button-next1{
                        position: absolute;
                        right: 3%;
                        top: 57%;
                        width: 27px;
                        height: 27px;
                        border: 1px solid #e2dbc8;
                        border-radius: 50%;
                        z-index: 10;
                        transition: all .8s;
                        background-size: 24px 24px;
                        background-color: #fff;
                        background-image: url('../assets/right.png');
                }
                .swiper-button-next1:hover{
                        position: absolute;
                        right: 3%;
                        top: 57%;
                        width: 27px;
                        height: 27px;
                        border: 1px solid #e2dbc8;
                        border-radius: 50%;
                        z-index: 10;
                        transform: scale(.9);
                        background-size: 24px 24px;
                        background-color: #fff;
                        background-image: url('../assets/right.png');
                }
                .swiper-button-next1:focus{
                    outline: 0;
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
               width: 1200px !important;
                height: 660px;
                margin: 0 auto;
                cursor:pointer;
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
                        background-color: #DCD9CC;
                        transition: All 1s;
                    }
                    img:hover{
                        width: 160px;
                        height: 160px;
                        border-radius: 50%;
                        margin-top: 18px;
                        background-color: #DCD9CC;
                        transform: scale(.9);
                    }
                    .explain2-div{
                        height: auto;
                        padding-top: 35px;
                        padding-left: 13px;
                        width: 69%;
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
                    height: 227px;
                    float: left;
                    width: 50%;
                    display: flex;
                    img{
                        width: 160px;
                        height: 160px;
                        border-radius: 50%;
                        margin-top: 18px;
                        position: absolute;
                        right: 0%;
                        background-color: #DCD9CC;
                    }
                    .explain2-div{
                        height: auto;
                        padding-top: 35px;
                        text-align: right;
                        width: 69%;
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
        .bg-pic7{
            background-image: url('../assets/image7.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
        .nav-contunt-div6{
            width: 100%;
            height: 660px;
            margin: 0 auto;
            margin-top: 40px;
            .navcount{
                width: 1280px;
                margin: 0 auto;
                height: 100%;
            .explain3{
                width: 1200px;
                margin:0 auto;
                height: 590px;
                display: flex;
                cursor:pointer;
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
                        left: -27%;
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
                        left: -53%;
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
                        display: flex;
                        .el-rate{
                            margin-top: 1px;
                        }
                    }
                     .text-p4{
                        font-size: 14px;
                        color: #2c2c2c;
                        position: absolute;
                        left: 7%;
                        top: 70%;
                    }
                    .text-h4{
                        font-size: 20px;
                        color: #2c2c2c;
                        position: absolute;
                        left: -53%;
                        top: 30%;
                    }
                    .bg-border-img3{
                        width: 134px;
                        height: 34px;
                        position: absolute;
                        top: 40%;
                        right: 0%;
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
                        transition: all 1s;
                        .text-button{
                            color: #2c2c2c;
                            width: 100%;
                        }
                    }
                    .text-butt:hover{
                        width: 122px;
                        height: 53px;
                        background-color: #ffffff;
                        position: absolute;
                        left: 7%;
                        top: 90%;
                        line-height: 52px;
                        text-align: center;
                        border-radius: 5px;
                        transform: scale(.9);
                        .text-button{
                            color: #2c2c2c;
                            font-size: 14px;
                            width: 100%;
                        }
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
                width: 1200px;
                margin:0 auto;
                height: 602px;
                cursor:pointer;
                .nav-div7-img{
                    width: 235px;
                    height: 198px;
                    background-color: #eeeeee;
                    margin-right: 5px;
                    margin-top: 5px;
                    transition: all 1s;
                }
                .nav-div7-img:hover{
                    width: 235px;
                    height: 198px;
                    background-color: #eeeeee;
                    margin-right: 5px;
                    margin-top: 5px;
                    transform: scale(.9);
                }
            }
        }
        .nav-contunt-div10{
            width: 1200px;
            height: 150px;
            text-align: center;
            margin: 0 auto;
            position: relative;
            .border-left{
                width: 20%;
                height: 1px;
                background-color: #ffffff;
                position: absolute;
                top: 41%;
                left: 19%;
            }
            .border-right{
                width: 20%;
                height: 1px;
                background-color: #ffffff;
                position: absolute;
                right: 19%;
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
                font-family:Microsoft YaHei;
                font-weight:bold;
                padding-top: 24px;
                img{
                    width: 28px;
                    height: 28px;
                    position: absolute;
                    left: 42%;
                    top: 18%;
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
            .carousel33{
                width: 1200px;
                margin: 0 auto;
                position: relative;
                .border-left{
                    width: 16%;
                    height: 1px;
                    background-color: #ffffff;
                    position: absolute;
                    left:24%;
                    top: 58%;
                }
                .border-right{
                    width: 16%;
                    height: 1px;
                    background-color: #ffffff;
                    position: absolute;
                    right: 24%;
                    top: 58%;
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
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    img{
                        width: 28px;
                        height: 28px;
                        position: absolute;
                        left: 42%;
                        top: 4%;
                    }
                }
            }
        }
        .carousel44{
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
        .nav-contunt-div9{
            width: 1200px;
            height: 150px;
            text-align: center;
            margin-bottom: 30px;
            margin: 0 auto;
            position: relative;
                .border-left{
                    width: 20%;
                    height: 1px;
                    background-color: #dcdcdc;
                    position: absolute;
                    top: 33%;
                    left: 19%;
                }
                .border-right{
                    width: 20%;
                    height: 1px;
                    background-color: #dcdcdc;
                    position: absolute;
                    right: 19%;
                    top: 33%;
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
                    padding-top: 19px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    img{
                        width: 28px;
                        height: 28px;
                        position: absolute;
                        left: 42%;
                        top: 14%;
                    }
                }
            }
        }
        .bai{
            width: 100%;
            height: 60px;
            background-color: #FCFBF1;
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
