<template>
    <div>
        <van-nav-bar title="我的邀请" left-arrow @click-left="onClickLeft">
        </van-nav-bar>
        <div class="integral">
            <div>累计获得积分</div>
            <div class="num">{{integralTotal}}</div>
            <ul class="notice">
                <li>注：</li>
                <li>1.积分可抵扣培训课程</li>
                <li>2.邀请好友获得的积分在1小时内到账</li>
            </ul>
        </div>
        <div class="title">成功邀请</div>
        <div class="success-invitation">
            <van-list v-model="loading" :offset="30" :finished="finished" finished-text="没有更多了" @load="onLoad">
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
                        <div :class="info.length > 5 ? 'second-box' : '' ">
                            <van-list v-model="loading" :offset="30" :finished="finishedSecond" @load="onLoadSecond">
                                <div class="invitation-people second" v-for="(item,index) in info" :key="index">
                                    <div class="img" :style="{backgroundImage: 'url('+ item.icon +')'}"></div>
                                    <div class="nickname">{{item.name}}</div>
                                    <div class="time">{{item.created_at[0]}}</div>
                                </div>
                            </van-list>
                        </div>
                    </van-collapse-item>
                </van-collapse>
            </van-list>
        </div>
        <div class="invite-bottom">
            <div class="invite" @click="immediatelyInvitation">立即邀请</div>
        </div>
        <div class="overlay" v-if="show" @click="show = false">
            <van-loading v-if="isShow" type="spinner" class="loading" color="#fff" vertical>加载中...</van-loading>
            <div  class="invite-pic" @click.stop="">
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
            info: [],
            loading: false,
            finished: false,
            finishedSecond: false,
            page: 1,
            page2: 1,
            total: '',
            totalSecond: '',
            id: ''
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
        onLoad() {
            // 异步更新数据
            setTimeout(() => {
                this.page++;
                this.loading = false;
                // 数据全部加载完成
                if (this.userInfo.length >= this.total) {
                    this.finished = true;
                    return
                }
                this.myShare(this.page);
                // 加载状态结束
            }, 500);
        }, 
        onLoadSecond() {
            // 异步更新数据
            setTimeout(() => {
                this.page2++;
                this.loading = false;
                // 数据全部加载完成
                if (this.info.length >= this.totalSecond) {
                    this.finishedSecond = true;
                    return
                }
                this.getMyShareBelow(this.id, this.page2);
                // 加载状态结束
            }, 500);
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
        myShare(page = 1) {
            this.$request.get('/personal/myShare?page=' + page).then(data => {
                this.userInfo = this.dealingData( data.data, this.userInfo);
                this.total = data.total;
            })
        },
        // 获取 我邀请的用户，再次邀请的用户
        getMyShareBelow(id, page=1) {
            if(this.id !== id) {
                this.info =[];
                this.finishedSecond = false;
                this.page2 = 1;
            }
            this.id = id;
            if(id !== '') {
                this.$request.post('/personal/myShareBelow/'+id+'?page='+page ).then(data => {
                    console.log(data);
                    this.info = this.dealingData( data.data, this.info);
                    this.totalSecond = data.total;
                })
            } else {
                this.info = [];
                this.finishedSecond = false;
                this.page2 = 1;
            }
        },
        // 处理 获取的 电话号码 和时间 数据
        dealingData(data, userInfo) {
            const info = data;
            info.forEach(item  => {
                item.tel = item.tel.substr(0,3) + '****' + item.tel.substr(7,4);
                item.created_at = item.created_at.split(' ');
                userInfo.push(item);
            })
            return userInfo;
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
    position: fixed;
    top: 46px;
    z-index: 99;
    width: 100%;
    height: 144px;
    padding: 16px;
    border-bottom: 4px solid #eee;
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
        text-align: left;
    }
}
.title {
    position: fixed;
    top: 190px;
    z-index: 99;
    width: 100%;
    padding: 24px 16px 10px 16px;
    background-color: #fff;
    font-size: 14px;
}
.success-invitation {
    position: relative;
    z-index: 0;
    margin-top: 243px;
    background-color: #fff;
    // font-size: 14px;
    margin-bottom: 74px;
    overflow: hidden;
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
            width: 72px;
            margin-left: 10px;
            height: 50px;
            .nickname {
                font-size: 14px;
                font-weight: 600;
                color: #2c2c2c;
                overflow: hidden;
                white-space: nowrap; 
                text-overflow:ellipsis;
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
    .second-box {
        height: 300px;
        overflow: scroll;
    }
    .second {
        height: 60px;
        padding: 5px 0;
        margin: 0 32px;
        border-top: 0.5px solid #eee;
        line-height: 50px;
        .nickname {
            width: 80px;
            margin-left: 40px;
            overflow: hidden;
            white-space: nowrap; 
            text-overflow:ellipsis;
        }
        .time {
            margin-left: 60px;
        }
    }
}
.invite-bottom {
    position: fixed;
    bottom: 0;
    z-index: 1;
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