<template>
  <div class="infordetail">
    <header><van-nav-bar
      title="标题"
      left-text="返回"
      right-text="分享"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    /></header>
    <div class="infordetail-count">
      <div class="infordetail-count-title">
        <p class="titlep">{{ this.titleLists[0].headline }}</p>
        <p class="infordetail-count-title-subhead">稚嫩并不可怕，新锐终将引领未来</p>
        <div class="infordetail-count-title-remarks"><span>ivav</span> <span>2018-01-30 </span></div>
      </div>
    </div>
    <main class="infordetail-main">
      <div class="infordetail-main-img" v-for="list in titleLists" :key="list.id">
        <img :src="list.icon_url">
        <span>{{ list.summary }}</span>
      </div>
    </main>
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar, Toast } from 'vant';

Vue.use(NavBar).use(Toast);
export default {
  data() {
    return {
      titleLists: []
    }
  },
  created() {
    this.yujiamation()
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    onClickRight() {
      Toast('分享');
    },
    yujiamation () {
      this.$request.get('informationList/1').then((res) => {
        console.log(res)
        this.titleLists = res.data
      })
    }
  }
}
</script>

<style lang="scss" scope>
  .infordetail {
    width: 100%;
  &-count {
    &-title {
      width: 303px;
      height: auto;
      margin: 0 auto;
      text-align: center;
      .titlep {
        width: 215px;
        margin: 0 auto;
        font-size: 16px;
      }
      &-subhead {
        margin-top: 18px;
        font-size: 7px;
      }
      &-remarks {
        display: flex;
        justify-content: space-between;
        font-size: 10px;
        margin-top: 30px;
      }
    }

  }
  &-main {
    width: 100%;
    padding: 15px;
    img {
      width: 100%;
      height: 256px;
    }
    span {
      display: block;
      font-size: 12px;
      margin-top: 7px;
    }
  }
  }
</style>