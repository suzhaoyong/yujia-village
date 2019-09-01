<template>
    <el-col :span="24">
        <div class="yogoteacher-main">
            <div class="yogoteacher-count-div1">
                <div class="count-img">
                    <img src="../assets/image80.png" class="img1"/>
                    <div class="count-div">
                    <div class="count-name">
                        <span class="span1">瑜伽名师<span class="span2"> — vivi</span></span>
                    </div>
                    <img src="../assets/image81.png" class="count-name-img"/>
                    </div>
                </div>
            </div>
            <div class="yogoteacher-count-div2">
                <img src="../assets/image83.png" class="count-name-img2"/>
            </div>
            <div class="yogoteacher-count-div3">
                <div class="yogofigcaption">
                    <img src="../assets/image82.png" class="count-name-img3"/>
                    <div class="yogofigcaption-title">
                        <h2>个人简介</h2>
                        <p class="p1">Good at courses</p>
                        <p class="p2">擅长课程：擅长课程：理疗修复、传统瑜伽、体态调整</p>
                        <p class="p3">课程特色：将传统瑜伽、艾扬格、功能理疗结合成有特色的一对一私教课；累计课时超过5000小时多年的瑜伽练习带来身体和心理层面的巨大收获。在不断实践与学习中，更加笃定的去做瑜伽的传播者；信奉瑜伽即生活；</p>
                    </div>
                </div>
            </div>
            <div class="yogoteacher-count-div4">
                <div class="yogo-cont-div4">
                    <h2>名师个人SHOW</h2>
                    <p class="nav-text">PERSONAL DISPLAY</p>
                    <div class="border-left"></div>
                    <div class="border-right"></div>
                </div>
                <div class="yogo-cont-show">
                    <div class="showlist" v-for="(item,index) in showList" :key="index">
                        <div class="showimg">
                           <img :src="item.imgurl" class="showimg1"/>
                        </div>
                        <div class="showtext">
                            <span class="show-span">{{item.name}}</span>
                        </div>
                    </div>
                </div>
                <img src="../assets/image85.png" class="count-name-img5"/>
            </div>
        </div>
    </el-col>
</template>
<script>
export default {
  data() {
    return {
        showList:[{
            id:1,
            imgurl:require('../assets/image82.png'),
            name:'普拉提'
        },
        {
            id:2,
            imgurl:require('../assets/image82.png'),
            name:'普拉提'
        },
        {
            id:3,
            imgurl:require('../assets/image82.png'),
            name:'普拉提'
        }]
    };
  },
  methods:{
  }
};
</script>
<style lang="scss" scope>
.yogoteacher-main{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    .yogoteacher-count-div1{
        width: 100%;
        height: auto;
        margin: 0 auto;
        .count-img{
            width: 100%;
            height: 1315px;
            position: relative;
            cursor: pointer;
            .img1{
                width: 100%;
                height: 100%;
                position: absolute;
            }
            .count-div{
                width: 1200px;
                margin: 0 auto;
                height: 100%;
                position: relative;
            .count-name{
                width: 80%;
                margin: 0 auto;
                border: 2px solid #AD8C66;
                height: 192px;
                position: absolute;
                bottom: 14%;
                right: 120px;
                transition: all 1s;
                text-align: center;
                .span1{
                    font-size:7rem;
                    font-family:Gulim;
                    font-weight:400;
                    font-style:italic;
                    color: #C19765;
                    .span2{
                        font-size:7rem;
                        font-family:Gulim;
                        font-weight:400;
                        font-style:italic;
                        color: #ffffff;
                    }
                }
            }
            .count-name:hover{
                width: 80%;
                margin: 0 auto;
                border: 2px solid #AD8C66;
                height: 192px;
                position: absolute;
                bottom: 14%;
                right: 120px;
                transform: scale(.97);
                text-align: center;
                .span1{
                    font-size:7rem;
                    font-family:Gulim;
                    font-weight:400;
                    font-style:italic;
                    color: #C19765;
                    .span2{
                        font-size:7rem;
                        font-family:Gulim;
                        font-weight:400;
                        font-style:italic;
                        color: #ffffff;
                    }
                }
            }
            .count-name-img{
                width: 500px;
                height: 691px;
                position: absolute;
                top: 10%;
            }
         }
        }
    }
    .yogoteacher-count-div2{
        width: 100%;
        height: 210px;
        .count-name-img2{
            width: 100%;
            height: 100%;
        }
    }
    .yogoteacher-count-div3{
        width: 100%;
        height: 754px;
        cursor: pointer;
        background-color: #282828;
        .yogofigcaption{
            width: 1200px;
            height: 100%;
            margin:0 auto;
            display: flex;
            position: relative;
            .count-name-img3{
                width: 566px;
                height: 782px;
                position: absolute;
                bottom: 14%;
           }
           .yogofigcaption-title{
               width: 45%;
               height: 600px;
               position: absolute;
               right: 0;
               h2{
                    font-size:2.5rem;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    color: #fff;
                    margin-top: 15%;
               }
               .p1{
                   color: #fff;
                   font-size: 1.5rem;
                   font-family:Microsoft YaHei;
               }
               .p2{
                   color: #fff;
                   font-size: 20px;
                   font-family:Microsoft YaHei;
                   margin-top: 10%;
               }
               .p3{
                   color: #fff;
                   font-size: 20px;
                   font-family:Microsoft YaHei;
               }
           }
        }
    }
    .yogoteacher-count-div4{
        width: 100%;
        height: 903px;
        background-image: url('../assets/image84.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: relative;
        .yogo-cont-div4{
            width: 1200px;
            height: 200px;
            text-align: center;
            margin: 0 auto;
            position: relative;
            padding-top: 40px;
            .border-left{
                width:10%;
                height: 2px;
                background-color: #65627D;
                position: absolute;
                left:28%;
                bottom: 25%;
            }
            .border-right{
                width: 10%;
                height: 2px;
                background-color: #65627D;
                position: absolute;
                right: 28%;
                bottom: 25%;
            }
            .nav-text{
                color: #474858;
                font-size: 24px;
                margin-top: 8px;
                font-family:Times New Roman;
                font-weight:bold;
            }
            h2{
                color: #65627D;
                font-size: 3rem;
                font-family:Microsoft YaHei;
                font-weight:bold;
                padding-top: 24px;
            }
        }
        .yogo-cont-show{
            width: 1200px;
            margin: 0 auto;
            height: auto;
            display: flex;
            margin-top: 5%;
            cursor: pointer;
            .showlist{
                width: 385px;
                height: 100%;
                float: left;
                margin: 10px;
                transition: all 1s;
                .showimg{
                    width: 100%;
                    height: 370px;
                    background-color: #fff;
                    .showimg1{
                        width: 100%;
                        height: 100%;
                    }
                }
                .showtext{
                    width: 100%;
                    height: 88px;
                    background-color: #65627D;
                    text-align: center;
                    line-height: 88px;
                    .show-span{
                        font-size:1.7rem;
                        font-family:Gulim;
                        font-weight:400;
                        color: #fff;
                    }
                }
            }
            .showlist:hover{
                width: 385px;
                height: 100%;
                float: left;
                margin: 10px;
                transform: scale(.95);
            }
        }
        .count-name-img5{
            width: 460px;
            height: 410px;
            position: absolute;
            right: 0;
            bottom: 0;
        }
    }
}
</style>
