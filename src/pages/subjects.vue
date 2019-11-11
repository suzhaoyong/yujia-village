<template>
    <div>
        <el-col :span="24" >
            <div class="subject_main">
                <img src="../assets/subject/sub6.png"/>
                <img src="../assets/subject/sub7.png"/>
                <img src="../assets/subject/sub8.png"/>
                <img src="../assets/subject/sub9.png"/>
                <img src="../assets/subject/sub10.png"/>
                <img src="../assets/subject/sub11.png"/>
                <img src="../assets/subject/sub12.png"/>
                <img src="../assets/subject/sub13.png"/>
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
    }
  },
  methods:{
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