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
      <div class="cash-voucher">
        <session-title name="现金券">
          <span slot="tips" style="color:#999;">(可拆分使用)</span>
        </session-title>
        <div class="body">
          <div class="vouchers">
            <div class="voucher" v-for="(item, index) in info.cash" :key="index">
              <div class="price">
                <div class="sign">¥</div>
                <div class="number">{{item.money}}</div>
              </div>
              <div class="name-time-used">
                <div class="name">{{item.name}}</div>
                <div class="used" v-show="false">详细使用记录</div>
                <div class="time-btn" v-show="true">
                  <div class="time">有效期至 {{item.day}}</div>
                  <div class="btn">使用</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="useable-voucher">
        <session-title name="可领取优惠券"></session-title>
        <div class="body">
          <div class="vouchers">
            <div class="voucher" v-for="(item,index) in info.coupon" :key="index">
              <div class="content">
                <div class="price">
                  <div class="number">
                    {{item.money}} 
                    <div class="unit">元</div>
                  </div>
                </div>
                <div class="name"></div>
                <div class="condition">
                  {{item.coupon.range}}、订单满{{item.coupon.limit_money}}元
                  <!-- <br /> -->
                  可使用
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SessionTitle from "./SessionTitle";
export default {
  components: {
    SessionTitle
  },
  data() {
    return {
      star: 3
    };
  },
  computed: {
    info() {
      const user = sessionStorage.getItem("user");
      return (user && JSON.parse(user)) || {};
    },
  },
  methods: {
    /** 现金券使用记录 */
    usedRecord(id) {
      this.$request(`/personal/home/${id}`).then(data => {});
    }
  }
};
</script>
<style scope>
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
      border: 1px solid #ccc;
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
        max-height: 22rem;
        overflow: auto;
        border: 1px solid #ccc;
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
          background: #ccc;
          color: #fff;
          display: flex;
          justify-content: space-between;
          .price {
            padding-top: 2.3rem;
            padding-left: 1.65rem;
            font-size: 2.55rem;
            font-weight: 800;
            display: flex;
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
            padding-right: 1.75rem;
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
      .vouchers {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        border: 1px solid #ccc;
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
          width: 9rem;
          height: 12rem;
          background: #ccc;
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .content {
            padding: 0 1.5rem;
            border-left: 1px dashed #000;
            border-right: 1px dashed #000;
          }
          .price {
            position: relative;
            font-size: 4rem;
            text-align: center;
            .number {
              position: relative;
              display: inline;
              .unit {
                position: absolute;
                top: 0.7rem;
                right: -1rem;
                width: 1.12rem;
                height: 1.12rem;
                border-radius: 50%;
                background: #fff;
                color: #fb0b0b;
                font-size: 0.6rem;
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
