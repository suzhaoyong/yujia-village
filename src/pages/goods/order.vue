<template>
  <div>
    <div class="order-box">
      <!-- <div class="navs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>-->
      <div class="order">
        <session-title name="热门课程"></session-title>
        <div class="take-delivery">
          <div class="delivery">
            <div class="header">
              <div class="title">收货信息</div>
              <div class="tips">如下信息</div>
            </div>
            <div class="body">
              <div class="personal">
                <div class="icon-name">
                  <div class="icon"></div>
                  <div class="name">IVAN</div>
                </div>
                <div class="name-phone">xiang - 123123123</div>
                <div class="address">12312</div>
                <div class="currently-deliviery">使用当前地址（默认）</div>
              </div>
              <div class="new-deliviery">
                <div class="form">
                  <div class="item">
                    <div class="key">收货人</div>
                    <div class="value">
                      <input class="form-control input" type="text" placeholder="请输入收货人" />
                    </div>
                  </div>
                  <div class="item">
                    <div class="key">联系电话</div>
                    <div class="value">
                      <input class="form-control input" type="text" placeholder="请输入联系电话" />
                    </div>
                  </div>
                  <div class="item">
                    <div class="key">所在区域</div>
                    <div class="value">
                      <input class="form-control input" type="text" placeholder="请输入所在区域" />
                    </div>
                  </div>
                  <div class="item">
                    <div class="key">详细地址</div>
                    <div class="value">
                      <input class="form-control input" type="text" placeholder="请输入详细地址" />
                    </div>
                  </div>
                  <div class="item">
                    <div class="key">留言</div>
                    <div class="value">
                      <input class="form-control input" type="text" placeholder="请输入留言" />
                    </div>
                  </div>
                </div>
                <div class="new-deliviery-address">使用新地址</div>
              </div>
            </div>
          </div>
          <div class="time-pay">
            <div class="time">
              <div class="header">
                <div class="title">送货时间</div>
                <div class="tips">如不选择按默认发货</div>
              </div>
              <div class="select">
                <div class="item active">送货时间不限(默认)</div>
                <div class="item">仅周一周五送货</div>
                <div class="item">仅节假日/周末送货</div>
              </div>
            </div>
            <div class="pay">
              <div class="header">
                <div class="title">支付方式</div>
                <div class="tips">asdfa</div>
              </div>
              <div class="icon-box">
                <div class="icon"></div>
                <div class="icon"></div>
                <div class="icon"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="goods-box">
          <div class="header">
            <div class="item">商品信息</div>
            <div class="item">颜色尺码</div>
            <div class="item">价格/数量</div>
          </div>
          <div class="body">
            <div class="goods" v-for="(item, index) in 3" :key="index">
              <div class="info">
                <div class="img"></div>
                <div class="title-say">
                  <div class="title">暴走的萝莉 中强度运动内衣女聚拢瑜伽背心美背防震跑步健身bra 拷贝 2</div>
                  <div class="say"></div>
                </div>
              </div>
              <div class="specifications">
                <div class="key-value">
                  <div class="key">颜色:</div>
                  <div class="value">粉色</div>
                </div>
                <div class="key-value">
                  <div class="key">尺码:</div>
                  <div class="value">粉色</div>
                </div>
              </div>
              <div class="price-number">
                <div class="price">￥55</div>
                <div class="number">x1</div>
              </div>
            </div>
          </div>
        </div>
        <div class="sum">
          <div class="back-shopcat">
            <div class="img">
              <img :src="backIcon" alt />
            </div>返回购物车
          </div>
          <div class="count">
            <span class="title">应付金额</span>
            <span class="tips">(不含运费)</span>
            <div class="price">¥115</div>
          </div>
          <div class="sumbit">提交订单</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BackIcon from "@/assets/market/back.png";
import SessionTitle from "./SessionTitle";
import { getUserAddress, getUserOrder, postGoodOrder } from "@/api/market";
export default {
  components: {
    SessionTitle
  },
  data() {
    return {
      backIcon: BackIcon
    };
  }
};
</script>
<style lang="scss" scoped>
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
        width: 44rem;
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
            flex-basis: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .icon-name {
              padding-bottom: 4.3rem;
              .icon {
                width: 4.25rem;
                height: 4.25rem;
                background: #ccc;
                border-radius: 50%;
              }
              .name {
                padding-top: 1rem;
                text-align: center;
              }
            }
            .name-phone {
              align-self: flex-start;
              margin-left: 3.5rem;
              border-bottom: 1px solid #313131;
            }
            .address {
              align-self: flex-start;
              margin-top: 0.3rem;
              margin-left: 3.5rem;
              margin-bottom: 1.6rem;
              border-bottom: 1px solid #313131;
            }
            .currently-deliviery {
              width: 100%;
              // margin-left: 3.5rem;
              padding-left: 3.5rem;
              position: relative;
              &::before {
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
          .new-deliviery {
            flex-shrink: 0;
            flex-basis: 50%;
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
              &::before {
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
              border: 1px solid #ccc;
            }
          }
        }
      }
    }
    .goods-box {
      box-shadow: 0rem 0.05rem 0.1rem #ccc;
      border-bottom: 1px solid #ccc;
      border-top: none;
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
              background: #ccc;
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
