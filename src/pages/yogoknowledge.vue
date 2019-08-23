<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="knowledge-main">
                    <template>
                       <Banner></Banner>
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
                                        <img class="img1" src="../assets/share.png"/>
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
        listdatas:[]
    };
  },
  created(){
      this.listdata();
  },
  methods:{
      listdata(){
        let _this = this;
        this.$request("/knowledgeList").then(res => {
            _this.knowledgeList = res;
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
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp:1;// 限制快级元素的文本行数
                    overflow: hidden;
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
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;// 限制快级元素的文本行数
                    overflow: hidden;
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