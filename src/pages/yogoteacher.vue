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
                                <el-select v-model="value" placeholder="瑜伽会所">
                                    <el-option v-for="item in options"  :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                                <el-select v-model="value2" placeholder="擅长类型">
                                    <el-option v-for="item in options"  :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                                <el-select v-model="value3" placeholder="工作资历">
                                    <el-option v-for="item in options"  :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
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
                       <div class="yogo-cont-div4">
                            <h2><img src="../assets/yujia.png"/>瑜伽名师展</h2>
                            <p class="nav-text">The customer's excellent experience is our goal from beginning to end.</p>
                            <div class="border-left"></div>
                            <div class="border-right"></div>
                       </div>
                       <div class="yogo-cont-div3">
                           <div class="yogocontunt2">
                               <div class="yogocontunt2-list" v-for="(item, index) in yogolist.slice((currentPage-1)*pagesize,currentPage*pagesize)" :key="index" @mouseenter="onMouseOver(index)" @click="selectItem(item)">
                                   <h4>{{item.text}}</h4>
                               </div>
                               <div class="block">
                                <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage"
                                    :page-sizes="[10, 20, 30, 40, 50, 100]"
                                    :page-size="pagesize"
                                    background
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="yogolist.length">
                                </el-pagination>
                            </div>
                           </div>
                       </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import Banner from "../components/banner";
export default {
    components:{
        Banner,
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
        pagesize: 10,
        value: '',
        value2: '',
        value3: '',
        yogolist:[
            {id:1,text:'内容'},
            {id:2,text:'内容'},
            {id:3,text:'内容'},
            {id:4,text:'内容'},
            {id:5,text:'内容'},
            {id:6,text:'内容'},
            {id:7,text:'内容'},
            {id:8,text:'内容'},
            {id:9,text:'内容'},
            {id:10,text:'内容'},
            {id:11,text:'内容'},
            {id:12,text:'内容'},
            {id:13,text:'内容'},
            ],
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
  methods:{
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
      }
  }
};
</script>
<style lang="scss" scope>
.el-select-dropdown__item.selected {
    color: #8fc31f;
    font-weight: 700;
}
.el-select .el-input.is-focus .el-input__inner {
    border-color: #E2DBC8;
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
        background-color: #e2dbc8;
        .search-left{
            line-height: 68px;
            padding-left:16px;
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
                    h4{
                        text-align: center;
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
</style>