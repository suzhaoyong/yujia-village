<template>
  <div>
    <div class="order-box">
      <div class="navs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="order">
        <div class="title">
          <div class="title-zh">热门课程</div>
          <div class="title-en">synscj</div>
        </div>
        <div class="take-delivery">
          <div class="delivery">
            <div class="header">
              <div class="title">收货信息</div>
              <div class="tips">如下信息</div>
            </div>
            <div class="body">
              <div class="personal">
                <div class="icon-name">
                  <div class="icon"></div>
                  <div class="name"></div>
                </div>
                <div class="name-phone">
                  xiang - 123123123
                </div>
                <div class="address">
                  12312
                </div>
                <div class="currently-deliviery">
                  使用当前地址
                </div>
              </div>
              <div class="new-deliviery">
                <div class="form">
                <div class="item">
                  <div class="key">收货人</div>
                  <div class="value"><input type="text"></div>
                </div>
                <div class="item">
                  <div class="key">收货人</div>
                  <div class="value"><input type="text"></div>
                </div>
                <div class="item">
                  <div class="key">收货人</div>
                  <div class="value"><input type="text"></div>
                </div>
                <div class="item">
                  <div class="key">收货人</div>
                  <div class="value"><input type="text"></div>
                </div>
                <div class="item">
                  <div class="key">收货人</div>
                  <div class="value"><input type="text"></div>
                </div>
                </div>
                <div class="new-deliviery-address">使用新地址</div>
              </div>
            </div>
          </div>
          <div class="time-pay">
            <div class="time">
              <div class="header">
                <div class="title">送货时间</div>
                <div class="tips">asdfa </div>
              </div>
              <div class="select">
                <div class="item">送货时间不限</div>
                <div class="item">送货时间不限</div>
                <div class="item">送货时间不限</div>
              </div>
            </div>
            <div class="pay">
              <div class="header">
                <div class="title">支付方式</div>
                <div class="tips">asdfa </div>
              </div>
              <div class="icon-box">
                <div class="icon"></div>
                <div class="icon"></div>
                <div class="icon"></div>
              </div>

            </div>
          </div>
        </div>
        <div class="goods">
          <div class="header">
            <div class="item">商品信息</div>
            <div class="item">商品信息</div>
            <div class="item">商品信息</div>
          </div>
          <div class="body">
            <div class="goods">
              <div class="info"></div>
              <div class="specifications"></div>
              <div class="price-number"></div>
            </div>
          </div>
        </div>
        <div class="sum">
          <div class="back-shopcat">返回购物车</div>
          <div class="count"><span>应付金额</span><span class="tips">(不含运费)</span> <div class="price">¥115</div></div>
          <div class="sumbit">提交订单</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
*{box-sizing: border-box;margin: 0;padding: 0;}
.order-box{
  width: 60rem;
  margin: 0 auto;
  .navs{}
  .order{
    .title{
      display: flex;
      flex-direction: column;
      align-items: center;
      &-zh{}
      &-en{}
    }
    .take-delivery{
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.75rem;
      .delivery{
        width: 44rem;
        height: 23.85rem;
        border:1px solid #ccc;
        .header{
          display: flex;
          flex-direction: column;
          align-items: center;
          .title{ 
          }
          .tips{}
        }
        .body{
          display: flex;
          .personal{
            flex-shrink: 0;
            flex-basis: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .icon-name{
              padding-bottom: 4.3rem;
              .icon{
                width: 4.25rem;
                height: 4.25rem;
                background: #ccc;
                border-radius: 50%;
              }
              .name{
                padding-top: 1rem;
              }
            }
            .name-phone{
              width: 100%;
              padding-left: 3.5rem;
            }
            .address{
              width: 100%;
              padding-left: 3.5rem;
              padding-bottom: 1.6rem;
            }
            .currently-deliviery{
              width: 100%;
              padding-left: 3.5rem;
            }
          }
          .new-deliviery{
            flex-shrink: 0;
            flex-basis: 50%;
            .form{
              padding-bottom: 1.75rem;
              .item{
                display: flex;
                padding: 0.4rem 0;
                .key{
                  width: 6rem;
                  text-align: right;
                  padding-right: 1rem;
                }
                .value{}
              }
            }
            &-address{
            }
          }
        }
      }
      .time-pay{
        width: 12.6rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .time{
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          border:1px solid #ccc;
          .header{
            padding: 1rem 0;
            .title{
              padding-bottom: 0.55rem;
            }
            .tips{}
          }
          .select{
            .item{
              padding: 1rem 0;
            }
          }
        }
        .pay{
          width: 100%;
          padding-top: 1rem;
          padding-bottom: 0.8rem;
          border:1px solid #ccc;
          .header{
            display: flex;
            flex-direction: column;
            align-items: center;
            .title{ 
            }
            .tips{
            }
          }
          .icon-box{
            display: flex;
            justify-content: center;
            .icon{
              width: 1.45rem;
              height: 1.45rem;
              margin: 0 0.4rem;
              border:1px solid #ccc;
            }
          }
        }
      }
    }
    .goods{
      border: 1px solid #ccc;
      .header{
        display: flex;
        align-items: center;
        height: 3.7rem;
        border:1px solid #dcdcdc;
        .item{
          &:nth-child(1){
            flex-basis: 60%;
          }
          &:nth-child(2){
            flex-basis: 20%;
          }
          &:nth-child(3){
            flex-basis: 20%;
          }
        }
      }
      .body{
        .goods{
          display: flex;
          height: 10rem;
          .info{
            flex-basis: 60%;
          }
          .specifications{
            flex-basis: 20%;
          }
          .price-number{
            flex-basis: 20%;
          }
        }
      }
    }
    .sum{
      margin: 1.3rem 0;
      border:1px solid #ccc;
      display: flex;
      align-items: center;
      height: 3rem;
      position: relative;
      .back-shopcat{}
      .count{
        display: flex;
        position: absolute;
        top: 0;
        right: 9rem;
        height: 100%;
        span{
        display: flex;
        justify-content: center;
        align-items: center;
        }
        .tips{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
          
        }
        .price{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        }
      }
      .sumbit{
        position: absolute;
        top: 0;
        right: 0;
        width: 7rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color:#fff;
        background: #ff4400;
        height: 100%;
      }
    }
  }
}

</style>
