<template>
  <div class="warp" style>
    <van-nav-bar title="商品" left-arrow @click-left="back" fixed>
      <share-ing slot="right"
        type="good"
        @listenToShow="getChildShow"
      ></share-ing>
    </van-nav-bar>
    <van-skeleton v-if="goods_copy.picture === ''" avatar avatar-shape="square" avatar-size="100" />
    <van-skeleton v-if="goods_copy.describe === ''" title title-width="100" :row="6" />
    <!-- 商品 -->
    <div class="goods">
      <!-- 商品轮播图 -->
      <div class="goods_carousel">
        <img :src="goods.picture" alt />
      </div>
      <!-- 商品基本信息 -->
      <div class="goods_base">
        <div class="goods_tags">
          <div class="goods_tag">新品</div>
        </div>
        <div class="goods_price">
          <span class="new_price">￥{{(goods_copy.sell_price - goods_copy.discount).toFixed(2)}}</span>
          <span class="old_price" v-if="goods_copy.discount > 0">￥{{goods_copy.sell_price}}</span>
        </div>
        <span class="goods_name">{{goods_copy.describe}}</span>
      </div>
      <div class="goods_select">
        <!-- 选择规格 -->
        <div class="select_item" @click.stop="goodsShow = true">
          <span class="select_tips">{{selectedGoods}}</span>
          <div class="arrow">
            <i class="iconfont icon-pull_right"></i>
          </div>
        </div>

        <!-- 选择地址 -->
        <div class="select_item" v-show="false" @click.stop="area.isOpen = true">
          <span class="select_tips">{{selectedArea}}</span>
          <div class="arrow">
            <i class="iconfont icon-pull_right"></i>
          </div>
        </div>
      </div>
      <div class="goods_detail">
        <!-- 产品参数 -->
        <div class="detail_item">
          <div class="detail_item_title">
            <i></i>
            <span class="zh_title">产品参数</span>
            <span class="en_title">Product parameters</span>
          </div>
          <div class="detail_item_content">
            <i></i>
            <div class="detail_item_content_item">
              <span class="content_item_title">材质</span>
              <span class="content_item_exp">{{goods_copy.material}}</span>
            </div>
            <div class="detail_item_content_item">
              <span class="content_item_title">使用人群</span>
              <span class="content_item_exp">{{goods_copy.painter}}</span>
            </div>
            <div class="detail_item_content_item">
              <span class="content_item_title">使用季节</span>
              <span class="content_item_exp">{{goods_copy.season}}</span>
            </div>
          </div>
        </div>
        <!-- 商品尺寸 -->
        <div class="detail_item">
          <div class="detail_item_title">
            <i></i>
            <span class="zh_title">商品尺寸</span>
            <span class="en_title">Detail</span>
          </div>
          <div class="detail_item_content">
            <i></i>
            <div class="detail_item_content_item">
              <span class="content_item_title">尺码</span>
              <span class="content_item_exp">型号</span>
            </div>
            <div class="detail_item_content_item">
              <span class="content_item_title">S</span>
              <span class="content_item_exp">-</span>
            </div>
            <div class="detail_item_content_item">
              <span class="content_item_title">M</span>
              <span class="content_item_exp">-</span>
            </div>
          </div>
        </div>
        <!-- 细节展示图 -->
        <div class="detail_item" v-if="goods_copy.detail_img.length > 0">
          <div class="detail_item_title">
            <i></i>
            <span class="zh_title">细节展示图</span>
            <span class="en_title">Detail display</span>
          </div>
          <div class="detail_item_content imgs">
            <div class="imgs_item" v-for="(item, index) in goods_copy.detail_img" :key="index">
              <img :src="item" alt />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 地区 -->
    <van-popup v-model="area.isOpen" position="bottom">
      <van-area @confirm="changeArea" @cancel="area.isOpen = false" :area-list="area.list" />
    </van-popup>
    <!-- SKU -->
    <van-sku
      v-if="this.sku.list.length > 0"
      :show-soldout-sku="false"
      v-model="goodsShow"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :close-on-click-overlay="true"
      :hide-stock="sku.hide_stock"
      @buy-clicked="onAddCartClicked"
    >
      <template slot="sku-actions" slot-scope="props">
        <div class="van-sku-actions">
          <div @click="props.skuEventBus.$emit('sku:buy')" class="buy_button">确定</div>
        </div>
      </template>
    </van-sku>
    <!-- 加入购物车，立即购买 -->
    <footer class="car" v-show="!childShow">
      <div class="car_lf">
        <!-- <div class="car_lf_icon"></div>
        <div class="car_lf_icon"></div>-->
        <div class="good_barige" @click="handleViewGoods">
          <img class="icon" src="../../../assets/img/shopping.png" />
          <div class="numbers" v-if="shoppingBagNumber > 0">
            <span>{{shoppingBagNumber}}</span>
          </div>
        </div>
      </div>
      <div class="car_rh">
        <div class="car_rh_item" @click="handleAddCart">加入购物车</div>
        <div
          class="car_rh_item"
          :style="`background:${ isAllowBuy ?'':'#ccc'}`"
          @click="handleBuyGoods"
        >立即购买</div>
      </div>
    </footer>
  </div>
</template>
<script>
import logo from "@/assets/img/logo.png";
import shareIng from '@/components/shareing'
import { mapGetters } from "vuex";
import { Area, Popup, Sku, Skeleton, Toast } from "vant";
import area_list from "./area_list.js";
import { getGoodsById, postUserCart } from "@/api/category.js";
export default {
  components: {
    shareIng,
    [Area.name]: Area,
    [Popup.name]: Popup,
    [Sku.name]: Sku,
    [Skeleton.name]: Skeleton
  },
  data() {
    return {
      childShow: false,  // 显示隐藏购物车
      clock: false,
      shoppingBagNumber: 0,
      icon: {
        logo: logo
      },
      area: {
        list: area_list,
        isOpen: false,
        change: []
      },
      goods_img: "/assets/img/bg.png",
      changeGoods: {},
      goodsShow: false,
      goodsId: 10,
      goods: {
        // 商品标题
        title: "",
        // 默认商品 sku 缩略图
        picture: ""
      },
      goods_copy: {
        detail_img: []
      },
      sku: {
        // 所有 sku 规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: "颜色", // skuKeyName：规格类目名称
            v: [],
            k_s: "s1" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          },
          {
            k: "尺寸", // skuKeyName：规格类目名称
            v: [],
            k_s: "s2" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [],
        price: "0.00", // 默认价格（单位元）
        stock_num: 0, // 商品总库存
        hide_stock: false, // 是否隐藏剩余库存
      }
    };
  },
  watch: {
    immediate: true,
    getChildShow () {}
  },
  computed: {
    ...mapGetters(["info", "isUserNeedLogin"]),
    selectedArea() {
      if (this.area.change.length === 0) {
        return "请选择地址";
      }
      return `配送 至 ${this.area.change.map(item => item.name).join("")}`;
    },
    selectedGoods() {
      const { selectedNum, selectedSkuComb } = this.changeGoods;
      if (!selectedNum) {
        return "请选择规格和数量";
      }
      return `尺寸：${selectedSkuComb.s2} / 数量：${selectedNum}`;
    },
    isAllowBuy() {
      return this.changeGoods.selectedNum;
    }
  },
  mounted() {
    this.getShoppingBag();
    this.viewGoods();
  },
  beforeDestroy() {
    this.$nextTick(() => {
      this.sku.tree = [];
    });
  },
  methods: {
    getChildShow (data) {
      this.childShow = data
    },
    // 查看商品详情
    viewGoods() {
      const { goods_id } = this.$route.params;
      getGoodsById(goods_id).then(response => {
        const {
          cover,
          describe,
          sell_price,
          discount,
          color_size,
          path1,
          path2,
          path3,
          path4
        } = response;
        this.goods_copy = response;
        this.goods_copy.detail_img = [path1, path2, path3, path4].filter(
          item => item
        );
        this.sku.tree = [
          {
            k: "颜色", // skuKeyName：规格类目名称
            v: [
              ...color_size.map(item => {
                return {
                  id: item.id,
                  name: item.name,
                  imgUrl: item.cover,
                  previewImgUrl: item.cover
                };
              })
            ],
            k_s: "s1" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          },
          {
            k: "尺寸", // skuKeyName：规格类目名称
            v: [
              {
                id: "S", // skuValueId：规格值 id
                name: "S" // skuValueName：规格值名称
              },
              {
                id: "M",
                name: "M"
              },
              {
                id: "X",
                name: "X"
              },
              {
                id: "L",
                name: "L"
              },
              {
                id: "XL",
                name: "XL"
              }
            ],
            k_s: "s2" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          }
        ];
        const RADIX_PRE = 100; //分进制
        color_size.map(item => {
          this.sku.list.push(
            ...item.data.map((sub_item, sub_index) => ({
              id: sub_index + item.id,
              price: (sell_price - discount).toFixed(2) * RADIX_PRE + "",
              s1: item.id,
              s2: sub_item.size,
              s3: 0,
              stock_num: sub_item.num
            }))
          );
        });
        this.sku.stock_num = color_size.reduce((pre, next) => {
          return pre + next.data.reduce((pre, next) => pre + next.num, 0);
        }, 0);
        this.sku.price = (sell_price - discount).toFixed(2);
        this.goods = { title: describe, picture: cover };
      });
    },
    // 获取购物袋数据
    getShoppingBag() {
      if (this.isUserNeedLogin) {
        // this.$router.push("/login");
        return;
      }
      this.$request.get("/userCart/create").then(data => {
        this.shoppingBagNumber = data.length;
      });
    },
    // 点击加入购物车
    handleAddCart() {
      if (this.isUserNeedLogin) {
        this.$router.push("/login");
        return;
      }
      if (this.clock) {
        Toast("正在加入购物车");
        return;
      }
      if (this.getSelectParams() == "") return;
      postUserCart(this.getSelectParams())
        .then(() => {
          this.clock = false;
          this.shoppingBagNumber += 1;
          Toast("添加成功");
        })
        .catch(() => {
          this.clock = false;
        });
    },
    getSelectParams(params = {}) {
      const { selectedSkuComb, selectedNum } = this.changeGoods;
      if (!(selectedSkuComb && selectedNum)) {
        Toast("请选择规格");
        this.clock = false;
        return "";
      }
      this.clock = true;
      const { tree } = this.sku;

      const s1_spec = tree
        .map(item => {
          if (item.k === "颜色") {
            return item.v;
          }
        })
        .filter(item => item)[0]
        .filter(item => item.id == selectedSkuComb.s1);
      const { goods_id } = this.$route.params;

      if (s1_spec[0]) {
        params.color = s1_spec[0].name;
      }

      params.num = selectedNum;
      params.size = selectedSkuComb.s2;
      params.id = goods_id;
      var sizedata = this.goods_copy.color_size.filter((item) => item.name === params.color)[0].data
      var sizedata = sizedata.filter((item) => item.size === selectedSkuComb.s2)[0]
      params.goodListId = sizedata.lid
      return params;
    },
    // 查看列表
    handleViewGoods() {
      this.$router.push("/shoppingbag");
    },
    // 点击立即购买
    handleBuyGoods() {
      if (this.getSelectParams() == "") return;
      if (this.isUserNeedLogin) {
        this.$router.push("/login");
        return;
      }
      const { describe, discount, sell_price, cover, color_size } = this.goods_copy;
      const params = {
        ...this.getSelectParams(),
        // goodList: color_size[0].data,
        describe,
        discount,
        sell_price,
        url: cover,
        price: sell_price - discount
      };
      sessionStorage.setItem("buy goods", JSON.stringify(params));
      this.$router.push(`/fillorder?type=1`);
    },
    changeArea(val) {
      this.area.change = val;
      this.area.isOpen = false;
    },
    onAddCartClicked(val) {
      this.changeGoods = val;
      this.goodsShow = false;
    },
    back() {
      this.sku.tree = [];
      this.sku.list = [];
      this.$nextTick(() => {
        // this.sku.tree = [];
      });
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="css" scoped>
.van-sku-container >>> .van-icon {
  display: none !important;
}
</style>
<style lang="scss" scoped>
* {
  margin: 0;
  border: 0;
  box-sizing: border-box;
  font-size: 13px;
  color: #2c2c2c;
  max-width: 100%;
}

img {
  width: 100%;
  // height: 100%;
}
.van-popup--center {
  width: 87%;
  height: 85%;
}
.textbase {
  width: 100%;
  height: 30px;
  background: #fff;
  font-size: 12px;
  color: #2c2c2c;
  text-align: center;
  line-height: 20px;
}
.good_barige {
  position: relative;
  display: inline-block;
  img {
    display: block;
    width: 20px;
    height: 20px;
  }
  .numbers {
    position: absolute;
    top: -60%;
    right: -35%;
    display: block;
    span {
      background: red;
      color: #fff;
      margin-top: 5px;
      display: block;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
    }
  }
}
$main_color: #b4d565;
.warp {
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  width: 100%;
  // padding-top: 46px;
  padding-bottom: 1.06667rem;
  background: #fff;
  -webkit-overflow-scrolling: touch; /* 解决 ios 滑动不流畅问题 */
}
.navigator {
  position: absolute;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: space-between;
  height: 30px;
  align-items: center;
  .left_arrow {
    transform: rotate(180deg);
  }
  .title_tabs {
    .tab_item {
    }
  }
  .right_icon {
    .icon_item {
      width: 20px;
      height: 20px;
      // background: #ccc;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.goods {
  user-select: none;
  // background: #eee;
  // width: 344px;
  // margin: 0 auto;
  padding: 20px 15px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  .goods_carousel {
    height: 344px;
    border-radius: 3px;
    // overflow: hidden;
    img {
      height: 344px;
      border-radius: 4px;
    }
  }
  // 商品信息
  .goods_base {
    position: relative;
    margin-top: 1em;
    .goods_tags {
      position: absolute;
      top: 0;
      right: 0;
      .goods_tag {
        border: 1px solid #ff7072;
        color: #ff7072;
        width: 4em;
        text-align: center;
        border-radius: 10px;
      }
    }
    .goods_price {
      .new_price {
        color: #d50c0f;
        font-size: 16px;
      }
      .old_price {
        color: #969696;
        text-decoration: line-through;
      }
    }
    .goods_name {
      width: 16em;
      line-height: 1.5em;
      display: block;
    }
  }
  // 商品选项
  .goods_select {
    position: relative;
    margin-top: 10px;
    padding-top: 4px;
    margin-bottom: 10px;
    padding-bottom: 4px;
    &::before,
    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 100vw;
      height: 4px;
      background: #eee;
    }
    &::before {
      left: -15px;
      top: 0;
    }
    &::after {
      left: -15px;
      bottom: 0;
    }
    .select_item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 10px 0;
      .select_tips {
        color: #b1b1b1;
      }
      .arrow {
      }
    }
  }

  // 商品详情
  .goods_detail {
    .detail_item {
      margin-bottom: 2em;
      .detail_item_title {
        position: relative;
        display: flex;
        height: 2.5em;
        justify-content: space-between;
        flex-direction: column;
        margin: 10px 0;
        padding-left: 10px;
        i {
          position: absolute;
          left: 0;
          top: 0;
          width: 4px;
          height: 100%;
          background: $main_color;
        }
        .zh_title {
        }
        .en_title {
          color: #ddd;
          font-size: 10px;
        }
      }
      .detail_item_content {
        border: 1px solid #ddd;
        position: relative;
        i {
          position: absolute;
          top: 0;
          // left: 4em;
          // width: 1px;
          background: #ddd;
          height: 100%;
        }
        .detail_item_content_item {
          display: flex;

          .content_item_title {
            display: inline-block;
            width: 4em;
            flex-shrink: 0;
            height: 20px;
            line-height: 20px;
            margin: 0 10px;
            text-align: justify;
            text-align-last: justify;
            overflow: hidden;
            &::after {
              content: "";
              display: inline-block;
              width: 100%;
            }
          }
          .content_item_exp {
            padding: 0 10px;
            line-height: 20px;
            border-left: 1px solid #ddd;
          }
        }
        &.imgs {
          border: none;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .imgs_item {
            margin-bottom: 10px;
            flex-basis: 49%;
            flex-shrink: 0;
            height: 100px;
            background: #ccc;
          }
        }
      }
    }
  }
}
.van-sku-actions {
  background: $main_color;
  .buy_button {
    width: 100%;
    text-align: center;
    color: #fff;
  }
}
.car {
  position: absolute;
  z-index: 10;
  left: 0;
  bottom: 0;
  height: 40px;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 1px 2px 10px #eee;
  .car_lf {
    flex-shrink: 0;
    flex-basis: 50%;
    padding: 0 20px;
    height: 100%;
    display: flex;
    align-items: center;
    .car_lf_icon {
      display: inline-block;
      width: 20px;
      height: 20px;
      background: #ccc;
      margin-right: 30px;
    }
  }
  .car_rh {
    flex-shrink: 0;
    flex-basis: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    .car_rh_item {
      display: inline-block;
      padding: 0 10px;
      flex-grow: 1;
      height: 100%;
      line-height: 40px;
      text-align: center;
      &:nth-of-type(2) {
        color: #fff;
        height: 100%;
        line-height: 40px;
        background: $main_color;
      }
    }
  }
}
</style>