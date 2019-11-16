<template>
  <div style="padding-bottom:5rem;">
    <div class="goods-box">
      <div class="navs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/market/index' }">商城</el-breadcrumb-item>
          <el-breadcrumb-item>{{goods.good_sort}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{goods.describe}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="goods">
        <div class="info">
          <div class="imgs">
            <div class="bg-img">
              <img :src="chooseItem.activeImg" alt />
              <div v-if="config.url">
                <share :config="config"></share>
              </div>
            </div>
            <div class="sm-imgs">
              <div
                class="sm-img"
                style="cursor: pointer;"
                v-for="(item, index) in goods.imgs"
                :key="index"
                @click="chooseActiveImg(item)"
              >
                <img :src="item" alt />
              </div>
            </div>
          </div>
          <div class="details">
            <div class="price" style="font-weight:800;">
              {{goods.describe}}
            </div>
            <div class="price">
              吊牌价：
              <span>￥{{goods.sell_price}}</span>
            </div>
            <div class="preferential">
              折扣价：
              <span>￥{{(goods.sell_price - goods.discount).toFixed(2)}}</span>
            </div>
            <div class="colors">
              <span>颜色:</span>
              <div
                :class="['color', item.name === chooseItem.color.name ? 'active': '']"
                v-for="(item, index) in goods.color_size"
                :key="index"
                @click="chooseColor(item)"
              >
                <div class="img">
                  <img :src="item.cover" alt />
                </div>
                <div class="color-name">{{item.name}}</div>
              </div>
              <div v-if="goods.color_size.length === 0" class="size-list">暂无</div>
            </div>
            <div class="size">
              <span>尺码:</span>
              <div class="size-list" v-if="sizeList.length>0">
                <div
                  :class="['item', item === chooseItem.size ? 'active': '']"
                  v-for="(item, index) in sizeList"
                  :key="index"
                  @click="chooseSize(item)"
                >{{item.size}}</div>
              </div>
              <div v-else class="size-list">暂无</div>
            </div>
            <div class="number">
              <span>数量:</span>
              <div class="op">
                <div class="reduce" @click="numberOpFor('reduce', 1)">-</div>
                <div class="num">{{chooseItem.number}}</div>
                <div class="add" @click="numberOpFor('add', 1)">+</div>
              </div>
              <span
                style="margin-left:20px;"
                v-show="chooseItem.size"
              >剩余数量:({{chooseItem.size.num}})</span>
            </div>
            <div class="op-btn">
              <div
                class="add-shop"
                :style="`${isBindClick?'pointer-events:none;':''}`"
                @click="addGoodsFor('shopCar')"
              >加入购物车</div>
              <div
                class="collect-goods"
                :style="`${isBindClick?'pointer-events:none;':''}`"
                @click="addGoodsFor('collect')"
              >收藏商品</div>
            </div>
            <div class="tips">温馨提示：如果您是初学者，咨询私人瑜伽教练可能会对您的选择有帮助哦!</div>
          </div>
        </div>
        <!-- 产品参数 -->
        <div class="params">
          <div class="title">产品参数</div>
          <div class="content">
            <div class="item" v-for="(item, index) of goods.params" :key="index">
              <div class="key">{{getParamsTitle(item)}}:</div>
              <div class="value">{{getParamsValue(item)}}</div>
            </div>
          </div>
        </div>
        <!-- 底部说明 -->
        <div class="explain">
          <session-title name="权限声明"></session-title>
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
import SessionTitle from "./SessionTitle";
import { getGoodsById, postUserCollect, postUserCart } from "@/api/market";
export default {
  components: {
    SessionTitle
  },
  data() {
    return {
      isBindClick: false,
      config: {
        url: "",
        source: "",
        title: "",
        description: "",
        sites: ["qzone", "qq", "weibo", "wechat", "douban"],
        wechatQrcodeTitle: "微信扫一扫：分享", // 微信二维码提示文字
        wechatQrcodeHelper:
          "<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>"
      },
      sizeList: [],
      chooseItem: {
        activeImg: "",
        color: {},
        size: "",
        number: 1
      },
      goods: {
        color_size: []
      }
    };
  },
  computed: {
    getParamsTitle() {
      const enums = {
        desc: "商品名称",
        describe: "商品描述",
        material: "材质",
        painter: "用户",
        kinds: "类型",
        season: "使用季节"
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
    this.getGoodsDetail(id);
  },
  methods: {
    initSocialConfig() {
      const { describe, material, painter, kinds, season } = this.goods;
      const params = {
        url: `http://www.yujiacun.net/goods/detail/${this.$route.params.id}`,
        title: describe,
        description: `材质: ${material}, 适合${painter}使用`
      };
      this.config = Object.assign({}, this.config, params);
    },
    getGoodsDetail(id) {
      getGoodsById(id)
        .then(data => {
          this.goods = data;
          this.goods.imgs = [
            data.cover,
            data.path1,
            data.path2,
            data.path3,
            data.path4
          ];
          // this.sizeList = data.color_size[0].data;
          this.chooseItem.activeImg = data.cover;
          const { material, painter, season, describe } = data;
          this.goods.params = [
            { material },
            { painter },
            { season },
            { describe }
          ];
        })
        .then(_ => {
          this.initSocialConfig();
        });
    },
    chooseActiveImg(img) {
      this.chooseItem.activeImg = img;
    },
    chooseColor(color) {
      this.chooseItem.color = color;
      this.sizeList = color.data;
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
        shopCar: () => {
          this.postUserCart();
        },
        collect: () => {
          this.postUserCollect();
        }
      };
      obj[option]();
    },
    /** 添加商品 */
    postUserCart() {
      this.isBindClick = true;
      const {
        color: { name: colorName },
        size: { size },
        number
      } = this.chooseItem;

      const params = {
        id: this.$route.params.id,
        num: number,
        size: size,
        color: colorName
      };
      postUserCart(params)
        .then(data => {
          this.isBindClick = false;
          this.$message({ type: "success", message: "加入购物车成功" });
        })
        .catch(() => {
          this.isBindClick = false;
        });
    },
    /** 添加收藏 */
    postUserCollect() {
      this.isBindClick = true;
      const {
        color: { name: colorName },
        size: { size },
        number
      } = this.chooseItem;

      const params = {
        id: this.$route.params.id,
        num: number,
        size: size,
        color: colorName
      };
      postUserCollect(params)
        .then(data => {
          this.isBindClick = false;
          this.$message({ type: "success", message: "收藏成功" });
        })
        .catch(() => {
          this.isBindClick = false;
        });
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
    margin-top: 3rem;
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
          // border: 1px solid #ccc;
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
            // border: 1px solid #ccc;
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
          
        }
        .preferential {
          span {
            font-weight: 800;
          }
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
              // border: 1px solid #ccc;
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
      margin-top: 3rem;
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
            flex-shrink: 0;
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
