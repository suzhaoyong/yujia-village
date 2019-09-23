<template>
  <div>
    <div v-show="show(1)" class="yun">
      <img :src="icon.yun.yun_1" alt />
    </div>
    <div v-show="show(2)" class="yun2">
      <img :src="icon.yun.yun_2" alt />
    </div>
    <div v-show="show(3)" class="yun3">
      <img :src="icon.yun.yun_1" alt />
    </div>
    <div v-show="show(4)" class="yun4">
      <img :src="icon.yun.yun_1" alt />
    </div>
    <div v-show="show(5)" class="yun5">
      <img :src="icon.yun.yun_1" alt />
    </div>
  </div>
</template>
<script>
import yun_1 from "@/assets/order/yun.png";
import yun_2 from "@/assets/order/yun_2.png";
export default {
  props: {
    arr: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      icon: {
        yun: {
          yun_1,
          yun_2
        }
      }
    };
  },
  computed: {
    show() {
      return index => this.arr.indexOf(index) >= 0;
    }
  }
};
</script>
<style scoped lang="scss">
img {
  width: 100%;
  height: 100%;
}
.yun {
  position: absolute;
  top: 5rem;
  left: 5rem;
  z-index: -1;
  width: 25rem;
  margin-top: -5rem;
  margin-bottom: 1rem;
}
.yun2 {
  position: absolute;
  top: 3rem;
  right: -10rem;
  width: 12rem;
  z-index: -1;
  margin-left: 100%;
}
.yun3 {
  position: absolute;
  top: 100rem;
  left: -10rem;
  z-index: -1;
  width: 25rem;
  margin-top: -5rem;
  margin-bottom: 1rem;
}
.yun4 {
  position: absolute;
  top: 34rem;
  left: -16rem;
  z-index: -1;
  width: 25rem;
  margin-top: -5rem;
  margin-bottom: 1rem;
}
.yun5 {
  position: absolute;
  top: 38rem;
  left: 16rem;
  z-index: -1;
  width: 25rem;
  margin-top: -5rem;
  margin-bottom: 1rem;
}
</style>