<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="detail-main">
                    <div class="detail-count-div1">
                        <h2><img src="../../assets/yujia.png"/>课程介绍</h2>
                        <p class="nav-text">Sometimes beauty is so simple</p>
                        <div class="border-left"></div>
                        <div class="border-right"></div>
                    </div>
                    <div class="detail-count-div2">
                        <div class="count-div2-img">
                            <img class="img1" src="../../assets/image65.png"/>
                            <img class="img2" src="../../assets/image66.png"/>
                            <img class="img3" src="../../assets/image67.png"/>
                        </div>
                        <div class="count-div2-imgpic">
                            <img class="img1" src="../../assets/image68.png"/>
                        </div>
                        <div class="count-div2-text">
                            <h4>空中瑜伽</h4>
                            <h4>￥4800.00</h4>
                            <div class="rate-nandu">
                               <span class="rate-nandu-span">难度级别：</span>
                               <el-rate v-model="value2"></el-rate>
                            </div>
                            <div class="cultivate">培训老师：<span class="cultivate-span">IVAN</span></div>
                            <div class="cultivate-text1">培训时间：2019.05.20-2019.06.20</div>
                            <div class="cultivate-text2">培训地址：成都市锦江区双桂路泰合财富中心7栋二单元302</div>
                            <div class="cultivate-button">
                                <el-button type="text" class="button">电话咨询</el-button>
                            </div>
                            <img class="imgpic1" src="../../assets/image69.png"/>
                            <img class="imgpic2" src="../../assets/image70.png"/>
                        </div>
                    </div>
                    <div class="detail-count-div3">
                        <div class="count-div3-cumtrl">
                        <h2><img src="../../assets/yujia.png"/>适宜人群</h2>
                        <p class="nav-text">Sometimes beauty is so simple</p>
                        <div class="border-left"></div>
                        <div class="border-right"></div>
                       </div>
                       <div class="div3-crowd">
                           <div class="div3-crowd-li">
                               <h5>Easy to navigate</h5>
                                <img src="../../assets/image71.png"/>
                                <p>具备基础瑜伽教学资质的瑜伽老师、馆主。</p>
                           </div>
                           <div class="div3-crowd-li">
                               <h5>Easy to navigate</h5>
                                <img src="../../assets/image72.png"/>
                                <p>有专业瑜伽会员课程1年以上的瑜伽爱好者，及舞蹈爱好者。</p>
                           </div>
                           <div class="div3-crowd-li">
                               <h5>Slightly difficult</h5>
                                <img src="../../assets/image73.png"/>
                                <p>韧带较柔软，身体平衡性较好的未接触瑜伽的小白</p>
                           </div>
                       </div>
                    </div> 
                    <div class="detail-count-div4">
                        <div class="count-div3-cumtrl2">
                        <h2><img src="../../assets/image74.png"/>教学大纲</h2>
                        <p class="nav-text">Sometimes beauty is so simple</p>
                       </div>
                       <div class="cumtrl2-text">
                            <p>一. 空中瑜伽设备的介绍和选择 空中课程的注意事项和会员反应的应对 空中瑜伽的热身体式 空中瑜伽的五大原则 </p>
                            <p>二. 1.握姿体系 2.站姿体系 3.坐姿体系 4.后弯体系 5.开髋体系 6.脊柱理疗体系 7.倒立体系 8.平衡体系 9.核心体系</p>
                            <p>三. 空中瑜伽在练习当中的禁忌</p>
                            <p>四. 加强教学中语言表达能力 </p>
                            <p>五. 如何在空中舒展</p>
                            <p>六. 如何在教学用上辅助手法 </p>
                            <p>七. 如何在课程接近结束放松</p>
                            <p>八. 如何课程编排 </p>
                            <p>九. 考核 对瑜伽馆的帮助 1.收集潜在客户名单的新利器 2.增加新的赢利点 你将学到什么？ 系统学习空中瑜伽的教授方法、技巧，安全有效并充满乐趣的上好空中瑜伽课程，使会员减压，减脂，治疗三效合一；特别训练语言表达及课程编排思路，让你的教学丰满并深刻！</p>
                       </div>
                       <img class="bg-picimg1" src="../../assets/image75.png"/>
                       <img class="bg-picimg2" src="../../assets/image76.png"/>
                       <img class="bg-picimg3" src="../../assets/image77.png"/>
                       <img class="bg-picimg4" src="../../assets/image78.png"/>
                       <h3 class="h3-bgpic">教学大纲</h3>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
  data() {
    return {
        value2:4,
    };
  }
};
</script>
<style lang="scss" scoped>
.detail-main{
    width: 100%;
    height: 100%;
    background-color: #eeeeee;
    margin:0 auto;
    overflow: hidden;
    .detail-count-div1{
        width: 100%;
        height: 9.4rem;
        text-align: center;
        display:inline-block;
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
            font-size: 0.9rem;
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
    .detail-count-div2{
        width: 75%;
        margin:0 auto;
        height: 30rem;
        background-color: #ffffff;
        display: flex;
        .count-div2-img{
            width: 5.8rem;
            margin-left: 5rem;
            height: 6.3rem;
            .img1{
                width: 100%;
                height: 100%;
                margin-bottom: 1rem;
                margin-top: 3rem;
            }
            .img2{
                width: 100%;
                height: 100%;
                margin-bottom: 1rem;
            }
            .img3{
                width: 100%;
                height: 100%;
            }
        }
        .count-div2-imgpic{
            width: 22.5rem;
            margin-left: 3rem;
            height: 25.4rem;
            .img1{
                width: 100%;
                height: 100%;
            }
        }
        .count-div2-text{
            width: 25rem;
            margin-left: 4rem;
            height: 20rem;
            margin-top: 6rem;
            position: relative;
            h4{
                font-size:18px;
                font-family:MicrosoftYaHei-Bold;
                font-weight:bold;
            }
            .rate-nandu{
                display: flex;
                margin-top: 1.5rem;
                .rate-nandu-span{
                    color: #2c2c2c;
                    font-size: 0.9rem;
                }
            }
            .cultivate{
                color: #2c2c2c;
                font-size: 0.9rem;
                margin-top: 1.2rem;
                .cultivate-span{
                    color: #22AC38;
                    font-size: 0.9rem;
                }
            }
            .cultivate-text1{
                color: #2c2c2c;
                font-size: 0.9rem;
                margin-top: 1rem;
            }
            .cultivate-text2{
                color: #2c2c2c;
                font-size: 0.9rem;
                margin-top: 0.5rem;
            }
            .cultivate-button{
                width:7.4rem;
                height:3rem;
                background:rgba(49,49,49,1);
                border-radius:5px;
                line-height: 3rem;
                margin-top: 3.4rem;
                text-align: center;
                .button{
                    color: #ffffff;
                    font-size: 0.9rem;
                }
            }
            .imgpic1{
                position: absolute;
                width: 11.1rem;
                height: 7.7rem;
                top: -30%;
                right: 10%;
            }
            .imgpic2{
                position: absolute;
                top: -3%;
                right: -13%;
                width: 3.1rem;
                height: 3.4rem;
            }
        }
    }
    .detail-count-div3{
        width: 75%;
        margin: 0 auto;
        height: 30.4rem;
        background-color: #ffffff;
        margin-top: 2rem;
        .count-div3-cumtrl{
            width: 100%;
            height: 9.4rem;
            text-align: center;
            display:inline-block;
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
                font-size: 0.9rem;
                margin-top: -4px;
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
        .div3-crowd{
            width: 70%;
            margin: 0 auto;
            height: 18rem;
            display: flex;
            justify-content: space-around;
            .div3-crowd-li{
                width: 170px;
                height: 100%;
                h5{
                    font-family:MicrosoftYaHei;
                    font-weight:400;
                    font-size: 0.9rem;
                    color: #999999;
                    text-align: center;
                }
                img{
                    margin-top: 1.2rem;
                }
                p{
                    font-family:MicrosoftYaHei;
                    font-weight:400;
                    font-size: 0.9rem;
                    color: #2c2c2c;
                    text-align: center;
                    margin-top: 1.5rem;
                }
            }
        }
    }
    .detail-count-div4{
        width: 75%;
        margin: 0 auto;
        height: 32rem;
        background-color: #ffffff;
        margin-top: 2rem;
        position: relative;
        margin-bottom: 6rem;
        .count-div3-cumtrl2{
            width: 100%;
            height: 9.4rem;
            text-align: center;
            display:inline-block;
            position: relative;
            .nav-text{
                color: #999999;
                font-size: 0.9rem;
                margin-top: 11px;
            }
            h2{
                color: #2c2c2c;
                font-size: 24px;
                margin-top: 40px;
                img{
                     width: 75px;
                    height: 52px;
                    position: absolute;
                    left: 39%;
                    top: 17%;
                }
            }
        }
        .cumtrl2-text{
            line-height: 1rem;
            width: 75%;
            margin-left: 13rem;
            p{
                color: #2c2c2c;
                font-size: 0.9rem;
            }
        }
        .bg-picimg1{
            position: absolute;
            top: 40%;
            left: 0%;
            width: 15rem;
            height: 19rem;
        }
        .bg-picimg2{
            position: absolute;
            top: 5%;
            left: 3%;
            width: 7rem;
            height: 30rem;
        }
        .bg-picimg3{
            position: absolute;
            right: 0%;
            top: 48%;
        }
        .bg-picimg4{
            position: absolute;
            right: 0%;
            top: 0%;
        }
        .h3-bgpic{
            position: absolute;
            margin: 0 auto;
            width: 30px;
            line-height: 29px;
            font-family: MicrosoftYaHei-Bold;
            font-weight: bold;
            top: 57%;
            left: 8%;
            font-size: 1.3rem;
        }
    }
}
</style>
