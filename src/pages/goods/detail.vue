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
            <div class="bg-img">
              <img :src="chooseItem.activeImg.img" alt />
            </div>
            <div class="sm-imgs">
              <div
                class="sm-img"
                v-for="(item, index) in goods.imgs"
                :key="index"
                @click="chooseActiveImg(item)"
              >
                <img :src="item.img" alt />
              </div>
            </div>
          </div>
          <div class="details">
            <div class="title">{{goods.name}}</div>
            <div class="price">
              吊牌价：
              <span>￥{{goods.price}}</span>
            </div>
            <div class="preferential">优惠折扣：</div>
            <div class="colors">
              <span>颜色:</span>
              <div
                :class="['color', item.name === chooseItem.color.name ? 'active': '']"
                v-for="(item, index) in goods.colors"
                :key="index"
                @click="chooseColor(item)"
              >
                <div class="img">
                  <img :src="item.img" alt />
                </div>
                <div class="color-name">{{item.name}}</div>
              </div>
            </div>
            <div class="size">
              <span>尺码:</span>
              <div class="size-list">
                <div
                  :class="['item', item === chooseItem.size ? 'active': '']"
                  v-for="(item, index) in goods.size"
                  :key="index"
                  @click="chooseSize(item)"
                >{{item}}</div>
              </div>
            </div>
            <div class="number">
              <span>数量:</span>
              <div class="op">
                <div class="reduce" @click="numberOpFor('reduce', 1)">-</div>
                <div class="num">{{chooseItem.number}}</div>
                <div class="add" @click="numberOpFor('add', 1)">+</div>
              </div>
            </div>
            <div class="op-btn">
              <div class="add-shop" @click="addGoodsFor('shopCar')">加入购物车</div>
              <div class="collect-goods" @click="addGoodsFor('collect')">收藏商品</div>
            </div>
            <div class="tips">温馨提示：如果您是初学者，咨询私人瑜伽教练可能会对您的选择有帮助哦!</div>
          </div>
        </div>
        <!-- 产品参数 -->
        <div class="params">
          <div class="title">产品参数</div>
          <div class="content">
            <div class="item" v-for="(item, index) in goods.params" :key="index">
              <div class="key">{{getParamsTitle(item)}}:</div>
              <div class="value">{{getParamsValue(item)}}</div>
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
      titleIcon: TitleIcon,
      chooseItem: {
        activeImg: {
          img: ""
        },
        color: {},
        size: "",
        number: 1
      },
      goods: {}
    };
  },
  computed: {
    getParamsTitle() {
      const enums = {
        name: "商品名称",
        material: "材质",
        user_group: "用户",
        kinds: "类型",
        time: "使用季节"
      };
      return item => {
        const [name, value] = Object.entries(item)[0];
        return enums[name];
      };
    },
    getParamsValue() {
      return item => {
        const [name, value] = Object.entries(item)[0];
        return value;
      };
    }
  },
  mounted() {
    const { id } = this.$route.params;
    this.getGoodsDetail(1);
  },
  methods: {
    getGoodsDetail(id) {
      this.axios.get(`/goods/detail/${id}`).then(({ data }) => {
        this.goods = data.data;
        this.chooseItem.activeImg = data.data.imgs[0];
      });
    },
    chooseActiveImg(img) {
      this.chooseItem.activeImg = img;
    },
    chooseColor(color) {
      this.chooseItem.color = color;
    },
    chooseSize(size) {
      this.chooseItem.size = size;
    },
    numberOpFor(option, number) {
      const obj = {
        reduce: number => {
          if (this.chooseItem.number <= 1) {
            return;
          }
          this.chooseItem.number -= number;
        },
        add: number => {
          this.chooseItem.number += number;
        }
      };
      obj[option](number);
    },
    addGoodsFor(option) {
      let checkGoodsChoose = () => {
        const { color, size } = this.chooseItem;
        if (typeof color.name === "undefined") {
          this.$message({
            message: "请选择颜色",
            type: "warning"
          });
          return false;
        }
        if (size === "") {
          this.$message({
            message: "请选择尺寸",
            type: "warning"
          });
          return false;
        }
        return true;
      };

      if (!checkGoodsChoose()) {
        return;
      }

      const { id } = this.$route.params;
      const obj = {
        shopCar() {},
        collect() {}
      };
      obj[option]();
    }
  }
};
</script>
<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
}
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
        -moz-user-select: -moz-none;
        -moz-user-select: none;
        -o-user-select: none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
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
            &.active {
              color: #cce198;
            }
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
              &.active {
                color: #cce198;
              }
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
