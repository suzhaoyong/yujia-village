<template>
    <div>
        <el-col :span="24">
            <div class="yogoknowledgedetails-main">
                <div class="yogoknowledgedetails-cont-div1">
                    <h3>{{knowinfo.headline}}</h3>
                    <div class="yogoknow">
                        <span class="span1">{{knowinfo.updated_at}}</span>
                        <img class="img2" src="../assets/eye.png"/>
                        <span class="span2">{{knowinfo.views}}</span>
                        <img class="img3" src="../assets/market/like.png"/>
                        <span class="span3">{{knowinfo.classify}}</span>
                        <span class="span4">关键字：{{knowinfo.keyword}}</span>
                    </div>
                </div>
                <div class="yogoknowledgedetails-cont-div2">
                    <div class="yogoknow2">
                        <p class="p1">{{knowinfo.summary}}</p>
                    </div>
                    <div class="yogoknow3">
                        <p class="p2" v-html="knowinfo.content">{{knowinfo.content}}</p>
                    </div>
                </div>
            </div>
        </el-col>
    </div>
</template>
<script>
export default {
    inject: ["reload"],
  data() {
    return {
        knowinfo:'',
    };
  },
  created(){
      this.listdatadetails();
  },
  methods:{
      listdatadetails(){
        let _this = this;
        this.$request(`/knowledgeInfo/${_this.$route.query.id}`).then(res => {
            _this.knowinfo = res;
        })
        .catch(error => {
            let { response: { data: { errorCode, msg } } } = error;
            if (errorCode != 0) {
            this.$message({
                message: msg,
                type: "error"
            });
            return;
            }
        });
      },
  }
};
</script>
<style lang="scss" scoped>
.yogoknowledgedetails-main{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    background-color: #ECECEC;
    .yogoknowledgedetails-cont-div1{
        width: 1200px;
        height: 150px;
        margin: 0 auto;
        margin-top: 20px;
        margin-bottom: 20px;
        background-color: #ffffff;
        h3{
            font-family:Microsoft YaHei;
            font-weight:bold;
            font-size: 24px;
            color: #2c2c2c;
            padding-left: 30px;
            padding-top: 30px;
        }
        .yogoknow{
            padding-left: 30px;
            padding-top: 15px;
            .span1{
                font-size: 14px;
            }
            .img2{
                width: 24px;
                height: 22px;
                margin-left: 20px;
            }
            .span2{
                font-size: 14px;
            }
            .img3{
                width: 17px;
                height: 16px;
                margin-left: 20px;
            }
            .span3{
                font-size: 14px;
            }
            .span4{
                font-size: 14px;
                margin-left: 20px;
            }
        }
    }
    .yogoknowledgedetails-cont-div2{
        width: 1200px;
        height: 100%;
        margin: 0 auto;
        margin-bottom: 40px;
        background-color: #ffffff;
        .yogoknow2{
            width: 95%;
            height: auto;
            background-color: #ECECEC;
            margin-top: 20px;
            display: inline-block;
            margin-bottom: 20px;
            margin-left: 30px;
            .p1{
                padding: 15px;
                font-size: 14px;
                line-height: 26px;
            }
        }
        .yogoknow3{
            width: 95%;
            margin: 0 auto;
            .p2{
                font-size: 18px;
                line-height: 37px;
                font-family:Microsoft YaHei;
            }
        }
    }
}
</style>