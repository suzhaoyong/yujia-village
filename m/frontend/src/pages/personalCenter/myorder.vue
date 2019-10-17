<template>
    <div>
        <van-nav-bar title="我的订单" left-arrow @click-left="onClickLeft">
        </van-nav-bar>
        <van-tabs v-model="activeName" color="#B3D465">
            <van-tab v-for="(item,index) in orderTitle" :key="index" :title="item" :name="item">
                <div v-if="activeName === '全部'">
                    <div class="all-order order" v-if="orderDataList.all.length > 0">
                        <div class="order-item" v-for="(item,index) in orderDataList.all" :key="index">
                            <div class="order-num">
                                <span>订单号：{{item.out_trade_no}}</span>
                                <!-- <van-icon name="delete" @click="deleted"/> -->
                            </div>
                            <div class="order-describe">
                                <div class="img" :style="{backgroundImage: 'url('+item.data[0].url+')'}"></div>
                                <div class="name">{{item.data[0].name}}</div>
                                <div class="price">￥{{item.totalPrice}}</div>
                                <div class="await">{{item.status}}</div>
                            </div>
                            <div class="order-again" @click="toOrderDetail(item.id)">{{item.status == '待付款'? '去支付':'再来一单'}}</div>
                        </div>
                    </div>
                    <div class="empty" v-else></div>
                </div>
                <div v-if="activeName === '待付款'">
                    <div class="obligation-order order" v-if="orderDataList.pay.length > 0">
                        <div class="order-item" v-for="(item,index) in orderDataList.pay" :key="index">
                            <div class="order-num">
                                <span>订单号：{{item.out_trade_no}}</span>
                                <!-- <van-icon name="delete" @click="deleted"/> -->
                            </div>
                            <div class="order-describe">
                                <div class="img" :style="{backgroundImage: 'url('+item.data[0].url+')'}"></div>
                                <div class="name">{{item.data[0].name}}</div>
                                <div class="price">￥{{item.totalPrice}}</div>
                                <div class="await">{{item.status}}</div>
                            </div>
                            <div class="order-again" @click="toOrderDetail(item.id)">去支付</div>
                        </div>
                    </div>
                    <div class="empty" v-else></div>
                </div>
                <div v-if="activeName === '待发货'">
                    <div class="await-order order" v-if="orderDataList.send.length > 0">
                        <div class="order-item" v-for="(item,index) in orderDataList.send" :key="index">
                            <div class="order-num">
                                <span>订单号：{{item.out_trade_no}}</span>
                                <!-- <van-icon name="delete" @click="deleted"/> -->
                            </div>
                            <div class="order-describe">
                                <div class="img" :style="{backgroundImage: 'url('+item.data[0].url+')'}"></div>
                                <div class="name">{{item.data[0].name}}</div>
                                <div class="price">￥{{item.totalPrice}}</div>
                                <div class="await">{{item.status}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="empty" v-else></div>
                </div>
                <div v-if="activeName === '待收货'">
                    <div class="shipped-order order" v-if="orderDataList.receive.length > 0">
                        <div class="order-item" v-for="(item,index) in orderDataList.receive" :key="index">
                            <div class="order-num">
                                <span>订单号：{{item.out_trade_no}}</span>
                                <!-- <van-icon name="delete" @click="deleted"/> -->
                            </div>
                            <div class="order-describe">
                                <div class="img" :style="{backgroundImage: 'url('+item.data[0].url+')'}"></div>
                                <div class="name">{{item.data[0].name}}</div>
                                <div class="price">￥{{item.totalPrice}}</div>
                                <div class="await">{{item.status}}</div>
                            </div>
                            <div class="order-again">确认收货</div>
                        </div>
                    </div>
                    <div class="empty" v-else></div>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeName: '全部',
            orderTitle: [
                '全部','待付款','待发货','待收货'
            ],
            // 订单数据
            orderDataList: {},

        }
    },
    created() {
        this.getUserGoodsOrder();
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        // 删除功能，暂时不做
        // deleted() {
        //     this.$dialog.confirm({
        //         message: '是否删除当前订单？',
        //         confirmButtonText: '是',
        //         cancelButtonText: '否',
        //         closeOnClickOverlay: true,
        //         closeOnPopstate: true,
        //         beforeClose: (action, done) => {
        //             if(action === 'confirm') {
        //                 console.log('confirm');
        //                 done(); 
        //             } else {
        //                 done(); 
        //             }
        //         }
        //     });
        // },
        getUserGoodsOrder() {
            this.$request.get('/goodOrder/userOrder').then(data => {
                console.log(data);
                const { all, pay, receive, send, success } = data;
                const orderList = {
                    all,
                    pay,
                    receive,
                    send
                } 
                this.orderDataList = orderList;
            })
        },
        toOrderDetail(id) {
            this.$router.push("/fillorder/?" + id);
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
.van-tabs {
    /deep/ .van-tabs__wrap {
        position: fixed;
        top: 46px;
        width: 100%;
        z-index: 99;
    }
}
.order {
    padding-top: 16px;
    margin-top: 90px;
}
.empty {
    width: 100%;
    height: 193px;
    margin-top: 180px;
    // background: url('../../assets/img/Nothing_Order.png');
    background-size: cover;
}
.order-item {
    position: relative;
    width: 343px;
    height: 156px;
    margin: 0 auto;
    margin-bottom: 16px;
    padding: 12px 12px 12px 21px;
    border-radius: 5px;
    background-color: #fff;
    .order-num {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        .van-icon {
            font-size: 18px;
        }
    }
    .order-describe {
        position: relative;
        top: 20px;
        font-size: 12px;
        .img {
            width: 72px;
            height: 70px;
            background-color: #eee;
            background-size: cover;
            background-position: center;
        }
        .name {
            position: absolute;
            top: 0;
            left: 88px;
            width: 165px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2; 
        }
        .price {
            position: absolute;
            bottom: 0;
            left: 88px;
        }
        .await {
            position: absolute;
            top: -36px;
            right: 10px;
            color: #90B240;
            font-size: 10px;
        }
    }
    .order-again {
        position: absolute;
        right: 12px;
        bottom: 12px;
        width: 67px;
        height: 22px;
        line-height: 22px;
        border-radius: 10px;
        background-color: #B3D465;
        text-align: center;
        font-size: 12px;
        color: #fff;
    }
    
}
</style>