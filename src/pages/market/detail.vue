<template>
  <div>
    <div class="market">
      <div class="selected-search">
        <div class="selected"><span>已选</span> <div class="tag">0-150 <i class="close"></i></div></div>
        <div class="search"></div>
      </div>
      <div class="select">
        <div class="price">
          <div class="title">理想价位</div>
          <div class="range">
            <div class="item">不限</div>
            <div class="item">0-150</div>
          </div>
          <div class="more">更多</div>
        </div>
        <div class="kinds"></div>
        <div class="material"></div>
        <div class="use"></div>
        <div class="senior">
          <div class="title">高级选项</div>
          <div class="select-list">
            <div class="select-box">价格</div>
            <div class="select-box">价格</div>
          </div>
        </div>
      </div>
      <div class="goods-list">
        <div class="sort">
          <div class="range">
            <div class="all">综合排序</div>
            <div class="price">价格</div>
            <div class="sale">价格</div>
          </div>
          <div class="tips">温馨提示： 如果选择困难，您可咨询馆内私人教练</div>
        </div>
        <div class="column">
          <div class="goods-box" v-for="(item, index) in 10" :key="index"></div>
        </div>
        <div class="pages"></div>
      </div>
      <div class="last-views">
        <div class="title">
          <div class="title-zh">最近浏览</div>
          <div class="title-en">show me</div>
        </div>
        <div class="goods">
          <div class="goods-box" v-for="(item, index) in 4" :key="index"></div>
        </div>
        <div class="change">
          <div class="change-btn">换一批</div>
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
*{margin:0; padding:0; box-sizing: border-box;}
.market{
  width: 60rem;
  margin: 0 auto;
  .selected-search{
    display: flex;
    justify-content: space-between;
    .selected{
      display: flex;
      span{

      }
      .tag{
        background: #ccc;
        padding: 5px 30px 5px 10px;
        position: relative;
        .close{
          position: absolute;
          right: 0;
          top: 0;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: pink;
        }
      }
    }
    .search{
      width: 200px;
      height: 20px;
      background: #ccc;
    }
  }
  .select{
    .price{
      display: flex;
      position: relative;
      .title{}
      .range{
        display: flex;
        .item{
          margin-left: 10px;
          padding: 0 10px;
        }
      }
      .more{
        position: absolute;
        right: 0;
        top: 0;
      }
    }
    .senior{
      display: flex;
      .title{}
      .select-list{
        display: flex;
        .select-box{
          margin-left: 10px;
        }
      }
    }
  }
  .goods-list{
    .sort{
      display: flex;
      position: relative;
      .range{
        display: flex;
        .all{}
        .price{}
        .sale{}
      }
      .tips{
        position: absolute;
        right: 0;
        top: 0;
      }
    }
    .column{
      display: flex;
      flex-wrap: wrap;
      .goods-box{
        flex-basis: 20%;
        margin: 20px;
        width: 13.5rem;
        height: 19.35rem;
        background: #ccc;
      }
    }
  }
  .pages{
    height: 100px;
    background: #ccc;
  }
  .last-views{
    .title{
      display: flex;
      flex-direction: column;
      align-items: center;
      &-zh{}
      &-en{}
    }
    .goods{
      display: flex;
      justify-content: space-between;
      &-box{
        width: 13.5rem;
        height: 19.35rem;
        background: #ccc;
      }
    }
    .change{
      display: flex;
      flex-direction: column;
      align-items: center;
      &-btn{}
    }
  }
}
</style>
