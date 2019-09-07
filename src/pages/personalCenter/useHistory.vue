<template>
  <div class="bg">
    <div class="history">
      <div class="give">
        <div class="header">{{them}}获取记录</div>
        <div class="tips">{{them}}获取总数为：50000</div>
        <div class="content">
          <div class="list">
            <div class="item" v-for="(item, index) in 10">
              <div v-if="item < 5">
                <span>{{item*1000}}</span>
                <span>{{'购物抵扣'}}</span>
                <span>{{'2019.05.20'}}</span>
              </div>
            </div>
          </div>
          <div class="pages">
            <el-pagination
              background
              :hide-on-single-page="true"
              layout="prev, pager, next, jumper"
              :page-size="12"
              @current-change="changePage"
              :current-page="1"
              :total="20"
            ></el-pagination>
          </div>
        </div>
      </div>
      <div class="used">
        <div class="header">{{them}}使用记录</div>
        <div class="tips">{{them}}使用总数为：50000</div>
        <div class="content">
          <div class="list">
            <div class="item" v-for="(item, index) in 10">
              <div v-if="item < 5">
                <span>{{item*1000}}</span>
                <span>{{'购物抵扣'}}</span>
                <span>{{'2019.05.20'}}</span>
              </div>
            </div>
          </div>
          <div class="pages">
            <el-pagination
              background
              :hide-on-single-page="true"
              layout="prev, pager, next, jumper"
              :page-size="12"
              @current-change="changePage"
              :current-page="1"
              :total="20"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      them: ''
    };
  },
  mounted() {
    const { type } = this.$route.params
    this.them = type === 'glod'? '金币' : '积分'
  },
  methods: {
    changePage(val) {}
  }
};
</script>
<style lang="scss" scoped>
@mixin full-width($support-type: margin, $min-width: null) {
  @if $support-type == "margin" {
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
    // margin-left: calc(-100vw / 2 + #{$min-width} / 2);
    // margin-right: calc(-100vw / 2 + #{$min-width} / 2);
  }
  @if $support-type == "position" {
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
  }
  @if $support-type == "translate" {
    width: 100vw;
    transform: translateX(calc((#{$min-width} - 100vw) / 2));
  }
}
.bg{
  background-image: url('../../assets/personal/bg.png');
  background-size: 100% 100%;
  @include full-width(margin, 960px);
}
.history {
  color: #2c2c2c;
  font-size: 0.7rem;
  width: 60rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 5rem 0;
  .give,
  .used {
    width: 28rem;
    padding: 1rem 0;
    background: rgba(255, 255, 255, 0.8);
    box-shadow:0px 1px 7px 1px rgba(36,36,36,0.2);
    border-radius: 4px;
    .header {
      text-align: center;
      font-size: 1rem;
      font-weight: 800;
      height: 2rem;
      line-height: 2rem;
      background: #ACD589;
    }
    .tips {
      text-align: center;
      font-size: 0.6rem;
      color: #999999;
    }
    .content {
      .list {
        padding: 1rem;
        // background-image: url('../../assets/personal/line.png');
        .item {
          border-bottom: 1px solid #e8eace;
          padding: 0 2.8rem;
          height: 1.8rem;
          div {
            display: flex;
            justify-content: space-between;
            span {
              padding: 0.4rem 0;
            }
          }
        }
      }
      .pages {
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>