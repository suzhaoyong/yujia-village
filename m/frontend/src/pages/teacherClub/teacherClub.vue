<template>
<div>
    <div class="club_warp">
        <!-- <div class="club_warp_head">名师&机构</div> -->
        <div class="club_warp_list">
          <span class="liList" v-for="(item,index) in liList" :key="index" v-on:click="addClass(index)" :class="{ischeck:index==current}">{{item}}</span>
          <!-- <div class="stylelist"></div> -->
        </div>
        <div class="list_teacher" v-show="this.current === 0">
            <div class="list_banner" :style="{backgroundImage: 'url('+banner+')'}"></div>
            <div class="league" @click="goto()">申请加盟</div>
            <div class="club_house">
                <div class="club_house_title">
                    <span class="items" v-for="(item,index) in items" @click="clicktext(index)" :key="index" :class="{active:index==curritem}">{{item}}</span>
                        <van-dropdown-menu active-color="#7BBB62">
                        <van-dropdown-item v-model="value1" :options="option1" title="热门城市" @change="dropdownchange"/>
                       </van-dropdown-menu>
                </div>
                <div class="club_house_inquiry">
                    <input type="text" class="club_house_inquiry_input" v-model="name" placeholder="输入机构名称"/>
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
                        <div class="text van-ellipsis">{{item.custom_address}}</div>
                    </div>
                </div>
                <div class="tips_text" @click="Loadmore">
                    {{current_page >= last_page ? clubBox.length > 0? "我也是有底线的": "没有这个哦！" : "点我加载更多"}}
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
                    <div class="list_house_div" @click.stop="isOpen3 = true">
                        <span class="house_title_tips">最小资历</span>
                        <img src="../../assets/teacherclub/launch.png" class="house_title_img"/>
                    </div>
                     <div class="list_house_div" @click.stop="isOpen = true">
                        <span class="house_title_tips">最大资历</span>
                        <img src="../../assets/teacherclub/launch.png" class="house_title_img"/>
                    </div>
                    <div class="list_house_div" @click="toggle">
                        <span class="house_title_tips">擅长类型</span>
                        <img src="../../assets/teacherclub/launch.png" class="house_title_img" v-if="launch"/>
                        <img src="../../assets/teacherclub/top.png" class="house_title_img2" v-else/>
                    </div>
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
            <div class="club_items" v-if="exhibitionBox2.length > 0" v-show="Box2">
                <div class="news-swiper"> 
                    <div class="swiper-container swiper2">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(item,index) in exhibitionBox2" :key="index">
                                <div class="club_items_img" @click="exhibition(item)">
                                    <img :src="item.first_img"/>
                                </div>
                                <div class="club_items_title">
                                    <h3 class="van-ellipsis">{{item.name}}</h3>
                                    <div class="texts van-ellipsis">{{item.good_at}}</div>
                                    <div class="Rotation_zan">
                                    <div class="Rotation_zan_items">教龄：{{item.num}}年</div>
                                    <div class="Rotation_zan_tips">
                                        <img src="../../assets/teacherclub/Give.png" v-if="item.Giveupimg1" @click="Giveuppraise2(item,index)"/>
                                        <img src="../../assets/teacherclub/Give2.png" v-if="!item.Giveupimg1" @click="Giveuppraise2(item,index)"/>
                                        <span class="span">{{item.praise}}</span>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="Default-page7" v-else>
                <span class="page-span7">我寻寻觅觅却找不到您的踪迹~</span>
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
                                <img src="../../assets/teacherclub/Give.png" v-if="item.Giveupimg" @click="Giveuppraise(item,index)"/>
                                <img src="../../assets/teacherclub/Give2.png" v-if="!item.Giveupimg" @click="Giveuppraise(item,index)"/>
                                <span class="span">{{item.praise}}</span>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="tips_text" @click="Loadmore2">
                    {{current_page2 >= last_page2 ? exhibitionBox.length > 0? "我也是有底线的": "没有这个哦！" : "点我加载更多"}}
                </div>
            </div>
             <div class="Default-page5" v-else>
                <span class="page-span5">我寻寻觅觅却找不到您的踪迹~</span>
            </div>
        </div>
        <!-- 最大资历 -->
        <van-action-sheet v-model="isOpen" :actions="actions" @select="onSelect" cancel-text="取消"/>
        <!-- 最小资历 -->
        <van-action-sheet v-model="isOpen3" :actions="actions" @select="onSelect3" cancel-text="取消"/>
        <!-- 省市区 -->
        <van-popup v-model="isOpen2" position="bottom">
        <van-area :area-list="areaList" @confirm="changeArea" @cancel="isOpen2 = false"/>
        </van-popup>
    </div>
</div>
</template>
<script>
/* eslint-disable */
import Swiper from 'swiper';
import areaList from "../../assets/js/area.js";
import Vue from 'vue';
import Bus from "@/utils/Bus";
import { mapGetters } from "vuex"
import { Notify, Dialog, Toast} from "vant";
import { DropdownMenu, DropdownItem } from 'vant';
Vue.use(DropdownMenu).use(DropdownItem);
Vue.use(Notify)
.use(Dialog)
.use(Toast);
export default {
    data() {
    return {
        isOpen: false,
        isOpen2: false,
        isOpen3:false,
        launch:true,
        current:0,
        curritem:0,
        banner:'',
        visible:false,
        Box2:true,
        banner2:'',
        isActive: 0,
        value1:'',
        option1: [
        { text: '北京', value: '北京' },
        { text: '上海', value: '上海' },
        { text: '深圳', value: '深圳' },
        { text: '成都', value: '成都' },
        { text: '武汉', value: '武汉' },
        { text: '厦门', value: '厦门' },
        { text: '天津', value: '天津' },
        { text: '广州', value: '广州' },
        { text: '重庆', value: '重庆' },
        { text: '长沙', value: '长沙' },
        { text: '南京', value: '南京' },
        { text: '杭州', value: '杭州' },
       ],
        name:"",
        num:"",
        record:"",
        Giveupimg:true,
        Giveupimg1:true,
        liList:["培训机构","瑜伽名师"],
        items:["全部"],
        clubBox:[],
        change:[],
        value:"",
        ids:"",
        areaList:areaList,
        actions:[],
        change:[],
        houseType:[],
        exhibitionBox:[],
        exhibitionBox2:[],
        province:"",
        city:"",
        area:"",
        current_page:1,
        last_page: 2,
        current_page2:1,
        last_page2: 2,
        id:0,
        id2:0
    };
  },
   computed: {
    ...mapGetters(["info"]),
  },
  mounted () {
    this.PullUpReload();
    this.PullUpReload2();
  },
  created(){
      this.joindata();
      this.exhibitionList();
      this.choiceness();
  },
  methods:{
      //机构列表
      joindata(){
        this.$request.get(`/clubs?page=${this.current_page}`).then(res => {
            // this.clubBox = res.data.data;
            res.data.data.map((item) => {
            this.clubBox.push(item);
            })
            this.banner = res.banner;
            this.current_page = res.data.current_page;
            this.last_page = res.data.last_page;
            if(this.current_page > this.last_page) {
            this.current_page = res.data.last_page;
            Toast('没有更多了哦');
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
      //热门城市
      dropdownchange(){
         let params2 = {
            hot:this.value1,
        }
        this.$request.post(`/clubs/search/hot/club?page=${this.current_page}`,params2).then(res => {
            this.clubBox = res.data;
            this.current_page = res.current_page;
            this.last_page = res.last_page;
            if(this.current_page > this.last_page) {
            this.current_page = res.last_page;
            Toast('没有更多了哦');
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
       // 上拉加载
    PullUpReload () {
      let isScroll = false;  // 函数截流
      document.querySelector('.list_teacher').onscroll = function() {
      if (isScroll) {
        setTimeout(() => {
          isScroll = false;
        },100)
      } else {
        let innerHeight = document.querySelector('.list_teacher').clientHeight; // 容器高度
        let outerHeight = document.querySelector('.club_item').clientHeight; // 容器高+滚动高
        let scrollTop = document.querySelector('.list_teacher').scrollTop;  // 滚动高
        if (innerHeight + scrollTop >= outerHeight + 219) {
          this.current_page > this.last_page? '': this.current_page++;
          this.joindata();
        }
        isScroll = true;
      }
      }
    },
    PullUpReload2 () {
      let isScroll = false;  // 函数截流
      document.querySelector('.list_clubhouse').onscroll = function() {
      if (isScroll) {
        setTimeout(() => {
          isScroll = false;
        },100)
      } else {
        let innerHeight = document.querySelector('.list_clubhouse').clientHeight; // 容器高度
        let outerHeight = document.querySelector('.exhibition_items').clientHeight; // 容器高+滚动高
        let scrollTop = document.querySelector('.list_clubhouse').scrollTop;  // 滚动高
        if (innerHeight + scrollTop >= outerHeight + 219) {
          this.current_page2 > this.last_page2? '': this.current_page2++;
          this.exhibitionList();
        }
        isScroll = true;
      }
      }
    },
      Loadmore(){
        this.current_page > this.last_page? '': this.current_page++;
        this.joindata();
      },
      Loadmore2(){
        this.current_page2 > this.last_page2? '': this.current_page2++;
        this.exhibitionList();
      },
      //名师列表
      exhibitionList(){
        this.$request.get(`/teachers?page=${this.current_page2}`).then(res => {
            // this.exhibitionBox = res.teachers.data;
            res.teachers.data.map((item) => {
            this.exhibitionBox.push(item);
            })
            this.houseType = res.course_types;
            this.actions = res.year;
            this.banner2 = res.banner;
            this.current_page2 = res.teachers.current_page;
            this.last_page2 = res.teachers.last_page;
            if(this.current_page2 > this.last_page2) {
            this.current_page2 = res.teachers.last_page;
            Toast('没有更多了哦');
            }
            for(var i=0;i<this.exhibitionBox.length;i++){
                if(this.exhibitionBox[i].id==this.id){
                    this.exhibitionBox[i]["Giveupimg"]=false;
                    // this.$set(this.exhibitionBox[i], 'Giveupimg', false);
                }else{
                    this.exhibitionBox[i]["Giveupimg"]=true;
                    // this.$set(this.exhibitionBox[i], 'Giveupimg', true);
                }              
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
      swiperInit() {
            new Swiper('.swiper2', {
                slidesPerView: 'auto',
                freeMode: true,
                observer: true,
            });
      },
      //名师精选
      choiceness(){
        this.$request.get(`/teachers/elites`).then(res => {
            this.exhibitionBox2 = res;
            for(var i=0;i<this.exhibitionBox2.length;i++){
                if(this.exhibitionBox2[i].id==this.id2){
                    this.exhibitionBox2[i]["Giveupimg1"]=false;
                }else{
                    this.exhibitionBox2[i]["Giveupimg1"]=true;
                }              
            }
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
      Giveuppraise(item,index){
          this.id=item.id;
        let params ={
            id:item.id
        }
        this.$request.post(`/teachers/thumbsUp`,params).then(data => {
            this.msg = data.msg;
            if(this.msg == "OK"){
            Notify({ message: "点赞成功", type: "success" });
            // Vue.set(this.exhibitionList());
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
      Giveuppraise2(item,index){
          this.id2=item.id;
        let params ={
            id:item.id
        }
        this.$request.post(`/teachers/thumbsUp`,params).then(data => {
            this.msg = data.msg;
            if(this.msg == "OK"){
            Notify({ message: "点赞成功", type: "success" });
            // Vue.set(this.choiceness());
            this.choiceness();
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
      //申请加盟
      goto() {
      const { name, identity_auth } = this.info.user;
      if(name){
        if(parseInt(identity_auth) === '未认证') {
          this.$router.push("/authenticationcenter");
          return;
        }
        const obj = {
        '认证机构负责人中': {message:'您已在申请中，请耐心等待审核', type:'success'},
          '认证机构负责人': {message:'您已加盟成功',type:'success'},
          '认证教练中': {message:'您是教练认证中，暂时不能申请加盟，详情请联系机构负责人认证',type:'warning'},
          '认证教练': {message:'您是教练，暂时不能申请加盟，详情请联系机构负责人认证',type:'warning'},
          '认证不通过': {message:'您的申请未通过，详情请联系客服',type:'error'},
          '认证机构负责人&教练中': {message:'您已加盟成功',type:'success'},
          '认证机构负责人&认证教练': {message:'您已加盟成功',type:'success'},
        }
        obj[identity_auth] && Dialog({ 
            message:`${obj[identity_auth].message}`, 
            title: '温馨提示'
          })
        // obj[identity_auth] && this.$message(obj[identity_auth])
      }else{
        this.$router.push('/login')
      }
    },
    addClass:function(index){
        this.current=index;
    },
    clicktext:function(index){
        this.curritem = index;
        switch(index) {
            case 0:
                this.joindata();
                break;
        } 
    },
    toggle: function() {
        this.visible = !this.visible //取反
        this.launch = !this.launch;
     },
     //省市区
     changeArea(val) {
      this.change = val;
      this.isOpen2 = false;
      this.province = val[0].name;
      this.city = val[1].name;
      this.area = val[2].name;
      let params = {
                name:"",//老师名字
                good_at:this.ids,//擅长
                min_num:this.record,//最小资历
                max_num:this.num,//最大资历
                city:this.city,//城市
                province:this.province,//省
                area:this.area//区
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
     // 工作资历
     onSelect(item) {
      this.isOpen = false;
      this.num = item.name;
      let params = {
                name:"",//老师名字
                good_at:this.ids,//擅长
                min_num:this.record,//最小资历
                max_num:this.num,//最大资历
                city:this.city,//城市
                province:this.province,//省
                area:this.area//区
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
    onSelect3(item){
        this.isOpen3 = false;
        this.record = item.name;
    },
    // 选择分类
    chooseClassify(item,index) {
        this.isActive = index;
        this.ids = item.name;
        let params = {
                name:"",//老师名字
                good_at:this.ids,//擅长
                min_num:this.record,//最小资历
                max_num:this.num,//最大资历
                city:this.city,//城市
                province:this.province,//省
                area:this.area//区
            }
        this.$request.post(`/teachers`, params)
        .then(res => {
            this.exhibitionBox2 = res.data;
            this.Box2 = true;
            for(var i=0;i<this.exhibitionBox2.length;i++){
                if(this.exhibitionBox2[i].id==this.id2){
                    this.exhibitionBox2[i]["Giveupimg1"]=false;
                }else{
                    this.exhibitionBox2[i]["Giveupimg1"]=true;
                }              
            }
        })
        .catch(error => {
            this.$message({
                message: '找不到你要的数据',
                type: "error"
            });
            return;
        });
    },
    //机构名称查询
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
  .van-dropdown-menu{
    height: 40px;
    background-color: #eee;
    color: #2c2c2c;
    width: 80px;
    padding-top: 1px;
}
.club_warp{
    width: 100%;
    height: 100%;
    display: inline-block;
    // position: relative;
    .club_warp_head{
        background-color: #E0EED2;
        color: #2c2c2c;
        font-size: 16px;
        font-family:PingFang SC;
        font-weight:700;
        width: 100%;
        height: 44px;
        line-height: 44px;
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
        // margin-top: 44px;
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
        // .stylelist{
        //     width: 16%;
        //     background: #7BBB62;
        //     height: 2px;
        //     position: absolute;
        //     top: 42px;
        //     left: 63px;
        // }
        .ischeck  {
            background: #fff;
            height: 100%;
            width: 50%;
            color: #7BBB62;
            border-bottom: 4px solid #7BBB62;
        }
    }
    .list_teacher{
        width: 100%;
        // height: 100%;
        padding-top: 44px;
        background: #eee !important;
        position: relative;
        .list_banner{
          height: 170px;
          background-size: cover;
          background-position: center;
        }
        .league{
            width: 60px;
            height: 15px;
            border-radius: 6px;
            text-align: center;
            font-size: 10px;
            color: #ffffff;
            line-height: 15px;
            background: #97B3C1;
            position: absolute;
            left: 160px;
            top: 173px;
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
                display: flex;
                .items{
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(44,44,44,1);
                    padding-right: 10px;
                }
                .active{
                    font-size:14px;
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
                    background-color: #fff;
                    border-radius: 13px;
                    height: 30px;
                    width: 70%;
                    float: right;
                    font-size: 12px;
                    color: #999;
                    text-indent: 15px;
                    margin-top: 10px;
                }
                .seek{
                    position: absolute;
                    width: 10px;
                    height: 11px;
                    right: 18px;
                    top: 20px;
                }
            }
        }
        .club_item{
            width: 93%;
            // height: 100%;
            margin: 0 auto;
            display: flow-root;
            // margin-bottom: 49px;
            background: #eee !important;
            .club_item_box{
                width: 48%;
                height: 100%;
                float: left;
                margin-bottom: 10px;
                overflow: hidden;
                border-radius: 7px;
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
                    background-color: #fff;
                    display: inline-block;
                    h3{
                        font-size:12px;
                        font-family:Microsoft YaHei;
                        font-weight:400;
                        color:rgba(44,44,44,1);
                        margin-top: 15px;
                        text-indent: 10px;
                        width: 93%;
                    }
                    .text{
                        font-size: 10px;
                        font-family:PingFang SC;
                        font-weight:400;
                        color: #999;
                        margin-top: 10px;
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
                    background-color: #fff;
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
            .tips_text{
                text-align: center;
                color: #999;
                font-size:12px;
                font-family:PingFang SC;
                font-weight:500;
                margin-top: 70%;
                margin-bottom: 30px;
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
        padding-top: 44px;
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
            display: flex;
            justify-content:flex-start;
            .list_house_title{
                width:85%;
                height: 50px;
                line-height: 45px;
                display: flex;
                margin-left: 11px;
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
                .list_house_div:nth-child(4){
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
                  .house_title_img2{
                    width: 18px;
                    height: 25px;
                    margin-left: -14px;
                    position: relative;
                    top: 8px;
                  }
                }
            }
            .list_house_inquirys{
                width: 13%;
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
                  .house_title_img2{
                    width: 18px;
                    height: 25px;
                    margin-left: -14px;
                    position: relative;
                    top: 8px;
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
        .club_items{
            .tips_text{
                text-align: center;
                color: #999;
                font-size:12px;
                font-family:PingFang SC;
                font-weight:500;
                padding-top: 3px;
                margin-bottom: 15px;
            }
            .news-swiper {
            padding: 2px 0 5px 16px;
            .swiper-slide {
                width: 131px;
                height: 190px;
                margin-right: 10px;
                box-shadow:0px 1px 4px 0px rgba(22,27,27,0.18);
                border-radius:7px;
                margin-bottom: 10px;
                .club_items_img{
                    width: 100%;
                    height: 110px;
                    background-color: #E5E5E5;
                    img{
                        width: 100%;
                        height: 100%;
                        display: block;
                        object-fit: cover;
                        border-radius: 7px 7px 0px 0px;
                    }
                }
                .club_items_title{
                    height: 63px;
                    width: 90%;
                    margin: 0 auto;
                    h3{
                        font-size:14px;
                        font-family:PingFang SC;
                        font-weight:bold;
                        color:rgba(44,44,44,1);
                        text-indent: 2px;
                        margin-top: 8%;
                    }
                    .texts{
                    font-size:12px;
                    font-family:PingFang SC;
                    font-weight:400;
                    color:rgba(44,44,44,1);
                    padding-top: 2px;
                    text-indent: 2px;
                   }
                    .Rotation_zan{
                    font-size:12px;
                    font-family:PingFang SC;
                    font-weight:400;
                    color:rgba(44,44,44,1);
                    display: flex;
                    justify-content: space-between;
                    margin-top: 5px;
                    margin-bottom: 10px;
                    .Rotation_zan_items{
                        text-indent: 2px;
                    }
                    .Rotation_zan_tips{
                        display: flex;
                        padding-right: 2px;
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
                    border-radius:7px;
                    margin-bottom: 8px;
                    .exhibition_img{
                        width: 100%;
                        height: 130px;
                        background-color: #E5E5E5;
                        border-radius: 4px;
                        img{
                            width: 100%;
                            height: 100%;
                            display: block;
                            object-fit: cover;
                            border-radius: 7px 7px 0px 0px;
                        }
                    }
                    .exhibition_title{
                        width: 100%;
                        height: 85px;
                        background-color: #ffffff;
                        display: inline-block;
                        border-radius: 0px 0px 7px 7px;
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
            .tips_text{
                text-align: center;
                color: #999;
                font-size:12px;
                font-family:PingFang SC;
                font-weight:500;
                margin-top: 30px;
                margin-bottom: 30px;
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
        .Default-page7{
            width: 100%;
            height: 50px;
            margin: 0 auto;
            text-align: center;
            line-height: 50px;
            .page-span7{
                font-size:12px;
                font-family:PingFang SC;
                font-weight:500;
                color: #999;
            }
        }
    }
}
</style>