<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="yogo-main">
                    <template>
                       <Banner></Banner>
                    </template>
                    <div class="yogo-count">
                        <div class="yogo-search">
                            <div class="search-left">
                                <el-select v-model="value" placeholder="擅长类型">
                                    <el-option v-for="item in options"  :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                                <el-select v-model="value2" placeholder="工作资历">
                                    <el-option v-for="item in options"  :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                                <v-distpicker :province="province"  :city="city" hide-area @selected="onSelected"></v-distpicker>
                            </div>
                            <div class="search-right">
                                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                <el-form-item label="">
                                    <el-input v-model="formInline.user" placeholder="名师姓名/会馆名称/瑜伽类型"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="text" @click="onSubmit" style="color:#2c2c2c">查询</el-button>
                                </el-form-item>
                                </el-form>
                            </div>
                        </div>
                        <el-col :span="24" class="bg-tupian1">
                        <div class="yogo-cont-div1">
                            <h2><img src="../assets/yujia.png"/>馆内名师</h2>
                            <p class="nav-text">Sometimes beauty is so simple</p>
                            <div class="border-left"></div>
                            <div class="border-right"></div>
                       </div>
                       <div class="yogo-cont-div2">
                           <div class="yogocontunt">
                               <swiper :options="swiperOption" style="height:850px">
                                <swiper-slide v-for="(page,index) of pages" :key="index">
                                    <div class="yogocontunt-swiper">
                                        <div class="yogoswiper-img">
                                            <img src="../assets/image10.png"/>
                                        </div>
                                        <div class="yogoswiper-text">
                                            <h3>小鱼(Tina)</h3>
                                            <p class="p1">2014年全美瑜伽联盟RYT200X小时认证</p>
                                            <p class="p2">瑜伽是以一个连接意识和无意识的途径，当你改变无意识的状态，更能感受生命的精彩和不一样的魅力</p>
                                            <div class="yogoswiper-butt">
                                            <el-button type="text">预约</el-button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="icon" v-for="item of page" :key="item.id">
                                    <div class="icon-img">
                                        <img class="icon-img-content" :src="item.imgUrl">
                                    </div>
                                    <h3>{{item.name}}</h3>
                                    <p class="icon-desc">{{item.title}}</p>
                                    <p class="icon-desc2">{{item.desc}}</p>
                                    </div>
                                </swiper-slide>
                                <div class="swiper-button-prev1" slot="button-prev"></div>
                                 <div class="swiper-button-next1" slot="button-next"></div>
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
                           <div class="yogocontunt2">
                               <div class="yogocontunt2-list" v-for="(item, index) in yogolist.slice((currentPage-1)*pagesize,currentPage*pagesize)" :key="index" @mouseenter="onMouseOver(index)" @click="selectItem(item)">
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
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        currentPage:1,
        pagesize: 12,
        value: '',
        province:'',
        city:'',
        value2: '',
        value3: '',
        yogolist:[],
        iconList: [
          {
            id: "0001",
            imgUrl:require('../assets/image3.png'),
            name:"小鱼(Tina)",
            title: "从业时间: 5年",
            desc:"2014年全美瑜伽联盟RYT200X小时认证"
          }, {
            id: "0002",
            imgUrl:require('../assets/image4.png'),
            name:"小鱼(Tina)",
            title: "从业时间: 5年",
            desc:"2014年全美瑜伽联盟RYT200X小时认证"
          }, {
            id: "0003",
            imgUrl:require('../assets/image5.png'),
            name:"小鱼(Tina)",
            title: "从业时间: 5年",
            desc:"2014年全美瑜伽联盟RYT200X小时认证"
          }, {
            id: "0004",
            imgUrl:require('../assets/image6.png'),
            name:"小鱼(Tina)",
            title: "从业时间: 5年",
            desc:"2014年全美瑜伽联盟RYT200X小时认证"
          }, {
            id: "0005",
            imgUrl:require('../assets/image3.png'),
            name:"小鱼(Tina)",
            title: "从业时间: 5年",
            desc:"2014年全美瑜伽联盟RYT200X小时认证"
          }],
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
      onSelected(data) {
        this.province = data.province.value;
        this.city = data.city.value;
     },
      onSubmit() {
        console.log('submit!');
      },
      selectItem(item){
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
    line-height: 40px;
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
    transition: transform 0.3s ease-in
    }
.test5:hover div.div02{
    opacity: 1;
    transform: scale(1);
    transition: transform 0.3s ease-in
    }
.test5:hover{
    width:100%;
    height: 340px;
    background-color: #E2DBC8;
}
.test5:hover figcaption .p1{opacity: 1;}
.test5:hover figcaption .p2{opacity: 1;margin-top: 15%;}
.test5:hover figcaption h4{opacity: 1;}
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
}
.test5:hover figcaption .telimg .telpp{
    opacity: 1;
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color: #2c2c2c;
    margin-left: 7px;
}
.test5:hover img{
    opacity: 0.1;
    }
.el-select-dropdown__item.selected {
    color: #8fc31f;
    font-weight: 700;
}
.el-select .el-input.is-focus .el-input__inner {
    border-color: #E2DBC8;
}
.distpicker-address-wrapper select{
    width: 100px;
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
        justify-content: space-around;
        background-color: #E2DBC8;
        .search-left{
            line-height: 68px;
            padding-left:16px;
            display: flex;
            .el-select{
                width: 140px;
            }
            .el-input--suffix .el-input__inner{
                background-color: #fff;
            }
        }
        .search-right{
             padding-top: 15px;
             padding-right: 10px;
             .el-input{
                 width: 333px;
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
            width: 100%;
            height: 150px;
            text-align: center;
            display: inline-block;
            margin-top: 20px;
            position: relative;
            .border-left{
                width: 20%;
                height: 1px;
                background-color: #dcdcdc;
                position: absolute;
                left:22%;
                top: 45%;
            }
            .border-right{
                width: 20%;
                height: 1px;
                background-color: #dcdcdc;
                position: absolute;
                right: 22%;
                top: 45%;
            }
            .nav-text{
                color: #999999;
                font-size: 14px;
                margin-top: -8px;
            }
            h2{
                color: #2c2c2c;
                font-size: 24px;
                margin-top: 40px;
                font-family:Microsoft YaHei;
                font-weight:bold;
                img{
                    width: 28px;
                    height: 28px;
                    position: absolute;
                    left: 44%;
                }
            }
        }
        .yogo-cont-div2{
            width: 100%;
            height: 100%;
            margin: 0 auto;
            margin-top: 20px;
            .yogocontunt{
                width: 74%;
                height: 100%;
                margin: 0 auto;
                margin-bottom: 50px;
                position: relative;
                .icon{
                    float: left;
                    width: 22%;
                    height: 426px;
                    margin-top: 25px;
                    margin-left: 27px;
                    box-shadow: 1px 1px 6px 0px rgba(36, 36, 36, 0.2);
                    background-color: #fff;
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
                        font-size: 18px;
                        margin-top: 20px;
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
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .yogoswiper-text{
                        width: 30%;
                        height: 100%;
                        margin-left: 35px;
                        .yogoswiper-butt{
                            width: 120px;
                            border: 1px solid #e2dbc8;
                            background: #e2dbc8;
                            text-align: center;
                            margin-top:45px;
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
                        }
                        .p1{
                            color: #2c2c2c;
                            font-size: 14px;
                        }
                        .p2{
                            color: #999999;
                            font-size: 14px;
                            margin-top:30px;
                        }
                    }
                }
                .swiper-button-prev1{
                        position: absolute;
                        left: 85%;
                        top: 36%;
                        width: 35px;
                        height: 35px;
                        border: 1px solid #e2dbc8;
                        border-radius: 50%;
                        z-index: 10;
                        background-size: 32px 35px;
                        background-color: #fff;
                        background-image: url('../assets/left.png');
                }
                .swiper-button-next1{
                        position: absolute;
                        right: 3%;
                        top: 36%;
                        width: 35px;
                        height: 35px;
                        border: 1px solid #e2dbc8;
                        border-radius: 50%;
                        z-index: 10;
                        background-size: 32px 35px;
                        background-color: #fff;
                        background-image: url('../assets/right.png');
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
                width: 75%;
                height: 100%;
                margin: 0 auto;
                margin-bottom: 50px;
                .yogocontunt2-list{
                    width: 262px;
                    height: 270px;
                    background-color: #E2DBC8;
                    margin: 10px;
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
        }
        .yogo-cont-div4{
            width: 100%;
            height: 150px;
            text-align: center;
            display: inline-block;
            position: relative;
            .border-left{
                width: 20%;
                height: 1px;
                background-color: #dcdcdc;
                position: absolute;
                left:22%;
                top: 45%;
            }
            .border-right{
                width: 20%;
                height: 1px;
                background-color: #dcdcdc;
                position: absolute;
                right: 22%;
                top: 45%;
            }
            .nav-text{
                color: #999999;
                font-size: 14px;
                margin-top: -8px;
            }
            h2{
                color: #2c2c2c;
                font-size: 24px;
                margin-top: 40px;
                font-family:Microsoft YaHei;
                font-weight:bold;
                img{
                    width: 28px;
                    height: 28px;
                    position: absolute;
                    left: 44%;
                }
            }
        }
        }
      }
    }
}
</style>