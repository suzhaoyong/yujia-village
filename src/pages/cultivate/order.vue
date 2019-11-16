<template>
  <div class="order-wrap">
    <div class="order" v-show="!playcode.show">
      <session-title name="填写订单" brief="The customer's excellent experience is our goal from beginning to end." :line="false"></session-title>
      <div class="goods">
        <div class="goods-title"><span>商品信息</span></div>
        <div class="goods-contents">
          <div class="goods-box">
            <div class="goods-img">
              <img :src="train.teacher_img" :alt="train.theme">
            </div>
            <span class="goods-name">{{train.theme}}</span>
            <span class="goods-price">￥{{typeof train.price !== 'undefined' ? train.price.toFixed(2) : ''}}</span>
          </div>
        </div>
        <div class="jifen" v-show="!isPayWay">
          <div class="jifen-title"><span>使用积分</span> <div style="display:inline; color:#999999;margin-left:1rem;" >个人积分总量 {{info.user.fraction}}</div></div>
          <div class="jifen-contents">
            <el-checkbox-group 
              v-model="checkedDiscount"
              :max="1">
              <div class="jifen-box" v-for="(item, index) in train_discount['积分']">
                <el-checkbox :label="item" :key="item.deduction" :disabled="item.consume > info.user.fraction" class="jifen-checkbox">
                  <span>{{item.consume}}</span>积分 课程仅需<span>{{getCountPrice(item)}}</span>元
                </el-checkbox>
              </div>
            </el-checkbox-group>
          </div>
        </div>
        <div class="count" v-show="!isPayWay">
          <div class="sum_price">
            <span style="color: #FF4400;">1</span> <span>件商品，总商品金额</span> <span style="margin-left:2rem;color: #FF4400;">{{typeof train.price !== 'undefined' ? train.price.toFixed(2) : ''}}</span>元
          </div>
          <div class="tips">
            <span style="font-size: 0.6rem;">{{usedDiscount?'已使用积分抵扣':' '}}</span>
          </div>
          <div class="new_price">
            <span style="font-weight: bolder;">应付金额</span> <span style="font-weight: bolder;color: #FF4400;">￥{{payPrice}}</span>
          </div>
          <div class="pay">
            <span class="pay_btn" @click="choosePayWay">去付款</span>
          </div>
        </div>
        <div class="pay-goods" v-show="isPayWay">
          <div class="pay-goods-title"><span>选择支付方式</span> <div>支付：<span style="color: #FF4400;">¥{{payPrice}}</span></div></div>
          <div class="pay-way">
            <div class="pay-way-box">
              <el-radio-group v-model="pay.type">
                <el-radio label="alipay"><div class="pay-icon alipay"></div></el-radio>
                <el-radio label="wechat"><div class="pay-icon wechat"></div></el-radio>
              </el-radio-group>
              
            </div>
          </div>
          <div class="pay-goods-btn">
            <span :class="['pay', {'bid': forbidPay}]" @click="payMoney">立即付款</span>
          </div>
          <div class="pay-goods-time">
            <div style="padding-top:1rem;">
              <!-- 剩余付款时间: <span style="color: #FF4400;">00:00</span> -->
            </div> 
          </div>
        </div>
      </div>
    </div>
    <div class="payway" v-if="playcode.show">
      <payway v-if="playcode.show" :order="playcode.order"></payway>
    </div>
  </div>
</template>
<script>
import { getTrainsById, postTrainsOrder } from "@/api/trains";
import { postAlipayOrder } from "@/api/market";

import { mapGetters } from 'vuex'
import Payway from "./payway";
import Bus from '@/utils/Bus.js'
export default {
  components: {
    Payway
  },
  data() {
    return {
      train: {},
      train_discount: {},
      checkedDiscount: [],
      orderTrain: {
        id: '',
        cashId: '',
        cashMoney: '',
        couponId: '',
        fraction: '',
        discountId: ''
      },
      form: {
        out_trade_no: '',
        body: '',
        total_fee: ''
      },
      isPayWay: false,
      pay: {
        type: ''
      },
      playcode: {
        show: false,
        order: {
          body: "",
          totalPrice: "",
          out_trade_no: ""
        },
        count: 0
      },
    }
  },
  computed: {
    ...mapGetters(['info', 'isUserNeedLogin']),
    getCountPrice() {
      return (item) => {
        if(item.deduction > this.train.price) {
          return '0.00';
        }
        return (this.train.price - item.deduction).toFixed(2)
      }
    },
    isJifen() {
      return this.train_discount['积分'] && this.train_discount['积分'].length > 0
    },
    payPrice() {
      if (typeof this.train.price !== 'undefined' && this.train.price === 0) {
        return '0.00'
      }
      if(this.checkedDiscount.length === 0){
        return this.train.price >= 0 ? this.train.price.toFixed(2) : ''
      }
      return (this.train.price - this.checkedDiscount[0].deduction) >=0 ? (this.train.price - this.checkedDiscount[0].deduction).toFixed(2) : '';
    },
    usedDiscount() {
      return this.checkedDiscount.length > 0
    },
    forbidPay() {
      return !this.pay.type
    }
  },
  mounted() {
    const { id } = this.$route.params;
    getTrainsById(id)
      .then(data => {
        this.train = data.train;
        this.train_discount = data.train_discount
      })
  },
  methods: {
    choosePayWay() {
      const { id } = this.$route.params;
      this.orderTrain.id = id
      if(this.usedDiscount) {
        const { id: discountId, consume:fraction } = this.checkedDiscount[0]
        this.orderTrain = Object.assign({}, this.orderTrain, { discountId, fraction })
      }
      
      postTrainsOrder(this.orderTrain)
        .then(response => {
          console.log(response);
          const { body, out_trade_no = '' } = response
          
          if(out_trade_no == '') {
            this.$message({type:'warning', message: response.msg})
          } else {
            this.form = { body, out_trade_no, total_fee: this.payPrice }
            this.isPayWay = true
          }
        })
      
    },
    payMoney() {
      if(this.forbidPay) {
        return;
      }
      if(this.pay.type === 'alipay') {
        const { body, out_trade_no, total_fee } = this.form
        let url = `${window.location.origin}/api/alipay/web/get?out_trade_no=${out_trade_no}`;
        if (process.env.NODE_ENV === 'development') {
          url = `${'http://testapi.aomengyujia.com'}/api/alipay/web`;
        }
        this.$request.post('/alipay/web', { out_trade_no: out_trade_no})
          .then(response => {
            // let form = response.substring(0,5) + ' target="_blank"' + response.substring(5)            
            document.write(`${response}`);
            // document.alipay_submit.submit();  
          })
      }
      if(this.pay.type === 'wechat') {
        const { body, out_trade_no, total_fee } = this.form
        sessionStorage.setItem('total_fee', total_fee)
        this.$router.push({
          name: 'wechat pay',
          query: {
            orderId: out_trade_no
          }
        })
        // this.$router.push(`/cultivate/order/pay/${out_trade_no}`)
        // this.playcode.order = { out_trade_no, body, totalPrice: total_fee }
        // this.playcode.show = true;
      }
    },
  }
}
</script>
<style lang="scss" scoped>
img{
  width: 100%;
  height: 100%;
}
  .order-wrap{
    padding-bottom: 3rem;
    font-size: 0.7rem;
    color: #2c2c2c;
    .order{
      width: 60rem;
      margin: 0 auto;
    }
    .goods{
      .goods-title{
        border-bottom: 1px solid #DCDCDC;
      }
      .goods-contents{
        padding-top: 1rem;
        padding-bottom: 1rem;
        .goods-box{
          height: 10rem;
          background: #EEEEEE;
          margin-bottom: 0.5rem;
          position: relative;
          display: flex;
          align-items: center;
          padding-left: 3rem;
          .goods-img{
            width: 7.7rem;
            height: 8.3rem;
            background: #fff;
            display: inline-block;
          }
          .goods-name{
            padding-left: 1rem;
            padding-top: 0.5rem;
            width: 20em;
            height: 8.3rem;
            
          }
          .goods-price{
            position: absolute;
            right: 2rem;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
      
    }
    .jifen{
      .jifen-title{
        span{
          font-weight: bolder;
        }
      }
      .jifen-contents{
        padding: 0.2rem 0;
        box-shadow: 1px 2px 1px #eee;
        width: 98%;
        margin: 0 auto;
        margin-top: 1rem;
        .jifen-box{
          padding-left: 1rem;
          & /deep/ .el-checkbox__input.is-checked+.el-checkbox__label {
            color:#2c2c2c;
          }
          .jifen-checkbox{
            font-weight: bolder;
            span{
              color: #68B65B;
            }
          }
        }
      }
      
    }
    .count{
      padding-top: 1rem;
      padding-bottom: 1rem;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      .sum_price{
        margin-bottom: 0.4rem;
      }
      .tips{
        height: 1em;
        margin-bottom: 0.4rem;
      }
      .new_price{
        margin-bottom: 1.2rem;
      }
      .pay{
        .pay_btn{
          cursor: pointer;
          display: inline-block;
          width: 6rem;
          height: 2.5rem;
          line-height: 2.5rem;
          text-align: center;
          color:#fff;
          background: #FF4400;
        }
      }
    }
    .pay-goods{
      padding-bottom: 2rem;
      .pay-goods-title{
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #DCDCDC;
      }
      .pay-way{
        padding-top: 1rem;
        .pay-way-box{
          display: flex;
          align-items: center;
          & /deep/ .el-radio-group {
            display: flex;
          }
          & /deep/ .el-radio {
            display: flex;
            align-items: center;
          }
          .pay-icon{
            width: 6.8rem;
            height: 2.3rem;
            display: flex;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            &.alipay{
              background-image: url('~@/assets/trains/alipay.png');
            }
            &.wechat{
              background-image: url('~@/assets/trains/wechat.png');
            }
          }
        }
      }
      .pay-goods-btn{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        .pay{
          cursor: pointer;
          display: inline-block;
          width: 6rem;
          height: 2.5rem;
          line-height: 2.5rem;
          text-align: center;
          color:#fff;
          background: #9FC28E;
          &.bid{
            cursor: not-allowed;
            background: #eee;
          }
        }
      }
      .pay-goods-time{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
    }
  }
</style>