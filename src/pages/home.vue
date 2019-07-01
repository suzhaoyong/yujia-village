<template>
  <div style="width:100%;height:100%;">
    <el-container>
        <el-header>Header</el-header>
        <el-main>MainMainMainMain</el-main>
        <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
    };
  }
};
</script>
<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 450px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>