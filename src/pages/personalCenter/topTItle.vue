<template>
  <div>
    <div class="top">
      <div class="header">
        <div class="user">
          <div class="photo"></div>
          <div class="name">{{info.user.name}}</div>
        </div>
        <div class="info">
          <div class="balance">
            您的账户可用余额为
            <span class="number">¥{{info.user.money}}</span>
          </div>
          <div class="recharge">充值</div>
          <div class="withdraw" @click="withdraw">
            提现
            <span
              class="identity"
              v-if="info.user.reason === '未认证'"
              @click.stop="goPage('identity')"
            >未认证</span>
            <span class="identity" v-else>(馆主、教练)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {}
    };
  },
  computed: {
    info() {
      const user = sessionStorage.getItem("user");
      return user && JSON.parse(user);
    }
  },
  methods: {
    getPersonal() {
      this.$request("/personal/home").then(data => {
        this.user = data.user;
      });
    },
    goPage(name) {
      this.$router.push(`/personal/${name}`);
    },
    withdraw() {
      this.$router.push("/personal/certification");
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
