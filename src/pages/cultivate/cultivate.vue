<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="cultivate-main">
          <template>
            <Banner></Banner>
          </template>
          <div class="cultivate-count">
            <div class="cultivate-count-div1">
              <div class="cultivate1">
                <div class="cultivate1-one">
                  <span class="span">时间：</span>
                  <el-button type="text" class="butt">全部</el-button>
                  <el-date-picker
                    v-model="value1"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </div>
                <div class="cultivate1-two">
                  <span class="span">价格：</span>
                  <el-button type="text" class="butt">全部</el-button>
                  <div class="button-price">
                    <el-button
                      type="text"
                      :class="{active3 : active3 == item.name}"
                      v-for="item in priceList"
                      :key="item.name"
                      @click="selected3(item.name)"
                    >{{item.name}}</el-button>
                    <el-input v-model="input" placeholder="请输入金额" class="price-input1"></el-input>—
                    <el-input v-model="input2" placeholder="请输入金额" class="price-input2"></el-input>
                  </div>
                </div>
                <div class="cultivate1-three">
                  <span class="span">地区：</span>
                  <el-button type="text" class="butt">全部</el-button>
                  <v-distpicker
                    :province="province"
                    :city="city"
                    :area="area"
                    @selected="onSelected"
                  ></v-distpicker>
                </div>
                <div class="cultivate1-four">
                  <span class="span">难度：</span>
                  <el-button type="text" class="butt">全部</el-button>
                  <div class="button-text">
                    <el-button
                      type="text"
                      :class="{active : active == item.name}"
                      v-for="item in wpList"
                      :key="item.name"
                      @click="selected(item.name)"
                    >{{item.name}}</el-button>
                  </div>
                </div>
                <div class="cultivate1-five">
                  <span class="span">类别：</span>
                  <el-button type="text" class="butt">全部</el-button>
                  <div class="button-classfiy">
                    <el-button
                      type="text"
                      :class="{active2 : active2 == item.name}"
                      v-for="item in classfiy"
                      :key="item.name"
                      @click="selected2(item.name)"
                    >{{item.name}}</el-button>
                  </div>
                </div>
                <div class="cultivate1-six">
                  <span class="span">已选：</span>
                  <el-tag
                    v-for="tag in tags"
                    :key="tag.name"
                    closable
                    :type="tag.type"
                    class="tag"
                  >{{tag.name}}</el-tag>
                </div>
              </div>
              <div class="fruit">找到下列结果</div>
              <div class="fruit-list">
                <div class="fruit-list-li" v-for="(item,index) in fruitlist" :key="index">
                  <div class="fruit-list-li-img">
                    <img :src="item.img" />
                  </div>
                  <div class="fruit-list-li-text">
                    <h4>{{item.name}}</h4>
                    <div class="list-eye">
                      <img src="../../assets/eye.png" />
                      <span class="span">{{item.num}}</span>
                    </div>
                  </div>
                  <el-rate v-model="item.value2"></el-rate>
                  <div class="fruit-price">￥{{item.price}}</div>
                  <div class="fruit-detail">{{item.dateil}}</div>
                </div>
              </div>
              <div class="market_often-btn">
                <div class="goods-detail-btn" @click="goMarketDetail">more</div>
              </div>
            </div>
            <div class="cultivate-count-div2">
              <h2>
                <img src="../../assets/yujia.png" />热门课程
              </h2>
              <p class="nav-text">Sometimes beauty is so simple</p>
              <div class="border-left"></div>
              <div class="border-right"></div>
            </div>
            <div class="cultivate-count-div3">
              <div
                class="fruit-list-li"
                v-for="(item,index) in fruitclasslist"
                :key="index"
                @click="selectItem(item)"
              >
                <div class="fruit-list-li-img">
                  <img :src="item.img" />
                </div>
                <div class="fruit-list-li-text">
                  <h4>{{item.name}}</h4>
                  <div class="list-eye">
                    <img src="../../assets/eye.png" />
                    <span class="span">{{item.num}}</span>
                  </div>
                </div>
                <el-rate v-model="item.value3"></el-rate>
                <div class="fruit-price">￥{{item.price}}</div>
                <div class="fruit-detail">{{item.dateil}}</div>
              </div>
            </div>
            <div class="cultivate-count-div4">
              <h2>
                <img src="../../assets/yujia.png" />最新发布
              </h2>
              <p class="nav-text">Sometimes beauty is so simple</p>
              <div class="border-left"></div>
              <div class="border-right"></div>
            </div>
            <div class="cultivate-count-div5">
              <img src="../../assets/image23.png" />
              <div class="bian"></div>
              <div class="div5-list">
                <div class="li-text">
                  <h4>维密普拉提瑜伽</h4>
                  <div class="list-eye">￥4800</div>
                </div>
                <el-rate v-model="rate"></el-rate>
                <div class="li-text2">课 时：12课时</div>
                <div class="li-text3">开课时间：2019.05.20-20.19-0526</div>
                <div class="li-text4">地 址：四川省成都市锦江区锦东路668号</div>
                <img class="li-text5" src="../../assets/image-jiao.png" />
              </div>
              <div class="border-bo"></div>
              <img class="border-img" src="../../assets/image47.png" />
            </div>
            <div class="cultivate-count-div6">
              <img src="../../assets/image23.png" />
              <div class="bian"></div>
              <div class="div5-list">
                <div class="li-text">
                  <h4>维密普拉提瑜伽</h4>
                  <div class="list-eye">￥4800</div>
                </div>
                <el-rate v-model="rate"></el-rate>
                <div class="li-text2">课 时：12课时</div>
                <div class="li-text3">开课时间：2019.05.20-20.19-0526</div>
                <div class="li-text4">地 址：四川省成都市锦江区锦东路668号</div>
                <img class="li-text5" src="../../assets/image-jiao.png" />
              </div>
              <div class="border-bo"></div>
              <img class="border-img" src="../../assets/image47.png" />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Banner from "@/components/banner";
import VDistpicker from "v-distpicker";
export default {
  components: {
    Banner,
    VDistpicker
  },
  data() {
    return {
      value2: "",
      value3: "",
      province: "",
      city: "",
      area: "",
      input: "",
      input2: "",
      active: "",
      active2: "",
      active3: "",
      value1: "",
      rate: 2,
      wpList: [
        {
          name: "1星"
        },
        {
          name: "2星"
        },
        {
          name: "3星"
        },
        {
          name: "4星"
        },
        {
          name: "5星"
        }
      ],
      classfiy: [
        {
          name: "阿斯汤加"
        },
        {
          name: "空中瑜伽"
        },
        {
          name: "哈他瑜伽"
        },
        {
          name: "孕产瑜伽"
        },
        {
          name: "理疗瑜伽"
        },
        {
          name: "普拉提"
        },
        {
          name: "艾扬格瑜伽"
        },
        {
          name: "流瑜伽"
        },
        {
          name: "阴瑜伽"
        },
        {
          name: "阿育吠陀"
        },
        {
          name: "昆达里尼"
        }
      ],
      priceList: [
        {
          name: "1500-3000"
        },
        {
          name: "3001-4000"
        },
        {
          name: "4001-5000"
        }
      ],
      tags: [{ name: "理疗瑜伽", type: "success" }],
      fruitlist: [
        {
          id: 1,
          img: require("../../assets/image16.png"),
          name: "理疗瑜伽",
          num: 2232,
          value2: 2,
          price: 4800,
          dateil: "贵州省铜仁市碧江区蓝波湾小区B栋1104"
        },
        {
          id: 2,
          img: require("../../assets/image21.png"),
          name: "理疗瑜伽",
          num: 2232,
          value2: 3,
          price: 4800,
          dateil: "贵州省铜仁市碧江区蓝波湾小区B栋1104"
        },
        {
          id: 3,
          img: require("../../assets/image17.png"),
          name: "理疗瑜伽",
          num: 2232,
          value2: 1,
          price: 4800,
          dateil: "贵州省铜仁市碧江区蓝波湾小区B栋1104"
        },
        {
          id: 4,
          img: require("../../assets/image15.png"),
          name: "理疗瑜伽",
          num: 2232,
          value2: 4,
          price: 4800,
          dateil: "贵州省铜仁市碧江区蓝波湾小区B栋1104"
        },
        {
          id: 5,
          img: require("../../assets/image13.png"),
          name: "理疗瑜伽",
          num: 2232,
          value2: 2,
          price: 4800,
          dateil: "贵州省铜仁市碧江区蓝波湾小区B栋1104"
        },
        {
          id: 6,
          img: require("../../assets/image14.png"),
          name: "理疗瑜伽",
          num: 2232,
          value2: 2,
          price: 4800,
          dateil: "贵州省铜仁市碧江区蓝波湾小区B栋1104"
        }
      ],
      fruitclasslist: [
        {
          id: 1,
          img: require("../../assets/image16.png"),
          name: "理疗瑜伽",
          num: 2232,
          value3: 2,
          price: 4800,
          dateil: "贵州省铜仁市碧江区蓝波湾小区B栋1104"
        },
        {
          id: 2,
          img: require("../../assets/image21.png"),
          name: "理疗瑜伽",
          num: 2232,
          value3: 3,
          price: 4800,
          dateil: "贵州省铜仁市碧江区蓝波湾小区B栋1104"
        },
        {
          id: 3,
          img: require("../../assets/image17.png"),
          name: "理疗瑜伽",
          num: 2232,
          value3: 1,
          price: 4800,
          dateil: "贵州省铜仁市碧江区蓝波湾小区B栋1104"
        }
      ]
    };
  },
  methods: {
    onSelected(data) {
      this.province = data.province.value;
      this.city = data.city.value;
      this.area = data.area.value;
    },
    selected(name) {
      this.active = name;
    },
    selected2(name) {
      this.active2 = name;
    },
    selected3(name) {
      this.active3 = name;
    },
    selectItem(item) {
      this.$router.push({
        path: "/cultivate/detail",
        query: {
          id: item.id
        }
      });
    },
    goMarketDetail() {
      this.$router.push("/cultivate/detail");
    }
  }
};
</script>
<style lang="scss" scoped>
.el-rate__icon {
  color: #58b708 !important;
}
.el-rate__icon.hover {
  color: #58b708 !important;
}
.cultivate-main {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  .cultivate-count {
    width: 100%;
    margin: 0 auto;
    height: 100%;
    display: inline-block;
    .cultivate-count-div1 {
      width: 100%;
      height: 100%;
      margin: 0 auto;
      display: inline-block;
      .cultivate1 {
        width: 75%;
        height: 24.6rem;
        margin: 0 auto;
        background-color: #ffffff;
        box-shadow: 2px 3px 20px 1px #a4a4a4;
        border-radius: 0.3rem;
        margin-top: 1.3rem;
        .cultivate1-one {
          width: 100%;
          height: 4.1rem;
          line-height: 4.1rem;
          padding-left: 3rem;
          display: flex;
          border-bottom: 1px solid #dcdcdc;
          .span {
            font-size: 0.9rem;
            font-family: MicrosoftYaHei;
            font-weight: bold;
            color: #2c2c2c;
          }
          .butt {
            color: #2c2c2c;
            margin-left: 2rem;
          }
          .el-range-editor.el-input__inner {
            margin-left: 2rem;
            margin-top: 0.8rem;
            width: 50%;
          }
        }
        .cultivate1-two {
          width: 100%;
          height: 4.1rem;
          line-height: 4.1rem;
          padding-left: 3rem;
          display: flex;
          border-bottom: 1px solid #dcdcdc;
          .span {
            font-size: 0.9rem;
            font-family: MicrosoftYaHei;
            font-weight: bold;
            color: #2c2c2c;
          }
          .butt {
            color: #2c2c2c;
            margin-left: 2rem;
          }
          .button-price {
            .el-button--text {
              color: #2c2c2c;
              margin-left: 2rem;
              font-size: 0.9rem;
            }
            .active3 {
              color: #00bc71;
              font-size: 0.9rem;
              border: none;
            }
            .price-input1 {
              margin-left: 2rem;
              width: 8rem;
            }
            .price-input2 {
              width: 8rem;
            }
          }
        }
        .cultivate1-three {
          width: 100%;
          height: 4.1rem;
          padding-left: 3rem;
          line-height: 4.1rem;
          display: flex;
          border-bottom: 1px solid #dcdcdc;
          .span {
            font-size: 0.9rem;
            font-family: MicrosoftYaHei;
            font-weight: bold;
            color: #2c2c2c;
          }
          .butt {
            color: #2c2c2c;
            margin-left: 2rem;
          }
          .distpicker-address-wrapper {
            margin-left: 2rem;
          }
        }
        .cultivate1-four {
          width: 100%;
          height: 4.1rem;
          padding-left: 3rem;
          line-height: 4.1rem;
          display: flex;
          border-bottom: 1px solid #dcdcdc;
          .span {
            font-size: 0.9rem;
            font-family: MicrosoftYaHei;
            font-weight: bold;
            color: #2c2c2c;
          }
          .butt {
            color: #2c2c2c;
            margin-left: 2rem;
          }
          .button-text {
            .el-button--text {
              color: #2c2c2c;
              margin-left: 2rem;
              font-size: 0.9rem;
            }
            .active {
              color: #00bc71;
              font-size: 0.9rem;
              border: none;
            }
          }
        }
        .cultivate1-five {
          width: 100%;
          height: 4.1rem;
          line-height: 4.1rem;
          padding-left: 3rem;
          display: flex;
          border-bottom: 1px solid #dcdcdc;
          .span {
            font-size: 0.9rem;
            font-family: MicrosoftYaHei;
            font-weight: bold;
            color: #2c2c2c;
          }
          .butt {
            color: #2c2c2c;
            margin-left: 2rem;
          }
          .button-classfiy {
            .el-button--text {
              color: #2c2c2c;
              margin-left: 2rem;
              font-size: 0.9rem;
            }
            .active2 {
              color: #00bc71;
              font-size: 0.9rem;
              border: none;
            }
          }
        }
        .cultivate1-six {
          width: 100%;
          height: 4.1rem;
          line-height: 4.1rem;
          padding-left: 3rem;
          .span {
            font-size: 0.9rem;
            font-family: MicrosoftYaHei;
            font-weight: bold;
            color: #2c2c2c;
          }
          .tag {
            margin-left: 1.5rem;
          }
        }
      }
      .fruit {
        width: 75%;
        margin: 0 auto;
        margin-top: 2rem;
        font-family: MicrosoftYaHei;
        font-weight: bold;
        font-size: 0.9rem;
        color: #2c2c2c;
      }
      .fruit-list {
        width: 75%;
        height: 77rem;
        margin: 0 auto;
        .fruit-list-li {
          width: 22rem;
          height: 35.6rem;
          background-color: #ffffff;
          box-shadow: 0.1rem 0.2rem 1.3rem 0.1rem rgba(164, 164, 164, 0.39);
          border-radius: 0.3rem;
          float: left;
          margin-left: 1.4rem;
          margin-top: 2rem;
          .fruit-list-li-img {
            width: 100%;
            height: 21.7rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .fruit-list-li-text {
            display: flex;
            justify-content: space-between;
            width: 90%;
            margin: 0 auto;
            margin-top: 2.5rem;
            h4 {
              font-size: 1.3rem;
              color: #2c2c2c;
            }
            .list-eye {
              img {
                width: 1.6rem;
                height: 1.5rem;
                margin-top: -3px;
              }
              .span {
                font-size: 1.1rem;
                color: #2c2c2c;
              }
            }
          }
          .el-rate {
            padding-left: 1rem;
          }
          .fruit-price {
            width: 90%;
            margin: 0 auto;
            margin-top: 1rem;
          }
          .fruit-detail {
            width: 90%;
            margin: 0 auto;
            margin-top: 2rem;
          }
        }
      }
      .market_often-btn {
        margin-top: 2rem;
        margin-bottom: 5rem;
        .goods-detail-btn {
          cursor: pointer;
          width: 13rem;
          margin: 0 auto;
          padding: 0.4rem 0.55rem 1.5rem 6.7rem;
          background: url(../../assets/market/btn-bg.png) no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .cultivate-count-div2 {
      width: 100%;
      height: 9.4rem;
      text-align: center;
      display: inline-block;
      position: relative;
      .border-left {
        width: 20%;
        height: 1px;
        background-color: #dcdcdc;
        position: absolute;
        top: 45%;
        left: 22%;
      }
      .border-right {
        width: 20%;
        height: 1px;
        background-color: #dcdcdc;
        position: absolute;
        right: 22%;
        top: 45%;
      }
      .nav-text {
        color: #999999;
        font-size: 14px;
        margin-top: -8px;
      }
      h2 {
        color: #2c2c2c;
        font-size: 24px;
        margin-top: 40px;
        img {
          width: 28px;
          height: 28px;
          position: absolute;
          left: 44%;
        }
      }
    }
    .cultivate-count-div3 {
      width: 75%;
      height: 37rem;
      margin: 0 auto;
      .fruit-list-li {
        width: 22rem;
        height: 35.6rem;
        background-color: #ffffff;
        box-shadow: 0.1rem 0.2rem 1.3rem 0.1rem rgba(164, 164, 164, 0.39);
        border-radius: 0.3rem;
        float: left;
        margin-left: 1.4rem;
        .fruit-list-li-img {
          width: 100%;
          height: 21.7rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .fruit-list-li-text {
          display: flex;
          justify-content: space-between;
          width: 90%;
          margin: 0 auto;
          margin-top: 2.5rem;
          h4 {
            font-size: 1.3rem;
            color: #2c2c2c;
          }
          .list-eye {
            img {
              width: 1.6rem;
              height: 1.5rem;
              margin-top: -3px;
            }
            .span {
              font-size: 1.1rem;
              color: #2c2c2c;
            }
          }
        }
        .el-rate {
          padding-left: 1rem;
        }
        .fruit-price {
          width: 90%;
          margin: 0 auto;
          margin-top: 1rem;
        }
        .fruit-detail {
          width: 90%;
          margin: 0 auto;
          margin-top: 2rem;
        }
      }
    }
    .cultivate-count-div4 {
      width: 100%;
      height: 9.4rem;
      text-align: center;
      display: inline-block;
      position: relative;
      .border-left {
        width: 20%;
        height: 1px;
        background-color: #dcdcdc;
        position: absolute;
        top: 45%;
        left: 22%;
      }
      .border-right {
        width: 20%;
        height: 1px;
        background-color: #dcdcdc;
        position: absolute;
        right: 22%;
        top: 45%;
      }
      .nav-text {
        color: #999999;
        font-size: 14px;
        margin-top: -8px;
      }
      h2 {
        color: #2c2c2c;
        font-size: 24px;
        margin-top: 40px;
        img {
          width: 28px;
          height: 28px;
          position: absolute;
          left: 44%;
        }
      }
    }
    .cultivate-count-div5 {
      width: 75%;
      margin: 0 auto;
      height: 26rem;
      display: flex;
      position: relative;
      img {
        width: 31.2rem;
        height: 21.7rem;
      }
      .bian {
        width: 15.7rem;
        height: 17rem;
        background-color: #cce198;
        opacity: 0.33;
        margin-top: 4.7rem;
      }
      .div5-list {
        position: absolute;
        left: 51%;
        top: 24%;
        .li-text {
          display: flex;
          justify-content: space-between;
          h4 {
            font-size: 1.3rem;
            color: #2c2c2c;
          }
          .list-eye {
            font-size: 1.1rem;
            color: #2c2c2c;
          }
        }
        .li-text2 {
          font-size: 0.9rem;
          color: #2c2c2c;
          margin-top: 2rem;
        }
        .li-text3 {
          font-size: 0.9rem;
          color: #2c2c2c;
          margin-top: 1.8rem;
        }
        .li-text4 {
          font-size: 0.9rem;
          color: #2c2c2c;
          margin-top: 0.5rem;
        }
        .li-text5 {
          width: 1rem;
          height: 1.3rem;
          position: absolute;
          left: 93%;
          bottom: -18%;
        }
      }
      .border-bo {
        background-color: #bfbfbf;
        width: 0.1rem;
        height: 13.9rem;
        position: absolute;
        right: 20%;
        top: 20%;
      }
      .border-img {
        width: 5.1rem;
        height: 5.1rem;
        position: absolute;
        right: 10%;
        top: 34%;
      }
    }
    .cultivate-count-div6 {
      width: 75%;
      margin: 0 auto;
      height: 26rem;
      display: flex;
      position: relative;
      img {
        width: 31.2rem;
        height: 21.7rem;
      }
      .bian {
        width: 15.7rem;
        height: 17rem;
        background-color: #cce198;
        opacity: 0.33;
        margin-top: 4.7rem;
      }
      .div5-list {
        position: absolute;
        left: 51%;
        top: 24%;
        .li-text {
          display: flex;
          justify-content: space-between;
          h4 {
            font-size: 1.3rem;
            color: #2c2c2c;
          }
          .list-eye {
            font-size: 1.1rem;
            color: #2c2c2c;
          }
        }
        .li-text2 {
          font-size: 0.9rem;
          color: #2c2c2c;
          margin-top: 2rem;
        }
        .li-text3 {
          font-size: 0.9rem;
          color: #2c2c2c;
          margin-top: 1.8rem;
        }
        .li-text4 {
          font-size: 0.9rem;
          color: #2c2c2c;
          margin-top: 0.5rem;
        }
        .li-text5 {
          width: 1rem;
          height: 1.3rem;
          position: absolute;
          left: 93%;
          bottom: -18%;
        }
      }
      .border-bo {
        background-color: #bfbfbf;
        width: 0.1rem;
        height: 13.9rem;
        position: absolute;
        right: 20%;
        top: 20%;
      }
      .border-img {
        width: 5.1rem;
        height: 5.1rem;
        position: absolute;
        right: 10%;
        top: 34%;
      }
    }
  }
}
</style>
