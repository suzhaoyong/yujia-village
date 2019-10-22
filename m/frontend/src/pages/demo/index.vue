<template>
  <div>
    <van-overlay :show="registerBox.show" >
      <div class="register-box">
        <div class="register">
          <div class="register_btn" @click="() => { this.$router.push('/login?q_type=register')}"></div>
        </div>
        <div class="register_close-wrap">
          <div class="register_close" @click="registerBox.show = false"></div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import Vue from 'vue'
import {Overlay} from 'vant'
Vue.use(Overlay);
export default {
  data() {
    return {
      registerBox: {
        show: true
      }
    }
  }
}
</script>
<style lang="scss">
  .register-box{
    width: 325px;
    height: 325px;
    margin: 0 auto;
    margin-top: 120px;
    .register{
      width: 100%;
      height: 100%;
      position: relative;
      background-image: url('~@/assets/img/tips-box.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      .register_btn{
        position: absolute;
        left: 50%;
        bottom: 50px;
        transform: translateX(-50%);
        width: 50%;
        height: 100px;
        background-color: rgba(57, 119, 36, 0.509);
      }
    }
    .register_close-wrap{
      margin-top: 40px;
      display: flex;
      justify-content: center;
      .register_close{
        background-image: url('~@/assets/img/tips-close.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 40px;
        height: 40px;
      }
      
    }
  }
</style>