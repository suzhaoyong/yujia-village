<template>
    <div>
        <el-col :span="24" >
            <div class="subject_main">
                <img :src="item" v-for="item in sub" :key="item"/>
                <transition name="el-fade-in">
                <div class="up"><a href="#header">返回顶部</a></div>
                </transition>
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
    .up{
        width: 100%;
        height: 98px;
        text-align: center;
        line-height: 98px;
        box-shadow:-1px -3px 16px 1px rgba(28,28,28,0.18);
        font-size:20px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(44,44,44,1);
        margin-bottom: 70px;
        margin-top: 2px;
        cursor: pointer;
        a{
            text-decoration: none;
            color:rgba(44,44,44,1);
        }
    }
}
</style>