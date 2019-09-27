<template>
  <div>
    <van-button type="default">默认按钮</van-button>
    <div class="goods">
      <aside class="goods_kinds"></aside>
      <section class="goods_content">
        <div class="goods_filters">
          
        </div>
        <div class="goods_search_result">
          <div class="goods-box">
            <div class="goods_pic"></div>
            <span class="goods_name">moumou</span>
            <span class="goods_price">￥210</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { Button } from 'vant';
import { getGoodsFilter } from "@/api/category.js";
export default {
  data() {
    return {

    }
  },
  components: {
    [Button.name]: Button,
  },
  mounted() {
    // console.log(1)
    // getGoodsFilter()
  }
};
</script>
<style lang="scss" scope>
*{
  margin: 0;
  border: 0;
  box-sizing: border-box;
}
</style>