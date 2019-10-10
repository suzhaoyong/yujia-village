<template>
  <div class="message">
    <header>培训信息</header>
    <main class="message-main">
      <ul class="message-main-side"  ref="sidechoose">
        <li
          v-for="(list, index) in typelists"
          :key="index"
          @click="clickcategory(index)"
          :class="{active:categoryIndex==index}"
        >{{ list }}</li>
      </ul>
      <div class="message-main-container">
        <ul class="message-main-container-head">
          <li @click="defaultRank('default')">默认排序</li>
          <li @click="hostRank('host')">热度</li>
          <li @click="priceRank('price')">价格 {{ priceFlag? '∧': '∨' }}</li>
          <!-- <li>价格 ∨</li> -->
        </ul>
        <div class="message-main-container-list">
          <div class="message-main-container-list-count" v-for="list in messageLists" :key="list.id" @click="viewdetail(list.id, e)">
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
                <span class="p4-eye"><img src="../../static/img/eye.png">{{ list.views }}</span>
                <span class="p4-hand"><img src="../../static/img/hand.png">{{ list.follow || 100 }}</span>
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
import { Rate } from 'vant';
import { mapGetters } from "vuex";
import Bus from '../utils/Bus'
Vue.use(Rate);
import {
  getTrains,
  postTrainsList,
  getOrderByTrains,
  postTrains,
  getTrainsById,
  postTrainsRank,
  followTrain
} from "../../api/trains";
import {
  getFollowTrain
} from "../../api/personal";
export default {
  data() {
    return {
      messageLists: [],
      sideLists: [],
      value: 2,
      selectTags: [],
      page: 1,
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
      typelists: ['时间', '价格', '地区', '难度', '类型'],
      categoryIndex: 0
    }
  },
  created() {
    this.messageList()
  },
  computed: {
    ...mapGetters(["info"]),
  },
  mounted () {
  },
  methods: {
    // li 选中改变样式
    clickcategory (index) {
      this.categoryIndex = index
    },
    // 点击li跳转到详情页
    viewdetail (id) {
      this.$router.push('/messagedetail/?id='+id)
      return false;
    },
    // 获取列表
    messageList () {
      this.$request.get('trains').then((res) => {
        console.log(res)
        this.messageLists = res.all.data,
        this.sideLists = res.course_types
    })
    },
    // 我想学的操作
    study(id) {
      // console.log(id);
      // if (!this.info.user.name) {
      if (false) {
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
    // 选择排序功能
    searchResult() {
      postTrains(this.getFiltersParams()).then((res) => {
        this.messageLists = res.data
        console.log(this.messageLists)
      })
      this.resultFw = true
      this.defaultFw = true
      this.hostFW = false
      this.priceFW = false
    },
    getFiltersParams (params = {}) {
      this.selectTags.map(item => {
        if (
          item.type == "time" ||
          item.type == "price" ||
          item.type == "area"
        ) {
          params = Object.assign({}, params, item.value);
        } else if (item.type == "classfiy") {
          let course_type_id = params.course_type_id || [];
          course_type_id.push(item.id);
          params = Object.assign({}, params, {
            course_type_id: course_type_id
          });
        } else {
          params = Object.assign({}, params, { [item.type]: item.value });
        }
      });
      return params;
    },

    removeTag (type) {
      if(type == 'area') {
        
      }
      if(type == 'time') {
        
      }
      if(type == 'price') {
        
      }
    },
    resetTime () {
      this.time = {
        value: {
          startTime: '',
          endTime: ''
        },
        type: 'time',
        range: [],
        isArray: false,
        name: ''
      }
    },
    // 排序请求
    getRank (params) {
      postTrains(params).then((res => {
        this.messageLists = res.data
        console.log(res)
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
.message {
  width: 100%;
  height: 100%;
  overflow: hidden;
  header {
    height: 35px;
    text-align: center;
    background: #EEEEEE;
    font-size: 16px;
    line-height: 35px;
  }

  &-main {
    width: 100%;
    height: 100%;
    display: flex;
    &-side {
      width: 54px;
      height: 100%;
      background: #7BBB62;
      overflow: auto;
      li {
        width: 100%;
        height: 44px;
        font-size: 12px;
        text-align: center;
        line-height: 44px;
        overflow: hidden;
        border: none;
      }
      .active {
        background: #EEEEEE;
        transition: 0.5s;
      }
    }
    &-container {
      flex: 1;
      &-head {
        width: 100%;
        height: 44px;
        display: flex;
        align-items: center;
        font-size: 12px;
        li {
          margin-left: 18px;
        }
      }
      &-list {
        width: 100%;
        height: 88%;
        background: #EEEEEE;
        overflow: auto;
        &-count {
          width: 297px;
          height: 123px;
          margin: 10px auto;
          background: white;
          display: flex;
          align-items: center;
          &-img {
            width: 101px;
            height: 101px;
            margin-left: 10px;
            background: #eeeeee;
            img {
              width: 100%;
              height: 100%;
            }
          }
          &-text {
            width: 180px;
            height: 101px;
            font-size: 12px;
            position: relative;
            margin-left: 10px;
            .p1 {
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap;
            }
            .p2 {
              margin: 6px 0;
            }
            .p3 {
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
              height: 20px;
              border-radius: 10px;
              text-align: center;
              line-height: 20px;
              color: white;
              border: none;
              background: #7BBB62;
              position: absolute;
              top: 34%;
              right: 9px;
              font-size: 10px;
            }
          }
        }
      }
    }
  }
}
</style>