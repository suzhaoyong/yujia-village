<template>
  <div style="padding-bottom:5rem;">
    <div class="order-box" >
      <div class="navs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/market/index' }">商城</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/goods/shopcar' }">购物车</el-breadcrumb-item>
          <el-breadcrumb-item>订单确认</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="order">
        <session-title name="填写订单"></session-title>
        <div class="take-delivery">
          <div class="delivery">
            <div class="header"><span>收货人信息</span></div>
            <div class="body">
              <div class="personal">
                <div class="personal_left">
                  <div class="receiver_item">
                  <span class="receiver">收&nbsp;&nbsp;货&nbsp;&nbsp;人：<span class="receiver_name">ivan</span></span>
                  </div>
                  <div class="receiver_item">
                  <span class="receiver">联系电话：<span class="receiver_name">15211373093</span></span>
                  </div>
                  <div class="receiver_item">
                  <span class="receiver">收获地址：<span class="receiver_name">chengdushisldfjasdlfjsdladsfjasdl</span></span>
                  </div>
                </div>
                <div class="personal_right">
                  <div class="dizhi">
                  <img src="../../assets/order/adress.png"/>
                  <span class="adress">默认地址</span>
                </div>
                <div class="edit">修改</div>
                </div>
              </div>
              <div class="deliviery">
                <div class="deliviery_top">
                  <img src="../../assets/order/switch.png"/>
                  <span class="deliviery_adress">切换地址</span>
                </div>
                <div class="deliviery_bottom">
                  <img src="../../assets/order/newly.png"/>
                  <span class="deliviery_adress">新增地址</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="goods-box">
          <div class="header">
            <div class="item">商品信息</div>
            <div class="item">颜色尺码</div>
            <div class="item">价格/数量</div>
          </div>
          <div class="body">
            <div v-if="goods.length>0">
              <div class="goods" v-for="(item, index) in goods" :key="index">
                <div class="info">
                  <div class="img">
                    <img :src="item.url" alt />
                  </div>
                  <div class="title-say">
                    <div class="title">{{item.describe}}</div>
                    <!-- <div class="say"></div> -->
                  </div>
                </div>
                <div class="specifications">
                  <div class="key-value">
                    <div class="key">颜色:</div>
                    <div class="value">{{item.color}}</div>
                  </div>
                  <div class="key-value">
                    <div class="key">尺码:</div>
                    <div class="value">{{item.size}}</div>
                  </div>
                </div>
                <div class="price-number">
                  <div class="price">￥{{item.sell_price - item.discount}}</div>
                  <div class="number">x{{item.num}}</div>
                </div>
              </div>
            </div>
            <not-found v-if="goods.length === 0" type="not-fond_2" msg="我寻寻觅觅却找不见您购物车的踪迹"></not-found>
          </div>
        </div>
        <div class="payment_mode">
          <div class="mode_top"><span>支付方式</span></div>
          <div class="mode_bottom">
            <div class="zhifubao" @click="pay.way='alipay'">
              <img src="../../assets/order/alipay_active.png" class="zfb_img" />
              <span class="zfb_text">支付宝</span>
            </div>
            <div class="weixin">
              <img src="../../assets/order/wechat_active.png" class="wx_img" />
              <span class="wx_text">微信支付</span>
            </div>
          </div>
        </div>
        <div class="Integraluse">
          <div class="Integraluse_top"><span>积分使用</span></div>
          <div class="Integraluse_bottom">
            <div class="use_one">
                <el-radio v-model="radio" :label="1">2000 积分 商品减免 0000 元</el-radio>
            </div>
            <div class="use_two">
                <el-radio v-model="radio" :label="2">5000 积分 商品减免 0000 元</el-radio>
            </div>
            <div class="use_three">
                <el-radio v-model="radio" :label="3">不使用积分</el-radio>
            </div>
            <div class="use_four">
              <span class="span_use">1件商品，总商品金额</span>
              <span class="span_uses">335元</span>
            </div>
            <div class="use_five">
              <span class="span_use">运费</span>
              <span class="span_uses">0.00元</span>
            </div>
            <div class="use_six">
              <span class="span_use">商品优惠</span>
              <span class="span_uses">225元</span>
            </div>
          </div>
        </div>
        <div class="sum">
          <div class="back-shopcat" @click="back">
            <div class="img">
              <img :src="icon.backIcon" alt />
            </div>返回购物车修改
          </div>
          <div class="count">
            <span class="title">应付金额</span>
            <span class="tips">(不含运费)</span>
            <div class="price">¥{{getAllSelectNumberAndPrice.allPrice}}</div>
          </div>
          <div class="sumbit" @click="submitForm">提交订单</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VDistpicker from "v-distpicker";
import backIcon from "@/assets/market/back.png";
import {
  getUserAddress,
  getUserOrder,
  postGoodOrder,
  postGetAlipayCode,
  postGetWechatpayCode,
  postGetAlipayOrder,
  postGetWechatOrder
} from "@/api/market";
export default {
  components: {
    VDistpicker
  },
  data() {
    return {
      radio:'',
      icon: {
        backIcon
      },
      orderGoods: {
        id: '',
        cashId: '',
        cashMoney: '',
        couponId: '',
        fraction: '',
        discountId: ''
      },
      formGoods: {
        out_trade_no: '',
        body: '',
        total_fee: ''
      },
      isPayWay: false,
      pay: {
        type: ''
      },
      good_discount: {积分: [], 金币: []},
      goods: [],
      address: [],
      addressActive: {},
      ruleForm: {
        id: "", // 购物车列表编号
        lid: "", // 商品副列表 编号
        num: "",
        userName: "",
        userTel: "",
        province: "",
        area: "",
        city: "",
        userAddress: "",
        userMessage: "",
        status: "", // 0不是新增地址 1是新增地址
        addressId: "",
        cashId: "", //现金券编号
        cashMoney: "", //现金券使用金额
        couponId: "", //优惠券编号
        fraction: "" //使用积分
      }
    };
  },
  computed: {
    getAllSelectNumberAndPrice() {
      let allGoods = this.goods;
      let allPrice = allGoods.reduce((pre, cur) => {
        return (
          parseFloat(pre) + parseInt(cur.num) * (cur.sell_price - cur.discount)
        );
      }, 0);
      return { allPrice: allPrice.toFixed(2), allGoodsNumber: allGoods.length };
    },
    getCountPrice() {
      return (item) => {
        if(item.deduction > this.train.price) {
          return '0.00';
        }
        return (this.train.price - item.deduction).toFixed(2)
      }
    },
    isJifen() {
      return this.train_discount['积分'] && this.train_discount['积分'].length > 0
    },
    payPrice() {
      if (typeof this.train.price !== 'undefined' && this.train.price === 0) {
        return '0.00'
      }
      if(this.checkedDiscount.length === 0){
        return this.train.price >= 0 ? this.train.price.toFixed(2) : ''
      }
      return (this.train.price - this.checkedDiscount[0].deduction) >=0 ? (this.train.price - this.checkedDiscount[0].deduction).toFixed(2) : '';
    },
    usedDiscount() {
      return this.checkedDiscount.length > 0
    },
    forbidPay() {
      return !this.pay.type
    }
  },
  mounted() {
    getUserAddress().then(data => {
      this.address = data.address;
      if (data.address.length === 0) {
      } else {
        this.addressActive = data.address[data.address.length-1];
      }
      this.goods = data.goods;
    });
  },
  methods: {
    selectAddress(data) {
      const { area, city, province } = data;
      let params = {
        province: province.value,
        city: city.value,
        area: area.value
      };
    },
    back() {
      this.$router.go(-1);
    },
    submitForm() {
      let params = Object.assign({},);
      if (parseInt(status) === 0) {
        if (this.address.length === 0) {
          this.$message({
            type: "warning",
            message: "请先填写收货信息"
          });
          return;
        }
        const {
          province,
          area,
          city,
          zone,
          address,
          id,
          tel,
          name,
          message
        } = this.addressActive;
        params = Object.assign({}, params, {
          province,
          area,
          city,
          addressId: id,
          userZone: province,
          userAddress: address,
          userName: name,
          userMessage: message,
          userTel: tel
        });
      } else if (parseInt(status) === 1) {
        if (params.userAddress === "") {
          this.$message({
            type: "warning",
            message: "请先填写收货信息"
          });
          return;
        }
      }
      if (params.payment === "") {
        this.$message({
          type: "warning",
          message: "请先选择付款方式"
        });
        return;
      }
      const id = this.goods.map(item => item.id);
      const lid = this.goods.map(item => item.goodListId);
      const num = this.goods.map(item => item.num);
      params = Object.assign({}, params, { id, lid, num });
    },
    payMoney() {
      if(this.forbidPay) {
        return;
      }
      if(this.pay.type === 'alipay') {
        const { body, out_trade_no, total_fee } = this.form
        let url = `${window.location.origin}/api/alipay/web/get?out_trade_no=${out_trade_no}`;
        if (process.env.NODE_ENV === 'development') {
          url = `${'http://testapi.aomengyujia.com'}/api/alipay/web`;
        }
        this.$request.post('/alipay/web', { out_trade_no: out_trade_no})
          .then(response => {
            // let form = response.substring(0,5) + ' target="_blank"' + response.substring(5)            
            document.write(`${response}`);
            // document.alipay_submit.submit();  
          })
      }
      if(this.pay.type === 'wechat') {
        const { body, out_trade_no, total_fee } = this.form
        sessionStorage.setItem('total_fee', total_fee)
        this.$router.push({
          name: 'wechat pay',
          query: {
            orderId: out_trade_no
          }
        })
        // this.$router.push(`/cultivate/order/pay/${out_trade_no}`)
        // this.playcode.order = { out_trade_no, body, totalPrice: total_fee }
        // this.playcode.show = true;
      }
    },
  }
};
</script>
<style scoped>
.order-box >>> .el-input__inner {
  height: 30px !important;
}
.order-box >>> .distpicker-address-wrapper select {
  height: 2em;
  margin-right: 10px;
  font-size: 0.7rem;
  padding:0;
}
</style>
<style lang="scss" scoped>
.pay-way {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  .pay-code {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
  }
}
@mixin no_select() {
  -moz-user-select: -moz-none;
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
img {
  width: 100%;
  height: 100%;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.order-box {
  width: 65rem;
  margin: 0 auto;
  @include no_select();
  .navs {
      padding: 3rem 0rem 0rem 0rem;
  }
  .order {
    .take-delivery {
      display: flex;
      justify-content: space-between;
      border: 1px solid #eeeeee;
      .delivery {
        width: 100%;
        .header {
        height: 53px;
        background-color: #ACC794;
        line-height: 53px;
        span{
          font-family:Microsoft YaHei;
          font-weight:bold;
          color:rgba(255,255,255,1);
          font-size: 0.8rem;
          padding-left: 3rem;
        }
        }
        .body {
          display: flex;
          .personal{
            width: 75%;
            display: flex;
            .personal_left{
              width: 80%;
              .receiver_item{
                padding-top: 1rem;
              .receiver{
                color: #999;
                font-size: 0.8rem;
                padding-left: 3rem;
                .receiver_name{
                  color: #2c2c2c;
                }
              }
              }
            }
            .personal_right{
              padding: 2rem;
              width: 20%;
              .dizhi{
                margin-top: 1rem;
              img{
                width: 15px;
                height: 17px;
                cursor: pointer;
              }
              .adress{
                color: #A2BE8C;
                font-family:Microsoft YaHei;
                font-weight:400;
                font-size: 0.8rem;
                cursor: pointer;
              }
            }
            .edit{
              width: 61px;
              height: 32px;
              border: 1px solid #89B264;
              border-radius:5px;
              line-height: 32px;
              text-align: center;
              font-size: 0.8rem;
              margin-top: 1rem;
              margin-left: 0.8rem;
              cursor: pointer;
            }
            }
          }
          .deliviery{
            width:25%;
            border-left: 2px solid #ACC794;
            height: 100px;
            margin-top: 2rem;
            margin-bottom: 2rem;
            .deliviery_top{
              padding: 0.5rem 5rem;
              img{
                width: 19px;
                height: 16px;
                cursor: pointer;
                }
              .deliviery_adress{
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(44,44,44,1);
                font-size: 0.9rem;
                padding-left: 0.5rem;
                cursor: pointer;
              }
            }
            .deliviery_bottom{
              padding: 0.8rem 5rem;
              img{
                width: 19px;
                height: 19px;
                cursor: pointer;
              }
              .deliviery_adress{
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(44,44,44,1);
                font-size: 0.9rem;
                padding-left: 0.5rem;
                cursor: pointer;
              }
            }
          }
        }
      }
      .time-pay {
        width: 12.6rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .time {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          border: 1px solid #ccc;
          box-shadow: 0rem 0.05rem 0.5rem #5c5c5c;
          .header {
            padding: 1rem 0;
            .title {
              padding-bottom: 0.15rem;
              color: #2c2c2c;
              font-size: 0.7rem;
              font-weight: 800;
            }
            .tips {
              color: #999;
              font-size: 0.6rem;
            }
          }
          .select {
            padding-bottom: 1rem;
            .item {
              cursor: pointer;
              padding: 1rem 0;
              color: #2c2c2c;
              font-size: 0.7rem;
              font-weight: 800;
              position: relative;
              &.active {
                &::before {
                  content: "";
                  display: block;
                  position: absolute;
                  top: 50%;
                  left: -1.5rem;
                  transform: translateY(-50%);
                  width: 0.55rem;
                  height: 0.55rem;
                  border-radius: 50%;
                  background: #000;
                }
              }
            }
          }
        }
        .pay {
          width: 100%;
          padding-top: 1rem;
          padding-bottom: 0.8rem;
          box-shadow: 0rem 0.05rem 0.5rem #5c5c5c;
          border: 1px solid #ccc;
          .header {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-bottom: 1.8rem;
            .title {
              padding-bottom: 0.15rem;
              color: #2c2c2c;
              font-size: 0.7rem;
              font-weight: 800;
            }
            .tips {
              color: #999;
              font-size: 0.6rem;
            }
          }
          .icon-box {
            display: flex;
            justify-content: center;
            .icon {
              width: 1.45rem;
              height: 1.45rem;
              margin: 0 0.4rem;
              background-size: 100% 100%;
              &.active {
                // border: 1px solid #22bbbb;
              }
            }
          }
        }
      }
    }
    .goods-box {
      border: 1px solid #eee;
      border-top: none;
      overflow: hidden;
      margin-top: 2rem;
      .header {
        display: flex;
        align-items: center;
        height: 3.5rem;
        background-color: #eee;
        font-family:Microsoft YaHei;
        font-weight:bold;
        font-size: 0.9rem;
        .item {
          padding-left: 3rem;
          &:nth-child(1) {
            flex-basis: 60%;
          }
          &:nth-child(2) {
            flex-basis: 20%;
            padding-left: 5rem;
          }
          &:nth-child(3) {
            flex-basis: 20%;
          }
        }
      }
      .body {
        border-top: none;
        border-bottom: none;
        .goods {
          display: flex;
          align-items: center;
          padding-left: 3rem;
          height: 10rem;
          border-bottom: 1px solid #ccc;
          &:last-child {
            border-bottom: none;
          }
          .info {
            flex-basis: 60%;
            display: flex;
            .img {
              width: 7rem;
              height: 8rem;
            }
            .title-say {
              padding-left: 2.25rem;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              font-family:Microsoft YaHei;
              font-weight:400;
              font-size: 0.9rem;
              .title {
                text-align: left;
                padding-top: 2rem;
              }
              .say {
                width: 100%;
                height: 2.65rem;
                background: #dcdcdc;
                border-radius: 0.5rem;
              }
            }
          }
          .specifications {
            flex-basis: 20%;
            padding-left: 3rem;
            .key-value {
              color: #999;
              display: flex;
              font-size: 0.9rem;
              .key {
              }
              .value {
                padding-left: 1rem;
              }
            }
          }
          .price-number {
            flex-basis: 20%;
            padding-left: 3rem;
            display: flex;
            color: #2c2c2c;
            font-size: 0.7rem;
            .price {
              font-weight: 800;
            }
            .number {
              padding-left: 2rem;
            }
          }
        }
      }
    }
    .payment_mode{
      border:1px solid rgba(238,238,238,1);
      margin-top: 2rem;
      .mode_top{
        height: 53px;
        background-color: #ACC794;
        line-height: 53px;
        span{
          font-family:Microsoft YaHei;
          font-weight:bold;
          color:rgba(255,255,255,1);
          font-size: 0.8rem;
          padding-left: 3rem;
        }
      }
      .mode_bottom{
        display: flex;
        margin: 2rem 0rem 2rem 4rem;
        .zhifubao{
          border: 1px solid #EEEEEE;
          border-radius: 5px;
          padding: 0.8rem 1.5rem;
          cursor: pointer;
          .zfb_img{
            width: 21px;
            height: 21px;
          }
          .zfb_text{
            font-family:Microsoft YaHei;
            font-weight:400;
            font-size: 0.8rem;
            color: #2c2c2c;
          }
        }
        .weixin{
          border: 1px solid #EEEEEE;
          border-radius: 5px;
          padding: 0.8rem 1.5rem;
          margin-left: 2rem;
          cursor: pointer;
          .wx_img{
            width: 21px;
            height: 21px;
          }
          .wx_text{
            font-family:Microsoft YaHei;
            font-weight:400;
            font-size: 0.8rem;
            color: #2c2c2c;
          }
        }
      }
    }
    .Integraluse{
      border:1px solid rgba(238,238,238,1);
      margin-top: 2rem;
      .Integraluse_top{
        height: 53px;
        background-color: #eee;
        line-height: 53px;
        span{
          font-family:Microsoft YaHei;
          font-weight:bold;
          color:#2c2c2c;
          font-size: 0.8rem;
          padding-left: 3rem;
        }
      }
      .Integraluse_bottom{
        background-color: #FAFAFA;
        line-height: 2.3rem;
        padding-left: 4rem;
        padding-top: 1rem;
        padding-bottom: 2rem;
        .use_one{
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(44,44,44,1);
        }
        .use_two{
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(44,44,44,1);
        }
        .use_three{
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(44,44,44,1);
        }
        .use_four{
          text-align: end;
          padding-top: 6rem;
          .span_use{
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(44,44,44,1);
            padding-right: 3.5rem;
            font-size: 0.9rem;
          }
          .span_uses{
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(44,44,44,1);
            padding-right: 2rem;
            font-size: 0.9rem;
          }
        }
        .use_five{
          text-align: end;
          .span_use{
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(44,44,44,1);
            padding-right: 3.5rem;
            font-size: 0.9rem;
          }
          .span_uses{
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(44,44,44,1);
            padding-right: 2rem;
            font-size: 0.9rem;
          }
        }
        .use_six{
          text-align: end;
          .span_use{
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(44,44,44,1);
            padding-right: 3.5rem;
            font-size: 0.9rem;
          }
          .span_uses{
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(44,44,44,1);
            padding-right: 2rem;
            font-size: 0.9rem;
          }
        }
      }
    }
    .sum {
      border: 1px solid #E5E5E5;
      display: flex;
      align-items: center;
      height: 3rem;
      position: relative;
      background-color: #FAFAFA;
      .back-shopcat {
        color: #2c2c2c;
        font-size: 0.8rem;
        font-family:Microsoft YaHei;
        font-weight:bold;
        padding-left: 1.6rem;
        cursor: pointer;
        .img {
          width: 1.3rem;
          height: 1rem;
          display: inline-block;
          margin-right: 1rem;
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
        .title {
          color: #2c2c2c;
          font-size: 0.8rem;
          font-family:Microsoft YaHei;
          font-weight:bold;
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
          color: #CA231B;
          font-family:Microsoft YaHei;
          font-weight:bold;
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
        font-size: 0.8rem;
        color: #fff;
        background: #ACC794;
        height: 100%;
        font-weight:400;
        cursor: pointer;
      }
    }
  }
}
</style>
