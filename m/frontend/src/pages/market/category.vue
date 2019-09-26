<template>
  <div>
    我
  </div>
</template>
<script>
import { getGoodsFilter } from "@/api/category.js";
export default {
  data() {
    return {

    }
  },
  mounted() {
    console.log(1)
    getGoodsFilter()
  }
};
</script>
<style lang="scss" scope>
</style>