<template>
    <el-col :span="24">
        <div class="yogoteacher-main">
            <div class="navs">
                <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/yogoteacher' }">瑜伽名师</el-breadcrumb-item>
                <el-breadcrumb-item>{{teacher.name}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="yogoteacher-count-div1">
                <h2><img src="../assets/yujia.png"/>个人简介</h2>
                <p class="nav-text">Sometimes beauty is so simple</p>
                <div class="border-left"></div>
                <div class="border-right"></div>
            </div>
            <div class="yogoteacher-count-div3">
                <img src="../assets/Yogavillage.png" class="count-name-img" alt/>
                <div class="yogofigcaption-mian">
                    <div class="yogofigcaption-img">
                        <img :src="teacher.cover" class="count-name-imgpic" :alt="teacher.name"/>
                    </div>
                    <div class="share3" v-if="config.url">
                        <share :config="config"></share>
                    </div>
                    <div class="yogofigcaption">
                        <div class="count-name">瑜伽名师：{{teacher.name}}</div>
                        <div class="Giveup">
                            <img src="../assets/Give2.png" class="Giveup_img" v-if="Giveupimg" @click="Giveuppraise" :title="'人气:'+(teacher.praise||100)"/>
                            <img src="../assets/Givecolor.png" class="Giveup_img" v-if="Giveupimg1" @click="Giveuppraise" :title="'人气:'+(teacher.praise||100)"/>
                            <span class="Giveup_num">{{teacher.praise||100}}</span>
                        </div>
                        <div class="Giveup-count">
                            <div class="Giveup2">人气：{{teacher.praise||100}}</div>
                            <div class="Giveup3">所在地：{{teacher.teacher_address}}</div>
                        </div>
                        <div class="Giveup4">教龄：{{teacher.num}}年</div>
                    </div>
                </div>
            </div>
            <div class="yogoteacher-count-div2">
                <img src="../assets/yogaimg.png" class="yogoimg" alt/>
                <div class="count-div2-count">
                    <div class="yogofigcaption-title">
                        <p class="p2">擅长课程：<span>{{teacher.good_at}}</span></p>
                        <div class="p3">老师介绍：<div v-html="teacher.content" style="width: 88%;line-height: 20px;">{{teacher.content}}</div></div>
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
                <div class="yogo-cont-show" v-if="teacher.teacher_img != null">
                    <div class="showlist" v-for="(item,index) in teacher.teacher_img" :key="index">
                        <div class="showlist-auto">
                        <div class="showimg">
                           <img :src="item" class="showimg1" alt="名师个人show"/>
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
import { mapGetters } from "vuex";
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
    ...mapGetters(["info"])
  },
  created () {
    this.yogoteacherdata();
  },
  methods:{
      Giveuppraise(){
        if(!this.info.user.name){
        Bus.$emit("login", true);
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
<style lang="scss" scoped>
.yogoteacher-main{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    .navs {
    width: 1200px;
    margin: 0 auto;
    padding: 3rem 0rem 0rem 0rem;
    }
    .yogoteacher-count-div1{
        width: 1200px;
        height: 190px;
        margin: 0 auto;
        text-align: center;
        background-color: #fff;
        display: flow-root;
        position: relative;
            .border-left{
                width: 20%;
                height: 1px;
                background-color: #DCDCDC;
                position: absolute;
                top: 41%;
                left: 19%;
            }
            .border-right{
                width: 20%;
                height: 1px;
                background-color: #DCDCDC;
                position: absolute;
                right: 19%;
                top: 41%;
            }
            .nav-text{
                color: #999;
                font-size: 14px;
                margin-top: 8px;
            }
            h2{
                color: #2C2C2C;
                font-size: 1.3rem;
                margin-top: 50px;
                font-family:Microsoft YaHei;
                font-weight:bold;
                position: relative;
                img{
                    width: 28px;
                    height: 28px;
                    position: absolute;
                    left: 42%;
                    top:0%;
                }
            }
    }
    .yogoteacher-count-div2{
        background: #fff;
        height: 100%;
        position: relative;
        display: flex;
        .yogoimg{
            width: 510px;
            height: 165px;
            position: absolute;
            left: 0px;
            top: 20%;
        }
        .count-div2-count{
            width: 1200px;
            height: 100%;
            margin: 0 auto;
            .yogofigcaption-title{
               width:70%;
               height: 100%;
               float: right;
               .p2{
                   color: #2c2c2c;
                   font-size: 14px;
                   font-family:Microsoft YaHei;
                   margin-top: 6%;
                   font-weight:400;
                   margin-bottom: 7px;
               }
               .p3{
                   color: #2c2c2c;
                   font-size: 14px;
                   font-family:Microsoft YaHei;
                   font-weight:400;
                   display: flex;
               }
           }
        }
    }
    .yogoteacher-count-div3{
        width: 100%;
        height: 320px;
        background-color: #eeeeee;
        position: relative;
        .count-name-img{
            position: absolute;
            right: 0px;
            width: 460px;
            height: 200px;
            top: 15%;
        }
        .yogofigcaption-mian{
            width: 1200px;
            height: 100%;
            margin:0 auto;
            position: relative;
            .yogofigcaption-img{
                width: 300px;
                height: 320px;
                position: absolute;
                top: -70px;
                .count-name-imgpic{
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
             .share3{
                width: 17%;
                text-align: center;
                position: absolute;
                bottom: 5%;
                left: 0%;
           }
            .yogofigcaption{
                width: 70%;
                height: 100%;
                float: right;
                .count-name{
                    font-size:1.3rem;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    color:rgba(0,0,0,1);
                    margin-top: 5%;
                }
                .Giveup{
                    width: 160px;
                    height: 40px;
                    border-radius: 20px;
                    line-height: 42px;
                    background: #fff;
                    margin-top: 20px;
                    text-indent: 30px;
                    box-shadow:2px 1px 4px 0px rgba(0, 0, 0, 0.08);
                    .Giveup_img{
                    width: 22px;
                    height: 22px;
                    margin-bottom: 7px;
                    cursor: pointer;
                    }
                    .Giveup_num{
                    color: #2c2c2c;
                    font-size: 14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    }
                }
                .Giveup-count{
                    display: flex;
                    margin-top: 20px;
                    .Giveup2{
                        width: 155px;
                        font-size: 14px;
                        height: 40px;
                        border-radius: 20px;
                        line-height: 42px;
                        background: #fff;
                        text-indent: 30px;
                        color: #999;
                        box-shadow:2px 1px 4px 0px rgba(0, 0, 0, 0.08);
                    }
                    .Giveup3{
                        width: auto;
                        font-size: 14px;
                        height: 40px;
                        border-radius: 20px;
                        line-height: 42px;
                        background: #fff;
                        color: #999;
                        padding: 0px 30px;
                        box-shadow:2px 1px 4px 0px rgba(0, 0, 0, 0.08);
                        margin-left: 42px;
                    }
                }
                .Giveup4{
                    width: 150px;
                    font-size: 14px;
                    height: 40px;
                    border-radius:20px;
                    line-height: 42px;
                    background: #fff;
                    margin-top: 20px;
                    text-indent: 30px;
                    color: #999;
                    box-shadow:2px 1px 4px 0px rgba(0, 0, 0, 0.08);
                }
            }
        }
    }
    .yogoteacher-count-div4{
        width: 100%;
        height: 100%;
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
                    background-color: #F6ECF7;
                    box-shadow:5px 8px 5px 0px rgba(0, 0, 0, 0.08);
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
