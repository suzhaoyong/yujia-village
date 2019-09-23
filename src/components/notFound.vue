<template>
  <div class="not_found">
    <div class="type_1" v-show="type=='not-fond_2'">
      <div class="icon">
        <img :src="icon.icon_1" alt />
      </div>
      <div class="tips">{{msg}}</div>
    </div>
    <div class="type_2" v-show="type=='not-fond_3'">
      <div class="tips">{{msg}}</div>
      <div class="icon">
        <img :src="icon.icon_2" alt />
      </div>
    </div>
    <div class="type_3" v-show="type=='not-fond_4'">
      <div class="icon">
        <img :src="icon.icon_3" alt />
      </div>
      <div class="tips">{{msg}}</div>
    </div>
    <div class="type_4" v-show="type=='not-fond'">
      <div class="icon">
        <img :src="icon.icon_4" alt />
      </div>
      <div class="tips" :style="`background-image:url(${icon.icon_5});`">{{msg}}</div>
    </div>
  </div>
</template>
<script>
import icon_1 from "@/assets/warning/not_fond.png";
import icon_2 from "@/assets/warning/nothing_plant.png";
import icon_3 from "@/assets/warning/nothing_roadio.png";
import icon_4 from "@/assets/warning/nothing.png";
import icon_5 from "@/assets/warning/nothing_2.png";
export default {
  props: {
    type: String,
    msg: String
  },
  data() {
    return {
      icon: {
        icon_1,
        icon_2,
        icon_3,
        icon_4,
        icon_5
      }
    };
  }
};
</script>
<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
}
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

.not_found {
  padding: 0rem 0;
  background: #F1F1F1;
  @include full-width(margin, 960px);
}
.type_1 {
  display: flex;
  justify-content: center;
  // align-items: center;
  padding-top: 4rem;
  padding-bottom: 5rem;
  .icon {
    width: 41rem;
    height: 18rem;
    position: relative;
    z-index: 1;
  }
  .tips {
    position: relative;
    z-index: 2;
    padding-top: 4rem;
    margin-left: -5rem;
    font-size: 1.1rem;
    color: #999999;
  }
}
.type_2 {
  display: flex;
  justify-content: center;
  // align-items: center;
  padding: 1rem 0;
  .icon {
    width: 10rem;
    height: 18rem;
    position: relative;
    z-index: 1;
  }
  .tips {
    position: relative;
    z-index: 2;
    width: 18rem;
    padding-top: 6rem;
    margin-right: 10rem;
    font-size: 1.1rem;
    color: #999999;
  }
}
.type_3 {
  display: flex;
  justify-content: center;
  // align-items: center;
  padding: 3rem 0;
  .icon {
    width: 41rem;
    height: 18rem;
    position: relative;
    z-index: 1;
  }
  .tips {
    position: relative;
    z-index: 2;
    width: 15.8rem;
    padding-top: 4rem;
    margin-left: -7rem;
    font-size: 1.1rem;
    color: #999999;
  }
}
.type_4 {
  display: flex;
  justify-content: center;
  // align-items: center;
  padding-top: 5rem;
  .icon {
    width: 41rem;
    height: 18rem;
    position: relative;
    z-index: 1;
  }
  .tips {
    position: relative;
    z-index: 2;
    width: 22rem;
    height: 7rem;
    padding-top: 1rem;
    padding-left: 2rem;
    padding-right: 3rem;
    margin-left: -18rem;
    font-size: 1.1rem;
    color: #999999;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
}
</style>