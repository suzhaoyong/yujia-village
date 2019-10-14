<template>
  <div class="order">
    <!-- <header>填写订单</header> -->
    <van-nav-bar title="填写订单" left-arrow @click-left="back" fixed />
    <main class="order-main">
      <div class="order-main-edit" v-show="false">
        <div class="order-main-edit-sonsignee">收货人</div>
        <div class="order-main-edit-phone">手机号码</div>
        <div class="order-main-edit-adress">地址</div>
        <span class="order-main-edit-icon"><van-icon name="arrow" /></span>
      </div>
      <div class="order-main-editdefalut" v-show="true">
        <div class="order-main-editdefalut-p1" v-if="selectAddress.is_default == 1">默认地址</div>
        <div class="order-main-editdefalut-name">{{selectAddress.name}}<span>{{selectAddress.tel}}</span></div>
        <div class="order-main-editdefalut-adress">{{selectAddress.userAddress}}</div>
        <span class="order-main-editdefalut-icon"><van-icon @click="changeAddress" name="arrow" /></span>
      </div>
      <div v-for="(item, index) in goods" :key="index" class="order-main-shop">
        <!-- <div > -->
          <div class="order-main-shop-img"><img :src="item.url"></div>
          <div class="order-main-shop-message">
            <div class="order-main-shop-message-num"><span class="num-span1">{{item.describe}}</span><span>x {{item.num}}</span></div>
            <div class="color"><span>{{item.color}}</span><span class="color-span2">{{item.size}}</span></div>
            <div class="price"><span>￥ {{item.price}}</span> <span v-if="item.discount > 0" style="margin-left:10px;text-decoration:line-through;">￥ {{item.sell_price}}</span></div>
          </div>
        <!-- </div> -->
        
      </div>
      <div class="order-main-shop">
        <input class="order-main-shop-leave" style="margin-top: 0.3rem;" type="text" placeholder="如果有需要，请给卖家留言" v-show="true"/>
      </div>
      <div class="order-main-discounts">
        <van-cell-group v-show="false">
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
            <van-cell title="商品总金额" :value="`￥ ${countPrice.toFixed(2)}`" size="large"/>
            <van-cell title="运费" value="￥ 0.00" size="large"/>
          </van-cell-group>
        </div>
      </div>
    </main>
    <footer class="order-foot">
      <div class="order-foot-message">
        <p class="order-foot-message-p1">实际支付：¥{{(countPrice - countDiscount).toFixed(2)}}</p>
        <p>免减总额：¥{{countDiscount.toFixed(2)}}</p>
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
  data() {
    return {
      userAddress: [],
      selectAddress: {},
      goods: []
    }
  },
  computed: {
    countPrice(){
      return this.goods.reduce((pre, next) => {                
          return (pre) + (next.price * next.num)
      }, 0)
    },
    countDiscount(){
      return this.goods.reduce((pre, next) => {                
          return (pre) + (next.discount * next.num)
      }, 0)
    },
  },
  created() {
    
  },
  mounted() {
    const address = sessionStorage.getItem('select address')
    if(address) {
      this.selectAddress = JSON.parse(address);
      this.goods = JSON.parse(sessionStorage.getItem('roder good'))
    } else {
      this.getAddress(); 
    }

    const buyGoods = sessionStorage.getItem("buy goods")
    const { type } = this.$route.query
    if (buyGoods && type == 1) {
      this.goods = [JSON.parse(buyGoods)]
    }

  },
  beforeDestroy() {
    sessionStorage.removeItem('select address')
  },
  methods: {
    // 返回
    back() {
      this.$router.go(-1);
      sessionStorage.removeItem('roder good')
    },
    // 修改地址
    changeAddress() {
      this.$router.push('/address?type=1')
    },
    getAddress() {
      this.$request.get("/goodOrder/create").then(data => {
        // console.table(data.address);
        const { type } = this.$route.query
        if(!type) {
          sessionStorage.setItem('roder good', JSON.stringify(data.goods))
          this.goods = data.goods;
        }
        

        if( data.address.length === 0 ) {
          return;
        }
        const default_address = data.address.filter(item => item.is_default == 1)[0]
        this.selectAddress = default_address
        if(!default_address) {
          this.selectAddress = data.address[0]
        }
        // this.userAddress = data.address;
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  .order {
    width: 100%;
    // height: 100%;
    header {
      height: 35px;
      text-align: center;
      background: #EEEEEE;
      font-size: 16px;
      line-height: 35px;
    }
    &-main {
      // width: 100%;
      // height: 100%;
      background: #EEEEEE;
      font-size: 12px;
      margin-top: 1px;
      margin-bottom: 50px;
      overflow: hidden;
      overflow-y: scroll;
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
        padding-top: 30px;
        background: #F1F8E2;
        position: relative;
        overflow: hidden;
        
        &-p1 {
          position: absolute;
          left: 0;
          top: 0;
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