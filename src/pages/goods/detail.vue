<template>
  <div>
    <div class="goods-box">
      <div class="navs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="goods">
        <div class="info">
          <div class="imgs">
            <div class="bg-img"></div>
            <div class="sm-imgs">
              <div class="sm-img" v-for="(item, index) in 10" :key="index"></div>
            </div>
          </div>
          <div class="details">
            <div class="title">2019春夏新款动力瑜珈裤女紧身弹力2019春夏新款动力瑜珈裤女紧身弹力显瘦瑜伽服高腰运动健身服显瘦瑜伽服高腰运动健身服</div>
            <div class="price">
              吊牌价：
              <span>￥55</span>
            </div>
            <div class="preferential">优惠折扣：</div>
            <div class="colors">
              <span>颜色:</span>
              <div class="color" v-for="(item, index) in 3" :key="index">
                <div class="img"></div>
                <div class="color-name">黛蓝色</div>
              </div>
            </div>
            <div class="size">
              <span>尺码:</span>
              <div class="size-list">
                <div class="item">M</div>
                <div class="item">L</div>
                <div class="item">XL</div>
              </div>
            </div>
            <div class="number">
              <span>数量:</span>
              <div class="op">
                <div class="reduce">-</div>
                <div class="num">3</div>
                <div class="add">+</div>
              </div>
            </div>
            <div class="op-btn">
              <div class="add-shop">加入购物车</div>
              <div class="collect-goods">收藏商品</div>
            </div>
            <div class="tips">温馨提示：如果您是初学者，咨询私人瑜伽教练可能会对您的选择有帮助哦!</div>
          </div>
        </div>
        <!-- 产品参数 -->
        <div class="params">
          <div class="title">产品参数</div>
          <div class="content">
            <div class="item" v-for="(item, index) in 5" :key="index">
              <div class="key">商品名称:</div>
              <div class="value">2019238</div>
            </div>
          </div>
        </div>
        <!-- 底部说明 -->
        <div class="explain">
          <div class="title">
            <div class="title-zh">
              <div class="icon">
                <img :src="titleIcon" alt srcset />
              </div>热门课程
            </div>
            <div class="title-en">Sometimes beauty is so simple</div>
          </div>
          <div class="content">
            所售商品均为正品行货，若您收到的商品已损坏请尽快联系我们，我们将根据实际情况免费为您退换货。
            <br />注：图片本身可能有些许色差以及每个人的身高体型不同，如果您有相关疑问，欢迎联系客服。祝您购物愉快！
            <br />我们相信，您选择我们的理由是因为我们更专业！
          </div>
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
      titleIcon: TitleIcon
    };
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.goods-box {
  width: 60rem;
  margin: 0 auto;
  .navs {
  }
  .goods {
    padding-top: 2.4rem;
    .info {
      display: flex;
      .imgs {
        display: flex;
        .bg-img {
          width: 23.45rem;
          height: 23rem;
          border: 1px solid #ccc;
        }
        .sm-imgs {
          margin-left: 0.5rem;
          margin-right: 2.35rem;
          height: 23rem;
          overflow: hidden;
          .sm-img {
            width: 3.45rem;
            height: 4rem;
            margin-bottom: 0.75rem;
            &:last-child {
              margin-bottom: 0;
            }
            border: 1px solid #ccc;
          }
        }
      }
      .details {
        .title {
          margin-bottom: 1rem;
        }
        .price {
          margin-bottom: 1.2rem;
          span {
            font-weight: 800;
          }
        }
        .preferential {
        }
        .colors {
          margin-top: 2rem;
          display: flex;
          align-items: flex-end;
          span {
            padding-right: 1.15rem;
          }
          .color {
            display: flex;
            align-items: flex-end;
            padding-right: 0.95rem;
            cursor: pointer;
            .img {
              width: 1.75rem;
              height: 2rem;
              border: 1px solid #ccc;
            }
            .color-name {
              line-height: 1.1rem;
            }
          }
        }
        .size {
          margin-top: 1.75rem;
          display: flex;
          span {
            padding-right: 1.15rem;
          }
          .size-list {
            display: flex;
            .item {
              margin-right: 0.3rem;
              padding: 0 1rem;
              cursor: pointer;
            }
          }
        }
        .number {
          margin-top: 1.8rem;
          display: flex;
          span {
            padding-right: 1.15rem;
          }
          .op {
            display: flex;
            .reduce {
              width: 3rem;
              height: 1.55rem;
              cursor: pointer;
              display: flex;
              justify-content: center;
              align-items: center;
              border: 1px solid #dcdcdc;
            }
            .num {
              width: 3rem;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .add {
              width: 3rem;
              height: 1.55rem;
              cursor: pointer;
              display: flex;
              justify-content: center;
              align-items: center;
              border: 1px solid #dcdcdc;
            }
          }
        }
        .op-btn {
          display: flex;
          margin-top: 1.8rem;
          .add-shop {
            cursor: pointer;
            width: 6.3rem;
            height: 2.65rem;
            background: #cce198;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 1.5rem;
          }
          .collect-goods {
            cursor: pointer;
            width: 6.3rem;
            height: 2.65rem;
            background: #cce198;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        .tips {
          margin-top: 0.5rem;
          color: #999;
          font-size: 0.6rem;
        }
      }
    }
    .params {
      margin-top: 2rem;
      width: 100%;
      border: 1px solid #bfbfbf;
      .title {
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #bfbfbf;
      }
      .content {
        display: flex;
        flex-wrap: wrap;
        padding: 0.8rem 0;
        .item {
          flex-basis: 50%;
          display: flex;
          padding: 0.8rem 0;
          .key {
            width: 8em;
            text-align: right;
          }
          .value {
          }
        }
      }
    }
    .explain {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 5rem 0;
      position: relative;
      .title {
        // height: 13.5rem;
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
          height: 1px;
          background: #dcdcdc;
          position: absolute;
        }
        &::before {
          top: 50%;
          right: 40%;
          transform: translate(-40%, -50%);
        }
        &::after {
          top: 50%;
          left: 40%;
          transform: translate(40%, -50%);
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
        }
      }
      .content {
        padding: 1rem 4rem 4rem;
        line-height: 3rem;
        color: #999;
        font-size: 0.7rem;
        text-align: center;
      }
    }
  }
}
</style>
