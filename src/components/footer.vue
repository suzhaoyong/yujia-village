<template>
    <div>
        <el-col :span="24">
            <div class="footer-main">
                <div class="footer-center"></div>
                <div class="footer-foot">
                    <span>关于我们</span>
                    <span class="span">商务合作</span>
                    <span class="span2">客服电话：021-621146321(周一至周六 9:30-18:00)</span>
                </div>
                <div class="footer-foot2">
                    <span>Copyright © 2017-2022 上海一伽健身服务有限公司 All rights reserved</span>
                    <span class="span3">沪ICP备16052417号-1</span>
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
  }
};
</script>
<style lang="scss" scoped>
.footer-main{
    width: 100%;
    height: 188px;
    padding: 0;
    background: #CAE6AB;
    .footer-center{
        height: 20px;
        border-bottom: 8px solid #fff;
        background: #E0F0CA;
    }
    .footer-foot{
        text-align: center;
        padding-top: 43px;
        line-height: 45px;
        color: #2c2c2c;
        .span{
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
</style>