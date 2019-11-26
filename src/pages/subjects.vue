<template>
    <div>
        <el-col :span="24" >
            <div class="subject_main">
                <img :src="item" v-for="item in sub" :key="item"/>
            </div>
            <div class="skip" @click="cationclick()"><img src="../assets/skip.png"/></div>
        </el-col>
    </div>
</template>
<script>
export default {
  data() {
    return {
        sub:[],
        mold:'',
        relation_id:''
    }
  },
  created () {
       this.classificcustom();
  },
  methods:{
    classificcustom(){
         this.$request.get(`/advertisement/customize/${this.$route.query.id}`).then(data => {
            this.sub = data.images;
            this.mold = data.mold;
            this.relation_id = data.relation_id;
      });
    },
    cationclick(){
        switch(this.mold){
            case 1:
                this.$router.push({
                    path: "/subjects",
                    query: {
                    id: this.relation_id
                    }
                });
                break;
            case 2:
                this.$router.push({
                    path: "/joinclubhouse/joinclubhousedetails",
                    query: {
                    id: this.relation_id
                    }
                });
                break;
            case 3:
                this.$router.push({
                    path: "/yogoteacher/yogoteacherdetails",
                    query: {
                    id: this.relation_id
                    }
                });
                break;
            case 4:
               this.$router.push({
                        path: `/cultivate/detail/${this.relation_id}`,
                    });
                break;
            case 5:
                this.$router.push({
                    path: "/goods/detail",
                    params: {
                    id: this.relation_id
                    }
                });
                break;
            case 6:
                this.$router.push({
                    path: `/cultivate/index?ids=${this.relation_id}`,
                });
                break;
            case 7:
                this.$router.push({
                    path: "/market/detail",
                });
                break;
        }
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
.skip{
  width: 102px;
  height: 102px;
  position: fixed;
  top: 70%;
  right: 3%;
  z-index: 999;
  cursor: pointer;
  img{
    width: 100%;
    height: 100%;
  }
}
</style>