<template>
  <div>
    <div class="order-box" v-show="!playcode.show">
      <!-- <div class="navs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>-->
      <div class="order">
        <session-title name="订单详情"></session-title>
        <div class="take-delivery">
          <div class="delivery">
            <div class="header">
              <div class="title">收货信息</div>
              <div class="tips">如下信息</div>
            </div>
            <div class="body">
              <div class="personal">
                <div class="icon-name">
                  <div class="icon" style="background:#fff;"></div>
                  <div class="name"></div>
                </div>
                <div style="align-self: flex-start; margin-left: 3.5rem;" v-if="address.length > 0">
                  <div class="name-phone">{{`${addressActive.name} - ${addressActive.userAddress}`}}</div>
                  <div class="address">{{addressActive.tel}}</div>

                  <div
                    :class="['currently-deliviery', statusActive('0')]"
                    @click="ruleForm.status = '0'"
                  >使用当前地址（默认）</div>
                </div>
                <div v-else>暂无地址，快去添加一个吧～</div>
              </div>
              <div class="new-deliviery">
                <div class="form">
                  <div class="item">
                    <div class="key">收货人</div>
                    <div class="value">
                      <el-input type="text" v-model="ruleForm.userName" placeholder="请输入收货人"></el-input>
                    </div>
                  </div>
                  <div class="item">
                    <div class="key">联系电话</div>
                    <div class="value">
                      <el-input type="text" v-model="ruleForm.userTel" placeholder="请输入联系电话"></el-input>
                    </div>
                  </div>
                  <div class="item">
                    <div class="key">所在区域</div>
                    <div class="value">
                      <v-distpicker @selected="selectAddress"></v-distpicker>
                    </div>
                  </div>
                  <div class="item">
                    <div class="key">详细地址</div>
                    <div class="value">
                      <el-input type="text" v-model="ruleForm.userAddress" placeholder="请输入详细地址"></el-input>
                    </div>
                  </div>
                  <div class="item">
                    <div class="key">留言</div>
                    <div class="value">
                      <el-input type="textarea" v-model="ruleForm.userMessage" placeholder="请输入留言"></el-input>
                    </div>
                  </div>
                </div>
                <div
                  :class="['new-deliviery-address', statusActive('1')]"
                  @click="ruleForm.status = '1'"
                >使用新地址</div>
              </div>
            </div>
          </div>
          <!-- <div class="time-pay" v-show="false">
            <div class="time">
              <div class="header">
                <div class="title">送货时间</div>
                <div class="tips">如不选择按默认发货</div>
              </div>
              <div class="select">
                <div
                  :class="['item', sendTimeActive('1')]"
                  @click="ruleForm.sendTime = '1'"
                >送货时间不限(默认)</div>
                <div :class="['item', sendTimeActive('2')]" @click="ruleForm.sendTime = '2'">仅周一周五送货</div>
                <div
                  :class="['item', sendTimeActive('3')]"
                  @click="ruleForm.sendTime = '3'"
                >仅节假日/周末送货</div>
              </div>
            </div>
            <div class="pay">
              <div class="header">
                <div class="title">支付方式</div>
                <div class="tips">pay way</div>
              </div>
              <div class="icon-box">
                <div
                  :class="['icon', paymentActive('2')]"
                  :style="`background-image:url(${ruleForm.payment === '2'?icon.alipayActiveIcon : icon.alipayIcon})`"
                  @click="ruleForm.payment = '2'"
                ></div>
                <div
                  :class="['icon', paymentActive('3')]"
                  :style="`background-image:url(${ruleForm.payment === '3'?icon.wechatActiveIcon:icon.wechatIcon})`"
                  @click="ruleForm.payment = '3'"
                ></div>
              </div>
            </div>
          </div>-->
        </div>
        <div class="goods-box">
          <div class="header">
            <div class="item">商品信息</div>
            <div class="item">颜色尺码</div>
            <div class="item">价格/数量</div>
          </div>
          <div class="body">
            <div v-if="goods.length>0">
              <div class="goods" v-for="(item, index) in goods" :key="index">
                <div class="info">
                  <div class="img">
                    <img :src="item.url" alt />
                  </div>
                  <div class="title-say">
                    <div class="title">{{item.describe}}</div>
                    <!-- <div class="say"></div> -->
                  </div>
                </div>
                <div class="specifications">
                  <div class="key-value">
                    <div class="key">颜色:</div>
                    <div class="value">{{item.color}}</div>
                  </div>
                  <div class="key-value">
                    <div class="key">尺码:</div>
                    <div class="value">{{item.size}}</div>
                  </div>
                </div>
                <div class="price-number">
                  <div class="price">￥{{item.sell_price - item.discount}}</div>
                  <div class="number">x{{item.num}}</div>
                </div>
              </div>
            </div>
            <not-found v-if="goods.length === 0" type="not-fond_2" msg="我寻寻觅觅却找不见您购物车的踪迹"></not-found>
          </div>
        </div>
        <div class="sum">
          <div class="back-shopcat" @click="back">
            <div class="img">
              <img :src="icon.backIcon" alt />
            </div>返回购物车
          </div>
          <div class="count">
            <span class="title">应付金额</span>
            <span class="tips">(不含运费)</span>
            <div class="price">¥{{getAllSelectNumberAndPrice.allPrice}}</div>
          </div>
          <div class="sumbit" @click="submitForm">提交订单</div>
        </div>
      </div>
    </div>
    <div class="payway" v-if="playcode.show">
      <payway v-if="playcode.show" :order="playcode.order"></payway>
    </div>
    <!-- <div class="pay-way" v-if="playcode.show" @click="playcode.show = false">
      
      <div class="pay-code">
        <img :src="playcode.src" alt />
      </div>
    </div>-->
  </div>
</template>
<script>
import VDistpicker from "v-distpicker";
import backIcon from "@/assets/market/back.png";

import alipayIcon from "@/assets/order/alipay.png";
import wechatIcon from "@/assets/order/wechat.png";
import alipayActiveIcon from "@/assets/order/alipay_active.png";
import wechatActiveIcon from "@/assets/order/wechat_active.png";
import bankIcon from "@/assets/order/bank.png";
import SessionTitle from "./SessionTitle";
import Payway from "./payway";
import {
  getUserAddress,
  getUserOrder,
  postGoodOrder,
  postGetAlipayCode,
  postGetWechatpayCode,
  postGetAlipayOrder,
  postGetWechatOrder
} from "@/api/market";
export default {
  components: {
    SessionTitle,
    Payway,
    VDistpicker
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
      icon: {
        backIcon,
        alipayIcon,
        alipayActiveIcon,
        wechatIcon,
        wechatActiveIcon,
        bankIcon
      },
      goods: [],
      address: [],
      addressActive: {},
      ruleForm: {
        id: "", // 购物车列表编号
        lid: "", // 商品副列表 编号
        num: "",
        userName: "",
        userTel: "",
        province: "",
        area: "",
        city: "",
        userAddress: "",
        userMessage: "",
        status: "", // 0不是新增地址 1是新增地址
        addressId: "",
        cashId: "", //现金券编号
        cashMoney: "", //现金券使用金额
        couponId: "", //优惠券编号
        fraction: "" //使用积分
      }
    };
  },
  computed: {
    getAllSelectNumberAndPrice() {
      // let allGoods = this.goods.filter(item => item.select);
      let allGoods = this.goods;

      let allPrice = allGoods.reduce((pre, cur) => {
        return (
          parseFloat(pre) + parseInt(cur.num) * (cur.sell_price - cur.discount)
        );
      }, 0);
      return { allPrice: allPrice.toFixed(2), allGoodsNumber: allGoods.length };
    },
    statusActive() {
      return type => {
        return { active: this.ruleForm.status == type };
      };
    },
    sendTimeActive() {
      return type => {
        return { active: this.ruleForm.sendTime == type };
      };
    },
    paymentActive() {
      return type => {
        return { active: this.ruleForm.payment == type };
      };
    }
  },
  mounted() {
    getUserAddress().then(data => {
      this.address = data.address;
      if (data.address.length === 0) {
        this.ruleForm.status = "1";
      } else {
        this.addressActive = data.address[data.address.length-1];
        this.ruleForm.status = "0";
      }
      this.goods = data.goods;
    });
  },
  methods: {
    selectAddress(data) {
      const { area, city, province } = data;
      let params = {
        province: province.value,
        city: city.value,
        area: area.value
      };
      this.ruleForm = Object.assign({}, this.ruleForm, params);
    },
    back() {
      this.$router.go(-1);
    },
    submitForm() {
      const { status } = this.ruleForm;
      let params = Object.assign({}, this.ruleForm);
      if (parseInt(status) === 0) {
        if (this.address.length === 0) {
          this.$message({
            type: "warning",
            message: "请先填写收货信息"
          });
          return;
        }
        const {
          province,
          area,
          city,
          zone,
          address,
          id,
          tel,
          name,
          message
        } = this.addressActive;
        params = Object.assign({}, params, {
          province,
          area,
          city,
          addressId: id,
          userZone: province,
          userAddress: address,
          userName: name,
          userMessage: message,
          userTel: tel
        });
      } else if (parseInt(status) === 1) {
        if (params.userAddress === "") {
          this.$message({
            type: "warning",
            message: "请先填写收货信息"
          });
          return;
        }
      }
      if (params.payment === "") {
        this.$message({
          type: "warning",
          message: "请先选择付款方式"
        });
        return;
      }
      const id = this.goods.map(item => item.id);
      const lid = this.goods.map(item => item.goodListId);
      const num = this.goods.map(item => item.num);
      params = Object.assign({}, params, { id, lid, num });
      postGoodOrder(params).then(data => {
        const { out_trade_no, body, totalPrice } = data;
        this.playcode.show = true;
        this.playcode.order = { out_trade_no, body, totalPrice }
      });
    }
  }
};
</script>
<style scoped>
.order-box >>> .el-input__inner {
  height: 30px !important;
}
.order-box >>> .distpicker-address-wrapper select {
  height: 2em;
  margin-right: 10px;
  font-size: 0.7rem;
  padding:0;
}
</style>
<style lang="scss" scoped>
.pay-way {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  .pay-code {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
  }
}
@mixin no_select() {
  -moz-user-select: -moz-none;
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
img {
  width: 100%;
  height: 100%;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.order-box {
  width: 60rem;
  margin: 0 auto;
  @include no_select();
  .navs {
  }
  .order {
    padding-top: 5rem;
    .take-delivery {
      padding-top: 4.45rem;
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.75rem;
      .delivery {
        width: 100%;
        box-shadow: 0rem 0.05rem 0.1rem #ccc;
        // height: 23.85rem;
        border: 1px solid #ccc;
        .header {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 1.4rem;
          padding-bottom: 2.6rem;
          .title {
            color: #2c2c2c;
            font-size: 0.7rem;
            font-weight: 800;
          }
          .tips {
            color: #999;
            font-size: 0.6rem;
          }
        }
        .body {
          display: flex;
          padding-bottom: 3.2rem;
          .personal {
            flex-shrink: 0;
            flex-basis: 40%;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            .icon-name {
              padding-bottom: 4.3rem;
              .icon {
                width: 4.25rem;
                height: 4.25rem;
                background: #ccc;
                border-radius: 50%;
                background-size: 100% 100%;
              }
              .name {
                padding-top: 1rem;
                text-align: center;
              }
            }
            .name-phone {
              // align-self: flex-start;
              // margin-left: 3.5rem;
              border-bottom: 1px solid #313131;
            }
            .address {
              // align-self: flex-start;
              // margin-left: 3.5rem;
              margin-top: 0.3rem;
              margin-bottom: 1.6rem;
              border-bottom: 1px solid #313131;
            }
            .currently-deliviery {
              width: 100%;
              // margin-left: 3.5rem;
              // padding-left: 3.5rem;
              position: relative;
              &.active::before {
                content: "";
                display: block;
                position: absolute;
                top: 50%;
                left: -1rem;
                transform: translateY(-50%);
                width: 0.55rem;
                height: 0.55rem;
                border-radius: 50%;
                background: #000;
              }
            }
          }
          .new-deliviery {
            flex-shrink: 0;
            flex-basis: 60%;
            border-left: 1px solid #dcdcdc;
            .form {
              padding-bottom: 1.75rem;
              .item {
                display: flex;
                padding: 0.4rem 0;
                .key {
                  width: 6rem;
                  text-align: right;
                  padding-right: 1rem;
                  flex-shrink: 0;
                }
                .value {
                  .input {
                    padding-left: 0.5rem;
                  }
                }
              }
            }
            &-address {
              width: 100%;
              // margin-left: 3.5rem;
              padding-left: 3.5rem;
              position: relative;
              &.active::before {
                content: "";
                display: block;
                position: absolute;
                top: 50%;
                left: 2.5rem;
                transform: translateY(-50%);
                width: 0.55rem;
                height: 0.55rem;
                border-radius: 50%;
                background: #000;
              }
            }
          }
        }
      }
      .time-pay {
        width: 12.6rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .time {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          border: 1px solid #ccc;
          box-shadow: 0rem 0.05rem 0.5rem #5c5c5c;
          .header {
            padding: 1rem 0;
            .title {
              padding-bottom: 0.15rem;
              color: #2c2c2c;
              font-size: 0.7rem;
              font-weight: 800;
            }
            .tips {
              color: #999;
              font-size: 0.6rem;
            }
          }
          .select {
            padding-bottom: 1rem;
            .item {
              cursor: pointer;
              padding: 1rem 0;
              color: #2c2c2c;
              font-size: 0.7rem;
              font-weight: 800;
              position: relative;
              &.active {
                &::before {
                  content: "";
                  display: block;
                  position: absolute;
                  top: 50%;
                  left: -1.5rem;
                  transform: translateY(-50%);
                  width: 0.55rem;
                  height: 0.55rem;
                  border-radius: 50%;
                  background: #000;
                }
              }
            }
          }
        }
        .pay {
          width: 100%;
          padding-top: 1rem;
          padding-bottom: 0.8rem;
          box-shadow: 0rem 0.05rem 0.5rem #5c5c5c;
          border: 1px solid #ccc;
          .header {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-bottom: 1.8rem;
            .title {
              padding-bottom: 0.15rem;
              color: #2c2c2c;
              font-size: 0.7rem;
              font-weight: 800;
            }
            .tips {
              color: #999;
              font-size: 0.6rem;
            }
          }
          .icon-box {
            display: flex;
            justify-content: center;
            .icon {
              width: 1.45rem;
              height: 1.45rem;
              margin: 0 0.4rem;
              background-size: 100% 100%;
              &.active {
                // border: 1px solid #22bbbb;
              }
            }
          }
        }
      }
    }
    .goods-box {
      box-shadow: 0rem 0.05rem 0.1rem #ccc;
      border-bottom: 1px solid #ccc;
      border-top: none;
      overflow: hidden;
      .header {
        display: flex;
        align-items: center;
        height: 3.7rem;
        border: 1px solid #dcdcdc;
        .item {
          padding-left: 3rem;
          &:nth-child(1) {
            flex-basis: 60%;
          }
          &:nth-child(2) {
            flex-basis: 20%;
            padding-left: 5rem;
          }
          &:nth-child(3) {
            flex-basis: 20%;
          }
        }
      }
      .body {
        border: 1px solid #ccc;
        border-top: none;
        border-bottom: none;
        .goods {
          display: flex;
          align-items: center;
          padding-left: 3rem;
          height: 10rem;
          border-bottom: 1px solid #ccc;
          &:last-child {
            border-bottom: none;
          }
          .info {
            flex-basis: 60%;
            display: flex;
            .img {
              width: 7rem;
              height: 8rem;
              // background: #ccc;
            }
            .title-say {
              padding-left: 2.25rem;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .title {
                text-align: left;
              }
              .say {
                width: 100%;
                height: 2.65rem;
                background: #dcdcdc;
                border-radius: 0.5rem;
              }
            }
          }
          .specifications {
            flex-basis: 20%;
            padding-left: 3rem;
            .key-value {
              color: #999;
              display: flex;
              .key {
              }
              .value {
                padding-left: 1rem;
              }
            }
          }
          .price-number {
            flex-basis: 20%;
            padding-left: 3rem;
            display: flex;
            color: #2c2c2c;
            font-size: 0.7rem;
            .price {
              font-weight: 800;
            }
            .number {
              padding-left: 2rem;
            }
          }
        }
      }
    }
    .sum {
      box-shadow: 0rem 0.05rem 0.1rem #ccc;
      margin: 1.3rem 0;
      border: 1px solid #ccc;
      display: flex;
      align-items: center;
      height: 3rem;
      position: relative;
      .back-shopcat {
        color: #2c2c2c;
        font-size: 0.7rem;
        font-weight: 800;
        padding-left: 1.6rem;
        .img {
          width: 1.3rem;
          height: 1rem;
          display: inline-block;
          margin-right: 1rem;
        }
      }
      .count {
        display: flex;
        position: absolute;
        top: 0;
        right: 9rem;
        height: 100%;
        span {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .title {
          color: #2c2c2c;
          font-size: 0.7rem;
          font-weight: 800;
        }
        .tips {
          height: 100%;
          font-size: 0.6rem;
          color: #999;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .price {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-left: 0.3rem;
          color: #ff4400;
        }
      }
      .sumbit {
        position: absolute;
        top: 0;
        right: 0;
        width: 7rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        background: #ff4400;
        height: 100%;
      }
    }
  }
}
</style>
