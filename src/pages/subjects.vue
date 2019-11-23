<template>
    <div>
        <el-col :span="24" >
            <div class="subject_main">
                <img :src="item" v-for="item in sub" :key="item"/>
            </div>
        </el-col>
    </div>
</template>
<script>
export default {
  data() {
    return {
        sub:[]
    }
  },
  created () {
       this.classificcustom();
  },
  methods:{
       classificcustom(){
         this.$request.get(`/advertisement/customize/${this.$route.query.id}`).then(data => {
            this.sub = data.images;
      });
    },
  }
};
</script>
<style lang="scss" scoped>
.subject_main{
    width: 100%;
    img{
        width: 100%;
        height: 100%;
    }
}
</style>