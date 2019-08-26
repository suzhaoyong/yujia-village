<template>
  <div>
    <div class="market">
      <div class="selected-search">
        <div class="selected">
          <span v-show="arrayNotEmpty(selected.tags)">已选</span>
          <span v-show="arrayNotEmpty(selected.tags)">></span>
          <div class="tags" v-show="arrayNotEmpty(selected.tags)">
            <div class="tag" v-for="(item, index) in selected.tags" :key="index">
              {{item.name}}
              <i class="el-icon-close close" @click="removeTags(item, index)"></i>
            </div>
            <span style="margin-left:10px;">
              <el-button icon="el-icon-search" @click="searchGoods" circle></el-button>
            </span>
          </div>
        </div>
        <div class="search">
          <!-- <input type="text" class="form-control input" placeholder="商品名或关键词" /> -->
        </div>
      </div>
      <div class="select">
        <div :class="['price', arrayNotEmpty(tags.price.more) ? 'more_active' : '']">
          <div class="title">理想价位</div>
          <div class="range">
            <div
              :class="['item', isTagActive(item) ? 'active' : '' ]"
              @click="chooseTagsFor('price', item)"
              v-for="(item, index) in tags.price.list"
            >{{item.name}}</div>
          </div>
          <div class="more" v-if="arrayNotEmpty(tags.price.more)">
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
                  :key="index"
                  :class="['dropdown-item', {'active': isTagActive(item)}]"
                  @click="chooseTagsFor('price', item)"
                >{{item.name}}</a>
              </div>
            </div>
          </div>
        </div>
        <div :class="['sort', arrayNotEmpty(tags.sort.more) ? 'more_active' : '']">
          <div class="title">商品种类</div>
          <div class="range">
            <div
              :class="['item', isTagActive(item) ? 'active' : '' ]"
              @click="chooseTagsFor('sort', item)"
              v-for="(item, index) in tags.sort.list"
            >{{item.name}}</div>
          </div>
          <div class="more" v-if="arrayNotEmpty(tags.sort.more)">
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
                  v-for="(item, index) in tags.sort.more"
                  class="dropdown-item"
                  :key="index"
                  :class="['dropdown-item', {'active': isTagActive(item)}]"
                  @click="chooseTagsFor('sort', item)"
                >{{item.name}}</a>
              </div>
            </div>
          </div>
        </div>
        <div :class="['material', arrayNotEmpty(tags.material.more) ? 'more_active' : '']">
          <div class="title">材质</div>
          <div class="range">
            <div
              :class="['item', isTagActive(item) ? 'active' : '' ]"
              @click="chooseTagsFor('material', item)"
              v-for="(item, index) in tags.material.list"
            >{{item.name}}</div>
          </div>
          <div class="more" v-if="arrayNotEmpty(tags.material.more)">
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
                  :key="index"
                  :class="['dropdown-item', {'active': isTagActive(item)}]"
                  @click="chooseTagsFor('material', item)"
                >{{item.name}}</a>
              </div>
            </div>
          </div>
        </div>
        <div :class="['use', arrayNotEmpty(tags.type.more) ? 'more_active' : '']">
          <div class="title">适用类别</div>
          <div class="range">
            <div
              :class="['item', isTagActive(item) ? 'active' : '' ]"
              @click="chooseTagsFor('type', item)"
              v-for="(item, index) in tags.type.list"
            >{{item.name}}</div>
          </div>
          <div class="more" v-if="arrayNotEmpty(tags.type.more)">
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
                  v-for="(item, index) in tags.type.more"
                  class="dropdown-item"
                  :key="index"
                  :class="['dropdown-item', {'active': isTagActive(item)}]"
                  @click="chooseTagsFor('type', item)"
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
                >颜色</a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <a
                    class="dropdown-item"
                    v-for="(item, index) in tags.color.list"
                    :key="index"
                    :class="['dropdown-item', {'active': isTagActive(item)}]"
                    @click="chooseTagsFor('price', item)"
                    href="#"
                  >{{item.name}}</a>
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
                >使用季节</a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <a
                    class="dropdown-item"
                    v-for="(item, index) in tags.season.list"
                    :key="index"
                    :class="['dropdown-item', {'active': isTagActive(item)}]"
                    @click="chooseTagsFor('price', item)"
                    href="#"
                  >{{item.name}}</a>
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
                >适用人群</a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <a
                    class="dropdown-item"
                    v-for="(item, index) in tags.person.list"
                    :key="index"
                    :class="['dropdown-item', {'active': isTagActive(item)}]"
                    @click="chooseTagsFor('price', item)"
                    href="#"
                  >{{item.name}}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="goods-list">
        <div class="sort">
          <div class="range">
            <!-- <div class="select-box">
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
            </div>-->
          </div>
          <div class="tips">温馨提示： 如果选择困难，您可咨询馆内私人教练</div>
        </div>
        <div class="column">
          <div
            class="goods-box"
            @click="viewGoodsDetail(item)"
            v-for="(item, index) in resultList"
            :key="index"
          >
            <div class="pic">
              <img :src="item.cover_url" alt />
            </div>
            <div class="gtitle">{{item.describe}}</div>
            <div class="price-views-collenct">
              <div class="price">
                <div class="old-price">￥{{item.sell_price}}</div>
                <div class="new-price">￥{{item.sell_price - item.discount}}</div>
              </div>
              <div class="views-collenct">
                <div class="views">{{item.views}}</div>
                <div class="collenct" @click="addCollect">收藏</div>
              </div>
            </div>
          </div>
          <div class="no_result" style="width:100%;" v-if="resultList.length === 0">
            <div style="text-align:center;height:100px;line-height:100px;">暂未搜到结果</div>
          </div>
        </div>
        <!-- <div class="pages">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.current"
            :page-sizes="[10, 20, 30, 40, 50, 100]"
            :page-size="page.size"
            background
            layout="total, sizes, prev, pager, next, jumper"
          ></el-pagination>
        </div>-->
      </div>
      <div class="last-views">
        <session-title name="最近浏览"></session-title>
        <div class="goods">
          <div
            class="goods-box"
            @click="viewGoodsDetail(item)"
            v-for="(item, index) in resenView"
            :key="index"
          >
            <div class="pic">
              <img :src="item.cover_url" alt />
            </div>
            <div class="g-title">{{item.describe}}</div>
            <div class="price-views-collenct">
              <div class="price">
                <div class="old-price">￥{{item.sell_price}}</div>
                <div class="new-price">￥{{item.sell_price - item.discount}}</div>
              </div>
              <div class="views-collenct">
                <div class="views">{{item.views}}</div>
                <div class="collenct">收藏</div>
              </div>
            </div>
          </div>
        </div>
        <div class="change">
          <div class="change-btn" @click="changeGoodsFor('last_view')">换一批</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SessionTitle from "./SessionTitle";
import { postShowGoodList, getGoods, postRecentbrowse } from "@/api/market";
export default {
  components: {
    SessionTitle
  },
  data() {
    return {
      page: { current: 1, size: 10 },
      tags: {
        price: {
          list: [],
          more: []
        },
        material: {
          list: [],
          more: []
        },
        sort: {
          list: [],
          more: []
        },
        type: {
          list: [],
          more: []
        },
        season: {
          list: [],
          more: []
        },
        color: {
          list: [],
          more: []
        },
        person: {
          list: [],
          more: []
        }
      },
      selected: {
        tags: []
      },
      resultList: [],
      resenView: []
    };
  },
  computed: {
    isTagActive() {
      return item => {
        if (item.name !== "不限") {
          return (
            this.selected.tags.findIndex(tag => tag.name === item.name) >= 0
          );
        }
      };
    },
    arrayNotEmpty() {
      return array => array.length > 0;
    }
  },
  mounted() {
    //
    this.getMarketTags();
    this.getMarketList();
    this.getLastView();
  },
  methods: {
    getLastView(page = "") {
      postRecentbrowse({ page }).then(data => {
        this.resenView = data.data;
      });
    },
    searchGoods() {
      let params = {};
      this.selected.tags.map(item => {
        params[item.type] = item.id;
      });
      postShowGoodList(params).then(data => (this.resultList = data.data));
    },
    changeGoodsFor(name) {
      this.getLastView(2);
    },
    /** 添加收藏 */
    addCollect() {},
    getMarketList() {
      postShowGoodList().then(data => {
        this.resultList = data.data;
      });
    },
    getMarketTags() {
      getGoods().then(data => {
        let { color, material, person, price, season, sort, type } = data;
        price = getList(price, "price");
        material = getList(material, "material");
        sort = getList(sort, "sort");
        type = getList(type, "type");
        color = getList(color, "color", false);
        season = getList(season, "season", false);
        person = getList(person, "person", false);

        this.tags = Object.assign(
          {},
          { color, material, person, price, season, sort, type }
        );

        function getList(tag, name, is_split = true) {
          tag = tag.map(item => {
            item.type = name;
            return item;
          });
          let obj = {};
          if (is_split) {
            const MAX_LENGTH = 8;
            obj = {
              list: [],
              more: []
            };
            if (tag.length > MAX_LENGTH) {
              obj.more = tag.slice(MAX_LENGTH);
            }
            obj.list = tag.slice(0, MAX_LENGTH);
          } else {
            obj = {
              list: tag
            };
          }
          return obj;
        }
      });
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
        this.getMarketList();
      }
    },
    handleSizeChange(val) {},
    handleCurrentChange(val) {},
    viewGoodsDetail(goods) {
      this.$router.push({
        name: "detailGoods",
        params: {
          id: goods.id
        }
      });
    }
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
.dropdown-item {
  padding: 0.3rem;
  padding-left: 1rem;
}
.dropdown-item.active {
  background: #e3f3d5;
  color: #2c2c2c;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
img {
  width: 100%;
  height: 100%;
}
.market {
  @include no_select();
  width: 60rem;
  margin: 0 auto;
  margin-top: 10px;
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
        width: 4em;
      }
      .tags {
        display: flex;
        flex-wrap: wrap;
      }
      .tag {
        cursor: pointer;
        background: #e3f3d5;
        padding: 0.5rem 2rem 0.5rem 1.25rem;
        border-radius: 0.3rem;
        margin-right: 4px;
        margin-top: 4px;
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
      flex-shrink: 0;
      .input {
        padding-left: 1.35rem;
        height: 100%;
      }
    }
  }
  .select {
    padding-top: 1.6rem;

    .price,
    .sort,
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
        .item.active {
          border: 1px solid #2cc;
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
        // height: 19.35rem;
        background: #fff;
        margin-right: 1.6rem;
        &:nth-child(4n) {
          margin-right: 0rem;
        }
        .pic {
          width: 100%;
          height: 12.75rem;
        }
        .gtitle {
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
