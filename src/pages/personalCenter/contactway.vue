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
                                <el-checkbox-group  v-model="checked" @change="change" :disabled="this.checked==1">
                                    <el-checkbox v-for="i in cities" :label="i" :key="i">允许向我邀请的好友展示联系方式</el-checkbox>
                                </el-checkbox-group>
                                 <img src="../../assets/personal/interro.png" class="img" @click="showCont"/>
                                 <div class="bubble" v-show="show">
                                     <p class="p2">例如：您邀请了张三、李四、王五、则他们可以看到您的联系方式，否则，隐藏信息。</p>
                                 </div>
                            </div>
                            <div class="left_li">
                                  <el-checkbox-group  v-model="checked" @change="change" :disabled="this.checked==1">
                                    <el-checkbox v-for="i in cities2" :label="i" :key="i">允许向推荐人展示联系方式</el-checkbox>
                                </el-checkbox-group>
                                 <img src="../../assets/personal/interro.png" class="img" @click="showCont2"/>
                                 <div class="bubble2" v-show="show2">
                                     <p class="p2">例如：您的邀请人是张三，如果勾选，他将可以看到您的联系方式，否则，隐藏信息。</p>
                                 </div>
                            </div>
                            <div class="left_li">
                                 <el-checkbox-group  v-model="checked" @change="change" :disabled="this.disabled">
                                    <el-checkbox v-for="i in cities3" :label="i" :key="i">我是一个高冷的人，拒绝“抛头露面”</el-checkbox>
                                </el-checkbox-group>
                                 <img src="../../assets/personal/interro.png" class="img" @click="showCont3"/>
                                 <div class="bubble3" v-show="show3">
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
                                    <el-input v-model.number="useridtel" placeholder="请输入电话" maxlength="11" @change="getFulltel" onKeyUp="value=value.replace(/\D/g,'')" onafterpaste="value=value.replace(/\D/g,'')" ></el-input>
                                </div>
                                <div class="from_item">
                                    <div class="from_item_title">QQ</div>
                                    <el-input v-model.number="useridqq" placeholder="请输入QQ" maxlength="11" @change="getFullqq" onKeyUp="value=value.replace(/\D/g,'')" onafterpaste="value=value.replace(/\D/g,'')" ></el-input>
                                </div>
                                <div class="bottom-botton">
                                    <div class="btn-wrap">
                                        <span class="view" @click="sureChange">确认修改</span>
                                        <!-- <span class="back" @click="back">返回首页</span> -->
                                    </div>
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
             checked: [],
             show:false,
             show2:false,
             show3:false,
             cities:[3],
             cities2:[2],
             cities3:[1],
             disabled:false,
             useridweixin: '',
             useridtel:'',
             useridqq:'',
        }
    },
    computed:{
        ...mapGetters(["info","isUserNeedLogin"]),
    },
    created () {
    },
    mounted() {
        if(this.isUserNeedLogin) {
            this.getPersonal()
                .then(() => {
                    this.information();
                })
        } else {
            this.information();
        }
    },
    methods:{
        /** 个人信息 */
        getPersonal() {
            return this.$request("/personal/home").then(data => {
                store.dispatch("INFO", data);
            });
        },
        sureChange() {
            if(this.checked.length === 0) {
                this.$message.warning('请选择展示方式');
                return;
            }
            this.currentevent();
        },
        currentevent(){
            let params = {
                type:this.checked,
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
            this.disabled=false;
            for(var i=0;i<this.checked.length;i++){
               if(this.checked[i]==3 || this.checked[i]==2){
                   this.disabled=true;
               }
            }
            // this.currentevent();
        },
        getFullweixin(val) {
            // this.currentevent();
          },
        getFulltel(val){
            // this.currentevent();
        },
        getFullqq(val){
            // this.currentevent();
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
                this.checked = data.type;
                this.disabled=true;
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
    height: 100vh;
    background-size: cover;
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
            // height: 34rem;
            padding-bottom: 2rem;
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
                // height:22rem;
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
                     .el-checkbox-group{
                        display: inline-block;
                        .el-checkbox{
                            margin-right: 10px;
                            font-family:Microsoft YaHei;
                            font-weight:bold;
                            color: #2c2c2c;
                            font-size: 14px;
                        }
                     }
                     .img{
                        width: 18px;
                        height: 18px;
                        cursor: pointer;
                        &:hover + .bubble, &:hover + .bubble2, &:hover + .bubble3 {
                                display: block!important;
                            }
                        & + .bubble, & + .bubble2, & + .bubble3 {
                            display: none;
                        }
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
                        .bottom-botton{
                            .btn-wrap{
                                padding-top: 1.25rem;
                                padding-bottom: 0.9rem;
                                // border-top: 1px solid #eee;
                                .view{
                                width: 7rem;
                                height: 3rem;
                                line-height: 3rem;
                                color: #fff;
                                text-align: center;
                                background: #68B75B;
                                display: inline-block;
                                cursor: pointer;
                                border-radius: 0.2rem;
                                font-size: 0.9rem;
                                }
                                .back{
                                border-radius: 0.2rem;
                                font-size: 0.9rem;
                                cursor: pointer;
                                width: 7rem;
                                height: 3rem;
                                margin-left: 2rem;
                                line-height: 3rem;
                                color: #68B75B;
                                text-align: center;
                                background: #fff;
                                border: 1px solid #eee;
                                display: inline-block;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>