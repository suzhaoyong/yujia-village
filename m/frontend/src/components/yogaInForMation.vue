<template>
  <div class="information">
    <div class="information-banner">
      <img src="" />
    </div>
    <div class="information-nav">
      <ul class="information-nav-list">
        <li><img src=""><p>1</p></li>
        <li><img src=""><p>1</p></li>
        <li><img src=""><p>1</p></li>
        <li><img src=""><p>1</p></li>
        <li><img src=""><p>1</p></li>
      </ul>
    </div>
    <main class="information-main">
      <div class="main">
        <div class="information-main-count">
          <div class="information-main-count-img"><img src=""></div>
          <div class="information-main-count-text">
            <p>瑜伽顶级人物的高难动作</p>
            <div>
              <span>IVAV</span>
              <span><span>tubiao</span><span>1998</span></span>
            </div>
          </div>
        </div>

        <div class="information-main-count">
          <div class="information-main-count-img"><img src=""></div>
          <div class="information-main-count-text">
            <p>瑜伽顶级人物的高难动作</p>
            <div>
              <span>IVAV</span>
              <span><span>tubiao</span><span>1998</span></span>
            </div>
          </div>
        </div>

        <div class="information-main-count">
          <div class="information-main-count-img"><img src=""></div>
          <div class="information-main-count-text">
            <p>瑜伽顶级人物的高难动作</p>
            <div>
              <span>IVAV</span>
              <span><span>tubiao</span><span>1998</span></span>
            </div>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>
<script>

export default {

}
</script>
<style lang="scss" scoped>
.information {
  &-banner {

  }
  &-nav {

    &-list {
      height: 50px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      li {
        height: 50px;
        text-align: center;
        font-size: 14px;
        img {
          width: 22px;
          height: 22px;
        }
      }
    }
  }
  &-main {
    width: 100%;

    .main {
      width: 335px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      div:nth-of-type(2) {
        height: 242px;
      }
      .information-main-count {
        width: 159px;
        height: 202px;
        border: 1px solid black;
        margin-top: 8px;
        margin-right: 5px;
        &-img {
          width: 100%;
          height: 140px;
        }
        &-text {
          height: 62px;
          padding: 0 8px;
          p {
            font-size: 16px;
            width: 70%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          div {
            display: flex;
            justify-content: space-between;
            span {
              font-size: 12px;
              color: #6d3d3d
            }
          }
        }
      }
    }
  }
}
</style>