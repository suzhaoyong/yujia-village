<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="knowledge-main">
                    <template>
                       <!-- <Banner></Banner> -->
                       <el-col class="selectitem">
                       <div class="select-bg">
                           <div v-for="(list,index) in navLists" :key="index" class="nav" :class="{ red:changeRed == index}" @click="reds(index)">{{list.text}}</div>
                       </div>
                       </el-col>
                        <div class="bg_img">
                         <img :src="banner" alt />
                        </div>
                    </template>
                    <div class="knowledge-count">
                        <div class="knowledge-count-div1" v-for="(item,index) in listdatas.slice((currentPage-1)*pagesize,currentPage*pagesize)" :key="index">
                            <div class="count-img">
                                <img :src="item.icon_url"/>
                            </div>
                            <div class="count-desc">
                                <div class="circle"></div>
                                <h4>{{item.headline}}</h4>
                                <p class="span-title">{{item.updated_at}}</p>
                                <p class="p-title">关键字：{{item.keyword}}</p>
                                <p class="p-desc">{{item.summary}}</p>
                                <div class="count-button">
                                    <div  class="count-button-but">
                                        <el-button type="text" @click="selectItem(item)">查看全部</el-button>
                                    </div>
                                    <div class="count-button-right">
                                        <!-- <img class="img1" src="../assets/share.png"/> -->
                                        <img class="img2" src="../assets/eye.png"/>
                                        <span class="img3">{{item.views}}</span>
                                    </div>
                                </div>
                            </div>
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
        knowledgeList:[],
        listdatas:[],
        banner:'',
        navLists:[
            {
                "text":"推荐"                     
            },
            {
                "text":"阿斯汤加"                     
            },
            {
                "text":"空中瑜伽"                        
            },
            {
                "text":"流瑜伽"                     
            },
            {
                "text":"理疗瑜伽"                     
            },
            {
                "text":"孕产瑜伽"                     
            },
            {
                "text":"阴瑜伽"                     
            },
            {
                "text":"普拉提"                     
            },
            {
                "text":"阿育吠陀"
            },
            {
                "text":"昆达里尼"
            },
            {
                "text":"艾扬格瑜伽"
            }
        ],
        changeRed:0
    };
  },
  created(){
      this.listdata();
  },
  methods:{
      listdata(){
        let _this = this;
        this.$request("/knowledgeList").then(res => {
            _this.knowledgeList = res.data;
            _this.banner = res.banner;
            _this.knowledgeList.map(item =>{ 
                if(item.data != null){
                    for(var i=0;i<item.data.length;i++){
                    _this.listdatas.push(item.data[i]);
                  } 
                }
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
        path: "/yogoknowledge/yogoknowledgedetails",
        query: {
        id: item.lid
        }
    });
    },
  }
};
</script>
<style lang="scss" scope>
.bg_img {
  width: 100%;
  height: 600px;
  img{
      width: 100%;
      height: 100%;
  }
}
.selectitem{
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
.knowledge-main{
    width: 100%;
    height: 100%;
    margin:0 auto;
    overflow: hidden;
    .knowledge-count{
        width: 100%;
        margin: 0 auto;
        height: 100%;
        display: inline-block;
        .knowledge-count-div1{
            width: 90%;
            height: 500px;
            float: right;
            margin-top: 40px;
            display: flex;
            box-shadow: 0px 1px 14px 1px rgba(36, 36, 36, 0.2);
           .count-img{
                width: 38%;
                height: 84%;
                margin: 38px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .count-desc{
                width: 50%;
                height: 84%;
                margin-top: 38px;
                background-color: #eeeeee;
                position: relative;
                .circle{
                    width: 55px;
                    height: 55px;
                    border-radius: 50%;
                    background-color: #bfbfbf;
                    position:absolute;
                    right: 10%;
                    top: 13%;
                }
                h4{
                    width: 80%;
                    margin: 0 auto;
                    font-size: 18px;
                    color: #2c2c2c;
                    line-height: 80px;
                    display: -webkit-box !important;
                    -webkit-box-orient: vertical !important;
                    -webkit-line-clamp:1 !important;// 限制快级元素的文本行数
                    overflow: hidden !important;
                }
                .span-title{
                    width: 80%;
                    margin: 0 auto;
                    font-size: 14px;
                    color: #2c2c2c;
                    margin-top: 40px;
                }
                .p-title{
                    width: 80%;
                    margin: 0 auto;
                    font-size: 14px;
                    color: #2c2c2c;
                }
                .p-desc{
                    width: 80%;
                    margin: 0 auto;
                    font-size: 14px;
                    color: #2c2c2c;
                    line-height: 28px;
                    margin-top: 50px;
                    display: -webkit-box !important;
                    -webkit-box-orient: vertical !important;
                    -webkit-line-clamp: 3 !important;// 限制快级元素的文本行数
                    overflow: hidden !important;
                }
                .count-button{
                    width: 80%;
                    height: 100px;
                    margin:24px auto;
                    display: flex;
                    justify-content: space-between;
                    .count-button-but{
                        width: 110px;
                        height: 40px;
                        text-align: center;
                        line-height: 40px;
                        margin-top: 37px;
                        background-color:#313131; 
                        .el-button--text{
                            color: #fff;
                        }
                    }
                    .count-button-right{
                        font-size: 18px;
                        margin-top: 40px;
                        position: relative;
                        .img1{
                            width: 27px;
                            height: 20px;
                            position: absolute;
                            top: 16%;
                            left: -120px;
                        }
                        .img2{
                            width: 30px;
                            height: 25px;
                            position: absolute;
                            top:12%;
                            left: -72px;
                        }
                        .img3{
                            position: absolute;
                            top: 12%;
                            left: -36px;
                        }
                    }
                }
            }
        }
        .knowledge-count-div1:nth-child(3){
            width: 90%;
            height: 500px;
            float: left;
            margin-top: 40px;
            display: flex;
            position: relative;
            box-shadow: 0px 1px 14px 1px rgba(36, 36, 36, 0.2);
           .count-img{
                width: 38%;
                height: 84%;
                margin: 38px;
                position: absolute;
                right: 0%;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .count-desc{
                width: 56%;
                height: 84%;
                margin-top: 38px;
                position: absolute;
                left: 0%;
                background-color: #eeeeee;
                position: relative;
                .circle{
                    width: 55px;
                    height: 55px;
                    border-radius: 50%;
                    background-color: #bfbfbf;
                    position:absolute;
                    left: 20%;
                    top: 13%;
                }
                h4{
                    width: 70%;
                    margin: 0 auto;
                    font-size: 18px;
                    color: #2c2c2c;
                    line-height: 80px;
                    margin-right: 10%;
                    text-align: right;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    display: -webkit-box !important;
                    -webkit-box-orient: vertical !important;
                    -webkit-line-clamp:1 !important;// 限制快级元素的文本行数
                    overflow: hidden !important;
                }
                .span-title{
                    width: 70%;
                    margin: 0 auto;
                    margin-right: 10%;
                    text-align: right;
                    font-size: 14px;
                    color: #2c2c2c;
                    margin-top: 40px;
                }
                .p-title{
                    width: 70%;
                    margin-right: 10%;
                    text-align: right;
                    margin: 0 auto;
                    font-size: 14px;
                    color: #2c2c2c;
                }
                .p-desc{
                    width: 70%;
                    margin: 0 auto;
                    font-size: 14px;
                    margin-right: 10%;
                    text-align: right;
                    color: #2c2c2c;
                    line-height: 28px;
                    margin-top: 50px;
                    display: -webkit-box !important;
                    -webkit-box-orient: vertical !important;
                    -webkit-line-clamp: 3 !important;// 限制快级元素的文本行数
                    overflow: hidden !important;
                }
                .count-button{
                    width: 70%;
                    height: 100px;
                    margin:24px auto;
                    margin-right: 10%;
                    text-align: right;
                    display: flex;
                    justify-content: space-between;
                    .count-button-but{
                        width: 110px;
                        height: 40px;
                        text-align: center;
                        line-height: 40px;
                        margin-top: 37px;
                        background-color:#313131; 
                        .el-button--text{
                            color: #fff;
                        }
                    }
                    .count-button-right{
                        font-size: 18px;
                        margin-top: 40px;
                        position: relative;
                        .img1{
                            width: 27px;
                            height: 20px;
                            position: absolute;
                            top: 16%;
                            left: -120px;
                        }
                        .img2{
                            width: 30px;
                            height: 25px;
                            position: absolute;
                            top:12%;
                            left: -72px;
                        }
                        .img3{
                            position: absolute;
                            top: 12%;
                            left: -36px;
                        }
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