<template>
  <div class="order">
    <!-- <header>填写订单</header> -->
    <van-nav-bar title="填写订单" left-arrow @click-left="back" />
    <main class="order-main">
      <div class="add-address" @click="changeAddress" v-if="!selectAddress.name">
        <van-icon name="plus" />
        <span>添加地址</span>
      </div>
      <div class="order-main-editdefalut" v-show="selectAddress.name">
        <div class="order-main-editdefalut-p1" v-if="selectAddress.is_default == 1">默认地址</div>
        <div class="order-main-editdefalut-name">
          {{selectAddress.name}}
        </div>
        <div class="order-main-editdefalut-adress">
          <div>{{selectAddress.tel}}</div>
          <div>{{selectAddress.userAddress}}</div>
        </div>
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
        <div class="jifen-use">
          <div class="title">积分使用</div>
          <div class="jifen-use-rules" v-if="item.good_discount.积分.length!==0" @click="showJifen(index)">
              <span v-if="!jf_id[index]&&!single_jfid">不使用积分</span>
              <span v-else>
                {{info[index]}}
              </span>
            <van-icon name="arrow" />
          </div>
          <div v-else>非积分可优惠商品，积分不参与减免</div>
        </div>
        <div class="subtotal">
          <span class="one">共<span class="num">{{item.num}}</span>件</span>
          <span>小计：
            <span class="price">
              ￥{{!jf_id[index]&&!single_jfid?item.price:subtotal[index]}}
            </span>
          </span>
        </div>
        <!-- </div> -->
      </div>
      <div class="order-main-discounts">
        <van-cell-group v-show="true">
          <van-cell is-link @click="showPopup('payway')">
            <template slot="title">
              <span class="custom-title">支付方式：</span>
              <van-tag>{{payway.value ? payway.value : '请选择支付方式'}}</van-tag>
            </template>
          </van-cell>
          <!-- <van-cell is-link @click="showPopup('cash')">
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
          </van-cell> -->
          <!-- <van-cell is-link>
            <template slot="title">
              <span class="custom-title">积分：</span>
              <van-tag>标签</van-tag>
            </template>
          </van-cell> -->
        </van-cell-group>
        <!-- <div class="freight">
          <van-cell-group>
            <van-cell title="商品总金额" :value="`￥ ${countPrice.toFixed(2)}`" size="large" />
            <van-cell title="运费" value="￥ 0.00" size="large" />
          </van-cell-group>
        </div> -->
      </div>
    </main>
    <footer class="order-foot">
      <div class="order-foot-message">
        <p class="order-foot-message-p1">共 {{totalNum}} 件</p>
        <span>免减总额：¥{{deductionTotal}}</span>
      </div>
      <div class="order-foot-pay">实际支付：￥{{countPrice}}</div>
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
    <van-popup class="jifen-integral"
      v-model="show"
      round
      position="bottom"
      :style="{ height: '60%' }"
    >
      <div class="jifen-integral-use">积分使用</div>
      <van-radio-group v-model="radio">
        <van-cell-group :border="false">
          <van-cell :title="item.consume+'积分,减免'+item.deduction +'元'" :border="false" 
          clickable @click="radio = item.id"
          v-for="(item,index) in goods_integral[goods_id]" :key="index">
            <van-radio slot="right-icon" :name="item.id" />
          </van-cell>
          <van-cell title="不使用积分" :border="false" clickable @click="radio = 0">
            <van-radio slot="right-icon" :name="0" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <div class="button" @click="comfirm">确定</div>
    </van-popup>
    <!-- 可使用现金券 -->
    <!-- <van-popup
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
    </van-popup> -->
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
        // columns: ["支付宝", '微信'],
        columns: ["支付宝"],
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
      type: '',
      userAddress: [],
      selectAddress: {},
      userMessage: "",
      goods: [],
      url: "",
      newWin: null, // 新窗口的引用
      form: '' ,  // 支付宝提交的表单数据
      show: false,
      radio: 0,
      goods_id: '',
      goods_integral: [],
      // 多件商品折扣 id
      jf_id: [],
      // 单间折扣
      single_jfid: 0,
      info: [],
      // 商品小计价格
      subtotal: [],
      // 减免总额
      deductionTotal: 0,
      deduction: [],
      // 总价
      totalPrice: [],
      total_price: 0

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
    },
    
  },
  computed: {
    // 实际支付价格
    countPrice() {
      var s =0;
      this.goods.forEach(item => {
        s += parseFloat(item.price);
      })
      return (s - this.deductionTotal).toFixed(2);
    },
    // 商品总件数
    totalNum() {
      var num = 0;
      this.goods.forEach(item => {
        num += item.num;
      })
      return num;
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
    },
    
  },
  created() {
    const address = sessionStorage.getItem("select address");
    if (address) {
      this.selectAddress = JSON.parse(address);
      if(sessionStorage.getItem("roder good")) {
        this.goods = JSON.parse(sessionStorage.getItem("roder good"));
      }
      store.commit('loadStatus', false)
    } else {
      this.getAddress();
    }
    // 获取单件商品的数据
    const buyGoods = sessionStorage.getItem("buy goods");
    const { type } = this.$route.query;
    this.type = type;
    if (type == 1 && buyGoods ) {
      this.goods = [JSON.parse(buyGoods)];
      let that = this;
      this.goods.forEach(item => {
        that.goods_integral.push(item.good_discount.积分);
      })
    }
  },
  mounted() {
    
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
    // 展示积分选择 
    showJifen(index) {
      this.show = true;
      if(this.goods_id!==index) {
        this.radio = 0;
      }
      this.goods_id = index;
    },
    // 展示所选折扣
    consume() {
      var that = this;
      this.goods.forEach((good_item,index) => {
        if(this.goods_id===index) {
          good_item.good_discount.积分.forEach(item => {
            if(item.id===that.radio) {
              that.info[this.goods_id] = item.consume+'积分 减免'+item.deduction+'元';
              var price = good_item.price - item.deduction;
              that.subtotal[this.goods_id] = price<=0?0:price.toFixed(2);
              that.deduction[this.goods_id] = good_item.price - that.subtotal[this.goods_id];
            } 
            if(that.radio==0) {
              that.deduction[this.goods_id] = 0;
            }
          })
        }
      })
    },
    // 减免总额 
    totalDeduction() {
      var s = 0;
      this.deduction.forEach( item => {
        s += item;
      })
      this.deductionTotal = s.toFixed(2);
    },
    // 确定
    comfirm() {
      this.show = false;
      if(!this.type) {
        this.jf_id[this.goods_id] = this.radio;
      } else {
        this.single_jfid = this.radio;
      }
      this.consume();
      this.totalDeduction();
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
    // 支付
    pay() {
      if (!this.isAllowPay) return
      const buyGoods = JSON.parse(sessionStorage.getItem("buy goods"));
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
        discountId: this.jf_id,
        status: 0, 
        userName: name,
        userTel: tel,
        province,
        area,
        city,
        address,
        addressId: this.selectAddress.id,
      };
      if (buyGoods && this.type == 1) {
        var m_params = {
          id: buyGoods.id,
          num: buyGoods.num,
          size: buyGoods.size,
          color:buyGoods.color,
          status: 0,
          userName: name,
          userTel: tel,
          province,
          area,
          city,
          address,
          addressId: this.selectAddress.id,
          discountId: this.single_jfid,
        };
      } 
      if(this.type) {
        this.singlePay(m_params);
      } else {
        this.manyPay(params);
      }
      if (this.payway.value === "微信") {
        if (isWeiXin) {
        }
      }
    },
    // 单件支付，创建订单
    singlePay(params) {
      this.$request.post('/goods/order/mobile', params).then(res => {
        if(res.code === 200) {
          Toast("恭喜您，课程购买成功");
           setTimeout(() => {
              this.$router.push('/order');
            }, 2000);
        } else if(res.msg === 'OK'&&res.code===201) {
          this.payMoney(res.out_trade_no);
        } 
      }).catch(error => {
        if(error.code === 403) {
          Toast("订单生成失败，您的积分不足");
        } else {
          Toast("抱歉，网络出了点问题，请检查你的网络！");
        }
      })
    },
    // 多件支付，创建订单
    manyPay(params) {
      this.$request.post('/goodOrder', params).then(res => {
        console.log(res);
        if(res.code === 200) {
          Toast("恭喜您，课程购买成功");
           setTimeout(() => {
              this.$router.push('/order');
            }, 2000);
        } else if(res.msg === 'OK'&&res.code===201) {
          this.payMoney(res.out_trade_no);
        }
      }).catch(error => {
        if(error.code === 403) {
          Toast("订单生成失败，您的积分不足");
        } else {
          Toast("抱歉，网络出了点问题，请检查你的网络！");
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
      this.$request.get('/alipay/wechat/h/test?out_trade_no=' + orderId ).then((res) => {
        let routeData = this.$router.resolve({ path: 'payforwx', query: { htmls: res.mweb_url, body: res.body, id: res.out_trade_no }});
        window.open(routeData.href, '_blank')
      }).catch((error) => {
        Toast(error)
      })
    },
    // 获取微信浏览器接口
    payForWexin (orderId) {
      this.$request.get('/alipay/wechat/jsapi/test?out_trade_no=' + orderId ).then((res) => {
        let routeData = this.$router.resolve({ path: 'payforwx', query: { htmls: res.mweb_url, body: res.body, id: res.out_trade_no }});
        window.open(routeData.href, '_blank')
      }).catch((error) => {
        Toast(error)
      })
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
    // 获取收货地址 和 多件商品的数据
    getAddress() {
      this.$request.get("/goodOrder/create").then(data => {
        const { type } = this.$route.query;
        // 多件商品时的数据
        if(!type) {
          this.goods = data.goods;
          // 处理未支付，跳到订单页面
          if(this.goods.length===0) {
            this.$router.push('/myorder?order=1');
            return
          }
          sessionStorage.setItem("roder good", JSON.stringify(data.goods));
          // 处理积分规则数据
          let that = this;
          this.goods.forEach(item => {
            that.goods_integral.push(item.good_discount.积分);
            that.jf_id.push(0);
          })
        } 

        // 进入页面，将已有的地址展示到页面
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
.van-nav-bar {
  position: fixed;
  top: 0;
}
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
    width: 100%;
    // height: 100%;
    background: #eeeeee;
    font-size: 12px;
    margin-top: 47px;
    margin-bottom: 50px;
    overflow: hidden;
    overflow-y: scroll;
    &-editdefalut {
      width: 100%;
      height: 106px;
      padding-top: 30px;
      background-color: #fff;
      position: relative;
      overflow: hidden;
      display: flex;
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
        width: 62px;
      }
      &-adress {
        div:nth-child(1) {
          margin-bottom: 17px;
        }
      }
      &-icon {
        position: absolute;
        top: 38%;
        right: 3%;
        display: inline-block;
        .van-icon {
          font-size: 24px;
        }
      }
    }
    &-shop {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      background: white;
      margin-top: 3px;
      &-img {
        width: 78px;
        height: 79px;
        margin: 11px 18px 15px 16px;
      }
      &-message {
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
            font-size: 10px;
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
      .jifen-use {
        display: flex;
        align-items: center;
        width: 100%;
        height: 20px;
        padding: 0 16px;
        margin-bottom: 40px;
        font-size: 13px;
        .title {
          width: 78px;
          margin-right: 18px;
          text-align: right;
        }
        &-rules {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 20px;
          color: #E02121;
          .van-icon {
            font-size: 15px;
          }
        }
      }
      .subtotal {
        width: 100%;
        padding-right: 28px;
        margin-bottom: 19px;
        text-align: right;
        font-size: 10px;
        .one {
          margin-right: 9px;
          color: #999;
        }
        .num {
          color: #E02121;
        }
        .price {
          color: #96BB3F;
        }
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
    justify-content: space-between;
    color: #999;
    background: white;
    &-message {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 9px 0;
      padding-left: 16px;
      &-p1 {
        font-size: 13px;
      }
    }
    &-pay {
      display: flex;
      align-items: flex-end;
      padding-bottom: 9px;
      font-size: 13px;
      color: #A3C554;
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
.jifen-integral {
  &-use {
    margin-top: 26px;
    margin-bottom: 50px;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
  }
  .button {
    position: absolute;
    left: 16px;
    bottom: 9px;
    width: 343px;
    height: 44px;
    line-height: 44px;
    background-color: #B3D465;
    border-radius: 10px;
    font-size: 14px;
    color: #fff;
    text-align: center;
  }
}
</style>