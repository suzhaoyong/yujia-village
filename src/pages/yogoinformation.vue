<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="formation-main">
                    <div class="formationitem">
                        <div class="select-bg">
                            <div v-for="(list,index) in navLists" :key="index" class="nav" :class="{ red:changeRed == index}" @click="reds(index)">{{list.classify}}</div>
                        </div>
                    </div>
                    <template>
                       <!-- <Banner></Banner> -->
                        <div class="bg_img2">
                         <img :src="banner" alt />
                        </div>
                    </template>
                    <div class="formation-count">
                        <div class="formation-count-div1" v-for="(item,index) in listdatas.slice((currentPage-1)*pagesize,currentPage*pagesize)" :key="index">
                            <img class="bg-img3" src="../assets/image26.png"/>
                            <div class="count-img">
                               <div class="border"></div>
                               <h4>{{item.headline}}</h4>
                                <p class="span-title">{{item.updated_at}}</p>
                                <p class="p-title">关键字：{{item.keyword}}</p>
                                <p class="p-desc">{{item.summary}}</p>
                                <div class="count-button-but">
                                    <el-button type="text" @click="selectItem(item)">查看全部</el-button>
                                </div>
                                <div class="border2"></div>
                                <div class="count-button-right">
                                    <!-- <img class="img1" src="../assets/share.png"/> -->
                                    <img class="img2" src="../assets/eye.png"/>
                                    <span class="span3">{{item.views}}</span>
                                </div>
                            </div>
                            <div class="count-desc">
                                <div class="desc-img1">
                                    <img :src="item.icon_url"/>
                                    <div class="box-content"></div>
                                </div>
                                <div class="desc-img2">
                                    <img :src="item.icon_url"/>
                                </div>
                            </div>
                            <div class="bg-border"></div>
                            <div class="bg-re">YOGA</div>
                            <img class="bg-img5" src="../assets/image31.png"/>
                            <img class="bg-img4" src="../assets/image27.png"/>
                        </div>
                        <div class="block">
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[5, 10, 15, 20, 25, 30]"
                                :page-size="pagesize"
                                background
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="listdatas.length">
                            </el-pagination>
                        </div>
                        <!-- <div class="formation-count-div2">
                            <div class="bg-border2"></div>
                            <div class="bg-re2">YOGA</div>
                            <img class="bg-img6" src="../assets/image28.png"/>
                            <img class="bg-img7" src="../assets/image31.png"/>
                            <div class="count-desc">
                                <div class="desc-img1">
                                    <img src="../assets/image23.png"/>
                                </div>
                            </div>
                            <div class="count-img">
                               <div class="border"></div>
                               <h4>瑜伽顶级人物的动作，简直看呆了！</h4>
                                <p class="span-title">2018-01-30</p>
                                <p class="p-title">编者：IVAN</p>
                                <p class="p-desc">这两年在娱乐圈刮起了一阵瑜伽风。如果你长期混迹各路当红女明星的微博之中，就不难发现，她们不再迷恋于上传大片、美照，而是甩掉偶像包袱，素颜、扮丑等等...</p>
                                <div  class="count-button-but">
                                    <el-button type="text">查看全部</el-button>
                                </div>
                                <div class="border2"></div>
                                <div class="count-button-right">
                                    <img class="img1" src="../assets/share.png"/>
                                    <img class="img2" src="../assets/eye.png"/>
                                    <span class="span3">6543</span>
                                </div>
                            </div>
                            <img class="bg-img8" src="../assets/image29.png"/>
                        </div>
                        <div class="formation-count-div3">
                            <img class="bg-image3" src="../assets/image30.png"/>
                            <div class="count-img">
                               <div class="border"></div>
                               <h4>胡可深圳学孕期瑜伽 称将与沙溢夫妻双修</h4>
                                <p class="span-title">2018-01-30</p>
                                <p class="p-title">编者：IVAN</p>
                                <p class="p-desc">这两年在娱乐圈刮起了一阵瑜伽风。如果你长期混迹各路当红女明星的微博之中，就不难发现，她们不再迷恋于上传大片、美照，而是甩掉偶像包袱，素颜、扮丑等等...</p>
                                <div  class="count-button-but">
                                    <el-button type="text">查看全部</el-button>
                                </div>
                                <div class="border2"></div>
                                <div class="count-button-right">
                                    <img class="img1" src="../assets/share.png"/>
                                    <img class="img2" src="../assets/eye.png"/>
                                    <span class="span3">2442</span>
                                </div>
                            </div>
                            <div class="count-desc">
                                <div class="desc-img1">
                                    <img src="../assets/image24.png"/>
                                </div>
                                <div class="desc-img2">
                                    <img src="../assets/image25.png"/>
                                </div>
                            </div>
                            <div class="bg-border3"></div>
                            <div class="bg-re3">YOGA</div>
                            <img class="bg-image1" src="../assets/image31.png"/>
                            <img class="bg-image2" src="../assets/image27.png"/>
                        </div> -->
                        <div class="kongbai"></div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import Banner from "../components/banner";
export default {
    inject: ["reload"],
  components:{
    Banner,
  },
  data() {
    return {
        currentPage:1,
        pagesize: 5,
        formationList:[],
        listdatas:[],
        banner:'',
        navLists:[],
        changeRed:0
    };
  },
  created(){
      this.mationdata();
  },
  methods:{
     mationdata(){
        let _this = this;
        this.$request("/informationList").then(res => {
            _this.formationList = res.data;
            _this.banner = res.banner;
            _this.navLists = res.data;
            _this.formationList.map(item =>{ 
                if(item.data != null){
                    for(var i=0;i<item.data.length;i++){
                    _this.listdatas.push(item.data[i]);
                  } 
                }
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
      handleSizeChange(size) {
          this.pagesize = size;
      },
      handleCurrentChange(currentPage) {
          this.currentPage = currentPage;
      },
      reds:function(index){
       this.changeRed = index;
    },
       selectItem(item){
           this.$router.push({
            path: "/yogoinformation/yogoinformationdetails",
            query: {
            id: item.lid
            }
        });
      },
  }
};
</script>
<style lang="scss" scope>
.bg_img2 {
  width: 100%;
  height: 100%;
  img{
      width: 100%;
      height: 100%;
  }
}
@media only screen and (max-width:990px){
    .desc-img1{ margin-bottom: 30px; }
}
.formationitem{
    position: relative;
.select-bg{
        width: 75%;
        margin: 0 auto;
        position: absolute;
        left: 190px;
        opacity: 0.7;
        height: auto;
        background-color: #fff;
        .nav{
            line-height: 50px;
            display: inline-block;
            margin-left: 40px;
            cursor: pointer;
            font-size:14px;
        }
        .red{
            color: #2c2c2c;
            font-size:18px;
            font-family:Microsoft YaHei;
            font-weight:bold;
        }
    }
}
.el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color: #CCE198;
    color: #fff;
}
.el-pager li.active{
    color: #CCE198;
}
.formation-main{
    width: 100%;
    height: 100%;
    margin:0 auto;
    overflow: hidden;
    .formation-count{
        width: 100%;
        margin: 0 auto;
        height: 100%;
        display: inline-block;
        .kongbai{
            width: 100%;
            height: 25px;
        }
        .formation-count-div1{
            width: 100%;
            height:606px;
            margin: 0 auto;
            display: flex;
            justify-content: space-around;
            background-color: #eeeeee;
            position: relative;
            margin-top: 130px;
            cursor:pointer;
            .bg-img3{
                position: absolute;
                width: 270px;
                height: 570px;
                left: 0%;
                top: 20%;
                opacity: 0.5;
            }
            .bg-img4{
                position: absolute;
                width: 130px;
                height: 180px;
                right: 7%;
                top: 73%;
            }
            .bg-img5{
                position:absolute;
                width: 31px;
                height: 33px;
                right: 11%;
                top: 32%;
            }
            .bg-border{
                position:absolute;
                width: 1px;
                height: 40px;
                background-color: #7d7d7d;
                width: 2px;
                height: 75px;
                background-color: #7d7d7d;
                right: 12%;
                top: 8%;
            }
            .bg-re{
                position:absolute;
                right: 11%;
                top: 25%;
                color: #2c2c2c;
                font-size: 14px;
                transform:rotate(90deg);
                -ms-transform:rotate(90deg); /* Internet Explorer 9*/
                -moz-transform:rotate(90deg); /* Firefox */
                -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
                -o-transform:rotate(90deg); /* Opera */
                filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);
            }
           .count-img{
                width: 28%;
                height: 84%;
                margin: 38px;
                .border{
                    width: 100%;
                    height: 5px;
                    background-color: #2C2C2C;
                }
                .border2{
                    width: 100%;
                    height: 2px;
                    background-color: #2c2c2c;
                    margin-top: 50px;
                }
                h4{
                    width: 100%;
                    text-align: left;
                    margin: 0 auto;
                    font-size: 18px;
                    color: #2c2c2c;
                    line-height: 60px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    display: -webkit-box !important;
                    -webkit-box-orient: vertical !important;
                    -webkit-line-clamp:1 !important;// 限制快级元素的文本行数
                    overflow: hidden !important;
                }
                .span-title{
                    width: 100%;
                    text-align: left;
                    margin: 0 auto;
                    font-size: 14px;
                    color: #2c2c2c;
                   line-height: 30px;
                }
                .p-title{
                    width: 100%;
                    text-align: left;
                    margin: 0 auto;
                    font-size: 14px;
                    color: #2c2c2c;
                }
                .p-desc{
                    width: 100%;
                    text-align: left;
                    margin: 0 auto;
                    font-size: 14px;
                    color: #2c2c2c;
                    line-height: 28px;
                    margin-top: 43px;
                    display: -webkit-box !important;
                    -webkit-box-orient: vertical !important;
                    -webkit-line-clamp:3 !important;// 限制快级元素的文本行数
                    overflow: hidden !important;
                }
                .count-button-but{
                    width: 110px;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    margin-top: 85px;
                    background-color:#313131; 
                    transition: all 1s;
                    .el-button--text{
                        color: #fff;
                    }
                }
                .count-button-but:hover{
                    width: 110px;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    margin-top: 85px;
                    transform: scale(.95);
                    border-radius: 5px;
                    background-color:#313131; 
                    .el-button--text{
                        color: #fff;
                    }
                }
                .count-button-right{
                    font-size: 18px;
                    margin-top: 20px;
                    position: relative;
                    .img1{
                        width: 27px;
                        height: 20px;
                        position: absolute;
                        top: 0px;
                        left: 0%;
                    }
                    .img2{
                        width: 30px;
                        height: 25px;
                        position: absolute;
                        bottom: -26px;
                        left: 2%;
                    }
                    .span3{
                        position: absolute;
                        left: 12%;
                    }
                }
            }
            .count-desc{
                width: 33%;
                height: 84%;
                margin-top: 38px;
                background-color: #eeeeee;
                position: relative;
                margin-left: -26%;
                .desc-img1{
                    width: 100%;
                    height: 443px;
                    position: relative;
                    perspective: 800px;
                    overflow: hidden;
                    top: -18%;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                     .box-content{
                        width: 100%;
                        height: 100%;
                        text-align: center;
                        position: absolute;
                        top: 0;
                        left: 0;
                        z-index: 1;
                    }
                }
                .desc-img1:hover:before{
                    opacity: 0.3;
                    transform: translateX(-50%) translateY(-50%) scale(1.5) rotate(0);
                }
                .desc-img1:hover:after{ opacity: 1; }
                .desc-img1:before{
                    content: "";
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(36deg, #272b66 42.34%, transparent 42.34%) 0 0,
                    linear-gradient(72deg, #2d559f 75.48%, transparent 75.48%) 0 0,
                    linear-gradient(-36deg, #9ac147 42.34%, transparent 42.34%) 100% 0,
                    linear-gradient(-72deg, #639b47 75.48%, transparent 75.48%) 100% 0,
                    linear-gradient(36deg, transparent 57.66%, #e1e23b 57.66%) 100% 100%,
                    linear-gradient(72deg, transparent 24.52%, #f7941e 24.52%) 100% 100%,
                    linear-gradient(-36deg, transparent 57.66%, #662a6c 57.66%) 0 100%,
                    linear-gradient(-72deg, transparent 24.52%, #9a1d34 24.52%) 0 100%,
                    #43a1cd linear-gradient(#ba3e2e, #ba3e2e) 50% 100%;
                    background-repeat: no-repeat;
                    background-size: 50% 50%;
                    opacity: 0;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    -webkit-clip-path: polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%);
                    clip-path: polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%);
                    transform: translateX(-50%) translateY(-50%) scale(0) rotate(360deg);
                    transition: all 0.3s ease 0s;
                }
                .desc-img1:after{
                    content: "";
                    width: 100%;
                    height: 100%;
                    background: radial-gradient(rgba(255,255,255,0.9),transparent,transparent);
                    position: absolute;
                    top: 0;
                    left: 0;
                    opacity: 0;
                }
                .desc-img2{
                    width: 103px;
                    height: 103px;
                    margin-top: -79px;
                    img{
                        width: 100%;
                        height: 100%;
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
        }
    }
}
</style>