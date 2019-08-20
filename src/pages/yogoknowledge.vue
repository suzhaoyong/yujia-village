<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="knowledge-main">
                    <template>
                       <Banner></Banner>
                    </template>
                    <div class="knowledge-count">
                        <div class="knowledge-count-div1" v-for="(item,index) in knowledgeList.slice((currentPage-1)*pagesize,currentPage*pagesize)" :key="index" @click="selectItem(item)">
                            <div class="count-img">
                                <img :src="item.imgurl"/>
                            </div>
                            <div class="count-desc">
                                <div class="circle"></div>
                                <h4>{{item.title}}</h4>
                                <p class="span-title">{{item.date}}</p>
                                <p class="p-title">编者：{{item.name}}<span class="span-title2">{{item.huiguan}}</span></p>
                                <p class="p-desc">{{item.desc}}</p>
                                <div class="count-button">
                                    <div  class="count-button-but">
                                        <el-button type="text">查看全部</el-button>
                                    </div>
                                    <div class="count-button-right">
                                        <img class="img1" src="../assets/share.png"/>
                                        <img class="img2" src="../assets/eye.png"/>
                                        <span>{{item.eye}}</span>
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
                                    :total="knowledgeList.length">
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
import { requestLogin } from "@/api/api";
export default {
  inject: ["reload"],
  components:{
    Banner,
  },
  data() {
    return {
        currentPage:1,
        pagesize: 5,
        knowledgeList:[{
            id:1,
            imgurl:require('../assets/image20.png'),
            title:'练习孕产瑜伽的必备小常识',
            date:'2018-01-30',
            name:'IVAN',
            huiguan:'观云瑜伽',
            desc:'练习孕妇瑜伽逐渐成为孕妇界的时尚代名词，想要做个健康、美丽的瑜伽妈妈，一些瑜伽技巧，呼吸方法也是必须知道的，下面小编就指导你如何练好孕妇瑜伽...',
            eye:'2341'
        },
        {
            id:2,
            imgurl:require('../assets/image21.png'),
            title:'练习孕产瑜伽的必备小常识',
            date:'2018-01-30',
            name:'IVAN',
            huiguan:'观云瑜伽',
            desc:'练习孕妇瑜伽逐渐成为孕妇界的时尚代名词，想要做个健康、美丽的瑜伽妈妈，一些瑜伽技巧，呼吸方法也是必须知道的，下面小编就指导你如何练好孕妇瑜伽...',
            eye:'2341'
        },
        {
            id:3,
            imgurl:require('../assets/image23.png'),
            title:'练习孕产瑜伽的必备小常识',
            date:'2018-01-30',
            name:'IVAN',
            huiguan:'观云瑜伽',
            desc:'练习孕妇瑜伽逐渐成为孕妇界的时尚代名词，想要做个健康、美丽的瑜伽妈妈，一些瑜伽技巧，呼吸方法也是必须知道的，下面小编就指导你如何练好孕妇瑜伽...',
            eye:'2341'
        },
        {
            id:4,
            imgurl:require('../assets/image24.png'),
            title:'练习孕产瑜伽的必备小常识',
            date:'2018-01-30',
            name:'IVAN',
            huiguan:'观云瑜伽',
            desc:'练习孕妇瑜伽逐渐成为孕妇界的时尚代名词，想要做个健康、美丽的瑜伽妈妈，一些瑜伽技巧，呼吸方法也是必须知道的，下面小编就指导你如何练好孕妇瑜伽...',
            eye:'2341'
        },
        {
            id:5,
            imgurl:require('../assets/image15.png'),
            title:'练习孕产瑜伽的必备小常识',
            date:'2018-01-30',
            name:'IVAN',
            huiguan:'观云瑜伽',
            desc:'练习孕妇瑜伽逐渐成为孕妇界的时尚代名词，想要做个健康、美丽的瑜伽妈妈，一些瑜伽技巧，呼吸方法也是必须知道的，下面小编就指导你如何练好孕妇瑜伽...',
            eye:'2341'
        },
        {
            id:6,
            imgurl:require('../assets/image20.png'),
            title:'练习孕产瑜伽的必备小常识',
            date:'2018-01-30',
            name:'IVAN',
            huiguan:'观云瑜伽',
            desc:'练习孕妇瑜伽逐渐成为孕妇界的时尚代名词，想要做个健康、美丽的瑜伽妈妈，一些瑜伽技巧，呼吸方法也是必须知道的，下面小编就指导你如何练好孕妇瑜伽...',
            eye:'2341'
        },
        {
            id:7,
            imgurl:require('../assets/image21.png'),
            title:'练习孕产瑜伽的必备小常识',
            date:'2018-01-30',
            name:'IVAN',
            huiguan:'观云瑜伽',
            desc:'练习孕妇瑜伽逐渐成为孕妇界的时尚代名词，想要做个健康、美丽的瑜伽妈妈，一些瑜伽技巧，呼吸方法也是必须知道的，下面小编就指导你如何练好孕妇瑜伽...',
            eye:'2341'
        }]
    };
  },
  created(){
      this.listdata();
  },
  methods:{
      listdata(){
        let _this = this;
        requestLogin("/knowledgeList", {}, "get")
        .then(function(res) {
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
       selectItem(item){
      },
  }
};
</script>
<style lang="scss" scope>
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
                    top: 9%;
                }
                h4{
                    width: 80%;
                    margin: 0 auto;
                    font-size: 18px;
                    color: #2c2c2c;
                    line-height: 80px;
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
                    .span-title2{
                        font-size: 14px;
                        color: #2c2c2c;
                        padding-left: 30px;
                    }
                }
                .p-desc{
                    width: 80%;
                    margin: 0 auto;
                    font-size: 14px;
                    color: #2c2c2c;
                    line-height: 28px;
                    margin-top: 50px;
                }
                .count-button{
                    width: 80%;
                    height: 100px;
                    margin:24px auto;
                    display: flex;
                    justify-content: space-between;
                    .count-button-but{
                        width: 110px;
                        height: 36px;
                        text-align: center;
                        line-height: 36px;
                        margin-top: 40px;
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
                            top: 1%;
                            left: -87px;
                        }
                        .img2{
                            width: 30px;
                            height: 25px;
                            position: absolute;
                            top:-4%;
                            left: -40px;
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