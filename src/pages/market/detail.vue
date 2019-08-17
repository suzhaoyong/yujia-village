<template>
  <div>
    <div class="market">
      <div class="selected-search">
        <div class="selected">
          <span>已选</span>
          <span>></span>
          <div class="tags">
            <div class="tag" v-for="(item, index) in selected.tags">
              {{item.name}}
              <i class="el-icon-close close" @click="removeTags(item)"></i>
            </div>
          </div>
        </div>
        <div class="search">
          <input type="text" class="form-control input" placeholder="商品名或关键词" />
        </div>
      </div>
      <div class="select">
        <div :class="['price', tags.price.more.length > 0 ? 'more_active' : '']">
          <div class="title">理想价位</div>
          <div class="range">
            <div class="item">不限</div>
            <div
              :class="['item', selected.tags.price.name === item.name ? 'active' : '' ]"
              @click="chooseTagsFor('price', item)"
              v-for="(item, index) in tags.price.list"
            >{{item.name}}</div>
          </div>
          <div class="more" v-if="tags.price.more.length > 0">
            <div class="dropdown show">
              <a
                class="btn dropdown-toggle"
                style="color: #7F8F58;"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >更多</a>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a
                  v-for="(item, index) in tags.price.more"
                  class="dropdown-item"
                  href="#"
                >{{item.name}}</a>
              </div>
            </div>
          </div>
        </div>
        <div :class="['kinds', tags.kinds.more.length > 0 ? 'more_active' : '']">
          <div class="title">商品种类</div>
          <div class="range">
            <div class="item">不限</div>
            <div
              :class="['item', selected.tags.kinds.name === item.name ? 'active' : '' ]"
              @click="chooseTagsFor('kinds', item)"
              v-for="(item, index) in tags.kinds.list"
            >{{item.name}}</div>
          </div>
          <div class="more" v-if="tags.kinds.more.length > 0">
            <div class="dropdown show">
              <a
                class="btn dropdown-toggle"
                style="color: #7F8F58;"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >更多</a>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a
                  v-for="(item, index) in tags.kinds.more"
                  class="dropdown-item"
                  href="#"
                >{{item.name}}</a>
              </div>
            </div>
          </div>
        </div>
        <div :class="['material', tags.material.more.length > 0 ? 'more_active' : '']">
          <div class="title">材质</div>
          <div class="range">
            <div class="item">不限</div>
            <div
              :class="['item', selected.tags.material.name === item.name ? 'active' : '' ]"
              @click="chooseTagsFor('material', item)"
              v-for="(item, index) in tags.material.list"
            >{{item.name}}</div>
          </div>
          <div class="more" v-if="tags.material.more.length > 0">
            <div class="dropdown show">
              <a
                class="btn dropdown-toggle"
                style="color: #7F8F58;"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >更多</a>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a
                  v-for="(item, index) in tags.material.more"
                  class="dropdown-item"
                  href="#"
                >{{item.name}}</a>
              </div>
            </div>
          </div>
        </div>
        <div :class="['use', tags.useRange.more.length > 0 ? 'more_active' : '']">
          <div class="title">适用类别</div>
          <div class="range">
            <div class="item">不限</div>
            <div
              :class="['item', selected.tags.useRange.name === item.name ? 'active' : '' ]"
              @click="chooseTagsFor('useRange', item)"
              v-for="(item, index) in tags.useRange.list"
            >{{item.name}}</div>
          </div>
          <div class="more" v-if="tags.useRange.more.length > 0">
            <div class="dropdown show">
              <a
                class="btn dropdown-toggle"
                style="color: #7F8F58;"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >更多</a>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a
                  v-for="(item, index) in tags.useRange.more"
                  class="dropdown-item"
                  href="#"
                >{{item.name}}</a>
              </div>
            </div>
          </div>
        </div>

        <div class="senior">
          <div class="title">高级选项</div>
          <div class="select-list">
            <div class="select-box">
              <div class="dropdown show">
                <a
                  class="btn dropdown-toggle"
                  style="color: #2c2c2c; border:1px solid #bfbfbf;padding-left:0.5rem;padding-right:0.5rem;"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >价格</a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <a class="dropdown-item" href="#">更多1</a>
                  <a class="dropdown-item" href="#">更多1</a>
                  <a class="dropdown-item" href="#">更多1</a>
                </div>
              </div>
            </div>
            <div class="select-box">
              <div class="dropdown show">
                <a
                  class="btn dropdown-toggle"
                  style="color: #2c2c2c; border:1px solid #bfbfbf;padding-left:0.5rem;padding-right:0.5rem;"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >价格</a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <a class="dropdown-item" href="#">更多1</a>
                  <a class="dropdown-item" href="#">更多1</a>
                  <a class="dropdown-item" href="#">更多1</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="goods-list">
        <div class="sort">
          <div class="range">
            <div class="select-box">
              <div class="dropdown show">
                <a
                  class="btn dropdown-toggle"
                  style="color: #2c2c2c; border:1px solid #bfbfbf;padding-left:0.5rem;padding-right:0.5rem;"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >价格</a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <a class="dropdown-item" href="#">更多1</a>
                  <a class="dropdown-item" href="#">更多1</a>
                  <a class="dropdown-item" href="#">更多1</a>
                </div>
              </div>
            </div>
          </div>
          <div class="tips">温馨提示： 如果选择困难，您可咨询馆内私人教练</div>
        </div>
        <div class="column">
          <div class="goods-box" v-for="(item, index) in 10" :key="index">
            <div class="pic"></div>
            <div class="title">哈他新品专注瑜伽伸展带拉伸拉筋带瑜珈绳拉力带艾扬格辅助瑜珈带</div>
            <div class="price-views-collenct">
              <div class="price">
                <div class="old-price">￥98.00</div>
                <div class="new-price">￥98.00</div>
              </div>
              <div class="views-collenct">
                <div class="views">183231</div>
                <div class="collenct">收藏</div>
              </div>
            </div>
          </div>
        </div>
        <div class="pages">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.current"
            :page-sizes="[10, 20, 30, 40, 50, 100]"
            :page-size="page.size"
            background
            layout="total, sizes, prev, pager, next, jumper"
          ></el-pagination>
        </div>
      </div>
      <div class="last-views">
        <div class="title">
          <div class="title-zh">
            <div class="icon">
              <img :src="titleIcon" alt srcset />
            </div>最近浏览
          </div>
          <div class="title-en">Sometimes beauty is so simple</div>
        </div>
        <div class="goods">
          <div class="goods-box" v-for="(item, index) in 4" :key="index">
            <div class="pic"></div>
            <div class="g-title">哈他新品专注瑜伽伸展带拉伸拉筋带瑜珈绳拉力带艾扬格辅助瑜珈带</div>
            <div class="price-views-collenct">
              <div class="price">
                <div class="old-price">￥98.00</div>
                <div class="new-price">￥98.00</div>
              </div>
              <div class="views-collenct">
                <div class="views">183231</div>
                <div class="collenct">收藏</div>
              </div>
            </div>
          </div>
        </div>
        <div class="change">
          <div class="change-btn">换一批</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TitleIcon from "@/assets/market/market_icon1.png";
export default {
  data() {
    return {
      titleIcon: TitleIcon,
      page: { current: 1, size: 10 },
      tags: {
        price: {},
        material: {},
        kinds: {},
        useRange: {}
      },
      selected: {
        tags: {
          price: {},
          material: {},
          kinds: {},
          useRange: {}
        }
      }
    };
  },
  mounted() {
    this.getMarketTags();
  },
  methods: {
    getMarketTags() {
      this.axios.get("/market/detail/tags").then(({ data }) => {
        const { price, material, kinds, use_range } = data.data.tags;
        this.tags.price = getList(price);
        this.tags.material = getList(material);
        this.tags.kinds = getList(kinds);
        this.tags.useRange = getList(use_range);

        function getList(tag) {
          const MAX_LENGTH = 4;
          const obj = {
            list: [],
            more: []
          };
          if (tag.length > MAX_LENGTH) {
            obj.more = tag.slice(MAX_LENGTH);
          }
          obj.list = tag.slice(0, MAX_LENGTH);
          return obj;
        }
      });
    },
    chooseTagsFor(name, tag) {},
    removeTags(tag) {},
    handleSizeChange(val) {},
    handleCurrentChange(val) {}
  }
};
</script>
<style lang="scss" scoped>
@mixin no_select() {
  -moz-user-select: -moz-none;
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.dropdown-toggle::after {
  color: #cce198;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.dropdown-item {
  padding: 0.3rem;
  padding-left: 1rem;
}
.market {
  @include no_select();
  width: 60rem;
  margin: 0 auto;
  .selected-search {
    display: flex;
    justify-content: space-between;
    .selected {
      display: flex;
      align-items: center;
      color: #2c2c2c;
      font-size: 0.7rem;
      span {
        padding-right: 0.5rem;
      }
      .tag {
        cursor: pointer;
        background: #e3f3d5;
        padding: 0.5rem 2rem 0.5rem 1.25rem;
        border-radius: 0.3rem;
        position: relative;
        .close {
          position: absolute;
          font-size: 1rem;
          right: 0.2rem;
          top: 50%;
          transform: translateY(-50%);
          border-radius: 50%;
        }
      }
    }
    .search {
      width: 14.25rem;
      height: 2rem;
      .input {
        padding-left: 1.35rem;
        height: 100%;
      }
    }
  }
  .select {
    padding-top: 1.6rem;
    .price,
    .kinds,
    .material,
    .use {
      display: flex;
      position: relative;
      z-index: 0;
      height: 2.5rem;
      margin-bottom: 0.5rem;
      &.more_active {
        z-index: 1;
      }
      .title {
        width: 6rem;
        height: 100%;
        line-height: 2.5rem;
        text-align: center;
        background: #cce198;
      }
      .range {
        display: flex;
        align-items: center;
        flex-grow: 1;
        padding-left: 1rem;
        height: 100%;
        border-bottom: 1px solid #dcdcdc;
        .item {
          cursor: pointer;
          margin-left: 10px;
          padding: 0 10px;
          border: 1px solid #ccc;
        }
      }
      .more {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
        color: #7f8f58;
      }
    }
    .senior {
      display: flex;
      position: relative;
      height: 2.5rem;
      margin-bottom: 0.5rem;
      .title {
        width: 6rem;
        height: 100%;
        line-height: 2.5rem;
        text-align: center;
        background: #cce198;
      }
      .select-list {
        display: flex;
        padding-left: 1rem;
        align-items: center;
        .select-box {
          margin-left: 10px;
        }
      }
    }
  }
  .goods-list {
    padding-top: 1rem;
    .sort {
      display: flex;
      justify-content: space-between;
      position: relative;
      padding: 0.6rem 1.4rem;
      box-shadow: 0rem 0.05rem 0.8rem 0rem rgba(143, 143, 143, 0.32);
      .range {
        display: flex;
        .all {
        }
        .price {
        }
        .sale {
        }
      }
      .tips {
        // position: absolute;
        // right: 0;
        // top: 0;
        color: #8f8f8f;
      }
    }
    .column {
      padding-top: 1rem;
      display: flex;
      flex-wrap: wrap;
      .goods-box {
        flex-basis: 23%;
        width: 13.5rem;
        height: 19.35rem;
        background: #fff;
        margin-right: 1.6rem;
        &:nth-child(4n) {
          margin-right: 0rem;
        }
        .pic {
          width: 100%;
          height: 12.75rem;
          background: #000;
        }
        .title {
          padding: 1rem;
          color: #2c2c2c;
          font-size: 0.7rem;
        }
        .price-views-collenct {
          display: flex;
          justify-content: space-between;
          padding: 0 1rem;
          .price {
            display: flex;
            .old-price {
              font-size: 0.6rem;
              color: #999;
              text-decoration: line-through;
              margin-right: 0.1rem;
            }
            .new-price {
              font-size: 0.7rem;
              color: #2c2c2c;
            }
          }
          .views-collenct {
            color: #8f8f8f;
            font-size: 0.7rem;
            display: flex;
            .views {
              cursor: pointer;
              position: relative;
              padding-left: 0.4rem;
              padding-right: 1.2rem;
              &::before {
                content: "";
                display: block;
                position: absolute;
                top: 50%;
                left: -0.6rem;
                transform: translateY(-50%);
                width: 0.9rem;
                height: 0.7rem;
                background: pink;
                background: url("../../assets/eye.png") no-repeat;
                background-size: 100% 100%;
              }
            }
            .collenct {
              cursor: pointer;
              position: relative;
              &::before {
                content: "";
                display: block;
                position: absolute;
                top: 50%;
                left: -0.95rem;
                transform: translateY(-50%);
                width: 0.9rem;
                height: 0.9rem;
                background: pink;
                background: url("../../assets/market/like.png") no-repeat;
                background-size: 100% 100%;
              }
            }
          }
        }
      }
    }
  }
  .pages {
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ccc;
  }
  .last-views {
    .title {
      height: 13.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      position: relative;
      &::before,
      &::after {
        content: "";
        display: block;
        width: 13rem;
        height: 1px;
        background: #dcdcdc;
        position: absolute;
      }
      &::before {
        top: 50%;
        right: 40%;
        transform: translate(-110%, -50%);
      }
      &::after {
        top: 50%;
        left: 40%;
        transform: translate(110%, -50%);
      }
      &-zh {
        color: #2c2c2c;
        font-weight: 800;
        vertical-align: bottom;
        .icon {
          width: 1rem;
          height: 1.5rem;
          display: inline-block;
          vertical-align: super;
          margin-right: 0.8rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      &-en {
      }
    }
    .goods {
      display: flex;
      justify-content: space-between;
      &-box {
        width: 13.5rem;
        height: 19.35rem;
        background: #ccc;
        flex-basis: 23%;
        width: 13.5rem;
        height: 19.35rem;
        background: #fff;
        margin-right: 1.6rem;
        &:nth-child(4n) {
          margin-right: 0rem;
        }
        .pic {
          width: 100%;
          height: 12.75rem;
          background: #000;
        }
        .g-title {
          padding: 1rem;
          color: #2c2c2c;
          font-size: 0.7rem;
        }
        .price-views-collenct {
          display: flex;
          justify-content: space-between;
          padding: 0 1rem;
          .price {
            display: flex;
            .old-price {
              font-size: 0.6rem;
              color: #999;
              text-decoration: line-through;
              margin-right: 0.1rem;
            }
            .new-price {
              font-size: 0.7rem;
              color: #2c2c2c;
            }
          }
          .views-collenct {
            color: #8f8f8f;
            font-size: 0.7rem;
            display: flex;
            .views {
              cursor: pointer;
              position: relative;
              padding-left: 0.4rem;
              padding-right: 1.2rem;
              &::before {
                content: "";
                display: block;
                position: absolute;
                top: 50%;
                left: -0.6rem;
                transform: translateY(-50%);
                width: 0.9rem;
                height: 0.7rem;
                background: pink;
                background: url("../../assets/eye.png") no-repeat;
                background-size: 100% 100%;
              }
            }
            .collenct {
              cursor: pointer;
              position: relative;
              &::before {
                content: "";
                display: block;
                position: absolute;
                top: 50%;
                left: -0.95rem;
                transform: translateY(-50%);
                width: 0.9rem;
                height: 0.9rem;
                background: pink;
                background: url("../../assets/market/like.png") no-repeat;
                background-size: 100% 100%;
              }
            }
          }
        }
      }
    }
    .change {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 5rem;
      margin-bottom: 9rem;
      &-btn {
        cursor: pointer;
        // width: 13rem;
        margin: 0 auto;
        padding: 0.8rem 2rem 0.8rem 4.4rem;
        background: url(../../assets/market/btn-bg.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
