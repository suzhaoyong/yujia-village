<template>
  <div>
    <div class="train">
      <div class="header"></div>
      <div class="body">
        <div class="condition-box">
          <div class="condition">
            <div class="item">
              <div class="key">时间:</div>
              <div class="value">
                <div class="all">全部</div>
                <div class="range">
                  <div class="input_search">
                    <input type="text" class="time-start" />
                    <span>-</span>
                    <input type="text" class="time-end" />
                  </div>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="key">价格:</div>
              <div class="value">
                <div class="all">全部</div>
                <div class="range">
                  <div class="tags">
                    <div class="tag">1500-3000</div>
                    <div class="tag">1500-3000</div>
                  </div>
                  <div class="input_search">
                    <input type="text" class="price-start" />
                    <span>-</span>
                    <input type="text" class="price-end" />
                  </div>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="key">地区:</div>
              <div class="value">
                <div class="all">全部</div>
                <div class="range">
                  <div class="address_select">
                  </div>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="key">难度:</div>
              <div class="value">
                <div class="all">全部</div>
                <div class="range">
                  <div class="tags">
                    <div class="tag">1500-3000</div>
                    <div class="tag">1500-3000</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="key">类别:</div>
              <div class="value">
                <div class="all">全部</div>
                <div class="range">
                  <div class="tags">
                    <div class="tag">1500-3000</div>
                    <div class="tag">1500-3000</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="key">已选:</div>
              <div class="value">
                <div class="selected-box">
                  <div class="selected">
                    阿斯汤加
                    <i class="el-icon-close close"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="search-result">
          <h3>找到下列结果</h3>
          <div class="result">
            <div class="course">
              <div class="img"></div>
              <div class="info">
                <div class="item">
                  <div class="name">阿斯汤加</div>
                  <div class="views">
                    1841
                  </div>
                </div>
                <div class="item">
                  <div class="score">￥4800</div>
                </div>
                <div class="item">
                  <div class="price">￥4800</div>
                </div>
                <div class="item">
                  <div class="address">贵州省铜仁市碧江区蓝波湾小区B栋1104</div>
                </div>
              </div>
            </div>
            <div class="more-btn">
              <div class="more">更多</div>
            </div>
          </div>
        </div>
        <div class="hot-course"></div>
        <div class="news-course">
          <div class="news">
            <div class="course">
              <div class="img"></div>
              <div class="info">
                <div class="item">
                  <div class="name">维密普拉提瑜伽</div>
                  <div class="price">￥4800</div>
                </div>
                <div class="item">
                  <div class="score"></div>
                </div>
                <div class="item">
                  <div class="long">课         时：12课时</div>
                </div>
                <div class="item">
                  <div class="date-time">开课时间：2019.05.20-20.19-0526</div>
                </div>
                <div class="item">
                  <div class="address">地        址：四川省成都市锦江区锦东路668号</div>
                </div>
              </div>
              <div class="qrcode"></div>
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>

