<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="formation-main">
                    <div class="formationitem">
                        <div class="select-bg">
                            <div v-for="(list,index) in navLists" :key="index" class="nav" :class="{ red:changeRed == index}" @click="reds(index,list)">{{list.classify}}</div>
                        </div>
                    </div>
                    <template>
                       <div class="bg_img3" v-if="cationbanner.length > 0">
                         <img :src="item.path" alt v-for="(item,index) in cationbanner" :key="index" @click="cationclick(item)"/>
                        <div class="advertisement">广告</div>
                       </div>
                        <div class="bg_img2" v-else>
                         <img :src="banner" alt />
                        </div>
                    </template>
                    <div class="formation-count" v-if="this.listdatas.length > 0">
                        <div class="formation-count-div1" v-for="(item,index) in listdatas" :key="index" @click="selectItem(item)">
                            <img class="bg-img3" src="../assets/image26.png"/>
                            <img class="bg-img8" src="../assets/image30.png"/>
                            <div class="formation-auto">
                            <div class="count-img">
                               <div class="border"></div>
                               <h4>{{item.headline}}</h4>
                                <p class="span-title">{{item.created_at}}</p>
                                <p class="p-title">关键字：{{item.keyword}}</p>
                                <p class="p-desc">{{item.summary}}</p>
                                <div class="count-button-but">
                                    <el-button type="text" @click="selectItem(item)">查看全部</el-button>
                                </div>
                                <div class="border2"></div>
                                <div class="count-button-right">
                                    <!-- <img class="img1" src="../assets/share.png"/> -->
                                    <img class="img2" src="../assets/eye.png" :title="'点击率:'+(item.views||100)"/>
                                    <span class="span3">{{item.views||100}}</span>
                                </div>
                            </div>
                            <div class="count-desc">
                                <div class="desc-img1">
                                    <img :src="item.icon_url" :alt="item.headline"/>
                                    <div class="box-content"></div>
                                </div>
                                <div class="desc-img2">
                                    <img :src="item.icon_url" alt="资讯图片"/>
                                </div>
                            </div>
                            <div class="bg-border"></div>
                            <div class="bg-re">YOGA</div>
                            <img class="bg-img5" src="../assets/image31.png"/>
                            </div>
                            <img class="bg-img4" src="../assets/image27.png"/>
                            <img class="bg-img6" src="../assets/image28.png"/>
                            <img class="bg-img7" src="../assets/image29.png"/>
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
                        <div class="kongbai"></div>
                    </div>
                    <div class="Default-page2" v-else>
                        <div class="Default-main2">
                        <img src="../assets/default.png"/>
                        <span class="page-span2">我寻寻觅觅却找不到您的踪迹~</span>
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
    title: '瑜伽资讯-瑜伽新闻-中国瑜伽村资讯栏目', 
    meta: [{
        name: 'keyWords',
        content: '瑜伽资讯，中国瑜伽村，瑜伽热点新闻'
    },{
        name: 'description',
        content: '中国瑜伽村整合了行业的一些新闻、要点，以及一些明星学习瑜伽的资讯，还有更多热点新闻等你来看。'
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
        listid:0,
        cationbanner:[]
    };
  },
  created(){
      this.mationdata();
      this.yujiarmation();
      this.classification();
  },
  methods:{
      //根据页面查广告数据
    classification(){
      this.$request.get(`/advertisement/data/10`).then(data => {
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
                    path: "/cultivate/index",
                });
                break;
            case 7:
                this.$router.push({
                    path: "/market/detail",
                });
                break;
        }
      },
      yujiarmation(){
          let _this = this;
        this.$request(`/InformationClassify`).then(res => {
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
     mationdata(){
        let _this = this;
        this.$request(`/informationList/${_this.listid}?page=${_this.currentPage}`).then(res => {
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
          this.mationdata();
      },
      reds:function(index,list){
       this.changeRed = index;
       this.listid = list.id;
       this.currentPage = 1;
       this.mationdata();
    //    for(var i=0;i<this.formationList.length;i++){
    //        if(index==i){
    //            if(this.formationList[i].data==undefined){
    //               this.listdatas=[];
    //            }else{
    //               this.listdatas=this.formationList[i].data;
    //               this.total = this.knowledgeList[i].total;
    //               this.currentPage = this.knowledgeList[i].current_page;
    //               this.pagesize = this.knowledgeList[i].per_page;
    //            }
    //        }
    //    }
    },
       selectItem(item){
           this.$router.push({
            path: "/yogoinformation/yogoinformationdetails",
            query: {
            id: item.id
            }
        });
      },
  }
};
</script>
<style lang="scss" scoped>
.bg_img2 {
  width: 100%;
  height: 100%;
  img{
      width: 100%;
      height: 100%;
  }
}
.bg_img3{
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
    .desc-img1{ margin-bottom: 30px; }
}
.formationitem{
    width: 1200px;
    margin: 0 auto;
.select-bg{
        width: 1200px;
        margin: 0 auto;
        position: absolute;
        // left: 190px;
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
            height: 60px;
        }
        .formation-count-div1:nth-child(3n+1){
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
                height: 550px;
                left: 0%;
                top: 20%;
                opacity: 0.5;
            }
            .bg-img8{
                position: absolute;
                width: 270px;
                height: 550px;
                left: 0%;
                top: 20%;
                opacity: 0.5;
                display: none;
            }
            .bg-img4{
                position: absolute;
                width: 130px;
                height: 180px;
                right: 7%;
                top: 73%;
            }
            .bg-img7{
                position: absolute;
                width: 130px;
                height: 180px;
                right: 7%;
                top: 73%;
                display: none;
            }
            .bg-img6{
                position: absolute;
                width: 130px;
                height: 180px;
                right: 0%;
                top: 21%;
            }
            .formation-auto{
                width: 1200px;
                height: auto;
                display: flex;
                margin: 0 auto;
                position: relative;
           .count-img{
                width: 31%;
                height: 84%;
                margin: 38px;
                position: absolute;
                left: 7%;
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
                        width: 100%;
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
                        width: 100%;
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
                width: 40%;
                height: 84%;
                margin-top: 38px;
                background-color: #eeeeee;
                position: absolute;
                right: 10%;
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
                    transition: all 0.7s ease 0s;
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
                        object-fit: cover;
                    }
                }
            }
            .bg-img5{
                position:absolute;
                width: 31px;
                height: 33px;
                right: 2%;
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
                right: 4%;
                top: 8%;
            }
            .bg-re{
                position:absolute;
                right: 2%;
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
        }
        }
        .formation-count-div1:nth-child(3n+2){
            width: 100%;
            height:606px;
            margin: 0 auto;
            display: flex;
            justify-content: space-around;
            background-color: #ffffff;
            position: relative;
            margin-top: 130px;
            cursor:pointer;
            .bg-img3{
                position: absolute;
                width: 270px;
                height: 550px;
                left: 82%;
                top: 20%;
                opacity: 0.5;
                display: none;
            }
            .bg-img4{
                position: absolute;
                width: 130px;
                height: 180px;
                left: 0%;
                top: 73%;
                opacity: 0.6;
            }
            .bg-img6{
                position: absolute;
                width: 240px;
                height: 180px;
                left: 0%;
                top: 15%;
            }
            .bg-img7{
                position: absolute;
                width:340px;
                height: 550px;
                right: 0%;
                top: 43%;
                display: block;
            }
            .bg-img8{
                position: absolute;
                width: 270px;
                height: 550px;
                left: 82%;
                top: 20%;
                opacity: 0.5;
                display: none;
            }
            .formation-auto{
                width: 1200px;
                height: auto;
                display: flex;
                margin: 0 auto;
                position: relative;
           .count-img{
                width: 31%;
                height: 84%;
                margin: 38px;
                position: absolute;
                left: 54%;
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
                        width: 100%;
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
                        width: 100%;
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
                width: 40%;
                height: 84%;
                background-color: #ffffff;
                position: absolute;
                left:9%;
                .desc-img1{
                    width: 100%;
                    height: 443px;
                    position: relative;
                    perspective: 800px;
                    overflow: hidden;
                    top: 0%;
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
                    transition: all 0.7s ease 0s;
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
                    margin-top: 14px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .bg-img5{
                position:absolute;
                width: 31px;
                height: 33px;
                left: 3%;
                top: 78%;
            }
            .bg-border{
                position:absolute;
                width: 1px;
                height: 40px;
                background-color: #7d7d7d;
                width: 2px;
                height: 75px;
                background-color: #7d7d7d;
                left: 4%;
                top: 54%;
            }
            .bg-re{
                position:absolute;
                right: 94%;
                top: 70%;
                color: #2c2c2c;
                font-size: 14px;
                transform:rotate(90deg);
                -ms-transform:rotate(90deg); /* Internet Explorer 9*/
                -moz-transform:rotate(90deg); /* Firefox */
                -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
                -o-transform:rotate(90deg); /* Opera */
                filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);
            }
        }
        }
        .formation-count-div1:nth-child(3n+3){
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
                height: 550px;
                left: 0%;
                top: 20%;
                opacity: 0.5;
                display: none;
            }
            .bg-img8{
                position: absolute;
                width: 340px;
                height: 550px;
                left: 0%;
                top: 20%;
                display: block;
                opacity: 1;
            }
            .bg-img4{
                position: absolute;
                width: 130px;
                height: 180px;
                right: 7%;
                top: 73%;
            }
            .bg-img7{
                position: absolute;
                width: 340px;
                height: 550px;
                right: 7%;
                top: 73%;
                display: none;
            }
            .bg-img6{
                position: absolute;
                width: 130px;
                height: 180px;
                right: 0%;
                top: 21%;
            }
            .formation-auto{
                width: 1200px;
                height: auto;
                display: flex;
                margin: 0 auto;
                position: relative;
           .count-img{
                width: 31%;
                height: 84%;
                margin: 38px;
                position: absolute;
                left: 7%;
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
                        width: 100%;
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
                        width: 100%;
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
                width: 40%;
                height: 84%;
                margin-top: 38px;
                background-color: #eeeeee;
                position: absolute;
                right: 10%;
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
                    transition: all 0.7s ease 0s;
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
            .bg-img5{
                position:absolute;
                width: 31px;
                height: 33px;
                right: 2%;
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
                right: 4%;
                top: 8%;
            }
            .bg-re{
                position:absolute;
                right: 2%;
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
    .Default-page2{
        width: 100%;
        height: 600px;
        margin: 0 auto;
        text-align: center;
        line-height: 600px;
        background-color: #F1F1F1;
        .Default-main2{
            width: 1200px;
            height: 100%;
            margin: 0 auto;
        img{
            width: 500px;
            height: 300px;
        }
        .page-span2{
            font-size:22px;
            font-family:PingFang SC;
            font-weight:500;
            color: #999;
        }
        }
    }
}
</style>