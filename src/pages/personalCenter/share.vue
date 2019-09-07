<template>
  <div>
    <div class="share" style="position:relative;">
      <cloud :arr="[1]"></cloud>
      <div class="body">
        <!-- <div class="title">当前已成功邀请 0 位, 0 位好友充值，0位好友消费，您可获得 0 积分</div> -->
        <div class="content">
          <session-title name="邀请好友"></session-title>
          <div class="cards">
            <div class="link">
              <span>
                瑜伽村官网
                <a>http://vue.aomengyujia.com</a>
              </span>
              <span>分享到</span>
            </div>
            <div class="media">
              <share :config="config"></share>
            </div>
            <div class="send">
              当前已成功邀请
              <span style="color:#5EB131;">{{listData.length}} 位</span>
            </div>
            <div class="member">
              <vue-seamless :data="listData" :class-option="optionSingleHeight" class="warp">
                <ul class="item">
                  <li v-for="item in listData">
                    <span class="name">{{item.name}}</span>
                    <span class="num">{{tel(item.tel)}}</span>
                    <span class="date">{{item.created_at}}</span>
                  </li>
                </ul>
              </vue-seamless>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SessionTitle from "./SessionTitle";
import vueSeamless from "vue-seamless-scroll";
import { mapGetters } from "vuex";
import Cloud from "./cloud";
import { getMyShare } from "@/api/personal.js";
// import socialShare from 'social-share.js'
export default {
  components: {
    Cloud,
    vueSeamless
  },
  data() {
    return {
      config: {
        url: "http://vue.aomengyujia.com/wap/index.html",
        source: "",
        title: "",
        description: "",
        sites: ["qzone", "qq", "weibo", "wechat", "douban"],
        wechatQrcodeTitle: "微信扫一扫：分享", // 微信二维码提示文字
        wechatQrcodeHelper:
          "<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>"
      },
      listData: [
      ]
    };
  },
  computed: {
    ...mapGetters(["info"]),
    optionSingleHeight() {
      return {
        singleHeight: 30
      };
    },
    tel() {
      return tel => `${tel.substr(0, 3)}****${tel.substr(7, 11)}`;
    }
  },
  created() {
    this.initSocialConfig();
  },
  mounted() {
    getMyShare().then(data => {
      this.listData = data
    });
  },
  methods: {
    initSocialConfig() {
      if (this.info.user.name) {
        const params = {
          url: `http://vue.aomengyujia.com/wap/index.html?invitation_id=${this.info.user.id}`,
          title: `瑜伽村`,
          description: `欢迎加盟`,
          source: "http://vue.aomengyujia.com",
          image: "http://vue.aomengyujia.com/static/favicon.ico"
        };
        this.config = Object.assign({}, this.config, params);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.item {
  li {
    color: #999999;
    padding: 0.4rem 0;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    .name {
    }
    .num {
    }
    .date {
    }
  }
}

.member {
  padding-top: 3rem;
  overflow: hidden;
  width: 15rem;
  height: 10rem;
  margin: 0 auto;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.body {
  font-size: 0.7rem;
  color: #2c2c2c;
  width: 60rem;
  margin: 0 auto;
  padding-bottom: 8rem;
  .title {
    text-align: center;
  }
  .content {
    margin-top: 4rem;
    padding: 1rem 0;
    box-shadow: 0.1rem 0 0.35rem rgba(36, 36, 36, 0.2);
    position: relative;
    overflow: hidden;
    &::before {
      content: "";
      position: absolute;
      width: 102%;
      height: 50%;
      top: 0;
      z-index: -2;
      background-image: url("../../assets/personal/share.png");
      background-size: 100% 100%;
    }
    .cards {
      width: 40rem;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      // padding-top: 1.65rem;
      padding-bottom: 1.4rem;
      .link {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        span {
        }
      }
      .media {
        margin-top: 1.4rem;
        display: flex;
        justify-content: center;
        .item {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          background: #ccc;
          margin-right: 0.95rem;
        }
      }
      .send {
        padding-top: 3rem;
        padding-bottom: 3rem;
        text-align: center;
      }
    }
  }
}
</style>

