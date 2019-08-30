<template>
  <div>
    <div class="my_order">
      <div class="o_title">我的订单</div>
      <div class="my_body">
        <div class="tags">
          <div class="tag">全部订单</div>
          <div class="tag">待付款</div>
          <div class="tag">待收货</div>
        </div>
        <div class="table">
          <div class="table_header">
            <div class="t_title">订单详情</div>
            <div class="t_title">订单号: 30000</div>
            <div class="t_title">收货人</div>
            <div class="t_title">金额</div>
            <div class="t_title">操作</div>
          </div>
          <div class="table_body">
            <div>
              <div class="goods">
                <div class="info">
                  <div class="img"></div>
                  <div class="g_title">adfx</div>
                  <div class="number">12</div>
                </div>
                <div class="send">aaf</div>
                <div class="g_money">
                  <div class="all">总额：¥355</div>
                  <div style="color: #2c2c2c;">应付</div>
                  <div style="padding-top:0.8rem;color: #2c2c2c;">¥200</div>
                </div>
                <div class="operate">
                  <div class="time">剩余23小时57分钟</div>
                  <div class="pay">付款</div>
                  <div class="cancel">取消订单</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.my_order {
  font-size: 0.7rem;
  color: #2c2c2c;
  width: 60rem;
  margin: 0 auto;
  position: relative;
  .o_title {
    background: rgba(255, 255, 255, 1);
    box-shadow: 1px 1px 9px 1px rgba(92, 92, 92, 0.28);
    height: 4rem;
    line-height: 4rem;
    padding-left: 3rem;
    font-size: 1rem;
    font-weight: border;
  }
  .my_body {
    margin-top: 1.6rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 1px 1px 9px 1px rgba(92, 92, 92, 0.28);
    padding: 0 3rem;
    padding-top: 1rem;
    .tags {
      display: flex;
      .tag {
        cursor: pointer;
        color: #2c2c2c;
        font-weight: bolder;
        margin-right: 1.8rem;
      }
    }
    .table {
      padding-top: 2rem;
      padding-bottom: 4rem;
      .table_header {
        color: #999999;
        display: flex;
        height: 3rem;
        line-height: 3rem;
        background: #eee;
        .t_title {
          position: relative;
          &:nth-child(1) {
            padding-left: 2rem;
            width: 10rem;
          }
          &:nth-child(2) {
            width: 15rem;
          }
          &:nth-child(3) {
            width: 10rem;
            text-align: center;
          }
          &:nth-child(4) {
            width: 10rem;
            text-align: center;
          }
          &:nth-child(5) {
            width: 10rem;
            text-align: center;
          }
        }
      }
      .table_body {
        .goods {
          display: flex;
          border: 1px solid #eee;
          padding-top: 1.45rem;
          padding-left: 1rem;
          padding-bottom: 3rem;
          color: #999999;
          .info {
            display: flex;
            width: 25rem;
            position: relative;
            .img {
              width: 3.5rem;
              height: 3.5rem;
              flex-shrink: 0;
              background: #ccc;
            }
            .g_title {
              color: #2c2c2c;
              font-size: 0.8rem;
              font-weight: bolder;
              padding-left: 1.2rem;
            }
            .number {
              position: absolute;
              right: 3rem;
            }
          }
          .send {
            width: 10rem;
            text-align: center;
          }
          .g_money {
            width: 10rem;
            text-align: center;
            .all {
              padding-bottom: 0.8rem;
            }
          }
          .operate {
            width: 10rem;
            text-align: center;
            time {
            }
            .pay {
              cursor: pointer;
              padding-top: 0.8rem;
            }
            .cancel {
              padding-top: 0.8rem;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>