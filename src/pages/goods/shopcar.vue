<template>
  <div>
    <div class="car">
      <div class="navs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/market/index' }">商城</el-breadcrumb-item>
          <el-breadcrumb-item>购物车</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="header">
        <session-title name="购物车"></session-title>
      </div>
      <div class="body">
        <div class="goods-box" style="min-height: 55vh;">
          <div class="goods" v-for="(item,index) in goods" :key="index">
            <div class="info" @click="chooseGoods(item, index)">
              <div :class="['select', {'active': item.select}]"></div>
              <div class="img">
                <img :src="item.url" alt />
              </div>
              <div class="name-size">
                <div class="name">{{item.describe}}</div>
                <div class="color-size">
                  <div class="color">颜色：{{item.color}}</div>
                  <div class="size">尺码: {{item.size}}码</div>
                </div>
              </div>
            </div>
            <div class="number">
              <div class="reduce" @click="numberOpFor('reduce', 1, index)">-</div>
              <div class="num">{{item.num}}</div>
              <div class="add" @click="numberOpFor('add', 1, index)">+</div>
            </div>
            <div class="price">
              <div class="old-price">￥{{item.sell_price}}</div>
              <div class="new-price">￥{{(item.sell_price - item.discount).toFixed(2)}}</div>
            </div>
            <div class="ops">
              <div class="add" @click="goodsOpFor('moveToCollect', item)">放入收藏夹</div>
              <div class="delete" @click="goodsOpFor('detele', item)">删除</div>
            </div>
          </div>
          <not-found v-if="goods.length === 0" type="not-fond_2" msg="我寻寻觅觅却找不见您的购物车"></not-found>
        </div>
      </div>
      <div class="footer" v-if="goods.length > 0">
        <div class="op">
          <div :class="['select', {active: isAllGoodsSelect}]" @click="footerOpFor('selectAll')"></div>
          <div class="all" @click="footerOpFor('selectAll')">全选</div>
          <div class="delete" @click="footerOpFor('detele')">删除</div>
          <div class="add" @click="footerOpFor('moveToCollect')">移入收藏夹</div>
        </div>
        <div class="count">
          <span class="num">
            已选商品
            <b>{{getAllSelectNumberAndPrice.allGoodsNumber}}</b> 件
          </span>
          <span class="title">应付金额</span>
          <span class="tips">(不含运费)</span>
          <span class="price">¥{{getAllSelectNumberAndPrice.allPrice}}</span>
        </div>
        <div class="sumbit" @click="payment">去结算</div>
      </div>
    </div>
  </div>
</template>
<script>
import SessionTitle from "./SessionTitle";
import {
  getUserCart,
  deleteUserCart,
  deleteUserCartDelCart,
  postUserCart,
  postUserCollect,
  postAddUserCollect,
  postUserOrder
} from "@/api/market";
export default {
  components: {
    SessionTitle
  },
  data() {
    return {
      goods: []
    };
  },
  computed: {
    isAllGoodsSelect() {
      let allSelectGoods = this.goods.filter(item => item.select);
      return (
        allSelectGoods.length === this.goods.length && this.goods.length !== 0
      );
    },
    getAllSelectNumberAndPrice() {
      let allGoods = this.goods.filter(item => item.select);

      let allPrice = allGoods.reduce((pre, cur) => {
        return parseFloat(pre) + parseInt(cur.num) * (cur.sell_price - cur.discount);
      }, 0);
      return { allPrice: allPrice.toFixed(2), allGoodsNumber: allGoods.length };
    }
  },
  mounted() {
    this.getShopCar();
  },
  methods: {
    goodsOpFor(option, goods) {
      const obj = {
        detele: item => {
          deleteUserCartDelCart({ id: [item.id] }).then(data => {
            this.$message({ type: "success", message: "删除成功" });
            // this.getColloct();
            this.goods = this.goods.filter(sitem => sitem.id !== item.id);
          });
        },
        moveToCollect: item => {
          const { id, num, size, color } = item;

          postAddUserCollect({ id: [id], num: [num] }).then(data => {
            this.$message({ type: "success", message: "添加成功" });
          });
        }
      };
      obj[option] && obj[option](goods);
    },
    footerOpFor(option) {
      const obj = {
        selectAll: () => {
          this.goods = this.goods.map(item => {
            if (this.isAllGoodsSelect) {
              item.select = false;
            } else {
              item.select = true;
            }
            return item;
          });
        },
        detele: () => {
          let id = this.goods.filter(item => item.select).map(item => item.id);
          deleteUserCartDelCart({ id }).then(data => {
            this.goods = this.goods.filter(item => !item.select);
            this.$message({ type: "success", message: "删除成功" });
          });
        },
        moveToCollect: () => {
          let selectGoods = this.goods.filter(item => item.select);
          const id = selectGoods.map(item => item.id);
          const num = selectGoods.map(item => item.num);
          postAddUserCollect({ id: id, num: num }).then(data => {
            this.$message({ type: "success", message: "添加成功" });
            this.goods = this.goods.filter(item => !item.select);
          });
        }
      };
      obj[option] && obj[option]();
    },
    numberOpFor(option, num, index) {
      const obj = {
        reduce: num => {
          if (this.goods[index].num <= 1) {
            return;
          }
          this.goods[index].num -= num;
        },
        add: num => {
          this.goods[index].num = parseInt(this.goods[index].num) + num;
        }
      };
      obj[option](num);
    },
    chooseGoods(goods, index) {
      this.goods[index].select = !this.goods[index].select;
      this.goods = [...this.goods];
    },
    payment() {
      const select = this.goods.filter(item => item.select);
      const id = select.map(item => item.id);
      const num = select.map(item => item.num);
      if (select.length === 0) {
        this.$message({
          type: "warning",
          message: "请先选择商品"
        });
        return;
      }
      postUserOrder({ id, num }).then(data => {
        this.$router.push({
          name: "order",
          params: {}
        });
      });
    },
    getShopCar() {
      getUserCart().then(data => {
        this.goods = data;
      });
    }
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
* {
  border: 0;
  margin: 0;
  box-sizing: border-box;
}
img {
  width: 100%;
  height: 100%;
}
.car {
  padding-bottom:5rem;
  // background:#F1F1F1;
  @include no_select();
  .navs {
    width: 60rem;
    padding: 3rem 0rem 0rem 0rem;
    margin: 0 auto;
  }
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .body {
    width: 60rem;
    margin: 0 auto;
    .goods-box {
      padding-top: 2rem;
      .goods {
        // border:1px solid #ccc;
        display: flex;
        margin-bottom: 0.95rem;
        box-shadow:1px 1px 9px 1px rgba(92,92,92,0.28);
        .info {
          display: flex;
          flex-basis: 50%;
          flex-shrink: 0;
          align-items: center;
          padding-top: 1.7rem;
          padding-bottom: 1.3rem;
          .select {
            flex-shrink: 0;
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            background: #eee;
            margin: 0 2rem 0 1rem;
            &.active {
              background-image: url("../../assets/order/selected.png");
              background-size: 100% 100%;
            }
          }
          .img {
            width: 7rem;
            height: 8.3rem;
            flex-shrink: 0;
            // background: #ccc;
            margin-right: 1.8rem;
          }
          .name-size {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
            .name {
              color: #2c2c2c;
              font-size: 0.7rem;
              font-weight: 800;
            }
            .color-size {
              color: #999;
              font-size: 0.6rem;
              .color {
              }
              .size {
              }
            }
          }
        }
        .number {
          display: flex;
          align-items: center;
          flex-basis: 10%;
          flex-shrink: 0;
          padding-left: 5rem;
          .reduce,
          .add {
            width: 2rem;
            height: 2rem;
            line-height: 2rem;
            background: #eee;
            text-align: center;
            cursor: pointer;
          }
          .num {
            width: 4.3rem;
            text-align: center;
            border-top: 1px solid #dcdcdc;
            border-bottom: 1px solid #dcdcdc;
            height: 2rem;
            line-height: 2rem;
          }
          .add {
          }
        }
        .price {
          display: flex;
          align-items: center;
          flex-basis: 10%;
          flex-shrink: 0;
          padding-left: 3.45rem;
          .old-price {
            color: #999;
            font-size: 0.6rem;
            text-decoration: line-through;
            padding-right: 0.3rem;
          }
          .new-price {
            color: #2c2c2c;
            font-size: 0.7rem;
            font-weight: 800;
          }
        }
        .ops {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex-basis: 15%;
          flex-shrink: 0;
          padding-left: 3rem;
          font-size: 0.7rem;
          cursor: pointer;
          .add {
          }
          .delete {
          }
        }
      }
    }
  }
  .footer {
    width: 60rem;
    height: 2.75rem;
    box-shadow: 0rem 0.05rem 0.1rem #ccc;
    margin: 0 auto;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    position: relative;
    .op {
      display: flex;
      color: #2c2c2c;
      font-size: 0.7rem;
      padding-left: 4.2rem;
      position: relative;
      .select {
        position: absolute;
        left: 1.2rem;
        top: 0;
        flex-shrink: 0;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background: #eee;
        margin: 0 2rem 0 1rem;
        &.active {
          // background: #000;
          background-image: url("../../assets/order/selected.png");
          background-size: 100% 100%;
        }
      }
      .all {
      }
      .delete {
        padding-left: 1.5rem;
      }
      .add {
        padding-left: 1.5rem;
      }
      .share {
        padding-left: 1.5rem;
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
      .num {
        color: #2c2c2c;
        font-size: 0.7rem;
        padding-right: 1rem;
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
</style>
