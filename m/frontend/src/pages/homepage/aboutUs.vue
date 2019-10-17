<template>
    <div class="aboutUs">
        <div class="banner" :style="{backgroundImage: 'url('+aboutUs.banner+')'}"></div>
        <div class="aboutUs_warp">
            <div class="share_warp_rule">
                <div class="border-left"></div>
                <div class="h2"><img src="../../assets/teacherclub/yujia.png"/>瑜伽村平台</div>
                <div class="rule_name">Sometimes beauty is so simple</div>
                <div class="border-right"></div>
            </div>
            <div class="aboutUs_p">{{aboutUs.intro}}</div>
        </div>
        <div class="borders"></div>
        <div class="aboutUs_warp2">
            <div class="share_warp_rule">
                <div class="border-left"></div>
                <div class="h2"><img src="../../assets/teacherclub/yujia.png"/>瑜伽村群分布范围</div>
                <div class="rule_name">Sometimes beauty is so simple</div>
                <div class="border-right"></div>
            </div>
            <div class="aboutUs_p">{{aboutUs.range}}</div>
        </div>
        <div class="borders"></div>
        <div class="aboutUs_warp3">
            <div class="share_warp_rule">
                <div class="border-left"></div>
                <div class="h2"><img src="../../assets/teacherclub/yujia.png"/>瑜伽村网络板块</div>
                <div class="rule_name">Sometimes beauty is so simple</div>
                <div class="border-right"></div>
            </div>
            <div class="aboutUs_lists">
                <div class="aboutUs_items" v-for="(item,index) in aboutusmodel" :key="index">
                    <div class="aboutUs_items_li">
                        <div class="aboutUs_items_img">
                            <img :src="item.url_pic"/>
                        </div>
                        <div class="aboutUs_items_text">
                            <div class="text1">{{item.name}}</div>
                            <div class="text2">{{item.describe}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="borders"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            aboutUs:"",
            aboutusmodel:[]
        }
    },
    created(){
      this.listhomedata();
  },
   methods:{
        listhomedata(){
        this.$request.get("/aboutUs").then(res => {
            this.aboutUs = res;
            this.aboutusmodel = res.about_us_model;
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
}
</script>
<style lang="scss" scope>
.aboutUs{
    padding-top: 88px;
    margin-bottom: 50px;
    background: #fff !important;
    .banner {
        background-image: url('../../assets/teacherclub/banner.png');
        height: 170px;
        background-size: cover;
        background-position: center;
    }
    .aboutUs_warp{
        display: inline-block;
        position: relative;
        width: 100%;
        .share_warp_rule{
            width: 100%;
            line-height: 23px;
            text-align: center;
        .rule_name{
          font-size: 10px;
          font-family:PingFang SC;
          font-weight:400;
          color: #999;
          text-align: center;
        }
        .border-left{
          width: 25%;
          position: absolute;
          top: 40px;
          background-color: #DCDCDC;
          height: 1px;
          left: 10px;
        }
        .border-right{
          width: 25%;
          position: absolute;
          top: 40px;
          background-color: #DCDCDC;
          height: 1px;
          right: 10px;
        }
        .h2{
            color: #2c2c2c;
            font-size: 14px;
            margin-top: 20px;
            font-family:Microsoft YaHei;
            font-weight:500;
            display: flex;
            justify-content: center;
            img{
                width: 20px;
                height: 18px;
                margin-left: -7px;
                display: block;
            }
        }
      }
      .aboutUs_p{
        width: 93%;
        margin: 0 auto;
        text-align: center;
        font-size:10px;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(44,44,44,1);
        margin-top: 20px;
        margin-bottom: 20px;
        line-height: 20px;
      }
    }
    .aboutUs_warp2{
        display: inline-block;
        position: relative;
        width: 100%;
        background-image: url('../../assets/teacherclub/aboutbg.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .share_warp_rule{
            width: 100%;
            line-height: 23px;
            text-align: center;
        .rule_name{
          font-size: 10px;
          font-family:PingFang SC;
          font-weight:400;
          color: #999;
          text-align: center;
        }
        .border-left{
          width: 25%;
          position: absolute;
          top: 40px;
          background-color: #DCDCDC;
          height: 1px;
          left: 10px;
        }
        .border-right{
          width: 25%;
          position: absolute;
          top: 40px;
          background-color: #DCDCDC;
          height: 1px;
          right: 10px;
        }
        .h2{
            color: #2c2c2c;
            font-size: 14px;
            margin-top: 20px;
            font-family:Microsoft YaHei;
            font-weight:500;
            display: flex;
            justify-content: center;
            img{
                width: 20px;
                height: 18px;
                margin-left: -7px;
                display: block;
            }
        }
      }
      .aboutUs_p{
        width: 93%;
        margin: 0 auto;
        text-align: center;
        font-size:10px;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(44,44,44,1);
        margin-top: 20px;
        margin-bottom: 20px;
        line-height: 20px;
      }
    }
    .aboutUs_warp3{
        display: inline-block;
        position: relative;
        width: 100%;
        .share_warp_rule{
            width: 100%;
            line-height: 23px;
            text-align: center;
        .rule_name{
          font-size: 10px;
          font-family:PingFang SC;
          font-weight:400;
          color: #999;
          text-align: center;
        }
        .border-left{
          width: 25%;
          position: absolute;
          top: 40px;
          background-color: #DCDCDC;
          height: 1px;
          left: 10px;
        }
        .border-right{
          width: 25%;
          position: absolute;
          top: 40px;
          background-color: #DCDCDC;
          height: 1px;
          right: 10px;
        }
        .h2{
            color: #2c2c2c;
            font-size: 14px;
            margin-top: 20px;
            font-family:Microsoft YaHei;
            font-weight:500;
            display: flex;
            justify-content: center;
            img{
                width: 20px;
                height: 18px;
                margin-left: -7px;
                display: block;
            }
        }
      }
      .aboutUs_lists{
        margin-top: 20px;
        // margin-bottom: 20px;
        .aboutUs_items{
            width: 100%;
            height: 70px;
            background-color: #EEEEEE;
            .aboutUs_items_li{
                width: 93%;
                margin: 0 auto;
                display: flex;
                .aboutUs_items_img{
                    width: 26%;
                    margin-top: -4px;
                    img{
                        width: 78px;
                        height: 78px;
                        display: block;
                        border-radius: 50%;
                        object-fit: cover;
                    }
                }
                .aboutUs_items_text{
                    line-height: 25px;
                    margin-top: 10px;
                    text-align: left;
                    width: 70%;
                    .text1{
                        font-size:12px;
                        font-family:PingFang SC;
                        font-weight:500;
                        color:rgba(44,44,44,1);
                    }
                    .text2{
                        font-size:11px;
                        font-family:PingFang SC;
                        font-weight:400;
                        color:rgba(153,153,153,1);
                    }
                }
            }
        }
        .aboutUs_items:nth-child(2n){
            width: 100%;
            height: 70px;
            background-color: #fff;
            .aboutUs_items_li{
                width: 93%;
                margin: 0 auto;
                display: flex;
                position: relative;
                .aboutUs_items_img{
                    width: 26%;
                    margin-top: -4px;
                    position: absolute;
                    right: 0;
                    img{
                        width: 78px;
                        height: 78px;
                        display: block;
                        border-radius: 50%;
                        object-fit: cover;
                    }
                }
                .aboutUs_items_text{
                    line-height: 25px;
                    margin-top: 10px;
                    text-align: right;
                    width: 70%;
                    .text1{
                        font-size:12px;
                        font-family:PingFang SC;
                        font-weight:500;
                        color:rgba(44,44,44,1);
                    }
                    .text2{
                        font-size:11px;
                        font-family:PingFang SC;
                        font-weight:400;
                        color:rgba(153,153,153,1);
                    }
                }
            }
        }
      }
    }
    .borders{
        height: 7px;
        background: #eee;
    }
}
</style>