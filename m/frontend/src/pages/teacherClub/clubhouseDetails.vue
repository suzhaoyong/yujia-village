<template>
    <div>
        <div class="clubhouse_main">
            <div class="list_clubhouse">
                <div class="list_clubhouse_page">
                    <img src="../../assets/teacherclub/yujia.png"/>
                    <span class="tips">会馆课程</span>
                </div>
                <div class="list_clubhouse_staff">Sometimes beauty is so simple</div>
            </div>
            <div class="club_items">
                <van-swipe :loop="false" :width="131" id="vanswipe2" :show-indicators="false">
                    <van-swipe-item class="vanswipeitem2" v-for="(item,index) in clubItems" :key="index">
                        <div class="club_items_list">
                            <div class="club_items_img">
                                <img :src="item.path"/>
                            </div>
                            <div class="club_items_title">
                                <h3 class="van-ellipsis">{{item.title}}</h3>
                                <van-rate v-model="item.rate" readonly size="10px" gutter="2px" color="#58B708" void-color="#58B708"/>
                                <div class="club_items_title_its">
                                    <div class="club_price">￥{{item.price}}</div>
                                    <div class="club_prict">
                                        <img src="../../assets/teacherclub/enlist.png"/>
                                        想学
                                    </div>
                                </div>
                            </div>
                        </div>
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div class="border"></div>
            <div class="club_ambient">
                <div class="club_ambient_page">
                    <img src="../../assets/teacherclub/yujia.png"/>
                    <span class="tips">会馆环境</span>
                </div>
                <div class="club_ambient_staff">Sometimes beauty simple</div>
                 <img src="../../assets/teacherclub/clubimg.png" class="club_ambient_img"/>
            </div>
            <div class="club_picture">
                <van-swipe :loop="false" :width="151" id="vanswipe" :show-indicators="false">
                    <van-swipe-item class="vanswipeitem" v-for="(item,index) in vanswipeItem" :key="index">
                        <img :src="item" class="img_pl"/>
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div class="club_picture_present">
                <p class="present_text">
                    观云瑜伽拥有1000平米场馆，瑜伽教练团队专业，分工明确。重金聘请印度瑜伽名师Deepak来馆内任教，无论你是新手还是专业人才，在这里都能有所收获。馆内拥有专业的保洁团队，准时清洁每一块场地，每一个死角，确保您始终处于健康安全舒适的环境中。
                </p>
            </div>
            <div class="club_tel">
                <img src="../../assets/teacherclub/tel.png" class="img_tel"/>
                400-100-7191
            </div>
            <div class="club_address">
                <img src="../../assets/teacherclub/address.png" class="img_address"/>
                成都市锦江区双桂路泰合财富中心7栋302
            </div>
            <div class="border2"></div>
            <div class="house_personnel">
                <div class="house_personnel_page">
                    <img src="../../assets/teacherclub/yujia.png"/>
                    <span class="tips">馆内人员简介</span>
                </div>
                <div class="house_personnel_staff">Guild staff profile</div>
            </div>
            <div class="house_personnel_lists">
                 <van-swipe :loop="false" :width="254" id="vanswipe3" :show-indicators="false">
                    <van-swipe-item class="vanswipeitem3" v-for="(item,index) in personnelItem" :key="index">
                        <div class="personnel_lists_items">
                            <div class="personnel_lists_img">
                                <img :src="item.path"/>
                            </div>
                            <div class="personnel_lists_name van-ellipsis">{{item.name}}</div>
                            <div class="personnel_lists_name2 van-ellipsis">{{item.title}}</div>
                        </div>
                    </van-swipe-item>
                </van-swipe>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
        vanswipeItem:[
        require('../../assets/teacherclub/image11.png'),
        require('../../assets/teacherclub/image11.png'),
        require('../../assets/teacherclub/image11.png'),
        require('../../assets/teacherclub/image11.png')],
        clubItems:[{
            id:1,
            path:require('../../assets/teacherclub/image35.png'),
            title:'普拉提',
            rate:3,
            price:4353
        },
        {
            id:2,
            path:require('../../assets/teacherclub/image35.png'),
            title:'普拉提',
            rate:3,
            price:4350
        },
        {
            id:3,
            path:require('../../assets/teacherclub/image35.png'),
            title:'普拉提',
            rate:3,
            price:4350
        }],
        personnelItem:[{
            id:1,
            path:require('../../assets/teacherclub/image11.png'),
            name:'Ivan',
            title:'艾扬格、哈他、流瑜伽'
        },
        {
            id:2,
            path:require('../../assets/teacherclub/image11.png'),
            name:'Ivan',
            title:'艾扬格、哈他、流瑜伽'
        },
        {
            id:3,
            path:require('../../assets/teacherclub/image11.png'),
            name:'Ivan',
            title:'艾扬格、哈他、流瑜伽'
        }]
    };
  },
  methods:{
  }
};
</script>
<style lang="scss" scope>
.clubhouse_main{
    width: 100%;
    height: 100%;
    display: inline-block;
    .list_clubhouse{
        width: 93%;
        height: 60px;
        margin: 0 auto;
        .list_clubhouse_page{
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
        .list_clubhouse_staff{
            font-size:12px;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(44,44,44,1);
            padding-top: 5px;
        }
    }
    .club_items{
        width: 96%;
        // margin: 0 auto;
        margin-left: auto;
        // margin-inline-start: auto;
        height: 100%;
        display: flex;
        margin-bottom: 20px;
        #vanswipe2{
            position: relative;
            overflow: hidden;
            -webkit-user-select: none;
            user-select: none;
            .van-swipe__track{
                height: 100%;
                width: 100% !important;
                display: -webkit-box;
                justify-content: center;
            .vanswipeitem2{
                float: left;
                width: 131px;
                height: 113px;
                margin-right:8px;
                .club_items_list{
                    width: 131px;
                    height: 100%;
                    box-shadow:0px 1px 4px 0px rgba(22,27,27,0.18);
                    border-radius:3px;
                    margin-right: 10px;
                    margin-bottom: 10px;
                    .club_items_img{
                        width: 100%;
                        height: 110px;
                        img{
                            width: 100%;
                            height: 100%;
                            display: block;
                            object-fit: cover;
                        }
                    }
                    .club_items_title{
                        width: 100%;
                        height: 63px;
                        width: 92%;
                        margin: 0 auto;
                        h3{
                            font-family:PingFang SC;
                            font-weight:bold;
                            color:rgba(44,44,44,1);
                            font-size: 12px;
                            margin-top:8px;
                        }
                        .van-rate{
                            display: inherit;
                            user-select:none;
                            height: 20px;
                            line-height: 10px;
                        }
                        .club_items_title_its{
                            display: flex;
                            justify-content: space-between;
                            .club_price{
                                font-family:PingFang SC;
                                font-weight:500;
                                font-size: 10px;
                                color:rgba(44,44,44,1);
                            }
                            .club_prict{
                                font-family:PingFang SC;
                                font-weight:500;
                                font-size: 10px;
                                color: #999;
                            }
                        }
                    }
                }
            }
            }
        }
    }
    .border{
        width: 100%;
        height: 5px;
        background: #C6C6C6;
    }
    .club_ambient{
        width: 93%;
        height: 70px;
        margin: 0 auto;
        position: relative;
        .club_ambient_page{
            display: flex;
            margin-top: 50px;
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
        .club_ambient_staff{
            font-size:12px;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(44,44,44,1);
            padding-top: 5px;
        }
        .club_ambient_img{
            position: absolute;
            width: 220px;
            top: -15px;
        }
    }
    .club_picture{
        width: 100%;
        height: 100%;
        // display: flex;
        margin-bottom: 20px;
        #vanswipe{
            position: relative;
            overflow: hidden;
            -webkit-user-select: none;
            user-select: none;
            .van-swipe__track{
                height: 100%;
                width: 100% !important;
                display: -webkit-box;
                justify-content: center;
            .vanswipeitem{
                float: left;
                width: 151px;
                height: 113px;
                margin-right:8px;
                .img_pl{
                    width: 151px;
                    height: 113px;
                    display: block;
                    object-fit: cover;
                    margin-right: 10px;
                }
            }
            }
        }
    }
    .club_picture_present{
        width: 93%;
        height: auto;
        margin: 0 auto;
        margin-bottom: 20px;
        line-height: 15px;
        border-left: 7px solid #E5E5E5;
     .present_text{
        font-size:10px;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(153,153,153,1);
        margin-left: 15px;
     }   
    }
    .club_tel{
        width: 93%;
        height: 30px;
        margin: 0 auto;
        font-size:10px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(44,44,44,1);
        .img_tel{
            width: 17px;
            height: 17px;
        }
    }
    .club_address{
        width: 93%;
        height: 30px;
        margin: 0 auto;
        font-size:10px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(44,44,44,1);
        margin-bottom: 18px;
        .img_address{
            width: 17px;
            height: 17px;
        }
    }
    .border2{
        width: 100%;
        height: 9px;
        background: #CDCDCD;
    }
    .house_personnel{
        width: 100%;
        height: 60px;
        margin: 0 auto;
        .house_personnel_page{
            display: flex;
            justify-content: center;
            margin-top: 20px;
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
        .house_personnel_staff{
            font-size:12px;
            text-align: center;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(44,44,44,1);
            padding-top: 5px;
        }
    }
    .house_personnel_lists{
        width: 100%;
        height: 100%;
        margin-bottom: 20px;
        display: inline-block;
        #vanswipe3{
            position: relative;
            overflow: hidden;
            -webkit-user-select: none;
            user-select: none;
            .van-swipe__track{
                height: 100%;
                width: 100% !important;
                display: -webkit-box;
                justify-content: center;
            .vanswipeitem3{
                float: left;
                width: 254px;
                height: 300px;
                margin-right:8px;
                .personnel_lists_items{
                    width: 254px;
                    height: 100%;
                    margin-right: 10px;
                    float: left;
                    .personnel_lists_img{
                        width: 100%;
                        height: 254px;
                        background: #EEEEEE;
                        img{
                            width: 100%;
                            height: 100%;
                            display: block;
                            object-fit: cover;
                        }
                    }
                    .personnel_lists_name{
                        text-align: center;
                        font-size:12px;
                        font-family:PingFang SC;
                        font-weight:400;
                        color:rgba(44,44,44,1);
                        line-height: 30px;
                        padding-top: 10px;
                        width: 90%;
                        margin: 0 auto;
                    }
                    .personnel_lists_name2{
                        text-align: center;
                        font-size:10px;
                        font-family:PingFang SC;
                        font-weight:400;
                        color:rgba(44,44,44,1);
                        padding-bottom: 20px;
                        width: 90%;
                        margin: 0 auto;
                    }
                }
            }
            }
        }
    }
}
</style>