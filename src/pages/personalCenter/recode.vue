<template>
  <div>
    <div class="my_order" v-show="!playcode.show">
      <div class="o_title">我的订单</div>
      <div class="my_body">
        <div class="tags">
          <div @click="activeType = 'all'" :class="['tag', isActive('all')]">全部订单</div>
          <div @click="activeType = 'pay'" :class="['tag', isActive('pay')]">待付款</div>
          <div @click="activeType = 'send'" :class="['tag', isActive('send')]">待发货</div>
          <div @click="activeType = 'receive'" :class="['tag', isActive('receive')]">待收货</div>
          <div @click="activeType = 'success'" :class="['tag', isActive('success')]">已完成</div>
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
                    <div class="img" @click="viewGoodsDetail(good)">
                      <img :src="good.url" alt />
                    </div>
                    <div class="g_title" @click="viewGoodsDetail(good)">{{good.name}}</div>
                    <div class="number">{{good.num}}</div>
                  </div>
                  <div class="send">{{item.name}}</div>
                  <div class="g_money">
                    <div class="all">总额：¥{{good.total_sell}}</div>
                    <div style="color: #2c2c2c;">{{item.status === '待付款' ? '应付' : '实付'}} ¥{{good.total_price}}</div>
                    <!-- <div
                      style="padding-top:0.8rem;color: #2c2c2c;"
                    ></div> -->
                  </div>
                  <div class="operate">
                    <!-- <div class="time">剩余23小时57分钟</div> -->
                    <div class="pay" v-if="item.status === '待付款'" @click="pay(item)">{{item.status}}</div>
                    <div class="pay" v-else>
                      <div style="cursor: initial;" class>{{item.status}}</div>
                      <div
                        style="padding-top:0.8rem;"
                        @click.stop="expressage(item, g_index, 'view')"
                      >查看物流信息</div>
                    </div>
                    <div
                      @click="expressage(item, g_index, 'sure')"
                      style="padding-top:0.4rem;cursor: pointer;"
                      v-if="item.status === '待收货'"
                    >确认收货</div>
                    <!-- <div class="cancel" v-if="item.status === '待付款'">取消订单</div> -->
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
      <payway @close="payResult" @back="viewOrder" v-if="playcode.show" :order="playcode.order"></payway>
    </div>
    <el-dialog title="物流信息" :visible.sync="express.show" v-if="express.show">
      <div class="block">
        <el-timeline>
          <!-- :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
          :size="activity.size"-->
          <el-timeline-item
            v-for="(activity, index) in express.info"
            :key="index"
            :timestamp="activity.accept_time"
          >{{activity.accept_station}}</el-timeline-item>
        </el-timeline>
      </div>
      <span slot="footer">
        <el-button type="primary" @click="express.show=false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getUserOrder,
  postUserExpressage,
  postConfirmOrder
} from "@/api/market";
import Payway from "../goods/payway";
export default {
  components: {
    Payway
  },
  data() {
    return {
      express: {
        show: false,
        info: [
          {
            content: "物流订单创建中",
            size: "large",
            type: "primary",
            icon: "el-icon-more"
          }
        ]
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
    viewOrder() {
      this.playcode.show = false;
    },
    payResult() {
      this.playcode.show = false;
      // this.getPersonal()
      getUserOrder().then(data => {
        this.orders = data;
      });
    },
    /** 个人信息 */
    getPersonal() {
      this.$request("/personal/home").then(data => {
        store.dispatch("INFO", data);
      });
    },
    expressage(goods, index, type) {
      const { oid, num } = goods.data[index];
      const obj = {
        view: () => {
          this.express.show = true;
          postUserExpressage({ id: oid }).then(({ data }) => {
            if (data) {
              this.express.info = data;
            } else {
              this.express.info = [
                {
                  accept_station: "物流订单创建中",
                  size: "large",
                  type: "primary",
                  icon: "el-icon-more"
                }
              ];
            }
          });
        },
        sure: () => {
          postConfirmOrder({ id: oid }).then(data => {
            getUserOrder().then(data => {
              this.orders = data;
            });
            this.$message({ type: "success", message: "确认收货成功" });
          });
        }
      };
      obj[type]();
    },
    viewGoodsDetail(goods) {
      this.$router.push({
        name: "detailGoods",
        params: {
          id: goods.id
        }
      });
    },
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
  padding-bottom: 4rem;
  position: relative;
  .o_title {
    background: rgba(255, 255, 255, 1);
    box-shadow: 1px 1px 9px 1px rgba(92, 92, 92, 0.28);
    height: 4rem;
    line-height: 4rem;
    padding-left: 3rem;
    font-size: 0.9rem;
    font-weight: border;
    color: #7BB666;
  }
  .my_body {
    margin-top: 1.6rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 1px 1px 9px 1px rgba(92, 92, 92, 0.28);
    padding: 0 3rem;
    padding-top: 1rem;
    overflow-x: hidden;
    .tags {
      display: flex;
      .tag {
        cursor: pointer;
        color: #2C2C2C;
        font-weight: bolder;
        margin-right: 1.8rem;
        &.active {
          color: #7BB666;
          border-bottom: 2px solid #94D17F;
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
              cursor: pointer;
              flex-shrink: 0;
              // background: #ccc;
            }
            .g_title {
              color: #2c2c2c;
              cursor: pointer;
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