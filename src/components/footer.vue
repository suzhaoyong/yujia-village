<template>
    <div>
        <el-col :span="24">
            <div class="footer-main">
                <div class="foot-count">
                    <img src="../assets/people.png" class="bgpeople"/>
                <div class="footer-foot">
                    <div class="foot-left">
                        <div class="foot-left-title">
                            导航目录
                            <span class="span1">Navigation</span>
                        </div>
                        <div class="borders"></div>
                        <div class="left-name-main">
                        <div class="foot-left-name">
                            <router-link to="/main"><span class="apns">首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</span></router-link>
                            <router-link to="/joinclubhouse"><span class="apns">联盟会馆</span></router-link>
                            <router-link to="/yogoteacher"><span class="apns">瑜伽名师</span></router-link>
                        </div>
                        <div class="foot-left-name">
                            <router-link to="/market/index"><span class="apns">商&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;城</span></router-link>
                            <router-link to="/cultivate/index"><span class="apns">培训信息</span></router-link>
                            <router-link to="/aboutus"><span class="apns">关于我们</span></router-link>
                        </div>
                        <div class="foot-left-name">
                            <router-link to="/yogoknowledge"><span class="apns">瑜伽知识</span></router-link>
                            <router-link to="/yogoinformation"><span class="apns">瑜伽资讯</span></router-link>
                            <router-link to="/personal"><span class="apns">个人中心</span></router-link>
                        </div>
                        </div>
                    </div>
                    <div class="border3"></div>
                    <div class="foot-right">
                        <div class="foot-left-title2">
                            联系我们
                            <span class="span2">Contact us</span>
                        </div>
                        <div class="borders"></div>
                        <div class="foot-left-tel">
                            <img src="../assets/telp.png" class="telpimg"/>
                            <span class="telp">4001007191</span>
                        </div>
                        <div class="foot-left-address">
                            <img src="../assets/address.png" class="addressimg"/>
                            <span class="address">成都市锦江区泰合国际财富中心7栋302</span>
                        </div>
                    </div>
                </div>
                </div>
                 <div class="foot-under">
                     <div class="foot-under-title">
                    <span>Copyright © 2017-2022 上海一伽健身服务有限公司 All rights reserved</span>
                    <span class="span3">沪ICP备16052417号-1</span> 
                    </div>
                </div>
            </div>
        </el-col>
    </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  methods:{
  }
};
</script>
<style lang="scss" scoped>
.footer-main{
    width: 100%;
    height: 100%;
    min-height: 400px;
    padding: 0;
    background-image: url('../assets/footbg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: grid;
.foot-count{
    width: 1200px;
    margin: 0 auto;
    margin-top: 90px;
    position: relative;
    .bgpeople{
        width: 349px;
        height: 347px;
        position: absolute;
        top: -50px;
        left: 105px;
    }
    .footer-foot{
        width: 60%;
        height: 100%;
        float: right;
        display: flex;
        justify-content: space-around;
        .foot-left{
            height: 100%;
            .foot-left-title{
                font-family:Microsoft YaHei;
                font-weight:bold;
                font-size: 18px;
                color: #2c2c2c;
                .span1{
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    font-size: 14px;
                    color: #2c2c2c;
                }
            }
            .borders{
                border-bottom: 3px solid #ACC794;
                width: 65%;
            }
            .left-name-main{
                margin-top: 15%;
            .foot-left-name{
                line-height: 40px;
                cursor: pointer;
                .apns{
                    margin-right: 20px;
                    color: #2c2c2c;
                    font-size: 14px;
                }
            }
            }
        }
        .border3{
            width: 1px;
            height: 120px;
            border: 1px solid #ACC794;
            margin-top: 10%;
        }
        .foot-right{
            height: 100%;
            .borders{
                border-bottom: 3px solid #ACC794;
                width: 55%;
            }
            .foot-left-title2{
                font-family:Microsoft YaHei;
                font-weight:bold;
                font-size: 18px;
                color: #2c2c2c;
                .span2{
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    font-size: 14px;
                    color: #2c2c2c;
                }
            }
            .foot-left-tel{
                margin-top: 14%;
                line-height: 47px;
                .telpimg{
                    width: 32px;
                    height: 32px;
                }
                .telp{
                    color: #2c2c2c;
                    font-size: 14px;
                }
            }
            .foot-left-address{
                margin-top: 7%;
                line-height: 47px;
                .addressimg{
                    width: 32px;
                    height: 32px;
                }
                .address{
                    color: #2c2c2c;
                    font-size: 14px;
                }
            }
        }
    }
 }
 .foot-under{
     width: 1200px;
     margin: 0 auto;
     .foot-under-title{
        width: 57%;
        float: right;
        text-align: left;
        color: #999;
        font-size: 14px;
        .span3{
            padding-left: 50px;
         }
      }
    }
}
</style>