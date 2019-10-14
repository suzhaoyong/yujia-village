<template>
    <div class="personal">
        <div class="banner-box">
            <div class="head-portraits" @click="goInfoEditor" :style="{backgroundImage:'url('+personalData.icon+')'}"></div>
            <div class="username">
                <span class="uname">{{personalData.name}} | </span><span>{{personalData.identity_auth}}</span>
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
                <div>1</div>
                <div>现金券</div>
            </div>
            <div class="asset-item">
                <div>1</div>
                <div>优惠券</div>
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
            <van-cell is-link to="/buycourse">
                <template slot="title">
                    <img class="icon" src="../assets/img/courses.png" alt="">
                    <span class="custom-title">我购买的课程</span>
                </template>
            </van-cell>
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
            <van-cell is-link class="invitation" to="/invitation">
                <template slot="title">
                    <img class="icon" src="../assets/img/yaoqing.png" alt="">
                    <span class="custom-title">我的邀请</span>
                </template>
            </van-cell>
        </div>
        <van-button class="logout" type="default" @click="logout">退出登录</van-button>
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
            personalData: {},
        }
    },
    created() {
        this.getPersonalData()
    },
    computed: {
      ...mapGetters(['info'])
    },
    methods: {
        getPersonalData() {
            const token = JSON.parse(window.sessionStorage.getItem('access')) 
            this.$request.get('/personal/home').then(data => {
                store.dispatch("INFO", data);
                // console.log(data);
                const { fraction, icon, name, identity_auth, reason } = data.user;
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
                    reason
                }
                this.personalData = personal;
            })
        },
        // 
        goInfoEditor() {
            this.$router.push('/personaldata')
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
        }
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
        margin-top: 8px;
    }
}
.logout {
    width: 343px;
    margin-left: 16px;
    margin-bottom: 20px;
}

</style>