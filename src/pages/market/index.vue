<template>
  <div>
    <div class="sub-menu">
      <div style="width:60rem; margin:0 auto;">
        <div class="select">
          <div class="item" @click="goto('marketDetail')">商品详细分类</div>
          <div class="item" @click="goto('shopCar')">购物车</div>
          <div class="item" @click="goto('collect')">收藏中心</div>
        </div>
        <!-- <div class="input-box">
          <input type="text" class="form-control input" placeholder="商品名称" />
        </div>-->
      </div>
    </div>
    <div class="market">
      <div class="market_news">
        <session-title name="新品推荐"></session-title>
        <div class="market_news-content">
          <div class="market_news-content_box">
            <div class="market_news-content_box-lf">
              <div class="goods_img">
                <img :src="good_recomment.new.url_one" alt="商品" />
              </div>
              <div class="goods_info">
                <div class="goods_info-title">{{good_recomment.new.desc}}</div>
                <div class="goods_info-tips">{{good_recomment.new.describe}}</div>
                <div class="goods_info-price">￥{{good_recomment.new.sell_price}}</div>
                <div class="goods_info-tags">新款来袭</div>
                <div class="goods_info-time">{{good_recomment.new.new_date}}发售</div>
                <div class="goods_info-logo">yoga</div>
              </div>
            </div>
            <div class="market_news-content_box-rh">
              <div class="goods_subimg">
                <img :src="good_recomment.new.url_two" alt="商品" />
              </div>
              <div class="goods_subimg">
                <img :src="good_recomment.new.url_three" alt="商品" />
              </div>
              <div
                class="goods_buy-btn"
                style="cursor: pointer;"
                @click="viewGoodsDetail(good_recomment.new)"
              >立即购买</div>
            </div>
          </div>
        </div>
      </div>
      <div class="market_time">
        <session-title name="限时优惠" :full="true" brief="Sometimes beauty is so simple"></session-title>
        <div class="market_time-content">
          <div class="market_time-content_box">
            <div class="prev_btn-box">
              <div class="prev_btn hvr-float-shadow" @click="changeDiscountsForu('double','prev')"></div>
            </div>
            <div class="goods_list">
              <transition-group name="fade" tag="div" style="display: flex;">
                <div
                  class="goods hvr-underline-from-left"
                  style="cursor: pointer;"
                  @click="viewGoodsDetail(item)"
                  v-for="(item,index) in discount.double.list"
                  :key="item.id"
                >
                  <div class="goods-img">
                    <img :src="item.discount_url" alt />
                  </div>
                  <div class="goods-title">{{item.describe}}</div>
                  <div class="goods-price">
                    <div class="goods-price-old">￥{{item.sell_price}}</div>
                    <div class="goods-price-new">￥{{item.sell_price - item.discount}}</div>
                  </div>

                  <div class="add-shop-btn">查看详情</div>
                </div>
              </transition-group>
            </div>
            <div class="next_btn-box">
              <div class="next_btn hvr-float-shadow" @click="changeDiscountsForu('double','next')"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="market_time">
        <div class="market_time-content">
          <div class="market_time-content_box">
            <div class="prev_btn-box">
              <div class="prev_btn hvr-float-shadow" @click="changeDiscountsForu('single','prev')"></div>
            </div>
            <div class="goods_list">
              <transition-group name="fade" tag="div" style="display: flex;">
                <div
                  class="goods bg hvr-underline-from-left"
                  style="cursor: pointer;"
                  @click="viewGoodsDetail(item)"
                  v-for="(item,index) in discount.single.list"
                  :key="item.id"
                >
                  <div class="goods-img bg">
                    <img :src="item.discount_url" alt />
                  </div>
                  <div class="goods-title">{{item.describe}}</div>
                  <div class="goods-price">
                    <div class="goods-price-old">￥{{item.sell_price}}</div>
                    <div class="goods-price-new">￥{{item.sell_price - item.discount}}</div>
                  </div>

                  <div class="add-shop-btn">查看详情</div>
                </div>
              </transition-group>
            </div>
            <div class="next_btn-box">
              <div class="next_btn hvr-float-shadow" @click="changeDiscountsForu('single','next')"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="market_often">
        <session-title name="常用推荐" brief="Sometimes beauty is so simple"></session-title>
        <div class="market_often-content">
          <div class="market_often-content_box">
            <div class="menu">
              <div
                :class="['menu-item', recommend_menu.select.sort_id == item.sort_id ? 'active' : '']"
                style="cursor: pointer;"
                v-for="(item, index) in good_recomment.comment"
                :key="index"
                @click="selectRecommendMenuType(item)"
              >
                <!-- <div class="menu-title-en">{{item.name}}</div> -->
                <div class="menu-title-zh">{{item.name}}</div>
              </div>
            </div>
            <div class="bg-img" style="cursor: pointer;" @click="viewGoodsDetail(recommend_main)">
              <div class="img">
                <img :src="recommend_main.cover_url" alt />
              </div>
              <div class="info">
                <div class="title">{{recommend_main.desc}}</div>
                <div class="subtitle">{{recommend_main.describe}}</div>
                <div class="price">
                  <div class="price-old">￥{{recommend_main.sell_price}}</div>
                  <div class="price-new">￥{{recommend_main.sell_price - recommend_main.discount}}</div>
                </div>
              </div>
            </div>
            <div class="sm-img">
              <div
                class="item"
                style="cursor: pointer;"
                @click="viewGoodsDetail(item)"
                v-for="(item, index) in recommend_list"
                :key="index"
              >
                <div class="img">
                  <img :src="item.cover_url" alt />
                </div>
                <div class="info">
                  <div class="title">{{item.desc}}</div>
                  <div class="subtitle">{{item.describe}}</div>
                  <div class="price">
                    <div class="price-old">￥{{item.sell_price}}</div>
                    <div class="price-new">￥{{item.sell_price - item.discount}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="market_often-btn">
          <div class="goods-detail-btn" @click="goMarketDetail">商品详细分类</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getGoodRecomment } from "@/api/market";
import Bus from "@/utils/Bus";
import { mapGetters } from "vuex";
import alipayActiveIcon from "@/assets/order/alipay_active.png";
export default {
  components: {},
  data() {
    return {
      good_recomment: {
        new: { new_url_one: "" },
        comment: [],
        discount: {},
        discounts: {}
      },
      discount: {
        single: {
          list: [],
          cur_pointer: 0
        },
        double: {
          list: [],
          cur_pointer: 0
        }
      },
      market: {
        news_good: {}
      },
      discounts_good: [],
      recommend_menu: {
        select: {}
      },
      recommend_main: {},
      recommend_list: [],
      type_list: []
    };
  },
  computed: {
    ...mapGetters(["info"])
  },
  mounted() {
    getGoodRecomment().then(data => {
      this.good_recomment.new = data.new;
      this.good_recomment.comment = data.comment;
      this.good_recomment.discount = data.discount;
      this.discount.double.list = data.discount.double[0];
      this.discount.single.list = data.discount.single[0];
      this.recommend_main = data.comment[0].data[0];
      this.recommend_menu.select = data.comment[0];
      this.recommend_list = data.comment[0].data;
    });
  },
  methods: {
    viewGoodsDetail(goods) {
      this.$router.push({
        name: "detailGoods",
        params: {
          id: goods.id || goods.good_id
        }
      });
    },
    changeDiscountsForu(type, option) {
      const obj_temp = {
        prev: this.getPrevDiscounts,
        next: this.getNextDiscounts
      };
      obj_temp[option](type);
    },
    selectRecommendMenuType(item) {
      this.recommend_menu.select = item;
      this.recommend_list = item.data;
      this.recommend_main = item.data[0];
    },
    getNextDiscounts(type) {
      if (
        this.discount[type].cur_pointer >=
        this.good_recomment.discount[type].length - 1
      ) {
        this.discount[type].cur_pointer = 0;
        this.discount[type].list = this.good_recomment.discount[type][
          this.discount[type].cur_pointer
        ];
        return;
      }
      this.discount[type].cur_pointer += 1;
      this.discount[type].list = this.good_recomment.discount[type][
        this.discount[type].cur_pointer
      ];
    },
    getPrevDiscounts(type) {
      if (this.discount[type].cur_pointer <= 0) {
        this.discount[type].cur_pointer =
          this.good_recomment.discount[type].length - 1;
        this.discount[type].list = this.good_recomment.discount[type][
          this.discount[type].cur_pointer
        ];
        return;
      }
      this.discount[type].cur_pointer -= 1;
      this.discount[type].list = this.good_recomment.discount[type][
        this.discount[type].cur_pointer
      ];
    },
    goMarketDetail() {
      this.$router.push("/market/detail");
    },
    goto(name, item) {
      let id = item || "all";
      if (name !== "marketDetail" && !this.info.user.name) {
        Bus.$emit("login", true);
        return;
      }
      this.$router.push({
        name,
        params: {
          id
        }
      });
    }
  }
};
</script>
<style scoped>
.hvr-underline-from-left:before {
  background: #2c2c2c;
  overflow: visible;
}
</style>
<style lang="scss" scoped>
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
.line {
  height: 3rem;
  margin-top: 1rem;
  background: #eee;
  @include full-width(margin, 960px);
}
@mixin spare() {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
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

.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
}
.fade-enter, .fade-leave-to
/* .fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.fade-complete-item {
  transition: all 0.6s;
  display: inline-block;
  // margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0.4;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
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
.sub-menu {
  // width: 80vw;
  width: 99%;
  position: fixed;
  z-index: 999;
  left: 0;
  top: 5.8rem;
  height: 5rem;
  padding: 0 1rem;
  background: #fff;
  box-shadow: 0 0.2rem 0.5rem rgba(143, 143, 143, 0.4);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .select {
    display: flex;
    cursor: pointer;
    .item {
      margin-right: 2.15rem;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .input-box {
    width: 13rem;
    height: 2.55rem;
    .input {
      padding-left: 1.35rem;
      height: 100%;
    }
  }
}
.market {
  width: 100%;
  &_news {
    &-title {
      height: 13.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      &_main {
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
      &_tips {
        padding-top: 1.85rem;
      }
    }
    &-content {
      width: 100%;
      background: #eee;
      &_box {
        // height: 40rem;
        width: 60rem;
        margin: 0 auto;
        display: flex;
        // border: 1px solid #ccc;
        padding-top: 0.3rem;
        padding-bottom: 1rem;
        &-lf {
          position: relative;
          padding-bottom: 1rem;
          flex-grow: 1;
          .goods_img {
            width: 19rem;
            height: 100%;
            // border: 1px solid #ccc;
            position: relative;
            z-index: 1;
            &::before {
              content: "SEX";
              display: block;
              position: absolute;
              left: 22rem;
              bottom: 16rem;
              color: #dfdfdf;
              z-index: 11;
              line-height: 8rem;
              font-size: 12rem;
              font-family: -webkit-pictograph;
              font-weight: 800;
              transform: rotate(90deg);
            }
            &::after {
              content: "SEX";
              display: block;
              position: absolute;
              color: #dfdfdf;
              z-index: -1;
              bottom: 0;
              left: 12rem;
              padding: 0;
              margin: 0;
              line-height: 8rem;
              font-size: 12rem;
              font-family: -webkit-pictograph;
              font-weight: 800;
            }
          }
          .goods_info {
            position: absolute;
            z-index: 4;
            top: 4rem;
            right: 4rem;
            width: 20rem;
            height: 23rem;
            display: flex;
            flex-direction: column;
            background: #fff;
            // border: 1px solid #ccc;
            border-top: 1.75rem solid #7d7d7d;
            border-bottom: 1.75rem solid #7d7d7d;
            border-left: 1.4rem solid #7d7d7d;
            border-right: 1.4rem solid #7d7d7d;
            padding: 1.15rem;
            &-title {
              color: #2c2c2c;
            }
            &-tips {
              color: #999999;
              font-size: 0.6rem;
            }
            &-price {
              align-self: flex-end;
              padding: 2rem 3rem 1rem 1rem;
              // border: 1px solid #313131;
              margin-right: -1.95rem;
            }
            &-tags {
              color: #484848;
              font-weight: 600;
              font-family: MFLiHei_Noncommercial-Regular;
            }
            &-time {
              font-size: 0.6rem;
            }
            &-logo {
              padding-left: 2rem;
              font-family: FZCCHJW--GB1-0;
              font-weight: 800;
              color: rgba(44, 44, 44, 1);
              align-self: flex-end;
              border-bottom: 0.2rem solid #313131;
            }
          }
        }
        &-rh {
          width: 22rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          .goods_subimg {
            &:nth-child(1) {
              width: 21rem;
              height: 19rem;
              // border: 1px solid #ccc;
              align-self: flex-end;
            }
            &:nth-child(2) {
              margin-top: 1rem;
              width: 16rem;
              height: 15rem;
              // border: 1px solid red;
              align-self: flex-end;
            }
          }
          .goods_buy-btn {
            background: #313131;
            color: #fff;
            margin-top: 1rem;
            margin-right: 2rem;
            align-self: flex-end;
            padding: 1rem 2rem;
            // border: 1px solid #ccc;
            cursor: default;
          }
        }
      }
    }
  }
  &_time {
    background: #eee;
    width: 60rem;
    margin: 0 auto;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      right: 100%;
      bottom: 0;
      width: 100vw;
      height: 3rem;
      background: #eee;
    }
    &-content {
      padding-bottom: 3rem;
      overflow: hidden;
      &_box {
        display: flex;
        justify-content: space-around;
        .prev_btn-box {
          margin-left: -7rem;
          z-index: 20;
          position: relative;
          width: 13rem;
          background: #fff;
          transform: skewX(15deg);
          .prev_btn {
            width: 4rem;
            height: 2rem;
            transform: skewX(-15deg);
            background: url(../../assets/market/prev.png) no-repeat;
            background-size: 100% 100%;
            position: absolute;
            bottom: 2rem;
            right: 1rem;
          }
        }
        .next_btn-box {
          background: #fff;
          transform: skewX(15deg);
          position: relative;
          margin-right: -7rem;
          width: 10rem;
          // transform: skewx(10deg) translatex(150px);
          // transform-origin: bottom left;
          .next_btn {
            width: 4rem;
            height: 2rem;
            transform: skewX(-15deg);
            background: url(../../assets/market/next.png) no-repeat;
            background-size: 100% 100%;
            position: absolute;
            left: 1rem;
            top: 2rem;
          }
        }
        .goods_list {
          display: flex;
          width: 48rem;
          justify-content: center;
          height: 27.65rem;
          .goods {
            width: 14rem;
            height: 100%;
            overflow: visible;
            // background: #fff;
            transform: skewX(15deg);
            padding: 0 1rem;
            margin: 0 1rem;
            flex-shrink: 0;
            &.bg {
              .goods-title {
                color: #fff;
              }
              .goods-price-old {
                color: #999999;
              }
              .goods-price-new {
                color: #fff;
              }
              .add-shop-btn {
                color: #2c2c2c;
                &::before {
                  background: #fcfcfc;
                }
              }
            }
            div {
              transform: skewX(-15deg);
            }
            &-title {
              font-weight: 600;
              margin-top: 1rem;
              color: #2c2c2c;
              padding: 0 0.3rem;
            }
            &-price {
              padding-top: 1.5rem;
              padding-bottom: 1rem;
              padding-left: 0.3rem;
              display: flex;
              &-old {
                color: #999999;
                text-decoration: line-through;
              }
              &-new {
                color: #2c2c2c;
              }
            }
            position: relative;
            .add-shop-btn {
              position: absolute;
              top: 10rem;
              left: -0.4rem;
              color: #fff;
              font-size: 0.7rem;
              line-height: 2rem;
              width: 5rem;
              text-align: center;
              &::before {
                content: "";
                transform: skewX(15deg);
                width: 5rem;
                height: 2rem;
                background-color: #5a5a5a;
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                position: absolute;
                z-index: -1;
              }
            }
            &-img {
              position: absolute;
              &.bg {
                position: absolute;
              }
              img {
                transform: skewX(-6deg);
                margin-left: -6rem;
                width: 24rem;
              }
            }
          }
        }
      }
    }
  }
  &_often {
    &-title {
      height: 13.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      &_main {
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
      &_tips {
        padding-top: 1.85rem;
      }
    }
    &-content {
      @include no_select();
      &_box {
        width: 60rem;
        margin: 0 auto;
        display: flex;
        .menu {
          flex-shrink: 0;
          &-item {
            width: 9.85rem;
            // border: 1px solid #ccc;
            padding: 10px;
            cursor: default;
            &.active {
              background: #839f6b;
              color: #fff;
            }
            &:hover {
              background: #839f6b;
              color: #fff;
            }
            .menu-title-en {
              position: relative;
              padding-left: 10px;
              margin-left: 10px;
              width: 100%;
              &::before {
                content: "";
                display: block;
                position: absolute;
                top: 0;
                left: -10px;
                border: 0.5rem solid transparent;
                border-left-color: #313131;
              }
            }
            .menu-title-zh {
              padding-left: 10px;
              margin-left: 10px;
            }
          }
        }
        .bg-img {
          flex-shrink: 0;
          width: 21.6rem;
          height: 29.15rem;
          margin-left: 3rem;
          margin-right: 1.8rem;
          // border: 1px solid #ccc;
          background: #eee;
          padding: 1.3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: default;
          .img {
            width: 20rem;
            height: 20rem;
            // background: #ccc;
          }
          .info {
            .title {
              padding-top: 1.45rem;
              color: #2c2c2c;
            }
            .subtitle {
              color: #999999;
              font-size: 0.6rem;
              text-align: center;
            }
            .price {
              padding-top: 0.5rem;
              display: flex;
              &-old {
                color: #999;
                font-size: 0.6rem;
                text-decoration: line-through;
              }
              &-new {
                padding-left: 0.4rem;
                color: #999;
                font-size: 0.7rem;
              }
            }
          }
        }
        .sm-img {
          display: flex;
          flex-wrap: wrap;
          .item {
            cursor: default;
            &:nth-of-type(1) {
              margin-right: 2.85rem;
            }
            &:nth-of-type(3) {
              margin-right: 2.85rem;
              align-self: flex-end;
            }
            &:nth-of-type(4) {
              align-self: flex-end;
            }
            flex-shrink: 0;
            width: 10rem;
            height: 14rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            // border: 1px solid #ccc;
            .img {
              width: 9rem;
              height: 9rem;
              border-radius: 4px;
              // background: #ccc;
              box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
            }
            .info {
              padding-top: 0.6rem;
              padding-left: 0.3rem;
              padding-right: 0.3rem;
              .title {
                width: 9rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: #2c2c2c;
                font-size: 0.7rem;
              }
              .subtitle {
                color: #999;
                font-size: 0.6rem;
                @include spare();
              }
              .price {
                padding-top: 0.5rem;
                display: flex;
                color: #999;
                &-old {
                  font-size: 0.6rem;
                  text-decoration: line-through;
                }
                &-new {
                  padding-left: 0.3rem;
                  font-weight: 800;
                  font-size: 0.7rem;
                }
              }
            }
          }
        }
      }
    }
    &-btn {
      margin-top: 5rem;
      margin-bottom: 9rem;
      .goods-detail-btn {
        cursor: pointer;
        width: 13rem;
        margin: 0 auto;
        padding: 0.8rem 0.55rem 1.4rem 5.4rem;
        background: url(../../assets/market/btn-bg.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
