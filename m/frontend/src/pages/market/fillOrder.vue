<template>
  <div class="order">
    <!-- <header>填写订单</header> -->
    <van-nav-bar title="填写订单" left-arrow @click-left="back" fixed />
    <main class="order-main">
      <div class="order-main-edit" v-show="false">
        <div class="order-main-edit-sonsignee">收货人</div>
        <div class="order-main-edit-phone">手机号码</div>
        <div class="order-main-edit-adress">地址</div>
        <span class="order-main-edit-icon">
          <van-icon name="arrow" />
        </span>
      </div>
      <div class="order-main-editdefalut" v-show="true">
        <div class="order-main-editdefalut-p1" v-if="selectAddress.is_default == 1">默认地址</div>
        <div class="order-main-editdefalut-name">
          {{selectAddress.name}}
          <span>{{selectAddress.tel}}</span>
        </div>
        <div class="order-main-editdefalut-adress">{{selectAddress.userAddress}}</div>
        <span class="order-main-editdefalut-icon">
          <van-icon @click="changeAddress" name="arrow" />
        </span>
      </div>
      <div v-for="(item, index) in goods" :key="index" class="order-main-shop">
        <!-- <div > -->
        <div class="order-main-shop-img">
          <img :src="item.url" />
        </div>
        <div class="order-main-shop-message">
          <div class="order-main-shop-message-num">
            <span class="num-span1">{{item.describe}}</span>
            <span>x {{item.num}}</span>
          </div>
          <div class="color">
            <span>{{item.color}}</span>
            <span class="color-span2">{{item.size}}</span>
          </div>
          <div class="price">
            <span>￥ {{item.price}}</span>
            <span
              v-if="item.discount > 0"
              style="margin-left:10px;text-decoration:line-through;"
            >￥ {{item.sell_price}}</span>
          </div>
        </div>
        <!-- </div> -->
      </div>
      <div class="order-main-shop">
        <input
          v-model="userMessage"
          class="order-main-shop-leave"
          style="margin-top: 0.3rem;"
          type="text"
          placeholder="如果有需要，请给卖家留言"
          v-show="true"
        />
      </div>
      <div class="order-main-discounts">
        <van-cell-group v-show="true">
          <van-cell is-link @click="showPopup('payway')">
            <template slot="title">
              <span class="custom-title">支付方式：</span>
              <van-tag>{{payway.value ? payway.value : '请选择支付方式'}}</van-tag>
            </template>
          </van-cell>
          <van-cell v-show="false" is-link @click="showPopup('cash')">
            <template slot="title">
              <span class="custom-title">现金券：</span>
              <van-tag v-if="cash.columns.length > 0">{{cash.value ? cash.value : '请选择现金券'}}</van-tag>
              <van-tag v-if="cash.columns.length == 0">{{'暂无可用现金券'}}</van-tag>
            </template>
          </van-cell>
          <van-cell is-link @click="showPopup('coupon')">
            <template slot="title">
              <span class="custom-title">优惠券：</span>
              <van-tag v-if="coupon.columns.length > 0">{{coupon.value ? coupon.value.name : '请选择优惠券'}}</van-tag>
              <van-tag v-if="coupon.columns.length == 0">{{'暂无可用优惠券'}}</van-tag>
            </template>
          </van-cell>
          <!-- <van-cell is-link>
            <template slot="title">
              <span class="custom-title">积分：</span>
              <van-tag>标签</van-tag>
            </template>
          </van-cell>-->
        </van-cell-group>
        <div class="freight">
          <van-cell-group>
            <van-cell title="商品总金额" :value="`￥ ${countPrice.toFixed(2)}`" size="large" />
            <van-cell title="运费" value="￥ 0.00" size="large" />
          </van-cell-group>
        </div>
      </div>
    </main>
    <footer class="order-foot">
      <div class="order-foot-message">
        <p class="order-foot-message-p1">实际支付：¥{{(countPrice - countDiscount).toFixed(2)}}</p>
        <p>免减总额：¥{{countDiscount.toFixed(2)}}</p>
      </div>
      <div
        class="order-foot-buybtn"
        :style="`background:${ isAllowPay ?'':'#ccc'}`"
        @click="pay"
      >去付款</div>
    </footer>
    <!-- 支付方式 -->
    <van-popup v-model="payway.show" position="bottom">
      <van-picker
        :columns="payway.columns"
        show-toolbar
        @cancel="payway.show = false"
        @confirm="onChangePayway"
      />
    </van-popup>
    <!-- 可使用现金券 -->
    <van-popup
      v-model="aside.isOpen"
      round
      position="right"
      :style="{ width: '85%', height: '85%'}"
      class="popup"
    >
      <div class="title">
        可用{{cash.show?'现金券':'优惠券'}}
        <span>仅可使用其中一张</span>
      </div>
      <div class="xianJianQuan-body" v-if="cash.show">
        <div class="xianJinQuan" v-for="(item, index) in cash.columns" :key="index">
          <div class="number_btn">
            <div class="number">
              <span class="price_used">1000</span>
              /
              <span class="price_all">2000</span>
            </div>
            <div class="btn">使用</div>
          </div>
          <div class="inputbox_time">
            <div class="inputbox">
              <input type="tel" placeholder="请输入使用券值" />
            </div>
            <div class="time">有效期至：2019.05.21</div>
          </div>
        </div>
      </div>
      <div class="youHuiQuan-body" v-if="coupon.show">
        <div class="youHuiQuan"  v-for="(item, index) in cash.columns" :key="index">
          <div class="number_tips">
            <div class="number">{{item.money}}</div>
            <div class="tips">
              <span class="name">{{item.name}}</span>
              <span class="time">有效期至 {{item.endDate}}</span>
            </div>
          </div>
          <div class="btn" @click="chooseCoupon(item)">使用</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import { Cell, CellGroup, Icon, Tag, Picker, Toast } from 'vant';
import back from "@/assets/img/back.png";

Vue.use(Cell)
  .use(CellGroup)
  .use(Icon)
  .use(Tag)
  .use(Picker);
import {
  postGoodOrder,
  postGetAlipayCode,
  postDirectGoodOrder
} from "@/api/order.js";
export default {
  data() {
    return {
      payway: {
        show: false,
        columns: ["支付宝"],
        value: ""
      },
      coupon: {
        show: false,
        columns: [
          {
            endDate: "2019.08.31",
            id: 1,
            money: 200,
            name: "测试优惠券",
            range: "全部适用",
            startDate: "2019.08.26",
            status: "未使用"
          }
        ],
        value: ""
      },
      cash: {
        show: false,
        columns: [
          {
            endDate: "2019.08.31",
            id: 1,
            money: 200,
            name: "测试优惠券",
            range: "全部适用",
            startDate: "2019.08.26",
            status: "未使用"
          }
        ],
        value: ""
      },
      aside: {
        isOpen: false
      },
      userAddress: [],
      selectAddress: {},
      userMessage: "",
      goods: [],
      url: "",
      newWin: null // 新窗口的引用
    };
  },
  watch: {
    "aside.isOpen": {
      handler: function(newVal, oldVal) {
        if (newVal) {
        } else {
          this.coupon.show = newVal;
          this.cash.show = newVal;
        }
      }
    },
    url(newVal, oldVal) {
      if (newVal && this.newWin) {
        this.newWin.location.href = newVal;
        // 重定向后把 url 和 newWin 重置
        this.url = "";
        this.newWin = null;
      }
    }
  },
  computed: {
    countPrice() {
      return this.goods.reduce((pre, next) => {
        return pre + next.price * next.num;
      }, 0);
    },
    countDiscount() {
      return this.goods.reduce((pre, next) => {
        return pre + next.discount * next.num;
      }, 0);
    },
    isAllowPay() {
      return this.payway.value;
    }
  },
  created() {},
  mounted() {
    const address = sessionStorage.getItem("select address");
    if (address) {
      this.selectAddress = JSON.parse(address);
      this.goods = JSON.parse(sessionStorage.getItem("roder good"));
    } else {
      this.getAddress();
    }

    const buyGoods = sessionStorage.getItem("buy goods");
    const { type } = this.$route.query;
    if (buyGoods && type == 1) {
      this.goods = [JSON.parse(buyGoods)];
    }
  },
  beforeDestroy() {
    sessionStorage.removeItem("select address");
  },
  methods: {
    // 选择优惠券
    chooseCoupon(item) {
      this.coupon.value = item;
      this.aside.isOpen = false;
    },
    // 选择支付方式
    onChangePayway(value) {
      this.payway.value = value;
      this.payway.show = false;
    },
    // 选择弹出层
    showPopup(type) {
      this[type].show = true;
      if (["coupon", "cash"].indexOf(type) >= 0) {
        if(this[type].columns.length > 0) {
          this.aside.isOpen = true;
        }
        
      }
    },
    // 直接下单
    directGoodsOrder(params = {}) {
      let _this = this;
      // 先打开一个空的新窗口，再请求
      this.newWin = window.open();
      postDirectGoodOrder(params).then(response => {
        let { out_trade_no, body, totalPrice } = response;
        let url = `http://testapi.aomengyujia.com/api/alipay/wappay/get?out_trade_no=${out_trade_no}&body=${body}&totalPrice=${totalPrice}`;
        _this.url = url || "";
      });
    },
    // 订单下单
    goodsOrder(params) {
      let _this = this;
      // 先打开一个空的新窗口，再请求
      this.newWin = window.open();
      postGoodOrder(params).then(response => {
        let { out_trade_no, body, totalPrice } = response;
        let url = `http://testapi.aomengyujia.com/api/alipay/wappay/get?out_trade_no=${out_trade_no}&body=${body}&totalPrice=${totalPrice}`;
        _this.url = url || "";
      });
    },
    // 支付
    pay() {
      if (!this.isAllowPay) return;
      if (this.payway.value === '微信'){
        Toast('暂不支持该支付方式')
        return;
      }
      
      const ids = this.goods.map(item => item.id);
      const goodsIds = this.goods.map(item => item.goodListId);
      const nums = this.goods.map(item => item.num);
      const { tel, address, area, city, province, name } = this.selectAddress;
      const { id:couponId } = this.coupon.value
      // console.log(couponId);
      // return;
      let params = {
        id: ids,
        lid: goodsIds,
        num: nums,
        userName: name,
        userTel: tel,
        province,
        area,
        city,
        userAddress: address,
        userMessage: this.userMessage,
        status: "0", // 0不是新增地址 1是新增地址
        addressId: this.selectAddress.id,
        cashId: "", //现金券编号
        cashMoney: "", //现金券使用金额
        couponId: couponId || '', //优惠券编号
        fraction: "" //使用积分
      };

      const buyGoods = sessionStorage.getItem("buy goods");
      const { type } = this.$route.query;
      if (buyGoods && type == 1) {
        const m_params = {
          id: ids,
          num: nums,
          size: this.goods.map(item => item.size),
          color: this.goods.map(item => item.color),
          addressId: this.selectAddress.id,
          cashId: "", //	现金券编号
          cashMoney: "", //	现金券使用金额
          couponId: couponId ||"", //	优惠券编号
          fraction: "" //	使用积分
        };
        this.directGoodsOrder(m_params);
      } else {
        this.goodsOrder(params);
      }

      // return;
    },
    // 返回
    back() {
      this.$router.go(-1);
      sessionStorage.removeItem("roder good");
    },
    // 修改地址
    changeAddress() {
      this.$router.push("/address?type=1");
    },
    getAddress() {
      this.$request.get("/goodOrder/create").then(data => {
        // console.table(data.address);
        const { type } = this.$route.query;
        if (!type) {
          sessionStorage.setItem("roder good", JSON.stringify(data.goods));
          this.goods = data.goods;
        }

        if (data.address.length === 0) {
          return;
        }
        this.coupon.columns = data.coupon
        this.cash.columns = data.cash
        const default_address = data.address.filter(
          item => item.is_default == 1
        )[0];
        this.selectAddress = default_address;
        if (!default_address) {
          this.selectAddress = data.address[0];
        }
        // this.userAddress = data.address;
      });
    }
  }
};
</script>
<style lang="css" scoped>
.order >>> .van-cell__title {
  color: #2c2c2c;
  max-width: 100%;
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

.custom-title {
  width: 5em;
  text-align: right;
  display: inline-block;
}
.popup {
  padding: 10px;
  .title {
    padding: 10px 0;
    font-size: 14px;
    span {
      font-size: 11px;
      color: #999;
      margin-left: 10px;
    }
  }
  .xianJianQuan-body {
    .xianJinQuan {
      background-image: url("~@/assets/img/coup_bg.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      width: 294px;
      height: 108px;
      padding: 15px 6px 6px 15px;
      .number_btn {
        padding-bottom: 10px;
        display: flex;
        justify-content: space-between;

        .number {
          color: #fff;
          font-size: 30px;
          position: relative;
          &::after {
            content: "剩余券值/总券值";
            display: back;
            position: absolute;
            left: 50%;
            bottom: -1em;
            transform: translateX(-70%);
            font-size: 11px;
          }
          .price_used,
          .price_all {
            margin: 0 10px;
            font-size: 30px;
            color: #fff;
            position: relative;
            &::after {
              content: "¥";
              display: back;
              position: absolute;
              top: 50%;
              left: -0.5em;
              transform: translateY(-50%);
              font-size: 20px;
            }
          }
          .price_all {
            font-size: 30px;
            margin-left: 14px;
            color: #fff;
          }
        }
        .btn {
          padding: 6px 18px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          color: #83b74d;
        }
      }
      .inputbox_time {
        padding-top: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .inputbox {
          input {
            padding-left: 10px;
            width: 120px;
            height: 24px;
            border-radius: 24px;
          }
        }
        .time {
          color: #fff;
        }
      }
    }
  }
  .youHuiQuan-body {
    .youHuiQuan {
      background-image: url("~@/assets/img/coup_bg.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      width: 294px;
      // height: 68px;
      padding: 15px 6px 6px 15px;
      display: flex;
      justify-content: space-between;
      .number_tips {
        display: flex;
        .number {
          margin: 0 10px;
          font-size: 30px;
          color: #fff;
          display: inline-block;
          position: relative;
          &::after {
            content: "¥";
            display: back;
            position: absolute;
            top: 50%;
            left: -0.5em;
            transform: translateY(-50%);
            font-size: 20px;
          }
        }
        .tips {
          .name {
            color: #fff;
            display: block;
          }
          .time {
            // display: block;
            padding-top: 1em;
            color: #fff;
            font-size: 11px;
          }
        }
      }
      .btn {
        padding: 6px 18px;
        border-radius: 18px;
        height: 24px;
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        background: #fff;
        color: #83b74d;
      }
    }
  }
}
.order {
  width: 100%;
  // height: 100%;
  header {
    height: 35px;
    text-align: center;
    background: #eeeeee;
    font-size: 16px;
    line-height: 35px;
  }
  &-main {
    // width: 100%;
    // height: 100%;
    background: #eeeeee;
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
        border-bottom: 1px solid #e5e5e5;
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
      background: #f1f8e2;
      position: relative;
      overflow: hidden;

      &-p1 {
        position: absolute;
        left: 0;
        top: 0;
        width: 81px;
        height: 17px;
        background: #b3d465;
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
        margin: 17px 0 0 81px;
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
            border: 1px solid #e5e5e5;
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
        background: #eeeeee;
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
        color: #a3c554;
      }
    }
    &-buybtn {
      width: 104px;
      height: 100%;
      text-align: center;
      line-height: 49px;
      font-size: 14px;
      color: white;
      background: #b3d465;
    }
  }
}
</style>