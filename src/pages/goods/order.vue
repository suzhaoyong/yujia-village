<template>
  <div style="padding-bottom:5rem;">
    <div class="order-box">
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
              
              <div class="personal" v-if="getAddress">
                <div class="personal_left" >
                  <div class="receiver_item">
                  <span class="receiver">收&nbsp;&nbsp;货&nbsp;&nbsp;人：<span class="receiver_name">{{getAddress.name}}</span></span>
                  </div>
                  <div class="receiver_item">
                  <span class="receiver">联系电话：<span class="receiver_name">{{getAddress.tel}}</span></span>
                  </div>
                  <div class="receiver_item">
                  <span class="receiver">收获地址：<span class="receiver_name">{{getAddress.userAddress}}</span></span>
                  </div>
                </div>
                <div class="personal_right">
                  <div class="dizhi" @click="setDefaultAddress">
                    <img src="../../assets/order/adress.png"/>
                    <span class="adress">默认地址</span>
                  </div>
                  <div class="edit" @click="changeAddress">修改</div>
                </div>
              </div>
              <div class="personal" v-else @click="createAddress" style="display:flex; align-items: center; justify-content: center; cursor: pointer;">
                <img style="width: 19px; height: 19px; ;" src="../../assets/order/newly.png"/>
                <span>&nbsp;请先新增地址</span>
              </div>
              <div class="deliviery">
                <div class="deliviery_top">
                  <img src="../../assets/order/switch.png"/>
                  <span class="deliviery_adress" @click="switcherAddress">切换地址</span>
                </div>
                <div class="deliviery_bottom" @click="createAddress">
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
          <div class="body" v-if="goods.length>0">
            <div v-for="(item, index) in goods" :key="index">
              <div class="goods" >
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
              <div class="Integraluse" style="margin-top:0; margin-bottom:0.2rem;" v-if="item.good_discount['积分'].length > 0">
                <div class="Integraluse_top"><span>积分使用</span></div>
                <div class="Integraluse_bottom">
                  <el-radio-group v-model="goods[index].jifen" style="cursor: pointer;">
                    <div class="use_one" v-for="(jifen, index) in item.good_discount['积分']" :key="index">
                        <el-radio :disabled="isDisableChooseChonsume(jifen)" :label="jifen.id">{{`${jifen.consume}${jifen.remake}${jifen.deduction}元`}}</el-radio>
                    </div>
                    <div class="use_three">
                        <el-radio :label="0">不使用积分</el-radio>
                    </div>
                  </el-radio-group>
                </div>
              </div>
            </div>
            <not-found v-if="goods.length === 0" type="not-fond_2" msg="我寻寻觅觅却找不见您购物车的踪迹"></not-found>
          </div>
        </div>
        <div class="payment_mode">
          <div class="mode_top"><span>支付方式</span></div>
          <div class="mode_bottom">
            <div :class="['zhifubao', pay.type === 'alipay' ? 'active': '']" @click="pay.type='alipay'">
              <img src="../../assets/order/alipay_active.png" class="zfb_img" />
              <span class="zfb_text">支付宝</span>
            </div>
            <div :class="['weixin', pay.type === 'wechat' ? 'active': '']" @click="pay.type='wechat'">
              <img src="../../assets/order/wechat_active.png" class="wx_img" />
              <span class="wx_text">微信支付</span>
            </div>
          </div>
        </div>
        <div class="Integraluse">
          <div class="Integraluse_bottom">
            <div class="use_four">
              <span class="span_use">{{goods.length}}件商品，总商品金额</span>
              <span class="span_uses">{{getAllSelectNumberAndPrice.allPrice}}元</span>
            </div>
            <div class="use_five">
              <span class="span_use">运费</span>
              <span class="span_uses">0.00元</span>
            </div>
            <div class="use_six">
              <span class="span_use">商品优惠</span>
              <span class="span_uses">{{getCountDiscount}}元</span>
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
            <div class="price">¥{{getRealCountPrice}}</div>
          </div>
          <div :class="['sumbit', {'bid': pay.type === ''}]" @click="submitForm">提交订单</div>
        </div>
      </div>
    </div>
    <!-- 选择地址 -->
    <div class="address_dialog-wrap" v-show="isSelectAddress" @click.self="isSelectAddress = false">
      <div class="shadow"></div>
      <div class="address_dialog">
        <div class="address_dialog-title">选择地址</div>
        <div class="address-box-wrap scorll" style="height: 20rem; overflow: auto;">
          <div :class="['address-box', {'active': addressListIndex === index}]" @click="chooseAddress(item, index)" style="cursor: pointer;" v-for="(item, index) in address" :key="index">
            <div class="receiver_item">
            <span class="receiver">收&nbsp;&nbsp;货&nbsp;&nbsp;人<span class="receiver_name">{{item.name}}</span></span>
            </div>
            <div class="receiver_item">
            <span class="receiver">联系电话<span class="receiver_name">{{item.tel}}</span></span>
            </div>
            <div class="receiver_item">
            <span class="receiver">收获地址<span class="receiver_name">{{item.userAddress}}</span></span>
            </div>
            <div v-if="parseInt(item.is_default) === 1" class="default_address">默认地址</div>
          </div>
        </div>
        <div class="address_dialog-footer">
          <div @click="sureThisAddress" class="address_dialog-botton" style="background:#ACC794; color:#fff;">确认</div>
          <div class="address_dialog-botton" style="margin-left:1.35rem;" @click="isSelectAddress = false">取消</div>
        </div>
      </div>
    </div>

    <!-- 新增地址 -->
    <div class="address_dialog-wrap" v-show="isNewAddress" @click.self="isNewAddress = false">
      <div class="shadow"></div>
      <div class="address_dialog" style="width:48rem;max-height:43rem;">
        <div class="address_dialog-title" v-if="addressForm.id">修改地址</div>
        <div class="address_dialog-title" v-else>新增地址</div>
        <div class="address-box-wrap" >
          <div class="address-box active" style="width:40rem">
            <div class="receiver_item">
              <span class="receiver">收&nbsp;&nbsp;货&nbsp;&nbsp;人
                <span class="receiver_name">
                  <el-input v-model="addressForm.userName"
                    @input="blurRuleForm('userName', 'addressForm', 'addressFormErrorRule')"
                    style="width:300px;" placeholder="请输入收货人"></el-input>
                  <span class="input_error-tips" style="color:#ce551a;">{{blurInputError('userName', 'addressForm', 'addressFormErrorRule')}}</span>
                </span>
              </span>
            </div>
            <div class="receiver_item">
              <span class="receiver">联系电话
                <span class="receiver_name">
                  <el-input v-model="addressForm.userTel"
                    @input="blurRuleForm('userTel', 'addressForm', 'addressFormErrorRule')"
                    style="width:300px;" placeholder="请输入联系电话"></el-input>
                  <span class="input_error-tips" style="color:#ce551a;">{{blurInputError('userTel', 'addressForm', 'addressFormErrorRule')}}</span>
                </span>
                </span>
              </span>
            </div>
            <div class="receiver_item">
              <span class="receiver">省/市/县
                <span class="receiver_name">
                  <v-distpicker @selected="selectProvince" :province="addressForm.province" :city="addressForm.city" :area="addressForm.area" style="display: inline-block;"></v-distpicker>
                  <span class="input_error-tips" style="color:#ce551a;">{{blurInputError('city', 'addressForm', 'addressFormErrorRule')}}</span>
                </span>
              </span>
            </div>
            <div class="receiver_item">
              <span class="receiver">详细地址
                <span class="receiver_name">
                  <el-input v-model="addressForm.userAddress"
                    @input="blurRuleForm('userAddress', 'addressForm', 'addressFormErrorRule')"
                    style="width:300px;" placeholder="请输入详细地址"></el-input>
                  <span class="input_error-tips" style="color:#ce551a;">{{blurInputError('userAddress', 'addressForm', 'addressFormErrorRule')}}</span>
                </span>
              </span>
            </div>
            <div class="receiver_item">
              <span class="receiver">地区编码
                <span class="receiver_name">
                  <el-input v-model="addressForm.areaCode" style="width:300px;" placeholder="请输入地区编码"></el-input>
                </span>
              </span>
            </div>
            <div class="receiver_item">
              <span class="receiver">是否默认地址<span class="receiver_name"><el-switch v-model="addressForm.isDefault" active-color="#13ce66" inactive-color="#ccc" :active-value="1" :inactive-value="0" active-text="是" inactive-text="否"> </el-switch></span></span>
            </div>
          </div>
        </div>
        <div class="address_dialog-footer">
          <div @click="sureCreateAddress" class="address_dialog-botton" style="background:#ACC794; color:#fff;">确认</div>
          <div @click="isNewAddress = false" class="address_dialog-botton" style="margin-left:1.35rem;">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VDistpicker from "v-distpicker";
import backIcon from "@/assets/market/back.png";
import Validator from '@/utils/Validator.js';
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
      fraction: 0,
      goods: [],
      address: [],
      addressActive: {},
      isSelectAddress: false,
      isNewAddress: false,
      addressListIndex: 0,
      addressForm : {
        userName: '',
        userTel: '',
        city: '',
        province: '',
        area: '',
        userAddress: '',
        areaCode: '',
        isDefault: 0,
      },
      addressFormErrorRule: {
        userName: { show: false, msg: "" },
        userTel: { show: false, msg: "" },
        city: { show: false, msg: "" },
        userAddress: { show: false, msg: "" },
        areaCode: { show: false, msg: "" }
      },
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
    getDeductionArr() {
      return this.goods.filter(item => item.jifen)
        .map(item => {
          const jifen_id = item.jifen;
          const jifen_select = item.good_discount['积分'].filter(item => item.id === jifen_id)
          return jifen_select && jifen_select[0]
        })
        .filter(item => item)
    },
    getCountDiscount() {
        return  this.getDeductionArr.map(item => item.deduction).reduce((pre, cur) => pre + cur, 0)
    },
    getDiscountIds() {
      return this.getDeductionArr.map(item => item.id)
    },
    isDisableChooseChonsume() {
      return (item) => {
        if(this.fraction < item.consume) {
          return true;
        }
        const has_id = this.getDiscountIds.indexOf(item.id)
        if(has_id < 0 && (this.fraction - this.getCountConsume) < item.consume) {
          return true;
        }
      }
    },
    getCountConsume() {
        return  this.getDeductionArr.map(item => item.consume).reduce((pre, cur) => pre + cur, 0)
    },
    getRealCountPrice() {
      if(this.getCountDiscount > this.getAllSelectNumberAndPrice.allPrice) {
        return '0.00'
      }
      return (this.getAllSelectNumberAndPrice.allPrice - this.getCountDiscount).toFixed(2)
    },
    getAddress() {
      if (this.address.length === 0) {
        return ''
      }
      if (this.address.length === 1) {
        return this.address[0]
      }
      if (this.addressActive.id) {
        return this.addressActive
      }
      const default_address = this.address.filter(item => parseInt(item.is_default) === 1)[0]

      return default_address || this.address[0]
    },
    blurInputError() {
      return (key, ruleName, errorName) => {
        return this[errorName][key].show?this.validatorBlurRuleForm(key, ruleName):''
      }
    }
  },
  mounted() {
    getUserAddress().then(response => {
      this.address = response.address;
      if (response.address.length === 0) {
      } else {
        // this.addressActive = data.address[data.address.length-1];
      }
      this.fraction = response.fraction
      this.goods = response.goods;
    });
  },
  methods: {
    blurRuleForm(item, ruleName, errorName) {
      let error = this.validatorBlurRuleForm(item, ruleName)
      if (error.length === 0){
        this[errorName][item].show = false;
      } else {
        this[errorName][item].show = true;
        this[errorName][item].msg = error;
      }
    },
    validatorBlurRuleForm(key, ruleName) {
      let rules = {
          userTel: [{
              strategy: 'isNonEmpty',
              errorMsg: '手机号码不能为空！'
            }, {
              strategy: 'isMoblie',
              errorMsg: '手机号码格式不正确！'
            }],
          userName: [{
                strategy: 'isNonEmpty',
                errorMsg: '姓名不能为空！'
            }, {
                strategy: 'minLength:2',
                errorMsg: '姓名长度不能小于 2 位！'
            }, {
                strategy: 'maxLength:10',
                errorMsg: '姓名长度不能大于 10 位！'
            }],
            city: [{
                strategy: 'isNonEmpty',
                errorMsg: '城市不能为空！'
              }],
            userAddress: [{
                  strategy: 'isNonEmpty',
                  errorMsg: '详细地址不能为空！'
              }]
        }
      if (!rules[key]) return '';
      const validatorFunc = () => {
        let validator = new Validator();
        validator.add(this[ruleName][key], rules[key])
        let errorMsg = validator.start()
        return errorMsg
      }
      let errorMsg = validatorFunc()
      if(errorMsg) {
        return errorMsg;
      }
      return '';
    },
    setDefaultAddress() {
      const default_address = this.address.filter(item => parseInt(item.is_default) === 1)[0]
      default_address && (this.addressActive = default_address)
    },
    switcherAddress() {
      if (this.address.length === 0) return;
      if(this.getAddress) {
        this.addressListIndex = this.address.findIndex(item => item.id === this.getAddress.id)
      }
      this.isSelectAddress = true
    },
    sureThisAddress() {
      const select_address = this.address[this.addressListIndex]
      this.addressActive = select_address
      this.isSelectAddress = false;
    },
    sureCreateAddress() {
      for(let key in this.addressForm) {
        if(this.addressFormErrorRule[key]) {
          let error = this.validatorBlurRuleForm(key, 'addressForm')
          if (error.length === 0){
            this.addressFormErrorRule[key].show = false;
          } else {
            this.addressFormErrorRule[key].show = true;
            this.addressFormErrorRule[key].msg = error;
          }
        }
      }
      let is_error = false
      for(let key in this.addressFormErrorRule) {
        if(this.addressFormErrorRule[key].show) {
          is_error = true;
        }
      }
      if(is_error) return;
      if(this.addressForm.id) {
        this.$request.post(`/updateAddress/${this.addressForm.id}`, this.addressForm)
        .then(response => {
          this.$message.success('修改成功')
          this.isNewAddress = false;
        })
      } else {
        this.$request.post(`/createAddress`, this.addressForm)
        .then(response => {
          this.$message.success('新增成功')
          this.isNewAddress = false;
        })
      }
    },
    createAddress() {
      this.isNewAddress = true
      this.addressForm = {
        userName: '',
        userTel: '',
        city: '',
        province: '',
        area: '',
        userAddress: '',
        areaCode: '',
        isDefault: 0,
      }
    },
    changeAddress() {
      this.isNewAddress = true;
      this.addressForm = {...this.addressForm, ...this.getAddress, ...{userName: this.getAddress.name, userTel: this.getAddress.tel, isDefault: this.getAddress.is_default}}
    },
    chooseAddress(address, index) {
      this.addressListIndex = index
    },
    selectProvince(data) {
      const { area, city, province } = data;
      let params = {
        province: province.value,
        city: city.value,
        area: area.value
      };
      this.addressForm = Object.assign({}, this.addressForm,  params);
    },
    back() {
      this.$router.go(-1);
    },
    submitForm() {
      if (this.pay.type === '') return;
      let status = ''
      if(this.getAddress.id) {
        status = 1 
      } else {
        status = 0
      }
    
      let address_params = Object.assign({});
      if (parseInt(status) === 0) {
        if (!this.getAddress) {
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
        } = this.getAddress;
        address_params = Object.assign({}, address_params, {
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
      } 
      let params = {
        id: [],
        lid: [],
        num: [],
        discountId: [],
        status: 0,
        userName: '',
        userTel: '',
        city: '',
        province: '',
        area: '',
        address: '',
        addressId: ''
      }
      if(this.getAddress) {
        const {address = "", area  = "", areaCode  = "", city  = "", created_at  = "",
                id = "", is_default = 0, message = "", name  = "", province  = "", tel  = "", updated_at  = "",
                userAddress  = "", user_id = '', zone = "" } = this.getAddress
        params = Object.assign({}, params, 
                  { userName: name, userTel: tel, city, province, area, address: userAddress, addressId: id })
      }
      const id = this.goods.map(item => item.id);
      const lid = this.goods.map(item => item.goodListId);
      const num = this.goods.map(item => item.num);

      params = Object.assign({}, params, { id, lid, num, discountId: this.getDiscountIds });
      this.$request.post(`/goodOrder`, params)
      .then(resopnse => {
        const {body = "", out_trade_no = "", totalPrice, msg = "" } = resopnse
        if (msg === 'OK') {
          this.payMoney({ body, out_trade_no, total_fee: totalPrice })
        } else {
          this.$message.error(msg)
        }
      })
    },
    payMoney({body = '', out_trade_no = '', total_fee = ''}) {
      if(this.forbidPay) {
        return;
      }


      if(this.pay.type === 'alipay') {
        let url = `${window.location.origin}/api/alipay/web/get?out_trade_no=${out_trade_no}`;
        if (process.env.NODE_ENV === 'development') {
          url = `${'http://testapi.aomengyujia.com'}/api/alipay/web`;
        }
        this.$request.post('/alipay/web', { out_trade_no: out_trade_no})
          .then(response => {
            document.write(`${response}`);
          })
      }
      if(this.pay.type === 'wechat') {
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
      // border: 1px solid #eee;
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
          &.active {
            background: #eaeaea;
          }
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
          &.active {
            background: #eaeaea;
          }
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
          padding-bottom: 0.5rem;
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
          padding-top: 1rem;
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
        &.bid{
          cursor: not-allowed;
          background: #eee;
        }
      }
    }
  }
}

.address_dialog-wrap{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 100;
  .shadow{}
  .address_dialog{
    width: 36.85rem;
    max-height: 37.7rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    box-shadow:1px -1px 10px 1px rgba(0, 0, 0, 0.18);
    border-radius:10px;
    padding: 3rem;
    .address_dialog-title{
      padding-bottom: 3.5rem;
    }
    .address-box-wrap{
      /* 设置滚动条的样式 */
      &.scorll::-webkit-scrollbar {
        width: 0.1rem;
      }
      /* 滚动槽 */
      &.scorll::-webkit-scrollbar-track {
        background: #dcdcdc;
        border-radius: 0.15rem;
      }
      /* 滚动条滑块 */
      &.scorll::-webkit-scrollbar-thumb {
        background: #88bc37;
        border-radius: 0.15rem;
      }
      &.scorll::-webkit-scrollbar-thumb {
        background: #88bc37;
      }
      .address-box{
        width: 29rem;
        border: 1px solid #eee;
        padding-top: 1.85rem;
        padding-left: 1.45rem;
        padding-right: 1.45rem;
        padding-bottom: 1.3rem;
        background: #fff;
        margin-bottom: 0.65rem;
        position: relative;
        &.active{
          border: 1px solid #ACC794;
        }
        .receiver_item{
          padding-bottom: 0.85rem;
          .receiver{
          }
          .receiver_name{
            margin-left: 2em;
          }
        }
         .default_address{
           position: absolute;
           right: 1.05rem;
           top: 1.45rem;
        }
      }
    }
    .address_dialog-footer{
      display: flex;
      justify-content: center;
      margin-top: 8.4rem;
      .address_dialog-botton{
        cursor: pointer;
        width: 5.6rem;
        height: 2.5rem;
        line-height: 2.5rem;
        text-align: center;
        background: #e5e5e5;
      }
    }
  }
}
</style>
