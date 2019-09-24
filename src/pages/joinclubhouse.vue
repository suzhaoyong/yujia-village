<template>
    <div>
        <el-col :span="24">
            <div class="joinclub-main">
                <template>
                    <!-- <Banner></Banner> -->
                    <div class="bg_img">
                        <img :src="banner" alt />
                        <div class="banner_button">
                            <el-button type="text" class="butt" @click="goto()">申请联盟</el-button>
                        </div>
                    </div>
                </template>
                <div class="joinclub-cont">
                    <div class="joinclub-cont-div4">
                        <h2><img src="../assets/yujia.png"/>会馆展示</h2>
                         <p class="nav-text">Sometimes beauty is so simple</p>
                         <div class="border-left"></div>
                         <div class="border-right"></div>
                    </div>
                    <div class="joinclub-cont-div3">
                       <div class="clubhouse2" v-if="this.joinlist.length > 0">
                            <div class="clubhouse2-list" v-for="(item, index) in joinlist" :key="index" @mouseenter="onMouseOver(index)" @click="selectItem(item)">
                                <figure class="test6">
                                    <img :src="item.first_img" class="yogocontunt2-img"/>
                                    <p class="p1">{{item.club_name}}</p>
                                    <p class="p2">{{item.club_address}}</p>
                                    <figcaption>
                                        <div class="telimg">
                                            <span v-html="item.content" class="telpp">{{item.content}}</span>
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
export default {
    inject: ["reload"],
    components:{
        Banner
    },
  data() {
    return {
        ishow:false,
        joinlist:[],
        banner:'',
        labelPosition:'left',
        ruleForm: {
          name: '',
          tel: '',
          enterprise: '',
          address: '',
          desc: ''
        },
        currentPage:1,
        pagesize: 0,
        total:0
    };
  },
  computed: {
    ...mapGetters(["info"]),
  },
  created(){
      this.joindata();
  },
  methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            alert('error submit!!');
            return false;
          }
        });
      },
      joindata(){
        let _this = this;
        this.$request(`/clubs?page=${_this.currentPage}`).then(res => {
            _this.joinlist = res.data.data;
            _this.banner = res.banner;
            _this.total = res.data.total;
            _this.currentPage = res.data.current_page;
            _this.pagesize = res.data.per_page;
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
          4: {message:'您是教练认证中，暂时不能申请加盟，详情请联系馆主认证',type:'warning'},
          5: {message:'您是教练，暂时不能申请加盟，详情请联系馆主认证',type:'warning'},
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
      onMouseOver(index){
          this.ishow = index;
      },
      handleCurrentChange(val) {
          this.currentPage = val;
          this.joindata();
      }
  }
};
</script>
<style lang="scss" scope>
.test6{
    width: 100%;
    height: 100%;
    position: relative;
    transition: all 1s ease;
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
    height: auto;
    margin-top: -5px;
    padding-bottom: 10px;
    padding-top: 10px;
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
.el-select-dropdown__item.selected {
        color: #CCE198;
        font-weight: 700;
    }
    .joinclub-main{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
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
                    margin: 10px;
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
        .joinclub-cont-div4{
            width: 1200px;
            height: 150px;
            text-align: center;
            margin: 0 auto;
            position: relative;
            margin-top: 34px;
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
                margin-top: 40px;
                font-family:Microsoft YaHei;
                font-weight:bold;
                padding-top: 24px;
                img{
                    width: 28px;
                    height: 28px;
                    position: absolute;
                    left: 42%;
                    top: 18%;
                }
            }
        }
      }
    }
</style>

