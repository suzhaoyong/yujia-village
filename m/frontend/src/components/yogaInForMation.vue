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
      <div class="information-main-count">
        <div class="information-main-count-img"><img src=""></div>
        <div class="information-main-count-text">
          <p></p>
          <div>
            <span></span>
            <span></span>
          </div>
        </div>
        <div></div>
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
    &-count {
      width: 159px;
      height: 293px;
      &-img {
        width: 100%;
        height: 140px;
      }
      &-text {
        height: 62px;
        p {
          font-size: 16px;
        }
        div {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>