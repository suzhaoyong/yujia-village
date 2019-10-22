<template>
    <div>
        <van-nav-bar title="我的邀请" left-arrow @click-left="onClickLeft">
        </van-nav-bar>
        <div class="integral">
            <div>累计获得积分</div>
            <div class="num">{{integralTotal}}</div>
            <div class="notice">注：积分可抵扣培训课程</div>
        </div>
        <div class="success-invitation">
            <div class="title">成功邀请</div>
            <van-collapse v-model="activeName" accordion @change="getMyShareBelow">
                <van-collapse-item :border="false" :name="item.id" value="他的邀请" 
                v-for="(item,index) in userInfo" :key="index">
                    <div class="invitation-people" slot="title">
                        <div class="img" :style="{backgroundImage: 'url('+ item.icon +')'}"></div>
                        <div class="user"> 
                            <div class="nickname">{{item.name}}</div>
                            <div class="tel">{{item.tel}}</div>
                        </div>
                        <div class="time">{{item.created_at[0]}}</div>
                    </div>
                    <div class="invitation-people second" v-for="(item,index) in info" :key="index">
                        <div class="img" :style="{backgroundImage: 'url('+ item.icon +')'}"></div>
                        <div class="nickname">{{item.name}}</div>
                        <div class="time">{{item.created_at[0]}}</div>
                    </div>
                </van-collapse-item>
            </van-collapse>
        </div>
        <div class="invite-bottom">
            <div class="invite" @click="immediatelyInvitation">立即邀请</div>
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
            activeName: '',
            integralTotal: 0,
            show: false,
            isShow: true,
            // 获取 分享码，传递的参数
            inviteInfo: {
                id: '',
                identity: 'person',
                userId: ''
            },
            pic_img: '',
            // 我邀请的用户信息
            userInfo: [],
            // 我邀请的用户,再次邀请的用户信息
            info: []
        }
    },
    created() {
        this.getIntegral();
        this.myShare();
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
    padding-top: 24px;
    background-color: #fff;
    font-size: 14px;
    margin-bottom: 74px;
    overflow: hidden;
    .title {
        padding: 0 16px;
        padding-bottom: 10px;
    }
    .invitation-people {
        display: flex;
        height: 50px;
        font-size: 10px;
        color: #999;
        .img {
            width: 50px;
            height: 50px;
            border-radius: 25px;
            background-size: cover;
            background-position: center;
        }
        .user {
            margin-left: 10px;
            height: 50px;
            .nickname {
                font-size: 14px;
                font-weight: 600;
                color: #2c2c2c;
            }
        }
        .time {
            margin-left: 40px;
            line-height: 50px;
        }
    }
    /deep/ .van-cell__value {
        flex: none;
        line-height: 50px;
        font-size: 10px;
    }
    /deep/ .van-icon {
        margin-top: 13px;
    }
    /deep/ .van-collapse-item__content {
        padding: 0;
    }
    .second {
        height: 60px;
        padding: 5px 0;
        margin: 0 32px;
        border-top: 0.5px solid #eee;
        line-height: 50px;
        .nickname {
            margin-left: 40px;
        }
        .time {
            margin-left: 60px;
        }
    }
}
.invite-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 76px;
    background-color: #eee;
}
.invite {
    position: absolute;
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