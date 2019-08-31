<template>
    <div>
        <el-col :span="24">
            <div class="footer-main">
                <div class="footer-center"></div>
                <div class="foot-count">
                <div class="footer-foot">
                    <div class="button">
                      <el-button type="text" @click="goto">关于我们</el-button>
                    </div>
                    <span class="span1">商务合作</span>
                    <span class="span2">客服电话：021-621146321(周一至周六 9:30-18:00)</span>
                </div>
                <div class="footer-foot2">
                    <span>Copyright © 2017-2022 上海一伽健身服务有限公司 All rights reserved</span>
                    <span class="span3">沪ICP备16052417号-1</span>
                </div>
                </div>
            </div>
        </el-col>
    </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  methods:{
      goto(){
          this.$router.push({
            path: "/aboutus",
        });
      }
  }
};
</script>
<style lang="scss" scoped>
.footer-main{
    width: 100%;
    height: 100%;
    padding: 0;
    background: #CAE6AB;
    .footer-center{
        height: 20px;
        border-bottom: 8px solid #fff;
        background: #E0F0CA;
    }
    .foot-count{
        width: 1200px;
        margin: 0 auto;
        margin-bottom: 50px;
    .footer-foot{
        text-align: center;
        line-height: 50px;
        color: #2c2c2c;
        display: flex;
        justify-content: center;
        margin-top: 3%;
        .button{
            font-size: 14px;
            color: #2c2c2c;
            .el-button--text{
                font-size: 14px;
                color: #2c2c2c;
            }
        }
        .span1{
            padding-left: 28px;
        }
        .span2{
             padding-left: 60px;
        }
    }
    .footer-foot2{
        text-align: center;
        color: #2c2c2c;
        .span3{
            padding-left: 60px;
        }
    }
}
}
</style>