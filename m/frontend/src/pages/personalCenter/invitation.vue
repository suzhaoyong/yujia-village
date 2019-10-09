<template>
    <div>
        <van-nav-bar title="我的邀请" left-arrow @click-left="onClickLeft">
        </van-nav-bar>
        <div class="integral">
            <div>累计获得积分</div>
            <div class="num">200</div>
            <div class="notice">注：积分可抵扣现金</div>
        </div>
        <div class="success-invitation">
            <div class="title">成功邀请</div>
            <div class="invitation-people">
                <div class="img"></div>
                <div class="nickname">艾克</div>
                <div class="tel">15623548796</div>
                <div class="time">2019.09.01</div>
            </div>
        </div>
        <div class="invite">立即邀请</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
    }
}
</script>
<style lang="scss" scoped>
.van-nav-bar {
    position: fixed;
    top: 0;
    width: 100%;
    font-size: 16px;
    .van-icon {
        font-size: 20px;
        color: #2c2c2c;
    }
}
.integral {
    position: relative;
    height: 140px;
    padding: 16px;
    margin-top: 46px;
    margin-bottom: 4px;
    background-color: #fff;
    font-size: 14px;
    text-align: center;
    .num {
        margin-top: 12px;
    }
    .notice {
        position: absolute;
        left: 16px;
        bottom: 16px;
        font-size: 11px;
        color: #999;
    }
}
.success-invitation {
    padding: 0 16px;
    padding-top: 24px;
    background-color: #fff;
    font-size: 14px;
    overflow: hidden;
    .title {
        padding-bottom: 10px;
    }
    .invitation-people {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        height: 49px;
        line-height: 49px;
        font-size: 10px;
        color: #999;
        .img {
            width: 49px;
            height: 49px;
            background-color: #eee;
        }
    }
}
.invite {
    position: fixed;
    left: 16px;
    bottom: 16px;
    width: 342px;
    height: 44px;
    line-height: 44px;
    border-radius: 22px;
    background-color: #8CA177;
    text-align: center;
    font-size: 14px;
    color: #fff;
}
</style>