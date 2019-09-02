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
        </div> -->
      </div>
    </div>
    <div class="market">
      <div class="market_news">
        <session-title name="新品推荐"></session-title>
        <div class="market_news-content">
          <div class="market_news-content_box">
            <div class="market_news-content_box-lf">
              <div class="goods_img">
                <img :src="good_recomment.new[0].new_url_one" alt />
              </div>
              <div class="goods_info">
                <div class="goods_info-title">{{good_recomment.new[0].desc}}</div>
                <div class="goods_info-tips">{{good_recomment.new[0].describe}}</div>
                <div class="goods_info-price">￥{{good_recomment.new[0].sell_price}}</div>
                <div class="goods_info-tags">新款来袭</div>
                <div class="goods_info-time">{{good_recomment.new[0].new_date}}发售</div>
                <div class="goods_info-logo">yoga</div>
              </div>
            </div>
            <div class="market_news-content_box-rh">
              <div class="goods_subimg">
                <img :src="good_recomment.new[0].new_url_two" alt />
              </div>
              <div class="goods_subimg">
                <img :src="good_recomment.new[0].new_url_three" alt />
              </div>
              <div class="goods_buy-btn" style="cursor: pointer;" @click="viewGoodsDetail(good_recomment.new[0])">立即购买</div>
            </div>
          </div>
        </div>
      </div>

        <div class="market-main">
          <div class="market-main-div1">
            <img src="../../assets/market/prev.png" class="img-market-prev"/>
            <div class="market-div1-li">
              <img src="../../assets/hhh.png" class="img"/>
              <div class="market-div1-text">
                <p class="p1">暴走的萝莉 中强度运动内衣女聚拢瑜伽背心 美背防震跑步健身bra</p>
                <p class="p2"><span class="through">￥210</span><span class="through2">￥110</span></p>
              </div>
              <div class="market-div1-butt">
                <el-button type="text" class="button-text">加入购物车</el-button>
              </div>
              <div class="market-kong"></div>
              <div class="market-kong2"></div>
            </div>
            <div class="market-div1-li">
              <img src="../../assets/hhh.png" class="img"/>
              <div class="market-div1-text">
                <p class="p1">暴走的萝莉 中强度运动内衣女聚拢瑜伽背心 美背防震跑步健身bra</p>
                <p class="p2"><span class="through">￥452</span><span class="through2">￥342</span></p>
              </div>
              <div class="market-div1-butt">
                <el-button type="text" class="button-text">加入购物车</el-button>
              </div>
              <div class="market-kong"></div>
              <div class="market-kong2"></div>
            </div>
            <div class="market-div1-li">
              <img src="../../assets/hhh.png" class="img"/>
              <div class="market-div1-text">
                <p class="p1">暴走的萝莉 中强度运动内衣女聚拢瑜伽背心 美背防震跑步健身bra</p>
                <p class="p2"><span class="through">￥234</span><span class="through2">￥142</span></p>
              </div>
              <div class="market-div1-butt">
                <el-button type="text" class="button-text">加入购物车</el-button>
              </div>
              <div class="market-kong"></div>
              <div class="market-kong2"></div>
            </div>
            <img src="../../assets/market/next.png" class="img-market-next"/>
          </div>
        </div>

      <div class="market_time">
        <session-title name="限时优惠" brief="Sometimes beauty is so simple"></session-title>
        <div class="market_time-content">
          <div class="market_time-content_box">
            <div class="prev_btn-box">
              <div class="prev_btn" @click="changeDiscountsForu('prev')"></div>
            </div>
            <transition name="list-complete">
              <div class="goods_list">
                <div
                  class="goods"
                  style="cursor: pointer;"
                  @click="viewGoodsDetail(item)"
                  v-for="(item,index) in good_recomment.discounts.re"
                  :key="index"
                >
                  <div class="goods-title">{{item.describe}}</div>
                  <div class="goods-price">
                    <div class="goods-price-old">￥{{item.sell_price}}</div>
                    <div class="goods-price-new">￥{{item.sell_price - item.discount}}</div>
                  </div>

                  <div class="goods-img">
                    <img :src="item.discount_url" alt />
                    <div class="add-shop-btn">加入购物车</div>
                  </div>
                </div>
              </div>
            </transition>
            <div class="next_btn-box">
              <div class="next_btn" @click="changeDiscountsForu('next')"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="market_time" style="margin-top: 10rem;">
        <div class="market_time-content">
          <div class="market_time-content_box">
            <div class="prev_btn-box">
              <div class="prev_btn" @click="changeDiscountsForu('prev')"></div>
            </div>
            <transition name="list-complete">
              <div class="goods_list">
                <div
                  class="goods"
                  style="cursor: pointer;"
                  @click="viewGoodsDetail(item)"
                  v-for="(item,index) in good_recomment.discounts.de"
                  :key="index"
                >
                  <div class="goods-title">{{item.describe}}</div>
                  <div class="goods-price">
                    <div class="goods-price-old">￥{{item.sell_price}}</div>
                    <div class="goods-price-new">￥{{item.sell_price - item.discount}}</div>
                  </div>

                  <div class="goods-img">
                    <img :src="item.discount_url" alt />
                    <div class="add-shop-btn">加入购物车</div>
                  </div>
                </div>
              </div>
            </transition>
            <div class="next_btn-box">
              <div class="next_btn" @click="changeDiscountsForu('next')"></div>
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
import SessionTitle from "./SessionTitle";
import { getGoodRecomment } from "@/api/market";
import Bus from "@/utils/Bus";
import alipayActiveIcon from "@/assets/order/alipay_active.png";
export default {
  components: {
    SessionTitle
  },
  data() {
    return {
      good_recomment: {
        new: [{ new_url_one: "" }],
        comment: [],
        discount: [],
        discounts: {}
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
    info() {
      const user = sessionStorage.getItem("user");
      return user && JSON.parse(user).user;
    }
  },
  mounted() {
    getGoodRecomment().then(data => {
      this.good_recomment = data;
      this.good_recomment.discounts = {};
      this.good_recomment.discounts.de = data.discount.slice(0, 3);
      this.good_recomment.discounts.re = data.discount.slice(3);
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
    changeDiscountsForu(option) {
      const obj_temp = {
        prev: this.getPrevDiscounts,
        next: this.getNextDiscounts
      };
      obj_temp[option]();
    },
    selectRecommendMenuType(item) {
      this.recommend_menu.select = item;
      this.recommend_list = item.data;
      this.recommend_main = item.data[0];
    },
    getPrevDiscounts() {
      this.getMarketDiscounts();
    },
    getNextDiscounts() {
      this.getMarketDiscounts();
    },
    getMarketNews() {},
    getUserInfo() {},
    goMarketDetail() {
      this.$router.push("/market/detail");
    },
    goto(name, item) {
      let id = item || "all";
      if (name !== "marketDetail" && !this.info) {
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
<style lang="scss" scoped>
.market-main{
    width: 100%;
    height: 25rem;
    margin-top: 2rem;
    background-color: #fff;
    .market-main-div1{
      width: 60rem;
      height: 100%;
      margin: 0 auto;
      position: relative;
      .img-market-prev{
          width: 5.3rem;
          height: 1.7rem;
          position: absolute;
          right: 91%;
          bottom: 8%;
      }
      .img-market-next{
           width: 5.3rem;
          height: 1.7rem;
          position: absolute;
          right: 0%;
          top: 8%;
      }
      .market-div1-li{
        width: 19rem;
        height: 100%;
        position: relative;
        float: left;
        margin-left: 0.8rem;
        .img{
          width: 100%;
          height: 100%;
        }
        .market-div1-text{
          position: absolute;
          top: 2rem;
          width: 9rem;
          right: 38%;
          .p1{
            font-size:0.8rem;
            font-family:Microsoft YaHei;
            font-weight:bold;
            color: #000;
          }
          .p2{
            font-size:0.9rem;
            padding-top: 0.7rem;
            .through{
              font-family:Microsoft YaHei;
              font-weight:400;
              font-style:italic;
              color: #999;
              text-decoration: line-through;
            }
            .through2{
              font-family:Microsoft YaHei;
              font-weight:400;
              font-style:italic;
              color: #2c2c2c;
              padding-left: 0.5rem;
            }
          }
        }
        .market-div1-butt{
          background-color: #313131;
          opacity: 0.8;
          width: 6.2rem;
          height: 2rem;
          position: absolute;
          top: 9rem;
          line-height: 2rem;
          right: 50%;
          text-align: center;
          transform:skew(20deg);   
          -webkit-transform: skew(20deg);   
          -moz-transform: skew(20deg);   
          -o-transform:skew(20deg);   
          -ms-transform:skew(20deg);
          .button-text{
            font-size:0.8rem;
            font-family:Microsoft YaHei;
            font-weight:400;
            color: #fff;
            display: inline-block;
            transform:skew(-20deg);   
            -webkit-transform: skew(-20deg);   
            -moz-transform: skew(-20deg);   
            -o-transform:skew(-20deg);   
            -ms-transform:skew(-20deg); 
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .market-kong{
            width: 2rem;
            position: absolute;
            top: 0%;
            left: 11%;
            height: 100%;
            background-color: #eee;
            transform:skew(18deg);   
            -webkit-transform: skew(18deg);   
            -moz-transform: skew(18deg);   
            -o-transform:skew(18deg);   
            -ms-transform:skew(18deg);
        }
        .market-kong2{
            width: 2rem;
            position: absolute;
            top: 0%;
            left: 79%;
            height: 100%;
            background-color: #eee;
            transform:skew(18deg);   
            -webkit-transform: skew(18deg);   
            -moz-transform: skew(18deg);   
            -o-transform:skew(18deg);   
            -ms-transform:skew(18deg);
        }
      }
    }
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
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
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
    width: 80vw;
    margin: 0 auto;
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
      &_box {
        display: flex;
        justify-content: space-around;
        .prev_btn-box {
          // border: 1px solid #ccc;
          position: relative;
          width: 10rem;
          // margin-left: -10rem;
          // transform: skewx(10deg) translatex(150px);
          // transform-origin: bottom left;
          .prev_btn {
            width: 4rem;
            height: 2rem;
            background: url(../../assets/market/prev.png) no-repeat;
            background-size: 100% 100%;
            position: absolute;
            bottom: 2rem;
            left: 1rem;
          }
        }
        .next_btn-box {
          // border: 1px solid #ccc;
          position: relative;
          width: 10rem;
          // transform: skewx(10deg) translatex(150px);
          // transform-origin: bottom left;
          .next_btn {
            width: 4rem;
            height: 2rem;
            background: url(../../assets/market/next.png) no-repeat;
            background-size: 100% 100%;
            position: absolute;
            left: 1rem;
            top: 2rem;
          }
        }
        .goods_list {
          display: flex;
          // margin-left: -8rem;
          height: 34.65rem;
          width: 80vw;
          overflow-x: auto;
          .goods {
            width: 15rem;
            height: 100%;
            // transform: skewx(10deg) translatex(150px);
            // transform-origin: bottom left;
            margin: 0 1rem;
            // border: 1px solid #ccc;
            flex-shrink: 0;
            overflow: hidden;
            &-title {
              font-weight: 600;
              margin-top: 1rem;
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
            &-img {
              height: 26.55rem;
              // border: 1px solid #ccc;
              position: relative;
              .add-shop-btn {
                width: 9rem;
                height: 2rem;
                background-color: #313131;
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                position: absolute;
                top: 2rem;
                left: -0.3rem;
                z-index: 4;
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
