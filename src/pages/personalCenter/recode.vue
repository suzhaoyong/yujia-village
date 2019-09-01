<template>
  <div>
    <div class="my_order" v-show="!playcode.show">
      <div class="o_title">我的订单</div>
      <div class="my_body">
        <div class="tags">
          <div @click="activeType = 'all'" :class="['tag', isActive('all')]">全部订单</div>
          <div @click="activeType = 'pay'" :class="['tag', isActive('pay')]">待付款</div>
          <div @click="activeType = 'send'" :class="['tag', isActive('send')]">待收货</div>
        </div>
        <div class="table">
          <div v-for="(item, index) in showOrder" :key="index">
            <div class="table_header">
              <div class="t_title">订单详情</div>
              <div class="t_title">订单号: {{item.out_trade_no}}</div>
              <div class="t_title">收货人</div>
              <div class="t_title">金额</div>
              <div class="t_title">操作</div>
            </div>
            <div class="table_body">
              <div>
                <div class="goods" v-for="(good, g_index) in item.data" :key="g_index">
                  <div class="info">
                    <div class="img">
                      <img :src="item.url" alt />
                    </div>
                    <div class="g_title">{{good.name}}</div>
                    <div class="number">{{good.num}}</div>
                  </div>
                  <div class="send">{{item.name}}</div>
                  <div class="g_money">
                    <div class="all">总额：¥{{good.num * good.sellPrice}}</div>
                    <div style="color: #2c2c2c;">应付</div>
                    <div
                      style="padding-top:0.8rem;color: #2c2c2c;"
                    >¥{{good.num * (good.sellPrice - good.discount)}}</div>
                  </div>
                  <div class="operate">
                    <!-- <div class="time">剩余23小时57分钟</div> -->
                    <div class="pay" v-if="item.status === '待付款'" @click="pay(item)">{{item.status}}</div>
                    <div class="pay" v-else>{{item.status}}</div>
                    <div class="cancel" v-if="item.status === '待付款'">取消订单</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <not-found v-if="showOrder.length === 0" type="not-fond" msg="我寻寻觅觅却找不见您订单的踪迹"></not-found>
        </div>
      </div>
    </div>
    <div class="payway" v-if="playcode.show">
      <payway v-if="playcode.show" :order="playcode.order"></payway>
    </div>
  </div>
</template>
<script>
import { getUserOrder } from "@/api/market";
import Payway from "../goods/payway";
export default {
  components: {
    Payway
  },
  data() {
    return {
      playcode: {
        show: false,
        order: {
          body: "",
          totalPrice: "",
          out_trade_no: ""
        },
        count: 0
      },
      orders: {
        all: [],
        pay: [],
        send: [],
        success: [],
        receive: [],
        cancel: []
      },
      activeType: "all"
    };
  },
  computed: {
    showOrder() {
      return this.orders[this.activeType];
    },
    isActive() {
      return type => ({ active: type === this.activeType });
    }
  },
  mounted() {
    getUserOrder().then(data => {
      this.orders = data;
    });
  },
  methods: {
    pay(item) {
      const { totalPrice, out_trade_no } = item;
      this.playcode.show = true;
      this.playcode.order = {
        body: `订单号：${out_trade_no}`,
        totalPrice,
        out_trade_no
      };
    }
  }
};
</script>
<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
}
.my_order {
  padding-top: 1rem;
  font-size: 0.7rem;
  color: #2c2c2c;
  width: 60rem;
  margin: 0 auto;
  position: relative;
  .o_title {
    background: rgba(255, 255, 255, 1);
    box-shadow: 1px 1px 9px 1px rgba(92, 92, 92, 0.28);
    height: 4rem;
    line-height: 4rem;
    padding-left: 3rem;
    font-size: 1rem;
    font-weight: border;
  }
  .my_body {
    margin-top: 1.6rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 1px 1px 9px 1px rgba(92, 92, 92, 0.28);
    padding: 0 3rem;
    padding-top: 1rem;
    .tags {
      display: flex;
      .tag {
        cursor: pointer;
        color: #ccc;
        font-weight: bolder;
        margin-right: 1.8rem;
        &.active {
          color: #2c2c2c;
        }
      }
    }
    .table {
      padding-top: 2rem;
      padding-bottom: 4rem;
      .table_header {
        color: #999999;
        display: flex;
        height: 3rem;
        line-height: 3rem;
        background: #eee;
        .t_title {
          position: relative;
          &:nth-child(1) {
            padding-left: 2rem;
            width: 10rem;
          }
          &:nth-child(2) {
            width: 15rem;
          }
          &:nth-child(3) {
            width: 10rem;
            text-align: center;
          }
          &:nth-child(4) {
            width: 10rem;
            text-align: center;
          }
          &:nth-child(5) {
            width: 10rem;
            text-align: center;
          }
        }
      }
      .table_body {
        .goods {
          display: flex;
          border: 1px solid #eee;
          padding-top: 1.45rem;
          padding-left: 1rem;
          padding-bottom: 3rem;
          color: #999999;
          .info {
            display: flex;
            width: 25rem;
            position: relative;
            .img {
              width: 3.5rem;
              height: 3.5rem;
              flex-shrink: 0;
              background: #ccc;
            }
            .g_title {
              color: #2c2c2c;
              width: 18em;
              font-size: 0.8rem;
              font-weight: bolder;
              padding-left: 1.2rem;
            }
            .number {
              position: absolute;
              right: 3rem;
            }
          }
          .send {
            width: 10rem;
            text-align: center;
          }
          .g_money {
            width: 10rem;
            text-align: center;
            .all {
              padding-bottom: 0.8rem;
            }
          }
          .operate {
            width: 10rem;
            text-align: center;
            time {
            }
            .pay {
              cursor: pointer;
              padding-top: 0.8rem;
            }
            .cancel {
              padding-top: 0.8rem;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>