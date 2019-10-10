<template>
  <div class="order">
    <header>填写订单</header>
    <main class="order-main">
      <div class="order-main-edit" v-show="false">
        <div class="order-main-edit-sonsignee">收货人</div>
        <div class="order-main-edit-phone">手机号码</div>
        <div class="order-main-edit-adress">地址</div>
        <span class="order-main-edit-icon"><van-icon name="arrow" /></span>
      </div>
      <div class="order-main-editdefalut" v-show="true">
        <div class="order-main-editdefalut-p1">默认地址</div>
        <div class="order-main-editdefalut-name">小李子<span>18941646416</span></div>
        <div class="order-main-editdefalut-adress">成都市锦江区泰合国际财富中心<p>6栋2单元1008</p></div>
        <span class="order-main-editdefalut-icon"><van-icon name="arrow" /></span>
      </div>
      <div class="order-main-shop">
        <div class="order-main-shop-img"><img src=""></div>
        <div class="order-main-shop-message">
          <div class="order-main-shop-message-num"><span class="num-span1">moumou2019纯棉时尚收腰型</span><span>x 1</span></div>
          <div class="color"><span>灰蓝色</span><span class="color-span2">M</span></div>
          <div class="price">￥ 550.00</div>
        </div>
        <input class="order-main-shop-leave" type="text" value="如果有需要，请给卖家留言" v-show="true"/>
      </div>
      <div class="order-main-discounts">
        <van-cell-group>
          <van-cell is-link>
            <template slot="title">
              <span class="custom-title">现金券：</span>
              <van-tag>标签</van-tag>
            </template>
          </van-cell>
          <van-cell is-link>
            <template slot="title">
              <span class="custom-title">优惠券：</span>
              <van-tag>标签</van-tag>
            </template>
          </van-cell>
          <van-cell is-link>
            <template slot="title">
              <span class="custom-title">积分：</span>
              <van-tag>标签</van-tag>
            </template>
          </van-cell>
        </van-cell-group>
        <div class="freight">
          <van-cell-group>
            <van-cell title="商品金额" value="￥ 550" size="large"/>
            <van-cell title="运费" value="￥ 0.00" size="large"/>
          </van-cell-group>
        </div>
      </div>
    </main>
    <footer class="order-foot">
      <div class="order-foot-message">
        <p class="order-foot-message-p1">实际支付：¥320</p>
        <p>免减总额：¥230</p>
      </div>
      <div class="order-foot-buybtn">去付款</div>
    </footer>
  </div>
</template>

<script>
import Vue from 'vue';
import { Cell, CellGroup, Icon, Tag } from 'vant';

Vue.use(Cell).use(CellGroup).use(Icon).use(Tag);
export default {
  
}
</script>

<style lang="scss" scope>
  .order {
    width: 100%;
    height: 100%;
    header {
      height: 35px;
      text-align: center;
      background: #EEEEEE;
      font-size: 16px;
      line-height: 35px;
    }
    &-main {
      width: 100%;
      height: 100%;
      background: #EEEEEE;
      font-size: 12px;
      &-edit {
        width: 100%;
        height: 106px;
        background: white;
        position: relative;
        div {
          width: 317px;
          height: 29px;
          border-bottom: 1px solid #E5E5E5;
          margin-left: 17px;
          line-height: 29px;
        }
        &-adress {
          color: #999999;
        }
        &-icon {
          position: absolute;
          font-size: 18px;
          top: 38%;
          right: 3%;
        }
      }
      &-editdefalut {
        width: 100%;
        height: 106px;
        background: #F1F8E2;
        position: relative;
        overflow: hidden;
        &-p1 {
          width: 81px;
          height: 17px;
          background: #B3D465;
          margin-top: 4px;
          text-align: center;
          font-size: 11px;
          color: white;
        }
        &-name {
          margin-left: 20px;
          span {
            margin-left: 26px;
          }
        }
        &-adress {
          margin: 17px 0 0 81px ;
        }
        &-icon {
          position: absolute;
          font-size: 18px;
          top: 38%;
          right: 3%;
        }
      }
      &-shop {
        width: 100%;
        height: auto;
        background: white;
        margin-top: 3px;
        overflow: hidden;
        &-img {
          width: 78px;
          height: 79px;
          margin: 11px 18px 11px 15px;
          float: left;
        }
        &-message {
          float: left;
          width: 245px;
          height: 79px;
          margin-top: 11px;
          &-num {
            display: flex;
            justify-content: space-between;
            .num-span1 {
              width: 162px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
          .color {
            span {
              height: 30px;
              border: 1px solid #E5E5E5;
              text-align: center;
              line-height: 30px;
              padding: 0 8px;
              color: #999999;
            }
            &-span2 {
              margin-left: 9px;
            }
          }
          .price {
            margin-top: 12px;
          }
        }
        &-leave {
          width: 343px;
          height: 29px;
          background: #EEEEEE;
          margin: 0 0 13px 16px;
          padding: 12px;
        }
      }
      &-discounts {
        margin-top: 3px;
        .van-tag--default {
          background: none;
          color: #999999;
        }
        .freight {
          margin-top: 3px;
        }
      }
    }
    .order-foot {
      position: fixed;
      bottom: 0;
      font-size: 11px;
      width: 100%;
      height: 49px;
      display: flex;
      &-message {
        flex: 1;
        background: white;
        padding: 0 16px;
        &-p1 {
          margin: 8px 0 4px 0;
          font-size: 13px;
          color: #A3C554;
        }
      }
      &-buybtn {
        width: 104px;
        height: 100%;
        text-align: center;
        line-height: 49px;
        font-size: 14px;
        color: white;
        background: #B3D465;
      }
    }
  }
</style>