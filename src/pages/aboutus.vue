<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="aboutus-main">
                    <template>
                       <!-- <Banner></Banner> -->
                       <div class="bg_img">
                         <img :src="banner" alt />
                        </div>
                    </template>
                    <div class="aboutus-count">
                        <div class="aboutus-count-div1">
                            <h2><img src="../assets/yujia.png"/>瑜伽照片墙</h2>
                            <p class="nav-text">Sometimes beauty is so simple</p>
                            <div class="border-left"></div>
                            <div class="border-right"></div>
                        </div>
                        <div class="aboutus-count-div2">
                            <div class="Photowall-img1">
                                <div class="Photowall-img1-bottom">
                                    <img class="img1" :src="aboutUs.img1"/>
                                    <img class="img2" :src="aboutUs.img2"/>
                                </div>
                                <div class="Photowall-img1-top">
                                    <img class="img1" :src="aboutUs.img3"/>
                                    <img class="img2" :src="aboutUs.img4"/>
                                </div>
                            </div>
                            <div class="Photowall-img2">
                                <img :src="aboutUs.img5"/>
                            </div>
                            <div class="Photowall-img3">
                                <div class="Photowall-img3-bottom">
                                    <img class="img1" :src="aboutUs.img6"/>
                                    <img class="img2" :src="aboutUs.img7"/>
                                </div>
                                <div class="Photowall-img3-top">
                                    <img class="img1" :src="aboutUs.img8"/>
                                    <img class="img2" :src="aboutUs.img9"/>
                                </div>
                            </div>
                        </div>
                        <el-col :span="24" class="bg-img">
                        <div class="aboutus-count-div3">
                            <h2><img src="../assets/yujia.png"/>瑜伽村平台</h2>
                            <p class="nav-text">Sometimes beauty is so simple</p>
                            <div class="border-left"></div>
                            <div class="border-right"></div>
                        </div>
                         <div class="aboutus-count-div4">
                             <p class="abouts-p">{{aboutUs.intro}}</p>
                        </div>
                         <div class="aboutus-count-div5">
                            <h2><img src="../assets/yujia.png"/>瑜伽村群分布范围</h2>
                            <p class="nav-text">Sometimes beauty is so simple</p>
                            <div class="border-left"></div>
                            <div class="border-right"></div>
                        </div>
                         <div class="aboutus-count-div6">
                             <p class="abouts-p2">{{aboutUs.range}}</p>
                        </div>
                        <div class="aboutus-count-div7">
                            <h2><img src="../assets/yujia.png"/>瑜伽村网络板块</h2>
                            <p class="nav-text">Sometimes beauty is so simple</p>
                            <div class="border-left"></div>
                            <div class="border-right"></div>
                        </div>
                         <div class="aboutus-count-div8">
                             <div class="aboutus-content">
                                 <div class="content-img" v-for="(item,index) in aboutusmodel" :key="index">
                                     <img :src="item.url_pic"/>
                                     <h3>{{item.name}}</h3>
                                     <p>{{item.describe}}</p>
                                 </div>
                             </div>
                        </div>
                        </el-col>
                        <el-col class="bg-div">
                            <img class="bg-img2" src="../assets/image49.png"/>
                        <div class="aboutus-count-div9">
                            <h2><img src="../assets/yujia.png"/>联系方式</h2>
                            <p class="nav-text">Sometimes beauty is so simple</p>
                            <div class="border-left"></div>
                            <div class="border-right"></div>
                        </div>
                        </el-col>
                         <div class="aboutus-count-div10">
                             <div class="aboutus-foo">
                             <div class="codeimg">
                                 <img :src="aboutUs.url_pic"/>
                             </div>
                             <div class="codetext">
                                 <p class="p1">地址：{{aboutUs.address}}</p>
                                 <p class="p2">电话：{{aboutUs.tel}}</p>
                                 <p class="p3">YOGA</p>
                             </div>
                             </div>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import Banner from "../components/banner";
export default {
  components:{
    Banner,
  },
  data() {
    return {
        aboutUs:"",
        aboutusmodel:[],
        imgpic:[],
        banner:''
    };
  },
  created(){
      this.listhomedata();
  },
   methods:{
        listhomedata(){
        let _this = this;
        this.$request("/aboutUs").then(res => {
            _this.aboutUs = res;
            _this.aboutusmodel = res.about_us_model;
            _this.imgpic = res.img_pic;
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
    }
};
</script>
<style lang="scss" scope>
.bg_img {
  width: 100%;
  height: 100%;
  img{
      width: 100%;
      height: 100%;
  }
}
.aboutus-main{
    width: 100%;
    height: 100%;
    margin:0 auto;
    overflow: hidden;
    .aboutus-count{
        width: 100%;
        margin: 0 auto;
        height: 100%;
        display: inline-block;
        .aboutus-count-div1{
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
                left:19%;
                top: 41%;
            }
            .border-right{
                width: 20%;
                height: 1px;
                background-color: #dcdcdc;
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
                margin-top: 20px;
                font-family:Microsoft YaHei;
                font-weight:bold;
                padding-top: 24px;
                img{
                    width: 28px;
                    height: 28px;
                    position: absolute;
                    left: 42%;
                }
            }
        }
        .aboutus-count-div2{
            width: 100%;
            height: 540px;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            cursor: pointer;
            .Photowall-img1{
                .Photowall-img1-bottom{
                    display: flex;
                    .img1{
                        width: 51%;
                        height: 268px;
                        margin-right: 5px;
                    }
                    .img2{
                        width: 47%;
                        height: 268px;
                        margin-right: 7px;
                    }
                }
                .Photowall-img1-top{
                    display: flex;
                    .img1{
                        width:63%;
                        height:268px;
                        margin-right: 7px;
                        margin-top: 5px;
                    }
                    .img2{
                        width:34%;
                        height:268px;
                        margin-top: 5px;
                        margin-right: 7px;
                    }
                }
            }
            .Photowall-img2{
                img{
                    width: 390px;
                    height: 100%;
                    margin-right: 7px;
                }
            }
            .Photowall-img3{
                .Photowall-img3-bottom{
                    display: flex;
                    .img1{
                        width:64%;
                        height:268px;
                        margin-right: 5px;
                    }
                    .img2{
                        width:35%;
                        height:268px;
                    }
                }
                .Photowall-img3-top{
                    display: flex;
                    .img1{
                        width:51%;
                        height:268px;
                        margin-right: 5px;
                        margin-top: 5px;
                    }
                    .img2{
                        width: 48%;
                        height: 268px;
                        margin-top: 5px;
                    }
                }
            }
        }
        .bg-img{
            background-image: url('../assets/image48.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
         .aboutus-count-div3{
            width: 1200px;
            height: 150px;
            text-align: center;
            margin: 0 auto;
            margin-top: 30px;
            position: relative;
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
                padding-top:24px;
                font-family:Microsoft YaHei;
                font-weight:bold;
                img{
                    width: 28px;
                    height: 28px;
                    position: absolute;
                    left: 42%;
                }
            }
        }
        .aboutus-count-div4{
            width: 1200px;
            height: 155px;
            line-height: 0px;
            margin: 0 auto;
            .abouts-p{
                text-align: center;
                font-size: 14px;
                color: #2c2c2c;
                width: 90%;
                margin: 0 auto;
                padding-top: 3%;
            }
        }
        .aboutus-count-div5{
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
                left:16%;
                top: 41%;
            }
            .border-right{
                width: 20%;
                height: 1px;
                background-color: #dcdcdc;
                position: absolute;
                right: 16%;
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
                font-family:Microsoft YaHei;
                font-weight:bold;
                padding-top: 24px;
                img{
                    width: 28px;
                    height: 28px;
                    position: absolute;
                    left: 38%;
                }
            }
        }
        .aboutus-count-div6{
            width: 1200px;
            height: 155px;
            margin: 0 auto;
            line-height: 0px;
            .abouts-p2{
                text-align: center;
                font-size: 14px;
                color: #2c2c2c;
                width: 90%;
                margin: 0 auto;
                padding-top: 3%;
            }
        }
        .aboutus-count-div7{
            width: 1200px;
            height: 150px;
            margin: 0 auto;
            text-align: center;
            position: relative;
            .border-left{
                width: 20%;
                height: 1px;
                background-color: #dcdcdc;
                position: absolute;
                left:17%;
                top: 41%;
            }
            .border-right{
                width: 20%;
                height: 1px;
                background-color: #dcdcdc;
                position: absolute;
                right: 17%;
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
                    left: 39%;
                }
            }
        }
        .aboutus-count-div8{
            width: 100%;
            height: 600px;
            margin: 0 auto;
            .aboutus-content{
                width: 1200px;
                height: 100%;
                margin: 0 auto;
                display: flex;
                position: relative;
                cursor: pointer;
                .content-img{
                    width: 220px;
                    height: 220px;
                    position:absolute;
                    top: 10%;
                    right: 83%;
                    img{
                        width: 155px;
                        height: 155px;
                        border-radius: 50%;
                        margin: 10px 33px auto;
                    }
                    h3{
                        text-align: center;
                        font-size: 16px;
                        color: #2c2c2c;
                        margin-top: 14px;
                    }
                    p{
                        text-align: center;
                        font-size: 14px;
                        color: #999999;
                    }
                }
                .content-img:nth-child(2){
                    width: 220px;
                    height: 220px;
                    position:absolute;
                    top: 52%;
                    right: 68%;
                    img{
                        width: 155px;
                        height: 155px;
                        border-radius: 50%;
                        margin: 10px 33px auto;
                    }
                    h3{
                        text-align: center;
                        font-size: 16px;
                        color: #2c2c2c;
                        margin-top: 14px;
                    }
                    p{
                        text-align: center;
                        font-size: 14px;
                        color: #999999;
                    }
                }
                .content-img:nth-child(3){
                    width: 220px;
                    height: 220px;
                    position:absolute;
                    top: 13%;
                    right: 52%;
                    img{
                        width: 155px;
                        height: 155px;
                        border-radius: 50%;
                        margin: 10px 33px auto;
                    }
                    h3{
                        text-align: center;
                        font-size: 16px;
                        color: #2c2c2c;
                        margin-top: 14px;
                    }
                    p{
                        text-align: center;
                        font-size: 14px;
                        color: #999999;
                    }
                }
                .content-img:nth-child(4){
                    width: 220px;
                    height: 220px;
                    position:absolute;
                    top: 42%;
                    right: 31%;
                    img{
                        width: 155px;
                        height: 155px;
                        border-radius: 50%;
                        margin: 10px 33px auto;
                    }
                    h3{
                        text-align: center;
                        font-size: 16px;
                        color: #2c2c2c;
                        margin-top: 14px;
                    }
                    p{
                        text-align: center;
                        font-size: 14px;
                        color: #999999;
                    }
                }
                .content-img:nth-child(5){
                    width: 220px;
                    height: 220px;
                    position:absolute;
                    top: 1%;
                    right: 17%;
                    img{
                        width: 155px;
                        height: 155px;
                        border-radius: 50%;
                        margin: 10px 33px auto;
                    }
                    h3{
                        text-align: center;
                        font-size: 16px;
                        color: #2c2c2c;
                        margin-top: 14px;
                    }
                    p{
                        text-align: center;
                        font-size: 14px;
                        color: #999999;
                    }
                }
                .content-img:nth-child(6){
                    width: 220px;
                    height: 220px;
                    position:absolute;
                    top: 51%;
                    right: 0%;
                    img{
                        width: 155px;
                        height: 155px;
                        border-radius: 50%;
                        margin: 10px 33px auto;
                    }
                    h3{
                        text-align: center;
                        font-size: 16px;
                        color: #2c2c2c;
                        margin-top: 14px;
                    }
                    p{
                        text-align: center;
                        font-size: 14px;
                        color: #999999;
                    }
                }
            }
        }
    }
     .bg-div{
         position: relative;
         .bg-img2{
                width: 444px;
                height: 210px;
                position: absolute;
                left: 0%;
                top: -60%;
            }
        .aboutus-count-div9{
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
                left:19%;
                top: 45%;
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
                padding-top: 24px;
                font-family:Microsoft YaHei;
                font-weight:bold;
                img{
                    width: 28px;
                    height: 28px;
                    position: absolute;
                    left: 42%;
                }
            }
        }
    }
        .aboutus-count-div10{
            width: 100%;
            height: 405px;
            margin: 0 auto;
            display: flex;
            background-image: url('../assets/image46.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
            cursor: pointer;
            .aboutus-foo{
                width: 1200px;
                margin: 0 auto;
                height: 100%;
                display: flex;
                .codeimg{
                    width: 229px;
                    height: 229px;
                    margin-left: 10%;
                    margin-top: 74px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .codetext{
                    width:493px;
                    height:196px;
                    margin-top: 17px;
                    background:rgba(49,49,49,1);
                    opacity:0.9;
                    margin-top: 90px;
                    .p1{
                        font-size: 14px;
                        color: #ffffff;
                        padding-left: 50px;
                        margin-top: 50px;
                    }
                    .p2{
                        font-size: 14px;
                        color: #ffffff;
                        padding-left: 50px;
                        margin-top: 20px;
                    }
                    .p3{
                        font-size: 5rem;
                        color: #fff;
                        opacity: 0.2;
                        padding-left: 46px;
                    }
                }
            }
        }
    }
}
</style>