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
        <session-title name="好物推荐"></session-title>
        <div class="market_news-content" v-for="item in good_recomment.new" :key="item.id">
          <div class="market_news-content_box">
            <div class="market_news-content_box-lf">
              <div class="goods_img">
                <img :src="item.url_one" alt="商品" />
              </div>
            </div>
            <div class="market_news-content_box-rh">
              <div class="goods_subimg">
                <img :src="item.url_two" alt="商品" />
              </div>
              <div class="goods_info">
                <div class="goods_info-title">{{item.desc}}</div>
                <div class="goods_info-tips">{{item.describe}}</div>
                <div class="goods_info-border"></div>
                <div class="goods_info-price">{{item.sell_price - item.discount}}<span class="rmb">RMB</span> <span v-if="item.discount > 0" style="color:#ccc;text-decoration: line-through;">{{item.sell_price}}<span style="color:#ccc;" class="rmb">RMB</span></span></div>
                <div class="goods_buy-btn" style="cursor: pointer;" @click="viewGoodsDetail(item)" >查看详情</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="market_time">
        <div class="market_time_pull">
          <div class="time_title"><img src="../../assets/yujia.png"/>时尚精品</div>
          <div class="time_brief">Sometimes beauty is so simple</div>
          <div class="time_border"></div>
          <div class="time_border2"></div>
        </div>
        <div class="market_time-content" v-for="item in good_recomment.discount" :key="item.id">
          <div class="after"></div>
          <div class="rhomb"></div>
          <div class="market_time-content_box">
            <div class="market_time-content_box-lf">
              <div class="goods_img">
                <img :src="item.url_one" alt="商品" />
              </div>
            </div>
            <div class="market_time-content_box-rh">
              <div class="goods_info">
                <div class="goods_info-title">{{item.desc}}</div>
                <div class="goods_info-tips">{{item.describe}}</div>
                <div class="goods_info-border"></div>
                <div class="goods_info-price">{{item.sell_price -  item.discount}}<span class="rmb">RMB</span> <span v-if="item.discount > 0" style="color:#ccc;text-decoration: line-through;">{{item.sell_price}}<span style="color:#ccc;" class="rmb">RMB</span></span></div> 
                <div class="goods_buy-btn" style="cursor: pointer;" @click="viewGoodsDetail(item)" >查看详情</div>
              </div>
              <div class="goods_subimg">
                <img :src="item.url_two" alt="商品" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="market_often-btn">
        <div class="goods-detail-btn" @click="goMarketDetail">浏览更多</div>
      </div>
      <div class="market_often">
        <session-title name="常用推荐" brief="Sometimes beauty is so simple"></session-title>
        <div class="market_often-content">
          <div class="market_often-content_box">
            <div class="menu">
              <div
                :class="['menu-item', recommend_menu.select.sort_id == item.sort_id ? 'active' : '']"
                style="cursor: pointer;border-top: 0.1px solid #fff; border-bottom: 0.1px solid #fff;"
                v-for="(item, index) in good_recomment.comment"
                :key="index"
                @click="selectRecommendMenuType(item)"
              >
                <!-- <div class="menu-title-en">{{item.name}}</div> -->
                <div class="menu-title-ens"><i class="el-icon-caret-right" style="font-size:18px;"></i>{{item.ename}}</div>
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
        new:[],
        comment: [],
        discount: [],
        discounts: {}
      },
      // discount: {
      //   single: {
      //     list: [],
      //     cur_pointer: 0
      //   },
      //   double: {
      //     list: [],
      //     cur_pointer: 0
      //   }
      // },
      // discount:[],
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
      // this.discount = data.discount;
      // this.discount.double.list = data.discount.double[0];
      // this.discount.single.list = data.discount.single[0];
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
    // changeDiscountsForu(type, option) {
    //   const obj_temp = {
    //     prev: this.getPrevDiscounts,
    //     next: this.getNextDiscounts
    //   };
    //   obj_temp[option](type);
    // },
    selectRecommendMenuType(item) {
      this.recommend_menu.select = item;
      this.recommend_list = item.data;
      this.recommend_main = item.data[0];
    },
    // getNextDiscounts(type) {
    //   if (
    //     this.discount[type].cur_pointer >=
    //     this.good_recomment.discount[type].length - 1
    //   ) {
    //     this.discount[type].cur_pointer = 0;
    //     this.discount[type].list = this.good_recomment.discount[type][
    //       this.discount[type].cur_pointer
    //     ];
    //     return;
    //   }
    //   this.discount[type].cur_pointer += 1;
    //   this.discount[type].list = this.good_recomment.discount[type][
    //     this.discount[type].cur_pointer
    //   ];
    // },
    // getPrevDiscounts(type) {
    //   if (this.discount[type].cur_pointer <= 0) {
    //     this.discount[type].cur_pointer =
    //       this.good_recomment.discount[type].length - 1;
    //     this.discount[type].list = this.good_recomment.discount[type][
    //       this.discount[type].cur_pointer
    //     ];
    //     return;
    //   }
    //   this.discount[type].cur_pointer -= 1;
    //   this.discount[type].list = this.good_recomment.discount[type][
    //     this.discount[type].cur_pointer
    //   ];
    // },
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
  // width: 99%;
  position: -webkit-sticky;
  position: sticky;
  // z-index: 999;
  left: 0;
  // top: 5.8rem;
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
.market{
  width: 100%;
  &_news{
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
    .market_news-content:nth-child(2n+1){
      width: 100%;
      background: #eee;
      margin-bottom: 3rem;
      height: 36rem;
      overflow: hidden;
      .market_news-content_box{
        width: 60rem;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        position: relative;
        height: 100%;
        .market_news-content_box-lf{
          position: absolute;
          right: 0;
          .goods_img {
            width: 29.5rem;
            height: 29.5rem;
            background: #ccc;
            img{
              width: 100%;
              height: 100%;
              // object-fit: cover;
            }
          }
        }
        .market_news-content_box-rh{
          width: 24rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          .goods_subimg {
            width: 19rem;
            height: 19rem;
            align-self: flex-end;
            background: #ccc;
            img{
              width: 100%;
              height: 100%;
                 /* object-fit: cover; */
            }
          }
          .goods_info{
            width: 24rem;
            text-align: left;
            padding: 50px 0px 0px;
            .goods_info-title{
              color: #2c2c2c;
              font-size:18px;
            }
            .goods_info-tips{
              color: #CACACA;
              font-size:14px;
              font-family:Microsoft YaHei;
              font-weight:400;
              padding: 5px 23px 10px 0px;
            }
            .goods_info-border{
              height: 2px;
              width: 95%;
              background-color: #BFBFBF;
            }
            .goods_info-price{
              align-self: flex-end;
              margin-top: 0.5rem;
              display: flex;
              margin-bottom: 0.5rem;
              .old-price{
                 text-decoration: line-through;
                 font-size:24px;
                  font-family:FZChaoCuHei-M10S;
                  font-weight:bold;
                  color:#999;
                .rmb{
                font-size:16px;
                font-family:FZChaoCuHei-M10S;
                font-weight:bold;
                color:#999;
              }
              }
              .new-price{
                font-size:24px;
                font-family:FZChaoCuHei-M10S;
                font-weight:bold;
                color:#2C2C2C;
                padding-left: 15px;
                .rmb{
                font-size:16px;
                font-family:FZChaoCuHei-M10S;
                font-weight:bold;
                color:#2C2C2C;
              }
              }
            }
            .goods_buy-btn{
              background: #313131;
              color: #fff;
              align-self: flex-end;
              cursor: default;
              width: 6rem;
              text-align: center;
              padding: 0.3rem;
              font-size: 14px;
              border-radius: 15px;
            }
          }
        }
      }
    }
    .market_news-content:nth-child(2n+2){
      width: 100%;
      background: #fff;
      margin-bottom: 3rem;
      .market_news-content_box{
        width: 60rem;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .market_news-content_box-lf{
          position: relative;
          .goods_img {
            width: 29.5rem;
            height: 29.5rem;
            background: #ccc;
            img{
              width: 100%;
              height: 100%;
                 /* object-fit: cover; */
            }
          }
        }
        .market_news-content_box-rh{
          width: 24rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          .goods_subimg {
            width: 19rem;
            height: 19rem;
            align-self: flex-end;
            background: #ccc;
            img{
              width: 100%;
              height: 100%;
                 /* object-fit: cover; */
            }
          }
          .goods_info{
            width: 24rem;
            text-align: left;
            padding: 50px 0px 0px;
            .goods_info-title{
              color: #2c2c2c;
              font-size:18px;
            }
            .goods_info-tips{
              color: #CACACA;
              font-size:14px;
              font-family:Microsoft YaHei;
              font-weight:400;
              padding: 5px 23px 10px 0px;
            }
            .goods_info-border{
              height: 2px;
              width: 95%;
              background-color: #BFBFBF;
            }
            .goods_info-price{
              align-self: flex-end;
              margin-top: 0.5rem;
              display: flex;
              margin-bottom: 0.5rem;
              .old-price{
                 text-decoration: line-through;
                 font-size:24px;
                  font-family:FZChaoCuHei-M10S;
                  font-weight:bold;
                  color:#999;
                .rmb{
                font-size:16px;
                font-family:FZChaoCuHei-M10S;
                font-weight:bold;
                color:#999;
              }
              }
              .new-price{
                font-size:24px;
                font-family:FZChaoCuHei-M10S;
                font-weight:bold;
                color:#2C2C2C;
                padding-left: 15px;
                .rmb{
                font-size:16px;
                font-family:FZChaoCuHei-M10S;
                font-weight:bold;
                color:#2C2C2C;
              }
              }
            }
            .goods_buy-btn{
              background: #313131;
              color: #fff;
              align-self: flex-end;
              cursor: default;
              width: 6rem;
              text-align: center;
              padding: 0.3rem;
              font-size: 14px;
              border-radius: 15px;
            }
          }
        }
      }
    }
  }
  &_time {
    .market_time_pull{
      text-align: center;
      padding-bottom: 3rem;
      padding-top: 5rem;
      position: relative;
      width: 60rem;
      margin: 0 auto;
      .time_title{
        font-size:inherit;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(44,44,44,1);
        position: relative;
        img{
          width: 28px;
          height: 28px;
          position: absolute;
          left: 42%;
          top: 4%;
        }
      }
      .time_brief{
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:#999;
      }
      .time_border{
        height: 1px;
        width: 10rem;
        background: #BFBFBF;
        position: absolute;
        right: 16rem;
        top: 6rem;
      }
      .time_border2{
        height: 1px;
        width: 10rem;
        background: #BFBFBF;
        position: absolute;
        left: 14rem;
        top: 6rem;
      }
    }
    .market_time-content:nth-child(2n+1){
      width: 100%;
      margin-bottom: 5rem;
      height: 36.1rem;
      overflow: hidden;
      z-index: 1;
      position: relative;
      &::before {
          content: "SEX";
          display: block;
          position: absolute;
          right: -8rem;
          bottom: 14rem;
          color: #dfdfdf;
          z-index: 11;
          line-height: 8rem;
          font-size: 13rem;
          font-weight: 800;
          transform: rotate(90deg);
        }
        &::after {
          content: '';
          display: block;
          width: 0;
          height: 0;
          clear: both;
        }
        .after{
          width:40%;
          height:100%;
          position:absolute;
          right: 0;
          border:75px solid;
          border-top:none;
          background-color: #f1f1f1;
          border-color:#f1f1f1;
          border-right-color:transparent;
        }
        .rhomb{
          width: 33%;
          height: 93%;
          border: 2px solid #dcdcdc;
          position: absolute;
          right: 13%;
          top: 4%;
          border-left: #fff;
          &::before{
            content: "";
            position: absolute;
            left: -1%;
            top: 1%;
            width: 3%;
            height: 2px;
            background-color: #dcdcdc;
            transform: rotate(90deg);
          }
          &::after{
            content: "";
            position: absolute;
            left: -1%;
            top: 99%;
            width: 2%;
            height: 2px;
            background-color: #dcdcdc;
            transform: rotate(90deg);
          }
        }
      .market_time-content_box{
        width: 60rem;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        position: relative;
        height: 100%;
        .market_time-content_box-lf{
          position: absolute;
          right: 0;
          .goods_img {
            width: 29.5rem;
            height: 29.5rem;
            background: #ccc;
            margin-top: 3rem;
            img{
              width: 100%;
              height: 100%;
                 /* object-fit: cover; */
            }
          }
        }
        .market_time-content_box-rh{
          width: 24rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
          .goods_subimg {
            width: 19rem;
            height: 19rem;
            align-self: flex-end;
            background: #ccc;
            position: absolute;
            top: 14rem;
            img{
              width: 100%;
              height: 100%;
                 /* object-fit: cover; */
            }
          }
          .goods_info{
            width: 24rem;
            text-align: left;
            padding: 50px 0px 0px;
            .goods_info-title{
              color: #2c2c2c;
              font-size:18px;
            }
            .goods_info-tips{
              color: #CACACA;
              font-size:14px;
              font-family:Microsoft YaHei;
              font-weight:400;
              padding: 5px 23px 10px 0px;
            }
            .goods_info-border{
              height: 2px;
              width: 95%;
              background-color: #BFBFBF;
            }
            .goods_info-price{
              align-self: flex-end;
              margin-top: 0.5rem;
              display: flex;
              margin-bottom: 0.5rem;
              .old-price{
                 text-decoration: line-through;
                 font-size:24px;
                  font-family:FZChaoCuHei-M10S;
                  font-weight:bold;
                  color:#999;
                .rmb{
                font-size:16px;
                font-family:FZChaoCuHei-M10S;
                font-weight:bold;
                color:#999;
              }
              }
              .new-price{
                font-size:24px;
                font-family:FZChaoCuHei-M10S;
                font-weight:bold;
                color:#2C2C2C;
                padding-left: 15px;
                .rmb{
                font-size:16px;
                font-family:FZChaoCuHei-M10S;
                font-weight:bold;
                color:#2C2C2C;
              }
              }
            }
            .goods_buy-btn{
              background: #313131;
              color: #fff;
              align-self: flex-end;
              cursor: default;
              width: 6rem;
              text-align: center;
              padding: 0.3rem;
              font-size: 14px;
              border-radius: 15px;
            }
          }
        }
      }
    }
    .market_time-content:nth-child(2n+2){
      width: 100%;
      background: #fff;
      margin-bottom: 5rem;
      height: 36.1rem;
      z-index: 1;
      position: relative;
      &::before {
          content: "SEX";
          display: block;
          position: absolute;
          left: -8rem;
          bottom: 14rem;
          color: #dfdfdf;
          z-index: 11;
          line-height: 8rem;
          font-size: 13rem;
          font-weight: 800;
          transform: rotate(90deg);
        }
        &::after {
          content: '';
          display: block;
          width: 0;
          height: 0;
          clear: both;
        }
        .after{
          width:40%;
          height:100%;
          position:absolute;
          left: 0;
          border:75px solid;
          border-top:none;
          background-color: #f1f1f1;
          border-color:#f1f1f1;
          border-right-color:transparent;
        }
        .rhomb{
          width: 33%;
          height: 93%;
          border: 2px solid #dcdcdc;
          position: absolute;
          left: 13%;
          top: 4%;
          border-right: #fff;
          &::before{
            content: "";
            position: absolute;
            right: -2%;
            top: 1%;
            width: 3%;
            height: 2px;
            background-color: #dcdcdc;
            transform: rotate(90deg);
          }
          &::after{
            content: "";
            position: absolute;
            right: -1%;
            top: 99%;
            width: 2%;
            height: 2px;
            background-color: #dcdcdc;
            transform: rotate(90deg);
          }
        }
      .market_time-content_box{
        width: 60rem;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        height: 100%;
        .market_time-content_box-lf{
          position: relative;
          .goods_img {
            width: 30rem;
            height: 30rem;
            background: #ccc;
            margin-top: 3rem;
            img{
              width: 100%;
              height: 100%;
                 /* object-fit: cover; */
            }
          }
        }
        .market_time-content_box-rh{
          width: 24rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
          .goods_subimg {
            width: 19rem;
            height: 19rem;
            align-self: flex-end;
            background: #ccc;
            position: absolute;
            top: 14rem;
            img{
              width: 100%;
              height: 100%;
                 /* object-fit: cover; */
            }
          }
          .goods_info{
            width: 24rem;
            text-align: left;
            padding: 50px 0px 0px;
            .goods_info-title{
              color: #2c2c2c;
              font-size:18px;
            }
            .goods_info-tips{
              color: #CACACA;
              font-size:14px;
              font-family:Microsoft YaHei;
              font-weight:400;
              padding: 5px 23px 10px 0px;
            }
            .goods_info-border{
              height: 2px;
              width: 95%;
              background-color: #BFBFBF;
            }
            .goods_info-price{
              align-self: flex-end;
              margin-top: 0.5rem;
              margin-bottom: 0.5rem;
              display: flex;
              .old-price{
                 text-decoration: line-through;
                 font-size:24px;
                  font-family:FZChaoCuHei-M10S;
                  font-weight:bold;
                  color:#999;
                .rmb{
                font-size:16px;
                font-family:FZChaoCuHei-M10S;
                font-weight:bold;
                color:#999;
              }
              }
              .new-price{
                font-size:24px;
                font-family:FZChaoCuHei-M10S;
                font-weight:bold;
                color:#2C2C2C;
                padding-left: 15px;
                .rmb{
                font-size:16px;
                font-family:FZChaoCuHei-M10S;
                font-weight:bold;
                color:#2C2C2C;
              }
              }
            }
            .goods_buy-btn{
              background: #313131;
              color: #fff;
              align-self: flex-end;
              cursor: default;
              width: 6rem;
              text-align: center;
              padding: 0.3rem;
              font-size: 14px;
              border-radius: 15px;
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
        margin-bottom: 10rem;
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
      margin-bottom: 5rem;
      .goods-detail-btn {
        cursor: pointer;
        width: 13rem;
        margin: 0 auto;
        padding: 0.8rem 0.55rem 1.4rem 6rem;
        background: url(../../assets/market/btn-bg.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
