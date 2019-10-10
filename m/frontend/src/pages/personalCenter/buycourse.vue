<template>
    <div>
        <van-nav-bar title="已购课程" left-arrow @click-left="onClickLeft">
        </van-nav-bar>
        <div class="content">
            <div class="course">
                <div class="img"></div>
                <div class="info">
                    <div class="title">孕产瑜伽培训</div>
                    <van-rate v-model="value" :size="5" color="#7BBB62" void-color="#7BBB62" readonly />
                    <div class="time">2019-05-20-2019-07-20</div>
                    <div class="address">成都市锦江区泰和国际发顺丰八佰伴</div>
                    <div class="want-study">
                        <van-icon class="item" name="eye-o" />
                        <div class="item">550</div>
                        <img class="hand item" src="../../assets/img/hand.png" alt="">
                        <div class="item">220</div>
                    </div>
                </div>
                <div class="price">￥7850</div>
            </div>
            <div class="course">
                <div class="img"></div>
                <div class="info">
                    <div class="title">孕产瑜伽培训</div>
                    <van-rate v-model="value" :size="5" color="#7BBB62" void-color="#7BBB62" readonly />
                    <div class="time">2019-05-20-2019-07-20</div>
                    <div class="address">成都市锦江区泰和国际发顺丰八佰伴</div>
                    <div class="want-study">
                        <van-icon class="item" name="eye-o" />
                        <div class="item">550</div>
                        <img class="hand item" src="../../assets/img/hand.png" alt="">
                        <div class="item">220</div>
                    </div>
                </div>
                <div class="price">￥7850</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value: 2,
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
.content {
    margin-top: 46px;
}
.course {
    position: relative;
    display: flex;
    width: 100%;
    height: 138px;
    padding: 15px 16px;
    margin-bottom: 7px;
    background-color: #fff;
    box-shadow: 0px 3px 3px #c8c8c8;
    .img {
        width: 108px;
        height: 108px;
        background-color: #eee;
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
        .time {
            padding-top: 13px;
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
            width: 200px;
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
    .price {
        position: absolute;
        top: 34px;
        right: 28px;
        font-size: 12px;
        font-weight: 700;
    }
}
</style>