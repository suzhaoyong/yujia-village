<template>
  <div>
    <div class="type_1" v-show="false">
      <div class="icon">
        <img :src="icon.icon_1" alt />
      </div>
      <div class="tips">我寻寻觅觅却找不见您收藏的踪迹</div>
    </div>
    <div class="type_2" v-show="false">
      <div class="tips">
        虽然您没有券，但至少您还拥有一盆花
        请温笑面对生活^-^
      </div>
      <div class="icon">
        <img :src="icon.icon_2" alt />
      </div>
    </div>
    <div class="type_3" v-show="false">
      <div class="icon">
        <img :src="icon.icon_3" alt />
      </div>
      <div class="tips">
        我们的优惠券一般为限时发放，
        请您注意时间哟(＾Ｕ＾)ノ~ＹＯ
      </div>
    </div>
    <div class="type_4" v-show="type=='not-fond'">
      <div class="icon">
        <img :src="icon.icon_4" alt />
      </div>
      <div class="tips" :style="`background-image:url(${icon.icon_5});`">
        {{msg}}
      </div>
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
.type_1 {
  display: flex;
  justify-content: center;
  // align-items: center;
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