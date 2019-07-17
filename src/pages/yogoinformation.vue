<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="formation-main">
                    <template>
                       <Nav></Nav>
                    </template>
                    <div class="formation-count">
                        <div class="kongbai"></div>
                        <div class="formation-count-div1">
                            <div class="count-img">
                               <div class="border"></div>
                               <h4>明星瑜伽TOP榜</h4>
                                <p class="span-title">2018-01-30</p>
                                <p class="p-title">编者：IVAN</p>
                                <p class="p-desc">这两年在娱乐圈刮起了一阵瑜伽风。如果你长期混迹各路当红女明星的微博之中，就不难发现，她们不再迷恋于上传大片、美照，而是甩掉偶像包袱，素颜、扮丑等等...</p>
                                <div  class="count-button-but">
                                    <el-button type="text">查看全部</el-button>
                                </div>
                                <div class="border2"></div>
                                <div class="count-button-right">
                                    <img class="img1" src="../assets/share.png"/>
                                    <img class="img2" src="../assets/eye.png"/>
                                    <span class="span3">12314</span>
                                </div>
                            </div>
                            <div class="count-desc">
                                <div class="desc-img1">
                                    <img src="../assets/153_140620153629_2.jpg"/>
                                </div>
                                <div class="desc-img2">
                                    <img src="../assets/153_140620153629_2.jpg"/>
                                </div>
                            </div>
                        </div>
                        <div class="formation-count-div2">
                            <div class="count-desc">
                                <div class="desc-img1">
                                    <img src="../assets/ss.png"/>
                                </div>
                            </div>
                            <div class="count-img">
                               <div class="border"></div>
                               <h4>瑜伽顶级人物的动作，简直看呆了！</h4>
                                <p class="span-title">2018-01-30</p>
                                <p class="p-title">编者：IVAN</p>
                                <p class="p-desc">这两年在娱乐圈刮起了一阵瑜伽风。如果你长期混迹各路当红女明星的微博之中，就不难发现，她们不再迷恋于上传大片、美照，而是甩掉偶像包袱，素颜、扮丑等等...</p>
                                <div  class="count-button-but">
                                    <el-button type="text">查看全部</el-button>
                                </div>
                                <div class="border2"></div>
                                <div class="count-button-right">
                                    <img class="img1" src="../assets/share.png"/>
                                    <img class="img2" src="../assets/eye.png"/>
                                    <span class="span3">6543</span>
                                </div>
                            </div>
                        </div>
                        <div class="formation-count-div3">
                            <div class="count-img">
                               <div class="border"></div>
                               <h4>胡可深圳学孕期瑜伽 称将与沙溢夫妻双修</h4>
                                <p class="span-title">2018-01-30</p>
                                <p class="p-title">编者：IVAN</p>
                                <p class="p-desc">这两年在娱乐圈刮起了一阵瑜伽风。如果你长期混迹各路当红女明星的微博之中，就不难发现，她们不再迷恋于上传大片、美照，而是甩掉偶像包袱，素颜、扮丑等等...</p>
                                <div  class="count-button-but">
                                    <el-button type="text">查看全部</el-button>
                                </div>
                                <div class="border2"></div>
                                <div class="count-button-right">
                                    <img class="img1" src="../assets/share.png"/>
                                    <img class="img2" src="../assets/eye.png"/>
                                    <span class="span3">2442</span>
                                </div>
                            </div>
                            <div class="count-desc">
                                <div class="desc-img1">
                                    <img src="../assets/172901eaaci443syyscwzw.jpg"/>
                                </div>
                                <div class="desc-img2">
                                    <img src="../assets/172901eaaci443syyscwzw.jpg"/>
                                </div>
                            </div>
                        </div>
                        <div class="kongbai"></div>
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
.formation-main{
    width: 100%;
    height: 100%;
    margin:0 auto;
    overflow: hidden;
    .formation-count{
        width: 100%;
        margin: 0 auto;
        height: 100%;
        display: inline-block;
        .kongbai{
            width: 100%;
            height: 130px;
        }
        .formation-count-div1{
            width: 100%;
            height:606px;
            margin: 0 auto;
            display: flex;
            justify-content: space-around;
            background-color: #eeeeee;
           .count-img{
                width: 28%;
                height: 84%;
                margin: 38px;
                .border{
                    width: 100%;
                    height: 5px;
                    background-color: #2C2C2C;
                }
                .border2{
                    width: 100%;
                    height: 2px;
                    background-color: #2c2c2c;
                    margin-top: 50px;
                }
                h4{
                    width: 100%;
                    text-align: left;
                    margin: 0 auto;
                    font-size: 18px;
                    color: #2c2c2c;
                    line-height: 60px;
                }
                .span-title{
                    width: 100%;
                    text-align: left;
                    margin: 0 auto;
                    font-size: 14px;
                    color: #2c2c2c;
                   line-height: 30px;
                }
                .p-title{
                    width: 100%;
                    text-align: left;
                    margin: 0 auto;
                    font-size: 14px;
                    color: #2c2c2c;
                }
                .p-desc{
                    width: 100%;
                    text-align: left;
                    margin: 0 auto;
                    font-size: 14px;
                    color: #2c2c2c;
                    line-height: 28px;
                    margin-top: 43px;
                }
                .count-button-but{
                        width: 110px;
                        height: 36px;
                        text-align: center;
                        line-height: 36px;
                        margin-top: 85px;
                        background-color:#313131; 
                        .el-button--text{
                            color: #fff;
                        }
                    }
                    .count-button-right{
                        font-size: 18px;
                        margin-top: 20px;
                        position: relative;
                        .img1{
                            width: 27px;
                            height: 20px;
                            position: absolute;
                            top: 0px;
                            left: 0%;
                        }
                        .img2{
                            width: 30px;
                            height: 25px;
                            position: absolute;
                            bottom: -22px;
                            left: 13%;
                        }
                        .span3{
                            position: absolute;
                            left: 22%;
                        }
                    }
            }
            .count-desc{
                width: 33%;
                height: 84%;
                margin-top: 38px;
                background-color: #eeeeee;
                position: relative;
                margin-left: -26%;
                .desc-img1{
                    width: 100%;
                    height: 443px;
                    position: relative;
                    top: -18%;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .desc-img2{
                    width: 103px;
                    height: 103px;
                    margin-top: -79px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
        .formation-count-div2{
            width: 100%;
            height:660px;
            margin: 0 auto;
            display: flex;
            justify-content: space-around;
            background-color: #ffffff;
           .count-img{
                width: 28%;
                height: 473px;
                margin: 38px;
                margin-left: -22%;
                .border{
                    width: 100%;
                    height: 5px;
                    background-color: #2C2C2C;
                }
                .border2{
                    width: 100%;
                    height: 2px;
                    background-color: #2c2c2c;
                    margin-top: 50px;
                }
                h4{
                    width: 100%;
                    text-align: left;
                    margin: 0 auto;
                    font-size: 18px;
                    color: #2c2c2c;
                    line-height: 60px;
                }
                .span-title{
                    width: 100%;
                    text-align: left;
                    margin: 0 auto;
                    font-size: 14px;
                    color: #2c2c2c;
                   line-height: 30px;
                }
                .p-title{
                    width: 100%;
                    text-align: left;
                    margin: 0 auto;
                    font-size: 14px;
                    color: #2c2c2c;
                }
                .p-desc{
                    width: 100%;
                    text-align: left;
                    margin: 0 auto;
                    font-size: 14px;
                    color: #2c2c2c;
                    line-height: 28px;
                    margin-top: 43px;
                }
                .count-button-but{
                        width: 110px;
                        height: 36px;
                        text-align: center;
                        line-height: 36px;
                        margin-top: 85px;
                        background-color:#313131; 
                        .el-button--text{
                            color: #fff;
                        }
                    }
                    .count-button-right{
                        font-size: 18px;
                        margin-top: 20px;
                        position: relative;
                        .img1{
                            width: 27px;
                            height: 20px;
                            position: absolute;
                            top: 0px;
                            left: 0%;
                        }
                        .img2{
                            width: 30px;
                            height: 25px;
                            position: absolute;
                            bottom: -22px;
                            left: 13%;
                        }
                        .span3{
                            position: absolute;
                            left: 22%;
                        }
                    }
            }
            .count-desc{
                width: 40%;
                height: 473px;
                margin-top: 38px;
                background-color: #eeeeee;
                position: relative;
                .desc-img1{
                    width: 100%;
                    height: 100%;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
        .formation-count-div3{
            width: 100%;
            height:606px;
            margin: 0 auto;
            display: flex;
            justify-content: space-around;
            background-color: #eeeeee;
           .count-img{
                width: 28%;
                height: 84%;
                margin: 38px;
                .border{
                    width: 100%;
                    height: 5px;
                    background-color: #2C2C2C;
                }
                .border2{
                    width: 100%;
                    height: 2px;
                    background-color: #2c2c2c;
                    margin-top: 50px;
                }
                h4{
                    width: 100%;
                    text-align: left;
                    margin: 0 auto;
                    font-size: 18px;
                    color: #2c2c2c;
                    line-height: 60px;
                }
                .span-title{
                    width: 100%;
                    text-align: left;
                    margin: 0 auto;
                    font-size: 14px;
                    color: #2c2c2c;
                   line-height: 30px;
                }
                .p-title{
                    width: 100%;
                    text-align: left;
                    margin: 0 auto;
                    font-size: 14px;
                    color: #2c2c2c;
                }
                .p-desc{
                    width: 100%;
                    text-align: left;
                    margin: 0 auto;
                    font-size: 14px;
                    color: #2c2c2c;
                    line-height: 28px;
                    margin-top: 43px;
                }
                .count-button-but{
                        width: 110px;
                        height: 36px;
                        text-align: center;
                        line-height: 36px;
                        margin-top: 85px;
                        background-color:#313131; 
                        .el-button--text{
                            color: #fff;
                        }
                    }
                    .count-button-right{
                        font-size: 18px;
                        margin-top: 20px;
                        position: relative;
                        .img1{
                            width: 27px;
                            height: 20px;
                            position: absolute;
                            top: 0px;
                            left: 0%;
                        }
                        .img2{
                            width: 30px;
                            height: 25px;
                            position: absolute;
                            bottom: -22px;
                            left: 13%;
                        }
                        .span3{
                            position: absolute;
                            left: 22%;
                        }
                    }
            }
            .count-desc{
                width: 33%;
                height: 84%;
                margin-top: 38px;
                background-color: #eeeeee;
                position: relative;
                margin-left: -26%;
                .desc-img1{
                    width: 100%;
                    height: 443px;
                    position: relative;
                    top: -18%;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .desc-img2{
                    width: 103px;
                    height: 103px;
                    margin-top: -79px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
}
</style>