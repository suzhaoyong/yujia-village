<template>
  <div>
    <div class="share">
      <session-title name="邀请好友"></session-title>
      <div class="body">
        <div class="title">当前已成功邀请 0 位, 0 位好友充值，0位好友消费，您可获得 0 积分</div>
        <div class="content">
          <div class="card">
            <div class="link">
              <span>
                瑜伽村官网
                <a>http://www.yujiacun.net/index.html</a>
              </span>
              <span>分享到</span>
            </div>
            <div class="media">
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SessionTitle from "./SessionTitle";
export default {
  components: {
    SessionTitle
  }
};
</script>
<style lang="scss" scoped>
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
    .card {
      box-shadow: 0.1rem 0 0.35rem rgba(36, 36, 36, 0.2);
      width: 40rem;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      padding-top: 1.65rem;
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
    }
  }
}
</style>

