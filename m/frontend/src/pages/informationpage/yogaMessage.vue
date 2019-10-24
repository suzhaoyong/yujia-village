<template>
  <div class="message">
    <main class="message-main">
      <ul class="message-main-head">
        <li @click="defaultRank('default')" :class="{'changeweight': isActive == '1' }"> 默认排序</li>
        <li @click="hostRank('host')" :class="{'changeweight': isActive == '2' }">热度</li>
        <li @click="priceRank('price')" :class="{'changeweight': isActive == '3' }">价格 
          <!-- <span> -->
            <van-icon name='arrow-up' v-show="priceFlag"/> <van-icon name='arrow-down' v-show="!priceFlag"/>
          <!-- </span> -->
        </li>
        <li class="head-list" is-link @click="isShow = true">筛选</li>
        <!-- <li>价格 ∨</li> -->
      </ul>
      <!-- <van-popup
        v-model="show"
        position="right"
        round
        :style="{ width: '85%',height: '100%'}"
      > -->
      <div class="shade-layer" v-show="isShow" @click="isShow = false">
        <div class="right-box" @click.stop="">
          <div class="popup">
            <p>理想价格</p>
            <div class="popup-price"> <input type="text" v-model="minprice" @click="changeminprice" ref="input1"> — <input type="text" v-model="maxprice" @click="changemaxprice" ref="input2"></div>
            <div class="popup-diff">
              <p>难度</p>
              <ul class="popup-diff-list">
                
                <li>
                  <van-rate
                    v-model='stardiff'
                    :size="20"
                    color='#58B708'
                    void-icon="star"
                    void-color="#eee"
                  />
                </li>
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
          </div>
          <div class="button">
              <div class="reset" @click="resetlist">重置</div>
              <div class="sure" @click="searchResult">确定</div>
          </div>
        </div>
      </div>  
      <van-popup v-model="areaisOpen" position="bottom" :style="{ height: '40%' }">
        <van-area
          :area-list="list"
          @confirm="changeArea" 
          @cancel="areaisOpen = false"
        />
      </van-popup>
      <div class="message-main-container">
          <div class="message-main-container-list" v-if="messageLists.length > 0" >
            <div class="message-main-container-list-count" v-for="list in messageLists" :key="list.id" @click="viewdetail(list.id)">
              <div class="message-main-container-list-count-img" :style="{ 'background-image': 'url(' + list.teacher_img + ')','background-repeat':'no-repeat','background-size':'cover' }">
                <!-- <img :src="list.teacher_img"> -->
              </div>
              <div class="message-main-container-list-count-text">
                <h6 class="p1">{{ list.theme }}</h6>
                <p class="areap">{{ list.custom_address }}</p>
                <p class="p2"><span class="pprice">￥{{ list.price }}</span><span class="pdiff">难度： {{ list.diff }}</span> </p>
                <p class="p4">
                  <span class="p4-hand">观看   {{ list.follow  }}</span>
                  <span class="p4-eye">想学   {{ list.views }}</span>
                </p>
                <button class="wantbtn" @click.stop="study(list.id)">想学</button>
              </div>
            </div>
          </div>
          <div v-else class="defaultpage">
            <img src="../../../static/img/defaultpage.png">
            <span>没有发现哦(╯▽╰)</span>
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
      isActive: '1',
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
      pages: 1,
      stardiff: 0,
      isLoading: false,
      isShow: false,
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
    this.messagetypeList()
  },
  mounted () {
    this.PullUpReload()
  },
  methods: {
    // changeprice (e) {
    //   var target = e.target || window.target
    //   if(target.nodeName === "INPUT") {
    //     target.value *= ''
    //     console.log(this.minprice, this.maxprice)
    //   }
    // },
    changeminprice () {
      this.minprice = ''
      this.$refs.input1.style.color = 'black'
    },
    changemaxprice () {
      this.maxprice = ''
      this.$refs.input2.style.color = 'black'
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
        this.selectArea.province = "",
        this.selectArea.city = "",
        this.selectArea.area = "",
        this.stardiff = 0, // 难度,整数,小于10
        this.selectTtype = [],
        this.spanIndex2 = [],
        this.minprice = 0,
        this.maxprice = 50000,
        this.$refs.input1.style.color = '#c2bfbf',
        this.$refs.input2.style.color = '#c2bfbf'
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
        console.log(res)
        if (this.pages < res.last_page ) {
            res.data.map((item) => {
              this.messageLists.push(item);
            })
        } else {
          Toast('只有这么多了');
        }
    })
    },
    messagetypeList () {
      this.$request.get('trains/type').then((res) => {
        this.classfly = res.course_types
      })
    },
    // 我想学的操作
    study(id) {
      if (!JSON.parse(sessionStorage.getItem("user"))) {
        this.$router.push('/login')
        Toast('请登录')
        return;
      }
      this.wantStudy(id)
      return false;
    },
    wantStudy(id) {
      // 调用我想学接口
      getFollowTrain(id)
        .then(data => {
          Toast('已添加至我的收藏');
        })
    },
    // 下拉刷新
    // 上拉加载更多
    PullUpReload () {
      var _this = this
      var isScroll = false  // 函数截流
      document.querySelector('.message-main-container').onscroll = function() {
      if (isScroll) {
        setTimeout(() => {
          isScroll = false
        }, 50)
      } else {
      let innerHeight = document.querySelector('.message-main-container').clientHeight // 容器高度
      let outerHeight = document.querySelector('.message-main-container').scrollHeight // 容器高+滚动高
      let scrollTop = document.querySelector('.message-main-container').scrollTop  // 滚动高
      if (innerHeight + scrollTop >= outerHeight ) {
        _this.pages++
        _this.messageList(_this.pages)
        isScroll = true
      }
      }
      }
    },
    
    // 选择功能
    selected2 (item, index) {
      let selectTag = this.selectTtype.indexOf(item.id)
      if (this.selectTtype.indexOf(item.id) > -1) {
        this.selectTtype.splice(selectTag, 1)
      } else {
        this.selectTtype.push(item.id)
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
        // minPrice: parseInt(this.minprice),
        // maxPrice: parseInt(this.maxprice),
        province: this.selectArea.province || "",
        city: this.selectArea.city || "",
        area: this.selectArea.area || "",
        diff: this.stardiff, // 难度,整数,小于10
        course_type_id: this.selectTtype || [],
      }
      return params;
    },
    // 排序请求
    getRank (params) {
      postTrains(params).then((res => {
        this.messageLists = res.data
      }))
    },
    getRankParams (keyWord, params = {}) {
      if (keyWord === 'host') {
        params =Object.assign({}, params, {time: false})
      } else if (keyWord === 'default') { 
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
      this.isActive = '3'
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
      this.isActive = '1'
      this.hostFw = true
      this.defaultFw = true;
      this.priceFW = false;
      this.resultFw = false;
      this.keyWord = keyWord;
      this.getRank(this.getRankParams(keyWord))
    },
    // 热度排序
    hostRank (keyWord) {
      this.isActive = '2'
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
// 点击字体加粗
.changeweight {
  font-weight: 900;
}
// 缺省页
.defaultpage {
  width: 100%;
  height: 160px;
  margin-top: 160px;
  img {
    width: 100%;
    height: 100%;
  }
  span {
    position: relative;
    left: 56%;
    top: -105%;
    font-size: 16px;
    color: #999999;
  }
}
.message {
  width: 100%;
  header {
    height: 44px;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    background: white;
    overflow: hidden;
    span {
      display: block;
      margin-top: 17px;
    }
  }
  &-main {
    width: 100%;
    height: 100%;
    &-head {
      width: 100%;
      height: 44px;
      font-size: 12px;
      background: white;
      li {
        position: relative;
        margin-left: 18px;
        float: left;
        height: 44px;
        line-height: 44px;
        .van-icon {
          position: absolute;
          top: 12px;
          left: 25px;
          font-size: 20px;
        }
      }
      .head-list {
        float: right;
        margin-right: 16px;
      }
    }
    .shade-layer {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1024;
      height: 100%;
      background-color: rgba(0,0,0,.7);
      .right-box {
        width: 335px;
        height: 100%;
        margin-left: 40px;
        border-radius: 20px 0px 0px 20px;
        background-color: #fff;
        overflow: hidden;
        .popup {
          position: absolute;
          top: 0;
          bottom: 0;
          z-index: 999;
          overflow: scroll;
          font-size: 14px;
          padding-left: 23px;
          padding-top: 32px;
          padding-bottom: 60px;
          &-price {
            float: left;
            input {
              width: 88px;
              height: 29px;
              border: 1px solid #E5E5E5;
              border-radius: 15px;
              text-align: center;
              font-size: 12px;
              color: #c2bfbf;
            }
          }
          .popup-diff {
            margin-top:40px;
            &-list {
              font-size: 12px;
              margin-top:20px;
              .van-rate .van-icon {
                font-size: 12px !important;
              }
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
            margin-top: 30px;
            .types-container {
              display: flex;
              // padding-bottom: 49px;
              flex-wrap: wrap;
              justify-content: space-around;
              overflow: auto;
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
        }
        .button {
          width: 100%;
          display: flex;
          position: absolute;
          bottom: 0;
          z-index: 2000;
          div {
            width: 167.5px;
            height: 49px;
            text-align: center;
            line-height: 49px;
            font-size: 14px;
          }
          .reset {
            background: #FFFFFF;
            color: #999999;
            border-radius: 0px 0px 0px 20px;
          }
          .sure {
            background: #B3D465;
            color: white;
          }
        }
      }
    }
    
    &-container {
      flex: 1;
      height: 100%;
      overflow: auto;
      &-list {
        width: 100%;
        background: #EEEEEE;
        &-count {
          width: 100%;
          height: 155px;
          margin: 10px auto;
          background: white;
          display: flex;
          align-items: center;
          &-img {
            width: 136px;
            height: 136px;
            margin-left: 17px;
            margin-top: 9;
            background: white;
            border-radius: 10px;
            // img {
            //   width: 100%;
            //   height: 100%;
            //   border-radius: 10px;
            // }
          }
          &-text {
            width: 190px;
            height: 127px;
            font-size: 12px;
            position: relative;
            margin-left: 18px;
            .p1 {
              margin-top: 12px;
              font-size: 14px;
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap;
            }
            .areap {
              color: #999999;
              font-size: 12px;
              margin-top: 10px;
            }
            .p2 {
              margin-top: 15px;
              display: flex;
              justify-content: space-between;
              .pprice {
                color: #D71010;
                font-size: 14px;
                font-weight: 700;
              }
              .pdiff {
                color: #BC866F;
                font-size: 12px;
              }
            }
            .p4 {
              display: block;
              width: 90%;
              height: 16px;
              line-height: 30px;
              padding-top: 15px;
              font-size: 10px;
              color: #999999;
              .p4-eye {
                margin-left: 10px;
              }
              .p4-hand {
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
              top: 78%;
              right: 0;
              font-size: 10px;
            }
          }
        }
      }
    }
  }
}
</style>