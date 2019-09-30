<template>
    <el-col :span="24">
        <div class="yogoteacher-main">
            <div class="yogoteacher-count-div1">
                <div class="count-img">
                    <div class="count-name">
                        <span class="span1">瑜伽名师<span class="span2"> —{{teacher.name}}</span></span>
                    </div>
                    <div class="count-imgpic">
                      <img :src="teacher.cover" class="count-name-img"/>
                    </div>
                    <div class="share3" v-if="config.url">
                        <share :config="config"></share>
                    </div>
                    <div class="Giveup">
                        <img src="../assets/Give.png" class="Giveup_img" v-if="Giveupimg" @click="Giveuppraise"/>
                        <img src="../assets/Givecolor.png" class="Giveup_img" v-if="Giveupimg1" @click="Giveuppraise"/>
                        <span class="Giveup_num">{{teacher.praise}}</span>
                    </div>
                </div>
            </div>
            <div class="yogoteacher-count-div3">
                <div class="yogofigcaption-mian">
                <img src="../assets/bgimg20.png" class="count-name-imgpic"/>
                <div class="yogofigcaption">
                    <img src="../assets/image82.png" class="count-name-img3"/>
                    <div class="yogofigcaption-title">
                        <h2>个人简介</h2>
                        <p class="p1">Good at courses</p>
                        <p class="p2">擅长课程：<span>{{teacher.good_at}}</span></p>
                        <div class="p3">老师介绍：<div v-html="teacher.content" style="width: 88%;line-height: 20px;">{{teacher.content}}</div></div>
                    </div>
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
                <div class="yogo-cont-show" v-if="this.showList.length > 0">
                    <div class="showlist" v-for="(item,index) in showList" :key="index">
                        <div class="showlist-auto">
                        <div class="showimg">
                           <img :src="item.cover" class="showimg1"/>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="Default-page8" v-else>
                    <div class="Default-main8">
                    <img src="../assets/default.png"/>
                    <span class="page-span8">我寻寻觅觅却找不到您的踪迹~</span>
                    </div>
                </div>
            </div>
        </div>
    </el-col>
</template>
<script>
import { getTrains, postTrains, getTrainsById } from "@/api/trains";
import Bus from "@/utils/Bus";
import { mapGetters } from "vuex"
export default {
  data() {
    return {
        teacher:{},
        showList:[],
        msg:"",
        Giveupimg:true,
        Giveupimg1:false,
        config: {
        url: "",
        source: "",
        title: "",
        description: "",
        sites: ["qzone", "qq", "weibo", "wechat", "douban"],
        wechatQrcodeTitle: "微信扫一扫：分享", // 微信二维码提示文字
        wechatQrcodeHelper:
          "<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>"
      },
    };
  },
    computed: {
    ...mapGetters(["info"]),
  },
  created () {
    this.yogoteacherdata();
  },
  methods:{
      Giveuppraise(){
        if(!this.info.user.name){
        // Bus.$emit("login", true);
        this.$message({type:'warning', message: '请先登录'})
        return;
       }
        let _this = this;
        let params ={
            id:_this.$route.query.id
        }
        this.$request.post(`/teachers/thumbsUp`,params).then(data => {
            _this.msg = data.msg;
            if(_this.msg == "OK"){
            this.$message({type:'success', message: '点赞成功'});
            _this.Giveupimg1 = true;
            _this.Giveupimg = false;
            this.yogoteacherdata();
            }
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
      yogoteacherdata(){
        let _this = this;
        this.$request(`/teachers/${_this.$route.query.id}`).then(res => {
            let { teacher,course} = res;
            _this.showList = res.course;
            _this.teacher = res.teacher;
        })
        .then(_ => {
          this.initSocialConfig();
        });
      },
      initSocialConfig() {
        const { name, good_at, content, cover } = this.teacher;
        const params = {
            url: `http://www.yujiacun.net/yogoteacher/yogoteacherdetails?id=${this.$route.query.id}`,
            title: name,
            description: `${good_at}`,
            image: cover
        };
        this.config = Object.assign({}, this.config, params);
        },
    callTel() {
        this.$alert(`客服电话: 400-100-7191`, "客服电话", {});
    }
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
        height: 730px;
        margin: 0 auto;
        background-color: #3E3E3E;
        background-image: url('../assets/bgteacher.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .count-img{
            width: 1200px;
            height: 100%;
            position: relative;
            margin: 0 auto;
            cursor: pointer;
            .count-name{
                width: 46%;
                margin: 0 auto;
                border: 3px solid #43516A;
                height: auto;
                position: absolute;
                bottom: 15%;
                left: 2%;
                transition: all .9s;
                line-height: 40px;
                text-align: center;
                border-image: -webkit-linear-gradient(left, #AE8D66, #43516A) 30 30;
                border-image: -moz-linear-gradient(left, #AE8D66, #43516A) 30 30;
                border-image: linear-gradient( left,#AE8D66, #43516A) 30 30;
                .span1{
                    font-size:2rem;
                    font-family:Gulim;
                    font-weight:400;
                    font-style:italic;
                    color: #43516A;
                    .span2{
                        font-size:2rem;
                        font-family:Gulim;
                        font-weight:400;
                        font-style:italic;
                        color: #43516A;
                    }
                }
            }
            .count-imgpic{
                width: 340px;
                height: 374px;
                position: absolute;
                top: 10%;
                left: 19%;
                background-image: url('../assets/bgimg22.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;
                .count-name-img{
                    width: 262px;
                    height: 260px;
                    position: absolute;
                    top: 7%;
                    left: 10%;
                    object-fit: cover;
                }
            }
            .share3{
                width: 17%;
                text-align: center;
                position: absolute;
                bottom: 40%;
                left: 21%;
           }
           .Giveup{
                position: absolute;
                bottom: 41%;
                left: 39%;
                .Giveup_img{
                    width: 22px;
                    height: 22px;
                    margin-bottom: 5px;
                }
                .Giveup_num{
                    color: #fff;
                   font-size: 14px;
                   font-family:Microsoft YaHei;
                   font-weight:400;
                }
           }
        }
    }
    .yogoteacher-count-div3{
        width: 100%;
        height: auto;
        background-color: #282828;
        position: relative;
        .yogofigcaption-mian{
            width: 100%;
            margin: 0 auto;
            height: 100%;
            background-color: #282828;
            display: inline-block;
            .count-name-imgpic{
                width: 100%;
                height: 100%;
                position: absolute;
            }
        .yogofigcaption{
            width: 1200px;
            height: 100%;
            margin:0 auto;
            display: flex;
            margin-bottom: 2%;
            .count-name-img3{
                width: 400px;
                height: 520px;
                margin-top: -5%;
                margin-left: 26px;
           }
           .yogofigcaption-title{
               width: 58%;
               height: 100%;
               margin-left: 6%;
               h2{
                    font-size:1.7rem;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    color: #fff;
                    margin-top: 10%;
               }
               .p1{
                   color: #fff;
                   font-size: 1.1rem;
                   font-family:Myriad Pro;
                   font-weight:400;
               }
               .p2{
                   color: #fff;
                   font-size: 14px;
                   font-family:Microsoft YaHei;
                   margin-top: 6%;
                   font-weight:400;
                   margin-bottom: 7px;
               }
               .p3{
                   color: #fff;
                   font-size: 14px;
                   font-family:Microsoft YaHei;
                   font-weight:400;
                   display: flex;
               }
           }
        }
        }
    }
    .yogoteacher-count-div4{
        width: 100%;
        height: 100%;
        background-image: url('../assets/bgimg21.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: relative;
        display: inline-block;
        padding-bottom: 70px;
        .yogo-cont-div4{
            width: 1200px;
            height: 200px;
            text-align: center;
            margin: 0 auto;
            position: relative;
            padding-top: 3%;
            .border-left{
                width:10%;
                height: 2px;
                background-color: #65627D;
                position: absolute;
                left:28%;
                bottom: 12%;
            }
            .border-right{
                width: 10%;
                height: 2px;
                background-color: #65627D;
                position: absolute;
                right: 28%;
                bottom: 12%;
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
                font-size: 2.5rem;
                font-family:Microsoft YaHei;
                font-weight:bold;
                padding-top: 4%;
            }
        }
        .yogo-cont-show{
            width: 1200px;
            margin: 0 auto;
            height: auto;
            // display: flex;
            margin-top: 5%;
            cursor: pointer;
            .showlist{
                width: 380px;
                height: 100%;
                float: left;
                display: flex;
                justify-content: center;
                margin: 10px;
                .showlist-auto{
                    transition: all .9s;
                    width: 100%;
                .showimg{
                    width: 100%;
                    height: 370px;
                    background-color: #fff;
                    .showimg1{
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
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
                .showlist-auto:hover{
                    transform: scale(.98);
                    width: 100%;
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
            }
            .block{
                text-align: center;
                margin: 0 auto;
                width: 100%;
                margin-top: 20px;
                display: inline-block;
                .el-pagination {
                    white-space: nowrap;
                    padding: 30px 5px;
                    color: #303133;
                    font-weight: 700;
                }
                .el-pagination.is-background .el-pager li:not(.disabled).active {
                    background-color: #CCE198;
                    color: #fff;
                }
            }
        }
        .Default-page8{
            width: 100%;
            height: 600px;
            margin: 0 auto;
            text-align: center;
            line-height: 600px;
            // background-color: #D2CEE4;
            .Default-main8{
                width: 1200px;
                height: 100%;
                margin: 0 auto;
            img{
                width: 500px;
                height: 300px;
            }
            .page-span8{
                font-size:22px;
                font-family:PingFang SC;
                font-weight:500;
                color: #999;
            }
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
