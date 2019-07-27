<template>
  <div>
    <div class="car">
      <div class="header">
        <div class="title">
          <div class="title-zh">购物车</div>
          <div class="title-en">The customer's excellent experience is our goal from beginning </div>
        </div>
      </div>
      <div class="body">
        <div class="goods-box">
          <div class="goods">
            <div class="info">
              <div class="select"></div>
              <div class="img"></div>
              <div class="name-size">
                <div class="name">暴走的萝莉 中强度运动内衣女聚拢瑜伽背心美背防震跑步健身bra</div>
                <div class="color-size">
                  <div class="color">颜色：粉色</div>
                  <div class="size">尺码: M码</div>
                </div>
              </div>
            </div>
            <div class="number">
              <div class="reduce">-</div>
              <div class="num">3</div>
              <div class="add">+</div>
            </div>
            <div class="price">
              <div class="old-price">￥85</div>
              <div class="new-price">￥55</div>
            </div>
            <div class="ops">
              <div class="add">放入收藏夹</div>
              <div class="delete">删除</div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="op">
          <div class="all">全选</div>
          <div class="delete">删除</div>
          <div class="add">移入收藏夹</div>
          <div class="share">分享</div>
        </div>
        <div class="count"><span class="num">已选商品 2 件</span><span class="title">应付金额</span><span class="tips">(不含运费)</span> <span class="price">¥115</span></div>
        <div class="sumbit">去结算</div>
      </div>
    </div>    
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
*{border:0; margin:0; box-sizing: border-box;}
.car{
  .header{
    display: flex;
    justify-content: center;
    align-items: center;
    .title{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &-zh{}
      &-en{}
    }
  }
  .body{
    width: 60rem;
    margin: 0 auto;
    .goods-box{
      .goods{
        border:1px solid #ccc;
        display: flex;
        margin-bottom: 0.95rem;
        .info{
          display: flex;
          flex-basis: 50%;
          flex-shrink: 0;
          align-items: center;
          .select{
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            background: #eee;
          }
          .img{
            width: 7rem;
            height: 8.3rem;
            background: #ccc;
          }
          .name-size{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
            .name{ 
            }
            .color-size{
              .color{}
              .size{}
            }
          }
        }
        .number{
          display: flex;
          align-items: center;
          flex-basis: 15%;
          flex-shrink: 0;
          .reduce{}
          .num{}
          .add{}
        }
        .price{
          display: flex;
          align-items: center;
          flex-basis: 20%;
          flex-shrink: 0;
          .old-price{}
          .new-price{}
        }
        .ops{
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex-basis: 15%;
          flex-shrink: 0;
          .add{}
          .delete{}
        }
      }
    }
  }
  .footer{
    width: 60rem;
    height: 2.75rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    position: relative;
    .op{
      display: flex;
      .all{}
      .delete{
        padding-left: 1.5rem;
      }
      .add{
        padding-left: 1.5rem;
      }
      .share{
        padding-left: 1.5rem;
      }
    }
    .count{
      position: absolute;
      right: 10rem;
      top: 50%;
      transform: translateY(-50%);
      .num{
        padding-right: 1rem;
      }
      .title{}
      .tips{}
      .price{}
    }
    .sumbit{
      display: flex;
      align-items: center;
      background: #FF4400;
      color:#fff;
      padding:0 1.85rem;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}
</style>
