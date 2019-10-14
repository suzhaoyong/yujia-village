<template>
    <div>
        <van-nav-bar title="购物袋" left-arrow :right-text="rightText" @click-left="onClickLeft" @click-right="onClickRight">
        </van-nav-bar>
        <div class="content">
            <div class="commodity" v-for="(item,index) in shoppingBagList" :key="index" @click="getGoodsId(item.id)">
                <van-checkbox v-model="item.check" checked-color="#B3D465" @change="stateSwitch" 
                label-disabled>
                </van-checkbox>
                <div class="order-describe">
                    <div class="img" :style="{backgroundImage: 'url('+item.pic+')'}"></div>
                    <div class="name">{{item.describe}}</div>
                    <div class="style">
                        <span>{{item.color}}</span><span>{{item.size}}</span>
                    </div>
                    <div class="price">￥{{item.price}}</div>
                </div>
                <van-stepper v-model="item.num" integer @change="numChange"/>
            </div>
        </div>
        <div class="check-all" v-if="isCompile==false">
            <van-checkbox v-model="checked" checked-color="#B3D465">全选</van-checkbox>
            <div class="total">合计 <span>￥265</span></div>
            <div class="place-order">去下单</div>
        </div>
        <div class="check-all delete" v-if="isCompile==true">
            <van-checkbox v-model="checked" checked-color="#B3D465">全选</van-checkbox>
            <div class="del" @click="delCommodity">删除</div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // 全选按钮的 状态
            checked: false,
            // 编辑按钮的切换状态
            isCompile: false,
            // 编辑 和 完成的文字切换
            rightText: '编辑',
            // 购物袋商品列表
            shoppingBagList: [],
        }
    },
    created() {
        this.getShoppingBag();
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        onClickRight() {
            this.isCompile = !this.isCompile;
            if(this.isCompile) {
                this.rightText = '完成';
            } else {
                this.rightText = '编辑';
            }
        },
        stateSwitch(e) {
            // console.log(e);
        },
        getGoodsId(id) {
            console.log(id);

        },
        delCommodity() {
            this.$dialog.confirm({
                message: '是否删除选中商品？',
                confirmButtonText: '是',
                cancelButtonText: '否',
                closeOnClickOverlay: true,
                closeOnPopstate: true,
                beforeClose: (action, done) => {
                    if(action === 'confirm') {
                        console.log('confirm');
                        done(); 
                    } else {
                        done(); 
                    }
                }
            });
        },
        // 获取购物袋数据
        getShoppingBag() {
            this.$request.get('/userCart/create').then(data => {
                // console.log(data);
                data.forEach(item => {
                    const cart = {
                        id: item.id,
                        describe: item.describe,
                        color: item.color,
                        size: item.size,
                        price: item.sell_price,
                        pic: item.url,
                        num: data.num,
                        check: false 
                    }
                    this.shoppingBagList.push(cart);
                });

                // console.log(this.shoppingBagList);
                
            }) 
        },
        //  数量改变
        numChange(val) {
            console.log(val);
            

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
    margin-bottom: 5px;
    background-color: #eee;
    .van-icon {
        font-size: 20px;
        color: #2c2c2c;
    }
    .van-nav-bar__text {
        color: #2c2c2c;
    }
}
.content {
    margin-top: 46px;
    margin-bottom: 49px;
    overflow: hidden;
}
.commodity {
    display: flex;
    justify-content: space-between;
    position: relative;
    height: 143px;
    padding: 31px 16px 32px 16px;
    margin-bottom: 9px;
    background-color: #fff;
    box-shadow:0px 3px 5px #c8c8c8 ;
    /deep/ .van-checkbox__label {
        margin-left: 15px;
    }
    .order-describe {
        position: relative;
        width: 308px;
        font-size: 11px;
        .img {
            width: 82px;
            height: 80px;
            background-size: cover;
            background-position: center;
        }
        .name {
            position: absolute;
            top: 0;
            left: 98px;
            width: 165px;
            overflow: hidden;
            white-space: nowrap; 
            text-overflow:ellipsis;
        }
        .style {
            position: absolute;
            top: 24px;
            left: 98px;
            color: #999;
            font-size: 10px;
            span {
                margin-right: 15px;
                padding: 3px 7px;
                border: 0.5px solid #eee;
            }
        }
        .price {
            position: absolute;
            bottom: 0;
            left: 98px;
        }
    }
    .van-stepper {
        position: absolute;
        right: 16px;
        bottom: 22px;
    }
}
.check-all {
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 49px;
    padding-left: 16px;
    background-color: #fff;
    box-shadow: 0 -3px 3px #c8c8c8;
    font-size: 15px;
    .total {
        margin-left: 20px;
        line-height: 49px;
        span {
            color: #D30606;
            font-weight: 700;
        }
    }
    .place-order {
        position: absolute;
        right: 0;
        width: 104px;
        height: 49px;
        line-height: 49px;
        background-color: #B3D465;
        color: #fff;
        text-align: center;
    }
}
.delete {
    justify-content: space-between;
    .del {
        width: 104px;
        height: 49px;
        line-height: 49px;
        background-color: #B3D465;
        color: #fff;
        text-align: center;
    }
}
</style>