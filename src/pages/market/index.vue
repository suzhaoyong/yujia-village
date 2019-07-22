<template>
  <div>
    <div class="market">
      <div class="market_news">
        <div class="market_news-title">
          <div class="market_news-title_main">
            新品推荐
          </div>
          <div class="market_news-title_tips">Sometimes beauty is so simple</div>
        </div>
        <div class="market_news-content">
          <div class="market_news-content_box">
            <div class="market_news-content_box-lf">
              <div class="goods_img"></div>
              <div class="goods_info">
                <div class="goods_info-title">爱暇步夏季新款瑜伽服女套装 拷贝</div>
                <div class="goods_info-tips">年輕時尚，柔软舒适 拷贝 5</div>
                <div class="goods_info-price">￥210</div>
                <div class="goods_info-tags">新款来袭</div>
                <div class="goods_info-time">2019.05.20发售</div>
                <div class="goods_info-logo">yoga</div>
              </div>
            </div>
            <div class="market_news-content_box-rh">
              <div class="goods_subimg"></div>
              <div class="goods_subimg"></div>
              <div class="goods_buy-btn">立即购买</div>
            </div>
          </div>
        </div>
      </div>
      <div class="market_time">
        <div class="market_time-title">
          <div class="market_time-title_main">
            新品推荐
          </div>
          <div class="market_time-title_tips">Sometimes beauty is so simple</div>
        </div>
        <div class="market_time-content">
          <div class="market_time-content_box">
            <div class="prev_btn-box">
              <div class="prev_btn">prev</div>
            </div>
            <div class="goods_list">
              <div class="goods" v-for="(item,index) in 3" :key="index">
                <div class="goods-title">
                  暴走的萝莉 中强度运动内衣女聚拢瑜伽背心                   美背防震跑步健身bra
                </div>
                <div class="goods-price">
                  <div class="goods-price-old">￥210</div>
                  <div class="goods-price-new">￥410</div>
                </div>
                
                <div class="goods-img">
                  <div class="add-shop-btn">
                    加入购物车
                  </div>
                </div>
              </div>
            </div>
            <div class="next_btn-box">
              <div class="next_btn">next</div>
            </div>
          </div>
        </div>
      </div>
      <div class="market_often">
        <div class="market_often-title">
          <div class="market_often-title_main">
            新品推荐
          </div>
          <div class="market_often-title_tips">Sometimes beauty is so simple</div>
        </div>
        <div class="market_often-content">
          <div class="market_often-content_box">
            <div class="menu">
              <div class="menu-item" v-for="(item, index) in 3" :key="index">
                <div class="menu-title-en">Yogo</div>
                <div class="menu-title-zh">瑜伽</div>
              </div>
            </div>
            <div class="bg-img">
              <div class="img"></div>
              <div class="info">
                <div class="title">爱暇步夏季新款瑜伽服女套装</div>
                <div class="subtitle">年輕時尚，柔软舒适 拷贝 4</div>
                <div class="price">
                  <div class="price-old">￥75.00 拷贝 4</div>
                  <div class="price-new">￥55.00 拷贝 4</div>
                </div>
              </div>
            </div>
            <div class="sm-img">
              <div class="item" v-for="(item, index) in 4" :key="index">
                <div class="img"></div>
                <div class="info">
                  <div class="title">爱暇步夏季新款瑜伽服女套装</div>
                  <div class="subtitle">年輕時尚，柔软舒适 拷贝 4</div>
                  <div class="price">
                    <div class="price-old">￥75.00 拷贝 4</div>
                    <div class="price-new">￥55.00 拷贝 4</div>
                  </div> 
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="market_often-btn">
          <div class="goods-detail-btn">
            商品详细分类
          </div>
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
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.market{
  width: 100%;
  &_news{
    &-title{
      text-align: center;
      &_mian{

      }
      &_tips{

      }
    }
    &-content{
      width: 100%;
      &_box{
        height: 40rem;
        width: 60rem;
        margin: 0 auto;
        display: flex;
        border: 1px solid #ccc;
        &-lf{
          position: relative;
          padding-bottom: 1rem;
          flex-grow: 1;
          .goods_img{
            width: 19rem;
            height: 100%;
            border: 1px solid #ccc;
          }
          .goods_info{
            position: absolute;
            top: 4rem;
            right: 0;
            width: 20rem;
            height: 23rem;
            display: flex;
            flex-direction: column;
            background: #fff;
            border: 1px solid #ccc;
            border-top: 1.75rem solid #7D7D7D;
            border-bottom: 1.75rem solid #7D7D7D;
            border-left: 1.4rem solid #7D7D7D;
            border-right: 1.4rem solid #7D7D7D;
            padding: 1.15rem;
            &-title{

            }
            &-tips{

            }
            &-price{
              align-self: flex-end;
              padding: 2rem 3rem 1rem 1rem;
              border:1px solid #313131;
              margin-right: -1.95rem;
            }
            &-tags{

            }
            &-time{

            }
            &-logo{
              align-self: flex-end;
            }
          }
        }
        &-rh{
          width: 22rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          .goods_subimg{
            &:nth-child(1){
              width: 21rem;
              height: 19rem;
              border:1px solid #ccc;
              align-self: flex-end;
            }
            &:nth-child(2){
              margin-top: 1rem;
              width: 16rem;
              height: 15rem;
              border:1px solid red;
              align-self: flex-end;
            }
          }
          .goods_buy-btn{
            margin-top: 1rem;
            margin-right: 2rem;
            align-self: flex-end;
            padding: 1rem 2rem;
            border:1px solid #ccc;
          }
        }
      }
    }
  }
  &_time{
    &-title{
      text-align: center;
      &_main{

      }
      &_tips{

      }
    }
    &-content{
      &_box{
        display: flex;
        justify-content: space-around;
        .prev_btn-box{
          border:1px solid #ccc;
          width: 10rem;
          // margin-left: -10rem;
            // transform: skewx(10deg) translatex(150px);
            // transform-origin: bottom left;
          .prev_btn{

          }
        }
        .next_btn-box{
          border:1px solid #ccc;
          width: 10rem;
            // transform: skewx(10deg) translatex(150px);
            // transform-origin: bottom left;
          .next_btn{
          }
        }
        .goods_list{
          display: flex;
          // margin-left: -8rem;
          height: 34.65rem;
          .goods{
            width: 15rem;
            height: 100%;
            // transform: skewx(10deg) translatex(150px);
            // transform-origin: bottom left;
            margin: 0 1rem;
            border:1px solid #ccc;
            &-title{

            }
            &-price{
              &-old{

              }
              &-new{

              }
            }
            &-img{
              height: 26.55rem;
              border:1px solid #ccc;
              .add-shop-btn{

              }
            }

          }
        }
      }
    }
  }
  &_often{
    &-title{
      text-align: center;
      &_main{

      }
      &_tips{

      }
    }
    &-content{
      &_box{
        width: 60rem;
        margin: 0 auto;
        display: flex;
        .menu{
          flex-shrink: 0;
          &-item{
            width: 9.85rem;
            border:1px solid #ccc;
            padding: 10px;
            .menu-title-en{
              position: relative;
              color: red;
              margin-left: 10px;
              &::before{
                content: '';
                display: block;
                position: absolute;
                top: 0;
                left: -10px;
                border: 0.5rem solid transparent;
                border-left-color:#313131;
                // border-top-color: #313131;

              }
            }
            .menu-title-zh{
              margin-left: 10px;
            }
          }
        }
        .bg-img{
          flex-shrink: 0;
          width: 21.6rem;
          height: 29.15rem;
          margin-left: 3rem;
          margin-right: 1.8rem;
          border:1px solid #ccc;
          .img{

          }
          .info{
            .title{

            }
            .subtitle{

            }
            .price{
              &-old{

              }
              &-new{

              }
            }
          }
        }
        .sm-img{
          display: flex;
          flex-wrap: wrap;
          .item{
            &:nth-of-type(1){
              margin-right: 2.85rem;
            }
            &:nth-of-type(3){
              margin-right: 2.85rem;
              align-self: flex-end;
            }
            &:nth-of-type(4){
              align-self: flex-end;
            }
            flex-shrink: 0;
            width: 9.8rem;
            height: 14rem;
            border:1px solid #ccc;
            .img{
            }
            .info{
              .title{

              }
              .subtitle{

              }
              .price{
                &-old{

                }
                &-new{

                }
              }
            }
          }
        }
        
      }
    }
    &-btn{
      margin-top: 5rem;
      margin-bottom: 9rem;
      .goods-detail-btn{
        width: 7.85rem;
        margin: 0 auto;
        padding: 0.8rem 0.55rem 0.8rem 1.05rem;
        border:1px solid #ccc;
      }
    }
  }
}
</style>
