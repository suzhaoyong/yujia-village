<template>
<div>
    <div class="club_warp">
        <div class="club_warp_head">名师&会馆</div>
        <div class="club_warp_list">
          <span class="liList" v-for="(item,index) in liList" :key="index" v-on:click="addClass(index)" :class="{ischeck:index==current}">{{item}}</span>
        </div>
        <div class="list_teacher" v-show="this.current === 0">
            <div class="list_banner" :style="{backgroundImage: 'url('+banner+')'}"></div>
            <div class="club_house">
                <div class="club_house_title">
                    <span class="items" v-for="(item,index) in items" @click="clicktext(index)" :key="index" :class="{active:index==curritem}">{{item}}</span>
                </div>
                <div class="club_house_inquiry">
                    <input type="text" class="club_house_inquiry_input" v-model="name" placeholder="输入会馆名称"/>
                    <img src="../../assets/teacherclub/seek.png" class="seek" @click="seekclick"/>
                </div>
            </div>
            <div class="club_item" v-if="clubBox.length > 0">
                <div class="club_item_box" v-for="(item,index) in clubBox" :key="index" @click="clubBoxItem(item)">
                    <div class="club_item_img">
                        <img :src="item.first_img"/>
                    </div>
                    <div class="club_item_title">
                        <h3 class="van-ellipsis">{{item.club_name}}</h3>
                        <div class="text van-ellipsis">{{item.club_address}}</div>
                    </div>
                </div>
            </div>
            <div class="Default-page4" v-else>
                <span class="page-span4">我寻寻觅觅却找不到您的踪迹~</span>
            </div>
        </div>
        <div class="list_clubhouse" v-show="this.current === 1">
            <div class="list_banner" :style="{backgroundImage: 'url('+banner2+')'}"></div>
            <div class="list_house">
                <div class="list_house_title">
                    <div class="list_house_div" @click.stop="isOpen2 = true">
                        <span class="house_title_tips">选择城市</span>
                        <img src="../../assets/teacherclub/launch.png" class="house_title_img"/>
                    </div>
                    <div class="list_house_div" @click.stop="isOpen = true">
                        <span class="house_title_tips">工作资历</span>
                        <img src="../../assets/teacherclub/launch.png" class="house_title_img"/>
                    </div>
                    <div class="list_house_div" @click="toggle">
                        <span class="house_title_tips">擅长类型</span>
                        <img src="../../assets/teacherclub/launch.png" class="house_title_img"/>
                    </div>
                </div>
                <div class="list_house_inquirys" @click="more">
                    <span class="house_title_tips">更多</span>
                    <img src="../../assets/teacherclub/launch.png" class="house_title_img"/>
                </div>
            </div>
            <transition name="fade">
            <div class="list_house_type" v-if="visible">
                <div class="house_type">
                    <div class="house_type_one" @click="chooseClassify(item,index)" v-for="(item,index) in houseType" :key="index">
                        <span class="house_type_name" :class="{selected: isActive == index}">{{item.name}}</span>
                    </div>
                </div>
            </div>
            </transition>
            <transition name="fade">
            <div class="Rotation_list hot-swiper" v-if="Box2">
                <div class="swiper-container swiper1">
                    <div class="swiper-wrapper">
                        <div class="Rotation_box swiper-slide" v-for="(item,index) in exhibitionBox2" :key="index">
                            <div class="Rotation_img" @click="exhibition(item)">
                             <img :src="item.first_img"/>
                            </div>
                            <div class="Rotation_title">
                                <h3 class="van-ellipsis">{{item.name}}</h3>
                                <div class="texts van-ellipsis">{{item.good_at}}</div>
                                <div class="Rotation_zan">
                                <div class="Rotation_zan_items">教龄：{{item.num}}年</div>
                                <div class="Rotation_zan_tips">
                                    <img src="../../assets/teacherclub/Give.png"/>
                                    <span class="span">{{item.praise}}</span>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
            </transition>
            <div class="list_exhibition">
                <div class="list_exhibition_page">
                    <img src="../../assets/teacherclub/yujia.png"/>
                    <span class="tips">瑜伽名师展</span>
                </div>
                <div class="list_exhibition_staff">Guild staff profile</div>
            </div>
            <div class="exhibition_items" v-if="exhibitionBox.length > 0">
                <div class="exhibition_content">
                    <div class="exhibition_box" v-for="(item,index) in exhibitionBox" :key="index">
                        <div class="exhibition_img" @click="exhibition(item)">
                        <img :src="item.first_img"/>
                        </div>
                        <div class="exhibition_title">
                            <h3 class="van-ellipsis">{{item.name}}</h3>
                            <div class="texts van-ellipsis">{{item.good_at}}</div>
                            <div class="exhibition_zan">
                            <div class="exhibition_zan_items">教龄：{{item.num}}年</div>
                            <div class="exhibition_zan_tips">
                                <img src="../../assets/teacherclub/Give.png" v-if="Giveupimg" @click="Giveuppraise(item)"/>
                                <img src="../../assets/teacherclub/Give2.png" v-if="Giveupimg1" @click="Giveuppraise(item)"/>
                                <span class="span">{{item.praise}}</span>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
             <div class="Default-page5" v-else>
                <span class="page-span5">我寻寻觅觅却找不到您的踪迹~</span>
            </div>
        </div>
        <van-action-sheet v-model="isOpen" :actions="actions" @select="onSelect" cancel-text="取消"/>
        <!-- <van-area :area-list="areaList" @confirm="changeArea" :columns-num="2" @cancel="isOpen2 = false"/> -->
        <!-- <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @click.stop="isOpen2 = true"/> -->
        <van-action-sheet v-model="isOpen2" :actions="columns" @select="onSelect2" cancel-text="取消"/>
    </div>
</div>
</template>
<script>
import Swiper from 'swiper';
// import area_list from "./area_list.js";
export default {
    data() {
    return {
        isOpen: false,
        isOpen2: false,
        current:0,
        curritem:0,
        banner:'',
        visible:true,
        Box2:false,
        banner2:'',
        isActive: 0,
        name:"",
        num:"",
        num2:"",
        Giveupimg:true,
        Giveupimg1:false,
        liList:["联盟会馆","瑜伽名师"],
        items:["全部","最新","距离最近"],
        clubBox:[],
        change:[],
        value:"",
        ids:"",
        // areaList: area_list,
        columns:[{id:1,name:"杭州"},{id:2,name:"宁波"},{id:3,name:"温州"},{id:4,name:"嘉兴"},{id:5,name:"湖州"}],
        actions:[],
        houseType:[],
        exhibitionBox:[],
        exhibitionBox2:[],
    };
  },
  created(){
      this.joindata();
      this.exhibitionList();
  },
  methods:{
      //会馆列表
      joindata(){
        this.$request.get(`/clubs`).then(res => {
            this.clubBox = res.data.data;
            this.banner = res.banner;
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
      //名师列表
      exhibitionList(){
        this.$request.get(`/teachers`).then(res => {
            this.exhibitionBox = res.teachers.data;
            this.houseType = res.course_types;
            this.actions = res.year;
            this.banner2 = res.banner;
            this.$nextTick(function() {
                this.swiperInit();
            })
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
      //点赞
      Giveuppraise(item){
        let params ={
            id:item.id
        }
        this.$request.post(`/teachers/thumbsUp`,params).then(data => {
            this.msg = data.msg;
            if(this.msg == "OK"){
            alert("点赞成功");
            this.Giveupimg1 = true;
            this.Giveupimg = false;
            this.exhibitionList();
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
      swiperInit(){
        new Swiper('.swiper1', {
            slidesPerView: 'auto',
            freeMode: true,
            observer: true,
        });
      },
    addClass:function(index){
        this.current=index;
    },
    clicktext:function(index){
        this.curritem = index;
    },
    toggle: function() {
        this.visible = !this.visible //取反
     },
     more(){
        this.visible = false;
     },
     // 点击选项时默认不会关闭菜单，可以手动关闭
     onSelect(item) {
      this.isOpen = false;
      this.num = item.name;
      let params = {
                name:"",//老师名字
                good_at:this.ids,//擅长
                min_num:"0",//最小资历
                max_num:this.num,//最大资历
                city:"",//城市
                province:"",//省
                area:this.num2//区
            }
        this.$request.post(`/teachers`, params)
        .then(res => {
            this.exhibitionBox2 = res.data;
            this.Box2 = true;
        })
        .catch(error => {
            this.$message({
                message: '找不到你要的数据',
                type: "error"
            });
            return;
        });
    },
    onSelect2(item) {
      this.isOpen2 = false;
      this.num2 = item.name;
      let params = {
                name:"",//老师名字
                good_at:this.ids,//擅长
                min_num:this.num,//最小资历
                max_num:"",//最大资历
                city:"",//城市
                province:"",//省
                area:this.num2//区
            }
        this.$request.post(`/teachers`, params)
        .then(res => {
            this.exhibitionBox2 = res.data;
            this.Box2 = true;
        })
        .catch(error => {
            this.$message({
                message: '找不到你要的数据',
                type: "error"
            });
            return;
        });
    },
    // 选择分类
    chooseClassify(item,index) {
        this.isActive = index;
        this.ids = item.id;
        let params = {
                name:"",//老师名字
                good_at:this.ids,//擅长
                min_num:this.num,//最小资历
                max_num:"",//最大资历
                city:"",//城市
                province:"",//省
                area:this.num2//区
            }
        this.$request.post(`/teachers`, params)
        .then(res => {
            this.exhibitionBox2 = res.data;
            this.Box2 = true;
        })
        .catch(error => {
            this.$message({
                message: '找不到你要的数据',
                type: "error"
            });
            return;
        });
    },
    //会馆名称查询
    seekclick(){
        let params = {
                name:this.name,//老师名字
                isNew:false,
            }
        this.$request.post(`/clubs/showClubListMobile`, params)
        .then(res => {
            this.clubBox = res.data;
        })
        .catch(error => {
            this.$message({
                message: '找不到你要的数据',
                type: "error"
            });
            return;
        });
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
.slide-fade-enter-active {
  transition: all .3s ease;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0.8;
}
.van-cell--large .van-cell__title{
    font-size: 12px !important;
}
.van-cell--large{
    padding-top: 15px !important;
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
    .club_warp_head{
        background-color: #fff;
        color: #2c2c2c;
        font-size: 16px;
        font-family:PingFang SC;
        font-weight:500;
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        position: fixed;
        top: 0px;
        left: 0;
        z-index: 999;
    }
    .club_warp_list{
        width: 100%;
        height: 44px;
        font-size:14px;
        font-family:PingFang SC;
        font-weight:400;
        line-height: 44px;
        text-align: center;
        display: flex;
        margin-top: 49px;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 999;
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
        // height: 100%;
        padding-top: 93px;
        background: #fff !important;
        .list_banner{
          height: 170px;
          background-size: cover;
          background-position: center;
        }
        .club_house{
            width: 93%;
            // height: 100%;
            margin: 0 auto;
            display: flex;
            .club_house_title{
                width: 50%;
                height: 50px;
                line-height: 40px;
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
                height: 50px;
                position: relative;
                .club_house_inquiry_input{
                    background-color: #eeeeee;
                    border-radius: 13px;
                    height: 30px;
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
                    top: 19px;
                }
            }
        }
        .club_item{
            width: 93%;
            // height: 100%;
            margin: 0 auto;
            display: flow-root;
            // margin-bottom: 49px;
            .club_item_box{
                width: 48%;
                height: 100%;
                float: left;
                margin-bottom: 10px;
                overflow: hidden;
                .club_item_img{
                    width: 100%;
                    height: 146px;
                    background-color: #E5E5E5;
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
        .Default-page4{
            width: 100%;
            height: 100px;
            margin: 0 auto;
            text-align: center;
            line-height: 60px;
            .page-span4{
                font-size:12px;
                font-family:PingFang SC;
                font-weight:500;
                color: #999;
            }
        }
    }
    .list_clubhouse{
        width: 100%;
        // height: 100%;
        padding-top: 93px;
        background: #fff !important;
        .list_banner{
          height: 170px;
          background-size: cover;
          background-position: center;
        }
        .list_house{
            width: 100%;
            // height: 100%;
            margin: 0 auto;
            display: -webkit-box;
            .list_house_title{
                width: 75%;
                height: 55px;
                line-height: 45px;
                display: flex;
                justify-content: space-evenly;
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
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    // line-height: 42px;
                    text-align: center;
                    background-color: #ffffff;
                    margin-top: 10px;
                    margin-right: 9px;
                    float: left;
                    font-size: 10px;
                    overflow: hidden;
                    .house_type_name{
                        font-size:10px;
                        font-family:PingFang SC;
                        font-weight:400;
                        display: block;
                        padding-top: 13px;
                        margin: 3px;
                        color:rgba(44,44,44,1);
                    }
                    .selected {
                        color: #2c2c2c;
                        font-size: 11px;
                        font-weight: 700;
                    }
                }
            }
        }
        .Rotation_list{
            width: 100%;
            // height: 100%;
            padding: 5px 0 10px 16px;
            display: -webkit-box;
            background: #fff !important;
            // margin-left: auto;
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
                        width: 95%;
                    }
                    .texts{
                        font-size:12px;
                        font-family:PingFang SC;
                        font-weight:400;
                        color:rgba(44,44,44,1);
                        padding-top: 2px;
                        text-indent: 10px;
                        width: 95%;
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
                                margin-left: 4px;
                                margin-top: -2px;
                            }
                        }
                    }
                }
            }
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
            // margin-bottom: 49px;
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
                            width: 95%;
                        }
                        .texts{
                            font-size:12px;
                            font-family:PingFang SC;
                            font-weight:400;
                            color:rgba(44,44,44,1);
                            padding-top: 2px;
                            text-indent: 10px;
                            width: 95%;
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
                                    margin-top: -2px;
                                    margin-left: 4px;
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
        .Default-page5{
            width: 100%;
            height: 100px;
            margin: 0 auto;
            text-align: center;
            line-height: 60px;
            .page-span5{
                font-size:12px;
                font-family:PingFang SC;
                font-weight:500;
                color: #999;
            }
        }
    }
}
</style>