<template>
  <div>
    <div class="goods">
      <aside class="goods_kinds">
        <ul class="kinds_range">
          <li :class="clsKindsActive(-1)" @click="changeKinds(-1)">每日推荐</li>
          <li
            :class="clsKindsActive(item.id)"
            @click="changeKinds(item.id)"
            v-for="(item, index) in kinds.list"
            :key="index"
          >{{item.name}}</li>
        </ul>
      </aside>
      <!-- 每日推荐 -->
      <section class="daily" v-show="kinds.curIndex === -1">
        <!-- 新品 -->
        <div class="news">
          <div class="news_title">新品推荐</div>
          <div class="news_content">
            <div
              class="news_goods_img"
              :style="`background-image:url(${goodsRecomment.new.new_url_one})`"
            >
              <!-- <img :src="goodsRecomment.new.new_url_one" alt=""> -->
            </div>
            <div class="news_goods_name">{{goodsRecomment.new.describe}}</div>
          </div>
        </div>
        <!-- 限时优惠 -->
        <div class="sales">
          <div class="sales_title">限时优惠</div>
          <div
            class="sales_content"
            v-for="(item, index) in goodsRecomment.discount.double[cur_discount_index]"
            @click="viewGoods(item)"
            :key="index"
          >
            <!-- <div class="sales_goods_img" :style="`background-image:url(${item.discount_url})`"></div> -->
            <div class="sales_goods_img">
              <img :src="item.discount_url" alt />
            </div>

            <div class="sales_goods_name">{{item.describe}}</div>
          </div>
        </div>
        <!-- 热销 -->
        <div class="hot">
          <div class="hot_title">热销</div>
          <div
            class="hot_content"
            v-for="(item, index) in goodsRecomment.discount.double[cur_discount_index]"
            @click="viewGoods(item)"
            :key="index"
          >
            <div class="hot_goods_img">
              <img :src="item.discount_url" alt />
            </div>
            <div class="hot_goods_name">{{item.describe}}</div>
          </div>
        </div>
      </section>
      <section class="goods_content" v-show="kinds.curIndex !== -1">
        <div class="goods_filters">
          <div class="filters_range">
            <div class="range_price_sell">
              <span class="active"></span>
              <span></span>
              <span @click="aside.isOpen = true">筛选</span>
            </div>
            <div class="range_news_size">
              <!-- <span class="active">新品</span> -->
              <span @click="subAside.isOpen = true">尺码</span>
              <span>材质</span>
            </div>
            <div class="select_range" v-show="subAside.isOpen">
              <span class="active">范围1</span>
              <span>范围1</span>
              <span>范围1</span>
              <span>范围1</span>
              <div @click="changeSubAside" class="select_sure">确定</div>
            </div>
          </div>
        </div>
        <div class="goods_search_result">
          <!-- <van-overlay
            :show="subAside.isOpen"
            @click="subAside.isOpen = false"
            :custom-style="{ position: 'absolute'}"
          />-->
          <div
            class="goods-box"
            @click="viewGoods(item)"
            v-for="(item, index) of showGoods.list"
            :key="index"
          >
            <div class="goods_pic">
              <img :src="item.cover_url" alt />
            </div>
            <span class="goods_name">{{item.describe}}</span>
            <span class="goods_price">￥{{(item.sell_price - item.discount).toFixed(2)}}</span>
          </div>
        </div>
      </section>
    </div>
    <van-popup v-model="aside.isOpen" round position="right" :style="{ width: '85%'}">
      <!-- 筛选条件 -->
      <!-- 理想价格 -->
      <aside class="filters_right">
        <div class="filters_right_wrap">
          <div class="filters_right_title">理想价格</div>
          <div class="filters_right_content">
            <div class="min_price">
              <input type="text" />
            </div>-
            <div class="max_price">
              <input type="text" />
            </div>
            <div class="max_price" style="opacity:0"></div>
          </div>
          <!-- 适用类别 -->
          <div class="filters_right_title" @click="iconPullDown('type')">
            <span>适用类别</span>
            <div :class="['arrow', {down: filters.type.isActive}]">
              <i :class="['iconfont','icon-pull_right']"></i>
            </div>
          </div>
          <div class="filters_right_content" v-if="filters.type.isActive">
            <span
              :class="{active:isTagActive(item)}"
              @click="chooseTagsFor('type', item)"
              v-for="(item, index) in goodsFilters.type"
              :key="index"
            >{{item.name}}</span>
          </div>
          <!-- 适用人群 -->
          <div class="filters_right_title" @click="iconPullDown('person')">
            <span>适用人群</span>
            <div :class="['arrow', {down: filters.person.isActive}]">
              <i :class="['iconfont','icon-pull_right']"></i>
            </div>
          </div>
          <div class="filters_right_content" v-if="filters.person.isActive">
            <span
              :class="{active:isTagActive(item)}"
              @click="chooseTagsFor('person', item)"
              v-for="(item, index) in goodsFilters.person"
              :key="index"
            >{{item.name}}</span>
          </div>
          <!-- 材质 -->
          <div class="filters_right_title" @click="iconPullDown('material')">
            <span>材质</span>
            <div :class="['arrow', {down: filters.material.isActive}]">
              <i :class="['iconfont','icon-pull_right']"></i>
            </div>
          </div>
          <div class="filters_right_content" v-if="filters.material.isActive">
            <span
              :class="{active:isTagActive(item)}"
              @click="chooseTagsFor('material', item)"
              v-for="(item, index) in goodsFilters.material"
              :key="index"
            >{{item.name}}</span>
          </div>
          <!-- 适用季节 -->
          <div class="filters_right_title" @click="iconPullDown('season')">
            <span>适用季节</span>
            <div :class="['arrow', {down: filters.season.isActive}]">
              <i :class="['iconfont','icon-pull_right']"></i>
            </div>
          </div>
          <div class="filters_right_content" v-if="filters.season.isActive">
            <span
              :class="{active:isTagActive(item)}"
              @click="chooseTagsFor('season', item)"
              v-for="(item, index) in goodsFilters.season"
              :key="index"
            >{{item.name}}</span>
          </div>
          <!-- 颜色 -->
          <div class="filters_right_title" @click="iconPullDown('color')">
            <span>颜色</span>
            <div :class="['arrow', {down: filters.color.isActive}]">
              <i :class="['iconfont','icon-pull_right']"></i>
            </div>
          </div>
          <div class="filters_right_content" v-if="filters.color.isActive">
            <span
              :class="{active:isTagActive(item)}"
              @click="chooseTagsFor('color', item)"
              v-for="(item, index) in goodsFilters.color"
              :key="index"
            >{{item.name}}</span>
          </div>
        </div>
        <div class="filters_action">
          <div class="filters_action_item" @click="asideReset">重置</div>
          <div class="filters_action_item" @click="asideSure">确定</div>
        </div>
      </aside>
    </van-popup>
  </div>
</template>
<script>
import { Button, Popup, Overlay } from "vant";
import {
  getGoodsFilter,
  getGoodRecomment,
  postShowGoodList
} from "@/api/category.js";
export default {
  data() {
    return {
      isActive: false,
      kinds: {
        list: [],
        curIndex: 0
      },
      subAside: {
        isOpen: false
      },
      aside: {
        isOpen: false
      },
      cur_discount_index: 0,
      goodsRecomment: {
        comments: {},
        new: {},
        discount: {
          double: [],
          single: []
        }
      },
      filters: {
        type: {
          isActive: false
        },
        person: {
          isActive: false
        },
        season: {
          isActive: false
        },
        color: {
          isActive: false
        },
        material: {
          isActive: false
        }
      },
      goodsFilters: {
        color: [],
        material: [],
        person: [],
        price: [],
        reason: [],
        type: []
      },
      selected: {
        tags: []
      },
      showGoods: {
        list: []
      }
    };
  },
  computed: {
    clsKindsActive() {
      return index => ({
        active: this.kinds.curIndex === index
      });
    },
    isTagActive() {
      return item => {
        if (item.name !== "不限") {
          return (
            this.selected.tags.findIndex(tag => tag.name === item.name) >= 0
          );
        }
      };
    }
  },
  components: {
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Overlay.name]: Overlay
  },
  mounted() {
    getGoodRecomment().then(response => {
      this.goodsRecomment = response;
    });
    getGoodsFilter().then(response => {
      this.kinds.list = response.sort.splice(0);

      const mapTag = (tag, name) =>
        tag.map(item => {
          item.type = name;
          return item;
        });

      for (const item of Object.keys(response)) {
        response[item] = mapTag(response[item], item);
      }
      this.goodsFilters = response;
    });
    this.showGoodsList();
  },
  methods: {
    asideSure() {
      const params = {};
      this.selected.tags.map(item => {
        params[item.type] = item.id;
      });
      params.sort = this.kinds.curIndex;
      this.showGoodsList(params);
      this.aside.isOpen = false;
    },
    asideReset() {
      this.selected.tags = [];
    },
    chooseTagsFor(name, tag) {
      if (this.isTagActive(tag)) return;
      if (tag.name === "不限") {
        this.selected.tags = this.selected.tags.filter(
          item => item.type !== tag.type
        );
        return;
      }
      const checkHaveArray = this.selected.tags.filter(
        item => item.type === tag.type
      );
      if (checkHaveArray.length === 0) {
        this.selected.tags.push(tag);
      } else {
        checkHaveArray.map((item, index) => this.removeTags(item, index));
        this.selected.tags.push(tag);
      }
    },
    removeTags(tag, index) {
      this.selected.tags = this.selected.tags.filter(
        item => item.name !== tag.name
      );
      if (this.selected.tags.length === 0) {
        // this.showGoodsList();
      }
    },
    showGoodsList(params = {}) {
      postShowGoodList(params).then(response => {
        this.showGoods.list = response.data;
      });
    },
    iconPullDown(name) {
      this.filters[name].isActive = !this.filters[name].isActive;
    },
    changeSubAside() {
      this.subAside.isOpen = false;
    },
    viewGoods(goods) {
      this.$router.push({
        name: "detail",
        params: {
          goods_id: goods.id
        }
      });
    },
    changeKinds(index) {
      this.kinds.curIndex = index;
      index >= 0 ? this.showGoodsList({ sort: index }) : "";
      if (this.selected.tags.length > 0) {
        this.asideReset();
      }
    }
  }
};
</script>
<style lang="scss" scope>
* {
  margin: 0;
  border: 0;
  box-sizing: border-box;
  font-size: 13px;
  color: #2c2c2c;
}
img {
  width: 100%;
  height: 100%;
}
$main_color: #eff7e0;
$main_bg_color: #89b264;
.daily {
  width: 100%;
  height: 100%;
  padding-bottom: 30px;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; /* 解决 ios 滑动不流畅问题 */
  .news,
  .sales,
  .hot {
    // display: flex;
    // flex-direction: column;
    padding: 16px;
    border-bottom: 2px solid #eee;
    &_title {
      position: relative;
      padding-left: 20px;
      margin-bottom: 10px;
      height: 15px;
      line-height: 15px;
      font-size: 14px;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 10px;
        height: 15px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url("~@/assets/img/title_icon.png");
      }
    }
  }
  .news {
    .news_content {
      display: inline-block;
      .news_goods_img {
        width: 260px;
        height: 165px;
        border-radius: 3px;
        background: #eee;
        margin-bottom: 1em;
      }
      .news_goods_name {
      }
    }
  }
  .sales {
    .sales_content {
      display: inline-block;
      margin: 3px;
      .sales_goods_img {
        width: 82px;
        height: 92px;
        border-radius: 3px;
        background: #eee;
        margin-bottom: 1em;
      }
      .sales_goods_name {
        width: 82px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .hot {
    .hot_content {
      display: inline-block;
      margin: 3px;
      .hot_goods_img {
        width: 126px;
        height: 116px;
        border-radius: 3px;
        background: #eee;
        margin-bottom: 1em;
      }
      .hot_goods_name {
        width: 82px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
.goods {
  display: flex;
  height: 100vh;
  overflow: hidden;
  .goods_kinds {
    flex-basis: 84px;
    padding-bottom: 40px;
    border-right: 1px solid #eee;
    // background: #ccc;
    .kinds_range {
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      li {
        display: inline-block;
        width: 6em;
        flex-shrink: 0;
        height: 30px;
        line-height: 30px;
        padding: 2px 10px;
        text-align: justify;
        text-align-last: justify;
        overflow: hidden;
        &::after {
          content: "";
          display: inline-block;
          width: 100%;
        }
        &:nth-of-type(1) {
          color: #89b264;
        }
        &.active {
          background: $main_color;
        }
      }
    }
  }
  .goods_content {
    flex-grow: 1;
    padding: 16px;
    padding-right: 0;
    padding-bottom: 40px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch; /* 解决 ios 滑动不流畅问题 */
    // background: #ddd;
    .goods_filters {
      position: relative;
      .filters_range {
        .range_price_sell {
          padding-right: 16px;
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
          span {
            &.active {
              color: $main_bg_color;
            }
          }
        }
        .range_news_size {
          margin-bottom: 10px;
          span {
            background: #eee;
            padding: 2px 10px;
            border-radius: 10px;
            margin-right: 14px;
            &.active {
              color: $main_bg_color;
            }
          }
        }
        .select_range {
          background: #eee;
          padding: 12px 20px 0;
          display: flex;
          flex-wrap: wrap;
          z-index: 10;
          width: 100%;
          position: absolute;
          span {
            flex-basis: 50%;
            margin-bottom: 20px;
            &.active {
              color: $main_bg_color;
            }
          }
          .select_sure {
            width: 100%;
            height: 30px;
            line-height: 30px;
            position: absolute;
            z-index: 10;
            left: 0;
            top: 100%;
            background: #fff;
            text-align: center;
            color: #7abd6a;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
          }
        }
      }
    }
    .goods_search_result {
      position: relative;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding-right: 16px;
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      .goods-box {
        margin-bottom: 16px;
        &:nth-child(odd) {
          margin-right: 5px;
        }
        .goods_pic {
          width: 124px;
          height: 148px;
          margin-bottom: 8px;
          background: #eee;
        }
        .goods_name {
          display: block;
          width: 124px;
        }
        .goods_price {
          display: block;
          padding-top: 0.5em;
          color: #d30606;
        }
      }
    }
  }
}
.filters_right {
  padding-left: 24px;
  padding-top: 12px;
  padding-bottom: 44px;
  height: 100vh;
  position: relative;
  width: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  .filters_right_wrap {
    padding-right: 18px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    .filters_right_title {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      margin-bottom: 10px;
      span {
      }
      .arrow {
        &.down {
          transform: rotate(90deg);
        }
        transition: all 0.3s ease-out;
      }
    }
    .filters_right_content {
      transition: display 0.3s ease-out;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;

      .min_price {
        flex-basis: 30%;
        input {
          width: 100%;
          border: 1px solid #e5e5e5;
          border-radius: 15px;
          padding: 10px 0;
          padding-left: 1em;
        }
      }
      .max_price {
        flex-basis: 30%;
        input {
          width: 100%;
          border: 1px solid #e5e5e5;
          border-radius: 15px;
          padding: 10px 0;
          padding-left: 1em;
        }
      }
      span {
        flex-basis: 30%;
        border: 1px solid #e5e5e5;
        border-radius: 15px;
        text-align: center;
        padding: 10px 0;
        margin-bottom: 10px;
        &.active {
          background: $main_color;
          // color: #fff;
        }
      }
    }
  }
  .filters_action {
    position: absolute;
    left: 0;
    bottom: 40px;
    z-index: 10;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    box-shadow: 1px 2px 10px #eee;
    background: #fff;
    .filters_action_item {
      display: inline-block;
      padding: 0 10px;
      flex-grow: 1;
      height: 100%;
      line-height: 40px;
      text-align: center;
      &:nth-of-type(2) {
        color: #fff;
        height: 100%;
        line-height: 40px;
        background: $main_bg_color;
      }
    }
  }
}
</style>