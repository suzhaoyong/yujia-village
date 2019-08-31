<template>
    <div>
        <el-col :span="24">
            <div class="joinclub-main">
                <template>
                    <!-- <Banner></Banner> -->
                    <div class="bg_img">
                        <img :src="banner" alt />
                        <div class="banner_button">
                            <el-button type="text" class="butt">申请加盟</el-button>
                        </div>
                    </div>
                </template>
                <div class="joinclub-cont">
                    <!-- <div class="joinclub-cont-div1">
                        <h2><img src="../assets/yujia.png"/>会馆加盟</h2>
                         <p class="nav-text">Sometimes beauty is so simple</p>
                         <div class="border-left"></div>
                         <div class="border-right"></div>
                    </div>
                    <div class="joinclub-cont-div2">
                        <div class="clubhouse">
                            <div class="clubhouse-left"><img src="../assets/image10.png"/></div>
                            <div class="clubhouse-right">
                                <p>商务合作卡</p>
                                <div class="clubhouse-form">
                                    <el-form :model="ruleForm" :label-position="labelPosition" ref="ruleForm" label-width="90px" class="demo-ruleForm">
                                    <el-form-item label="姓名：" prop="name">
                                        <el-input v-model="ruleForm.name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="联系电话：" prop="tel">
                                        <el-input v-model="ruleForm.tel" maxlength="11"></el-input>
                                    </el-form-item>
                                    <el-form-item label="企业名：" prop="enterprise">
                                        <el-input v-model="ruleForm.enterprise"></el-input>
                                    </el-form-item>
                                    <el-form-item label="公司地址：" prop="address">
                                        <el-input v-model="ruleForm.address"></el-input>
                                    </el-form-item>
                                    <el-form-item label="备注：" prop="desc">
                                        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <div style="display: flex;margin-left: -30%;margin-top: -13px;">
                                        <span class="from-span">咨询服务热线<span style="padding-left:10px;color:#2c2c2c">400-100-7191</span></span>
                                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                                        </div>
                                    </el-form-item>
                                    </el-form>
                                </div>
                            </div>
                        </div>
                    </div> -->
                    <div class="joinclub-cont-div4">
                        <h2><img src="../assets/yujia.png"/>会馆展示</h2>
                         <p class="nav-text">Sometimes beauty is so simple</p>
                         <div class="border-left"></div>
                         <div class="border-right"></div>
                    </div>
                    <div class="joinclub-cont-div3">
                       <div class="clubhouse2">
                            <div class="clubhouse2-list" v-for="(item, index) in joinlist.slice((currentPage-1)*pagesize,currentPage*pagesize)" :key="index" @mouseenter="onMouseOver(index)" @click="selectItem(item)">
                                <img class="image" :src="item.path">
                                <p class="p1">{{item.club_name}}</p>
                                <p class="p2">{{item.club_address}}</p>
                                <!-- <div class="kong" v-show="index == ishow"><span v-html="item.content">{{item.content}}</span></div> -->
                                <div class="kong"><span v-html="item.content">{{item.content}}</span></div>     
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
                                    :total="joinlist.length">
                                </el-pagination>
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
        pagesize: 12,
    };
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
            console.log('error submit!!');
            return false;
          }
        });
      },
       joindata(){
        let _this = this;
        this.$request("/clubs").then(res => {
            _this.joinlist = res.data;
            _this.banner = res.banner;
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
      onMouseOver(index){
          this.ishow = index;
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
    top: 77%;
    width: 11%;
    background-color: #9AB1C1;
    height: 7%;
    border-radius: 4vh;
    right: 44%;
    text-align: center;
    .butt{
      font-size:5vh;
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
                    .image{
                        width: 100%;
                        height: 224px;
                    }
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
                        font-size: 0.9rem;
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
                font-size: 1.6rem;
                margin-top: 40px;
                font-family:Microsoft YaHei;
                font-weight:bold;
                padding-top: 24px;
                img{
                    width: 28px;
                    height: 28px;
                    position: absolute;
                    left: 42%;
                }
            }
        }
      }
    }
</style>

