<template>
  <div class="message">
    <header>培训信息</header>
    <main class="message-main">
      <ul class="message-main-head">
        <li @click="defaultRank('default')"> 默认排序</li>
        <li @click="hostRank('host')">热度</li>
        <li @click="priceRank('price')">价格 {{ priceFlag? '∧': '∨' }}</li>
        <li class="head-list" is-link @click="showPopup">筛选</li>
        <!-- <li>价格 ∨</li> -->
      </ul>
      <van-popup
        v-model="show"
        position="right"
        round
        :style="{ width: '85%', height: '100%' }"
      >
      <div class="popup">
        <p>理想价格</p>
        <div class="popup-price"> <input type="text" v-model="minprice"> — <input type="text" v-model="maxprice"> </div>
        <div class="popup-diff">
          <p>难度</p>
          <ul class="popup-diff-list">
            <li 
              v-for="(list, index) in 5" 
              :key="index" 
              @click="selected(list, index)" 
              :class="{'bgcolor':categoryIndex == index}"
            >{{ index + 1 }}星</li>
          </ul>
        </div>

        <div class="area">
        <p>地区选择</p>
        <div class="area-box" @click="areashow">
          <div is-link  class="area-select">{{ selectArea.province || '请选择'}}</div>-
          <div is-link  class="area-select">{{ selectArea.city || '请选择'}}</div>-
          <div is-link  class="area-select">{{ selectArea.area || '请选择'}}</div>
        </div>
        </div>
        <div class="types">
          <p>适用类别</p>
          <ul class="types-container">
            <li 
              v-for="(list, index) in classfly" 
              :key="list.id" 
              @click="selected2(list ,index)"
              :class="{'bgcolor':spanIndex2.indexOf(index)>-1}"
            >{{ list.name }}</li>
          </ul>
        </div>
        <div class="button">
          <div class="reset" @click="resetlist">重置</div>
          <div class="sure" @click="searchResult">确定</div>
        </div>
      </div>
        </van-popup>
        <van-popup v-model="areaisOpen" position="bottom" :style="{ height: '40%' }">
          <van-area
            :area-list="list"
            @confirm="changeArea" 
            @cancel="areaisOpen = false"
          />
        </van-popup>
      <div class="message-main-container">
          <div class="message-main-container-list">
            <div class="message-main-container-list-count" v-for="list in messageLists" :key="list.id" @click="viewdetail(list.id)">
              <div class="message-main-container-list-count-img">
                <img :src="list.teacher_img">
              </div>
              <div class="message-main-container-list-count-text">
                <h6 class="p1">{{ list.theme }}</h6>
                <span class="message-main-container-list-count-text-star">
                <van-rate
                  v-model='list.diff'
                  readonly
                  :size="8"
                  color='#58B708'
                  void-icon="star"
                  void-color="#eee"
                /></span>
                <p class="p2">￥ {{ list.price }}</p>
                <p class="p3">{{ list.city }}{{ list.area }}</p>
                <p class="p4">
                  <span class="p4-eye"><img src="../../../static/img/eye.png">{{ list.views }}</span>
                  <span class="p4-hand"><img src="../../../static/img/hand.png">{{ list.follow || 100 }}</span>
                </p>
                <button class="wantbtn" @click.stop="study(list.id)">我想学</button>
              </div>
            </div>
          </div>
      </div>
    </main>
  </div>
</template>

<script>
import Vue from 'vue';
import Bus from '../../utils/Bus'
import areaList from '../market/goods/area_list'
import { Rate, Popup, Area, PullRefresh, Toast  } from 'vant';
import { mapGetters } from "vuex";

Vue.use(Rate).use(Popup).use(Area).use(PullRefresh).use(Toast);
import {
  getTrains,
  postTrainsList,
  getOrderByTrains,
  postTrains,
  getTrainsById,
  postTrainsRank,
  followTrain
} from "../../../api/trains";
import {
  getFollowTrain
} from "../../../api/personal";
export default {
  data() {
    return {
      list: areaList,
      messageLists: [],
      classfly: [],
      selectArea: {
        province: "",
        city: "",
        area: ""
      },
      areaisOpen: false,
      value: 2,
      minprice: 0,
      maxprice: 50000,
      selectTags: [],
      selectTtype: [],
      spanIndex: [],
      spanIndex2: [],
      page: 1,
      isLoading: false,
      show: false,
      fruit: {
        data: []
      },
      fruitclasslist: [],
      newList: [],
      // 添加 fw 类 的判定状态
      resultFw: false,
      defaultFw: false,
      hostFw: false,
      priceFW: false,
      // 排序关键字
      keyWord: '',
      // 控制价格排序的 flag
      priceFlag: true,
      aa: 100,
      categoryIndex: -1
    }
  },
  created() {
    this.messageList()
  },
  computed: {
    ...mapGetters(["info"]),
  },
  mounted () {
    this.PullUpReload()
  },
  methods: {
    // 点击弹出遮罩层
    showPopup() {
      this.show = true;
    },
    // 地址遮罩层
    areashow (e) {
      e = e || event
      var target = e.target || e.srcElement
      if (target.nodeName === "DIV") {
        this.areaisOpen = true
      }
    },
    // 重置按钮功能
    resetlist () {
      this.show = true
    },
    // 地址选择
    changeArea (value) {
      this.selectArea = {
        province: value[0].name,
        city: value[1].name,
        area: value[2].name
      }
      const tag = {
        val: {
        province: value[0].name,
        city: value[1].name,
        area: value[2].name
        },
        type: 'area',
        isArray: false,
        name: `${this.selectArea.province} ${this.selectArea.city} ${this.selectArea.area}`
      };
      this.areaisOpen = false
      tag.val.length > 1 && this.selectedarea(tag);
    },
    selectedarea (item) {
      if (item.isArray) {
        console.log(item)
        this.selectTags.push(item.val);
        return;
      }
    },
    // 点击li跳转到详情页
    viewdetail (id) {
      this.$router.push('/messagedetail/'+id)
      return false;
    },
    // 获取列表
    messageList (page = 1) {
      this.$request.get('trains?page=' + page).then((res) => {
        if (res.all.current_page < res.all.last_page ) {
          console.log(res)
          res.all.data.map((item) => {
            this.messageLists.push(item)
          })
          this.classfly = res.course_types
        } else {
          Toast('已经是最后一页');
        }
    })
    },
    // 我想学的操作
    study(id) {
      // console.log(id);
      // if (!this.info.user.name) {
      if (!this.info.user.name) {
        Bus.$emit("login", true);
        return;
      }
      this.wantStudy(id)
      return false;
    },
    wantStudy(id) {
      // 调用我想学接口
      getFollowTrain(id)
        .then(data => {
          this.$message({type:'success', message: '成功'})
        })
    },
    // 下拉刷新
    // 上拉加载更多
    PullUpReload () {
      var _this = this
      var pages = 1
      document.querySelector('.message-main-container').onscroll = function() {
      let innerHeight = document.querySelector('.message-main-container').clientHeight // 容器高度
      let outerHeight = document.querySelector('.message-main-container-list').clientHeight // 容器高+滚动高
      let scrollTop = document.querySelector('.message-main-container').scrollTop  // 滚动高
      if (innerHeight + scrollTop === outerHeight + 20) {
        pages++
        _this.messageList(pages)
        console.log(pages)
      }
      }
    },
    // 选择功能
    selected(item, index) {
      this.categoryIndex = index
      let selectTag = this.selectTags.indexOf(item)
      if (this.selectTags.indexOf(item) > -1) {
        this.selectTags.splice(selectTag, 1, item)
      } else {
        this.selectTags.splice(selectTag, 1, item)
      }
      this.selectTags.diff = this.selectTags[0]
      console.log(this.selectTags)

      let arrIndex = this.spanIndex.indexOf(index);
      if (this.spanIndex.indexOf(index) > -1) {
        this.spanIndex.splice(arrIndex,1)
      } else {
        this.spanIndex.push(index)
      }
    },
    selected2 (item, index) {
      let selectTag = this.selectTtype.indexOf(item.id)
      if (this.selectTtype.indexOf(item.id) > -1) {
        this.selectTtype.splice(selectTag, 1)
      } else {
        this.selectTtype.push(item.id)
        console.log(this.selectTtype)
      }
      
      let arrIndex2 = this.spanIndex2.indexOf(index);
      if (this.spanIndex2.indexOf(index) > -1) {
        this.spanIndex2.splice(arrIndex2,1)
      } else {
        this.spanIndex2.push(index)
      }
    },
    // 选择排序功能
    searchResult() {
      postTrains(this.getFiltersParams()).then((res) => {
        console.log(res)
        this.messageLists = res.data
      })
      this.show = false
    },
    postGetTrainsList(page = 1, params) {
      postTrainsList(page, params).then((res) => {
        this.messageLists = res.data
      })
    },
    getTrainsList(page = 1) {
      getTrains(page).then(data => {
        console.log(data)
        this.messageLists.push(data.all.data)
        // const mapClassfiy = array =>
        //   array.map(item => {
        //     item.type = "classfiy";
        //     item.value = item.id;
        //     item.isArray = true;
        //     return item;
        //   });
        // // console.log(data);
        // const { all, banner ,course_types} = data;
        // 
        // // console.log(this.fruit);
        // if (page > 1) return;
        // this.classfiy = mapClassfiy(course_types);
        // // if (course_types.length > 8) {
        // //   this.classfiy = mapClassfiy(course_types.slice(0, 8));
        // //   this.moreClassfiy = mapClassfiy(course_types.slice(8));
        // // }
        // this.banner = banner;
      });
    },
    getFiltersParams (params = {}) {
      params = {
        tartTime: "",
        endTime: "",
        minPrice: "",
        maxPrice: "",
        province: this.selectArea.province || "",
        city: this.selectArea.city || "",
        area: this.selectArea.area || "",
        diff: this.selectTags.diff || "", // 难度,整数,小于10
        course_type_id: this.selectTtype || [],
      }
      console.log(this.selectTags, this.selectArea)
      return params;
    },
    // 排序请求
    getRank (params) {
      postTrains(params).then((res => {
        this.messageLists = res.data
      }))
    },
    getRankParams (keyWord, params = {}) {
      if (keyWord === 'default') {
        params =Object.assign({}, params, {time: false})
      } else if (keyWord === 'host') {
        params = Object.assign({}, params, {follow: false})
      } else {
        if(this.priceFlag) {
          params = Object.assign({}, params, {money: true})
        } else {
          params = Object.assign({}, params, {money: false})
        }
      }
      return params
    },
    // 价格排序
    priceRank (keyWord) {
      this.priceFW = true;
      this.defaultFW = true;
      this.hostFW = false;
      this.resultFW = false;
      this.keyWord = keyWord;
      this.getRank(this.getRankParams(keyWord))
      this.priceFlag = !this.priceFlag
    },
    // 默认排序
    defaultRank (keyWord) {
      this.hostFw = true
      this.defaultFw = true;
      this.priceFW = false;
      this.resultFw = false;
      this.keyWord = keyWord;
      this.getRank(this.getRankParams(keyWord))
    },
    // 热度排序
    hostRank (keyWord) {
      this.hostFw = true
      this.defaultFw = true;
      this.priceFW = false;
      this.resultFw = false;
      this.keyWord = keyWord;
      this.getRank(this.getRankParams(keyWord))
    }
  }
}
</script>

<style lang="scss" scope>
// 切换的样式
.bgcolor {
  background: #7BBB62;
}
.message {
  width: 100%;
  header {
    height: 44px;
    text-align: center;
    background: #EEEEEE;
    font-size: 16px;
    line-height: 44px;
  }

  &-main {
    width: 100%;
    height: 94%;
    &-head {
      width: 100%;
      height: 44px;
      font-size: 12px;
      background: white;
      li {
        margin-left: 18px;
        float: left;
        height: 44px;
        line-height: 44px;
      }
      .head-list {
        float: right;
        margin-right: 16px;
      }
    }
    .popup {
      font-size: 14px;
      height: 100%;
      margin-left: 23px;
      padding-top: 32px;
      position: relative;
      &-price {
        float: left;
        input {
          width: 88px;
          height: 29px;
          border: 1px solid #E5E5E5;
          border-radius: 15px;
        }
      }
      .popup-diff {
        margin-top:40px;
        &-list {
          font-size: 12px;
          margin-top:20px;
          li {
            float: left;
            margin-right: 20px;
          }
        }
      }
      .area {
        margin-top: 60px;
        font-size: 12px;
        .area-box {
          display: flex;
          justify-content: space-around;
        }
        .area-select {
          width: 89px;
          height: 29px;
          border: 1px solid #E5E5E5;
          border-radius: 15px;
          text-align: center;
          line-height: 29px;
        }
      }
      .types {
        width: 100%;
        height: 200px;
        margin-top: 30px;
        .types-container {
          height: 200px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          li {
            width: 89px;
            height: 29px;
            border: 1px solid #E5E5E5;
            border-radius: 15px;
            text-align: center;
            line-height: 29px;
            margin-top:10px;
            font-size: 11px;
          }
        }
      }
      .button {
        width: 100%;
        display: flex;
        position: absolute;
        bottom: 0;
        div {
          width: 49%;
          height: 49px;
          text-align: center;
          line-height: 49px;
          font-size: 14px;
        }
        .reset {
          background: #FFFFFF;
          color: #999999;
          flex: 1;
        }
        .sure {
          background: #B3D465;
          color: white;
        }
      }
    }
    &-container {
      flex: 1;
      height: 93%;
      overflow: auto;
      &-list {
        width: 100%;
        background: #EEEEEE;
        &-count {
          width: 100%;
          height: 150px;
          margin: 10px auto;
          background: white;
          display: flex;
          align-items: center;
          &-img {
            width: 127px;
            height: 127px;
            margin-left: 16px;
            background: #eeeeee;
            img {
              width: 100%;
              height: 100%;
            }
          }
          &-text {
            width: 180px;
            height: 127px;
            font-size: 12px;
            position: relative;
            margin-left: 20px;
            .p1 {
              font-size: 14px;
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap;
            }
            .p2 {
              color: #2C2C2C;
              font-weight: 600;
              margin: 6px 0;
            }
            .p3 {
              margin-top: 30px;
              width: 85px;
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap;
            }
            .p4 {
              display: block;
              width: 90%;
              height: 16px;
              line-height: 30px;
              border-top: 1px solid #f1f1f1;
              margin-top: 2px;
              .p4-eye {
                img {
                  width: 10px;
                  height: 7px;
                  margin-right: 5px;
                }
              }
              .p4-hand {
                margin-left: 10px;
                img {
                  width: 5px;
                  height: 10px;
                  margin-right: 5px;
                }
              }

            }
            .wantbtn {
              width: 51px;
              height: 29px;
              border-radius: 4px;
              text-align: center;
              line-height: 20px;
              color: white;
              border: none;
              background: #7BBB62;
              position: absolute;
              top: 34%;
              right: -11%;
              font-size: 10px;
            }
          }
        }
      }
    }
  }
}
</style>