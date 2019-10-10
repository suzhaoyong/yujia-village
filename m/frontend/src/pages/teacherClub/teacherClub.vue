<template>
<div>
    <div class="club_warp">
        <div class="club_warp_list">
          <span class="liList" v-for="(item,index) in liList" :key="index" v-on:click="addClass(index)" :class="{ischeck:index==current}">{{item}}</span>
        </div>
        <div class="list_teacher" v-show="this.current === 0">
            <div class="list_banner">
                <img src="../../assets/teacherclub/banner.png"/>
            </div>
            <div class="club_house">
                <div class="club_house_title">
                    <span class="items" v-for="(item,index) in items" @click="clicktext(index)" :key="index" :class="{active:index==curritem}">{{item}}</span>
                </div>
                <div class="club_house_inquiry">
                    <input type="text" class="club_house_inquiry_input" placeholder="输入会馆名称"/>
                    <img src="../../assets/teacherclub/seek.png" class="seek"/>
                </div>
            </div>
            <div class="club_item">
                <div class="club_item_box" v-for="(item,index) in clubBox" :key="index" @click="clubBoxItem(item)">
                    <div class="club_item_img">
                        <img :src="item.path"/>
                    </div>
                    <div class="club_item_title">
                        <h3 class="van-ellipsis">{{item.title}}</h3>
                        <div class="text van-ellipsis">{{item.text}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="list_clubhouse" v-show="this.current === 1">
            <div class="list_banner">
                <img src="../../assets/teacherclub/banner.png"/>
            </div>
            <div class="list_house">
                <div class="list_house_title">
                    <div class="list_house_div">
                        <span class="house_title_tips">选择城市</span>
                        <img src="../../assets/teacherclub/launch.png" class="house_title_img"/>
                    </div>
                    <div class="list_house_div">
                        <span class="house_title_tips">工作资历</span>
                        <img src="../../assets/teacherclub/launch.png" class="house_title_img"/>
                    </div>
                    <div class="list_house_div">
                        <span class="house_title_tips">擅长类型</span>
                        <img src="../../assets/teacherclub/launch.png" class="house_title_img"/>
                    </div>
                </div>
                <div class="list_house_inquirys">
                     <span class="house_title_tips">更多</span>
                     <img src="../../assets/teacherclub/launch.png" class="house_title_img"/>
                </div>
            </div>
            <div class="list_house_type">
                <div class="house_type">
                    <div class="house_type_one" v-for="(item,index) in houseType" :key="index">
                        <span class="house_type_name">{{item.name}}</span>
                    </div>
                </div>
            </div>
            <div class="Rotation_list">
                <!-- <van-swipe :loop="false" :width="131" id="vanswipe" :show-indicators="false"> -->
                    <!-- <van-swipe-item class="van-swipe-item" v-for="(item,index) in exhibitionBox2" :key="index"> -->
                        <div class="Rotation_box" v-for="(item,index) in exhibitionBox2" :key="index">
                            <div class="Rotation_img">
                            <img :src="item.path"/>
                            </div>
                            <div class="Rotation_title">
                                <h3 class="van-ellipsis">{{item.title}}</h3>
                                <div class="texts van-ellipsis">{{item.text}}</div>
                                <div class="Rotation_zan">
                                <div class="Rotation_zan_items">教龄：{{item.num}}年</div>
                                <div class="Rotation_zan_tips">
                                    <img src="../../assets/teacherclub/yujia.png"/>
                                    <span class="span">{{item.eye}}</span>
                                </div>
                            </div>
                            </div>
                        </div>
                    <!-- </van-swipe-item> -->
                <!-- </van-swipe> -->
            </div>
            <div class="list_exhibition">
                <div class="list_exhibition_page">
                    <img src="../../assets/teacherclub/yujia.png"/>
                    <span class="tips">瑜伽名师展</span>
                </div>
                <div class="list_exhibition_staff">Guild staff profile</div>
            </div>
            <div class="exhibition_items">
                <div class="exhibition_content">
                    <div class="exhibition_box" v-for="(item,index) in exhibitionBox" :key="index" @click="exhibition(item)">
                        <div class="exhibition_img">
                        <img :src="item.path"/>
                        </div>
                        <div class="exhibition_title">
                            <h3 class="van-ellipsis">{{item.title}}</h3>
                            <div class="texts van-ellipsis">{{item.text}}</div>
                            <div class="exhibition_zan">
                            <div class="exhibition_zan_items">教龄：{{item.num}}年</div>
                            <div class="exhibition_zan_tips">
                                <img src="../../assets/teacherclub/yujia.png"/>
                                <span class="span">{{item.eye}}</span>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data() {
    return {
        current:0,
        curritem:0,
        liList:["联盟会馆","瑜伽名师"],
        items:["全部","最新","距离最近"],
        clubBox:[{
            id:1,
            path:require('../../assets/teacherclub/image11.png'),
            title:'观云瑜伽',
            text:'四川省成都市锦江区'
        },
        {
            id:2,
            path:require('../../assets/teacherclub/image11.png'),
            title:'观云瑜伽',
            text:'四川省成都市锦江区'
        },
        {
            id:3,
            path:require('../../assets/teacherclub/image11.png'),
            title:'观云瑜伽',
            text:'四川省成都市锦江区'
        },
        {
            id:4,
            path:require('../../assets/teacherclub/image11.png'),
            title:'观云瑜伽',
            text:'四川省成都市锦江区'
        }],
        houseType:[{
            name:'普拉提'
        },{
            name:'流瑜伽'
        },{
            name:'阿斯汤加'
        },{
            name:'内冠流'
        },{
            name:'阴瑜伽'
        },{
            name:'阴瑜伽'
        },{
            name:'孕产瑜伽'
        },{
            name:'哈他'
        },{
            name:'寰宇'
        }],
        exhibitionBox:[{
            id:1,
            path:require('../../assets/teacherclub/image11.png'),
            title:'Ivan',
            text:'流瑜伽',
            num:3,
            eye:234
        },
        {
            id:2,
            path:require('../../assets/teacherclub/image11.png'),
            title:'Ivan',
            text:'流瑜伽',
            num:3,
            eye:234
        },
        {
            id:3,
            path:require('../../assets/teacherclub/image11.png'),
            title:'Ivan',
            text:'流瑜伽',
            num:3,
            eye:234
        },
        {
            id:4,
            path:require('../../assets/teacherclub/image11.png'),
            title:'Ivan',
            text:'流瑜伽',
            num:3,
            eye:234
        }],
        exhibitionBox2:[{
            id:1,
            path:require('../../assets/teacherclub/image11.png'),
            title:'Ivan',
            text:'流瑜伽',
            num:3,
            eye:234
        },
        {
            id:2,
            path:require('../../assets/teacherclub/image11.png'),
            title:'Ivan',
            text:'流瑜伽',
            num:3,
            eye:234
        },
        {
            id:3,
            path:require('../../assets/teacherclub/image11.png'),
            title:'Ivan',
            text:'流瑜伽',
            num:3,
            eye:234
        }],
    };
  },
  methods:{
    addClass:function(index){
        this.current=index;
    },
    clicktext:function(index){
        this.curritem = index;
    },
    clubBoxItem(item){
        this.$router.push({
            path: "/teacherClub/clubhouseDetails",
            query: {
            id: item.id
            }
        });
    },
    exhibition(item){
        this.$router.push({
            path: "/teacherClub/teacherDetails",
            query: {
            id: item.id
            }
        });
    }
  }
}
</script>
<style lang="scss" scoped>
.distpicker-address-wrapper select{
    width: 70px !important;
    padding: 0px 4px !important;
    font-size: 12px !important;
}
input::-webkit-input-placeholder{
    color:#999;
}
input:-moz-placeholder{
    color:#999;
}
input::-moz-placeholder{
    color:#999;
}
input:-ms-input-placeholder{
    color:#999;
}
.el-dropdown-link {
    cursor: pointer!important;
    color: #2c2c2c!important;
  }
  .el-icon-arrow-down {
    font-size: 12px!important;
  }
.club_warp{
    width: 100%;
    height: 100%;
    display: inline-block;
    .club_warp_list{
        width: 100%;
        height: 44px;
        font-size:14px;
        font-family:PingFang SC;
        font-weight:400;
        line-height: 44px;
        text-align: center;
        display: flex;
        .liList{
            height: 100%;
            width: 50%;
            background-color: #fff;
            color: #2C2C2C;
        }
        .ischeck  {
            background: #7BBB62;
            height: 100%;
            width: 50%;
            color: #fff;
        }
    }
    .list_teacher{
        width: 100%;
        height: 100%;
        .list_banner{
          width: 100%;
          height: 100%;
          img{
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        .club_house{
            width: 93%;
            height: 100%;
            margin: 0 auto;
            display: flex;
            .club_house_title{
                width: 50%;
                height: 60px;
                line-height: 45px;
                .items{
                    font-size:12px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(44,44,44,1);
                    padding-right: 10px;
                }
                .active{
                    font-size:12px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    color:rgba(44,44,44,1);
                }
            }
            .club_house_inquiry{
                width: 50%;
                height: 60px;
                position: relative;
                .club_house_inquiry_input{
                    background-color: #eeeeee;
                    border-radius: 13px;
                    height: 35px;
                    width: 90%;
                    float: right;
                    font-size: 12px;
                    color: #999;
                    text-indent: 25px;
                    margin-top: 10px;
                }
                .seek{
                    position: absolute;
                    width: 10px;
                    height: 11px;
                    right: 20px;
                    top: 23px;
                }
            }
        }
        .club_item{
            width: 93%;
            height: 100%;
            margin: 0 auto;
            display: flow-root;
            .club_item_box{
                width: 48%;
                height: 100%;
                float: left;
                margin-bottom: 10px;
                overflow: hidden;
                .club_item_img{
                    width: 100%;
                    height: 146px;
                    img{
                        width: 100%;
                        height: 100%;
                        display: block;
                        object-fit: cover;
                    }
                }
                .club_item_title{
                    width: 100%;
                    height: 75px;
                    background-color: #eeeeee;
                    display: inline-block;
                    h3{
                        font-size:12px;
                        font-family:Microsoft YaHei;
                        font-weight:400;
                        color:rgba(44,44,44,1);
                        margin-top: 20px;
                        text-indent: 10px;
                        width: 93%;
                    }
                    .text{
                        font-size: 10px;
                        font-family:PingFang SC;
                        font-weight:400;
                        color: #999;
                        margin-top: 15px;
                        text-indent: 10px;
                        width: 93%;
                    }
                }
            }
            .club_item_box:nth-child(2n){
                width: 48%;
                height: 222px;
                margin-bottom: 10px;
                margin-left: 13px;
                .club_item_img{
                    width: 100%;
                    height: 146px;
                    img{
                        width: 100%;
                        height: 100%;
                        display: block;
                        object-fit: cover;
                    }
                }
                .club_item_title{
                    width: 100%;
                    height: 75px;
                    background-color: #eeeeee;
                    display: inline-block;
                    h3{
                        font-size:12px;
                        font-family:Microsoft YaHei;
                        font-weight:400;
                        color:rgba(44,44,44,1);
                        margin-top: 20px;
                        text-indent: 10px;
                        width: 93%;
                    }
                    .text{
                        font-size: 10px;
                        font-family:PingFang SC;
                        font-weight:400;
                        color: #999;
                        margin-top: 15px;
                        text-indent: 10px;
                        width: 93%;
                    }
                }
            }
        }
    }
    .list_clubhouse{
        width: 100%;
        height: 100%;
        .list_banner{
          width: 100%;
          height: 100%;
          img{
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        .list_house{
            width: 93%;
            height: 100%;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            .list_house_title{
                width: 75%;
                height: 55px;
                line-height: 45px;
                .list_house_div:nth-child(1){
                    width: 80px;
                    float: left;
                    .house_title_tips{
                    font-size:12px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(44,44,44,1);
                    padding-right: 16px;
                  }
                  .house_title_img{
                      width: 10px;
                      height: 7px;
                      margin-left: -12px;
                  }
                }
                .list_house_div:nth-child(2){
                    width: 80px;
                    float: left;
                    .house_title_tips{
                    font-size:12px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(44,44,44,1);
                    padding-right: 16px;
                  }
                  .house_title_img{
                      width: 10px;
                      height: 7px;
                      margin-left: -12px;
                  }
                }
                .list_house_div:nth-child(3){
                    width: 80px;
                    float: left;
                    .house_title_tips{
                    font-size:12px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(44,44,44,1);
                    padding-right: 16px;
                  }
                  .house_title_img{
                      width: 10px;
                      height: 7px;
                      margin-left: -12px;
                  }
                }
            }
            .list_house_inquirys{
                width: 20%;
                height: 55px;
                line-height: 45px;
                text-align: end;
                .house_title_tips{
                    font-size:12px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(44,44,44,1);
                    padding-right: 16px;
                  }
                  .house_title_img{
                      width: 10px;
                      height: 7px;
                      margin-left: -12px;
                  }
            }
        }
        .list_house_type{
            width: 100%;
            height: auto;
            background-color: #eeeeee;
            display: inline-block;
            .house_type{
                width: 93%;
                height: 100%;
                margin: 0 auto;
                display: flow-root;
                margin-bottom: 10px;
                .house_type_one{
                    width: 52px;
                    height: 52px;
                    border-radius: 50%;
                    // line-height: 42px;
                    text-align: center;
                    background-color: #ffffff;
                    margin-top: 10px;
                    margin-right: 6px;
                    float: left;
                    .house_type_name{
                        font-size:10px;
                        font-family:PingFang SC;
                        font-weight:400;
                        display: block;
                        padding-top: 15px;
                        color:rgba(44,44,44,1);
                    }
                }
            }
        }
        .Rotation_list{
            width: 96%;
            height: 100%;
            display: -webkit-box;
            margin-left: auto;
            // #vanswipe{
            // position: relative;
            // overflow: hidden;
            // -webkit-user-select: none;
            // user-select: none;
            // .van-swipe__track{
            //     height: 100% ;
            //     width: 100% !important;
            //     display: -webkit-box;
            //     display: flex !important;
            //     justify-content: center;
            // .van-swipe-item{
            //     float: left !important;
            //     margin-right:8px !important;
                .Rotation_box{
                width: 131px;
                height: 100%;
                box-shadow:0px 1px 4px 0px rgba(22,27,27,0.18);
                border-radius:3px;
                margin-right: 10px;
                margin-bottom: 10px;
                .Rotation_img{
                    width: 100%;
                    height: 110px;
                    background-color: #E5E5E5;
                    img{
                        width: 100%;
                        height: 100%;
                        display: block;
                        object-fit: cover;
                    }
                }
                .Rotation_title{
                    width: 100%;
                    height: 60px;
                    background-color: #ffffff;
                    display: inline-block;
                    h3{
                        font-size:14px;
                        font-family:PingFang SC;
                        font-weight:bold;
                        color:rgba(44,44,44,1);
                        text-indent: 10px;
                        margin-top: 8%;
                    }
                    .texts{
                        font-size:12px;
                        font-family:PingFang SC;
                        font-weight:400;
                        color:rgba(44,44,44,1);
                        padding-top: 2px;
                        text-indent: 10px;
                    }
                    .Rotation_zan{
                        font-size:12px;
                        font-family:PingFang SC;
                        font-weight:400;
                        color:rgba(44,44,44,1);
                        display: flex;
                        justify-content: space-between;
                        margin-top: 10px;
                        margin-bottom: 10px;
                        .Rotation_zan_items{
                            text-indent: 10px;
                        }
                        .Rotation_zan_tips{
                            display: flex;
                            padding-right: 10px;
                            img{
                                width: 11px;
                                height: 11px;
                                display: block;
                            }
                            .span{
                                font-size:12px;
                                font-family:PingFang SC;
                                font-weight:400;
                                color:rgba(44,44,44,1);
                            }
                        }
                    }
                }
            }
        //     }
        // }
        // }
        }
        .list_exhibition{
            width: 93%;
            height: 60px;
            margin: 0 auto;
            .list_exhibition_page{
                display: flex;
                margin-top: 15px;
                img{
                    width: 13px;
                    height: 15px;
                    display: block;
                }
                .tips{
                    font-size:14px;
                    font-family:PingFang SC;
                    font-weight:bold;
                    color:rgba(44,44,44,1);
                    padding-left: 6px;
                }
            }
            .list_exhibition_staff{
                font-size:12px;
                font-family:PingFang SC;
                font-weight:400;
                color:rgba(44,44,44,1);
                padding-top: 5px;
            }
        }
        .exhibition_items{
            width: 100%;
            background-color: #eeeeee;
            height: 100%;
            display: inline-block;
            .exhibition_content{
                width: 93%;
                height: 100%;
                display: flow-root;
                margin: 0 auto;
                margin-top: 10px;
                .exhibition_box{
                    width: 48%;
                    height: 100%;
                    float: left;
                    border-radius:3px;
                    margin-bottom: 8px;
                    .exhibition_img{
                        width: 100%;
                        height: 130px;
                        background-color: #E5E5E5;
                        img{
                            width: 100%;
                            height: 100%;
                            display: block;
                            object-fit: cover;
                        }
                    }
                    .exhibition_title{
                        width: 100%;
                        height: 85px;
                        background-color: #ffffff;
                        display: inline-block;
                        h3{
                            font-size:14px;
                            font-family:PingFang SC;
                            font-weight:bold;
                            color:rgba(44,44,44,1);
                            text-indent: 10px;
                            margin-top: 8%;
                        }
                        .texts{
                            font-size:12px;
                            font-family:PingFang SC;
                            font-weight:400;
                            color:rgba(44,44,44,1);
                            padding-top: 2px;
                            text-indent: 10px;
                        }
                        .exhibition_zan{
                            font-size:12px;
                            font-family:PingFang SC;
                            font-weight:400;
                            color:rgba(44,44,44,1);
                            display: flex;
                            justify-content: space-between;
                            margin-top: 12px;
                            .exhibition_zan_items{
                                text-indent: 10px;
                            }
                            .exhibition_zan_tips{
                                display: flex;
                                padding-right: 10px;
                                img{
                                    width: 11px;
                                    height: 11px;
                                    display: block;
                                }
                                .span{
                                    font-size:12px;
                                    font-family:PingFang SC;
                                    font-weight:400;
                                    color:rgba(44,44,44,1);
                                }
                            }
                        }
                    }
                }
                .exhibition_box:nth-child(2n){
                    width: 48%;
                    height: 100%;
                    float: left;
                    border-radius:3px;
                    margin-bottom: 8px;
                    margin-left: 13px;
                    .exhibition_img{
                        width: 100%;
                        height: 130px;
                        background-color: #E5E5E5;
                        img{
                            width: 100%;
                            height: 100%;
                            display: block;
                            object-fit: cover;
                        }
                    }
                    .exhibition_title{
                        width: 100%;
                        height: 85px;
                        background-color: #ffffff;
                        display: inline-block;
                        h3{
                            font-size:14px;
                            font-family:PingFang SC;
                            font-weight:bold;
                            color:rgba(44,44,44,1);
                            text-indent: 10px;
                            margin-top: 8%;
                        }
                        .texts{
                            font-size:12px;
                            font-family:PingFang SC;
                            font-weight:400;
                            color:rgba(44,44,44,1);
                            padding-top: 2px;
                            text-indent: 10px;
                        }
                        .exhibition_zan{
                            font-size:12px;
                            font-family:PingFang SC;
                            font-weight:400;
                            color:rgba(44,44,44,1);
                            display: flex;
                            justify-content: space-between;
                            margin-top: 12px;
                            .exhibition_zan_items{
                                text-indent: 10px;
                            }
                            .exhibition_zan_tips{
                                display: flex;
                                padding-right: 10px;
                                img{
                                    width: 11px;
                                    height: 11px;
                                    display: block;
                                }
                                .span{
                                    font-size:12px;
                                    font-family:PingFang SC;
                                    font-weight:400;
                                    color:rgba(44,44,44,1);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>