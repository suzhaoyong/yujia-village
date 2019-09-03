<template>
  <div>
    <div :class="['title',{'line': line}]">
      <div class="title-zh">
        <div class="icon">
          <img :src="titleIcon" alt srcset />
        </div>
        {{name}}
        <slot name="tips"></slot>
      </div>
      <div class="title-en">{{brief}}</div>
    </div>
  </div>
</template>
<script>
import TitleIcon from "@/assets/market/market_icon1.png";
export default {
  props: {
    name: { type: String, required: true },
    brief: {
      type: String,
      default: `The customer's excellent experience is our goal from beginning`
    },
    line: { type: Boolean, default: true }
  },
  data() {
    return {
      titleIcon: TitleIcon
    };
  }
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@mixin title() {
  .title {
    // height: 13.5rem;
    margin-top: 6rem;
    margin-bottom: 3rem;
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
      height: 0;
      background: #dcdcdc;
      position: absolute;
    }
    &.line::before,
    &.line::after {
      height: 1px;
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
      padding-top: 1rem;
    }
  }
}

@include title();
</style>

