<template>
  <div>
    <div class="car">
      <div class="header">
        <session-title name="收藏中心"></session-title>
      </div>
      <div class="body">
        <div class="goods-box" style="min-height:80vh;">
          <div class="goods" v-for="(item,index) in goods" :key="index">
            <div class="info">
              <div :class="['select', {'active': item.select}]" @click="chooseGoods(item, index)"></div>
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
              <div class="new-price">￥{{item.sell_price - item.discount}}</div>
            </div>
            <div class="ops">
              <div class="add" @click="operate('addGoods', item)">放入购物车</div>
              <div class="delete" @click="operate('deleteGoods', item)">删除</div>
            </div>
          </div>
          <not-found v-if="goods.length === 0" type="not-fond_2" msg="我寻寻觅觅却找不见您收藏的踪迹"></not-found>
        </div>
      </div>
      <div class="footer" v-if="goods.length > 0">
        <div class="op">
          <div :class="['select', {active: isAllGoodsSelect}]" @click="operate('selectAll')"></div>
          <div class="all" @click="operate('selectAll')">全选</div>
          <div class="delete" @click="operate('allDelete')">删除</div>
        </div>
        <div class="count">
          <span class="num">
            已选商品
            <b>{{getAllSelectNumberAndPrice.allGoodsNumber}}</b> 件
          </span>
        </div>
        <div class="sumbit" @click="operate('allAddCart')">加入购物车</div>
      </div>
    </div>
  </div>
</template>
<script>
import SessionTitle from "./SessionTitle";
import {
  getUserCollect,
  deleteUserCollectDelCollect,
  deleteUserCollect,
  postUserCart,
  postAddUserCart
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
      return allSelectGoods.length === this.goods.length;
    },
    getAllSelectNumberAndPrice() {
      let allGoods = this.goods.filter(item => item.select);

      return { allGoodsNumber: allGoods.length };
    }
  },
  mounted() {
    this.getColloct();
  },
  methods: {
    getColloct() {
      getUserCollect().then(data => {
        this.goods = data;
      });
    },
    chooseGoods(goods, index) {
      this.goods[index].select = !this.goods[index].select;
      this.goods = [...this.goods];
    },
    operate(name, goods) {
      const op_obj = {
        addGoods: item => {
          const { id, num, size, color } = item;
          postAddUserCart({ id: [id], num: [num] }).then(data => {
            this.$message({ type: "success", message: "添加成功" });
          });
        },
        deleteGoods: item => {
          deleteUserCollectDelCollect({ id: [item.id] }).then(data => {
            this.$message({ type: "success", message: "删除成功" });
            // this.getColloct();
            this.goods = this.goods.filter(sitem => sitem.id !== item.id);
          });
        },
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
        allDelete: () => {
          let id = this.goods.filter(item => item.select).map(item => item.id);
          deleteUserCollectDelCollect({ id }).then(data => {
            this.goods = this.goods.filter(item => !item.select);
            this.$message({ type: "success", message: "删除成功" });
          });
        },
        allAddCart: () => {
          const select = this.goods.filter(item => item.select);
          if (select.length === 0) {
            this.$message({
              type: "warning",
              message: "请先选择商品"
            });
            return;
          }
          const id = this.goods.map(item => item.id);
          const num = this.goods.map(item => item.num);
          postAddUserCart({ id: id, num: num }).then(data => {
            this.$message({ type: "success", message: "添加成功" });
          });
        }
      };
      op_obj[name] && op_obj[name](goods);
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
    }
  }
};
</script>
<style lang="scss" scoped>
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
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #eee;
    padding: 3rem 0;
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
        box-shadow: 0rem 0.05rem 0.1rem #ccc;
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
            background: #ccc;
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
