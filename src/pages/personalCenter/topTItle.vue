<template>
  <div>
    <div class="top">
      <div class="header">
        <div class="user">
          <!-- <div class="photo"></div> -->
          <div class="name">{{info.user.name}}</div>
        </div>
        <div class="info">
          <div class="balance">
            您的账户可金币用
            <span class="number">{{info.user.money}}</span>
          </div>
          <div class="recharge" @click="changMoney">充值</div>
          <div class="withdraw" @click="withdraw">
            <!-- 提现 -->
            <span class="identity" v-if="info.user.reason === '未认证'">未认证</span>
            <span class="identity" v-else @click.stop="goPage('identity')">(馆主、教练)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      user: {}
    };
  },
  computed: {
    ...mapGetters(["info"]),
  },
  mounted() {
    // this.getPersonal();
  },
  methods: {
    getPersonal() {
      this.$request("/personal/home").then(data => {
        this.user = data.user;
        store.dispatch("INFO", data);
      });
    },
    goPage(name) {
      this.$router.push(`/personal/${name}`);
    },
    changMoney() {
      this.$router.push({
        name: "identity",
        query: {
          type: "my-card"
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
.top {
  box-shadow: 0rem 0.05rem 0.1rem #ccc;
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
      background: #000;
      color: #fff;
    }
    .name {
      padding-left: 0.5rem;
    }
  }
  .info {
    display: flex;
    color: #2c2c2c;
    .balance {
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
