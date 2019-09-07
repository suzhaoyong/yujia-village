<template>
  <div class="bg">
    <div class="score_history" v-show="them === 'score'">
      <div class="give">
        <div class="header">积分获取记录</div>
        <div class="tips">积分获取总数为：{{fractio.in.count}}</div>
        <div class="content">
          <div class="list">
            <div class="item" v-for="(item, index) in fractio.in.list">
              <div v-if="item.id">
                <span>+{{item.num}}</span>
                <span>{{item.reason}}</span>
                <span>{{item.created_at || '--'}}</span>
              </div>
            </div>
            <div style="text-align:center;" v-if="fractio.in.list.length === 0">暂无记录</div>
          </div>
          <div class="pages">
            <el-pagination
              background
              :hide-on-single-page="true"
              layout="prev, pager, next, jumper"
              :page-size="fractio.in.meta.limit"
              @current-change="changeFractioInPage"
              :current-page="1"
              :total="fractio.in.meta.total"
            ></el-pagination>
          </div>
        </div>
      </div>
      <div class="used">
        <div class="header">积分使用记录</div>
        <div class="tips">积分使用总数为：{{fractio.out.count}}</div>
        <div class="content">
          <div class="list">
            <div class="item" v-for="(item, index) in fractio.out.list">
              <div v-if="item.id">
                <span>-{{item.num}}</span>
                <span>{{item.reason}}</span>
                <span>{{item.created_at || '--'}}</span>
              </div>
            </div>
            <div style="text-align:center;" v-if="fractio.out.list.length === 0">暂无记录</div>
          </div>
          <div class="pages">
            <el-pagination
              background
              :hide-on-single-page="true"
              layout="prev, pager, next, jumper"
              :page-size="fractio.out.meta.limit"
              @current-change="changeFractioOutPage"
              :current-page="1"
              :total="fractio.out.meta.total"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div class="glod_history" v-show="them === 'glod'" style="justify-content: center;">
      <div class="give">
        <div class="header">金币充值记录</div>
        <!-- <div class="tips">金币总数为：50000</div> -->
        <div class="content">
          <div class="list">
            <div class="item" style="padding:0 0.5rem;" v-for="(item, index) in glod.list">
              <div v-if="item.id">
                <span>{{item.out_trade_no}}</span>
                <span style="width: 5em;flex-shrink: 0;">+{{(item.new_money-item.money).toFixed(2)}}</span>
                <span :style="`width: 5em;flex-shrink: 0;color:${isStatus(item.status).color}`">{{isStatus(item.status).text}}</span>
                <span>{{item.created_at}}</span>
              </div>
            </div>
            <div style="text-align:center;" v-if="glod.list.length === 0">暂无充值记录</div>
          </div>
          <div class="pages">
            <el-pagination
              background
              :hide-on-single-page="true"
              layout="prev, pager, next, jumper"
              :page-size="glod.meta.limit"
              @current-change="changeGlodPage"
              :current-page="1"
              :total="glod.meta.total"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getRechargeRecord, getFractioRecord } from "@/api/personal";
export default {
  data() {
    return {
      them: "",
      record: { recharge: [], fractio: [] },
      glod: {
        list: [],
        count: 0,
        meta: {
          limit: 10, // 每页显示行数
          totalPage: 0, // 总页数
          currentPage: 0, // 当前页,
          total: 0
        }
      },
      fractio: {
        in: {
          list: [],
          count: 0,
          meta: {
            limit: 10, // 每页显示行数
            totalPage: 0, // 总页数
            currentPage: 0, // 当前页,
            total: 0
          }
        },
        out: {
          list: [],
          count: 0,
          meta: {
            limit: 10, // 每页显示行数
            totalPage: 0, // 总页数
            currentPage: 0, // 当前页,
            total: 0
          }
        }
      }
    };
  },
  computed: {
    isStatus() {
      return item => {
        let obj = {
          1: { text: "充值成功", color: "green" },
          2: { text: "充值失败", color: "#FF1900" },
          3: { text: "待审核", color: '' }
        };
        return obj[item];
      };
    }
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应……
      const { type } = this.$route.params;
      this.them = type;
    }
  },
  mounted() {
    const { type } = this.$route.params;
    this.them = type;
    getRechargeRecord().then(data => {
      this.record.recharge = data;

      this.glod.meta.total = data.length;
      const { limit, currentPage } = this.glod.meta;
      this.glod.list = this.paginate(data, limit, currentPage);
    });
    getFractioRecord().then(data => {
      this.record.fractio = data;
      {
        this.fractio.in.count = (data.in[0] && data.in[0].count) || "0";
        this.fractio.in.meta.total = data.in.length;
        const { limit, currentPage } = this.fractio.in.meta;
        this.fractio.in.list = this.paginate(data.in, limit, currentPage);
      }
      {
        this.fractio.out.count = (data.out[0] && data.out[0].count) || "0";
        this.fractio.out.meta.total = data.out.length;
        const { limit, currentPage } = this.fractio.out.meta;
        this.fractio.out.list = this.paginate(data.out, limit, currentPage);
      }
    });
  },
  methods: {
    changeFractioOutPage(val) {
      this.fractio.out.meta.currentPage = val - 1;
      const { limit, currentPage } = this.fractio.out.meta;
      this.fractio.out.list = this.paginate(
        this.record.fractio.out,
        limit,
        currentPage
      );
    },
    changeFractioInPage(val) {
      this.fractio.in.meta.currentPage = val - 1;
      const { limit, currentPage } = this.fractio.in.meta;
      this.fractio.in.list = this.paginate(
        this.record.fractio.in,
        limit,
        currentPage
      );
    },
    changeGlodPage(val) {
      this.glod.meta.currentPage = val - 1;
      const { limit, currentPage } = this.glod.meta;
      this.glod.list = this.paginate(this.record.recharge, limit, currentPage);
    },
    paginate(arr, limit, currentPage) {
      // 返回指定条数的数组
      arr = arr.slice(limit * currentPage, limit * (currentPage + 1));
      if (arr.length != limit) {
        let emptyArry = Array(10 - arr.length).fill(0);
        arr = [...arr, ...emptyArry];
      }
      return arr;
    }
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
.bg {
  background-image: url("../../assets/personal/bg.png");
  background-size: 100% 100%;
  @include full-width(margin, 960px);
}
.score_history,
.glod_history {
  color: #2c2c2c;
  font-size: 0.7rem;
  width: 60rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 5rem 0;
  .give,
  .used {
    width: 29rem;
    padding: 1rem 0;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 1px 7px 1px rgba(36, 36, 36, 0.2);
    border-radius: 4px;
    .header {
      text-align: center;
      font-size: 1rem;
      font-weight: 800;
      height: 2rem;
      line-height: 2rem;
      background: #acd589;
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