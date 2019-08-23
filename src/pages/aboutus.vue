<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="aboutus-main">
                    <template>
                       <Banner></Banner>
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
                                    <img class="img1" :src="imgpic[0].url_pic" v-if="imgpic[0].url_pic"/>
                                    <img class="img2" :src="imgpic[1].url_pic" v-if="imgpic[1].url_pic"/>
                                </div>
                                <div class="Photowall-img1-top">
                                    <img class="img1" :src="imgpic[2].url_pic" v-if="imgpic[2].url_pic"/>
                                    <img class="img2" :src="imgpic[3].url_pic" v-if="imgpic[3].url_pic"/>
                                </div>
                            </div>
                            <div class="Photowall-img2">
                                <img :src="imgpic[4].url_pic" v-if="imgpic[4].url_pic"/>
                            </div>
                            <div class="Photowall-img3">
                                <div class="Photowall-img3-bottom">
                                    <img class="img1" :src="imgpic[5].url_pic" v-if="imgpic[5].url_pic"/>
                                    <img class="img2" :src="imgpic[6].url_pic" v-if="imgpic[6].url_pic"/>
                                </div>
                                <div class="Photowall-img3-top">
                                    <img class="img1" :src="imgpic[7].url_pic" v-if="imgpic[7].url_pic"/>
                                    <img class="img2" :src="imgpic[8].url_pic" v-if="imgpic[8].url_pic"/>
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
                        <div class="aboutus-count-div9">
                            <img class="bg-img2" src="../assets/image49.png"/>
                            <h2><img src="../assets/yujia.png"/>联系方式</h2>
                            <p class="nav-text">Sometimes beauty is so simple</p>
                            <div class="border-left"></div>
                            <div class="border-right"></div>
                        </div>
                         <div class="aboutus-count-div10">
                             <div class="codeimg">
                                 <img :src="aboutUs.url_pic"/>
                             </div>
                             <div class="codetext">
                                 <p class="p1">地址：{{aboutUs.address}}</p>
                                 <p class="p2">电话：{{aboutUs.tel}}</p>
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
        imgpic:[]
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
        .aboutus-count-div2{
            width: 100%;
            height: 540px;
            margin: 0 auto;
            display: flex;
            justify-content: center;
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
            width: 100%;
            height: 150px;
            text-align: center;
            display: inline-block;
            margin-top: 30px;
            position: relative;
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
        .aboutus-count-div4{
            width: 100%;
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
        .aboutus-count-div6{
            width: 100%;
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
            width: 100%;
            height: 150px;
            display: inline-block;
            text-align: center;
            position: relative;
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
        .aboutus-count-div8{
            width: 100%;
            height: 600px;
            margin: 0 auto;
            .aboutus-content{
                width: 80%;
                height: 100%;
                margin: 0 auto;
                display: flex;
                position: relative;
                .content-img{
                    width: 220px;
                    height: 220px;
                    position:absolute;
                    top: 10%;
                    right: 80%;
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
                    top: 50%;
                    right: 67%;
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
                    top: 40%;
                    right: 34%;
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
                    right: 19%;
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
                    right: 6%;
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
        .aboutus-count-div9{
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
            .bg-img2{
                width: 444px;
                height: 210px;
                position: absolute;
                left: 0%;
                top: -60%;
            }
        }
        .aboutus-count-div10{
            width: 100%;
            height: 405px;
            margin: 0 auto;
            display: flex;
            background-image: url('../assets/image46.png');
            background-repeat: no-repeat;
            background-size: cover;
            .codeimg{
                width: 229px;
                height: 229px;
                margin-left: 24%;
                margin-top: 74px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .codetext{
                width:618px;
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
                }
            }
        }
    }
}
</style>