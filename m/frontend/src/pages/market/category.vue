<template>
  <div>
    <div class="goods">
      <aside class="goods_kinds">
        <ul class="kinds_range">
          <li>啊啊啊</li>
          <li>啊啊啊</li>
          <li>啊啊啊</li>
          <li>啊啊啊</li>
        </ul>
      </aside>
      <section class="goods_content">
        <div class="goods_filters">
          <div class="filters_range">
            <div class="range_price_sell">
              <span>价格</span>
              <span>价格</span>
              <span>价格</span>
            </div>
            <div class="range_news_size">
              <span>价格</span>
              <span>价格</span>
              <span>价格</span>
            </div>
            <div class="select_range">
              <span>范围1</span>
              <span>范围1</span>
              <span>范围1</span>
              <span>范围1</span>
              <div class="select_sure">确定</div>
            </div>
          </div>
        </div>
        <div class="goods_search_result">
          <div class="goods-box" v-for="(item) of 4">
            <div class="goods_pic"></div>
            <span class="goods_name">moumou</span>
            <span class="goods_price">￥210</span>
          </div>
        </div>
      </section>
    </div>
    <aside class="filters_right">
      
    </aside>
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
.goods{
  display: flex;
  .goods_kinds{
    flex-basis: 84px;
    background: #ccc;
    .kinds_range{
      li{}
    }
  }
  .goods_content{
    flex-grow: 1;
    background: #ddd;
    .goods_filters{
      .filters_range{
        .range_price_sell{
          display: flex;
          justify-content: space-between;
          span{}
        }
        .range_news_size{
          span{
            margin-right: 14px;
          }
        }
        .select_range{
          background: #ccc;
          position: relative;
          display: flex;
          flex-wrap: wrap;
          span{
            flex-basis: 50%;

          }
          .select_sure{
            width: 100%;
            position: absolute;
            top: 100%;
            background: #fff;
            text-align: center;
            color: #2c2c2c;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
          }
        }
      }
    }
    .goods_search_result{
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .goods-box{
        &:nth-child(odd){
          margin-right: 5px;
        }
        .goods_pic{
          width: 128px;
          height: 148px;
          background: #000;
        }
        .goods_name{}
        .goods_price{}
      }
    }
  }
}
</style>