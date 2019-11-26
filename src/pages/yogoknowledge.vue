<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="knowledge-main">
                    <div class="knowledge-list">
                        <div class="select-bg">
                            <div v-for="(list,index) in navLists" :key="index" class="nav" :class="{ red:changeRed == index}" @click="reds(index,list)">{{list.classify}}</div>
                        </div>
                    </div>
                    <template>
                       <div class="bg_img2" v-if="cationbanner.length > 0">
                         <img :src="item.path" alt v-for="(item,index) in cationbanner" :key="index" @click="cationclick(item)"/>
                        <div class="advertisement">广告</div>
                       </div>
                        <div class="bg_img1" v-else>
                         <img :src="banner" alt />
                        </div>
                    </template>
                    <div class="knowledge-count" v-if="this.listdatas.length > 0">
                        <div class="knowledge-count-div1" v-for="(item, index) in listdatas" :key="index" @click="selectItem(item)">
                            <div class="knowledge-auto">
                            <div class="count-img">
                                <img :src="item.icon_url" :alt="item.headline"/>
                                <div class="box-content"></div>
                            </div>
                            <div class="count-desc">
                                <div class="circle"></div>
                                <h4>{{item.headline}}</h4>
                                <p class="span-title">{{item.created_at}}</p>
                                <p class="p-title">关键字：{{item.keyword}}</p>
                                <p class="p-desc">{{item.summary}}</p>
                                <div class="count-button">
                                    <div  class="count-button-but">
                                        <el-button type="text" @click="selectItem(item)">查看全部</el-button>
                                    </div>
                                    <div class="count-button-right">
                                        <!-- <img class="img1" src="../assets/share.png"/> -->
                                        <img class="img2" src="../assets/eye.png" :title="'点击率:'+(item.views||100)"/>
                                        <span class="img3">{{item.views||100}}</span>
                                    </div>
                                </div>
                            </div>
                            </div>
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
                    <div class="Default-page" v-else>
                        <div class="Default-main">
                        <img src="../assets/default.png"/>
                        <span class="page-span">我寻寻觅觅却找不到您的踪迹~</span>
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
  metaInfo: {
    title: '瑜伽知识-学瑜伽注意事项-中国瑜伽村知识科普', 
    meta: [{
        name: 'keyWords',
        content: '瑜伽知识，瑜伽注意事项，学瑜伽要注意什么'
    },{
        name: 'description',
        content: '学习瑜伽是一件说简单但是又不简单的事情，学习瑜伽是一条漫漫长路，不仅要学习各种瑜伽的知识还要了解学习瑜伽过程中的注意事项，这些内容中国瑜伽村都给大家一一整理了出来。'
    }]
  },
  inject: ["reload"],
  components:{
    Banner,
  },
  data() {
    return {
        currentPage:1,
        pagesize: 0,
        total:0,
        listdatas:[],
        banner:'',
        navLists:[],
        changeRed:0,
        listids:0,
        cationbanner:[],
    };
  },
  created(){
      this.listdata();
      this.yujialore();
      this.classification();
  },
  methods:{
       //根据页面查广告数据
    classification(){
      this.$request.get(`/advertisement/data/9`).then(data => {
          for(let i = 0; i < data.length; i++){
            if(data[i].position == 0){
              this.cationbanner = data[i].advertisement;
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
      yujialore(){
        let _this = this;
        this.$request(`/KnowledgeClassify`).then(res => {
             _this.banner = res.banner;
             _this.navLists = res.classify;
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
      listdata(){
        let _this = this;
        this.$request(`/knowledgeList/${_this.listids}?page=${_this.currentPage}`).then(res => {
            _this.listdatas = res.data;
            _this.total = res.total;
            _this.currentPage = res.current_page;
            _this.pagesize = res.per_page;
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
    handleCurrentChange(val) {
        this.currentPage = val;
        this.listdata();
    },
    reds:function(index,list){
       this.changeRed = index;
       this.currentPage = 1;
       this.listids = list.id;
       this.listdata();
    //    for(var i=0;i<this.knowledgeList.length;i++){
    //        if(index==i){
    //            if(this.knowledgeList[i].data==undefined){
    //               this.listdatas=[];
    //            }else{
    //               this.listdatas=this.knowledgeList[i].data;
    //               this.total = this.knowledgeList[i].total;
    //               this.currentPage = this.knowledgeList[i].current_page;
    //               this.pagesize = this.knowledgeList[i].per_page;
    //            }
    //        }
    //    }
    },
    selectItem(item){
        this.$router.push({
        path: "/yogoknowledge/yogoknowledgedetails",
        query: {
        id: item.id
        }
    });
    },
  }
};
</script>
<style lang="scss" scoped>
.bg_img1 {
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
@media only screen and (max-width:990px){
    .count-img{ margin-bottom: 30px; }
}
.knowledge-list{
    width: 1200px;
    margin: 0 auto;
.select-bg{
    width: 1200px;
    margin: 0 auto;
    position: absolute;
    opacity: 0.7;
    height: auto;
    background-color: #fff;
    padding: 1px;
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
        margin-bottom: 50px;
        .knowledge-count-div1{
            width: 1200px;
            height: 500px;
            margin: 0 auto;
            margin-top: 40px;
            display: flex;
            cursor:pointer;
            box-shadow: 0px 1px 14px 1px rgba(36, 36, 36, 0.2);
            .knowledge-auto{
                width: 100%;
                margin: 0 auto;
                height: 100%;
                display: flex;
              .count-img{
                width: 38%;
                height: 84%;
                margin: 20px;
                margin-top: 37px;
                perspective: 800px;
                overflow: hidden;
                position: relative;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
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
            .count-img:hover:after{ opacity: 1; }
            .count-img:before{
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
                transition: all 0.7s ease 0s;
            }
            .count-img:hover:before{
                opacity: 0.3;
                transform: translateX(-50%) translateY(-50%) scale(1.5) rotate(0);
            }
            .count-img:after{
                content: "";
                width: 100%;
                height: 100%;
                background: radial-gradient(rgba(255,255,255,0.9),transparent,transparent);
                position: absolute;
                top: 0;
                left: 0;
                opacity: 0;
            }
            .count-desc{
                width: 55%;
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
                    width: 70%;
                    margin: 0 auto;
                    font-size: 18px;
                    color: #2c2c2c;
                    line-height: 80px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    margin-left: 10%;
                    display: -webkit-box !important;
                    -webkit-box-orient: vertical !important;
                    -webkit-line-clamp:1 !important;// 限制快级元素的文本行数
                    overflow: hidden !important;
                }
                .span-title{
                    width: 70%;
                    margin: 0 auto;
                    font-size: 14px;
                    color: #2c2c2c;
                    margin-top: 40px;
                    margin-left: 10%;
                }
                .p-title{
                    width: 70%;
                    margin: 0 auto;
                    font-size: 14px;
                    color: #2c2c2c;
                    margin-left: 10%;
                }
                .p-desc{
                    width: 70%;
                    margin: 0 auto;
                    font-size: 14px;
                    color: #2c2c2c;
                    line-height: 28px;
                    margin-top: 50px;
                    margin-left: 10%;
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
                        transition: all 1s;
                        background-color:#313131; 
                        .el-button--text{
                            color: #fff;
                            width: 100%;
                        }
                    }
                    .count-button-but:hover{
                        width: 110px;
                        height: 40px;
                        text-align: center;
                        line-height: 40px;
                        margin-top: 37px;
                        transform: scale(.94);
                        border-radius: 5px;
                        background-color:#313131; 
                        .el-button--text{
                            color: #fff;
                            width: 100%;
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
        }
        .knowledge-count-div1:nth-child(3){
            width: 1200px;
            height: 500px;
            margin: 0 auto;
            margin-top: 40px;
            display: flex;
            position: relative;
            cursor:pointer;
            box-shadow: 0px 1px 14px 1px rgba(36, 36, 36, 0.2);
             .knowledge-auto{
                width: 1200px;
                margin: 0 auto;
                height: 100%;
                display: flex;
                position: relative;
               .count-img{
                width: 38%;
                height: 84%;
                margin: 20px;
                position: absolute;
                right: 0%;
                top: 17px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .count-desc{
                width: 55%;
                height: 84%;
                margin-top: 38px;
                margin-left: 40px;
                background-color: #eeeeee;
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
                    margin-left: 20%;
                    text-align: right;
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
                    position: relative;
                    .count-button-but{
                        width: 110px;
                        height: 40px;
                        position: absolute;
                        right: 0;
                        text-align: center;
                        line-height: 40px;
                        margin-top: 37px;
                        background-color:#313131; 
                        .el-button--text{
                            color: #fff;
                            width: 100%;
                        }
                    }
                    .count-button-right{
                        font-size: 18px;
                        margin-top: 40px;
                        margin-left: 15%;
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
    .Default-page{
        width: 100%;
        height: 600px;
        margin: 0 auto;
        text-align: center;
        line-height: 600px;
        background-color: #F1F1F1;
        .Default-main{
            width: 1200px;
            height: 100%;
            margin: 0 auto;
        img{
            width: 500px;
            height: 300px;
        }
        .page-span{
            font-size:22px;
            font-family:PingFang SC;
            font-weight:500;
            color: #999;
        }
        }
    }
}
</style>