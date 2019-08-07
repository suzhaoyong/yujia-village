<template>
  <div>
    <div class="sub-menu">
      <div class="select">
        <div class="item" @click="goto('marketDetail')">商品详细分类</div>
        <div class="item" @click="goto('shopCar')">购物车</div>
        <div class="item" @click="goto('collect')">收藏中心</div>
      </div>
      <div class="input-box">
        <input type="text" class="form-control input" placeholder="商品名称" />
      </div>
    </div>
    <div class="market">
      <div class="market_news">
        <div class="market_news-title">
          <div class="market_news-title_main">
            <div class="icon">
              <img :src="titleIcon" alt srcset />
            </div>新品推荐
          </div>
          <div class="market_news-title_tips">Sometimes beauty is so simple</div>
        </div>
        <div class="market_news-content">
          <div class="market_news-content_box">
            <div class="market_news-content_box-lf">
              <div class="goods_img">
                <img :src="market.news_good.big_img" alt="">
              </div>
              <div class="goods_info">
                <div class="goods_info-title">{{market.news_good.name}}</div>
                <div class="goods_info-tips">{{market.news_good.description}}</div>
                <div class="goods_info-price">￥{{market.news_good.price}}</div>
                <div class="goods_info-tags">新款来袭</div>
                <div class="goods_info-time">{{market.news_good.date}}发售</div>
                <div class="goods_info-logo">yoga</div>
              </div>
            </div>
            <div class="market_news-content_box-rh">
              <div class="goods_subimg">
                <img :src="market.news_good.mid_img" alt="">
              </div>
              <div class="goods_subimg">
                <img :src="market.news_good.min_img" alt="">
              </div>
              <div class="goods_buy-btn">立即购买</div>
            </div>
          </div>
        </div>
      </div>
      <div class="market_time">
        <div class="market_time-title">
          <div class="market_time-title_main">
            <div class="icon">
              <img :src="titleIcon" alt srcset />
            </div>限时优惠
          </div>
          <div class="market_time-title_tips">Sometimes beauty is so simple</div>
        </div>
        <div class="market_time-content">
          <div class="market_time-content_box">
            <div class="prev_btn-box">
              <div class="prev_btn"></div>
            </div>
            <div class="goods_list">
              <div class="goods" v-for="(item,index) in 3" :key="index">
                <div class="goods-title">暴走的萝莉 中强度运动内衣女聚拢瑜伽背心 美背防震跑步健身bra</div>
                <div class="goods-price">
                  <div class="goods-price-old">￥210</div>
                  <div class="goods-price-new">￥410</div>
                </div>

                <div class="goods-img">
                  <div class="add-shop-btn">加入购物车</div>
                </div>
              </div>
            </div>
            <div class="next_btn-box">
              <div class="next_btn"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="market_often">
        <div class="market_often-title">
          <div class="market_often-title_main">
            <div class="icon">
              <img :src="titleIcon" alt srcset />
            </div>常用推荐
          </div>
          <div class="market_often-title_tips">Sometimes beauty is so simple</div>
        </div>
        <div class="market_often-content">
          <div class="market_often-content_box">
            <div class="menu">
              <div class="menu-item" v-for="(item, index) in 3" :key="index">
                <div class="menu-title-en">Yogo</div>
                <div class="menu-title-zh">瑜伽</div>
              </div>
            </div>
            <div class="bg-img">
              <div class="img"></div>
              <div class="info">
                <div class="title">爱暇步夏季新款瑜伽服女套装</div>
                <div class="subtitle">年輕時尚，柔软舒适</div>
                <div class="price">
                  <div class="price-old">￥75.00</div>
                  <div class="price-new">￥55.00</div>
                </div>
              </div>
            </div>
            <div class="sm-img">
              <div class="item" v-for="(item, index) in 4" :key="index">
                <div class="img"></div>
                <div class="info">
                  <div class="title">爱暇步夏季新款123124213瑜伽服女套装</div>
                  <div class="subtitle">年輕時尚，柔软舒适</div>
                  <div class="price">
                    <div class="price-old">￥75.00</div>
                    <div class="price-new">￥55.00</div>
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
import TitleIcon from "@/assets/market/market_icon1.png";
export default {
  data() {
    return {
      titleIcon: TitleIcon,
      market: {
        news_good: {}
      }
    };
  },
  mounted() {
    this.getMarketNews();
  },
  methods: {
    getMarketNews() {
      this.axios.get("/market/news").then(({ data }) => {
        this.market.news_good = Object.assign({}, data.data);
      });
    },
    getUserInfo() {
      // this.userInfo = null;
      this.axios.get("/user/userinfo").then(({ data }) => {
        if (data.error === 0) {
          this.userInfo = data.data;
        } else {
          this.userInfo = {};
        }
      });
    },
    goMarketDetail() {
      this.$router.push("/market/detail");
    },
    goto(name, item) {
      let id = item || "all";
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
img{
  width: 100%;
  height: 100%;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.sub-menu {
  width: 60rem;
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
        border: 1px solid #ccc;
        padding-top: 1rem;
        padding-bottom: 1rem;
        &-lf {
          position: relative;
          padding-bottom: 1rem;
          flex-grow: 1;
          .goods_img {
            width: 19rem;
            height: 100%;
            border: 1px solid #ccc;
          }
          .goods_info {
            position: absolute;
            top: 4rem;
            right: 0;
            width: 20rem;
            height: 23rem;
            display: flex;
            flex-direction: column;
            background: #fff;
            border: 1px solid #ccc;
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
              border: 1px solid #313131;
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
              border: 1px solid #ccc;
              align-self: flex-end;
            }
            &:nth-child(2) {
              margin-top: 1rem;
              width: 16rem;
              height: 15rem;
              border: 1px solid red;
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
            border: 1px solid #ccc;
            cursor: default;
          }
        }
      }
    }
  }
  &_time {
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
          border: 1px solid #ccc;
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
          border: 1px solid #ccc;
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
          .goods {
            width: 15rem;
            height: 100%;
            // transform: skewx(10deg) translatex(150px);
            // transform-origin: bottom left;
            margin: 0 1rem;
            border: 1px solid #ccc;
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
              border: 1px solid #ccc;
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
      &_box {
        width: 60rem;
        margin: 0 auto;
        display: flex;
        .menu {
          flex-shrink: 0;
          &-item {
            width: 9.85rem;
            border: 1px solid #ccc;
            padding: 10px;
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
          border: 1px solid #ccc;
          background: #eee;
          padding: 1.3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          .img {
            width: 20rem;
            height: 20rem;
            background: #ccc;
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
            border: 1px solid #ccc;
            .img {
              width: 9rem;
              height: 9rem;
              border-radius: 4px;
              background: #ccc;
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
