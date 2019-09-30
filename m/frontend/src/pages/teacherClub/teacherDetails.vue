<template>
    <div>
        <div class="details_main">
            <div class="details_head">
                <div class="count-img">
                    <div class="count-name">
                        <span class="span1">瑜伽名师<span class="span2">-vivi</span></span>
                    </div>
                    <div class="count-imgpic">
                      <img src="../../assets/teacherclub/headimg.png" class="count-name-img"/>
                    </div>
                </div>
            </div>
            <div class="details_center">
                <div class="yogofigcaption-title">
                    <h2>个人简介</h2>
                    <p class="p1">Good at courses</p>
                    <p class="p2">擅长课程：<span>理疗修复、传统瑜伽、体态调整</span></p>
                    <div class="p3">课程特色：<div style="width: 83%;line-height: 20px;">将传统瑜伽、艾扬格、功能理疗结合成有特色的一对一私教课； 累计课时超过5000小时 多年的瑜伽练习带来身体和心理层面的巨大收获。在不断实践与学习中，更加笃定的去做瑜伽的传播者；信奉瑜伽即生活；</div></div>
                </div>
            </div>
            <div class="details_foot">
                <div class="foot_exhibition">
                    <div class="foot_exhibition_page">
                        <img src="../../assets/teacherclub/yujia.png"/>
                        <span class="tips">名师个人SHOW</span>
                    </div>
                    <div class="foot_exhibition_staff">PERSONAL DISPLAY</div>
                </div>
                <div class="details_foot_list">
                    <img :src="item.path" class="list_foot_img" v-for="item in footlist" :key="item"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
        footlist:[{
            id:1,
            path:require('../../assets/teacherclub/image35.png'),
        }]
    };
  },
  methods:{
  }
};
</script>
<style lang="scss" scope>
.details_main{
    width: 100%;
    height: 100%;
    display: inline-block;
    .details_head{
        width: 100%;
        height: 185px;
        background-color: #3E3E3E;
        background-image: url('../../assets/teacherclub/bg2.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .count-img{
            width: 93%;
            height: 100%;
            position: relative;
            margin: 0 auto;
            .count-name{
                width: 48%;
                margin: 0 auto;
                border: 2px solid transparent;
                height: auto;
                position: absolute;
                bottom: 7%;
                left: 0%;
                transition: all .9s;
                line-height: 15px;
                padding-bottom: 5px;
                text-align: center;
                border-image:linear-gradient(to left,#43516A,#AE8D66) 1 10;
                .span1{
                    font-size:16px;
                    font-family:Gulim;
                    font-weight:400;
                    font-style:italic;
                    color: #43516A;
                    .span2{
                        font-size:16px;
                        font-family:Gulim;
                        font-weight:400;
                        font-style:italic;
                        color: #43516A;
                    }
                }
            }
            .count-imgpic{
                width: 98px;
                height: 98px;
                position: absolute;
                top: 10%;
                left: 19%;
                background-image: url('../../assets/teacherclub/bgimg22.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;
                .count-name-img{
                    width: 73px;
                    height: 71px;
                    position: absolute;
                    top: 8%;
                    left: 11%;
                    object-fit: cover;
                }
            }
        }
    }
    .details_center{
        width: 100%;
        height: auto;
        background-color: #3E3E3E;
        background-image: url('../../assets/teacherclub/bg1.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        display: flex;
        .yogofigcaption-title{
                width: 93%;
                height: 100%;
                margin: 0 auto;
                margin-bottom: 10px;
                margin-top: 10px;
               h2{
                    font-size:16px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    color: #fff;
                    margin-top: 3%;
               }
               .p1{
                   color: #fff;
                   font-size: 14px;
                   font-family:Myriad Pro;
                   font-weight:400;
               }
               .p2{
                   color: #fff;
                   font-size: 10px;
                   font-family:Microsoft YaHei;
                   margin-top: 6%;
                   font-weight:400;
                   margin-bottom: 7px;
               }
               .p3{
                   color: #fff;
                   font-size: 10px;
                   font-family:Microsoft YaHei;
                   font-weight:400;
                   display: flex;
               }
           }
    }
    .details_foot{
        width: 100%;
        height: auto;
        background-color: #3E3E3E;
        background-image: url('../../assets/teacherclub/bg3.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        display: inline-block;
        .foot_exhibition{
            width: 93%;
            height: 60px;
            margin: 0 auto;
            margin-top: 30px;
            .foot_exhibition_page{
                display: flex;
                margin-top: 15px;
                img{
                    width: 13px;
                    height: 15px;
                    display: block;
                    margin-top: 5px;
                }
                .tips{
                    font-size:16px;
                    font-family:PingFang SC;
                    font-weight:bold;
                    color:#65627D;
                    padding-left: 6px;
                }
            }
            .foot_exhibition_staff{
                font-size:12px;
                font-family:PingFang SC;
                font-weight:400;
                color:rgba(44,44,44,1);
                padding-top: 5px;
            }
        }
        .details_foot_list{
            width: 93%;
            margin: 0 auto;
            margin-bottom: 10px;
            .list_foot_img{
                width: 214px;
                height: 270px;
            }
        }
    }
}
</style>
