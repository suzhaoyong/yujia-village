<template>
    <div>
        <div class="contactway">
            <div class="contactway_mian">
                <div class="breadcrumbitem">
                <span class="breadcrumb-span"><router-link to="/personal/index" style="color:#2c2c2c;text-decoration: none;">个人中心</router-link></span>
                <span class="breadcrumb-span">/ &nbsp;&nbsp;</span>
                <span class="breadcrumb-span" style="color:#999;">联系方式设置</span>
                </div>
                <div class="contactway_setting">
                    <div class="contactway_title">
                        <img src="../../assets/yujia.png"/>
                        <div class="yujia">联系方式设置</div>
                    </div>
                    <div class="contactway_count">The customer's excellent experience is our goal from beginning to end.</div>
                    <div class="contactway_bg2">
                        <div class="contactway_bg2_left">
                            <div class="left_li">
                                <el-radio-group v-model="radio" @change="change">
                                 <el-radio :label="3">允许向我邀请的好友展示联系方式</el-radio>
                                 </el-radio-group>
                                 <img src="../../assets/personal/interro.png" class="img" @click="showCont"/>
                                 <div class="bubble" v-if="show">
                                     <p class="p2">例如：您邀请了张三、李四、王五、则他们可以看到您的联系方式，否则，隐藏信息。</p>
                                 </div>
                            </div>
                            <div class="left_li">
                                <el-radio-group v-model="radio" @change="change">
                                 <el-radio :label="2">允许向推荐人展示联系方式</el-radio>
                                 </el-radio-group>
                                 <img src="../../assets/personal/interro.png" class="img" @click="showCont2"/>
                                 <div class="bubble2" v-if="show2">
                                     <p class="p2">例如：您的邀请人是张三，如果勾选，他将可以看到您的联系方式，否则，隐藏信息。</p>
                                 </div>
                            </div>
                            <div class="left_li">
                                <el-radio-group v-model="radio" @change="change">
                                 <el-radio :label="1">我是一个高冷的人，拒绝“抛头露面”</el-radio>
                                 </el-radio-group>
                                 <img src="../../assets/personal/interro.png" class="img" @click="showCont3"/>
                                 <div class="bubble3" v-if="show3">
                                     <p class="p2">如果勾选，您的信息将始终隐藏。</p>
                                 </div>
                            </div>
                        </div>
                        <div class="contactway_bg2_right">
                            <div class="from">
                                <div class="from_item">
                                    <div class="from_item_title">微信 / WECHAT</div>
                                    <el-input v-model="useridweixin" placeholder="请输入微信" maxlength="30" @change="getFullweixin"></el-input>
                                </div>
                                <div class="from_item">
                                    <div class="from_item_title">电话 / PHONE</div>
                                    <el-input v-model="useridtel" placeholder="请输入电话" maxlength="11" @change="getFulltel"></el-input>
                                </div>
                                <div class="from_item">
                                    <div class="from_item_title">QQ</div>
                                    <el-input v-model="useridqq" placeholder="请输入QQ" maxlength="30" @change="getFullqq"></el-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import store from "@/store";
import Bus from "@/utils/Bus";
export default {
    data(){
        return{
             radio: '',
             show:false,
             show2:false,
             show3:false,
             useridweixin: '',
             useridtel:'',
             useridqq:'',
        }
    },
    computed:{
        ...mapGetters(["info","isUserNeedLogin"]),
    },
    created () {
        this.information();
    },
    methods:{
        currentevent(){
            let params = {
                type:this.radio,
                content:'微信:'+this.useridweixin+';'+'tel:'+this.useridtel+';'+'qq:'+this.useridqq
            }
            this.$request.post(`/personal/updateContact`,params).then(data => {
                 this.$message({
                    message: '成功',
                    type: "success"
                });
            });
        },
        change(val){
            console.log(val);
        },
        getFullweixin(val) {
            this.currentevent();
          },
        getFulltel(val){
            this.currentevent();
        },
        getFullqq(val){
            this.currentevent();
        },
        showCont(){
            this.show = !this.show;
            this.show2 = false;
            this.show3 = false;
        },
        showCont2(){
            this.show2 = !this.show2;
            this.show = false;
            this.show3 = false;
        },
        showCont3(){
            this.show3 = !this.show3;
            this.show = false;
            this.show2 = false;
        },
        information(){
            this.$request.get(`/personal/getContact/${this.info.user.id}`).then(data => {
                this.useridweixin = data.weixin;
                this.useridtel = data.tel;
                this.useridqq = data.qq;
                this.radio = data.type;
            });
        }
    }
}
</script>
<style lang="scss" scoped>
@mixin full-width($support-type: margin, $min-width: null) {
  @if $support-type == "margin" {
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
  }
  @if $support-type == "position" {
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
  }
  @if $support-type == "translate" {
    width: 100vw;
    transform: translateX(calc((#{$min-width} - 100vw) / 2));
  }
}
.contactway{
    width: 100%;
    background-image: url("../../assets/personal/bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 100%;
    display: inline-block;
    @include full-width(margin, 960px);
    .contactway_mian{
        width: 1200px;
        margin: 0 auto;
        .breadcrumbitem{
            font-size: 0.8rem;
            margin-top: 1.8rem;
        }
        .contactway_setting{
            height: 34rem;
            background-image: url("../../assets/personal/share.png");
            background-repeat: no-repeat;
            background-size: 100% 60%;
            background-color: #fff;
            margin-top: 1.8rem;
            margin-bottom: 5rem;
            box-shadow:-1px 2px 15px 1px rgba(36,36,36,0.2);
            border-radius: 5px;
            overflow: hidden;
            .contactway_title{
                display: flex;
                justify-content: center;
                padding-top: 2rem;
                img{
                    width: 25px;
                    height: 30px;
                }
                .yujia{
                    font-size:16px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    color:rgba(44,44,44,1);
                    padding-top: 10px;
                    padding-left: 5px;
                }
            }
            .contactway_count{
                text-align: center;
                font-size:14px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(153,153,153,1);
                padding-top: 1rem;
                padding-bottom: 2rem;
            }
            .contactway_bg2{
                background-image: url("../../assets/personal/bg2.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
                width: 86%;
                height:22rem;
                margin: 0 auto;
                overflow: hidden;
                display: flex;
                justify-content: space-between;
                .contactway_bg2_left{
                    width: 35%;
                    line-height: 3rem;
                    margin-top: 7rem;
                    margin-left: 2rem;
                 .left_li{
                     margin-left: 20px;
                     position: relative;
                     .el-radio{
                        margin-right: 10px;
                        font-family:Microsoft YaHei;
                        font-weight:bold;
                        color: #2c2c2c;
                        font-size: 14px;
                     }
                     .img{
                        width: 18px;
                        height: 18px;
                        cursor: pointer;
                     }
                     .bubble{
                        background-image: url("../../assets/personal/bubble.png");
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        width: 340px;
                        position: absolute;
                        left: 80%;
                        top: -80%;
                        z-index: 99;
                        .p2{
                            font-size:14px;
                            font-family:Microsoft YaHei;
                            font-weight:bold;
                            color:rgba(255,255,255,1);
                            width: 85%;
                            margin: 0 auto;
                            line-height: 25px;
                            padding: 20px 5px;
                            margin-left: 38px;
                            text-align: center;
                        }
                     }
                     .bubble2{
                        background-image: url("../../assets/personal/bubble.png");
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        width: 340px;
                        position: absolute;
                        left: 78%;
                        top: -80%;
                        z-index: 99;
                        .p2{
                            font-size:14px;
                            font-family:Microsoft YaHei;
                            font-weight:bold;
                            color:rgba(255,255,255,1);
                            width: 85%;
                            margin: 0 auto;
                            line-height: 25px;
                            padding: 20px 5px;
                            margin-left: 38px;
                            text-align: center;
                        }
                     }
                     .bubble3{
                        background-image: url("../../assets/personal/bubble.png");
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        width: 340px;
                        position: absolute;
                        left: 88%;
                        top: -42%;
                        z-index: 99;
                        .p2{
                            font-size:14px;
                            font-family:Microsoft YaHei;
                            font-weight:bold;
                            color:rgba(255,255,255,1);
                            width: 85%;
                            margin: 0 auto;
                            line-height: 25px;
                            padding: 20px 5px;
                            margin-left: 38px;
                            text-align: center;
                        }
                     }
                 }   
                }
                .contactway_bg2_right{
                    width: 50%;
                    margin-top: 1rem;
                    .from{
                        padding: 20px;
                        width: 85%;
                        .from_item{
                            margin-bottom: 2rem;
                            .from_item_title{
                                font-size:14px;
                                font-family:Microsoft YaHei;
                                font-weight:400;
                                color: #2c2c2c;
                                margin-bottom: 12px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>