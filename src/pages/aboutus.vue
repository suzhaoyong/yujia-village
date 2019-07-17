<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="aboutus-main">
                    <template>
                       <Nav></Nav>
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
                                    <img class="img1" src="../assets/153_140620153629_2.jpg"/>
                                    <img class="img2" src="../assets/172901eaaci443syyscwzw.jpg"/>
                                </div>
                                <div class="Photowall-img1-top">
                                    <img class="img1" src="../assets/16394929757_1920x1080.jpg"/>
                                    <img class="img2" src="../assets/172901eaaci443syyscwzw.jpg"/>
                                </div>
                            </div>
                            <div class="Photowall-img2">
                                <img src="../assets/153_140620153629_2.jpg"/>
                            </div>
                            <div class="Photowall-img3">
                                <div class="Photowall-img3-bottom">
                                    <img class="img1" src="../assets/eyucCpbjxAvtwAe.jpg"/>
                                    <img class="img2" src="../assets/172901eaaci443syyscwzw.jpg"/>
                                </div>
                                <div class="Photowall-img3-top">
                                    <img class="img1" src="../assets/16394929757_1920x1080.jpg"/>
                                    <img class="img2" src="../assets/172901eaaci443syyscwzw.jpg"/>
                                </div>
                            </div>
                        </div>
                        <div class="aboutus-count-div3">
                            <h2><img src="../assets/yujia.png"/>瑜伽村平台</h2>
                            <p class="nav-text">Sometimes beauty is so simple</p>
                            <div class="border-left"></div>
                            <div class="border-right"></div>
                        </div>
                         <div class="aboutus-count-div4">
                             <p class="abouts-p">瑜伽村网络平台，是有几万人的公共平台、门户网站、微信群、QQ群、论坛组成的近十万用户的瑜伽多元网络平台。致力于做全国最大、最全、信息最丰富的瑜伽资讯平台。</p>
                        </div>
                         <div class="aboutus-count-div5">
                            <h2><img src="../assets/yujia.png"/>瑜伽村群分布范围</h2>
                            <p class="nav-text">Sometimes beauty is so simple</p>
                            <div class="border-left"></div>
                            <div class="border-right"></div>
                        </div>
                         <div class="aboutus-count-div6">
                             <p class="abouts-p2">瑜伽村网络平台，是有几万人的公共平台、门户网站、微信群、QQ群、论坛组成的近十万用户的瑜伽多元网络平台。</p>
                        </div>
                        <div class="aboutus-count-div7">
                            <h2><img src="../assets/yujia.png"/>瑜伽村网络板块</h2>
                            <p class="nav-text">Sometimes beauty is so simple</p>
                            <div class="border-left"></div>
                            <div class="border-right"></div>
                        </div>
                         <div class="aboutus-count-div8">
                             <div class="aboutus-content">
                                 <div class="content-img">
                                     <img src="../assets/153_140620153629_2.jpg"/>
                                     <h3>培训信息</h3>
                                     <p>发布、搜索全国最新培训信息</p>
                                 </div>
                                  <div class="content-img">
                                     <img src="../assets/172901eaaci443syyscwzw.jpg"/>
                                     <h3>瑜伽会所展示</h3>
                                     <p>展示瑜伽馆信息及发布招聘信息</p>
                                 </div>
                                  <div class="content-img">
                                     <img src="../assets/16394929757_1920x1080.jpg"/>
                                     <h3>瑜伽老师展示及求职</h3>
                                     <p>展示瑜伽馆信息及发布招聘信息</p>
                                 </div>
                                  <div class="content-img">
                                     <img src="../assets/eyucCpbjxAvtwAe.jpg"/>
                                     <h3>容瑜伽知识学习</h3>
                                     <p>展示瑜伽馆信息及发布招聘信息</p>
                                 </div>
                                  <div class="content-img">
                                     <img src="../assets/172901eaaci443syyscwzw.jpg"/>
                                     <h3>瑜伽视频</h3>
                                     <p>开放平台，供大家发布学习视频</p>
                                 </div>
                                  <div class="content-img">
                                     <img src="../assets/16394929757_1920x1080.jpg"/>
                                     <h3>瑜伽新闻</h3>
                                     <p>最新的瑜伽行业时讯</p>
                                 </div>
                             </div>
                        </div>
                        <div class="aboutus-count-div9">
                            <h2><img src="../assets/yujia.png"/>联系方式</h2>
                            <p class="nav-text">Sometimes beauty is so simple</p>
                            <div class="border-left"></div>
                            <div class="border-right"></div>
                        </div>
                         <div class="aboutus-count-div10">
                             <div class="codeimg">
                                 <img src="../assets/153_140620153629_2.jpg"/>
                             </div>
                             <div class="codetext">
                                 <p class="p1">地址：上海长宁区愚园路716号三楼</p>
                                 <p class="p2">电话：4001007191</p>
                             </div>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import Nav from "../components/nav";
export default {
  components:{
    Nav,
  },
  data() {
    return {
    };
  },
  methods:{
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
            border: 1px solid;
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
         .aboutus-count-div3{
            width: 100%;
            height: 150px;
            text-align: center;
            border: 1px solid;
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
            height: 160px;
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
            border: 1px solid;
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
            height: 160px;
            margin: 0 auto;
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
            text-align: center;
            border: 1px solid;
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
                    }
                    p{
                        text-align: center;
                        font-size: 14px;
                        color: #999999;
                    }
                }
            }
        }
        .aboutus-count-div9{
            width: 100%;
            height: 150px;
            text-align: center;
            border: 1px solid;
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
                img{
                    width: 28px;
                    height: 28px;
                    position: absolute;
                    left: 44%;
                }
            }
        }
        .aboutus-count-div10{
            width: 100%;
            height: 405px;
            margin: 0 auto;
            display: flex;
            background-image: url('../assets/172901eaaci443syyscwzw.jpg');
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