<template>
    <el-col :span="24">
        <div class="yogoteacher-main">
            <div class="yogoteacher-count-div1">
                <div class="count-img" :style="{ 'background-image': 'url(' + teacher.path + ')','background-repeat':'no-repeat','background-size':'100% 100%' }">
                    <!-- <img :src="teacher.path" class="img1"/> -->
                    <div class="count-div">
                    <div class="count-name">
                        <span class="span1">瑜伽名师<span class="span2"> — {{teacher.name}}</span></span>
                    </div>
                    <img :src="teacher.cover" class="count-name-img"/>
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
                        <p class="p2">擅长课程：<span>{{teacher.good_at}}</span></p>
                        <div class="p3">课程特色：<span v-html="teacher.content">{{teacher.content}}</span></div>
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
                        <!-- <div class="showtext">
                            <span class="show-span">{{item.theme}}</span>
                        </div> -->
                        </div>
                    </div>
                </div>
                <div class="Default-page8" v-else>
                    <div class="Default-main8">
                    <img src="../assets/default.png"/>
                    <span class="page-span8">我寻寻觅觅却找不到您的踪迹~</span>
                    </div>
                </div>
                <!-- <img src="../assets/image85.png" class="count-name-img5"/> -->
            </div>
        </div>
    </el-col>
</template>
<script>
export default {
  data() {
    return {
        teacher:'',
        showList:[]
    };
  },
  created () {
      this.yogoteacherdata();
  },
  methods:{
      yogoteacherdata(){
        let _this = this;
        this.$request(`/teachers/${_this.$route.query.id}`).then(res => {
            let { teacher,course} = res;
            _this.showList = res.course;
            _this.teacher = res.teacher;
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
.yogoteacher-main{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    .yogoteacher-count-div1{
        width: 100%;
        height: 100%;
        margin: 0 auto;
        background-color: #3E3E3E;
        .count-img{
            width: 100%;
            height: 1334px;
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
                line-height: 192px;
                text-align: center;
                .span1{
                    font-size:4rem;
                    font-family:Gulim;
                    font-weight:400;
                    font-style:italic;
                    color: #C19765;
                    .span2{
                        font-size:4rem;
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
                transform: scale(.98);
                text-align: center;
                line-height: 192px;
                .span1{
                    font-size:4rem;
                    font-family:Gulim;
                    font-weight:400;
                    font-style:italic;
                    color: #C19765;
                    .span2{
                        font-size:4rem;
                        font-family:Gulim;
                        font-weight:400;
                        font-style:italic;
                        color: #ffffff;
                    }
                }
            }
            .count-name-img{
                width: 500px;
                height: 670px;
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
                   display: flex;
                   font-family:Microsoft YaHei;
               }
           }
        }
    }
    .yogoteacher-count-div4{
        width: 100%;
        height: 100%;
        background-image: url('../assets/image84.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: relative;
        display: inline-block;
        padding-bottom: 20px;
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
            background-color: #D2CEE4;
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
