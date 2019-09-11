<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="yogo-main">
                    <template>
                       <!-- <Banner></Banner> -->
                       <div class="bg_img">
                         <img :src="banner" alt />
                        </div>
                    </template>
                    <div class="yogo-count">
                        <div class="yogo-search">
                            <el-col class="yogo-lan">
                            <div class="search-left">
                                <el-select v-model="value" placeholder="擅长类型" @change="changecoure">
                                    <el-option v-for="item in coursetypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                                <el-select v-model="value2" placeholder="最小资历" @change="yearchange" style="width:105px">
                                    <el-option v-for="item in yearlist" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                                <el-select v-model="value3" placeholder="最大资历" @change="yearchange" style="width:105px">
                                    <el-option v-for="item in yearlist" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                                <v-distpicker :province="province" :city="city" :area="area" @selected="onSelected"></v-distpicker>
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
                        <el-col :span="24" class="bg-tupian1">
                        <div class="yogo-cont-div1">
                            <h2><img src="../assets/yujia.png"/>名师精选</h2>
                            <p class="nav-text">Sometimes beauty is so simple</p>
                            <div class="border-left"></div>
                            <div class="border-right"></div>
                       </div>
                       <div class="yogo-cont-div2">
                           <img src="../assets/image79.png" class="yogo-img"/>
                           <div class="yogocontunt">
                               <swiper :options="swiperOption" style="height:850px;width:1200px;">
                                <swiper-slide v-for="(page,index) of pages" :key="index">
                                    <div class="yogocontunt-swiper">
                                        <div class="yogoswiper-img">
                                            <div class="rhomb1">
                                                <img :src="namelist.path"/>
                                            </div>
                                            <div class="rhomb2"></div>
                                            <div class="rhomb3"></div>
                                            <div class="rhomb4"></div>
                                        </div>
                                        <div class="yogoswiper-text" @click="namelistItem(namelist)">
                                            <h3>{{namelist.name}}</h3>
                                            <p class="p1">{{namelist.info}}</p>
                                            <p class="p3">从业时间: {{namelist.num}}年</p>
                                            <p class="p2">擅长：{{namelist.good_at}}</p>
                                            <p class="p4">地址：{{namelist.address}}</p>
                                            <div class="yogoswiper-butt">
                                            <el-button type="text" @click="namelistItem(namelist)">详情</el-button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="margin-auto">
                                    <div class="icon" v-for="(item,idx) of page" :key="item.id" :class="activeClass == idx ? 'active':''" @click="selectItem(item,idx)">
                                    <div class="icon-img">
                                        <img class="icon-img-content" :src="item.path">
                                    </div>
                                    <h3>{{item.name}}</h3>
                                    <p class="icon-desc">从业时间：{{item.num}}年</p>
                                    <p class="icon-desc2">{{item.info}}</p>
                                    </div>
                                    </div>
                                </swiper-slide>
                                 <div class="swiper-button-prev1" slot="button-prev" @click="buttonprev(pages)"></div>
                                 <div class="swiper-button-next1" slot="button-next" @click="buttonnext(pages)"></div>
                                </swiper>
                           </div>
                       </div>
                       <el-col :span="24" class="bg-tupian2">
                       <div class="yogo-cont-div4">
                            <h2><img src="../assets/yujia.png"/>瑜伽名师展</h2>
                            <p class="nav-text">The customer's excellent experience is our goal from beginning to end.</p>
                            <div class="border-left"></div>
                            <div class="border-right"></div>
                       </div>
                       <div class="yogo-cont-div3">
                           <div class="yogocontunt2" v-if="this.yogolist.length > 0">
                               <div class="yogocontunt2-list" v-for="(item, index) in yogolist.slice((currentPage-1)*pagesize,currentPage*pagesize)" :key="index" @mouseenter="onMouseOver(index)" @click="yogolink(item)">
                                    <figure class="test5">
                                        <img :src="item.path" class="yogocontunt2-img"/>
                                        <figcaption>
                                            <h4>{{item.name}}</h4>
                                            <p class="p1">从业时间{{item.num}}年</p>
                                            <p class="p2">{{item.info}}</p>
                                            <div class="telimg">
                                                <img src="../assets/market/like.png" class="tel-img"/>
                                                <span class="telpp">{{item.tel}}</span>
                                            </div>
                                            <div class="div01"></div>
                                            <div class="div02"></div>
                                        </figcaption>
                                    </figure>
                               </div>
                               <div class="block">
                                <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage"
                                    :page-sizes="[12, 20, 30, 40, 50, 100]"
                                    :page-size="pagesize"
                                    background
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="yogolist.length">
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
    components:{
        Banner,
        VDistpicker
    },
  data() {
    return {
         formInline: {
          user: '',
        },
        coursetypes: [],
        yearlist:[],
        currentPage:1,
        pagesize: 12,
        value: '',
        province:'',
        i:0,
        banner:'',
        city:'',
        area:'',
        value2: '',
        value3: '',
        activeClass: 0,
        namelist:[],
        yogolist:[],
        iconList: [],
        swiperOption: {
          pagination: ".swiper-pagination",
          autoplay: false,
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
  },
  methods:{
      listyogodata(){
        let _this = this;
        this.$request("/teachers").then(res => {
            _this.yogolist = res.teachers;
            _this.iconList = res.elites;
            _this.coursetypes = res.course_types;
            _this.yearlist = res.year;
            _this.namelist = res.elites[0];
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
      inquirysearch(){
           let params = {
                name:this.formInline.user,//老师名字
                good_at:this.value,//擅长
                min_num:this.value2,//最小资历
                max_num:this.value3,//最大资历
                city:this.city,//城市
                province:this.province,//省
                area:this.area//区
            }
        this.$request.post("/teachers", params)
        .then(res => {
            this.yogolist = res;
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
      onSelected(data) {
        this.province = data.province.value;
        this.city = data.city.value;
        this.area = data.area.value;
     },
     changecoure(val){},
     yearchange(val){},
    selectItem(item,idx){
        this.namelist = item;
        this.activeClass = idx;
    },
    buttonprev(m){ 
         this.namelist=m[this.i-1][0];
         this.i--;
      },
      buttonnext(m){
        this.namelist=m[this.i+1][0];
        this.i++;
      },
    onMouseOver(index){
    },
    handleSizeChange(size) {
        this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
    },
  }
};
</script>
<style lang="scss" scope>
.test5{
    width: 100%;
    height: 100%;
    position: relative;
    transition: all 1s ease;
    }
.test5 .yogocontunt2-img{
        width: 100%;
        height: 100%;
    }
.test5 figcaption{
    width: 100%;
    height: 100%; 
    position: absolute;
    top: 0%;
    }
.test5 figcaption h4{
    opacity: 0;
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
    }
.test5 figcaption .p1{
    text-align: center;
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    opacity: 0;
    color: #2c2c2c;
    }
.test5 figcaption .p2{
    text-align: center;
    opacity: 0;
    font-size:13px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color: #2c2c2c;
    width: 83%;
    margin:0 auto;
    display: -webkit-box !important;
    -webkit-box-orient: vertical !important;
    -webkit-line-clamp: 3 !important;
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
    height: 340px;
    background-color: #E2DBC8;
    transition: transform 0.5s ease-in;
    transition: all 1s ease;
}
.test5:hover figcaption .p1{opacity: 1;transition: transform 0.5s ease-in; transition: all 1s ease;}
.test5:hover figcaption .p2{opacity: 1;margin-top: 15%;transition: transform 0.5s ease-in;transition: all 1s ease;}
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
    opacity: 0.1;
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
.yogo-main{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    .yogo-search{
        width: 100%;
        height: 70px;
        display: flex;
        background-color: #E2DBC8;
        .yogo-lan{
            width: 1200px;
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
                 width: 275px;
             }
        }
        }
    }
    .yogo-count{
        width: 100%;
        margin: 0 auto;
        height: 100%;
        display: inline-block;
        .bg-tupian1{
            background-color: #F6F4EE;
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
            margin-top: 20px;
            position: relative;
            .yogo-img{
                position: absolute;
                right: 0%;
                width: 185px;
                height: 330px;
                bottom: 80%;
            }
            .yogocontunt{
                width: 1200px;
                height: 100%;
                margin: 0 auto;
                margin-bottom: 50px;
                position: relative;
                cursor: pointer;
                .margin-auto{
                    width: 100%;
                    margin:0 auto;
                    display: flex;
                    justify-content: center;
                    height: auto;
                .icon{
                    // float: left;
                    width: 22%;
                    height: 426px;
                    margin-top: 25px;
                    margin-left: 27px;
                    box-shadow: 1px 1px 6px 0px rgba(36, 36, 36, 0.2);
                    background-color: #fff;
                    transition: all .9s;
                    .icon-img{
                        width: 100%;
                        height: 270px;
                        .icon-img-content{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    h3{
                        text-align: center;
                        color: #2c2c2c;
                        margin: 0 auto;
                        margin-top: 15px;
                        margin-bottom: 10px;
                        width: 92%;
                        font-size:18px;
                        font-family:Microsoft YaHei;
                        font-weight:bold;
                        display: -webkit-box !important;
                        -webkit-box-orient: vertical !important;
                        -webkit-line-clamp: 1 !important;// 限制快级元素的文本行数
                        overflow: hidden !important;
                    }
                    .icon-desc{
                        text-align: center;
                        color: #2c2c2c;
                        font-size: 14px;
                        }
                    .icon-desc2{
                        text-align: center;
                        width: 92%;
                        margin: 0 auto;
                        color: #2c2c2c;
                        font-size: 14px;
                        display: -webkit-box !important;
                        -webkit-box-orient: vertical !important;
                        -webkit-line-clamp: 2 !important;// 限制快级元素的文本行数
                        overflow: hidden !important;
                    }
                }
                .icon:hover{
                    float: left;
                    width: 22%;
                    height: 440px;
                    margin-top: 25px;
                    margin-left: 27px;
                    box-shadow:2px 7px 9px 0px rgba(36,36,36,0.2);
                    background-color: #fff;
                    transform: scale(.98);
                }
                .active {
                    box-shadow:2px 7px 9px 0px rgba(36,36,36,0.2);
                    height: 450px;
                    }
                }
                .yogocontunt-swiper{
                    width: 100%;
                    height: 350px;
                    margin: 0 auto;
                    display: flex;
                    .yogoswiper-img{
                        width: 50%;
                        height: 100%;
                        position: relative;
                        .rhomb1{
                            width: 220px;
                            height: 220px;
                            border: 7px solid #fff;
                            background-color: #E3DCC9;
                            transform:rotate(45deg);
                            position: absolute;
                            right: 50%;
                            top: 16%;
                            overflow: hidden;
                            img{
                                width: 100%;
                                height: 100%;
                                max-width: 100%;
                                transform:rotate(-45deg)scale(1.42);
                            }
                        }
                        .rhomb2{
                            width: 220px;
                            height: 220px;
                            border: 7px solid #E2DBC8;
                            transform:rotate(45deg);
                            position: absolute;
                            right: 30%;
                            top: 14%;
                            border-left: #fff;
                            border-bottom: #fff;
                        }
                        .rhomb2:before{
                            content: "";
                            position: absolute;
                            left: -19%;
                            top: 17%;
                            width: 42%;
                            height: 7px;
                            background-color: #E2DBC8;
                            transform: rotate(89deg);
                        }
                        .rhomb2:after{
                            content: "";
                            position: absolute;
                            left: 66%;
                            top: 97%;
                            width: 36%;
                            height: 7px;
                            background-color: #E2DBC8;
                            transform: rotate(0deg);
                        }
                        .rhomb3{
                            width: 55px;
                            height: 55px;
                            border: 4px solid #E2DBC8;
                            transform:rotate(45deg);
                            position: absolute;
                            right: 12%;
                            top: 5%;
                        }
                        .rhomb4{
                            width: 95px;
                            height: 95px;
                            border: 4px solid #E2DBC8;
                            transform:rotate(45deg);
                            position: absolute;
                            right: 8%;
                            top:56%;
                        }
                    }
                    .yogoswiper-text{
                        width: 46%;
                        height: 100%;
                        margin-left: 35px;
                        cursor: pointer;
                        .yogoswiper-butt{
                            width: 120px;
                            border: 1px solid #e2dbc8;
                            background: #e2dbc8;
                            text-align: center;
                            margin-top:9%;
                            transition: all 1s;
                            .el-button--text{
                                color: #2c2c2c;
                                background: 0 0;
                                padding-left: 0;
                                padding-right: 0;
                                width: 100%;
                            }
                        }
                        .yogoswiper-butt:hover{
                            width: 120px;
                            border: 1px solid #e2dbc8;
                            background: #e2dbc8;
                            text-align: center;
                            margin-top:9%;
                            border-radius: 5px;
                            transform: scale(.95);
                            .el-button--text{
                                color: #2c2c2c;
                                background: 0 0;
                                padding-left: 0;
                                padding-right: 0;
                            }
                        }
                        h3{
                            text-align: left;
                            line-height: 45px;
                            font-family:Microsoft YaHei;
                            font-weight:bold;
                            font-size: 18px;
                            color: #2c2c2c;
                            display: -webkit-box !important;
                            -webkit-box-orient: vertical !important;
                            -webkit-line-clamp: 1 !important;// 限制快级元素的文本行数
                            overflow: hidden !important;
                        }
                        .p1{
                            color: #2c2c2c;
                            font-size: 14px;
                            display: -webkit-box !important;
                            -webkit-box-orient: vertical !important;
                            -webkit-line-clamp: 1 !important;// 限制快级元素的文本行数
                            overflow: hidden !important;
                        }
                        .p2{
                            color: #999999;
                            font-size: 14px;
                            margin-top:13%;
                        }
                        .p3{
                            color: #2c2c2c;
                            font-size: 14px;
                        }
                        .p4{
                            color: #999999;
                            font-size: 14px;
                        }
                    }
                }
                .swiper-button-prev1{
                        position: absolute;
                        left: 86%;
                        top: 36%;
                        width: 32px;
                        height: 32px;
                        border: 1px solid #e2dbc8;
                        border-radius: 50%;
                        z-index: 10;
                        background-size: 24px 24px;
                        transition: all .7s;
                        background-color: #fff;
                        background-image: url('../assets/left.png');
                        background-position: center;
                }
                .swiper-button-prev1:hover{
                        position: absolute;
                        left: 86%;
                        top: 36%;
                        width: 32px;
                        height: 32px;
                        border: 1px solid #e2dbc8;
                        border-radius: 50%;
                        z-index: 10;
                        background-size: 24px 24px;
                        transform: scale(.95);
                        background-color: #e2dbc8;
                        background-image: url('../assets/left.png');
                        background-position: center;
                }
                .swiper-button-prev1:focus{
                        outline: 0;
                }
                .swiper-button-next1{
                        position: absolute;
                        right: 3%;
                        top: 36%;
                        width: 32px;
                        height: 32px;
                        border: 1px solid #e2dbc8;
                        border-radius: 50%;
                        z-index: 10;
                        transition: all .7s;
                        background-size: 24px 24px;
                        background-color: #fff;
                        background-image: url('../assets/right.png');
                        background-position: center;
                }
                .swiper-button-next1:hover{
                        position: absolute;
                        right: 3%;
                        top: 36%;
                        width: 32px;
                        height: 32px;
                        border: 1px solid #e2dbc8;
                        border-radius: 50%;
                        z-index: 10;
                        background-size: 24px 24px;
                        transform: scale(.95);
                        background-color: #e2dbc8;
                        background-image: url('../assets/right.png');
                        background-position: center;
                }
                .swiper-button-next1:focus{
                        outline: 0;
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
            margin-top: 10px;
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
                    margin-bottom: 88px;
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
      }
    }
}
</style>