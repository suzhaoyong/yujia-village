<template>
  <div>
    <div class="top">
      <div class="header">
        <div class="user">
          <div class="photo">
            <img :src="identity" alt />
          </div>
          <div class="name">{{info.user.name}}</div>
          <span class="identity" style="cursor: pointer;" @click="withdraw" v-if="info.user.identity_auth == '未认证'">未认证</span>
          <span class="identity" v-else>{{info.user.identity_auth}}</span>
          <span class="class_release" @click="goPage('release')" v-if="hasPower">课程发布</span>
        </div>
        <div class="info">
          <!-- <div class="balance" @click="viewHistory('glod')">
            金币可用
            <span class="number">{{info.user.money}}</span>
          </div> -->
          <!-- <div class="recharge" @click="changMoney">充值</div> -->
          <div class="recharge" @click="viewHistory('score')">积分：{{info.user.fraction}}</div>
          <div class="withdraw">
            <!-- 提现 -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import { mapGetters } from "vuex";
import identity_g from "@/assets/order/identity_g.png";
import identity_j from "@/assets/order/identity_j.png";
import identity_gj from "@/assets/order/identity_gj.png";
import identity_y from "@/assets/order/identity_y.png";
export default {
  data() {
    return {
      icon: {
        identity_g,
        identity_j,
        identity_gj,
        identity_y
      }
    };
  },
  computed: {
    ...mapGetters(["info"]),
    identity() {
      const obj = {
        '未认证': identity_y,
        '认证机构负责人': identity_g,
        '认证教练': identity_j,
        '认证导师': identity_gj
      };
      return obj[this.info.user.identity_auth];
    },
    hasPower() {
      const obj = {
        '认证机构负责人': true,
        '认证教练': false,
        '认证导师': true
      }
      return obj[this.info.user.identity_auth]
    }
  },
  mounted() {
    // this.getPersonal();
  },
  methods: {
    getPersonal() {
      this.$request("/personal/home").then(data => {
        store.dispatch("INFO", data);
      });
    },
    goPage(name) {
      this.$router.push(`/personal/${name}`);
    },
    viewHistory(type) {
      this.$router.push({
        name: "useHistory",
        params: {
          type: type
        }
      });
    },
    changMoney() {
      this.$router.push({
        name: "identity",
        query: {
          type: "recharge"
        }
      });
    },
    withdraw() {
      this.$router.push({
        name: "identity",
        query: {
          type: "identity"
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
img {
  width: 100%;
  height: 100%;
}
.top {
  box-shadow: 0.1rem 0.3rem 1rem #ccc;
}
.header {
  width: 60rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.15rem;
  .user {
    display: flex;
    .photo {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      color: #fff;
    }
    .name {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
    span{
      color: #aaa;
    }
    .class_release{
      margin-left: 10px;
      color: #5B905E;
      cursor: pointer;
    }
  }
  .info {
    display: flex;
    color: #2c2c2c;
    .balance {
      cursor: pointer;
      .number {
        font-weight: 800;
      }
      padding-right: 3rem;
    }
    .recharge {
      padding-right: 1rem;
      cursor: pointer;
    }
    .withdraw {
      cursor: pointer;
      .identity {
        
        color: #999;
      }
    }
  }
}
</style>
