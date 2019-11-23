<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="aboutus-main">
                    <template>
                        <div class="bg_img3" v-if="cationbanner.length > 0">
                         <img :src="item.path" alt v-for="(item,index) in cationbanner" :key="index" @click="cationclick(item)"/>
                        <div class="advertisement">广告</div>
                       </div>
                       <div class="bg_img" v-else>
                         <img :src="banner" alt />
                        </div>
                    </template>
                    <div class="aboutus-count">
                        <div class="aboutus-count-div5">
                            <h2><img src="../assets/yujia.png"/>瑜伽村平台</h2>
                            <p class="nav-text">Sometimes beauty is so simple</p>
                            <div class="border-left"></div>
                            <div class="border-right"></div>
                        </div>
                        <div class="aboutus-count-div6">
                            <div class="count-div6-left">
                                <div class="div6-left-bottom">
                                    <img src="../assets/aboutbg.png" class="dim"/>
                                    <div class="left-bottom-title">
                                        <h2>简介</h2>
                                        <p class="nav-text">Sometimes beauty is so simple</p>
                                        <p class="abouts-p2">上海一伽健身服务有限公司旗下品牌瑜伽村是全国培训信息最丰富的瑜伽行业平台。</p>
                                        <p class="abouts-p2">瑜伽村平台集合了全球瑜伽名师信息，瑜伽培训、大会信息等。</p>
                                        <p class="abouts-p2">可通过课程类型、地域、时间、老师、价格等信息进行进准分类搜索，是目前中国培训信息最丰富、搜索最进准的瑜伽行业资讯平台。</p>
                                        <p class="abouts-p2">我们的目标是要做到：在瑜伽村只有你想要，没有找不到。</p>
                                        <p class="abouts-p2">目前有100多家培训机构进驻，1000多个知名导师展示，10000多条瑜伽培训、大会信息，三个月目标做到100000位注册瑜伽老师。</p>
                                        <p class="abouts-p2">中国瑜伽村致力于打造内容最丰富，搜索最精准，注册瑜伽老师最多的的瑜伽行业平台。</p>
                                        <p class="abouts-p2">只要注册成为中国瑜伽村村民，即可参与推荐分享积分活动，积分可兑换瑜伽培训课程及各种瑜伽活动等优惠礼遇。</p>
                                        <p class="abouts-p2">详情请见中国瑜伽村积分规则。</p>
                                    </div>
                                </div>
                            </div>
                            <div class="count-div6-right">
                                <div class="div6-right-top">
                                    <div class="title1">
                                        <h2>什么是积分</h2>
                                        <p class="abouts-p3">瑜伽村积分是通过瑜伽爱好者、教练、机构负责人等完成注册、完善信息及邀请注册等途径获得的积分奖励。</p>
                                    </div>
                                    <div class="title2">
                                        <h2>积分的作用</h2>
                                        <p class="abouts-p3">1.瑜伽老师/普通村民：积分可兑换瑜伽培训课程、瑜伽活动优惠，及抵用课程费用等优惠礼遇.</p>
                                        <p class="abouts-p3">2.瑜伽名师/瑜伽机构：积分可兑换中国瑜伽村官网及手机端的广告位信息展示.</p>
                                    </div>
                                    <img src="../assets/aboutbg2.png" class="dim2"/>
                                </div>
                                <div class="div6-right-bottom">
                                    <img src="../assets/aboutbg3.png" class="dim3"/>
                                    <div class="right-bottom-title">
                                        <h2>积分获取规则</h2>
                                        <p class="nav-text">Sometimes beauty is so simple</p>
                                        <p class="abouts-p4">注册中国瑜伽村普通村民，即获得500积分；注册后完善个人资料，即获得300积分；</p>
                                        <p class="abouts-p4">邀请好友注册中国瑜伽村普通村民，每邀请注册一个好友，即获得300积分，以此叠加；</p>
                                        <p class="abouts-p4">您邀请的好友再邀请其他好友注册，每邀请注册一个好友，即获得100积分，以此叠加；</p>
                                        <p class="abouts-p4">在2020年1月1日前参与注册推荐积分活动，所有积分翻倍，</p>
                                        <p class="abouts-p4">例：注册获得500积分，现可获得1000积分；完善资料300积分，现可获得600积分；</p>
                                        <p class="abouts-p4">推荐好友300积分，现可获得600积分；以此类推，</p>
                                        <p class="abouts-p4">最终解释权归中国瑜伽村所有。</p>
                                    </div>
                                </div>
                            </div>
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
                                     <img :src="item.url_pic" :alt="item.name"/>
                                     <h3>{{item.name}}</h3>
                                     <p>{{item.describe}}</p>
                                 </div>
                             </div>
                        </div>
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
                                 <img :src="aboutUs.url_pic" alt="背景图片"/>
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
  metaInfo: {
    title: '关于我们-中国瑜伽村简介', 
    meta: [{
        name: 'keyWords',
        content: '中国瑜伽村，中国瑜伽村简介'
    },{
        name: 'description',
        content: '中国瑜伽村是全国培训信息丰富的行业平台，本页内容会给大家详细的介绍一下中国瑜伽村，让大家更加的了解我们。'
    }]
  },
  components:{
    Banner,
  },
  data() {
    return {
        aboutUs:"",
        aboutusmodel:[],
        imgpic:[],
        banner:'',
        cationbanner:[]
    };
  },
  created(){
      this.listhomedata();
      this.classification();
  },
   methods:{
       //根据页面查广告数据
    classification(){
      this.$request.get(`/advertisement/data/12`).then(data => {
          for(let i = 0; i < data.length; i++){
            if(data[i].position == 0){
              this.cationbanner = data[i].advertisement;
            }
          }
      });
    },
      cationclick(item){
        switch(item.mold){
            case 1:
                this.$router.push({
                    path: "/subjects",
                    query: {
                    id: item.relation_id
                    }
                });
                break;
            case 2:
                this.$router.push({
                    path: "/joinclubhouse/joinclubhousedetails",
                    query: {
                    id: item.relation_id
                    }
                });
                break;
            case 3:
                this.$router.push({
                    path: "/yogoteacher/yogoteacherdetails",
                    query: {
                    id: item.relation_id
                    }
                });
                break;
            case 4:
               this.$router.push({
                        path: `/cultivate/detail/${item.relation_id}`,
                    });
                break;
            case 5:
                this.$router.push({
                    path: "/goods/detail",
                    params: {
                    id: item.relation_id
                    }
                });
                break;
            case 6:
                this.$router.push({
                    path: "/cultivate/index",
                });
                break;
            case 7:
                this.$router.push({
                    path: "/market/detail",
                });
                break;
        }
      },
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
<style lang="scss" scoped>
.bg_img {
  width: 100%;
  height: 100%;
  img{
      width: 100%;
      height: 100%;
  }
}
.bg_img3{
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
   .advertisement{
        width: 40px;
        height: 20px;
        line-height: 20px;
        background-color: #351D27;
        opacity: 0.5;
        color: #fff;
        font-size: 12px;
        text-align: center;
        position: absolute;
        right: 0;
        bottom: 0;
    }
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
        background: #FCFBF1;
        .aboutus-count-div5{
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
                    left: 41%;
                    top: 18%;
                }
            }
        }
        .aboutus-count-div6{
            width: 100%;
            height: 100%;
            display: flex;
            margin-bottom: 4%;
            .count-div6-left{
                width: 50%;
                height: 550px;
                .div6-left-bottom{
                    width:100%;
                    height:100%;
                    background:rgba(0,0,0,1);
                    position: relative;
                    .dim{
                        opacity:0.6; filter: alpha(opacity=60);
                        width:100%;
                        height:100%;
                        object-fit: cover;
                    }
                    .left-bottom-title{
                        position: absolute;
                        top: 40px;
                        left: 42px;
                        h2{
                        color: #fff;
                        font-size: 1.1rem;
                        font-family:Microsoft YaHei;
                        font-weight:bold;
                        }
                        .nav-text{
                            color: #fff;
                            font-size: 12px;
                            margin-top: 8px;
                            margin-bottom: 25px;
                        }
                        .abouts-p2{
                            color: #fff;
                            font-size: 12px;
                            line-height: 12px;
                        }
                    }
                }
            }
            .count-div6-right{
                width: 50%;
                height: 550px;
                .div6-right-top{
                    // margin-bottom: 25px;
                    height: 210px;
                    position: relative;
                    .title1{
                        width: 60%;
                        // padding-top: 21%;
                        padding-left: 5%;
                        h2{
                            color: #585858;
                            font-size: 1rem;
                            font-family:Microsoft YaHei;
                            font-weight:bold;
                        }
                        .abouts-p3{
                            color: #585858;
                            font-size: 12px;
                        }
                    }
                    .title2{
                        width: 60%;
                        padding-left: 5%;
                        h2{
                            color: #585858;
                            font-size: 1rem;
                            font-family:Microsoft YaHei;
                            font-weight:bold;
                        }
                        .abouts-p3{
                            color: #585858;
                            font-size: 12px;
                        }
                    }
                    .dim2{
                        width: 290px;
                        height: 300px;
                        position:absolute;
                        right: 0px;
                        top: -55%;
                    }
                }
                .div6-right-bottom{
                    height: 340px;
                    position: relative;
                    width: 99%;
                    float: right;
                    .dim3{
                        width:100%;
                        height:100%;
                        object-fit: cover;
                    }
                    .right-bottom-title{
                        position: absolute;
                        top: 40px;
                        left: 35px;
                        h2{
                        color: #fff;
                        font-size: 1rem;
                        font-family:Microsoft YaHei;
                        font-weight:bold;
                        }
                        .nav-text{
                            color: #fff;
                            font-size: 12px;
                            margin-top: 8px;
                            margin-bottom: 25px;
                        }
                        .abouts-p4{
                            color: #fff;
                            font-size: 12px;
                            line-height: 12px;
                        }
                    }
                }
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
                    top: 18%;
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
                        object-fit: cover;
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
                    top: 18%;
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