<template>
  <div>
    <div class="top">
      <div class="header">
        <div class="user">
          <div class="photo">
            <img :src="identity" alt />
          </div>
          <div class="name">{{info.user.name}}</div>
          <span class="identity" @click="withdraw" v-if="info.user.identity_auth == 1">未认证</span>
          <span class="identity" v-if="info.user.identity_auth == 3">已认证（馆主）</span>
          <span class="identity" v-if="info.user.identity_auth == 5">已认证（教练）</span>
          <span class="identity" v-if="info.user.identity_auth == 6">未通过认证</span>
          <span class="identity" v-if="info.user.identity_auth == 8">已认证（馆主、教练）</span>
        </div>
        <div class="info">
          <div class="balance" @click="viewHistory('glod')">
            金币可用
            <span class="number">{{info.user.money}}</span>
          </div>
          <div class="recharge" @click="changMoney">充值</div>
          <div class="recharge" @click="viewHistory('score')">积分</div>
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
        1: identity_y,
        3: identity_g,
        5: identity_j,
        8: identity_gj
      };
      return obj[this.info.user.identity_auth];
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
