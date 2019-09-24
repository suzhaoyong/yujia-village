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
                        <span class="span3">{{knowinfo.type}}</span>
                        <span class="span4">关键字：{{knowinfo.keyword}}</span>
                    </div>
                </div>
                <div class="yogoknowledgedetails-cont-div2">
                    <div class="share"  v-if="config.url">
                        <share :config="config"></share>
                    </div>
                    <div class="yogoknow2">
                        <p class="p1">{{knowinfo.summary}}</p>
                    </div>
                    <div class="yogoknow3">
                        <p class="p2" v-html="knowinfo.main_body">{{knowinfo.main_body}}</p>
                    </div>
                </div>
            </div>
        </el-col>
    </div>
</template>
<script>
import { getTrains, postTrains, getTrainsById } from "@/api/trains";
export default {
    inject: ["reload"],
  data() {
    return {
        knowinfo:{},
        config: {
        url: "",
        source: "",
        title: "",
        description: "",
        sites: ["qzone", "qq", "weibo", "wechat", "douban"],
        wechatQrcodeTitle: "微信扫一扫：分享", // 微信二维码提示文字
        wechatQrcodeHelper:
          "<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>"
      },
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
            // const content = res.content.split("\n").filter(item => item);
            // _this.knowinfo.content = content;
        })
        .then(_ => {
          this.initSocialConfig();
        });
      },
      initSocialConfig() {
        const { headline, summary, main_body, icon_url } = this.knowinfo;
        const params = {
            url: `http://www.yujiacun.net/yogoknowledge/yogoknowledgedetails?id=${this.$route.query.id}`,
            title: headline,
            description: `${summary}`,
            image: icon_url
        };
        this.config = Object.assign({}, this.config, params);
        },
    callTel() {
        this.$alert(`客服电话: 400-100-7191`, "客服电话", {});
    }
  }
};
</script>
<style lang="scss" scoped>
.yogoknowledgedetails-main{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    min-height: 1200px;
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
        padding-bottom: 50px;
        background-color: #ffffff;
        .share{
            width: 22%;
            float: left;
            text-align: center;
            margin-top: 20px;
        }
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