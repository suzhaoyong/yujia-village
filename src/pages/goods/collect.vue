<template>
  <div>
    <div class="car">
      <div class="header">
        <session-title name="收藏中心"></session-title>
      </div>
      <div class="body">
        <div class="goods-box">
          <div class="goods" v-for="(item,index) in 3" :key="index">
            <div class="info">
              <div class="select"></div>
              <div class="img"></div>
              <div class="name-size">
                <div class="name">暴走的萝莉 中强度运动内衣女聚拢瑜伽背心美背防震跑步健身bra</div>
                <div class="color-size">
                  <div class="color">颜色：粉色</div>
                  <div class="size">尺码: M码</div>
                </div>
              </div>
            </div>
            <div class="number">
              <div class="reduce">-</div>
              <div class="num">3</div>
              <div class="add">+</div>
            </div>
            <div class="price">
              <div class="old-price">￥85</div>
              <div class="new-price">￥55</div>
            </div>
            <div class="ops">
              <div class="add">放入购物车</div>
              <div class="delete">删除</div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="op">
          <div class="select"></div>
          <div class="all">全选</div>
          <div class="delete">删除</div>
          <div class="share">分享</div>
        </div>
        <div class="count">
          <span class="num">
            已选商品
            <b>2</b> 件
          </span>
        </div>
        <div class="sumbit">加入购物车</div>
      </div>
    </div>
  </div>
</template>
<script>
import SessionTitle from "./SessionTitle";
export default {
  components: {
    SessionTitle
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
* {
  border: 0;
  margin: 0;
  box-sizing: border-box;
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
