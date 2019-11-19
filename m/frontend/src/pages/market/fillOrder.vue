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
      <!-- <div class="add_address" @click="changeAddress"><span style="font-size:26px;">+</span>新增地址</div> -->
      <div class="add-address" @click="changeAddress" v-if="!selectAddress.name">
        <van-icon name="plus" />
        <span>添加地址</span>
      </div>
      <div class="order-main-editdefalut" v-show="selectAddress.name">
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
          <van-cell is-link @click="showPopup('cash')">
            <template slot="title">
              <span class="custom-title">现金券：</span>
              <van-tag v-if="cash.columns.length > 0">{{cash.value.name ? cash.value.name : '请选择现金券'}}</van-tag>
              <van-tag v-if="cash.columns.length == 0">{{'暂无可用现金券'}}</van-tag>
            </template>
          </van-cell>
          <van-cell is-link @click="showPopup('coupon')">
            <template slot="title">
              <span class="custom-title">优惠券：</span>
              <van-tag
                v-if="coupon.columns.length > 0"
              >{{coupon.value ? `${coupon.value.name}` : '请选择优惠券'}}</van-tag>
              <van-tag v-if="coupon.columns.length == 0">{{'暂无可用优惠券'}}</van-tag>
            </template>
          </van-cell>
          <!-- <van-cell is-link>
            <template slot="title">
              <span class="custom-title">积分：</span>
              <van-tag>标签</van-tag>
            </template>
          </van-cell> -->
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
        <p class="order-foot-message-p1">实际支付：¥{{(countPrice - countDiscount).toFixed(2)>0 ? (countPrice - countDiscount).toFixed(2):0}}</p>
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
              <span class="price_used">{{item.surplus}}</span>
              /
              <span class="price_all">{{item.money}}</span>
            </div>
            <div class="btn" @click="chooseCash(item)">{{item.id == cash.value.id ? '正在使用' :'使用'}}</div>
          </div>
          <div class="inputbox_time">
            <div class="inputbox">
              <input type="tel" v-model.lazy.number.trim="item.use_val" @change="useCashVal(item, index)" placeholder="请输入使用券值" />
            </div>
            <div class="time">有效期至：{{item.endDate}}</div>
          </div>
        </div>
      </div>
      <div class="youHuiQuan-body" v-if="coupon.show">
        <div class="youHuiQuan" v-for="(item, index) in coupon.columns" :key="index">
          <div class="number_tips">
            <div class="number">{{item.money}}</div>
            <div class="tips">
              <span class="name">{{item.name}}</span>
              <span class="time">有效期至 {{item.endDate}}</span>
            </div>
          </div>
          <div class="btn" @click="chooseCoupon(item)">{{item.id == coupon.value.id ? '正在使用' :'使用'}}</div>
        </div>
      </div>
    </van-popup>
    <div>
    </div>
    <div v-html="form"></div>
  </div>
</template>

<script>
import Vue from "vue";
import store from '@/store'
import { Cell, CellGroup, Icon, Tag, Picker, Toast } from "vant";
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
        columns: ["支付宝", '微信'],
        value: ""
      },
      coupon: {
        show: false,
        columns: [
        ],
        value: ""
      },
      cash: {
        show: false,
        columns: [
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
      newWin: null, // 新窗口的引用
      form: '' ,  // 支付宝提交的表单数据
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
      let total = 0;
      let { money: p_money = 0 } = this.coupon.value
      let { money: s_money = 0, surplus, use_val } = this.cash.value
      if(p_money) {
        total += p_money
      }
      if(surplus) {
        if(use_val && use_val < surplus){
          total += parseInt(use_val)
        } else {
          total += surplus
        }
        
      }
      return this.goods.reduce((pre, next) => {
        return pre + next.discount * next.num;
      }, 0) + total;
    },
    isAllowPay() {
      return this.payway.value && this.selectAddress.name;
    }
  },
  created() {},
  mounted() {
    const address = sessionStorage.getItem("select address");
    if (address) {
      this.selectAddress = JSON.parse(address);
      this.goods = JSON.parse(sessionStorage.getItem("roder good"));
      store.commit('loadStatus', false)
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
    // 现金券的输入金额
    useCashVal(item) {      
      if(item.surplus < item.use_val) {
        Toast('输入的券值不能超过剩余券值')
      }
      if(item.use_val < 0) {
        Toast('输入的券值不能为负数')
      }
    },
    // 选择现金券
    chooseCash(item) {
      if(item.surplus < item.use_val) {
        Toast('输入的券值不能超过剩余券值')
        return;
      }
      if(item.use_val < 0) {
        Toast('输入的券值不能为负数')
        return;
      }
      this.cash.value = item
      this.aside.isOpen = false;
    },
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
        if (this[type].columns.length > 0) {
          this.aside.isOpen = true;
        }
      }
    },
    // 直接下单
    // directGoodsOrder(params = {}) {
    //   let _this = this;
    //   // 先打开一个空的新窗口，再请求
    //   this.newWin = window.open();
    //   postDirectGoodOrder(params).then(response => {
    //     let { out_trade_no, body, totalPrice } = response;
    //     let url = `http://testapi.aomengyujia.com/api/alipay/wappay/get?out_trade_no=${out_trade_no}&body=${body}&totalPrice=${totalPrice}`;
    //     _this.url = url || "";
    //   });
    // },
    // // 订单下单
    // goodsOrder(params) {
    //   let _this = this;
    //   // 先打开一个空的新窗口，再请求
    //   this.newWin = window.open();
    //   postGoodOrder(params).then(response => {
    //     let { out_trade_no, body, totalPrice } = response;
    //     let url = `http://testapi.aomengyujia.com/api/alipay/wappay/get?out_trade_no=${out_trade_no}&body=${body}&totalPrice=${totalPrice}`;
    //     _this.url = url || "";
    //   });
    // },

    // 创建订单
    creatOrder() {
        const orderParams = this.paramsDeal();

    },
    // 支付
    pay() {
      if (!this.isAllowPay) return
      const buyGoods = sessionStorage.getItem("buy goods");
      const { type } = this.$route.query;
      const ids = this.goods.map(item => item.id);
      const goodsIds = this.goods.map(item => item.goodListId) ;
      const nums = this.goods.map(item => item.num);
      const { tel, address, area, city, province, name } = this.selectAddress;
      const { id: couponId } = this.coupon.value;
      const { id: cashId, use_val, surplus } = this.cash.value;
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
        cashId: cashId || "", //现金券编号
        cashMoney: (use_val >= surplus ? surplus : use_val) || "", //现金券使用金额
        couponId: couponId || "", //优惠券编号
        fraction: "" //使用积分
      };
      if (buyGoods && type == 1) {
        const m_params = {
          id: ids,
          num: nums,
          size: this.goods.map(item => item.size),
          color: this.goods.map(item => item.color),
          addressId: this.selectAddress.id,
          cashId: cashId || "", //现金券编号
          cashMoney: (use_val >= surplus ? surplus : use_val) || "", //现金券使用金额
          couponId: couponId || "", //优惠券编号
          fraction: "" //	使用积分
        };
      }
      // 支付宝支付
        this.$request.post('/goodOrder', params).then(res => {
          console.log(res)
          if (this.payway.value === "支付宝") {
          //   if(res.code === 200) {
          //     if (this.fraction === 0) {
          //         Toast("已购买")
          //     } else {
          //         this.payMoney(res.out_trade_no);
          //     }
          // } 
          if(res.msg === 'OK') {
              if (this.fraction === 0 || res.code === 200) {
                  Toast('恭喜您，课程购买成功');
                  setTimeout(() => {
                      this.$router.go(-1)
                  }, 2000)
              } else {
                  this.payMoney(res.out_trade_no);
              }
          } 
          else {
              this.$toast({
                  message: res.msg,
              });
              // setTimeout(() => {
              //         this.$router.go(-1)
              //     }, 2000)
          }
          }
      if (this.payway.value === "微信") {
        // Toast('暂未开通微信支付')
      //   console.log(1)
        if (this.isWeiXin) {
          // this.payForWexin(res.out_trade_no)
          this.payForWexinw(res.out_trade_no)
        } else {
          this.payForWexinw(res.out_trade_no)
        }
      }
      })

    },
    isWeiXin () {
      var ua = window.navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){
          return true;
      }else{
          return false;
      }
    },
    // 获取支付宝接口
    payMoney(orderId) {
        this.$request.get('/alipay/wappay/get?out_trade_no=' + orderId).then(res => {
          this.form = res;
          this.$nextTick(() => {
              document.forms['alipaysubmit'].submit() //渲染支付宝支付页面
          })
        })
    },
    // 获取微信外部接口
    payForWexinw (orderId) {
      this.$request.get('/alipay/wechat/h5?out_trade_no=' + orderId ).then((res) => {
        let routeData = this.$router.resolve({ path: 'payforwx', query: { htmls: res, body: res.body, id: res.out_trade_no }});
        window.open(routeData.href, '_blank')
        // console.log(res.innerHTML)
        // window.location.href = res
      })
    },
    // 获取微信浏览器接口
    payForWexin (orderId) {
      this.$request.get('/alipay/wechat/h/test?out_trade_no=' + orderId ).then((res) => {
        let routeData = this.$router.resolve({ path: 'payforwx', query: { htmls: res.mweb_url }});
        window.open(routeData.href, '_blank')
      }).catch((error) => {
        Toast(error)
      })
      // window.location.href = 'http://testapi.aomengyujia.com/api/alipay/wechat/h5?out_trade_no=' + orderId 
      // .then((res) => {
      //   // if(res.msg === 'ok') {
      //   //   let routeData = this.$router.resolve({ path: 'payforwx', query: { htmls: res }});
      //   //   window.open(routeData.href, '_blank')
      //   //   // console.log(res.innerHTML)
      //   //   // window.location.href = res
      //   // } else {
      //   //   Toast(res.msg)
      //   // }
      // })
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
        const { type } = this.$route.query;
        if (!type) {
          sessionStorage.setItem("roder good", JSON.stringify(data.goods));
          this.goods = data.goods;
        }


        this.coupon.columns = data.coupon;
        this.cash.columns = data.cash.map(item => {
          item.use_val = ''
          return item
        });

        if (data.address.length === 0) {
          return;
        }
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
.add-address {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 49px;
    background-color: #fff;
    color: #A3C554;
    font-size: 13px;
    .van-icon {
        color: #A3C554;
        margin-right: 5px;
    }
    span{
      color: #A3C554;
    }
}
.add_address {
  padding: 1em;
  text-align: center;
  border: 10px solid transparent;
  background: #fff;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  // background: linear-gradient(white, white) padding-box,
  //   repeating-linear-gradient(
  //       -45deg,
  //       red 0,
  //       red 12.5%,
  //       transparent 0,
  //       transparent 25%,
  //       #58a 0,
  //       #58a 37.5%,
  //       transparent 0,
  //       transparent 50%
  //     )
  //     0 / 6em 6em;
}
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
      margin: 5px 0;
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
            width: 8em;
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
      margin: 5px 0;
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
        display: inline-block;
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