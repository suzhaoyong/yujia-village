<template>
    <div>
        <el-col :span="24">
            <div class="joinclub-main">
                <div class="sub_box2">
                <div class="subjects3">
                    <el-carousel height="60px" :interval="5000" :autoplay="true" arrow="never">
                        <el-carousel-item v-for="(item,index) in subjectbanner" :key="index">
                            <img :src="item.path" alt  @click="subclick(item)"/>
                            <div class="advertisement">广告</div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
                <template>
                    <div class="bg_img2" v-if="cationbanner.length > 0">
                        <img :src="cationbanner[0].path" alt @click="cationclick(cationbanner[0].mold)"/>
                        <div class="advertisement">广告</div>
                    </div>
                    <div class="bg_img" v-else>
                        <img :src="banner" alt />
                    </div>
                </template>
                <div class="joinclub-cont">
                    <div class="subject2">
                        <img :src="cationmoad[0].path" @click="cationclick2(cationmoad[0].mold)"/>
                        <div class="advertisement">广告</div>
                    </div>
                    <div class="joinclub-cont-div6">
                        <div class="cont-div6-left">
                            <img src="../assets/huo.png"/>
                            <div class="nav-text3">热门城市</div>
                        </div>
                        <div class="cont-div6-right">
                            <v-distpicker :province="province" :city="city" :area="area" @province="onChangeProvince" @city="onChangeCity" @area="onchangearea"></v-distpicker>
                            <div class="search" @click="Provincescity">搜索</div>
                        </div>
                    </div>
                    <div class="joinclub-cont-div7">
                        <div class="text7" v-for="(item,index) in itemsList" :key="index" :class="{blue:i===index}" @click="changSemester(index,item)">{{item}}</div>
                    </div>
                    <div class="joinclub-cont-div3">
                       <div class="clubhouse2" v-if="this.joinlist.length > 0">
                            <div class="clubhouse2-list" v-for="(item, index) in joinlist" :key="index" @click="selectItem(item)">
                                <figure class="test6">
                                    <img :src="item.first_img" class="yogocontunt2-img" :alt="item.club_name"/>
                                    <p class="p1">{{item.club_name}}</p>
                                    <p class="p2">{{item.custom_address}}</p>
                                    <figcaption>
                                        <div class="telimg">
                                            <span v-html="item.content" :title="item.content" class="telpp">{{item.content}}</span>
                                        </div>
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
                       <div class="Default-page4" v-else>
                            <div class="Default-main4">
                            <img src="../assets/default.png"/>
                            <span class="page-span4">我寻寻觅觅却找不到您的踪迹~</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-col>
    </div>
</template>
<script>
import Banner from "../components/banner";
import Bus from "@/utils/Bus";
import { mapGetters } from "vuex"
import VDistpicker from 'v-distpicker'
export default {
    metaInfo: {
        title: '培训机构-瑜伽培训中心-中国瑜伽村培训平台', // set a title
        meta: [{       // set meta
            name: 'keyWords',
            content: '瑜伽培训机构，瑜伽培训哪家好'
        },{
            name: 'description',
            content: '中国瑜伽村平台整合了国内各大知名且专业的瑜伽培训机构和瑜伽培训中心，要想知道瑜伽培训哪家好，就来找中国瑜伽村。'
        }]
    },
    inject: ["reload"],
    components:{
        Banner,
        VDistpicker
    },
  data() {
    return {
        joinlist:[],
        cationmoad:[],
        subjectbanner:[],
        cationbanner:[],
        banner:'',
        city:'',
        area:'',
        province:'',
        labelPosition:'left',
        itemsList:["北京","上海","深圳","成都","武汉","厦门","天津","广州","重庆","长沙","南京","杭州"],
        ruleForm: {
          name: '',
          tel: '',
          enterprise: '',
          address: '',
          desc: ''
        },
        currentPage:1,
        pagesize: 0,
        total:0,
        i:"",
        current:"",
        changehot:""
    };
  },
  computed: {
    ...mapGetters(["info"]),
  },
  created(){
      this.joindata();
      this.classification();
  },
  methods:{
      //根据页面查广告数据
    classification(){
      this.$request.get(`/advertisement/data/7`).then(data => {
          for(let i = 0; i < data.length; i++){
            if(data[i].position == 0){
              this.cationbanner = data[i].advertisement;
            }
            else if(data[i].position == 1){
              this.subjectbanner = data[i].advertisement;
            }
            else if(data[i].position == 2){
              this.cationmoad = data[i].advertisement;
            }
          }
      });
    },
     subclick(item){
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
      cationclick(cationbanner){
        switch(this.cationbanner[0].mold){
            case 1:
                this.$router.push({
                    path: "/subjects",
                    query: {
                    id: this.cationbanner[0].relation_id
                    }
                });
                break;
            case 2:
                this.$router.push({
                    path: "/joinclubhouse/joinclubhousedetails",
                    query: {
                    id: this.cationbanner[0].relation_id
                    }
                });
                break;
            case 3:
                this.$router.push({
                    path: "/yogoteacher/yogoteacherdetails",
                    query: {
                    id: this.cationbanner[0].relation_id
                    }
                });
                break;
            case 4:
               this.$router.push({
                        path: `/cultivate/detail/${this.cationbanner[0].relation_id}`,
                    });
                break;
            case 5:
                this.$router.push({
                    path: "/goods/detail",
                    params: {
                    id: this.cationbanner[0].relation_id
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
      cationclick2(cationmoad){
        switch(this.cationmoad[0].mold){
            case 1:
                this.$router.push({
                    path: "/subjects",
                    query: {
                    id: this.cationmoad[0].relation_id
                    }
                });
                break;
            case 2:
                this.$router.push({
                    path: "/joinclubhouse/joinclubhousedetails",
                    query: {
                    id: this.cationmoad[0].relation_id
                    }
                });
                break;
            case 3:
                this.$router.push({
                    path: "/yogoteacher/yogoteacherdetails",
                    query: {
                    id: this.cationmoad[0].relation_id
                    }
                });
                break;
            case 4:
               this.$router.push({
                        path: `/cultivate/detail/${this.cationmoad[0].relation_id}`,
                    });
                break;
            case 5:
                this.$router.push({
                    path: "/goods/detail",
                    params: {
                    id: this.cationmoad[0].relation_id
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
     onChangeProvince(data) {
      this.province = data.value;
    },
     onChangeCity(data) {
      this.city = data.value;
    },
    onchangearea(data){
     this.area = data.value;
    },
     //热门城市
     changSemester(index,item){
         this.i = index;
         this.changehot = item;
         let params2 = {
            hot:this.changehot,
        }
        this.$request.post(`/clubs/search/hot/club?page=${this.currentPage}`,params2).then(res => {
            this.joinlist = res.data;
            this.total = res.total;
            this.currentPage = res.current_page;
            this.pagesize = res.per_page;
            this.current = 'Semester';
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
     //省市区查询
     Provincescity(){
        let params = {
            province:this.province,
            city:this.city,
            area:this.area
        }
        this.$request.post(`/clubs/search/club?page=${this.currentPage}`,params).then(res => {
            this.joinlist = res.data;
            this.total = res.total;
            this.currentPage = res.current_page;
            this.pagesize = res.per_page;
            this.current = 'city';
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
      //会所列表
      joindata(){
        let _this = this;
        this.$request(`/clubs?page=${_this.currentPage}`).then(res => {
            _this.joinlist = res.data.data;
            _this.banner = res.banner;
            _this.total = res.data.total;
            _this.currentPage = res.data.current_page;
            _this.pagesize = res.data.per_page;
            _this.current = 'join';
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
      selectItem(item){
        this.$router.push({
            path: "/joinclubhouse/joinclubhousedetails",
            query: {
            id: item.id
            }
        });
      },
    goto() {
      const { name, identity_auth } = this.info.user
      if(name){
        if(parseInt(identity_auth) === 1) {
          this.$router.push("/personal/identity");
          return;
        }
        const obj = {
          2: {message:'您已在申请中，请耐心等待审核', type:'success'},
          3: {message:'您已加盟成功',type:'success'},
          4: {message:'您是教练认证中，暂时不能申请加盟，详情请联系机构负责人认证',type:'warning'},
          5: {message:'您是教练，暂时不能申请加盟，详情请联系机构负责人认证',type:'warning'},
          6: {message:'您的申请未通过，详情请联系客服',type:'error'},
          7: {message:'您已加盟成功',type:'success'},
          8: {message:'您已加盟成功',type:'success'},
        }
        obj[identity_auth] && this.$alert(`${obj[identity_auth].message}`, '温馨提示', {
          confirmButtonText: '确定',
        })
        // obj[identity_auth] && this.$message(obj[identity_auth])
      }else{
        Bus.$emit("login", true);
      }
    },
      handleCurrentChange(val) {
          this.currentPage = val;
          if(this.current == 'join'){
              this.joindata();
          }
          
          if(this.current == 'city'){
              this.Provincescity();
          }

          if(this.current == 'Semester'){
              this.changSemester(this.i,this.changehot);
          }
      }
  }
};
</script>
<style lang="scss" scoped>
.test6{
    width: 100%;
    height: 100%;
    position: relative;
    transition: all 1s ease;
    overflow: hidden;
    }
.test6 .yogocontunt2-img{
    width: 100%;
    height: 224px;
    object-fit: cover;
    }
.test6 figcaption{
    width: 100%;
    height: 224px; 
    position: absolute;
    top: 0%;
    }
.test6 figcaption .telimg{
    width: 100%;
    margin: 0 auto;
    bottom: 0;
    opacity: 0;
    // height: 100%;
    max-width: 100%;
    margin-top: -5px;
    padding: 10px;
}
.test6 figcaption .telimg .telpp{
    opacity: 0;
    text-align: center;
}
.test6:hover .yogocontunt2-img{
    width:100%;
    height:224px;
    // background-color: #8fc31f;
    opacity: 1;
}
.test6:hover figcaption .telimg{
    width: 100%;
    margin: 0 auto;
    top: 30%;
    opacity: .9;
    background-color: #8fc31f;
    transition: all 1s ease;
}
.test6:hover figcaption .telimg .telpp{
    opacity: 1;
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color: #fff;
    margin-left: 7px;
    transition: transform 1s ease-in;
    display: -webkit-box !important;
    -webkit-box-orient: vertical !important;
    -webkit-line-clamp: 9 !important;// 限制快级元素的文本行数
    overflow: hidden !important;
}
.test6:hover img{
    opacity: 0.1;
    }
.bg_img {
  width: 100%;
  height: 100%;
  position: relative;
  img{
      width: 100%;
      height: 100%;
  }
  .banner_button{
    position: absolute;
    top: 76.8%;
    width: 10.8%;
    background-color: #9AB1C1;
    height: 7.4%;
    border-radius: 14px;
    right: 44.5%;
    text-align: center;
    .butt{
      font-size:1rem;
      font-family:Microsoft YaHei;
      font-weight:bold;
      color: #FFFFFF;
    }
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
.el-select-dropdown__item.selected {
    color: #CCE198;
    font-weight: 700;
}
.distpicker-address-wrapper select{
    width: 145px !important;
    padding: 0px 4px !important;
    font-size: 14px !important;
}
    .joinclub-main{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    .sub_box2{
    width: 100%;
    position: fixed;
    top: 0px;
    z-index: 999;
    .subjects3{
        width: 100%;
        height: 60px;
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
    }
    .joinclub-cont{
        width: 100%;
        margin: 0 auto;
        height: 100%;
        display: inline-block;
        .joinclub-cont-div1{
            width: 100%;
            height: 150px;
            text-align: center;
            display: inline-block;
            position: relative;
            margin-top: 20px;
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
        .joinclub-cont-div2{
            width: 100%;
            height: 600px;
            margin: 0 auto;
            .clubhouse{
                width: 75%;
                height: 516px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                .clubhouse-left{
                    width: 58%;
                    height: 100%;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .clubhouse-right{
                    width: 38%;
                    height: 100%;
                    background-color: #ffffff;
                    box-shadow: 0px 0px 9px 0px 
                        rgba(92, 92, 92, 0.28);
                        p{
                            text-align: center;
                            border-right: 64px solid;
                            line-height: 1px;
                            border-left: 64px solid;
                            margin-left: 20%;
                            margin-right: 20%;
                            margin-top: 37px;
                        }
                        .clubhouse-form{
                            width: 90%;
                            margin: 0 auto;
                            margin-top: 40px;
                            .from-span{
                                width: 100%;
                            }
                            .el-button{
                                background: #8fc31f;
                                width: 100px;
                                height: 35px;
                                line-height: 11px;
                            }
                            .el-button:hover{
                                background: #8fc31f;
                            }
                            .el-textarea__inner{
                                height: 100px;
                                background-color: #dcdcdc;
                            }
                        }
                }
            }
        }
        .joinclub-cont-div3{
            width: 100%;
            height: 100%;
            margin: 0 auto;
            margin-bottom: 50px;
            .clubhouse2{
                width: 1200px;
                height: 100%;
                margin: 0 auto;
                margin-bottom: 50px;
                .clubhouse2-list{
                    width: 278px;
                    height: auto;
                    float: left;
                    margin: 11px;
                    margin-bottom: 20px;
                    position: relative;
                    cursor:pointer;
                    // .image{
                    //     width: 100%;
                    //     height: 224px;
                    // }
                    .p1{
                        text-align: center;
                        font-size: 14px;
                        color: #2c2c2c;
                        margin-top: 15px;
                    }
                    .p2{
                        text-align: center;
                        width: 90%;
                        margin: 0 auto;
                        margin-bottom: 15px;
                        font-size: 0.8rem;
                        color: #999999;
                    }
                    .kong{
                        width: 100%;
                        height: auto;
                        position: absolute;
                        bottom: 110px;
                        right: 0px;
                        margin: 0 auto;
                        text-align: center;
                        line-height: 30px;
                        color: #fff;
                        font-size: 14px;
                        opacity: 0;
                        transition: all .5s ease;
                    }
                    .kong:hover{
                        width: 100%;
                        height: auto;
                        background-color: #8fc31f;
                        position: absolute;
                        bottom: 110px;
                        right: 0px;
                        margin: 0 auto;
                        text-align: center;
                        line-height: 30px;
                        color: #fff;
                        font-size: 14px;
                        opacity: 0.9;
                        transition: all .8s ease;
                    }
                }
                .block{
                    text-align: center;
                    margin: 0 auto;
                    width: 100%;
                    display: inline-block;
                    margin-top: 20px;
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
            .Default-page4{
                width: 100%;
                height: 600px;
                margin: 0 auto;
                text-align: center;
                line-height: 600px;
                background-color: #F0ECE2;
                .Default-main4{
                    width: 1200px;
                    height: 100%;
                    margin: 0 auto;
                img{
                    width: 500px;
                    height: 300px;
                }
                .page-span4{
                    font-size:22px;
                    font-family:PingFang SC;
                    font-weight:500;
                    color: #999;
                }
                }
            }
        }
        .joinclub-cont-div5{
            width: 1180px;
            height: 50px;
            line-height: 50px;
            background: #eeeeee;
            text-align: center;
            margin: 0 auto;
            margin-bottom: 6%;
            margin-top: 3%;
            .nav-text2{
                font-family:Microsoft YaHei;
                font-weight:bold;
                color:rgba(44,44,44,1);
                font-size: 16px;
            }
        }
        .subject2{
            width: 1180px;
            height: 60px;
            margin: 0 auto;
            margin-top: 3rem;
            cursor: pointer;
            position: relative;
            img{
                width: 100%;
                height: 100%;
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
        .joinclub-cont-div6{
            width: 1180px;
            border-bottom: 1px solid #E5E5E5;
            text-align: center;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            margin-top: 5rem;
            .cont-div6-left{
                display: flex;
                margin-top: 14px;
                img{
                    width: 15px;
                    height: 20px;
                }
                .nav-text3{
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    color:rgba(44,44,44,1);
                    font-size: 14px;
                    line-height: 23px;
                    margin-left: 7px;
                }
            }
            .cont-div6-right{
                display: flex;
                margin-top: 7px;
                .search{
                    width: 100px;
                    height: 40px;
                    background: #8ABB62;
                    line-height: 40px;
                    text-align: center;
                    color: #fff;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    font-size: 14px;
                }
            }
        }
        .joinclub-cont-div7{
            width: 1180px;
            height: 50px;
            border-bottom: 1px solid #e5e5e5;
            line-height: 50px;
            margin:0 auto;
            display: flex;
            padding-left: 50px;
            margin-bottom: 50px;
            cursor: pointer;
            .text7{
                color: #2c2c2c;
                font-family:Microsoft YaHei;
                font-weight:400;
                font-size: 14px;
                padding-left: 25px;
            }
            .blue{
                color: #8ABB62;
                font-family:Microsoft YaHei;
                font-weight:bold;
                font-size: 14px;
            }
        }
      }
    }
</style>

