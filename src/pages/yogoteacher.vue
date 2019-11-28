<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="yogo-main">
                    <template>
                    <div class="bg_img2" v-if="cationbanner.length > 0">
                        <el-carousel :height="bannerHeight+'px'" :interval="3000" arrow="hover" trigger="click" direction="horizontal" :autoplay="true">
                            <el-carousel-item v-for="(item,index) in cationbanner" :key="index">
                                <img :src="item.path" alt @click="cationclick(item)"/>
                                <div class="advertisement">广告</div>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <div class="bg_img" v-else>
                        <img :src="banner" alt />
                    </div>
                    </template>
                    <div class="yogo-count">
                        <el-col :span="24" class="bg-tupian1">
                        <div class="subject" v-if="cationmoad.length > 0">
                            <el-carousel :height="bannerHeight2+'px'" :interval="3000" arrow="hover" trigger="click" direction="horizontal" :autoplay="true">
                            <el-carousel-item v-for="(item,index) in cationmoad" :key="index">
                                <img :src="item.path" alt @click="cationclick(item)"/>
                                <div class="advertisement">广告</div>
                            </el-carousel-item>
                        </el-carousel>
                        </div>
                        <div class="yogo-cont-div1">
                            <h2><img src="../assets/yujia.png"/>名师推荐</h2>
                            <p class="nav-text">Sometimes beauty is so simple</p>
                            <div class="border-left"></div>
                            <div class="border-right"></div>
                       </div>
                       <div class="yogo-cont-div2">
                           <img src="../assets/image79.png" class="yogo-img"/>
                           <el-col v-if="this.iconList.length > 0">
                           <div class="yogocontunt">
                               <swiper :options="swiperOption" style="position:relative;height:440px;width:1200px;">
                                <div class="swiper-pagination" slot="pagination" style="position:absolute;top:3px;right:18px;width:98%;height:40px;text-align:right;"></div>
                                <swiper-slide v-for="(page,index) of pages" :key="index" style="margin-top:40px">
                                    <div class="yogocontunt-swiper" v-for="(item,idx) in page" :key="idx" @click="yogolink(item)">
                                    <figure class="test5">
                                        <img :src="item.first_img" class="yogocontunt2-img" :alt="item.name"/>
                                        <div class="test5-title2">
                                            <h4>{{item.name}}</h4>
                                            <p class="p1">教龄：{{item.num}}年</p>
                                        </div>
                                        <figcaption>
                                            <p class="pgood">私教擅长：{{item.good_at}}</p>
                                            <p class="p2">瑜伽历程：{{item.info}}</p>
                                            <div class="div01"></div>
                                            <div class="div02"></div>
                                        </figcaption>
                                    </figure>
                                    </div>
                                </swiper-slide>
                                </swiper>
                           </div>
                           </el-col>
                           <div class="Default-page4" v-else>
                                <div class="Default-main3">
                                <img src="../assets/default.png"/>
                                <span class="page-span3">我寻寻觅觅却找不到您的踪迹~</span>
                                </div>
                            </div>
                       </div>
                       <el-col class="bg-tupian5">
                       <div class="yogo-cont-div4">
                            <h2><img src="../assets/yujia.png"/>瑜伽名师展</h2>
                            <p class="nav-text">Sometimes beauty is so simple</p>
                            <div class="border-left"></div>
                            <div class="border-right"></div>
                       </div>
                       </el-col>
                        <div class="yogo-search">
                            <el-col class="yogo-lan">
                            <div class="search-left">
                                <el-select v-model="value" placeholder="擅长类型" @change="changecoure">
                                    <el-option v-for="item in coursetypes" :key="item.id" :label="item.name" :value="item.name"></el-option>
                                </el-select>
                                <el-select v-model="value2" placeholder="工作资历" @change="yearchange" style="width:140px">
                                    <el-option v-for="item in yearlist" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                                <v-distpicker :province="province" :city="city" :area="area" @province="onChangeProvince" @city="onChangeCity" @area="onchangearea"></v-distpicker>
                            </div>
                            <div class="search-right">
                                <el-form :inline="true" :model="formInline" class="demo-form-inline" @submit.native.prevent>
                                <el-form-item label="">
                                    <el-input v-model.trim="formInline.user" placeholder="名师姓名"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="text" @click="inquirysearch" style="color:#2c2c2c">搜索</el-button>
                                </el-form-item>
                                </el-form>
                            </div>
                            </el-col>
                        </div>
                       <el-col :span="24" class="bg-tupian2">
                       <div class="yogo-cont-div3">
                           <div class="yogocontunt2" v-if="this.yogolist.length > 0">
                               <div class="yogocontunt2-list" v-for="(item, index) in yogolist" :key="index" @mouseenter="onMouseOver(index)" @click="yogolink(item)">
                                    <figure class="test5">
                                        <img :src="item.first_img" class="yogocontunt2-img" :alt="item.name"/>
                                        <div class="test5-title">
                                            <h4>{{item.name}}</h4>
                                            <p class="p1">教龄：{{item.num}}年</p>
                                        </div>
                                        <figcaption>
                                            <p class="pgood">私教擅长：{{item.good_at}}</p>
                                            <p class="p2">瑜伽历程：{{item.info}}</p>
                                            <div class="div01"></div>
                                            <div class="div02"></div>
                                        </figcaption>
                                    </figure>
                               </div>
                               <div class="block">
                                <el-pagination
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage"
                                    :page-size="pagesize"
                                    background
                                    layout="total, prev, pager, next, jumper"
                                    :total="total">
                                </el-pagination>
                            </div>
                           </div>
                           <div class="Default-page3" v-else>
                                <div class="Default-main3">
                                <img src="../assets/default.png"/>
                                <span class="page-span3">我寻寻觅觅却找不到您的踪迹~</span>
                                </div>
                            </div>
                       </div>
                       </el-col>
                       </el-col>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import Banner from "../components/banner";
import VDistpicker from 'v-distpicker'
export default {
    metaInfo: {
        title: '瑜伽名师-中国瑜伽村瑜伽名师资讯', // set a title
        meta: [{       // set meta
            name: 'keyWords',
            content: '瑜伽名师，有名的瑜伽老师，中国瑜伽村瑜伽导师'
        },{
            name: 'description',
            content: '中国瑜伽村整合了全球知名导师以及国内许多专业导师的信息，帮助大家解决学瑜伽找哪个导师比较好的问题，可以根据自己的需求和爱好自行选择。'
        }]
    },
    components:{
        Banner,
        VDistpicker
    },
  data() {
    return {
        cationmoad:[],
        cationbanner:[],
        bannerHeight:488,
        screenWidth :0,
        bannerHeight2:126,
         formInline: {
          user: '',
        },
        coursetypes: [],
        yearlist:[{id:0,name:'不限'},{id:1,name:'0-5'},{id:2,name:'5-10'},{id:3,name:'10-15'},{id:4,name:'15-20'},{id:5,name:'20-30'},
        {id:6,name:'30-40'},{id:7,name:'40以上'}],
        currentPage:1,
        pagesize: 0,
        total:0,
        value: '',
        province:'',
        i:0,
        banner:'',
        city:'',
        area:'',
        value2: '',
        minnum: '',
        maxnum: '',
        activeClass: 0,
        namelist:[],
        current:'',
        yogolist:[],
        iconList: [],
        swiperOption: {
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
          },
          autoplay: true,
          loopFillGroupWithBlank: true,
          loop: true,
          navigation: {
            nextEl: '.swiper-button-next1',
            prevEl: '.swiper-button-prev1'
          },
        }
    };
  },
  computed: {
      pages(){
        const pages = []; // pages是为二维数组
        this.iconList.forEach((item, index) => {
          const page = Math.floor(index / 4); // page本质是0.1.2.3分别表示第1,2,3,4页
          if (!pages[page]) {
            pages[page] = [];
          }
          pages[page].push(item);
        });
        return pages;
      }
  },
  created(){
      this.listyogodata();
      this.choiceness();
      this.classification();
  },
   mounted(){
        // 首次加载时,需要调用一次
        this.screenWidth =  window.innerWidth;
        this.setSize();
        // 窗口大小发生改变时,调用一次
        window.onresize = () =>{
        this.screenWidth =  window.innerWidth;
        this.setSize();
    }
  },
  methods:{
      setSize:function () {
        this.bannerHeight = 488 / 1920 * this.screenWidth;
        },
    //根据页面查广告数据
    classification(){
      this.$request.get(`/advertisement/data/8`).then(data => {
          for(let i = 0; i < data.length; i++){
            if(data[i].position == 0){
              this.cationbanner = data[i].advertisement;
            }
            else if(data[i].position == 2){
              this.cationmoad = data[i].advertisement;
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
                    path: `/cultivate/index?ids=${item.relation_id}`,
                });
                break;
            case 7:
                this.$router.push({
                    path: "/market/detail",
                });
                break;
        }
      },
      choiceness(){
          let _this = this;
        this.$request(`/teachers/elites`).then(res => {
            _this.iconList = res;
            _this.namelist = res[0];
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
      listyogodata(){
        let _this = this;
        this.$request(`/teachers?page=${_this.currentPage}`).then(res => {
            _this.yogolist = res.teachers.data;
            _this.coursetypes = res.course_types;
            // _this.yearlist = res.year;
            _this.banner = res.banner;
            _this.total = res.teachers.total;
            _this.currentPage = res.teachers.current_page;
            _this.pagesize = res.teachers.per_page;
            _this.current = 'listyogo';
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
      inquirysearch(){
           let params = {
                name:this.formInline.user,//老师名字
                good_at:this.value,//擅长
                min_num:this.minnum,//最小资历
                max_num:this.maxnum,//最大资历
                city:this.city,//城市
                province:this.province,//省
                area:this.area//区
            }
        this.$request.post(`/teachers?page=${this.currentPage}`, params)
        .then(res => {
            this.yogolist = res.data;
            this.currentPage = 1;
            this.total = res.total;
            this.currentPage = res.current_page;
            this.pagesize = res.per_page;
            this.current = 'inquiry';
            this.$message({
                message: '查询成功',
                type: "success"
            });
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
      namelistItem(namelist){
          this.$router.push({
            path: "/yogoteacher/yogoteacherdetails",
            query: {
            id: namelist.id
            }
        });
      },
      yogolink(item){
          this.$router.push({
            path: "/yogoteacher/yogoteacherdetails",
            query: {
            id: item.id
            }
        });
      },
      onChangeProvince(data) {
      this.province = data.value;
    },
     onChangeCity(data) {
      this.city = data.value;
    },
    onchangearea(data){
     this.area = data.value;
    },
     changecoure(val){
     },
     yearchange(val){
         switch(val){
            case 0:
                this.minnum = 0;
                this.maxnum = 100;
                break;
            case 1:
                this.minnum = 0;
                this.maxnum = 5;
                break;
            case 2:
                this.minnum = 5;
                this.maxnum = 10;
                break;
            case 3:
                this.minnum = 10;
                this.maxnum = 15;
                break;
            case 4:
                this.minnum = 15;
                this.maxnum = 20;
                break;
            case 5:
                this.minnum = 20;
                this.maxnum = 30;
                break;
            case 6:
                this.minnum = 30;
                this.maxnum = 40;
                break;
            case 7:
                this.minnum = 40;
                this.maxnum = 100;
                break;
         }
     },
    selectItem(item,idx){
        this.namelist = item;
        this.activeClass = idx;
    },
    buttonprev(m){ 
         this.iconList=m[this.i-1][0];
         this.i--;
      },
    buttonnext(m){
        this.namelist=m[this.i+1][0];
        this.i++;
      },
    onMouseOver(index){
    },
    handleCurrentChange(val) {
        this.currentPage = val;
        if(this.current == 'listyogo'){
            this.listyogodata();
        }
        if(this.current == 'inquiry'){
            this.inquirysearch();
        }
    },
  }
};
</script>
<style lang="scss" scoped>
.test5{
    width: 100%;
    height: 100%;
    position: relative;
    transition: all 1s ease;
    }
.test5 .yogocontunt2-img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
.test5 .test5-title{
    background: #E2DBC8;
    margin-top: -38px;
}
.test5 .test5-title2{
    background: #F6F4EE;
    margin-top: -38px;
}
.test5 .test5-title h4{
    opacity: 1;
    font-size: 18px;
    font-family: Microsoft YaHei; 
    font-weight: bold;
    margin: 0 auto;
    text-align: center;
    margin-top: 38px;
    width: 86%;
    line-height: 40px;
    display: -webkit-box !important;
    -webkit-box-orient: vertical !important;
    -webkit-line-clamp: 1 !important;
    overflow: hidden !important;
    padding-top: 10px;
}
.test5 .test5-title .p1{
    text-align: center;
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    opacity: 1;
    color: #2c2c2c;
    padding-bottom: 15px;
}
.test5 .test5-title2 h4{
    opacity: 1;
    font-size: 18px;
    font-family: Microsoft YaHei; 
    font-weight: bold;
    margin: 0 auto;
    text-align: center;
    margin-top: 38px;
    width: 86%;
    line-height: 40px;
    display: -webkit-box !important;
    -webkit-box-orient: vertical !important;
    -webkit-line-clamp: 1 !important;
    overflow: hidden !important;
    padding-top: 10px;
}
.test5 .test5-title2 .p1{
    text-align: center;
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    opacity: 1;
    color: #2c2c2c;
    padding-bottom: 15px;
}
.test5 figcaption{
    width: 100%;
    height: 100%; 
    position: absolute;
    top: 0%;
    }
.test5 figcaption .pgood{
    text-align: left;
    opacity: 0;
    font-size:13px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color: #ffffff;
    width: 75%;
    margin:0 auto;
    display: -webkit-box !important;
    -webkit-box-orient: vertical !important;
    -webkit-line-clamp: 3 !important;
    overflow: hidden !important;
}
.test5 figcaption .p2{
    text-align: left;
    opacity: 0;
    font-size:13px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color: #ffffff;
    width: 75%;
    margin:0 auto;
    display: -webkit-box !important;
    -webkit-box-orient: vertical !important;
    -webkit-line-clamp: 4 !important;
    overflow: hidden !important;
    }
.test5 figcaption .telimg{
    width: 100%;
    margin: 0 auto;
}
.test5 figcaption .telimg .tel-img{
    opacity: 0;
}
.test5 figcaption .telimg .telpp{
    opacity: 0;
}
.test5 figcaption div{position: absolute;}
.test5 figcaption div.div01{
    width: 95%;
    height:82%;
    border-top: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
    left:2%;
    top:8%;
    opacity: 0;
    transform: scale(0.8);
    }
.test5 figcaption div.div02{
    width: 85%;
    height:93%;
    border-left: 2px solid #ffffff;
    border-right: 2px solid #ffffff;
    left: 7%;
    top:4%;
    opacity: 0;
    transform: scale(0.8);
    }
.test5:hover div.div01{
    opacity: 1;
    transform: scale(1);
    transition: transform .5s ease-in;
    transition: all 1s ease;
    }
.test5:hover div.div02{
    opacity: 1;
    transform: scale(1);
    transition: transform 0.5s ease-in;
    transition: all 1s ease;
    }
.test5:hover{
    width:100%;
    height: 279px;
    background-color: #000;
    transition: transform 0.5s ease-in;
    transition: all 1s ease;
}
.test5:hover figcaption .p1{opacity: 1;transition: transform 0.5s ease-in; transition: all 1s ease;}
.test5:hover figcaption .p2{opacity: 1;margin-top: 3%;transition: transform 0.5s ease-in;transition: all 1s ease;}
.test5:hover figcaption .pgood{opacity: 1;margin-top: 25%;transition: transform 0.5s ease-in;transition: all 1s ease;}
.test5:hover figcaption h4{opacity: 1;transition: transform 0.5s ease-in;transition: all 1s ease;}
.test5:hover figcaption .telimg{
    width: 100%;
    margin: 0 auto;
    top: 75%;
}
.test5:hover figcaption .telimg .tel-img{
    opacity: 1;
    width: 20px;
    height: 20px;
    margin-left: 29%;
    transition: transform 0.5s ease-in;
    transition: all 1s ease;
}
.test5:hover figcaption .telimg .telpp{
    opacity: 1;
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color: #2c2c2c;
    margin-left: 7px;
    transition: transform 0.5s ease-in;
    transition: all 1s ease;
}
.test5:hover img{
    opacity: 0.6;
    transition: transform 0.5s ease-in;
    transition: all 1s ease;
    }
.el-select-dropdown__item.selected {
    color: #8fc31f;
    font-weight: 700;
}
.el-select .el-input.is-focus .el-input__inner {
    border-color: #E2DBC8;
}
.distpicker-address-wrapper select{
    width: 145px !important;
    padding: 0px 4px !important;
    font-size: 14px !important;
}
.bg_img {
  width: 100%;
  height: 100%;
  img{
      width: 100%;
      height: 100%;
  }
}
.bg_img2{
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
.yogo-main{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    .yogo-count{
        width: 100%;
        margin: 0 auto;
        height: 100%;
        display: inline-block;
        .bg-tupian1{
            background-color: #F6F4EE;
        .subject{
            width: 1200px;
            height: 126px;
            margin: 0 auto;
            margin-top: 2rem;
            cursor: pointer;
            position: relative;
            img{
                width: 100%;
                height: 100%;
            }
            .close{
                width: 17px;
                height: 17px;
                background-color: #391F2B;
                position: absolute;
                right: 0;
                top: 0;
                .closeimg{
                width: 8px;
                height: 8px;
                position: absolute;
                right: 5px;
                top: 5px;
                }
            }
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
        }
        .yogo-cont-div1{
            width: 1200px;
            height: 150px;
            text-align: center;
            margin: 0 auto;
            margin-top: 20px;
            position: relative;
            .border-left{
                width: 20%;
                height: 1px;
                background-color: #dcdcdc;
                position: absolute;
                left:19%;
                top: 41%;
            }
            .border-right{
                width: 20%;
                height: 1px;
                background-color: #dcdcdc;
                position: absolute;
                right: 19%;
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
                padding-top: 24px;
                margin-top: 40px;
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
        .yogo-cont-div2{
            width: 100%;
            height: 100%;
            margin: 0 auto;
            position: relative;
            display: inline-block;
            .Default-page4{
                width: 100%;
                height: 500px;
                margin: 0 auto;
                text-align: center;
                line-height: 400px;
                background-color: #F6F4EE;
                .Default-main3{
                    width: 1200px;
                    height: 100%;
                    margin: 0 auto;
                img{
                    width: 500px;
                    height: 300px;
                }
                .page-span3{
                    font-size:22px;
                    font-family:PingFang SC;
                    font-weight:500;
                    color: #999;
                }
                }
            }
            .yogo-img{
                position: absolute;
                right: 0%;
                width: 180px;
                height: 330px;
                top: 15%;
            }
            .yogocontunt{
                width: 1200px;
                height: 460px;
                margin: 0 auto;
                margin-bottom: 50px;
                position: relative;
                .yogocontunt-swiper{
                    width: 270px;
                    height: 279px;
                    background-color: #E2DBC8;
                    margin: 14px;
                    float: left;
                    cursor: pointer;
                    position: relative;
                }
            }
        }
        .bg-tupian5{
            width: 100%;
            background: #fff;
           .yogo-cont-div4{
            width: 1200px;
            height: 150px;
            text-align: center;
            margin: 0 auto;
            position: relative;
            .border-left{
                width: 20%;
                height: 1px;
                background-color: #F1EDE3;
                position: absolute;
                left:19%;
                top: 41%;
            }
            .border-right{
                width: 20%;
                height: 1px;
                background-color: #F1EDE3;
                position: absolute;
                right: 19%;
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
        }
        .yogo-search{
            width: 100%;
            height: 75px;
            display: flex;
            background-color: #fff;
            border: 1px solid #E2DBC8;
            .yogo-lan{
                width: 1175px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                height: 100%;
            .search-left{
                line-height: 72px;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                .el-select{
                    width: 140px;
                    height: 40px;
                    margin-right:5px;
                    ::placeholder{
                    color: #464a4c;
                    }
                }
                .el-input--suffix .el-input__inner{
                    background-color: #fff;
                    height: 40px !important;
                }
                .el-select__tags{
                    position: absolute;
                    line-height: normal;
                    white-space: normal;
                    z-index: 1;
                    top: 83%;
                    -webkit-transform: translateY(-50%);
                    transform: translateY(-50%);
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-align: center;
                    -ms-flex-align: center;
                    align-items: center;
                    -ms-flex-wrap: wrap;
                    flex-wrap: wrap;
                }
            }
            .search-right{
                padding-top: 15px;
                .el-input{
                    width: 260px;
                }
            }
            }
        }
        .bg-tupian2{
            background-image: url('../assets/image64.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
        .yogo-cont-div3{
            width: 100%;
            height: 100%;
            margin: 0 auto;
            margin-top: 5%;
            margin-bottom: 50px;
            .yogocontunt2{
                width: 1200px;
                height: 100%;
                margin: 0 auto;
                margin-bottom: 50px;
                cursor:pointer;
                .yogocontunt2-list{
                    width: 270px;
                    height: 279px;
                    background-color: #E2DBC8;
                    margin: 14px;
                    float: left;
                    position: relative;
                    margin-bottom: 9%;
                    h4{
                        text-align: center;
                    }
                    // .yogocontunt2-img{
                    //     width: 100%;
                    //     height: 100%;
                    // }
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
            .Default-page3{
                width: 100%;
                height: 600px;
                margin: 0 auto;
                text-align: center;
                line-height: 600px;
                background-color: #F0ECE2;
                .Default-main3{
                    width: 1200px;
                    height: 100%;
                    margin: 0 auto;
                img{
                    width: 500px;
                    height: 300px;
                }
                .page-span3{
                    font-size:22px;
                    font-family:PingFang SC;
                    font-weight:500;
                    color: #999;
                }
                }
            }
        }
        }
      }
    }
}
</style>