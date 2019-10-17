<template>
    <div class="personal">
        <div class="banner-box">
            <div class="head-portraits" @click="goInfoEditor" :style="{backgroundImage:'url('+personalData.icon+')'}"></div>
            <div class="username">
                <span class="uname">{{personalData.name}} | </span><span>{{personalData.identity_auth}}</span>
            </div>
            <div class="bell" @click="message">
                <img src="../assets/teacherclub/bell.png" class="bell_img"/>
                <div class="bell_circle" v-if="Message.count != 0">{{Message.count}}</div>
                <div class="bell_circles" v-else></div>
            </div>
            <div class="my-box">
                <router-link to="/myorder">我的订单</router-link>
                <router-link to="/shoppingbag">购物袋</router-link>
                <router-link to="/address">收货地址</router-link>
            </div>
        </div>
        
        <div class="asset">
            <div class="asset-item1">
                <div class="img"></div>
                <span class="my-asset">我的资产</span>
            </div>
            <div class="asset-item">
                <div>{{personalData.money}}</div>
                <div>金币</div>
            </div>
            <div class="asset-item">
                <div>{{personalData.cashCount}}</div>
                <div><router-link to="/cashvoucher">现金券</router-link></div>
            </div>
            <div class="asset-item">
                <div>{{personalData.couponCount}}</div>
                <div><router-link to="/coupon">优惠券</router-link></div>
            </div>
            <div class="asset-item">
                <div>{{personalData.fraction}}</div>
                <div>积分</div>
            </div>
        </div>
        <div class="cell">
            <van-cell is-link to="/collect">
                <template slot="title">
                    <img class="icon" src="../assets/img/collection.png" alt="">
                    <span class="custom-title">我的收藏</span>
                </template>
            </van-cell>
            <van-cell is-link to="/thumbteacher">
                <template slot="title">
                    <img class="icon" src="../assets/img/praise.png" alt="">
                    <span class="custom-title">我点赞的名师</span>
                </template>
            </van-cell>
            <!-- <van-cell is-link to="/buycourse">
                <template slot="title">
                    <img class="icon" src="../assets/img/courses.png" alt="">
                    <span class="custom-title">我购买的课程</span>
                </template>
            </van-cell> -->
            <van-cell is-link class="rz-center" to="/authenticationcenter">
                <template slot="title">
                    <img class="icon" src="../assets/img/certification.png" alt="">
                    <span class="custom-title">认证中心</span>
                </template>
            </van-cell>
            <van-cell is-link @click="showPopup">
                <template slot="title">
                    <img class="icon" src="../assets/img/customer-service.png" alt="">
                    <span class="custom-title">客服中心</span>
                </template>
            </van-cell>
            <van-popup class="call-center" v-model="show">
                <div class="hint">建设中，敬请期待...</div>
                <div class="phone-img"></div>
                <div class="hot-line">客服电话　400-100-7191</div>
            </van-popup>
            <van-cell is-link class="" to="/changephone">
                <template slot="title">
                    <img class="icon" src="../assets/img/mobile-phone.png" alt="">
                    <span class="custom-title">更改绑定手机</span>
                </template>
            </van-cell>
            <van-cell is-link class="invitation" to="/invitation">
                <template slot="title">
                    <img class="icon" src="../assets/img/yaoqing.png" alt="">
                    <span class="custom-title">我的邀请</span>
                </template>
            </van-cell>

        </div>
        <div class="logout" @click="logout">退出登录</div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import store from "@/store";
export default {
    data() {
        return {
            show: false,
            // 个人信息数据
            Message:{},
            personalData: {},
        }
    },
    created() {
        // this.getPersonalData()
    },
    mounted() {
        // this.setPersonalData()
        this.getPersonalData()
        this.messagecenter();
    },
    computed: {
      ...mapGetters(['info', 'isUserNeedLogin'])
    },
    methods: {
        setPersonalData() {
          const user_data = JSON.parse(sessionStorage.getItem('user data'))
          store.dispatch("INFO", user_data);
          // if(this.isUserNeedLogin) return;
          const { fraction, icon, name, identity_auth, reason } = this.info.user;
                window.sessionStorage.setItem('user',JSON.stringify(this.info.user));
                const index = this.info.user.money.indexOf(".");
                const money = this.info.user.money.substring(index,0);
                // 获取 金币和积分
                const personal = {
                    money,
                    fraction,
                    icon,
                    name,
                    identity_auth,
                    reason
                }
                this.personalData = personal;
        },
        getPersonalData() {
            const token = JSON.parse(window.sessionStorage.getItem('access')) 
            this.$request.get('/personal/home').then(data => {
                store.dispatch("INFO", data);
                // console.log(data);
                const { fraction, icon, name, identity_auth, reason,cashCount,couponCount } = data.user;
                window.sessionStorage.setItem('user',JSON.stringify(data.user));
                const index = data.user.money.indexOf(".");
                const money = data.user.money.substring(index,0);
                // 获取 金币和积分
                const personal = {
                    money,
                    fraction,
                    icon,
                    name,
                    identity_auth,
                    reason,
                    cashCount,
                    couponCount
                }
                this.personalData = personal;
            })
        },
        // 
        goInfoEditor() {
            this.$router.push('/personaldata')
        },
        message(){
            this.$router.push('/messagecenter')
        },
        messagecenter(){
            this.$request.get(`/personal/message/mobile/first`).then(res => {
                this.Message = res;
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
        showPopup() {
            this.show = true;
        },
        logout() {
            // console.log('退出');
            store.dispatch("INFO", { user: {} });
            window.sessionStorage.removeItem('access');
            // 退出回到首页
            window.open(`${window.location.origin}`, "_self");
        },
    }
}
</script>
<style lang="scss" scoped>
.personal {
    margin-bottom: 50px;
    overflow: hidden;
    overflow-y: auto;
}
.banner-box {
    position: relative;
    height: 228px;
    padding-top: 48px;
    margin-bottom: 29px;
    background: url('../assets/img/head-banner.png');
    background-size: cover;
    text-align: center;
    .head-portraits {
        width: 76px;
        height: 76px;
        margin: 0 auto;
        border-radius: 38px;
        background-size: cover;
        background-position: center;
    }
    .username {
        margin-top: 15px;
        font-size: 11px;
        color: #fff;
        .uname {
            font-size: 14px;
        }
    }
    .bell{
        position: absolute;
        right: 25px;
        top: 15px;
        .bell_img{
            width: 17px;
            height: 21px;
        }
        .bell_circle{
            width: 15px;
            height: 15px;
            background-color: #E60012;
            font-size: 10px;
            color: #fff;
            border-radius: 50%;
            text-align: center;
            position: absolute;
            top: 4px;
            right: -9px;
        }
        .bell_circles{
            width: 15px;
            height: 15px;
            // background-color: #E60012;
            font-size: 10px;
            color: #fff;
            border-radius: 50%;
            text-align: center;
            position: absolute;
            top: 4px;
            right: -9px;
        }
    }
}
.my-box {
    position: absolute;
    left: 16px;
    bottom: -25px;
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
    margin-bottom: 4px;
    width: 343px;
    height: 64px;
    line-height: 64px;
    background-color: #fff;
    font-size: 14px;
}
.asset {
    display: flex;
    justify-content: space-between;
    padding: 10px 16px;
    margin-bottom: 3px;
    height: 70px;
    background-color: #fff;
    font-size: 11px;
    .asset-item1 {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .img {
            position: absolute;
            width: 17px;
            height: 15px;
            background: url('../assets/img/asset.png') no-repeat;
            background-size: cover;
        }
        .my-asset {
            font-size: 14px;
            margin-left: 25px;
        }
    }
    .asset-item {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 50px;
        div {
            text-align: center;
        }
    }
    
}
.cell {
    margin-bottom: 20px;
    .van-cell__title {
        display: flex;
        .icon {
            width: 14px;
            height: 16px;
            margin-top: 4px;
            margin-right: 9px;
        }
    }
    .rz-center {
        margin-top: 4px;
    }
    .call-center {
        width: 285px;
        height: 132px;
        background: url('../assets/img/yuan.png') no-repeat;
        background-size: cover;
        font-size: 14px;
        text-align: center;
        .hint {
            margin-top: 22px;
        }
        .phone-img {
            position: absolute;
            top: 66px;
            left: 50px;
            width: 23px;
            height: 27px;
            background: url('../assets/img/phone.png') no-repeat;
            background-size: cover;
        }
        .hot-line {
            margin-top: 28px;
            margin-left: 32px;
        }
    }
    .invitation {
        margin-top: 4px;
    }
}
.logout {
    width: 100%;
    height: 44px;
    line-height: 44px;
    margin-bottom: 20px;
    background-color: #fff;
    text-align: center;
    font-size: 14px;
}

</style>