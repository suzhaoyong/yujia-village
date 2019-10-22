<template>
    <div class="integral">
        <van-nav-bar title="积分中心" left-arrow @click-left="onClickLeft">
            <van-icon name="question-o" slot="right" @click="question"/>
        </van-nav-bar>
        <div class="bgc">
            <div class="my-jf">您的积分</div>
            <div class="number">{{integral}}</div>
            <div class="explain">2019年12月31日前注册及邀请注册可获双倍积分哟！</div>
        </div>
        <div class="content">
            <div class="title">
                <div class="detail">积分明细</div>
                <div>Points details</div>
            </div>
            <van-tabs class="detail-box" v-model="active" :border="false" animated color="#93D57B">
                <van-tab title="收入">
                    <div class="detail-item" v-for="(item,index) in integralRecord.in" :key="index">
                        <div class="jf-source">{{item.reason}}</div>
                        <div>{{item.created_at}}</div>
                        <div class="integral">+{{item.num}}</div>
                    </div>
                </van-tab>
                <van-tab title="支出">
                    <div class="detail-item" v-for="(item,index) in integralRecord.out" :key="index">
                        <div class="jf-source">{{item.reason}}</div>
                        <div>{{item.created_at}}</div>
                        <div class="integral">+{{item.num}}</div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            active: '',
            integral: '',
            integralRecord: ''
        }
    },
    created() {
        this.integral = JSON.parse(window.sessionStorage.getItem('user')).fraction
        this.getIntegralRecord();
    },
    methods: { 
        onClickLeft() {
            this.$router.go(-1);
        },
        question() {
            this.$router.push('/integralrules')
        },
        getIntegralRecord() {
            this.$request.get('/personal/fractioRecord').then(data => {
                console.log(data);
                this.integralRecord = data;
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.integral {
    height: 100%;
}
.bgc {
    position: relative;
    height: 145.5px;
    background: url("../../assets/img/bgc.png") no-repeat;
    background-size: cover;
    .my-jf {
        position: absolute;
        top: 48%;
        left: 101px;
        font-size: 14px;
    }
    .number {
        position: absolute;
        top: 50%;
        left: 160px;
        transform: translateY(-50%);
        color: #93D57B;
        font-size: 34px;
    }
    .explain {
        position: absolute;
        left: 16px;
        bottom: -22px;
        width: 343px;
        height: 44px;
        line-height: 44px;
        box-shadow: 3px 1px 8px 1px rgba(0, 0, 0, 0.15);
        border-radius: 10px;
        background-color: #fff;
        color: #65AC4C;
        font-size: 12px;
        text-align: center;
    }
}
.content {
    position: absolute;
    top: 220px;
    left: 0;
    bottom: 0px;
    padding: 0 16px;
    padding-top: 16px; 
    width: 100%;
    background-color: #fff;
    .title {
        padding-left: 12px;
        margin-bottom: 5px;
        border-left: 4px solid #93D57B;
        font-size: 12px;
        .detail {
            font-size: 16px;
            font-weight: 600;
        }
    }
    .detail-box {
        /deep/ .van-tabs__line {
            width: 60px!important;
        }
        .detail-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 54px;
            padding: 0 10px;
            border-top: 0.5px solid #eee;
            font-size: 12px;
            .jf-source {
                width: 80px;
            }
            .integral {
                width: 50px;
                line-height: 54px;
                font-weight: 600;
                text-align: right;
            }
        }
    }
}
</style>