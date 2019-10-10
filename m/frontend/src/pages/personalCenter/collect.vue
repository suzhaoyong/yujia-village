<template>
    <div class="commodity-content">
        <van-nav-bar title="我的收藏" left-arrow @click-left="onClickLeft">
        </van-nav-bar>
        <van-tabs v-model="activeName" color="#7BBB62" title-active-color="#7BBB62" animated :border="false">
            <van-tab title="培训课程" name="course">
                <div class="course-content" v-if="collectCourse.length > 0">
                    <div class="course" v-for="(item,index) in collectCourse" :key="index">
                        <div class="img" :style="{backgroundImage:'url('+ item.teacher_img +')'}"></div>
                        <div class="info">
                            <div class="title">{{item.theme}}</div>
                            <van-rate v-model="value" :size="5" color="#7BBB62" void-color="#7BBB62" readonly />
                            <div class="price">￥{{item.price}}</div>
                            <div class="address">成都市锦江区泰和国际发顺丰八佰伴</div>
                            <div class="want-study">
                                <van-icon class="item" name="eye-o" />
                                <div class="item">550</div>
                                <img class="hand item" src="../../assets/img/hand.png" alt="">
                                <div class="item">220</div>
                            </div>
                        </div>
                        <div class="advisory">咨询</div>
                    </div>
                </div>
                <div class="empty" v-else></div>
            </van-tab>
            <van-tab title="商品" name="commodity">
                <div class="commodity-box" v-if="collectCourse.length > 0">
                    <div class="commodity-item" v-for="(item,index) in collectGoods" :key="index">
                        <div class="img" :style="{backgroundImage:'url('+ item.url +')'}"></div>
                        <div class="name">{{item.describe}}</div>
                        <div class="price">￥{{item.sell_price}}</div>
                    </div>
                </div>
                <div class="empty" v-else></div>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeName: 'course',
            // 难度指数
            value: 2,
            // 收藏的课程数据
            collectCourse: '',
            // 收藏的商品数据
            collectGoods: ''
        }
    },
    created() {
        this.getCollectGoods();
        this.getCollectCourse();
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        // 获取收藏商品的数据
        getCollectGoods() {
            this.$request.get('/userCollect/create').then(data => {
                console.log(data);
                this.collectGoods = data.data;
            })
        },
        // 获取收藏(我想学)的课程数据
        getCollectCourse() {
            this.$request.get('/personal/myFollowTrain').then(data => {
                console.log(data);
                this.collectCourse = data.data;
            })
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
    background-color: #eee;
    .van-icon {
        font-size: 20px;
        color: #2c2c2c;
    }
}
.van-tabs {
    margin-top: 46px;
    /deep/ .van-tabs__line {
        width: 60px !important;
        bottom: 20px;
    }
    /deep/ .van-tabs__wrap {
        position: fixed;
        width: 100%;
        z-index: 99;
    }
    /deep/ .van-tabs__track {
        margin-top: 44px;
    }   
}
.course-content {
    padding-top: 2px;
}
.empty {
    width: 100%;
    height: 193px;
    margin-top: 90px;
    background: url('../../assets/img/Nothing_Order.png');
    background-size: cover;
}
.course {
    position: relative;
    display: flex;
    height: 138px;
    padding: 15px 16px;
    margin-bottom: 7px;
    background-color: #fff;
    box-shadow: 0px 3px 3px #c8c8c8;
    .img {
        width: 108px;
        height: 108px;
        background-size: cover;
        background-position: center;
    }
    .info {
        position: relative;
        margin-left: 20px;
        font-size: 10px;
        .title {
            width: 160px;
            font-size: 14px;
            font-weight: 600;
            overflow: hidden;
            white-space: nowrap; 
            text-overflow:ellipsis;
        }
        .price {
            padding-top: 5px;
            padding-bottom: 8px;
        }
        .address {
            width: 160px;
            overflow: hidden;
            white-space: nowrap; 
            text-overflow:ellipsis;
        }
        .want-study {
            display: flex;
            position: absolute;
            bottom: 0;
            width: 212px;
            height: 24px;
            border-top: 0.5px solid #E5E5E5;
            .item {
                height: 24px;
                line-height: 32px;
                margin-right: 3px; 
            }
            .van-icon {
                font-size: 18px;
            }
            .hand {
                width: 8px;
                height: 14px;
                margin-left: 9px;
                margin-top: 8px;
            }

        }
    }
    .advisory {
        position: absolute;
        top: 51px;
        right: 16px;
        width: 51px;
        height: 20px;
        background-color: #7BBB62;
        border-radius: 10px;
        line-height: 20px;
        text-align: center;
        color: #fff;
        font-size: 10px;
    }
}
.commodity-box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 16px;
    padding-top: 8px;
    .commodity-item {
        margin-bottom: 22px; 
        border-radius: 5px;
        box-shadow: 1px 3px 3px #c8c8c8;
        background-color: #fff;
        .img {
            width: 166px;
            height: 197px;
            background-size: cover;
            background-position: center;
        }
        .name {
            width: 130px;
            padding: 12px 0 8px 10px;
            font-size: 12px;
            overflow: hidden;
            white-space: nowrap; 
            text-overflow:ellipsis;
        }
        .price {
            padding-left: 10px;
            margin-bottom: 8px;
            color: #D30606;
            font-size: 10px;
        }
    }
}

</style>