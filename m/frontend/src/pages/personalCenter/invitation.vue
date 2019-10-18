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
        <div class="overlay" v-if="show" @click="show = false">
            <van-loading v-if="isShow" type="spinner" class="loading" color="#fff" vertical>加载中...</van-loading>
            <div  class="invite-pic">
                <img :src="pic_img" alt/>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            show: false,
            isShow: true,
            // 获取 分享码，传递的参数
            inviteInfo: {
                id: '',
                identity: 'person',
                userId: ''
            },
            pic_img: ''
        }
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        immediatelyInvitation() {
            this.show = true;
            const userId = JSON.parse(window.sessionStorage.getItem('user')).id;
            this.inviteInfo.userId = userId;   
            this.inviteInfo.id = userId;
            this.$request.post('/show/share/photo',this.inviteInfo).then(data => {
                // console.log(data);
                this.pic_img = data;
            })
            if(this.pic_img !== '') {
                this.isShow = false;
            }
        },
        // 获取积分信息
        getIntegral() {
            this.$request.get('/personal/fractioRecord').then(data => {
                // console.log(data);
                data.in.forEach(item => {
                    this.integralTotal += item.num;
                });
            })
        },
        // 获取 我成功邀请的用户信息
        myShare() {
            this.$request.get('/personal/myShare').then(data => {
                // console.log(data);
                this.userInfo = this.dealingData( data.data, this.userInfo)
            })
        },
        // 获取 我邀请的用户，再次邀请的用户
        getMyShareBelow(id) {
            if(id !== '') {
                this.$request.post('/personal/myShareBelow/'+ id ).then(data => {
                    console.log(data);
                    this.info = this.dealingData( data.data, this.info)
                    console.log(this.info);
                })
            }
        },
        // 处理 获取的 电话号码 和时间 数据
        dealingData(data, userInfo) {
            const info = data;
            info.forEach(item  => {
                item.tel = item.tel.substr(0,3) + '****' + item.tel.substr(7,4);
                item.created_at = item.created_at.split(' ');
            })
            // console.log(info);
            return userInfo = info;
        } 
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
.overlay {
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    .loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        /deep/ .van-loading__text {
            color: #fff;
        }
    }
}
.invite-pic {
    position: relative;
    display: block;
    width: 100%;
    height: 500px;
    margin-top: 60px;
    border-radius: 10px;
    overflow: hidden;
}
</style>