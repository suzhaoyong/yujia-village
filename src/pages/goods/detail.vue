<template>
  <div>
    <div class="goods-box">
      <div class="navs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="goods">
        <div class="info">
          <div class="imgs">
            <div class="bg-img"></div>
            <div class="sm-imgs">
              <div class="sm-img" v-for="(item, index) in 3" :key="index"></div>
            </div>
          </div>
          <div class="details">
            <div class="title">2019春夏新款动力瑜珈裤女紧身弹力显瘦瑜伽服高腰运动健身服</div>
            <div class="price">吊牌价：￥55</div>
            <div class="preferential">
              优惠折扣：
            </div>
            <div class="colors">
              颜色:
              <div class="color" v-for="(item, index) in 3" :key="index">
                <div class="img"></div>
                <div class="color-name">黛蓝色</div>
              </div>
            </div>
            <div class="size">
              尺码
              <div class="size-list">
                <div class="item">M</div>
                <div class="item">L</div>
                <div class="item">XL</div>
              </div>
            </div>
            <div class="number">
              数量
              <div class="op">
                <div class="reduce">-</div>
                <div class="num">3</div>
                <div class="add">+</div>
              </div>
            </div>
            <div class="op-btn">
              <div class="add-shop">
                加入购物车
              </div>
              <div class="collect-goods">
                收藏商品
              </div>
            </div>
            <div class="tips">
              温馨提示：如果
            </div>
          </div>
        </div>
        <!-- 产品参数 -->
        <div class="params">
          <div class="title">产品参数</div>
          <div class="content">
            <div class="item" v-for="(item, index) in 3" :key="index">
              <div class="key">商品名称</div>
              <div class="value">2019238</div>
            </div>
          </div>
        </div>
        <!-- 底部说明 -->
        <div class="explain">
          <div class="title">
            <div class="title-zh">热门课程</div>
            <div class="title-en">synscj</div>
          </div>
          <div class="content">
            所有即使沙发
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

    }
  },
  mounted() {
    console.log(1)
  }
}
</script>
<style lang="scss" scoped>
  .goods-box{
    width: 60rem;
    margin: 0 auto;
    .navs{

    }
    .goods{
      .info{
        display: flex;
        .imgs{
          display: flex;
          .bg-img{
            width: 23.45rem;
            height: 23rem;
            border:1px solid #ccc;
          }
          .sm-imgs{
            margin-left: 0.5rem;
            margin-right: 2.35rem;
            .sm-img{
              width: 3.45rem;
              height: 4rem;
              margin-bottom: 0.75rem;
              &:last-child{
                margin-bottom: 0;
              }
              border:1px solid #ccc;
            }
          }
        }
        .details{
          .title{
            margin-bottom: 2rem;
          }
          .price{
            margin-bottom: 1.2rem;
          }
          .preferential{}
          .colors{
            margin-top: 2rem;
            display: flex;
            align-items: flex-end;
            .color{
              display: flex;
              align-items: flex-end;
              .img{
                width: 1.75rem;
                height: 2rem;
                border:1px solid #ccc;
              }
              .color-name{}
            }
          }
          .size{
            display: flex;
            .size-list{
              display: flex;
              .item{
                width: 2rem;
              }
            }
          }
          .number{
            display: flex;
            .op{
              display: flex;
              .reduce{
                width: 3rem;
                height: 1.55rem;
                display: flex;
                justify-content: center;
                align-items: center;
                border:1px solid #dcdcdc;
              }
              .num{
                width: 3rem;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .add{
                width: 3rem;
                height: 1.55rem;
                display: flex;
                justify-content: center;
                align-items: center;
                border:1px solid #dcdcdc;
              }
            }
          }
          .op-btn{
            display: flex;
            .add-shop{
              width: 6.3rem;
              height: 2.65rem;
              background: #cce198;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-right: 1.5rem;
            }
            .collect-goods{
              width: 6.3rem;
              height: 2.65rem;
              background: #cce198;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
          .tips{
            color:#999;
            font-size: 0.6rem;
          }

        }
      }
      .params{
        width: 100%;
        border:1px solid #bfbfbf;
        .title{
          height: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
          border-bottom: 1px solid #bfbfbf;
        }
        .content{
          display: flex;
          flex-wrap: wrap;
          padding: 0.8rem 0;
          .item{
            flex-basis: 50%;
            display: flex;
            padding: 0.8rem 0;
            .key{
              width: 8rem;
              text-align: right;
            }
            .value{}
          }
        }
      }
      .explain{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding:5rem 0;
        position: relative;
        .title{
          position: relative;
          &::before, &::after{
            content:'';
            width: 13rem;
            height: 1px;
            background: #dcdcdc;
            position: absolute;
          }
          &::before{
            top: 50%;
            right: 140%;
            transform: translateY(-50%);
          }
          &::after{
            top: 50%;
            left: 140%;
            transform: translateY(-50%);
          }
          .title-zh{}
          .title-en{}
        }
        .content{
          padding: 4rem;
        }
      }
    }
  }
</style>
