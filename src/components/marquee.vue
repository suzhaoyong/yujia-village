<template>
  <div class="marquee-wrap">
    <div class="scroll">
      <p class="marquee">{{text}}</p>
      <p class="copy"></p>
    </div>
    <p class="getWidth">{{text}}</p>
  </div>
</template>
<script>
export default {
  props:{ // 父组件传过来的数组
      listData:Array
  },
  data () {
    return {
      timer: null,
      text: '',
    }
  },
  created () {
    // 进入页面等一秒才开始滑动
    let timer = setTimeout(() => {
      this.move();
      clearTimeout(timer);
    }, 1000)
  },
  // 把父组件传入的arr转化成字符串
  mounted () {
    for (let item of this.listData) {
      this.text += ' ' + item;
    }
  },
  watch:{
      listData(val){},
  },
  methods: {
    move () {
      let maxWidth = document.querySelector('.marquee-wrap').clientWidth;
      // 获取文字text 的计算后宽度 （由于overflow的存在，直接获取不到，需要独立的node计算）
      let width = document.querySelector('.getWidth').scrollWidth;
      // 如果文本内容的宽度小于页面宽度，则表示文字小于等于一行，则不需要滚动
      if (width <= maxWidth) return;
      let scroll = document.querySelector('.scroll');
      let copy = document.querySelector('.copy');
      copy.innerText = this.text; // 文字副本填充
      let distance = 0; // 位移距离
      // 设置位移
      this.timer = setInterval(() => {
        distance -= 1;
        // 如果位移超过文字宽度，则回到起点
        if (-distance >= width) {
          distance = 16; // 距离必须与marquee的margin宽度相同
        }
        scroll.style.transform = 'translateX(' + distance + 'px)';
      }, 20)
    }
  },
  beforeDestroy () {
    clearInterval(this.timer);
  }
}
</script>
<style scoped lang="scss">
  .marquee-wrap {
    width: 100%;
    overflow: hidden;
    position: relative;
    .scroll {
      display: flex;
      padding-top: 20px;
      p{
        word-break:keep-all; // 不换行
        white-space:nowrap;
        /* 设置前后间隔 */
        &.marquee {
          margin-right: 16px;
        }
      }
    }
    .getWidth {
      word-break:keep-all; // 不换行
      white-space:nowrap;
      position: absolute;
      opacity: 0;
      top: 0;
    }
  }
</style>