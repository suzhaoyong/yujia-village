<template>
    <div>
        <el-col :span="24">
            <div class="joinclub-main">
                <template>
                    <Nav></Nav>
                </template>
                <div class="joinclub-cont">
                    <div class="joinclub-cont-div1">
                        <h2><img src="../assets/yujia.png"/>会馆加盟</h2>
                         <p class="nav-text">Sometimes beauty is so simple</p>
                         <div class="border-left"></div>
                         <div class="border-right"></div>
                    </div>
                    <div class="joinclub-cont-div2">
                        <div class="clubhouse">
                            <div class="clubhouse-left"><img src="../assets/ss.png"/></div>
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
                                        <span class="from-span">咨询服务热线<span style="padding-left:10px;color:#2c2c2c">400-100-7191</span></span>
                                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                                    </el-form-item>
                                    </el-form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="joinclub-cont-div1">
                        <h2><img src="../assets/yujia.png"/>会馆展示</h2>
                         <p class="nav-text">Sometimes beauty is so simple</p>
                         <div class="border-left"></div>
                         <div class="border-right"></div>
                    </div>
                    <div class="joinclub-cont-div3">
                       <div class="clubhouse2">
                            <div class="clubhouse2-list" v-for="(item, index) in joinlist.slice((currentPage-1)*pagesize,currentPage*pagesize)" :key="index" @mouseenter="onMouseOver(index)" @click="selectItem(item)">
                                <img class="image" :src="item.img">
                                <p class="p1">{{item.text}}</p>
                                <p class="p2">{{item.detail}}</p>
                                <div class="kong" v-show="index == ishow"><span>{{item.houtext}}</span></div>
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
import Nav from "../components/nav";
export default {
    components:{
        Nav
    },
  data() {
    return {
        ishow:false,
        joinlist:[
            {id:1,img:require('../assets/ss.png'),text:'观云瑜伽',detail:'四川省成都市锦江区双桂路泰和国际财富中心7栋302',houtext:'1000平米场馆'},
            {id:2,img:require('../assets/ss.png'),text:'观云瑜伽',detail:'四川省成都市锦江区双桂路泰和国际财富中心7栋302',houtext:'2000平米场馆'},
            {id:3,img:require('../assets/ss.png'),text:'观云瑜伽',detail:'四川省成都市锦江区双桂路泰和国际财富中心7栋302',houtext:'3000平米场馆'},
            {id:4,img:require('../assets/ss.png'),text:'观云瑜伽',detail:'四川省成都市锦江区双桂路泰和国际财富中心7栋302',houtext:'500平米场馆'},
            {id:5,img:require('../assets/ss.png'),text:'观云瑜伽',detail:'四川省成都市锦江区双桂路泰和国际财富中心7栋302',houtext:'700平米场馆'},
            {id:6,img:require('../assets/ss.png'),text:'观云瑜伽',detail:'四川省成都市锦江区双桂路泰和国际财富中心7栋302',houtext:'800平米场馆'},
            {id:7,img:require('../assets/ss.png'),text:'观云瑜伽',detail:'四川省成都市锦江区双桂路泰和国际财富中心7栋302',houtext:'900平米场馆'},
            {id:8,img:require('../assets/ss.png'),text:'观云瑜伽',detail:'四川省成都市锦江区双桂路泰和国际财富中心7栋302',houtext:'1200平米场馆'},
            {id:9,img:require('../assets/ss.png'),text:'观云瑜伽',detail:'四川省成都市锦江区双桂路泰和国际财富中心7栋302',houtext:'1300平米场馆'},
            {id:10,img:require('../assets/ss.png'),text:'观云瑜伽',detail:'四川省成都市锦江区双桂路泰和国际财富中心7栋302',houtext:'500平米场馆'},
            {id:11,img:require('../assets/ss.png'),text:'观云瑜伽',detail:'四川省成都市锦江区双桂路泰和国际财富中心7栋302',houtext:'300平米场馆'},
            {id:12,img:require('../assets/ss.png'),text:'观云瑜伽',detail:'四川省成都市锦江区双桂路泰和国际财富中心7栋302',houtext:'500平米场馆'},
            {id:13,img:require('../assets/ss.png'),text:'观云瑜伽',detail:'四川省成都市锦江区双桂路泰和国际财富中心7栋302',houtext:'500平米场馆'}],
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
      selectItem(item){
      },
      onMouseOver(index){
          this.ishow = index;
      },
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
      }
  }
};
</script>
<style lang="scss" scope>
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
        border: 1px solid;
        height: 100%;
        display: inline-block;
        .joinclub-cont-div1{
            width: 100%;
            height: 150px;
            text-align: center;
            border: 1px solid;
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
        .joinclub-cont-div2{
            width: 100%;
            height: 600px;
            margin: 0 auto;
            margin-top: 40px;
            .clubhouse{
                width: 75%;
                height: 516px;
                border: 1px solid;
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
                            margin-top: 50px;
                            .from-span{
                                margin-left: -30%;
                            }
                            .el-button{
                                margin-left: 30%;
                                background: #8fc31f;
                                width: 100px;
                                height: 35px;
                                line-height: 11px;
                                border:1px solid #8fc31f;
                            }
                            .el-button:hover{
                                border:1px solid #8fc31f;
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
            margin-top: 40px;
            .clubhouse2{
                width: 75%;
                height: 100%;
                border: 1px solid;
                margin: 0 auto;
                margin-bottom: 50px;
                .clubhouse2-list{
                    width: 262px;
                    height: 325px;
                    float: left;
                    padding: 11px;
                    position: relative;
                    .image{
                        width: 100%;
                        height: 224px;
                    }
                    .p1{
                        text-align: center;
                        font-size: 14px;
                        color: #2c2c2c;
                    }
                    .p2{
                        text-align: center;
                        width: 90%;
                        margin: 0 auto;
                        margin-bottom: 15px;
                        font-size: 14px;
                        color: #999999;
                    }
                    .kong{
                        width: 91%;
                        height: 12%;
                        background-color: #8fc31f;
                        position: absolute;
                        bottom: 112px;
                        right: 12px;
                        margin: 0 auto;
                        text-align: center;
                        line-height: 44px;
                        color: #fff;
                        font-size: 14px;
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
      }
    }
</style>

