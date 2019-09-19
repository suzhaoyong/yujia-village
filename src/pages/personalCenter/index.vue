<template>
  <div>
    <div class="personal">
      <div class="buy" v-show="false">
        <session-title name="已购买的课程"></session-title>
        <div class="body">
          <el-carousel indicator-position="none" arrow="always">
            <el-carousel-item v-for="item in 4" :key="item">
              <div class="course">
                <div class="card" v-for="card in 3" :key="card">
                  <div class="img"></div>
                  <div class="info">
                    <div class="item">
                      <div class="name">
                        <div class="name-zh">普拉提</div>
                        <div class="name-en">Plute</div>
                      </div>
                      <div class="price">¥4000</div>
                    </div>
                    <div class="item">
                      <div class="score">
                        <el-rate disabled :colors="['#58B708','#58B708','#58B708']" :value="star"></el-rate>
                      </div>
                    </div>
                    <div class="item">
                      <div class="shop-name">成都瑜伽</div>
                      <div class="time">2019.05.02-2019.07.04</div>
                    </div>
                  </div>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <session-title name="已购买商品"></session-title>
      <cloud :arr="[1,2,3,4, 5]"></cloud>
      <div v-show="false">
        <div class="yun">
          <img :src="icon.yun.yun_1" alt />
        </div>
        <div class="yun2">
          <img :src="icon.yun.yun_2" alt />
        </div>
        <div class="yun3">
          <img :src="icon.yun.yun_1" alt />
        </div>
      </div>
      <div class="my-class">
        <div
          class="goods-box"
          @click="viewGoodsDetail(item)"
          v-for="(item, index) in info.cart"
          :key="index"
        >
          <div class="pic">
            <img :src="item.url" alt />
          </div>
          <div class="gtitle">{{item.describe}}</div>
          <div class="price-views-collenct">
            <div class="price">
              <div class="old-price">￥{{item.sell_price}}</div>
              <div class="new-price">￥{{item.sell_price - item.discount}}</div>
            </div>
            <div class="views-collenct">
              <!-- <div class="views">{{item.views}}</div>
              <div class="collenct" @click="addCollect">收藏</div>-->
            </div>
          </div>
        </div>
      </div>
      <div>
        <not-found v-if="info.cart.length === 0" type="not-fond" msg="我寻寻觅觅却找不见您购买的踪迹"></not-found>
      </div>
      <session-title name="已收藏商品"></session-title>
      <div class="my-class">
        <div
          class="goods-box"
          @click="viewGoodsDetail(item)"
          v-for="(item, index) in info.collect"
          :key="index"
        >
          <div class="pic">
            <img :src="item.url" alt />
          </div>
          <div class="gtitle">{{item.describe}}</div>
          <div class="price-views-collenct">
            <div class="price">
              <div class="old-price">￥{{item.sell_price}}</div>
              <div class="new-price">￥{{item.sell_price - item.discount}}</div>
            </div>
            <div class="views-collenct">
              <!-- <div class="views">{{item.views}}</div>
              <div class="collenct" @click="addCollect">收藏</div>-->
            </div>
          </div>
        </div>
      </div>
      <div>
        <not-found v-if="info.collect.length === 0" type="not-fond_2" msg="我寻寻觅觅却找不见您收藏的踪迹"></not-found>
      </div>
      <div class="cash-voucher">
        <session-title name="现金券">
          <span slot="tips" style="color:#999;">(可拆分使用)</span>
        </session-title>
        <div class="body">
          <div class="vouchers">
            <div
              class="flip-container"
              ontouchstart="this.classList.toggle('hover');"
              v-for="(item, index) in info.cash"
              :key="index"
            >
              <div class="flipper">
                <div
                  class="voucher front"
                  :style="`background-image:url(${voucherMoneyImg(index)}); background-size: 100% 100%;`"
                >
                  <div class="price">
                    <div class="sign">¥</div>
                    <div class="number">{{item.money}}</div>
                  </div>
                  <div class="name-time-used">
                    <div class="name">{{item.name}}</div>
                    <div class="used" @click="putUsed(item)" v-if="!showUsed(item)">详细使用记录</div>
                  </div>
                </div>
                <div
                  class="voucher back"
                  :style="`background-image:url(${icon.money.money_qin_right}); filter: grayscale(100%); background-size: 100% 100%;`"
                >
                  <div class="price">
                    <div class="sign">¥</div>
                    <div class="number">{{item.num}}</div>
                  </div>
                  <div class="name-time-used">
                    <div class="name">{{item.name}}</div>
                    <div class="time-btn">
                      <div class="time">
                        有效期至
                        <br />
                        {{item.endDate}}
                      </div>
                      <div class="btn" @click="viewUsed(item)">使用记录</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <not-found
            v-if="info.cash.length === 0"
            type="not-fond_3"
            msg="虽然您没有券，但至少您还拥有一盆花请温笑面对生活^-^"
          ></not-found>
        </div>
      </div>
      <div class="useable-voucher">
        <session-title name="已领取优惠券"></session-title>
        <div class="body">
          <div class="vouchers">
            <div
              class="voucher hvr-float"
              :style="`background-image:url(${voucherImg(index)}); background-size: 100% 100%;`"
              v-for="(item,index) in info.coupon"
              :key="index"
            >
              <div class="content">
                <div class="price">
                  <div class="number">
                    {{item.money}}
                    <div class="unit">元</div>
                  </div>
                </div>
                <div class="name"></div>
                <div class="condition">
                  {{item.range}}
                  <!-- 订单满{{item.limit_money}}元 -->
                  <!-- <br /> -->
                  可使用
                </div>
              </div>
            </div>
          </div>
          <not-found
            v-if="info.coupon.length === 0"
            type="not-fond_4"
            msg="我们的优惠券一般为限时发放，请您注意时间哟(＾Ｕ＾)ノ~ＹＯ"
          ></not-found>
        </div>
      </div>
    </div>
    <el-dialog title="使用记录" width="50rem" :visible.sync="used.show" v-if="used.show">
      <div class="table">
        <div class="header">
          <span style="width:4rem;">总额度</span>
          <span style="width:4rem;">使用额度</span>
          <span style="width:4rem;">剩余额度</span>
          <span style="width:8rem;">使用时间</span>
          <span style="width:10rem;">购买商品</span>
          <span style="width:7rem;">订单号</span>
        </div>
        <div class="content">
          <span style="width:4rem;">{{quan_used.money.toFixed(2)}}</span>
          <span style="width:4rem;">-{{(quan_used.money - quan_used.surplus).toFixed(2)}}</span>
          <span style="width:4rem;">{{quan_used.surplus.toFixed(2)}}</span>
          <span style="width:8rem;">{{quan_used.good_order.created_at}}</span>
          <span style="width:10rem;">{{quan_used.remake}}</span>
          <span style="width:7rem;">{{quan_used.good_order.out_trade_no}}</span>
        </div>
      </div>
      <div slot="footer">
        <el-button style="padding:0.5rem 1rem;" type="primary" @click="used.show=false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getUserOrder } from "@/api/market";
import { getUsedRecord } from "@/api/personal";
import { mapGetters } from "vuex";
import store from "@/store";
import Cloud from "./cloud";
import quan_orgin from "@/assets/order/quan_orgin.png";
import quan_pike from "@/assets/order/quan_pike.png";
import quan_red from "@/assets/order/quan_red.png";
import quan_zhi from "@/assets/order/quan_zhi.png";
import money_qin from "@/assets/order/money_qin.png";
import money_qin_right from "@/assets/order/money_qin_right.png";
import yun_1 from "@/assets/order/yun.png";
import yun_2 from "@/assets/order/yun_2.png";
export default {
  components: {
    Cloud
  },
  data() {
    return {
      star: 3,
      quan_used: {
        good_order: {
          out_trade_no: ""
        },
        money: 0,
        surplus: 0
      },
      used: { show: false },
      icon: {
        yun: {
          yun_1,
          yun_2
        },
        money: {
          money_qin,
          money_qin_right,
        },
        quan: {
          quan_orgin,
          quan_pike,
          quan_red,
          quan_zhi
        }
      },
      usedCoupon: {
        list: []
      }
    };
  },
  computed: {
    ...mapGetters(["info"]),
    voucherMoneyImg() {
      return index => {
        const obj = {
          0: money_qin
        };
        return obj[index % 1];
      };
    },
    showUsed() {
      return item => {
        let coupon = this.usedCoupon.list.filter(id => id == item.id)[0];
        if (coupon) {
          return true;
        } else {
          return false;
        }
      };
    },
    voucherImg() {
      return index => {
        const obj = {
          0: quan_orgin,
          1: quan_pike,
          2: quan_zhi,
          3: quan_red
        };
        return obj[index % 4];
      };
    }
  },
  mounted() {
    this.getPersonal();
  },
  methods: {
    getUseRecord(item) {
      this.quan_used = {
        good_order: {
          out_trade_no: ""
        },
        money: 0,
        surplus: 0
      };
      getUsedRecord(item.id).then(data => {
        this.quan_used = data;
      });
    },
    viewUsed(item) {
      this.used.show = true;
      this.getUseRecord(item);
    },
    putUsed(item) {
      let coupon = this.usedCoupon.list.filter(
        coupon => coupon.id == item.id
      )[0];
      if (coupon) {
      } else {
        this.usedCoupon.list.push({ id: item.id });
      }
    },
    /** 个人信息 */
    getPersonal() {
      this.$request("/personal/home").then(data => {
        store.dispatch("INFO", data);
      });
    },
    viewGoodsDetail(goods) {
      this.$router.push({
        name: "detailGoods",
        params: {
          id: goods.id
        }
      });
    },
    /** 现金券使用记录 */
    usedRecord(id) {
      this.$request(`/personal/home/${id}`).then(data => {});
    }
  }
};
</script>
<style scoped>
/* 整个容器，包括透视 */
.flip-container {
  perspective: 1000;
}

/* 鼠标放上去的时候翻转 */
.flip-container:hover .flipper,
.flip-container.hover .flipper {
  transform: rotateY(180deg);
}

.flip-container,
.front,
.back {
  width: 320px;
  margin: 0 2rem;
  height: 8rem;
}

/* 翻转速度设置 */
.flipper {
  transition: 1.5s;
  transform-style: preserve-3d;

  position: relative;
}

/* 翻转页的时候隐藏背面 */
.front,
.back {
  /* backface-visibility: hidden; */

  position: absolute;
  top: 0;
  left: 0;
}

/* 前面板放在上面 */
.front {
  z-index: 2;
  /* for firefox 31 */
  transform: rotateY(0deg);
}

/* 背面初始的时候隐藏 */
.back {
  transform: rotateY(180deg);
}

.void-icon {
  border: 1px solid #58b708;
  height: 100%;
  width: 100%;
}
.el-carousel__container {
  height: 26rem;
}
.el-rate__icon {
  font-size: 0.6rem;
  text-shadow: 0px 1px 0px #58b708;
}
.el-carousel {
  /* overflow: auto; */
}
.el-carousel__arrow--left {
  /* left: -30px!important; */
}
</style>

<style lang="scss" scoped>
.table {
  .header {
    padding: 0.5rem 0;
    border-bottom: 1px solid #ddd;
    span {
      width: 7rem;
      display: inline-block;
      &:nth-child(2) {
        width: 9rem;
      }
      &:nth-child(3) {
        width: 13rem;
      }
      &:nth-child(4) {
        width: 4rem;
      }
      &:nth-child(5) {
        width: 4rem;
      }
      &:last-child {
        width: 4rem;
      }
    }
  }
  .content {
    padding: 0.5rem 0;
    span {
      width: 7rem;
      display: inline-block;
      &:nth-child(2) {
        width: 9rem;
      }
      &:nth-child(3) {
        width: 13rem;
      }
      &:nth-child(4) {
        width: 4rem;
      }
      &:nth-child(5) {
        width: 4rem;
      }
      &:last-child {
        width: 4rem;
      }
    }
  }
}
.yun {
  position: absolute;
  top: 10rem;
  left: 5rem;
  z-index: -1;
  width: 25rem;
  margin-top: -5rem;
  margin-bottom: 1rem;
}
.yun2 {
  position: absolute;
  top: 3rem;
  right: -10rem;
  width: 12rem;
  z-index: -1;
  margin-left: 100%;
}
.yun3 {
  position: absolute;
  top: 100rem;
  left: -10rem;
  z-index: -1;
  width: 25rem;
  margin-top: -5rem;
  margin-bottom: 1rem;
}

img {
  width: 100%;
  height: 100%;
}
@mixin full-width($support-type: margin, $min-width: null) {
  @if $support-type == "margin" {
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
    // margin-left: calc(-100vw / 2 + #{$min-width} / 2);
    // margin-right: calc(-100vw / 2 + #{$min-width} / 2);
  }
  @if $support-type == "position" {
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
  }
  @if $support-type == "translate" {
    width: 100vw;
    transform: translateX(calc((#{$min-width} - 100vw) / 2));
  }
}
.my-class {
  padding-top: 1rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-height: 400px;
  overflow-y: auto;
  /* 设置滚动条的样式 */
  &::-webkit-scrollbar {
    width: 0.3rem;
  }
  /* 滚动槽 */
  &::-webkit-scrollbar-track {
    background: #dcdcdc;
    border-radius: 0.15rem;
  }
  /* 滚动条滑块 */
  &::-webkit-scrollbar-thumb {
    background: #88bc37;
    border-radius: 0.15rem;
  }
  &::-webkit-scrollbar-thumb {
    background: #88bc37;
  }

  .goods-box {
    flex-basis: 23%;
    margin: 0.3rem;
    width: 13.5rem;
    // height: 19.35rem;
    background: #fff;
    padding-bottom: 1rem;
    // border:1px solid rgba(164, 164, 164, 0.39);
    border-radius: 6px;
    &:hover {
      box-shadow: 0.1rem 0.2rem 1.3rem 0.1rem rgba(164, 164, 164, 0.39);
      transition: box-shadow 0.75s;
    }
    &:nth-child(4n) {
      margin-right: 0rem;
    }
    .pic {
      width: 100%;
      height: 12.75rem;
    }
    .gtitle {
      padding: 1rem;
      color: #2c2c2c;
      font-size: 0.7rem;
    }
    .price-views-collenct {
      display: flex;
      justify-content: space-between;
      padding: 0 1rem;
      .price {
        display: flex;
        .old-price {
          font-size: 0.6rem;
          color: #999;
          text-decoration: line-through;
          margin-right: 0.1rem;
        }
        .new-price {
          font-size: 0.7rem;
          color: #2c2c2c;
        }
      }
      .views-collenct {
        color: #8f8f8f;
        font-size: 0.7rem;
        display: flex;
        .views {
          cursor: pointer;
          position: relative;
          padding-left: 0.4rem;
          padding-right: 1.2rem;
          &::before {
            content: "";
            display: block;
            position: absolute;
            top: 50%;
            left: -0.6rem;
            transform: translateY(-50%);
            width: 0.9rem;
            height: 0.7rem;
            background: pink;
            background: url("../../assets/eye.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .collenct {
          cursor: pointer;
          position: relative;
          &::before {
            content: "";
            display: block;
            position: absolute;
            top: 50%;
            left: -0.95rem;
            transform: translateY(-50%);
            width: 0.9rem;
            height: 0.9rem;
            background: pink;
            background: url("../../assets/market/like.png") no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
  }
}
@mixin title() {
  .title {
    // height: 13.5rem;
    padding-top: 6rem;
    padding-bottom: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    &::before,
    &::after {
      content: "";
      display: block;
      width: 13rem;
      // height: 1px;
      background: #dcdcdc;
      position: absolute;
    }
    &::before {
      top: 50%;
      right: 40%;
      transform: translate(-110%, -50%);
    }
    &::after {
      top: 50%;
      left: 40%;
      transform: translate(110%, -50%);
    }
    &-zh {
      color: #2c2c2c;
      font-weight: 800;
      vertical-align: bottom;
      .icon {
        width: 1rem;
        height: 1.5rem;
        display: inline-block;
        vertical-align: super;
        margin-right: 0.8rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    &-en {
      padding-top: 1rem;
    }
  }
}
@mixin flex-align-items() {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.personal {
  position: relative;
  width: 60rem;
  margin: 0 auto;
  padding-bottom: 11rem;
  .buy {
    width: 60rem;
    margin: 0 auto;
    .title {
    }
    @include title();
    .body {
      padding: 0 4rem;
      // border: 1px solid #ccc;
      .course {
        display: flex;
        justify-content: space-between;
        .card {
          width: 19rem;
          height: 25.7rem;
          .img {
            width: 100%;
            height: 18.45rem;
            background: #ccc;
          }
          .info {
            padding: 1.85rem 1.3rem 1.45rem;
            .item {
              display: flex;
              justify-content: space-between;
              font-size: 0.9rem;
              color: #2c2c2c;
              .name {
                display: flex;
                &-zh {
                }
                &-en {
                }
              }
              .price {
              }
              .score {
                width: 8em;
              }
              &:nth-child(3) {
                padding-top: 1rem;
              }
              .shop-name {
              }
              .time {
              }
            }
          }
        }
      }
    }
  }
  .cash-voucher {
    @include title();
    .body {
      .vouchers {
        min-height: 20rem;
        padding-top: 3rem;
        max-height: 22rem;
        overflow: auto;
        // border: 1px solid #ccc;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        /* 设置滚动条的样式 */
        &::-webkit-scrollbar {
          width: 0.3rem;
        }
        /* 滚动槽 */
        &::-webkit-scrollbar-track {
          background: #dcdcdc;
          border-radius: 0.15rem;
        }
        /* 滚动条滑块 */
        &::-webkit-scrollbar-thumb {
          background: #88bc37;
          border-radius: 0.15rem;
        }
        &::-webkit-scrollbar-thumb {
          background: #88bc37;
        }
        .voucher {
          margin: 0.1rem;
          width: 19.25rem;
          height: 7.65rem;
          // background: #ccc;
          color: #fff;
          display: flex;
          justify-content: space-between;
          cursor: pointer;
          .price {
            padding-top: 2.3rem;
            padding-left: 1.65rem;
            font-size: 2.55rem;
            font-weight: 800;
            display: flex;
            cursor: pointer;
            .sign {
              transform: translate(0rem, 0rem);
            }
            .number {
            }
          }
          .name-time-used {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-right: 1.05rem;
            .name {
              // padding-top: 2.85rem;
              font-size: 1.6rem;
              font-weight: 800;
            }
            .used {
              font-size: 0.6rem;
              text-decoration: underline;
              cursor: pointer;
            }
            .time-btn {
              font-size: 0.7rem;
              .time {
              }
              .btn {
                margin-top: 0.9rem;
                padding: 0;
                font-size: 0.7rem;
                width: 5.7rem;
                height: 1.1rem;
                line-height: 1.1rem;
                text-align: center;
                background: rgba(255, 255, 255, 0.4);
              }
            }
          }
        }
      }
    }
  }
  .useable-voucher {
    @include title();
    .body {
      padding-top: 3rem;
      padding-bottom: 4rem;
      background: #f4f4f4;
      @include full-width(margin, 960px);
      .vouchers {
        width: 60rem;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        // border: 1px solid #ccc;
        overflow: auto;
        max-height: 32rem;
        /* 设置滚动条的样式 */
        &::-webkit-scrollbar {
          width: 0.3rem;
        }
        /* 滚动槽 */
        &::-webkit-scrollbar-track {
          background: #dcdcdc;
          border-radius: 0.15rem;
        }
        /* 滚动条滑块 */
        &::-webkit-scrollbar-thumb {
          background: #88bc37;
          border-radius: 0.15rem;
        }
        &::-webkit-scrollbar-thumb {
          background: #88bc37;
        }
        .voucher {
          margin: 1rem;
          width: 10rem;
          height: 12rem;
          cursor: pointer;
          // background: #ccc;
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          // align-items: center;

          .content {
            padding: 0 1rem;
            // border-left: 1px dashed #000;
            // border-right: 1px dashed #000;
          }
          .price {
            position: relative;
            font-size: 4rem;
            // text-align: center;
            .number {
              position: relative;
              display: inline;
              .unit {
                position: absolute;
                top: 0.7rem;
                right: -0.5rem;
                width: 1.12rem;
                height: 1.12rem;
                border-radius: 50%;
                background: #fff;
                color: #fb0b0b;
                font-size: 0.6rem;
                text-align: center;
              }
            }
          }
          .name {
            font-size: 1.4rem;
          }
          .condition {
            font-size: 0.6rem;
          }
        }
      }
    }
  }
}
</style>
